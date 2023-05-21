# MercStreaks

An open source clone of a popular streak game

## Features

- New `/app` dir,
- Server and Client Components
- API Routes and Middlewares
- Authentication using **Clerk**
- ORM using **Prisma**
- Database on **Vercel Postgresql**
- UI Components built using **Radix UI** and **Shadcn/ui**
- Styled using **Tailwind CSS**
- Written in **TypeScript**
- Deployed to **Vercel**
- Validations using **Zod** --Coming Soon--

## Roadmap

- [x] Auth
- [x] Db Models
- [x] Event List
- [x] Select / Unselect Pick
- [ ] Complete Event
- [ ] Calculate Streak
- [ ] Cron jobs to Complete Events and Calculate Streaks
- [ ] Cron jobs to Generate Events
- [ ] Event Details
- [ ] Leaderboard
- [ ] User Profile
- [ ] Home Page
- [ ] Pick History
- [ ] Campaigns
- [ ] Campaign History
- [ ] User Stats
- [ ] User Settings
- [ ] User Notifications
- [ ] Groups
- [ ] Add to Group
- [ ] Group Leaderboard
- [ ] Group Stats
- [ ] Group Settings
- [ ] Admin Panel
- [ ] Manage Users
- [ ] Manage Groups
- [ ] Manage Events
- [ ] Manage Campaigns
- [ ] Manage Notifications
- [ ] View Pick Logs

## Running Locally

1. Install dependencies using npm:

```sh
npm install
```

2. Copy `.env.example` to `.env.local` and update the variables.

```sh
cp .env.example .env.local
```

3. Start the development server:

```sh
npm run dev
```
