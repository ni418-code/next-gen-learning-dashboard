# Next-Gen Student Learning Dashboard

A high-fidelity student dashboard prototype built for the Frontend Intern Challenge. Dark-mode Bento Grid layout with live Supabase data, Framer Motion spring animations, and full responsive behaviour.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Language:** TypeScript

## Architecture

### Server / Client split

`app/page.tsx` is an async Server Component. It calls `getCourses()` from `app/actions.ts` on the server, then passes the result as a prop to `DashboardClient` — a Client Component that manages interactive state (sidebar tab, optimistic updates). No data-fetching happens on the client side; Supabase credentials never reach the browser.

`app/actions.ts` uses `"use server"` and calls `@supabase/supabase-js` directly. After every mutation (add, update, delete), it calls `revalidatePath("/")` so Next.js revalidates the cached page data.

`app/loading.tsx` provides the route-level skeleton UI (pulsing placeholder tiles) shown while the server fetch resolves on first navigation.

### Framer Motion approach

- **Staggered entrance:** `DashboardClient` wraps tiles in a `staggerChildren: 0.05` variants container so they fade and translate up sequentially, not all at once.
- **Hover elevation:** `CourseCard` uses `whileHover={{ y: -4, scale: 1.02 }}` with `type: "spring", stiffness: 300, damping: 20` — exact spring values from the brief.
- **Sidebar highlight:** `layoutId="desktopActiveHighlight"` on the active nav item creates a gliding background that snaps between items using layout animations, not CSS transitions.
- **Progress bar:** Animates from `width: 0` to the real value on mount using a spring (`stiffness: 60, damping: 15`).
- All animations use only `transform` and `opacity` — no layout-triggering properties — to guarantee zero layout shift.

### Responsive breakpoints

- **Desktop (> 1024px):** Full sidebar with text labels, 3-column Bento grid.
- **Tablet (768px – 1024px):** Sidebar collapses to icon-only view (`w-20`).
- **Mobile (< 768px):** Sidebar hidden entirely; fixed bottom navigation bar replaces it. Grid stacks to single column.

### Supabase schema

```sql
create table courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  progress integer not null check (progress >= 0 and progress <= 100),
  icon_name text not null,
  created_at timestamp with time zone default now()
);

alter table courses enable row level security;
create policy "Public read access" on courses for select using (true);
```

## Setup

1. Clone the repository
2. Run `npm install`
3. Copy `.env.example` to `.env.local` and add your Supabase project URL and anon key (Supabase Dashboard → Settings → API)
4. Run the SQL schema above in your Supabase SQL Editor
5. Run `npm run dev` and open `http://localhost:3000`

## Environment Variables

| Variable | Where to find it |
|----------|-----------------|
| `SUPABASE_URL` | Supabase Dashboard → Settings → API → Project URL |
| `SUPABASE_ANON_KEY` | Supabase Dashboard → Settings → API → anon public key |
