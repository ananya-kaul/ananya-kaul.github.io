# Ananya Kaul — Portfolio

Personal portfolio of **Ananya Kaul**, Mobile Developer (iOS · Flutter · AI/ML).

**🌐 Live site:** [brisinger23.github.io/portfolio_code](https://brisinger23.github.io/portfolio_code/)

Showcases 16 production apps shipped to the App Store, Mac App Store and Google Play — including Cal Care, Math AI, TEXT UP, PDF Editor, PDF Filler for Mac, PDF Scanner, Meme Me, and more.

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router, static export)
- React 19 + TypeScript
- Tailwind CSS 4
- Framer Motion for animations
- Hosted on GitHub Pages, deployed automatically with GitHub Actions

## Running Locally

```bash
npm ci        # install dependencies
npm run dev   # start dev server at http://localhost:3000
```

## Deployment

Every push to `main` triggers the [deploy workflow](.github/workflows/deploy.yml), which builds the static site and publishes it to GitHub Pages. No manual steps needed.

## Project Structure

```
src/app/
├── layout.tsx              # SEO metadata, JSON-LD structured data, page shell
├── page.tsx                # Home page (assembles all sections)
├── sitemap.ts              # Generates /sitemap.xml
├── robots.ts               # Generates /robots.txt
├── manifest.ts             # Generates /manifest.webmanifest (PWA)
├── og-image.png/route.tsx  # Generates the 1200x630 social share card
├── components/
│   ├── Header.tsx          # Sticky nav + mobile menu + scroll-spy
│   ├── Footer.tsx          # Footer (server component)
│   ├── BackToTop.tsx       # Floating back-to-top control
│   ├── CursorTrail.tsx     # Pointer glow (pointer devices only)
│   └── home/               # One file per section
│       ├── Hero.tsx        # Intro, photo, stats, social links
│       ├── Projects.tsx    # The Apps grid (cards open the detail sheet)
│       ├── AppDetailModal.tsx  # "About this app" sheet + store buttons
│       ├── AppGlyph.tsx    # Fallback artwork for apps with no store icon
│       ├── Experience.tsx  # Work experience
│       ├── Skills.tsx      # Tech stack
│       └── ...
└── lib/
    ├── apps.ts             # ← EDIT HERE to add/change an app
    ├── site.ts             # Canonical URL, person details, meta description
    └── basePath.ts         # Asset path helper for GitHub Pages
public/
├── images/apps/            # App Store icons for the app cards
├── images/hero/            # Profile photo
├── icon.svg, icon-192.png, icon-512.png, apple-touch-icon.png
└── resume.pdf              # Downloadable resume
```

## Adding an app

Everything about the Apps section lives in [`src/app/lib/apps.ts`](src/app/lib/apps.ts).
Add an entry to the `apps` array (order in the array = order on the page):

1. Drop the store icon into `public/images/apps/<slug>.jpg` (512×512 works well —
   `https://itunes.apple.com/lookup?id=<appleId>` returns an `artworkUrl512`).
2. Add the object: `slug`, `title`, `tagline` (card text), `about` + `highlights`
   (detail sheet), `category`, `platforms`, `tags`, `appStore`, `playStore`.
3. Leave `icon: null` and set a `glyph` + `gradient` for unreleased apps.
4. For a Mac/desktop build, use `platforms: ["macOS"]` (this also switches the
   structured data to `SoftwareApplication`) and append `?platform=mac` to the
   store URL.

Hero stats, the footer count, and the JSON-LD app list all read from this file,
so they stay in sync automatically.

## Notes

- The social share card is generated at build time by
  [`src/app/og-image.png/route.tsx`](src/app/og-image.png/route.tsx), so the app
  counts printed on it always match `apps.ts`. It exports to `/og-image.png`
  (a route handler rather than Next's `opengraph-image` convention, because that
  convention emits an extension-less file that GitHub Pages serves with the
  wrong content type).
- Tapping an app card opens the detail sheet first — store links are inside it,
  so nobody is bounced to the App Store by accident.
