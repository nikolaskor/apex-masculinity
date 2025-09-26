import { getSupabaseServerClient } from "@/lib/supabase/server";
import LeaderboardTable from "@/components/leaderboard/LeaderboardTable";
import LiveLeaderboard from "@/components/leaderboard/LiveLeaderboard";

async function loadLeaderboard() {
  const supabase = getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch streaks
  const { data: streaks } = await supabase
    .from("user_streaks")
    .select("user_id,current_streak,badges");

  if (!streaks || streaks.length === 0) return [] as Array<any>;

  // Fetch matching profiles for usernames
  const userIds = streaks.map((s) => s.user_id);
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id,username")
    .in("id", userIds);

  const idToUsername = new Map<string, string>(
    (profiles || []).map((p) => [p.id as string, (p.username as string) ?? ""])
  );

  const entries = streaks
    .map((r) => ({
      user_id: r.user_id as string,
      username: idToUsername.get(r.user_id as string) ?? "",
      current_streak: (r.current_streak as number) ?? 0,
      badges: (r.badges as string[]) ?? [],
    }))
    .sort((a, b) => b.current_streak - a.current_streak)
    .map((e, i) => ({
      ...e,
      rank: i + 1,
      isCurrentUser: e.user_id === user?.id,
    }));

  return entries;
}

export default async function LeaderboardPage() {
  const entries = await loadLeaderboard();

  return (
    <main className="mx-auto max-w-4xl px-4 py-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Leaderboard</h1>
        <div className="text-sm text-muted-foreground">Live updates</div>
      </div>
      <LeaderboardTable entries={entries} />
      <LiveLeaderboard />
    </main>
  );
}
