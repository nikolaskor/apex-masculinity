"use client";

import { useMemo } from "react";
import { useDailyTasks } from "@/hooks/useDailyTasks";
import TaskItem from "./TaskItem";
import WeeklyChallengeCard from "./WeeklyChallenge";

export default function DailyChecklist() {
  const { tasks, completed, loading, error, progress, completeTask } =
    useDailyTasks();

  const groups = useMemo(() => {
    return {
      mind: tasks.filter((t) => t.category === "mind"),
      body: tasks.filter((t) => t.category === "body"),
      spirit: tasks.filter((t) => t.category === "spirit"),
    };
  }, [tasks]);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Daily Checklist</h3>
        <div className="text-sm">
          {progress}/10 tasks complete + weekly challenge
        </div>
      </div>
      {loading && (
        <p className="text-sm text-muted-foreground">Loading tasks...</p>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}

      <WeeklyChallengeCard />

      {!loading && !error && (
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-3">
            <h4 className="font-medium">Mind</h4>
            {groups.mind.map((t) => (
              <TaskItem
                key={t.id}
                id={t.id}
                name={t.name}
                description={t.description}
                completed={completed.has(t.id)}
                onComplete={completeTask}
              />
            ))}
          </div>
          <div className="space-y-3">
            <h4 className="font-medium">Body</h4>
            {groups.body.map((t) => (
              <TaskItem
                key={t.id}
                id={t.id}
                name={t.name}
                description={t.description}
                completed={completed.has(t.id)}
                onComplete={completeTask}
              />
            ))}
          </div>
          <div className="space-y-3">
            <h4 className="font-medium">Spirit</h4>
            {groups.spirit.map((t) => (
              <TaskItem
                key={t.id}
                id={t.id}
                name={t.name}
                description={t.description}
                completed={completed.has(t.id)}
                onComplete={completeTask}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
