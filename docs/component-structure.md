# Component Architecture - Apex Masculinity Challenge

## Overview

This document outlines the complete component architecture for the Apex Masculinity Challenge application, including React components, custom hooks, utilities, API structure, and TypeScript interfaces.

---

## 📋 Table of Contents

1. [Project Structure](#project-structure)
2. [Component Details](#component-details)
3. [Custom Hooks](#custom-hooks)
4. [Utilities & Libraries](#utilities--libraries)
5. [API Endpoints](#api-endpoints)
6. [TypeScript Interfaces](#typescript-interfaces)

---

## Project Structure

### 📁 App Routes (Next.js 15 App Router)

```
app/
├── layout.tsx              # Root layout with global providers
├── page.tsx                # Landing/home page
├── (auth)/                 # Auth route group
│   ├── login/
│   │   └── page.tsx        # Login page
│   └── register/
│       └── page.tsx        # Registration page
└── dashboard/              # Protected dashboard routes
    ├── layout.tsx          # Authenticated layout wrapper
    ├── page.tsx            # Main dashboard page
    └── leaderboard/
        └── page.tsx        # Leaderboard page
```

### 🧩 Components Structure

```
components/
├── ui/                     # shadcn/ui base components
│   ├── button.tsx
│   ├── input.tsx
│   ├── card.tsx
│   ├── progress.tsx
│   ├── badge.tsx
│   ├── table.tsx
│   └── alert-dialog.tsx
├── auth/                   # Authentication components
│   ├── LoginForm.tsx
│   ├── RegisterForm.tsx
│   └── AuthGuard.tsx
├── dashboard/              # Dashboard-specific components
│   ├── DashboardHeader.tsx
│   ├── ProgressSection.tsx
│   ├── DailyChecklist.tsx
│   ├── TaskItem.tsx
│   ├── WeeklyChallenge.tsx
│   └── StreakCounter.tsx
├── leaderboard/            # Leaderboard components
│   ├── LeaderboardTable.tsx
│   ├── UserRank.tsx
│   └── BadgeIcon.tsx
└── shared/                 # Reusable components
    ├── Badge.tsx
    ├── ProgressBar.tsx
    └── ConfirmationModal.tsx
```

### 🎣 Custom Hooks

```
hooks/
├── useAuth.ts              # Authentication state management
├── useStreak.ts            # User streak tracking
├── useDailyTasks.ts        # Daily task completion logic
├── useLeaderboard.ts       # Leaderboard data fetching
├── useTimezone.ts          # User timezone handling
└── useMidnightReset.ts     # Automatic daily reset logic
```

### 📚 Utilities & Libraries

```
lib/
├── supabase.ts             # Supabase client configuration
├── auth.ts                 # Authentication helper functions
├── database.ts             # Database operation wrappers
├── badges.ts               # Badge calculation and logic
├── timezone.ts             # Timezone handling utilities
└── constants.ts            # App constants and static data
```

---

## Component Details

### 🔐 Authentication Components

#### `LoginForm.tsx`

**Purpose:** User login interface with form validation

| Feature              | Description                                |
| -------------------- | ------------------------------------------ |
| **Form Fields**      | Email and password input with validation   |
| **Validation**       | Zod schema validation with error messages  |
| **Authentication**   | Supabase auth integration                  |
| **State Management** | Loading states and error handling          |
| **Navigation**       | Automatic redirect to dashboard on success |

#### `RegisterForm.tsx`

**Purpose:** User registration with profile creation

| Feature                   | Description                                      |
| ------------------------- | ------------------------------------------------ |
| **Form Fields**           | Email, password, and username inputs             |
| **Validation**            | Username uniqueness and password strength checks |
| **Profile Setup**         | Automatic profile creation after auth signup     |
| **Streak Initialization** | Creates initial `user_streaks` record            |
| **Error Handling**        | Comprehensive error messages and recovery        |

#### `AuthGuard.tsx`

**Purpose:** Route protection for authenticated areas

| Feature                | Description                                      |
| ---------------------- | ------------------------------------------------ |
| **Route Protection**   | Blocks unauthenticated access to dashboard       |
| **Redirects**          | Sends users to login page when not authenticated |
| **Loading States**     | Shows spinner during authentication check        |
| **Session Management** | Handles session expiration and refresh           |

### 🏠 Dashboard Components

#### `DashboardHeader.tsx`

**Purpose:** Main navigation and user information display

| Feature               | Description                            |
| --------------------- | -------------------------------------- |
| **Branding**          | App logo and name display              |
| **User Info**         | Username and avatar display            |
| **Streak Display**    | Current streak counter with flame icon |
| **Navigation**        | Menu items and logout functionality    |
| **Responsive Design** | Mobile-friendly hamburger menu         |

#### `ProgressSection.tsx`

**Purpose:** Visual progress tracking and badge display

| Feature                   | Description                                 |
| ------------------------- | ------------------------------------------- |
| **Current Status**        | Today's date and completion status          |
| **Badge Display**         | Current badge with icon and description     |
| **Progress Tracking**     | Visual progress bar to next badge milestone |
| **Streak Visualization**  | Flame animation based on streak length      |
| **Motivational Elements** | Encouraging messages and achievements       |

#### `DailyChecklist.tsx`

**Purpose:** Container for all daily tasks and weekly challenges

| Feature                 | Description                                   |
| ----------------------- | --------------------------------------------- |
| **Task Organization**   | Groups tasks by category (Mind, Body, Spirit) |
| **Progress Indicator**  | Shows completion ratio (X/10 completed)       |
| **Category Headers**    | Visual separation of task categories          |
| **Weekly Challenge**    | Special challenge section for current week    |
| **Completion Tracking** | Real-time updates as tasks are completed      |

#### `TaskItem.tsx`

**Purpose:** Individual task checkbox with details

| Feature                  | Description                                   |
| ------------------------ | --------------------------------------------- |
| **Interactive Checkbox** | Click to mark task as complete                |
| **Task Information**     | Name, description, and category display       |
| **Visual States**        | Different styling for completed/pending tasks |
| **Persistence**          | Cannot uncheck once marked complete           |
| **Hover Effects**        | Tooltips with additional task information     |

#### `WeeklyChallenge.tsx`

**Purpose:** Weekly challenge display and completion tracking

| Feature                 | Description                                    |
| ----------------------- | ---------------------------------------------- |
| **Challenge Display**   | Current week's challenge title and description |
| **Week Calculation**    | Automatically determines current week (1-4)    |
| **Completion Tracking** | Checkbox for challenge completion              |
| **Progress Indication** | Shows which week user is currently on          |
| **Challenge Rotation**  | Cycles through 4 different weekly challenges   |

#### `StreakCounter.tsx`

**Purpose:** Detailed streak information and motivation

| Feature             | Description                                |
| ------------------- | ------------------------------------------ |
| **Current Streak**  | Large display of current consecutive days  |
| **Flame Animation** | Animated flame icon that grows with streak |
| **Personal Best**   | Display of longest streak achieved         |
| **Next Milestone**  | Days remaining until next badge unlock     |
| **Visual Appeal**   | Engaging animations and color schemes      |

### 🏆 Leaderboard Components

#### `LeaderboardTable.tsx`

**Purpose:** Ranked display of all users with real-time updates

| Feature                    | Description                                |
| -------------------------- | ------------------------------------------ |
| **User Ranking**           | Sorted list of users by current streak     |
| **Column Display**         | Username, badge, and streak information    |
| **Current User Highlight** | Special styling for logged-in user's row   |
| **Real-time Updates**      | Live updates via Supabase subscriptions    |
| **Pagination**             | Handles large numbers of users efficiently |

#### `UserRank.tsx`

**Purpose:** Individual user row in leaderboard

| Feature                  | Description                                     |
| ------------------------ | ----------------------------------------------- |
| **Rank Display**         | User's position in leaderboard (1st, 2nd, etc.) |
| **User Information**     | Username and profile details                    |
| **Badge Integration**    | Visual badge icons with tooltips                |
| **Streak Formatting**    | Formatted streak display with icons             |
| **Interactive Elements** | Hover effects and clickable elements            |

#### `BadgeIcon.tsx`

**Purpose:** Visual representation of user achievement badges

| Feature                    | Description                                   |
| -------------------------- | --------------------------------------------- |
| **Badge Variants**         | Bronze, Silver, Gold, Diamond representations |
| **Icon System**            | SVG icons for each badge tier                 |
| **Tooltips**               | Hover information about badge requirements    |
| **Responsive Design**      | Scales appropriately across devices           |
| **Achievement Indication** | Clear visual hierarchy of accomplishments     |

### 🔄 Shared Components

#### `Badge.tsx`

**Purpose:** Reusable badge component for various contexts

| Feature               | Description                            |
| --------------------- | -------------------------------------- |
| **Multiple Variants** | Bronze, silver, gold, diamond options  |
| **Flexible Styling**  | Customizable colors and sizes          |
| **Icon Integration**  | Combines icons with text labels        |
| **Accessibility**     | Proper ARIA labels and semantic markup |
| **Consistent Design** | Maintains design system standards      |

#### `ProgressBar.tsx`

**Purpose:** Visual progress indicator for various metrics

| Feature                     | Description                              |
| --------------------------- | ---------------------------------------- |
| **Customizable Colors**     | Theme-based color schemes                |
| **Percentage Calculations** | Automatic progress calculations          |
| **Smooth Animations**       | Animated progress transitions            |
| **Responsive Design**       | Adapts to container width                |
| **Accessibility**           | Screen reader friendly with proper roles |

#### `ConfirmationModal.tsx`

**Purpose:** Reusable confirmation dialogs for critical actions

| Feature                   | Description                                  |
| ------------------------- | -------------------------------------------- |
| **Action Confirmation**   | Prevents accidental critical actions         |
| **Streak Reset Warnings** | Special handling for streak-breaking actions |
| **Task Completion**       | Confirms important task completions          |
| **Customizable Content**  | Flexible title, message, and button text     |
| **Keyboard Navigation**   | Full keyboard accessibility support          |

---

## Custom Hooks

### `useAuth.ts`

**Purpose:** Centralized authentication state management

```typescript
// Returns current user, loading state, and auth functions
const { user, loading, signIn, signUp, signOut } = useAuth();
```

### `useStreak.ts`

**Purpose:** User streak tracking and calculations

```typescript
// Returns streak data and update functions
const { currentStreak, longestStreak, badges, updateStreak } = useStreak();
```

### `useDailyTasks.ts`

**Purpose:** Daily task completion logic and state

```typescript
// Returns task completion state and functions
const { completedTasks, completeTask, resetTasks, canComplete } =
  useDailyTasks();
```

### `useLeaderboard.ts`

**Purpose:** Leaderboard data fetching and real-time updates

```typescript
// Returns leaderboard data with real-time updates
const { leaderboard, userRank, loading, refresh } = useLeaderboard();
```

### `useTimezone.ts`

**Purpose:** User timezone detection and handling

```typescript
// Returns user timezone and date utilities
const { timezone, localDate, convertToUserTime } = useTimezone();
```

### `useMidnightReset.ts`

**Purpose:** Automatic daily reset functionality

```typescript
// Handles automatic reset at midnight in user's timezone
const { timeUntilReset, triggerReset } = useMidnightReset();
```

---

## Utilities & Libraries

### `supabase.ts`

**Purpose:** Supabase client configuration and initialization

| Export          | Description                             |
| --------------- | --------------------------------------- |
| `supabase`      | Configured Supabase client instance     |
| `supabaseAdmin` | Admin client for server-side operations |

### `auth.ts`

**Purpose:** Authentication helper functions

| Function          | Description                      |
| ----------------- | -------------------------------- |
| `getUser()`       | Get current authenticated user   |
| `requireAuth()`   | Throw error if not authenticated |
| `createProfile()` | Create user profile after signup |

### `database.ts`

**Purpose:** Database operation wrappers

| Function                  | Description                  |
| ------------------------- | ---------------------------- |
| `getUserStreak()`         | Fetch user streak data       |
| `updateDailyCompletion()` | Record daily task completion |
| `getLeaderboard()`        | Fetch ranked user list       |

### `badges.ts`

**Purpose:** Badge calculation and achievement logic

| Function                    | Description                  |
| --------------------------- | ---------------------------- |
| `calculateBadge()`          | Determine current badge tier |
| `getNextBadgeRequirement()` | Days needed for next badge   |
| `getBadgeIcon()`            | Get appropriate badge icon   |

### `timezone.ts`

**Purpose:** Timezone handling utilities

| Function              | Description                           |
| --------------------- | ------------------------------------- |
| `getUserTimezone()`   | Detect user's timezone                |
| `getMidnightTime()`   | Calculate midnight in user's timezone |
| `formatDateForUser()` | Format date in user's timezone        |

### `constants.ts`

**Purpose:** Application constants and static data

| Constant             | Description                  |
| -------------------- | ---------------------------- |
| `DAILY_TASKS`        | Array of 10 challenge tasks  |
| `WEEKLY_CHALLENGES`  | Array of 4 weekly challenges |
| `BADGE_REQUIREMENTS` | Badge tier requirements      |

---

## API Endpoints

### 🔐 Authentication

| Endpoint             | Method | Description                            |
| -------------------- | ------ | -------------------------------------- |
| `/api/auth/login`    | `POST` | User login with email/password         |
| `/api/auth/register` | `POST` | User registration and profile creation |
| `/api/auth/logout`   | `POST` | User logout and session cleanup        |

### 👤 User Management

| Endpoint            | Method | Description                       |
| ------------------- | ------ | --------------------------------- |
| `/api/user/profile` | `GET`  | Fetch current user profile        |
| `/api/user/profile` | `PUT`  | Update user profile information   |
| `/api/user/streak`  | `GET`  | Get user's streak data and badges |

### ✅ Task Management

| Endpoint                     | Method | Description                             |
| ---------------------------- | ------ | --------------------------------------- |
| `/api/tasks/daily`           | `GET`  | Fetch daily tasks and completion status |
| `/api/tasks/complete`        | `POST` | Mark daily task as completed            |
| `/api/tasks/weekly`          | `GET`  | Get current weekly challenge            |
| `/api/tasks/weekly-complete` | `POST` | Mark weekly challenge as completed      |

### 🏆 Leaderboard

| Endpoint                    | Method | Description                              |
| --------------------------- | ------ | ---------------------------------------- |
| `/api/leaderboard`          | `GET`  | Fetch ranked list of all users           |
| `/api/leaderboard/user/:id` | `GET`  | Get specific user's leaderboard position |

### ⚙️ System

| Endpoint                     | Method | Description                    |
| ---------------------------- | ------ | ------------------------------ |
| `/api/system/midnight-reset` | `POST` | Trigger daily reset (cron job) |
| `/api/system/health`         | `GET`  | System health check endpoint   |

---

## TypeScript Interfaces

### 👤 User Types

```typescript
interface User {
  id: string;
  email: string;
  username: string;
  created_at: string;
}

interface UserStreak {
  id: string;
  user_id: string;
  current_streak: number;
  longest_streak: number;
  last_completion_date: string;
  badges: string[];
}
```

### ✅ Task Types

```typescript
interface Task {
  id: number;
  name: string;
  description: string;
  category: "mind" | "body" | "spirit";
  order_index: number;
}

interface DailyCompletion {
  id: string;
  user_id: string;
  completion_date: string;
  tasks_completed: number[];
  weekly_challenge_completed: boolean;
  week_number: number;
  timezone: string;
}
```

### 🎨 UI Types

```typescript
interface LeaderboardEntry {
  rank: number;
  username: string;
  current_streak: number;
  badges: string[];
  user_id: string;
}

interface BadgeType {
  name: string;
  icon: string;
  requirement: number;
  description: string;
}
```

---

## 🔗 Related Documentation

- [Database Schema](./database-schema.md)
- [Project Specification](./project-spec.md)
