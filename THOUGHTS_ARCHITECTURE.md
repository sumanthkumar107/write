# Thoughts — Minimal Social Platform

## Product Overview

A clean, minimalist web application for sharing and discovering short thoughts, quotes, and shayari. The platform mimics a beautiful wall of sticky notes—calm, distraction-free, and intentionally limited to the bare minimum of social interaction: reading, posting, and liking.

### Core Value Proposition

- **Ultra-minimalism**: Only 3 core actions possible
- **Reader-first**: Fast loading, smooth scrolling, zero distractions
- **Calm aesthetic**: Feels like a cozy cork board with handwritten notes
- **Anonymous by default**: Share thoughts without building a social identity

---

## UI/UX Design System

### Color Palette

```
┌─────────────────────────────────────────────────────────┐
│  Token         Value      Usage                      │
├─────────────────────────────────────────────────────────┤
│  bg-primary    #F9F9F9    Page background            │
│  bg-card       #FEF9E7    Sticky note background     │
│  text-primary #2C2C2C    Main text                   │
│  text-muted    #6B7280    Secondary/dates            │
│  text-accent   #D97706    Language tags                │
│  border        #E5E5E5    Subtle dividers             │
│  hover         #FEF3C7    Card hover state           │
│  btn-primary   #2C2C2C    Create button               │
│  btn-hover     #1F1F1F    Button hover               │
└─────────────────────────────────────────────────────────┘
```

### Typography

```
┌─────────────────────────────────────────────────────────┐
│  Element        Font            Weight    Size  Line    │
├─────────────────────────────────────────────────────────┤
│  App title     Inter          700      20px  1.2   │
│  Card text     Inter           400      16px  1.6   │
│  Language tag  Inter          500      12px  1.4   │
│  Like count    Inter           500      14px  1.4   │
│  Timestamp     Inter          400      12px  1.4   │
│  Button        Inter            600      14px  1.0   │
│  Modal title   Inter            600      18px  1.4   │
│  Char counter Inter           400      12px  1.0   │
└─────────────────────────────────────────────────────────┘
```

### Spacing System

```
┌─────────────────────────────────────────────────────────┐
│  Token    Value    Usage                                │
├─────────────────────────────────────────────────────────┤
│  xs       4px     Tight internal spacing              │
│  sm       8px     Icon-to-text gaps                │
│  md       16px    Standard padding                │
│  lg       24px    Section margins                 │
│  xl       32px    Major section gaps               │
│  2xl     48px    Page-level spacing               │
└─────────────────────────────────────────────────────────┘
```

### Border Radius

```
┌─────────────────────────────────────────────────────────┐
│  Token       Value    Usage                          │
├─────────────────────────────────────────────────────────┤
│  card       12px    Sticky note cards                │
│  button     8px     All buttons                     │
│  modal      16px    Modal outer container           │
│  textarea  12px    Input fields                    │
│  tag        4px     Language tags                  │
└─────────────────────────────────────────────────────────┘
```

### Shadows

```
┌──────────────────────────────────────────────────────────────┐
│  Token         Value                                      │
├──────────────────────────────────────────────────────────────┤
│  card-shadow  0 1px 3px rgba(0,0,0,0.08)                   │
│  card-hover  0 4px 12px rgba(0,0,0,0.12)                   │
│  modal-shadow 0 25px 50px rgba(0,0,0,0.25)                   │
└──────────────────────────────────────────────────────────────┘
```

### Animation

```
┌─────────────────────────────────────────────────────────────┐
│  Token           Duration  Easing                       │
├─────────────────────────────────────────────────────────────┤
│  fade-in        200ms     ease-out                    │
│  scale-in       150ms     cubic-bezier(0.16,1,0.3,1)  │
│  like-pulse    300ms     ease-in-out                 │
└─────────────────────────────────────────────────────────────┘
```

---

## Page Structure

