# Thoughts

A minimal social platform for sharing short thoughts, quotes, and shayari—styled like a calm wall of sticky notes.

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Stack: Next.js + Supabase + Tailwind CSS](https://img.shields.io/badge/Stack-Next.js%20%2B%20Supabase%20%2B%20Tailwind%20CSS-purple.svg)

## About

Thoughts is an ultra-minimal web application where users can:
- 📖 Read short thoughts in a beautiful masonry feed
- ✏️ Share their own thoughts (max 300 characters)
- ❤️ Like thoughts they resonate with

The design is inspired by sticky notes pinned to a calm wall—distraction-free, elegant, and reader-first.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router), React, TypeScript |
| Styling | Tailwind CSS |
| State | Zustand (UI), React Query (server state) |
| Backend | Supabase (PostgreSQL, Auth, Realtime) |
| Hosting | Vercel |

## Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/thoughts-app.git
cd thoughts-app
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the schema from [`supabase/schema.sql`](supabase/schema.sql)
3. Get your **Project URL** and **anon key** from **Project Settings → API**

### 3. Configure environment

```bash
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials
```

### 4. Install and run

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

## Deployment

### Vercel (recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

## Features

### ✅ Implemented
- [x] Masonry feed layout with infinite scroll
- [x] Create thought modal (300 char limit, language tags)
- [x] Like/unlike with optimistic updates
- [x] Real-time updates via Supabase
- [x] Responsive design (mobile-first)
- [x] Anonymous authentication via localStorage

### ❌ Out of Scope
This platform is intentionally minimal. No:
- User profiles or follower systems
- Comments or replies
- Images or media uploads
- Search or trending sections
- Notifications or messaging

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| bg-primary | `#F9F9F9` | Page background |
| bg-card | `#FEF9E7` | Sticky note cards |
| text-primary | `#2C2C2C` | Main text |

See [`THOUGHTS_ARCHITECTURE.md`](THOUGHTS_ARCHITECTURE.md) for the complete design spec.

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
│   ├── ui/          # Base UI components
│   ├── layout/      # Navbar, layout
│   ├── feed/       # ThoughtCard, MasonryFeed
│   └── create/     # CreateModal, ThoughtForm
├── lib/             # Utilities, hooks, Supabase client
├── stores/         # Zustand store
└── types/          # TypeScript types
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing`)
3. Commit your changes (`git commit -am 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing`)
5. Open a Pull Request

## License

MIT — © 2024 Thoughts