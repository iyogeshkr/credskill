# CredSkill MVP

**Skill-based loan eligibility platform** — get loans based on your skills and career potential, not your CIBIL score.

> MVP Preview · Built with Next.js 14, React 18, TypeScript, Tailwind CSS

---

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Open http://localhost:3000
```

That's it. No environment variables, no database, no external services needed for local dev.

## PHP + MySQL (Hostinger Native)

This project now includes a Hostinger-ready backend in [php-api/README.md](php-api/README.md).

### 1. Database

Run [php-api/schema.sql](php-api/schema.sql) in phpMyAdmin to create:
- users
- profiles
- interested_users

### 2. Upload API files

Upload the full [php-api](php-api) folder to your host, typically under public_html/php-api.

### 3. Configure frontend

Set this environment variable:

NEXT_PUBLIC_PHP_API_BASE=https://yourdomain.com/php-api

This is defined in [.env.example](.env.example).

---

## Project structure

```
credskill/
├── app/
│   ├── layout.tsx          ← Root layout, font setup, metadata
│   ├── globals.css         ← Design tokens, animations, base styles
│   ├── page.tsx            ← Landing page (all sections assembled)
│   └── apply/
│       └── page.tsx        ← Apply page with form + result card
│
├── components/
│   ├── Navbar.tsx          ← Sticky nav with glass blur + mobile drawer
│   ├── Hero.tsx            ← Hero section with animated CredScore ring
│   ├── Features.tsx        ← 6-feature card grid
│   ├── HowItWorks.tsx      ← 3-step process with connector + CTA bar
│   ├── Testimonials.tsx    ← 6 testimonial cards + stats bar
│   ├── FAQ.tsx             ← Accordion FAQ (7 questions)
│   ├── LoanForm.tsx        ← 3-step form with skill autocomplete
│   ├── ResultCard.tsx      ← Score result with ring, breakdown bars, tips
│   ├── Footer.tsx          ← Dark footer with links
│   └── ui/
│       ├── Button.tsx      ← Button component (5 variants, 4 sizes)
│       └── index.tsx       ← Badge, Card, Input, Select, ProgressBar,
│                               ScoreRing, Skeleton, StatCard
│
├── lib/
│   ├── calculateScore.ts   ← Core score engine (50+ skills, 4 sub-scores)
│   ├── utils.ts            ← cn(), formatINR(), sleep(), clamp()
│   └── hooks/
│       └── useCredScore.ts ← Custom hook for score lifecycle management
│
├── types/
│   └── index.ts            ← All TypeScript interfaces
│
├── render.yaml             ← Render.com deployment config
├── vercel.json             ← Vercel deployment config
├── tailwind.config.ts      ← Custom design tokens, Syne font, animations
└── package.json
```

---

## Score engine

The `calculateScore()` function in `/lib/calculateScore.ts` computes a 0–100 **CredScore** from four components:

| Component        | Max pts | How it's calculated |
|------------------|---------|---------------------|
| Skill score      | 60      | Sum of skill weights (capped with diminishing returns) |
| Education score  | 20      | PhD=20 → Master=17 → Bachelor=13 → Diploma=9 → Self-taught=8 |
| Portfolio score  | 10      | GitHub (+6) + Portfolio link (+4) |
| Diversity score  | 10      | Unique skill categories: 4+cats=10, 3=7, 2=4, 1=2 |

### Loan bands

| Grade | Score | Max amount | Rate    |
|-------|-------|------------|---------|
| S     | 90+   | ₹5,00,000  | 8.5%    |
| A     | 75+   | ₹3,00,000  | 10.0%   |
| B     | 60+   | ₹1,50,000  | 12.5%   |
| C     | 45+   | ₹75,000    | 15.0%   |
| D     | <45   | Not eligible | —     |

### Adding new skills

Open `/lib/calculateScore.ts` and add an entry to `SKILL_WEIGHTS`:

```ts
{ skill: "solana", points: 14, category: "finance" },
{ skill: "langchain", points: 15, category: "ai_ml" },
```

---

## Design system

**Font**: Syne (display, all weights) + JetBrains Mono (numbers, code)

**Brand color**: `#5b6ef2` (brand-600) — indigo-blue, consistent across all CTAs

**Key classes**:
- `.text-gradient` — brand gradient text
- `.glass` — frosted glass effect (navbar)
- `.card-hover` — lift + shadow on hover
- `.score-ring` — SVG ring animation class
- `.animate-fade-up` — entry animation

---

## Deployment

### Vercel (recommended — zero config)

```bash
npm i -g vercel
vercel --prod
```

### Render.com (free tier)

1. Push to GitHub
2. Create new "Web Service" on Render
3. Connect repo → Render auto-detects `render.yaml`
4. Deploy

### Manual (any Node host)

```bash
npm run build
npm start
# Runs on PORT env var (default 3000)
```

---

## Roadmap (post-MVP)

- [ ] Real backend (Django REST API or FastAPI)
- [ ] PostgreSQL database for user profiles and applications
- [ ] JWT authentication (email + OTP)
- [ ] Resume PDF upload + AI parsing (pdfplumber / Gemini)
- [ ] Admin dashboard (loan application management)
- [ ] NBFC partner API integration
- [ ] SMS/email notifications (Twilio / Resend)
- [ ] AI-powered skill recommendations (Gemini API)

---

## Tech decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| Framework | Next.js 14 App Router | SSR, routing, Vercel-native |
| Styling | Tailwind CSS | Rapid, consistent, tree-shaken |
| Forms | react-hook-form + zod | Type-safe, minimal re-renders |
| Font | Syne | Distinctive — not Inter/Roboto |
| State | useState + custom hook | Simple enough for MVP, no Redux needed |
| Icons | Lucide React | Consistent, tree-shakeable |

---

## MVP disclaimer

CredSkill is in MVP preview mode. It is not a licensed NBFC. Loan eligibility shown is for demonstration purposes only. Intended for investor previews and user research.

---

*Built for CredSkill · MIT License*