### 1. Feed Page (/)

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo: "Thoughts"]                            [+ Create]  │ ← Fixed nav
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────┐  ┌─────────────────┐  ┌──────────┐         │
│  │ Thought  │  │                │  │ Thought │         │
│  │   #42   │  │   Longer        │  │   #41   │         │
│  │         │  │   thought      │  │         │         │
│  │ "Home is│  │   here with    │  │ "Be the │         │
│  │  not    │  │   multiple     │  │  change │         │
│  │  a      │  │   lines of     │  │  you   │         │
│  │ place..."│  │   wisdom..."  │  │  wish  │         │
│  │ ─────── │  │               │  │ ──────│         │
│  │ ❤️ 142  │  │ ───────       │  │ ❤️ 89  │         │
│  │ EN · 2h │  │ ❤️ 256  · 3h  │  │ HI · 4h│         │
│  └──────────┘  └─────────────────┘  └──────────┘         │
│                                                             │
│  ┌─────────────────┐  ┌──────────┐                         │
│  │                 │  │ Thought  │                         │
│  │ One more very   │  │   #39    │                         │
│  │ long thoughtful │  │         │                         │
│  │ quote that      │  │ "Simple" │                         │
│  │ spans multiple  │  │         │                         │
│  │ lines on this   │  │ ─────── │                         │
│  │ wall of wisdom..│  │ ❤️ 312  │                         │
│  │                 │  │ KN · 5h │                         │
│  │ ───────         │  └──────────┘                         │
│  │ ❤️ 478  · 6h    │                                         │
│  └─────────────────┘                                         │
│                                                             │ ← Infinite scroll
│  ... (loading skeleton)                                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 2. Create Modal (/overlay)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    ┌──────────────────┐                    │
│                    │  Share a Thought │                    │
│                    ├──────────────────┤                    │
│                    │                  │                    │
│                    │ ┌──────────────┐ │                    │
│                    │ │              │ │                    │
│                    │ │ Type your    │ │  ← Textarea        │
│                    │ │ thought     │ │     (max 300 ch)   │
│                    │ │ here...     │ │                    │
│                    │ │              │ │                    │
│                    │ └──────────────┘ │                    │
│                    │                  │                    │
│                    │ EN ▼  Character │                    │
│                    │ count: 127/300   │                    │
│                    │                  │                    │
│                    │  [   Share it   ]│                    │
│                    └──────────────────┘                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Frontend Architecture

### Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand (lightweight)
- **Real-time**: Supabase Realtime
- **Infinite Scroll**: Intersection Observer + React Query

### Folder Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx               # Main feed page
│   └── globals.css            # Tailwind + custom utilities
│
├── components/
│   ├── ui/
│   │   ├── Button.tsx          # Reusable button
│   │   ├── Modal.tsx          # Modal wrapper
│   │   ├── Skeleton.tsx       # Loading skeleton
│   │   └── Dropdown.tsx      # Language selector
│   │
│   ├── layout/
│   │   ├── Navbar.tsx         # Fixed top navigation
│   │   ├── DesktopNav.tsx     # Desktop navbar view
│   │   └── MobileNav.tsx      # Mobile navbar view
│   │
│   ├── feed/
│   │   ├── MasonryFeed.tsx    # Masonry grid container
│   │   ├── ThoughtCard.tsx   # Individual sticky note
│   │   ├── ThoughtSkeleton.tsx
│   │   └── FeedLoader.tsx   # Infinite scroll trigger
│   │
│   └── create/
│       ├── CreateModal.tsx  # Create thought modal
│       ├── ThoughtForm.tsx   # Form with validation
│       └── LanguageSelect.tsx
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts         # Public supabase client
│   │   ├── server.ts        # Server-side client
│   │   └── types.ts         # Database types
│   │
│   ├── hooks/
│   │   ├── useThoughts.ts   # Fetch thoughts hook
│   │   ├── useLike.ts      # Like mutation hook
│   │   ├── useCreate.ts    # Create thought hook
│   │   └── useInfiniteScroll.ts
│   │
│   └── utils/
│       ├── cn.ts            # Class name merger
│       ├── formatTime.ts    # Relative time formatter
│       └── constants.ts    # App constants
│
├── stores/
│   └── uiStore.ts          # Modal/open state (Zustand)
│
└── types/
    └── index.ts            # Shared TypeScript types
```

### Component Hierarchy

```
<RootLayout>
  └── <Page>
       ├── <Navbar>
       │    ├── Logo
       │    └── CreateButton
       │
       ├── <MasonryFeed>
       │    ├── <ThoughtCard> (×N)
       │    │    ├── CardContent
       │    │    ├── LikeButton
       │    │    └── CardMeta (language, timestamp)
       │    │
       │    └── <FeedLoader> (infinite scroll trigger)
       │
       └── <CreateModal> (portal)
            ├── ModalOverlay
            └── <ThoughtForm>
                 ├── Textarea
                 ├── LanguageSelect
                 └── SubmitButton
