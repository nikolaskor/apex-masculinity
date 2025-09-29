import { getSupabaseServerClient } from "@/lib/supabase/server";
import LeaderboardTable from "@/components/leaderboard/LeaderboardTable";
import LiveLeaderboard from "@/components/leaderboard/LiveLeaderboard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

type Entry = {
  user_id: string;
  username: string;
  current_streak: number;
  badges: string[];
  rank: number;
  isCurrentUser: boolean;
};

type StreakRow = {
  user_id: string;
  current_streak: number;
  badges: string[] | null;
};

type ProfileRow = { id: string; username: string };

async function loadLeaderboard(): Promise<Entry[]> {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch streaks
  const { data: streaks } = await supabase
    .from("user_streaks")
    .select("user_id,current_streak,badges")
    .returns<StreakRow[]>();

  if (!streaks || streaks.length === 0) return [];

  // Fetch matching profiles for usernames
  const userIds = streaks.map((s) => s.user_id);
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id,username")
    .in("id", userIds)
    .returns<ProfileRow[]>();

  const typedProfiles = profiles ?? [];
  const idToUsername = new Map<string, string>(
    typedProfiles.map((p) => [p.id, p.username ?? ""])
  );

  const base = streaks.map((r) => ({
    user_id: r.user_id,
    username: idToUsername.get(r.user_id) ?? "",
    current_streak: r.current_streak ?? 0,
    badges: (r.badges ?? []) as string[],
  }));

  return base
    .sort((a, b) => b.current_streak - a.current_streak)
    .map((e, i) => ({
      ...e,
      rank: i + 1,
      isCurrentUser: e.user_id === user?.id,
    }));
}

export default async function LeaderboardPage() {
  const entries = await loadLeaderboard();

  return (
    <main className="min-h-svh bg-[radial-gradient(1200px_600px_at_10%_-20%,rgba(255,215,0,0.14),transparent_60%),radial-gradient(1000px_600px_at_90%_10%,rgba(244,196,48,0.10),transparent_60%),linear-gradient(180deg,#0A0A0A_0%,#111111_35%,#1A1A1A_100%)]">
      <DashboardHeader />
      <section className="mx-auto max-w-4xl px-4 py-8 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] to-[#c7a600]">
            Leaderboard
          </h1>
          <div className="text-sm text-white/70">Live updates</div>
        </div>
        <div className="rounded-2xl border border-[#FFD700]/20 bg-white/5 backdrop-blur p-4 shadow-[0_10px_40px_rgba(0,0,0,0.45)]">
          <LeaderboardTable entries={entries} />
        </div>
        <div className="rounded-2xl border border-[#FFD700]/20 bg-white/5 backdrop-blur p-4 shadow-[0_10px_40px_rgba(0,0,0,0.45)]">
          <LiveLeaderboard />
        </div>
      </section>
    </main>
  );
}
