"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { WeeklyChallenge } from "@/types/database";
import { useTimezone } from "@/hooks/useTimezone";
import { computeWeek } from "@/lib/weekly";

export default function WeeklyChallengeCard() {
  const supabase = getSupabaseBrowserClient();
  const { getLocalDateString, timezone } = useTimezone();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [challenge, setChallenge] = useState<WeeklyChallenge | null>(null);
  const [completed, setCompleted] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const session = await supabase.auth.getSession();
        const userId = session.data.session?.user.id;
        if (!userId) throw new Error("Not authenticated");

        // Fetch current streak to compute week (tolerate missing row for new users)
        const { data: streak, error: streakErr } = await supabase
          .from("user_streaks")
          .select("current_streak")
          .eq("user_id", userId)
          .maybeSingle();
        if (streakErr) throw streakErr;
        const week = computeWeek(streak?.current_streak ?? 0);

        const { data: wc, error: wcErr } = await supabase
          .from("weekly_challenges")
          .select("id,week_number,title,description")
          .eq("week_number", week)
          .single();
        if (wcErr) throw wcErr;

        const today = getLocalDateString();
        const { data: todayCompletion, error: compErr } = await supabase
          .from("daily_completions")
          .select("weekly_challenge_completed,tasks_completed,week_number")
          .eq("user_id", userId)
          .eq("completion_date", today)
          .maybeSingle();
        if (compErr) throw compErr;

        if (!active) return;
        setChallenge(wc as WeeklyChallenge);
        setCompleted(Boolean(todayCompletion?.weekly_challenge_completed));
      } catch (e) {
        if (!active) return;
        setError(
          e instanceof Error ? e.message : "Failed to load weekly challenge"
        );
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [supabase, getLocalDateString]);

  const toggleComplete = () => {
    if (isPending || completed) return; // one-way
    startTransition(async () => {
      try {
        const session = await supabase.auth.getSession();
        const userId = session.data.session?.user.id;
        if (!userId) throw new Error("Not authenticated");
        const today = getLocalDateString();

        // Read existing row to preserve tasks_completed and week_number
        const { data: existing, error: readErr } = await supabase
          .from("daily_completions")
          .select("tasks_completed,week_number")
          .eq("user_id", userId)
          .eq("completion_date", today)
          .maybeSingle();
        if (readErr) throw readErr;
        const tasks_completed = (existing?.tasks_completed as number[]) ?? [];
        const week_number = existing?.week_number ?? null;

        const { error } = await supabase.from("daily_completions").upsert(
          {
            user_id: userId,
            completion_date: today,
            tasks_completed,
            weekly_challenge_completed: true,
            week_number,
            timezone,
          },
          { onConflict: "user_id,completion_date" }
        );
        if (error) throw error;
        setCompleted(true);
      } catch (e) {
        setError(
          e instanceof Error ? e.message : "Failed to update weekly challenge"
        );
      }
    });
  };

  if (loading)
    return (
      <div className="text-sm text-muted-foreground">
        Loading weekly challenge...
      </div>
    );
  if (error) return <div className="text-sm text-red-600">{error}</div>;
  if (!challenge) return null;

  return (
    <div className="rounded border p-4 space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Weekly Challenge: {challenge.title}</h4>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={completed}
            onChange={toggleComplete}
          />
          <span>Completed</span>
        </label>
      </div>
      <p className="text-sm text-muted-foreground">{challenge.description}</p>
    </div>
  );
}