```

### State Management Approach

**UI State (Zustand):**
- Modal open/close state
- Selected language
- Optimistic UI updates

**Server State (React Query):**
- Thoughts list pagination
- Like mutations with cache invalidation
- Real-time subscription sync

### API Integration Flow

```
Client Action → React Query Mutation → Supabase RPC →
Database Insert → Realtime Channel → All Clients Update
```

### Real-time Update Strategy

1. Subscribe to `thoughts` table changes via Supabase Realtime
2. On INSERT: Prepend new thought to feed cache
3. On UPDATE (likes): Update thought in cache
4. Optimistic updates for like action (instant feedback)

### Responsive Layout Strategy

```
┌─────────────────────────────────────────────────────────┐
│  Breakpoint    Columns    Gap     Card Width           │
├─────────────────────────────────────────────────────────┤
│  sm (<640px)   1 column   16px    100% - 32px          │
│  md (640+)    2 columns  16px    ~300px each          │
│  lg (1024+)   3 columns  24px    ~320px each          │
│  xl (1280+)   4 columns  24px    ~340px each          │
└─────────────────────────────────────────────────────────┘
```

---

## Backend Architecture

### Technology Stack

- **Database**: PostgreSQL (Supabase hosted)
- **Auth**: Supabase Auth (anonymous + email)
- **API**: Supabase REST + PostgREST
- **Realtime**: Supabase Realtime
- **Edge Functions**: Supabase Edge Functions (rate limiting)

### API Routes Structure

```
Base URL: https://<project>.supabase.co/rest/v1/

GET    /thoughts?select=*&order=created_at.desc&limit=20&offset=0
POST   /thoughts (requires auth)
PATCH /thoughts/:id (requires auth, owner only)

GET    /thoughts?select=*,likes(*)&order=created_at.desc

POST   /rpc/increment_like (function)
DELETE /likes?thought_id=eq.:id&user_id=eq.:user (toggle)
```

### Rate Limiting Strategy

| Action          | Limit                    | Window   |
|-----------------|--------------------------|----------|
| Create thought  | 10                       | 1 hour   |
| Like thought   | 100                      | 1 hour   |
| Read feed      | Unlimited                | -        |

Implemented via Supabase Edge Function + Redis/Jumphost.

### Anonymous Authentication Strategy

- Auto-generate anonymous user on first visit
- Store anon ID in localStorage + Supabase session
- No password, no email required
- Allow upgrading to named account later (future feature)

---

## Database Schema

### Schema Diagram

```
┌──────────────────┐      ┌──────────────────┐
│     users        │      │    thoughts      │
├──────────────────┤      ├──────────────────┤
│ id        UUID PK │◄─────│ user_id    UUID  │
│ created_at TIMESTAMP       │ id      UUID PK │
│ anonymous_id VARCHAR      │ content TEXT    │
│ display_name VARCHAR     │ language VARCHAR│
│ created_at TIMESTAMP      │ likes_count INT │
│ updated_at TIMESTAMP      │ created_at TIMEST│
└──────────────────┘      │ updated_at TIMEST│
                          └────────┬─────────┘
                                   │
                          ┌────────▼─────────┐
                          │      likes      │
                          ├──────────────────┤
                          │ id         UUID │
                          │ user_id    UUID │
                          │ thought_id UUID │
                          │ created_at TIMES│
                          └──────────────────┘
