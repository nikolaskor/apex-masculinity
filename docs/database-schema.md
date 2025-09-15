# Database Schema - Apex Masculinity Challenge

## Overview

This document outlines the complete database schema for the Apex Masculinity Challenge application using Supabase as the backend.

---

## 📋 Table of Contents

1. [Core Tables](#core-tables)
2. [Row Level Security Policies](#row-level-security-policies)
3. [Initial Data](#initial-data)

---

## Core Tables

### 1. Users Table (auth.users)

> **Built-in Supabase authentication table**

| Column       | Type        | Description                 |
| ------------ | ----------- | --------------------------- |
| `id`         | `uuid`      | Primary key, auto-generated |
| `email`      | `text`      | User's email address        |
| `created_at` | `timestamp` | Account creation timestamp  |
| `updated_at` | `timestamp` | Last update timestamp       |

### 2. Profiles Table

Extends user information for the application.

```sql
CREATE TABLE profiles (
  id uuid references auth.users primary key,
  username text unique not null,
  created_at timestamp default now(),
  updated_at timestamp default now()
);
```

| Column       | Type        | Description                |
| ------------ | ----------- | -------------------------- |
| `id`         | `uuid`      | References `auth.users.id` |
| `username`   | `text`      | Unique display name        |
| `created_at` | `timestamp` | Profile creation timestamp |
| `updated_at` | `timestamp` | Last profile update        |

### 3. User Streaks Table

Tracks user progress and achievements.

```sql
CREATE TABLE user_streaks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  current_streak integer default 0,
  longest_streak integer default 0,
  last_completion_date date,
  badges jsonb default '[]',
  created_at timestamp default now(),
  updated_at timestamp default now()
);
```

| Column                 | Type        | Description                                                         |
| ---------------------- | ----------- | ------------------------------------------------------------------- |
| `id`                   | `uuid`      | Primary key                                                         |
| `user_id`              | `uuid`      | References `auth.users.id`                                          |
| `current_streak`       | `integer`   | Current consecutive completion days                                 |
| `longest_streak`       | `integer`   | Longest streak ever achieved                                        |
| `last_completion_date` | `date`      | Last day user completed all tasks                                   |
| `badges`               | `jsonb`     | Array of earned badges: `["30_day", "60_day", "90_day", "365_day"]` |
| `created_at`           | `timestamp` | Record creation timestamp                                           |
| `updated_at`           | `timestamp` | Last update timestamp                                               |

### 4. Daily Completions Table

Records daily task completion status.

```sql
CREATE TABLE daily_completions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  completion_date date not null,
  tasks_completed jsonb not null,
  weekly_challenge_completed boolean default false,
  week_number integer,
  timezone text not null,
  created_at timestamp default now(),

  UNIQUE(user_id, completion_date)
);
```

| Column                       | Type        | Description                                |
| ---------------------------- | ----------- | ------------------------------------------ |
| `id`                         | `uuid`      | Primary key                                |
| `user_id`                    | `uuid`      | References `auth.users.id`                 |
| `completion_date`            | `date`      | Date of completion                         |
| `tasks_completed`            | `jsonb`     | Array of completed task IDs                |
| `weekly_challenge_completed` | `boolean`   | Whether weekly challenge was completed     |
| `week_number`                | `integer`   | Current week in streak (1-4)               |
| `timezone`                   | `text`      | User's timezone for accurate date tracking |
| `created_at`                 | `timestamp` | Record creation timestamp                  |

**Constraints:**

- Unique constraint on `(user_id, completion_date)` prevents duplicate entries

### 5. Challenge Tasks Table (Static/Reference)

Defines the 10 daily challenge tasks.

```sql
CREATE TABLE challenge_tasks (
  id integer primary key,
  name text not null,
  description text not null,
  category text not null,
  order_index integer not null
);
```

| Column        | Type      | Description                                      |
| ------------- | --------- | ------------------------------------------------ |
| `id`          | `integer` | Primary key                                      |
| `name`        | `text`    | Task name/title                                  |
| `description` | `text`    | Detailed task description                        |
| `category`    | `text`    | Task category: `"mind"`, `"body"`, or `"spirit"` |
| `order_index` | `integer` | Display order (1-10)                             |

### 6. Weekly Challenges Table (Static/Reference)

Defines the 4 weekly challenges.

```sql
CREATE TABLE weekly_challenges (
  id integer primary key,
  week_number integer not null,
  title text not null,
  description text not null
);
```

| Column        | Type      | Description                    |
| ------------- | --------- | ------------------------------ |
| `id`          | `integer` | Primary key                    |
| `week_number` | `integer` | Week number (1-4)              |
| `title`       | `text`    | Challenge title                |
| `description` | `text`    | Detailed challenge description |

---

## Row Level Security Policies

### Profiles Table

```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can read all profiles (for leaderboard functionality)
CREATE POLICY "Profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

-- Users can only update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Users can only insert their own profile
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
```

### User Streaks Table

```sql
ALTER TABLE user_streaks ENABLE ROW LEVEL SECURITY;

-- User streaks are viewable by everyone (for leaderboard)
CREATE POLICY "User streaks viewable by everyone" ON user_streaks
  FOR SELECT USING (true);

-- Users can only update their own streak data
CREATE POLICY "Users can update own streak" ON user_streaks
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can only insert their own streak data
CREATE POLICY "Users can insert own streak" ON user_streaks
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### Daily Completions Table

```sql
ALTER TABLE daily_completions ENABLE ROW LEVEL SECURITY;

-- Users can only view their own completion data
CREATE POLICY "Users can view own completions" ON daily_completions
  FOR SELECT USING (auth.uid() = user_id);

-- Users can only insert their own completion data
CREATE POLICY "Users can insert own completions" ON daily_completions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can only update their own completion data
CREATE POLICY "Users can update own completions" ON daily_completions
  FOR UPDATE USING (auth.uid() = user_id);
```

---

## Initial Data

### Challenge Tasks

The 10 core daily challenge tasks organized by category:

```sql
INSERT INTO challenge_tasks (id, name, description, category, order_index) VALUES
-- MIND Category
(1, 'Read 10 pages non-fiction', 'Physical book only. Topics: self-improvement, business, history, philosophy, practical skills', 'mind', 1),
(2, '60 minutes learning high-value skill', 'Focused deep work: coding, language, sales, video editing, instrument, martial arts', 'mind', 2),
(3, 'Zero mindless social media', 'Max 15min business-related on computer only. No TikTok, Instagram, Twitter apps', 'mind', 3),
(4, '10 minutes stillness/meditation', 'Quiet room, no music, no phone, no distractions. Comfort with your own mind', 'mind', 4),

-- BODY Category
(5, '45-60 minute workout', 'Intentional exercise: weightlifting, calisthenics, running, martial arts. No casual walks', 'body', 5),
(6, 'Cold shower (3+ minutes)', 'Last 3 minutes fully cold. Builds mental fortitude and discipline', 'body', 6),
(7, 'Clean diet - zero cheating', 'No alcohol, junk food, soda, fast food. Focus: meat, fish, eggs, vegetables, fruits, nuts', 'body', 7),
(8, 'Drink 4 liters water', 'Critical for mental and physical performance', 'body', 8),

-- SPIRIT Category
(9, 'No pornography/masturbation', 'Ultimate dopamine fast. Reset reward system, increase energy, seek genuine achievement', 'spirit', 9),
(10, 'Complete top 3 daily tasks', 'Morning: define 3 most important tasks. Complete before day ends', 'spirit', 10);
```

### Weekly Challenges

Special challenges that unlock each week:

```sql
INSERT INTO weekly_challenges (id, week_number, title, description) VALUES
(1, 1, 'Face a Fear', 'Do something genuinely uncomfortable: talk to stranger, give presentation, ask for raise'),
(2, 2, '24-hour Digital Detox', 'Zero screen time for 24 hours. No phone, computer, TV. Read, exercise, nature, face-to-face time'),
(3, 3, 'Act of Service', 'Help someone without expecting return, ideally anonymously. Pay for coffee, volunteer, help friend'),
(4, 4, 'Create Something', 'Produce something tangible: article, furniture, song, business plan, complex meal from scratch');
```

---

## 🔗 Related Documentation

- [Project Specification](./project-spec.md)
- [Component Structure](./component-structure.md)
