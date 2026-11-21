# Bharath S · Portfolio

Glassmorphic, hand-drawn, interactive portfolio of an AI Engineer who also draws.
Next.js 16 (App Router, static export) · React 19 · TypeScript · Tailwind 4 · Motion · Lenis.

## Pages
| Route | What it is |
|---|---|
| `/` | Hero with a sketch-lens portrait, stats, skill constellation |
| `/story` | Three jobs as three illustrated chapters |
| `/work` | Side projects (from GitHub) in a custom 3D coverflow |
| `/lab` | Playable resume bullets: durable job queue, layered poster, ear keypoint fitter |
| `/sketchbook` | Ink studies + a drawing canvas |
| `/contact` | Channels + a "draw me a message" pad |

## Architecture
- `src/content/*`: typed data modules (the only place copy lives)
- `src/components/ui`: primitives (Glass, Reveal, Button, Marquee, CountUp)
- `src/components/layout`: Nav, Footer, Backdrop, SmoothScroll, Cursor
- `src/components/interactive`: self-contained interactions
- `src/lib/queue-sim.ts`: pure, framework-free job-queue simulation (UI is a thin reducer wrapper)
- `src/hooks`: media-query and pointer hooks

Design rules: one accent (vermilion), one warm-grey family, radii 28 / 18 / 14 / pill, motion under 300 ms
except one-shot entrances, reduced-motion respected, every hover interaction has a touch equivalent.

## Develop
```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export → out/
```

## Art pipeline
`node scripts/generate-art.mjs` generates the chalk illustrations with Nano Banana 2.1 (2K).
It reads `GEMINI_API_KEY` from a local `.env` (git-ignored); the key is never shipped to the client.
`node scripts/optimize-art.mjs` converts art to WebP; `node scripts/make-og.mjs` builds the share image.
`node scripts/make-portraits.mjs` makes the portrait crop and a local pencil-sketch version of `photo.jpeg`.

Illustrations are AI-assisted. Real drawings can be added in `src/content/sketches.ts` (`realSketches`).
