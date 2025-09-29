import { getSupabaseServerClient } from "@/lib/supabase/server";
import { logoutAction } from "@/app/(auth)/actions";
import LiveStreak from "./LiveStreak";
import HeaderNav from "./HeaderNav";

type ProfileRow = { username: string };
type StreakRow = { current_streak: number };

export default async function DashboardHeader() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile: ProfileRow | null = null;
  let streak: StreakRow | null = null;
  let username = "";
  let currentStreak = 0;

  if (user) {
    const results = await Promise.all([
      supabase.from("profiles").select("username").eq("id", user.id).single(),
      supabase
        .from("user_streaks")
        .select("current_streak")
        .eq("user_id", user.id)
        .single(),
    ]);

    // Explicitly cast the data to the correct types
    profile = results[0].data as ProfileRow | null;
    streak = results[1].data as StreakRow | null;

    // Access properties safely
    username = profile?.username ?? "";
    currentStreak = streak?.current_streak ?? 0;
  }

  return (
    <header className="w-full border-b">
      <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-xl font-semibold">Apex Challenge</div>
          {username && (
            <div className="text-sm text-muted-foreground">@{username}</div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <HeaderNav />
          <div className="text-sm">
            🔥 Streak: <LiveStreak initial={currentStreak} />
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded bg-black text-white px-3 py-1"
            >
              Log out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
