# Parker Tailor (Coit Parker Tailor Shop): website demo

Demo website for the tailor at 3304 Coit Rd, Plano, TX 75023 · (972) 599-1595.

- Single static page (`index.html`), English/Spanish (`?lang=es`).
- Tape-measure language switch, tailor's-chalk light/dark switch (dark = chalkboard), live open/closed status.
- Pitch angle: parkertailor.com belongs to a tailor in Parker, Colorado, so people searching the name can land on the wrong shop.

## Needed before going live
- [ ] Which name they use: "Parker Tailor" (Google) or "Coit Parker Tailor Shop" (other listings)
- [ ] Is the tailor customers call "Amy" the owner? OK to mention by name?
- [ ] Do they take bridal gowns and suits? Any services they don't offer
- [ ] Price list or typical prices (hems, take-in)
- [ ] Photos of the shop and finished work
- [ ] Do they speak Korean/Spanish? (could add a Korean version)

## Stack
- **Next.js** (static export) + **TypeScript** + **Tailwind CSS v4**
- **Magic UI** (Marquee, MagicCard, BorderBeam), **Motion**, **GSAP**, **Lenis** smooth scroll, **Phosphor** icons
- Strings live in `src/content/strings.json` (English plus each translation); the page is `src/app/page.tsx`

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
```
Pushing to `main` builds and deploys to GitHub Pages (`.github/workflows/pages.yml`).
