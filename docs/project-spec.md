# The Apex Masculinity Challenge App - Complete Project Specification

## Project Overview
A web-based habit tracking application inspired by Andrew Tate's masculinity challenge, focusing on daily accountability, streak tracking, and community competition through public leaderboards. Users complete 10 daily tasks and weekly challenges with zero tolerance for failure - missing any task resets their streak to Day 1.

## Tech Stack

### Frontend:
- **Next.js 15** (App Router)
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Shadcn/ui** for component library
- **React Hook Form** for form handling
- **Zod** for form validation
- **Lucide React** for icons

### Backend & Database:
- **Supabase** (PostgreSQL database, Authentication, Real-time subscriptions)
- **Supabase Auth** for user management
- **Row Level Security (RLS)** for data protection

### Deployment:
- **Vercel** for hosting
- **Supabase Cloud** for database

## Core Features & User Flow

### 1. Authentication Flow
- **Landing Page**: Hero section explaining the challenge + Login/Register buttons
- **Registration**: Email/Password + Username selection (must be unique)
- **Login**: Email/Password authentication
- **Dashboard Redirect**: After auth, redirect to main dashboard

### 2. Main Dashboard
**Layout Components:**
- **Header**: Logo, Username, Current Streak, Logout
- **Progress Section**: Current day, current badge, next badge target
- **Daily Checklist**: 10 tasks with checkboxes
- **Weekly Challenge**: Current week's challenge with completion status
- **Leaderboard**: Top 10 + user's position

### 3. Daily Task Completion
**Task Categories (Visual Grouping):**

#### Mind & Focus (4 tasks):
1. ✅ Read 10 pages non-fiction
2. ✅ 60 minutes learning high-value skill
3. ✅ Zero mindless social media
4. ✅ 10 minutes stillness/meditation

#### Body & Discipline (4 tasks):
5. ✅ 45-60 minute workout
6. ✅ Cold shower (3+ minutes)
7. ✅ Clean diet
8. ✅ Drink 4 liters water

#### Spirit & Action (2 tasks):
9. ✅ No pornography/masturbation
10. ✅ Complete top 3 daily tasks

**Interaction:**
- Click checkbox → Task marked complete (green checkmark)
- Hover shows full task description
- Cannot uncheck once checked
- Progress bar shows X/10 completed

### 4. Weekly Challenge System
**Weekly Rotation:**
- **Week 1**: Face a Fear
- **Week 2**: 24-hour Digital Detox
- **Week 3**: Act of Service  
- **Week 4**: Create Something

**User determines their current week** based on: `(current_streak - 1) % 28 + 1` to get day of cycle, then divide by 7 for week.

### 5. Midnight Reset Logic
**Automated Process:**
- At 11:59 PM local time: Check if user completed all 10 tasks + weekly challenge
- **If incomplete**: Reset streak to 0, create notification
- **If complete**: Increment streak, check for badge eligibility
- New day starts with fresh checklist

### 6. Badge System
**Badge Types:**
- **Bronze (30 days)**: "The Committed" 
- **Silver (60 days)**: "The Disciplined"
- **Gold (90 days)**: "The Unstoppable"
- **Diamond (365 days)**: "The Apex"

**Badge Logic:**
- Earned badges are permanent
- Must complete consecutive streaks for upgrades
- Visual badge display on profile and leaderboard

### 7. Leaderboard
**Display Format:**
Rank | Username | Badge | Current Streak | Days
1  | AlphaMax | 💎    |     400        | days
2  | IronWill | 🥇    |      95        | days
3  | Beast01  | 🥈    |      67        | days
4  | Warrior7 | 🥉    |      45        | days
5  | Grinder  | -     |      28        | days

**Sorting:** By current streak (highest first)
**Updates:** Real-time using Supabase subscriptions

## Key User Interactions

### 1. Task Completion Flow
User clicks task checkbox →
Frontend updates UI immediately →
Call API to save completion →
Update progress bar →
Check if all tasks complete →
Show congratulations or remaining tasks

### 2. Streak Reset Flow
Midnight timer triggers →
Check completion status →
If incomplete: Show modal "You missed X tasks. Streak reset to Day 1" →
User acknowledges →
Reset streak in database →
Refresh dashboard

### 3. Badge Earning Flow
Streak increment triggers →
Check against badge thresholds →
If milestone reached: Show celebration modal →
Update user badges →
Update leaderboard →
Social sharing option

## Real-time Features

### Supabase Subscriptions
- **Leaderboard updates**: Live streak changes
- **User streak updates**: Real-time progress
- **Daily completions**: Live task completion status

### Background Processes
- **Midnight reset checker**: Every minute check for users past midnight
- **Timezone handling**: Convert all times to user's local timezone
- **Streak calculations**: Update longest streak records

## UI/UX Specifications

### Design Theme
- **Colors**: Dark theme with gold/bronze accents for badges
- **Typography**: Bold, masculine fonts (Inter/Roboto)
- **Layout**: Clean, minimal, focus on data
- **Mobile-first**: Responsive design

### Key Visual Elements
- **Progress Circles**: For daily completion (X/10)
- **Streak Flames**: Visual streak representation
- **Badge Icons**: Distinctive badge designs
- **Leaderboard Cards**: Clean ranking display

### Animation/Feedback
- Task completion: Green checkmark animation
- Streak milestone: Celebration confetti
- Reset warning: Red modal with confirmation
- Badge earned: Gold badge animation