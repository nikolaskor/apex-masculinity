export interface AppUser {
  id: string;
  email: string;
  displayName?: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface Habit {
  id: string;
  userId: string;
  title: string;
  description?: string;
  frequency: "daily" | "weekly" | "monthly";
  createdAt: string;
  archived?: boolean;
}

export interface HabitEntry {
  id: string;
  habitId: string;
  date: string; // ISO date (yyyy-mm-dd)
  completed: boolean;
  notes?: string;
  createdAt: string;
}

export interface LeaderboardEntry {
  userId: string;
  displayName: string;
  totalCompletions: number;
  rank: number;
}

export interface AuthCredentials {
  email: string;
  password: string;
}
