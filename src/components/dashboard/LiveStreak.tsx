"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

type StreakUpdatePayload = { current_streak?: number };

export default function LiveStreak({ initial }: { initial: number }) {
  const supabase = getSupabaseBrowserClient();
  const [streak, setStreak] = useState(initial);

  useEffect(() => {
    let channel: ReturnType<typeof supabase.channel> | null = null;
    (async () => {
      const session = await supabase.auth.getSession();
      const userId = session.data.session?.user.id;
      if (!userId) return;
      channel = supabase
        .channel(`streak-${userId}`)
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "user_streaks",
            filter: `user_id=eq.${userId}`,
          },
          (payload) => {
            const newValue = (payload.new as StreakUpdatePayload)
              ?.current_streak;
            if (typeof newValue === "number") setStreak(newValue);
          }
        )
        .subscribe();
    })();
    return () => {
      channel?.unsubscribe();
    };
  }, [supabase]);

  return <span className="font-medium">{streak}</span>;
}
