import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let username = "";
  let currentStreak = 0;

  if (user) {
    const [{ data: profile }, { data: streak }] = await Promise.all([
      supabase.from("profiles").select("username").eq("id", user.id).single(),
      supabase
        .from("user_streaks")
        .select("current_streak,longest_streak,badges,last_completion_date")
        .eq("user_id", user.id)
        .single(),
    ]);
    username = profile?.username ?? "";
    currentStreak = streak?.current_streak ?? 0;
  }

  return (
    <main>
      <DashboardHeader />
      <section className="mx-auto max-w-5xl px-4 py-6 space-y-4">
        <h2 className="text-xl font-semibold">
          Welcome{username ? `, @${username}` : ""}
        </h2>
        <p className="text-sm text-muted-foreground">
          Your current streak is{" "}
          <span className="font-medium">{currentStreak}</span> days.
        </p>
        <div className="rounded border p-4">
          <p className="text-sm">
            Daily checklist and weekly challenge sections will go here.
          </p>
        </div>
      </section>
    </main>
  );
}
