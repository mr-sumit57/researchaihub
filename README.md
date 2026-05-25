# ResearchAIHub

A modern, SEO-optimized AI tools directory for researchers, students, engineers, developers, and productivity users.

## Tech Stack

- **Next.js 16** (App Router, SSR, SSG)
- **React 19** + **TypeScript**
- **Tailwind CSS v4** + shadcn-style UI components
- **Framer Motion** animations
- **Lucide Icons**
- **Supabase** (database, auth, RLS)
- **Vercel** deployment target

## Features

- 30 curated AI tools with seed data
- 10 SEO-optimized blog posts
- 11 category pages
- Tool directory with search, filters, sorting, infinite scroll
- Individual tool pages (features, pros/cons, reviews, FAQ, affiliates)
- Dark/light mode
- Newsletter signup (API + modal)
- Admin dashboard
- JSON-LD structured data, sitemap, robots.txt
- Phase 2 architecture for AI recommendations

## Quick Start

```bash
cd researchaihub
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Works out of the box with **seed data** — no Supabase required for development.

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Run `supabase/schema.sql` in the SQL Editor
3. If upgrading an existing DB, run `supabase/migrations/001_legacy_id.sql`
4. Enable Email auth (magic link) in Authentication settings
5. Add redirect URL: `http://localhost:3000/auth/callback`
6. Copy API keys to `.env.local`
7. Seed the database:

```bash
npm run db:seed
```

Requires `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`.

## Bookmarks

- Click the bookmark icon on any tool card (works offline via localStorage)
- View saved tools at `/bookmarks`
- Sign in to sync bookmarks to Supabase when configured
- Local bookmarks merge to your account on first sign-in

## OG / Social Images

Dynamic Open Graph images are generated at `/opengraph-image` (1200×630). Set `NEXT_PUBLIC_SITE_URL` in production for correct canonical URLs.

## Project Structure

```
src/
├── app/              # Pages (App Router)
│   ├── admin/        # Admin dashboard
│   ├── api/          # Newsletter, contact, submit
│   ├── auth/         # Login + callback
│   ├── blog/         # Blog listing + posts
│   ├── categories/   # Category pages
│   └── tools/        # Directory + tool detail
├── components/       # UI, layout, home, tools, blog
├── data/             # Seed content (30 tools, 10 posts)
├── lib/              # Supabase, SEO, data layer
└── types/            # TypeScript types
supabase/
└── schema.sql        # Database schema
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/tools` | AI Tools Directory |
| `/tools/[slug]` | Individual Tool |
| `/blog` | Blog |
| `/blog/[slug]` | Blog Post |
| `/categories/[slug]` | Category |
| `/trending` | Trending Tools |
| `/free-tools` | Free Tools |
| `/about` | About |
| `/contact` | Contact |
| `/submit` | Submit Tool |
| `/newsletter` | Newsletter |
| `/privacy` | Privacy Policy |
| `/terms` | Terms |
| `/admin` | Admin Dashboard |
| `/auth/login` | Authentication |

## Deploy to Vercel

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Set root directory to `researchaihub`
4. Add environment variables
5. Deploy

```bash
npm run build
```

## Monetization

- Affiliate links on tool pages (`affiliate_url` field)
- Sponsored tool badges (`is_sponsored`)
- AdSense placeholder on homepage
- Premium featured listings via admin
- Newsletter sponsorships

## Phase 2 (Prepared)

Extend `src/lib/data.ts` for:

- AI tool recommendation engine
- Personalized suggestions
- AI search assistant
- Smart comparisons

Database comments in `schema.sql` mark future tables.

## License

MIT
