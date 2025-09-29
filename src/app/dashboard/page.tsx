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
    <main className="min-h-svh bg-[radial-gradient(1200px_600px_at_10%_-20%,rgba(255,215,0,0.14),transparent_60%),radial-gradient(1000px_600px_at_90%_10%,rgba(244,196,48,0.10),transparent_60%),linear-gradient(180deg,#0A0A0A_0%,#111111_35%,#1A1A1A_100%)]">
      <DashboardHeader />
      <section className="mx-auto max-w-5xl px-4 py-8 space-y-6">
        <div className="rounded-2xl border border-[#FFD700]/20 bg-white/5 backdrop-blur p-6 shadow-[0_10px_40px_rgba(0,0,0,0.45)]">
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] to-[#c7a600]">
                Welcome{username ? `, @${username}` : ""}
              </span>
            </h2>
            <p className="text-sm text-white/70">
              Your current streak is{" "}
              <span className="font-semibold text-white">{currentStreak}</span>{" "}
              days.
            </p>
          </div>
          <div className="mt-6">
            <DailyChecklist />
          </div>
        </div>
      </section>
    </main>
  );
}
