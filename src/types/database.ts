// Types for Supabase Database

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type BadgeId = "30_day" | "60_day" | "90_day" | "365_day";

export interface Database {
  public: {
    tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id: string;
          username: string;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          username?: string;
          updated_at?: string | null;
        };
      };
      user_streaks: {
        Row: {
          id: string;
          user_id: string;
          current_streak: number;
          longest_streak: number;
          last_completion_date: string | null; // ISO date (YYYY-MM-DD)
          badges: BadgeId[] | Json; // stored as jsonb
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          current_streak?: number;
          longest_streak?: number;
          last_completion_date?: string | null;
          badges?: BadgeId[] | Json;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          current_streak?: number;
          longest_streak?: number;
          last_completion_date?: string | null;
          badges?: BadgeId[] | Json;
          updated_at?: string | null;
        };
      };
      daily_completions: {
        Row: {
          id: string;
          user_id: string;
          completion_date: string; // ISO date (YYYY-MM-DD)
          tasks_completed: number[] | Json; // stored as jsonb
          weekly_challenge_completed: boolean;
          week_number: number | null;
          timezone: string;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          completion_date: string;
          tasks_completed: number[] | Json;
          weekly_challenge_completed?: boolean;
          week_number?: number | null;
          timezone: string;
          created_at?: string | null;
        };
        Update: {
          tasks_completed?: number[] | Json;
          weekly_challenge_completed?: boolean;
          week_number?: number | null;
          timezone?: string;
        };
      };
      challenge_tasks: {
        Row: {
          id: number;
          name: string;
          description: string;
          category: "mind" | "body" | "spirit";
          order_index: number;
        };
        Insert: {
          id: number;
          name: string;
          description: string;
          category: "mind" | "body" | "spirit";
          order_index: number;
        };
        Update: {
          name?: string;
          description?: string;
          category?: "mind" | "body" | "spirit";
          order_index?: number;
        };
      };
      weekly_challenges: {
        Row: {
          id: number;
          week_number: number;
          title: string;
          description: string;
        };
        Insert: {
          id: number;
          week_number: number;
          title: string;
          description: string;
        };
        Update: {
          week_number?: number;
          title?: string;
          description?: string;
        };
      };
    };
  };
}

export type Tables = Database["public"]["tables"];

export type Profile = Tables["profiles"]["Row"];
export type UserStreak = Tables["user_streaks"]["Row"];
export type DailyCompletion = Tables["daily_completions"]["Row"];
export type ChallengeTask = Tables["challenge_tasks"]["Row"];
export type WeeklyChallenge = Tables["weekly_challenges"]["Row"];
