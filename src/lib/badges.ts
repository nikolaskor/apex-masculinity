export type BadgeId = "30_day" | "60_day" | "90_day" | "365_day";

export const BADGE_THRESHOLDS: Record<BadgeId, number> = {
  "30_day": 30,
  "60_day": 60,
  "90_day": 90,
  "365_day": 365,
};

export function getEarnedBadgesForStreak(streak: number): BadgeId[] {
  const earned: BadgeId[] = [];
  for (const [badge, days] of Object.entries(BADGE_THRESHOLDS) as [
    BadgeId,
    number
  ][]) {
    if (streak >= days) earned.push(badge);
  }
  return earned;
}

export function mergeBadges(existing: unknown, streak: number): BadgeId[] {
  const existingArr: unknown[] = Array.isArray(existing)
    ? (existing as unknown[])
    : [];
  const set = new Set<BadgeId>();
  for (const b of existingArr) {
    if (typeof b === "string" && b in BADGE_THRESHOLDS) set.add(b as BadgeId);
  }
  for (const badge of getEarnedBadgesForStreak(streak)) set.add(badge);
  return Array.from(set.values());
}
