"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { ChallengeTask, DailyCompletion } from "@/types/database";
import { useTimezone } from "./useTimezone";

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
        const { data: completionData, error: compErr } = await supabase
          .from("daily_completions")
          .select(
            "id,user_id,completion_date,tasks_completed,weekly_challenge_completed,week_number,timezone,created_at"
          )
          .eq("user_id", userId)
          .eq("completion_date", today)
          .maybeSingle();
        if (compErr) throw compErr;
        if (!active) return;
        setTasks(taskData || []);
        setCompletion(completionData || null);
      } catch (e: any) {
        if (!active) return;
        setError(e.message || "Failed to load daily tasks");
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

        const newCompleted = new Set(completed);
        newCompleted.add(taskId);
        const tasks_completed = Array.from(newCompleted);

        // Upsert today's row (respect unique(user_id, completion_date))
        const { error: upsertErr, data } = await supabase
          .from("daily_completions")
          .upsert(
            {
              user_id: userId,
              completion_date: today,
              tasks_completed,
              weekly_challenge_completed:
                completion?.weekly_challenge_completed ?? false,
              week_number: completion?.week_number ?? null,
              timezone,
            },
            { onConflict: "user_id,completion_date" }
          )
          .select()
          .single();
        if (upsertErr) throw upsertErr;
        setCompletion(data as DailyCompletion);
      } catch (e: any) {
        setError(e.message || "Failed to complete task");
      }
    });
  };

  return { tasks, completed, loading, error, progress, completeTask };
}
