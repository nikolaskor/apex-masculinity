"use client";

import { useEffect } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LiveLeaderboard() {
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();

  useEffect(() => {
    const channel = supabase
      .channel("lb-streaks")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "user_streaks" },
        () => {
          router.refresh();
        }
      )
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, [supabase, router]);
  return null;
}
