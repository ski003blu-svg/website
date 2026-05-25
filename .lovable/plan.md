## BLUSKI SOLUTIONS — Full Build Plan

Iowa-based premium AI/software consultancy site. Light-mode primary with dark contrast sections (OpenAI feel), glassmorphism, soft gradients, Inter + JetBrains Mono typography, blue primary accent. Design direction: **Precision aluminum** (v3).

Because this is ~25 pages, I'll build in **three phases**. You'll see real progress after each phase and can adjust before continuing.

---

### Design system (built first, shared everywhere)

- Tokens in `src/styles.css`: light bg `hsl(210 20% 98%)`, foreground `hsl(215 25% 12%)`, muted `hsl(215 15% 45%)`, primary `hsl(217 91% 60%)`, dark-section bg `hsl(0 0% 4%)`. Glass surface variables, soft mesh-gradient utility, reveal animation.
- Inter (400/600/700) + JetBrains Mono (400/500) via Google Fonts.
- Shared layout: sticky glass nav, mega-menu for Services, footer with Iowa HQ block. Both live in `__root.tsx` and render on every route.
- Reusable section components: `Hero`, `ServicesGrid`, `ProcessTimeline`, `TechStack`, `PricingCards`, `FAQ`, `CTASection`, `ConsultationForm`, `DarkContrastSection`, `StatsBlock`, `Testimonial`.

### Phase 1 — Core pages + design system

Routes (`src/routes/`):
- `index.tsx` — Home: hero, trusted-by, 8-service grid, process timeline, featured case study (dark), pricing teaser, CTA.
- `about.tsx` — Story, leadership, Iowa roots, values, stats.
- `services.tsx` — All 8 services overview grid linking to detail pages.
- `pricing.tsx` — 3-tier cards (Starter / Growth / Enterprise) + comparison table + FAQ.
- `contact.tsx` — Consultation form (Cloud-backed), Des Moines map block, direct contact info.

### Phase 2 — Service detail pages (×8)

One shared `ServiceDetailLayout` component, content-driven from a `services.ts` data file. Each page contains: Hero · Overview · Features grid · Process roadmap timeline · Tech stack · Benefits · Pricing cards · FAQ · CTA · Consultation form.

Routes: `services/ai-machine-learning.tsx`, `services/web-development.tsx`, `services/software-development.tsx`, `services/data-analytics.tsx`, `services/digital-marketing.tsx`, `services/branding.tsx`, `services/api-integration.tsx`, `services/devops-cloud.tsx`.

### Phase 3 — Showcase + content pages

- `portfolio.tsx`, `case-studies.tsx`, `case-studies.$slug.tsx` (dynamic)
- `industries.tsx` (Manufacturing, AgriTech, Finance, Logistics, Healthcare)
- `products.tsx`
- `careers.tsx` + `careers.$slug.tsx` (job detail) — applications stored in Cloud
- `blog.tsx` + `blog.$slug.tsx` — posts loaded from Cloud DB

### Backend (Lovable Cloud)

Tables: `contact_submissions`, `consultation_requests`, `job_applications`, `blog_posts`, `newsletter_subscribers`. RLS: public insert on submission tables, public select on `blog_posts` where `published = true`. Server functions handle all writes with Zod validation.

### SEO & accessibility

- Per-route `head()` with unique title, description, og:title/description.
- Single H1 per page, semantic HTML, alt text on all images, responsive viewport (already configured).
- Each service page gets schema-relevant copy and a dedicated og:image generated from the hero.

### Out of scope for this build

- Custom domain setup, email-sending integrations (can add later)
- Real client logos / real case study content — placeholders with realistic copy
- Auth-protected dashboards — none of the requested pages need login

---

### Technical notes

- Stack: TanStack Start + Tailwind v4 + shadcn/ui + Lovable Cloud (Supabase under the hood).
- Routing: file-based under `src/routes/` — each page is its own route (not hash anchors), so each is SEO-indexable and shareable.
- Forms: client validation with `zod` + react-hook-form; submissions via `createServerFn` to Cloud with server-side validation.
- Animations: CSS keyframes + Tailwind transitions (no heavy motion libs needed for v1).
- Images: generated via `generate_image` for hero visuals on Home, About, and each service page.

I'll start with Phase 1 once you approve. Want me to proceed straight through all three phases, or pause for review between phases?