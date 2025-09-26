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
        "px-3 py-1 rounded text-sm " +
        (active
          ? "bg-white text-black"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/40")
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
