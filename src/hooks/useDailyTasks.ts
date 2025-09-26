"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { ChallengeTask, DailyCompletion } from "@/types/database";
import { useTimezone } from "./useTimezone";
import { mergeBadges } from "@/lib/badges";

interface DailyState {
  tasks: ChallengeTask[];
  completed: Set<number>;
  loading: boolean;
  error: string | null;
  progress: number; // 0-10
  completeTask: (taskId: number) => void;
}

export function useDailyTasks(): DailyState {
  const supabase = getSupabaseBrowserClient();
  const { timezone, getLocalDateString } = useTimezone();
  const [tasks, setTasks] = useState<ChallengeTask[]>([]);
  const [completion, setCompletion] = useState<DailyCompletion | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const completed = useMemo(() => {
    const arr = (completion?.tasks_completed as number[]) || [];
    return new Set<number>(arr);
  }, [completion]);

  const progress = completed.size;

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [{ data: taskData, error: taskErr }, { data: sessionData }] =
          await Promise.all([
            supabase
              .from("challenge_tasks")
              .select("id,name,description,category,order_index")
              .order("order_index"),
            supabase.auth.getSession(),
          ]);
        if (taskErr) throw taskErr;
        const userId = sessionData.session?.user.id;
        if (!userId) throw new Error("Not authenticated");
        const today = getLocalDateString();
        const { data: completionRow, error: compErr } = await supabase
          .from("daily_completions")
          .select(
            "id,user_id,completion_date,tasks_completed,weekly_challenge_completed,week_number,timezone,created_at"
          )
          .eq("user_id", userId)
          .eq("completion_date", today)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();
        if (compErr) throw compErr;
        if (!active) return;
        setTasks((taskData as ChallengeTask[]) || []);
        setCompletion((completionRow as DailyCompletion | null) || null);
      } catch (e) {
        if (!active) return;
        setError(e instanceof Error ? e.message : "Failed to load daily tasks");
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const completeTask = (taskId: number) => {
    if (isPending) return;
    startTransition(async () => {
      try {
        const session = await supabase.auth.getSession();
        const userId = session.data.session?.user.id;
        if (!userId) throw new Error("Not authenticated");
        const today = getLocalDateString();

        // Fetch the freshest row to avoid overwriting weekly toggle from another component
        const { data: existingRow, error: readErr } = await supabase
          .from("daily_completions")
          .select(
            "tasks_completed,weekly_challenge_completed,week_number,created_at"
          )
          .eq("user_id", userId)
          .eq("completion_date", today)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();
        if (readErr) throw readErr;

        const existing = existingRow as Partial<DailyCompletion> | null;
        const existingCompleted: number[] = Array.isArray(
          existing?.tasks_completed
        )
          ? (existing!.tasks_completed as number[])
          : Array.from(completed);
        const prevCount = existingCompleted.length;

        const newCompleted = new Set(existingCompleted);
        newCompleted.add(taskId);
        const tasks_completed = Array.from(newCompleted);
        const week_number =
          (existing?.week_number as number | null) ??
          completion?.week_number ??
          null;
        const wasWeeklyDone = Boolean(existing?.weekly_challenge_completed);

        // Upsert today's row preserving current weekly flag
        const { data: upsertRow, error: upsertErr } = await (
          supabase as SupabaseClient
        )
          .from("daily_completions")
          .upsert(
            {
              user_id: userId,
              completion_date: today,
              tasks_completed,
              weekly_challenge_completed: wasWeeklyDone,
              week_number,
              timezone,
            },
            { onConflict: "user_id,completion_date" }
          )
          .select(
            "id,user_id,completion_date,tasks_completed,weekly_challenge_completed,week_number,timezone,created_at"
          )
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();
        if (upsertErr) throw upsertErr;
        const saved = upsertRow as DailyCompletion | null;
        if (saved) setCompletion(saved);

        // Increment streak when 10/10 daily tasks are completed (weekly is optional)
        if (prevCount < 10 && tasks_completed.length === 10) {
          type StreakData = {
            current_streak: number;
            longest_streak: number;
            badges: unknown;
          };

          const { data: streakRow, error: streakErr } = await supabase
            .from("user_streaks")
            .select("current_streak,longest_streak,badges")
            .eq("user_id", userId)
            .returns<StreakData>()
            .single();
          if (streakErr) throw streakErr;
          const row = streakRow as StreakData | null;
          const newCurrent =
            ((row?.current_streak as number | undefined) ?? 0) + 1;
          const newLongest = Math.max(
            (row?.longest_streak as number | undefined) ?? 0,
            newCurrent
          );
          const newBadges = mergeBadges(row?.badges, newCurrent);

          const { error: updateErr } = await (supabase as SupabaseClient)
            .from("user_streaks")
            .update({
              current_streak: newCurrent,
              longest_streak: newLongest,
              last_completion_date: today,
              badges: newBadges,
            })
            .eq("user_id", userId);
          if (updateErr) throw updateErr;
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to complete task");
      }
    });
  };

  return { tasks, completed, loading, error, progress, completeTask };
}
