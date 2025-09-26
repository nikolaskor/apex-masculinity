interface Entry {
  rank: number;
  user_id: string;
  username: string;
  current_streak: number;
  badges: string[];
  isCurrentUser?: boolean;
}

export default function LeaderboardTable({ entries }: { entries: Entry[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2 px-3">#</th>
            <th className="py-2 px-3">User</th>
            <th className="py-2 px-3">Badge</th>
            <th className="py-2 px-3">Streak</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e) => (
            <tr
              key={e.user_id}
              className={e.isCurrentUser ? "bg-muted/40" : undefined}
            >
              <td className="py-2 px-3 font-medium">{e.rank}</td>
              <td className="py-2 px-3">@{e.username}</td>
              <td className="py-2 px-3">{e.badges?.slice(-1)[0] ?? "-"}</td>
              <td className="py-2 px-3">{e.current_streak} days</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
