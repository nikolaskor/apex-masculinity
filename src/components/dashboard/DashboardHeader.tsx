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
    <header className="w-full sticky top-0 z-40 border-b border-[#FFD700]/20 bg-black/60 backdrop-blur">
      <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className="inline-block w-6 h-6 rounded-md shadow-[0_0_0_2px_rgba(255,215,0,0.28),0_8px_24px_rgba(255,215,0,0.25)]"
            style={{
              background:
                "conic-gradient(from 0deg, #FFD700, #F4C430, #e6c200, #FFD700)",
            }}
          />
          <div className="text-xl font-extrabold tracking-tight">Apex</div>
          {username && <div className="text-sm text-white/60">@{username}</div>}
        </div>
        <div className="flex items-center gap-4">
          <HeaderNav />
          <div className="text-sm text-white/80">
            🔥 Streak: <LiveStreak initial={currentStreak} />
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-lg bg-gradient-to-b from-[#FFD700] to-[#F4C430] text-black px-3 py-1 font-bold shadow-[0_8px_24px_rgba(255,215,0,0.25)] hover:brightness-105"
            >
              Log out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
