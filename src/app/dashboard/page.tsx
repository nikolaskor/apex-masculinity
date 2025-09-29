import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import DailyChecklist from "@/components/dashboard/DailyChecklist";

type ProfileRow = { username: string };
type StreakRow = {
  current_streak: number;
  longest_streak: number;
  badges: string[] | null;
  last_completion_date: string | null;
};

export default async function DashboardPage() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let username = "";
  let currentStreak = 0;

  if (user) {
    const profilePromise = supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .returns<ProfileRow[]>();
    const streakPromise = supabase
      .from("user_streaks")
      .select("current_streak,longest_streak,badges,last_completion_date")
      .eq("user_id", user.id)
      .returns<StreakRow[]>();

    const [{ data: profileRows }, { data: streakRows }] = await Promise.all([
      profilePromise,
      streakPromise,
    ]);
    const profile = profileRows?.[0];
    const streak = streakRows?.[0];

    username = profile?.username ?? "";
    currentStreak = streak?.current_streak ?? 0;
  }

  return (
    <main>
      <DashboardHeader />
      <section className="mx-auto max-w-5xl px-4 py-6 space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">
            Welcome{username ? `, @${username}` : ""}
          </h2>
          <p className="text-sm text-muted-foreground">
            Your current streak is{" "}
            <span className="font-medium">{currentStreak}</span> days.
          </p>
        </div>
        <DailyChecklist />
      </section>
    </main>
  );
}
