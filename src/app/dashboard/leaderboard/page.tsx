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

async function loadLeaderboard(): Promise<Entry[]> {
  const supabase = getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch streaks
  const { data: streaks } = await supabase
    .from("user_streaks")
    .select("user_id,current_streak,badges");

  if (!streaks || streaks.length === 0) return [];

  // Fetch matching profiles for usernames
  const userIds = streaks.map((s) => s.user_id as string);
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id,username")
    .in("id", userIds);

  const typedProfiles = (profiles ?? []) as { id: string; username: string }[];
  const idToUsername = new Map<string, string>(
    typedProfiles.map((p) => [p.id, p.username ?? ""])
  );

  const base = streaks.map((r) => ({
    user_id: r.user_id as string,
    username: idToUsername.get(r.user_id as string) ?? "",
    current_streak: (r.current_streak as number) ?? 0,
    badges: (r.badges as unknown as string[]) ?? [],
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
    <main>
      <DashboardHeader />
      <section className="mx-auto max-w-4xl px-4 py-6 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Leaderboard</h1>
          <div className="text-sm text-muted-foreground">Live updates</div>
        </div>
        <LeaderboardTable entries={entries} />
        <LiveLeaderboard />
      </section>
    </main>
  );
}
