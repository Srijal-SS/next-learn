# Next-Learn — Next-Gen Learning Dashboard

A high-fidelity **Student Dashboard** prototype built for a Frontend Intern Challenge. It features a Bento Grid layout, deep dark mode aesthetics, Framer Motion animations, Supabase for live data, and Google OAuth authentication.

## Live Demo

> Deployed on Vercel — [Link to be added]

## Quick Start

1. **Clone and Install**:
   ```bash
   npm install
   ```

2. **Supabase Setup**:
   - Create a free Supabase project at [supabase.com](https://supabase.com).
   - Go to the **SQL Editor** in Supabase and run the full script in `supabase/schema.sql`. This creates all tables, Row Level Security policies, and seeds the courses.
   - Copy `.env.example` to `.env.local` and fill in your Supabase credentials:
     ```bash
     cp .env.example .env.local
     ```

3. **Supabase Auth — Google OAuth**:
   - In the Supabase dashboard, go to **Authentication → Providers → Google**.
   - Enable it and add your Google OAuth Client ID and Secret.
   - Set the redirect URL to `http://localhost:3000/auth/callback` (and your Vercel domain for production).

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

---

## Architectural Choices & Component Split

### 1. Server vs. Client Components

The app deliberately uses **both** Server and Client Components for different concerns:

- **Server Components** handle secure, authenticated data:
  - `app/layout.tsx` — loads fonts and renders the shell.
  - `app/settings/page.tsx` — fetches user metadata directly from Supabase server-side.
  - `src/proxy.ts` — the Next.js middleware equivalent that runs on every request to enforce auth guards before any page renders.

- **Client Components** handle interactivity and real-time state:
  - `components/Sidebar.tsx` — uses `useState` for expand/collapse and listens to Supabase `onAuthStateChange` to keep auth state in sync.
  - `components/HeroTile.tsx`, `ActivityTile.tsx`, `UserCoursesList.tsx` — read from the **Zustand store** which is populated once on login.
  - `store/useStore.ts` — a Zustand store that runs `fetchUser()` once after authentication, batching all user-specific Supabase queries (`profiles`, `user_activity`, `user_courses`, `courses`) in a single `Promise.all` for optimal performance.

**Why Zustand for course data?** The requirement for real-time enrollment UX (clicking "Enroll Now" instantly moves a course from Explore → My Courses without a page reload) requires client-side state. A Zustand store lets us update the UI optimistically after the Supabase insert, which a pure Server Component model cannot do. The initial data fetch is still triggered server-side via the proxy auth gate.

### 2. Animation Architecture

All animations are handled by **Framer Motion** with strict adherence to the zero-layout-shift constraint:

- **Staggered entrance**: Every Bento tile uses `AnimatedTile.tsx` — a wrapper component with `initial: { opacity: 0, y: 20 }` and spring physics (`stiffness: 300, damping: 20`). Each tile receives a `delay` prop to stagger sequentially.
- **Hover states**: `whileHover={{ scale: 1.02 }}` with spring physics. Scale uses GPU-composited transforms, not layout-triggering properties.
- **Progress bars**: Animated from `0` to the database value using `motion.div` with a spring transition (`stiffness: 60, damping: 18`).
- **Sidebar active indicator**: Uses `layoutId="active-nav-bg"` so the highlight pill snaps between nav items with a shared layout spring animation.

### 3. Route Protection

Route guarding is implemented in `src/proxy.ts` (Next.js's `proxy` convention, equivalent to `middleware.ts`):
- Unauthenticated users are redirected to `/login` on every protected route.
- Authenticated users are redirected away from `/login` to `/`.
- The `/auth/callback` route is always allowed through for the OAuth exchange.

### 4. Loading & Error States

- `app/loading.tsx` — A pixel-perfect skeleton loader that mirrors the Bento Grid geometry. Uses `animate-pulse` on placeholder blocks.
- `app/error.tsx` — A graceful error boundary that catches Supabase connection failures with a "Try Again" reset action.

### 5. Visual Design

- **Grain texture**: All tiles include an SVG `feTurbulence` noise overlay at `opacity: 3%` for a subtle grain effect without any extra dependencies.
- **Dark theme**: Forced via `class="dark"` on `<html>`. All Shadcn CSS variables are set in the `.dark` block only.
- **Responsive**: Full Bento grid on desktop → icon-only sidebar on tablet → bottom nav bar on mobile.

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| Next.js | 15 (App Router) | Framework |
| React | 19 | UI |
| Supabase | `@supabase/ssr` | Database + Auth |
| Tailwind CSS | v4 | Styling |
| Framer Motion | latest | Animations |
| Zustand | latest | Client state |
| shadcn/ui | latest | UI primitives (Button, Tabs, Progress) |
| Lucide React | latest | Icons |
| TypeScript | 5 | Type safety |

---

## Challenges Faced

1. **Next.js 16 middleware** — The project uses Next.js 16 which uses `proxy.ts` instead of the traditional `middleware.ts`. This required reading the updated docs rather than relying on existing knowledge.
2. **Server/Client boundary for animations** — All Bento tiles need Framer Motion (client), but the data should come from the server. Solved with the `AnimatedTile` wrapper pattern — server renders children, client wraps them in the motion container.
3. **Shadcn's `@base-ui` primitives** — The latest Shadcn uses `@base-ui` under the hood with different data attributes (`data-active` vs `data-[state=active]`). Required carefully reading the generated component source instead of relying on documentation.
