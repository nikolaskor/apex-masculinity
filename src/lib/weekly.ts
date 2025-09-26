export function computeWeek(currentStreak: number): 1 | 2 | 3 | 4 {
  if (currentStreak <= 0) return 1;
  // Day in 28-day cycle: 1..28
  const dayOfCycle = ((currentStreak - 1) % 28) + 1;
  // Weeks are 1..4
  const week = Math.ceil(dayOfCycle / 7) as 1 | 2 | 3 | 4;
  return week;
}