```

### SQL Schema

```sql
-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ═══════════════════════════════════════════════════════
-- TABLE: users
-- ═══════════════════════════════════════════════════════
CREATE TABLE public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    anonymous_id VARCHAR(64) UNIQUE,
    display_name VARCHAR(100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX idx_users_anonymous_id ON public.users(anonymous_id);

-- ═══════════════════════════════════════════════════════
-- TABLE: thoughts
-- ═══════════════════════════════════════════════════════
CREATE TABLE public.thoughts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    content TEXT NOT NULL CHECK (char_length(content) BETWEEN 1 AND 300),
    language VARCHAR(10) NOT NULL DEFAULT 'EN',
    likes_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for feed queries (newest first)
CREATE INDEX idx_thoughts_created_at ON public.thoughts(created_at DESC);

-- Index for language filtering (future use)
CREATE INDEX idx_thoughts_language ON public.thoughts(language);

-- Index for user thoughts (future profile feature)
CREATE INDEX idx_thoughts_user_id ON public.thoughts(user_id);

-- ═══════════════════════════════════════════════════════
-- TABLE: likes
-- ═══════════════════════════════════════════════════════
CREATE TABLE public.likes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    thought_id UUID REFERENCES public.thoughts(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Prevent duplicate likes
    CONSTRAINT unique_user_thought_like UNIQUE (user_id, thought_id)
);

-- Index for checking if user liked
CREATE INDEX idx_likes_user_thought ON public.likes(user_id, thought_id);

-- Index for counting likes per thought
CREATE INDEX idx_likes_thought_id ON public.likes(thought_id);

-- ═══════════════════════════════════════════════════════
-- ROW LEVEL SECURITY POLICIES
-- ═══════════════════════════════════════════════════════

-- Everyone can read thoughts
CREATE POLICY "Public read thoughts"
ON public.thoughts FOR SELECT
USING (true);

-- Authenticated users can create thoughts
CREATE POLICY "Users create thoughts"
ON public.thoughts FOR INSERT
WITH CHECK (
    auth.role() IN ('authenticated', 'anon')
    OR auth.role() IS NULL
);

-- Only thought owner can update
CREATE POLICY "Owner update thoughts"
ON public.thoughts FOR UPDATE
USING (
    auth.uid() = user_id
    OR auth.role() = 'authenticated'
);

-- No deletions allowed
CREATE POLICY "No delete thoughts"
ON public.thoughts FOR DELETE
USING (false);

-- Likes: anyone can read
CREATE POLICY "Public read likes"
ON public.likes FOR SELECT
USING (true);

-- Authenticated users can like
CREATE POLICY "Users can like"
ON public.likes FOR INSERT
WITH CHECK (auth.role() IN ('authenticated', 'anon'));

-- Users can unlike their own likes
CREATE POLICY "Users can unlike"
ON public.likes FOR DELETE
USING (auth.uid() = user_id);

-- ═══════════════════════════════════════════════════════
-- TRIGGERS
-- ═══════════════════════════════════════════════════════

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_thoughts_updated_at
BEFORE UPDATE ON public.thoughts
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON public.users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ═══════════════════════════════════════════════════════
-- REAL-TIME CONFIGURATION
-- ═══════════════════════════════════════════════════════

ALTER PUBLICATION supabase_realtime ADD TABLE public.thoughts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.likes;
```

### Database Relationships

```
users 1──∞ thoughts
users 1──∞ likes
thoughts 1──∞ likes
```

### Constraints Summary

| Table     | Constraint                  | Purpose                    |
|-----------|-----------------------------|----------------------------|
| thoughts  | content LENGTH 1-300        | Character limit           |
| thoughts  | language: EN/HI/KN/TA/TE/ML| Supported languages only  |
| likes     | UNIQUE(user_id, thought_id) | One like per user/thought |
| thoughts  | user_id FK → users         | Referential integrity     |
| likes     | user_id FK → users CASCADE  | Clean up on user delete   |
| likes     | thought_id FK → thoughts   | Clean up on thought delete|

---

## Folder Structure (Full)

```
thoughts/
├── .env.local.example
├── .gitignore
├── README.md
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
└── src/
    ├── app/
    │   ├── favicon.ico
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── page.tsx
    │   └── not-found.tsx
    │
    ├── components/
    │   ├── ui/
    │   │   ├── Button.tsx
    │   │   ├── Modal.tsx
    │   │   ├── Skeleton.tsx
    │   │   └── Dropdown.tsx
    │   │
    │   ├── layout/
    │   │   ├── Navbar.tsx
    │   │   ├── DesktopNav.tsx
    │   │   └── MobileNav.tsx
    │   │
    │   ├── feed/
    │   │   ├── MasonryFeed.tsx
    │   │   ├── ThoughtCard.tsx
    │   │   ├── ThoughtSkeleton.tsx
    │   │   └── FeedLoader.tsx
    │   │
    │   └── create/
    │       ├── CreateModal.tsx
    │       ├── ThoughtForm.tsx
    │       └── LanguageSelect.tsx
    │
    ├── lib/
    │   ├── supabase/
    │   │   ├── client.ts
    │   │   ├── server.ts
    │   │   └── types.ts
    │   │
    │   ├── hooks/
    │   │   ├── useThoughts.ts
    │   │   ├── useLike.ts
    │   │   ├── useCreate.ts
    │   │   └── useInfiniteScroll.ts
    │   │
    │   └── utils/
    │       ├── cn.ts
    │       ├── formatTime.ts
    │       └── constants.ts
    │
    ├── stores/
    │   └── uiStore.ts
    │
    └── types/
        └── index.ts
```

---

## Deployment Architecture

### Infrastructure Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                        INTERNET                               │
└──────────────────────────┬─────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                    VERCEL EDGE NETWORK                        │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Next.js Application                    │    │
│  │  - Static/Edge caching                               │    │
│  │  - ISR for static pages                             │    │
│  │  - Serverless functions                             │    │
│  └─────────────────────────────────────────────────────┘    │
└──────────────────────────┬─────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                     SUPABASE PLATFORM                         │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐       │
│  │  PostgreSQL   │  │    Auth      │  │   Realtime   │       │
│  │  (Database)   │  │  (Anonymous)│  │  (WebSocket)│       │
│  └───────────────┘  └───────────────┘  └───────────────┘       │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐   │
│  │  Storage (if avatar upload allowed in future)         │   │
│  └───────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

### Environment Variables

```bash
# Required
NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>

# Optional (for server-side operations)
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
```

### Deployment Steps

1. **Prepare Supabase**:
   - Create new Supabase project
   - Run SQL schema script
   - Get anon key and URL

2. **Configure Vercel**:
   - Connect GitHub repository
   - Add environment variables
   - Deploy with default settings

3. **Verify**:
   - Check `/` loads correctly
   - Create a test thought
   - Verify like functionality
   - Test infinite scroll

---

## Scalability Considerations

### Estimated Capacity

| Metric                    | Target                    |
|---------------------------|---------------------------|
| Concurrent users          | 10,000+                  |
| Thoughts loaded          | 1,000+ per page          |
| Writes per second         | 10-50                    |
| Reads per second         | 1000+                    |
| Database size            | 1M+ thoughts             |

### Scaling Strategy

**Database**:
- PostgreSQL handles millions of rows easily
- Index on `created_at` ensures fast pagination
- Connection pooling via Supabase (built-in)

**Frontend**:
- Infinite scroll loads 20 thoughts at a time
- React Query caches thoughts in memory
- ISR not needed (real-time data)

**Real-time**:
- Supabase Realtime handles thousands of connections
- Subscribe only to latest 100 thoughts
- Lazy load historical data

**Cost Optimization**:
- Free tier Supabase: 500MB, 2GB bandwidth
- Free tier Vercel: 100GB bandwidth
- Expected monthly cost: $0-50 for MVP

**Future Scale**:
- Add read replicas for heavy read loads
- Partition old thoughts into cold storage
- Cache heavily-liked thoughts in CDN

---

## Security Considerations

### Authentication

| Aspect               | Implementation                         |
|---------------------|----------------------------------------|
| Default auth        | Anonymous (UUID in localStorage)       |
| Session duration    | 30 days                                |
| Cookie settings     | httpOnly, secure, sameSite=lax        |
| Upgrade path        | Future: email/password + OAuth        |

### Authorization

| Resource    | Permission                           |
|-------------|--------------------------------------|
| thoughts    | READ: All | CREATE: Anon+ | UPDATE: Owner |
| likes       | READ: All | CREATE: Anon+ | DELETE: Owner  |

### Input Validation

```typescript
// Content validation
const contentSchema = z
  .string()
  .min(1, "Thought cannot be empty")
  .max(300, "Thought cannot exceed 300 characters")
  .trim();

// Language validation
const validLanguages = ['EN', 'HI', 'KN', 'TA', 'TE', 'ML', 'BN', 'GU', 'MR'] as const;
```

### SQL Injection Prevention

- Use Supabase client with parameterized queries
- Never concatenate user input into SQL
- PostgREST handles escaping automatically

### XSS Prevention

- React escapes rendered content by default
- Use `dangerouslySetInnerHTML` only when necessary
- Sanitize any user HTML (none allowed anyway)

### Rate Limiting Implementation

```typescript
// Edge function pseudocode
addEventListener('request', async (event) => {
  const ip = event.request.headers.get('cf-connecting-ip');
  const key = `rate:${ip}:${event.request.url}`;
  
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, 3600);
  
  if (count > 100) {
    return new Response('Too Many Requests', { status: 429 });
  }
});
```

### Security Headers

```typescript
// next.config.js
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ],
    },
  ];
}
```

---

## Real-time Update Flow

### Event Flow Diagram

```
User A                    Supabase                    User B
  │                          │                          │
  │ ── POST /thoughts ──────► │                          │
  │                          │ ── INSERT to DB ──────►│
  │                          │                          │
  │                          │ ◄── Realtime broadcast ──│
  │                          │                          │ ◄── Update UI
  │                          │                          │
  │ ◄── 201 Created ────────│                          │
  │ ◄── Realtime event ─────│                          │
  │    Prepend to feed      │                          │
