# Ananya Kaul — Portfolio

Personal portfolio of **Ananya Kaul** — AI/ML & Mobile Developer (iOS · Flutter · AI/ML).

**🌐 Live site:** [ananya-kaul.github.io](https://ananya-kaul.github.io/)

Showcases 16 production apps shipped to the App Store, Mac App Store and Google
Play — including Cal Care, Math AI, TEXT UP, PDF Editor, PDF Filler for Mac,
PDF Scanner and Meme Me — plus AI engineering articles published on Medium,
Towards AI and Stackademic.

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
│       ├── Writing.tsx     # Medium articles
│       ├── AppDetailModal.tsx  # "About this app" sheet + store buttons
│       ├── AppGlyph.tsx    # Fallback artwork for apps with no store icon
│       ├── Experience.tsx  # Work experience
│       ├── Skills.tsx      # Tech stack
│       └── ...
└── lib/
    ├── apps.ts             # ← EDIT HERE to add/change an app
    ├── writing.ts          # ← EDIT HERE to add a Medium article
    ├── site.ts             # Canonical URL, person details, meta description
    └── basePath.ts         # Asset path helper (pass-through now the site is at the root)
public/
├── images/apps/            # App Store icons for the app cards
├── images/hero/            # Profile photo
├── icon.svg, icon-192.png, icon-512.png, apple-touch-icon.png
└── resume.pdf              # Downloadable resume
```

> **Editing this site?** [`HOW-TO-EDIT.md`](HOW-TO-EDIT.md) is the full guide —
> local setup, previewing, adding apps, publishing, and troubleshooting.

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

Hero stats, the footer count, the social share card and the JSON-LD app list all
read from this file, so they stay in sync automatically. Mark an app `ai: true`
when AI/ML is a core, user-facing feature — that drives the "AI-powered apps"
count.

## Adding an article

**This happens automatically.** [`sync-medium.yml`](.github/workflows/sync-medium.yml)
checks the Medium feed daily, appends anything new to
[`src/app/lib/writing.ts`](src/app/lib/writing.ts), commits it and triggers a
deploy. Run it on demand from the Actions tab, or locally with
`npm run sync:medium`.

The list is committed rather than fetched at runtime: the site is a static
export, Medium's feed isn't readable from a browser (CORS), and baking the posts
into the HTML is what makes them count for SEO.

The sync only ever *adds* posts it hasn't seen, matched by URL — existing
entries are never rewritten, so manual edits survive.

Each entry needs `title`, `url`, `date` (YYYY-MM-DD), `publication`, `blurb` and
`tags`. Copy titles from the article page, not the RSS feed — Medium truncates
long ones. The hero's "AI/ML articles" stat, the share card and the JSON-LD
`Article` list all count this array.

## Notes

- The social share card is generated at build time by
  [`src/app/og-image.png/route.tsx`](src/app/og-image.png/route.tsx), so the app
  counts printed on it always match `apps.ts`. It exports to `/og-image.png`
  (a route handler rather than Next's `opengraph-image` convention, because that
  convention emits an extension-less file that GitHub Pages serves with the
  wrong content type).
- Tapping an app card opens the detail sheet first — store links are inside it,
  so nobody is bounced to the App Store by accident.
