# SpiceRoute Restaurant & Bistro

A Culinary Journey of Flavors — multi-cuisine dining (Indian, Continental, Asian, desserts) in Bandra West, Mumbai. Frontend-only website with mock data.

**Live:** https://spice-route-restaurant.pages.dev

## Stack

Svelte 5 (runes) + SvelteKit 3.3.1 + Vite 8 + TypeScript strict + Tailwind CSS 4.3.5 + `@sveltejs/adapter-static` (prerendered, SSR on). Fonts: Playfair Display + Inter + Great Vibes, self-hosted via Fontsource. Icons: Lucide (`@lucide/svelte`). Animation: GSAP + Lenis.

## Pages

Home, Menu (search + category/veg/spice filters) + 17 dish detail pages, Order Online (cart, GST 5%, free delivery ≥ ₹499, 3-step mock checkout), Reservations (deterministic mock availability), About, Gallery (filterable), Offers, Reviews, Contact (map + hours + delivery zones), Private Dining & Catering (packages + enquiry), FAQ, Privacy, Terms, 404. Sitemap + robots via `+server.ts` endpoints.

## Development

```bash
npm install
npm run dev        # dev server
npm run images     # convert PNG masters in static/images/original/ to AVIF/WebP/JPG @ 480/800/1200/1600
npm run check      # svelte-check — must be 0 errors
npm run build      # static output in build/
npm run preview    # preview the static build
```

All content is mock data in `src/lib/data/site.ts` — replace after the client approves the design. All images are AI-generated masters in `static/images/original/`, rendered through the single reusable `#lib/components/Picture.svelte` component.

## Deploy

GitHub Actions (`.github/workflows/deploy.yml`) deploys `build/` to Cloudflare Pages on every push to `main`. Needs repo secrets `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID`.