```

### Implementation

```typescript
// Subscribe to realtime changes
const channel = supabase
  .channel('thoughts-list')
  .on(
    'postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'thoughts' },
    (payload) => {
      // Prepend new thought to feed
      queryClient.setQueryData(['thoughts'], (old) => [payload.new, ...old]);
    }
  )
  .on(
    'postgres_changes',
    { event: 'UPDATE', schema: 'public', table: 'thoughts' },
    (payload) => {
      // Update thought likes count
      queryClient.setQueryData(['thoughts'], (old) =>
        old.map(t => t.id === payload.new.id ? payload.new : t)
      );
    }
  )
  .subscribe();
```

### Offline Considerations

- Cache thoughts in IndexedDB for offline reading
- Queue posts and likes when offline
- Sync on reconnection
- Show pending indicators to user

---

## Infinite Scroll Implementation

### Algorithm

```
┌─────────────────────────────────────────────────────────────┐
│                    INFINITE SCROLL                         │
├─────────────────────────────────────────────────────────────┤
│  1. Load initial 20 thoughts (page=0, limit=20)         │
│                                                      │
│  2. Render in masonry grid                               │
│                                                      │
│  3. User scrolls to bottom (intersection observer)   │
│                                                      │
│  4. Trigger load of next page (page += 1)              │
│                                                      │
│  5. Append new thoughts to existing list           │
│                                                      │
│  6. Repeat steps 3-5                                 │
│                                                      │
│  7. Stop when fewer than 20 returned (end of feed)  │
└─────────────────────────────────────────────────────────────┘
```

### Implementation

```tsx
// useInfiniteScroll.ts
export function useInfiniteScroll<T>({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: Options<T>) {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: '200px' }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return loadMoreRef;
}
```

### Performance Considerations

- Virtualize list if exceeds 1000 items
- Use `react-virtual` or `@tanstack/virtual`
- Lazy load hidden items
- Recycle DOM nodes

---

## Acceptance Criteria

### Functional Requirements

- [ ] User can view feed of thoughts in masonry layout
- [ ] User can create a thought (max 300 characters)
- [ ] User can select language tag
- [ ] User can like/unlike a thought
- [ ] Infinite scroll loads more thoughts
- [ ] New thoughts appear in real-time
- [ ] Like counts update in real-time
- [ ] Works on mobile and desktop

### Visual Requirements

- [ ] Background is #F9F9F9
- [ ] Cards are #FEF9E7 (soft yellow)
- [ ] Text is #2C2C2C (charcoal)
- [ ] No bright colors or gradients
- [ ] Clean sans-serif typography
- [ ] Subtle shadows on cards
- [ ] Smooth hover transitions
- [ ] Loading skeletons display

### Technical Requirements

- [ ] Lighthouse score: 90+ performance
- [ ] First contentful paint: <1.5s
- [ ] Time to interactive: <3s
- [ ] Cumulative layout shift: <0.1
- [ ] No console errors in production
- [ ] Responsive at all breakpoints
- [ ] Graceful degradation (no JS)
- [ ] Accessible (keyboard, ARIA)

---

## Future Considerations (Out of Scope)

These features are deliberately excluded but noted for potential future iteration:

- User profiles and bios
- Anonymous display names
- Thought bookmarking
- Report/inappropriate flagging
- Content moderation tools
- Analytics dashboard
- Admin panel
- Email notifications
- OAuth login (Google, GitHub)
- Featured/trending thoughts
- Daily thought notifications
- Mobile app (PWA)