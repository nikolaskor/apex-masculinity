"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={
        "px-3 py-1 rounded-lg text-sm transition-colors " +
        (active
          ? "bg-gradient-to-b from-[#FFD700] to-[#F4C430] text-black shadow-[0_8px_24px_rgba(255,215,0,0.25)]"
          : "text-white/70 hover:text-white hover:bg-white/10")
      }
    >
      {label}
    </Link>
  );
}

export default function HeaderNav() {
  return (
    <nav className="flex items-center gap-2">
      <NavLink href="/dashboard" label="Dashboard" />
      <NavLink href="/dashboard/leaderboard" label="Leaderboard" />
    </nav>
  );
}
