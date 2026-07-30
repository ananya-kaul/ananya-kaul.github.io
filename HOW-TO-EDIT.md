# How to Edit & Publish This Site — Full Guide

Your personal manual for the portfolio at
**https://brisinger23.github.io/portfolio_code/**

Everything you need is in here: what's installed, how to preview a change, how
to add an app, how to publish, and what to do when something breaks.

---

## Contents

1. [The three golden rules](#1-the-three-golden-rules)
2. [What's on your Mac already](#2-whats-on-your-mac-already)
3. [The everyday workflow](#3-the-everyday-workflow)
4. [How publishing actually works](#4-how-publishing-actually-works)
5. [Add / edit / remove an app](#5-add--edit--remove-an-app)
6. [Getting an app icon from the App Store](#6-getting-an-app-icon-from-the-app-store)
6b. [Blog posts — they add themselves](#6b-blog-posts--they-add-themselves)
7. [Editing every other section](#7-editing-every-other-section)
8. [Replacing your photo and resume](#8-replacing-your-photo-and-resume)
9. [SEO — what to change and where](#9-seo--what-to-change-and-where)
10. [The one rule you must not forget: withBasePath](#10-the-one-rule-you-must-not-forget-withbasepath)
11. [Checking your work before you publish](#11-checking-your-work-before-you-publish)
12. [When something goes wrong](#12-when-something-goes-wrong)
13. [Command cheat sheet](#13-command-cheat-sheet)
14. [How the site is put together](#14-how-the-site-is-put-together)

---

## 1. The three golden rules

**Rule 1 — Every `git push` to `main` publishes to the live internet.**
There is no separate "publish" button. Push, wait ~1–2 minutes, and the change
is public. Watch it at
https://github.com/brisinger23/portfolio_code/actions — a green check means it's
live.

**Rule 2 — Always preview locally first.**
Run `npm run dev`, open http://localhost:3000, and look at the change with your
own eyes before you push. Resize the window narrow (or use Chrome's device
toolbar) to check it on a phone-sized screen too.

**Rule 3 — Files inside `public/` must be wrapped in `withBasePath(...)`.**
Forget this and the image works on localhost but 404s on the live site. See
[section 10](#10-the-one-rule-you-must-not-forget-withbasepath).

---

## 2. What's on your Mac already

You do **not** need to install anything — all of this is already set up:

| Tool | Version installed | What it's for |
|---|---|---|
| Node.js | v26.5.0 | Runs the site locally and builds it |
| npm | 11.17.0 | Installs the site's packages |
| git | 2.50.1 | Saves your changes and publishes them |
| GitHub CLI (`gh`) | 2.96.0 | Optional — check deploy status from the terminal |

To confirm any of them, open Terminal and run:

```bash
node -v && npm -v && git --version
```

If you ever get `command not found`, run this once in that terminal window:

```bash
export PATH="/opt/homebrew/bin:$PATH"
```

**Project folder:** `~/Desktop/New Folder 1/portfolio_code`
Because the folder name has a space in it, always quote it:

```bash
cd ~/Desktop/"New Folder 1"/portfolio_code
```

### If you ever need to start fresh on a new Mac

```bash
git clone https://github.com/brisinger23/portfolio_code.git
cd portfolio_code
npm ci
npm run dev
```

---

## 3. The everyday workflow

This is the loop you'll repeat every single time. Five steps.

```bash
# 1. Go to the project
cd ~/Desktop/"New Folder 1"/portfolio_code

# 2. Start the local preview (leave this running in its own Terminal tab)
npm run dev
```

Open **http://localhost:3000**. Leave it open — it reloads automatically as you
save files.

```
# 3. Edit the files you want (see sections 5–9 for what to edit where)
#    Save. The browser refreshes on its own. Check it looks right.
```

```bash
# 4. In a SECOND Terminal tab, save your work
cd ~/Desktop/"New Folder 1"/portfolio_code
git add -A
git commit -m "Add the new XYZ app"

# 5. Publish it
git push
```

Then watch https://github.com/brisinger23/portfolio_code/actions until you see a
green check. Hard-refresh the live site (**Cmd + Shift + R**) to see the change.

> **Tip:** to stop the preview server, click that Terminal tab and press
> **Ctrl + C**.

---

## 4. How publishing actually works

Worth understanding once, so nothing feels like magic:

```
 you edit files
       │
       ▼
 git commit ────► saves a snapshot on your Mac
       │
       ▼
 git push ──────► uploads it to github.com/brisinger23/portfolio_code
       │
       ▼
 GitHub Actions automatically:
   • installs the packages          (npm ci)
   • builds the site into plain HTML (npm run build)
   • publishes that HTML to GitHub Pages
       │
       ▼
 https://brisinger23.github.io/portfolio_code/  ← live, ~1–2 min later
```

The recipe for that automation lives in `.github/workflows/deploy.yml`. You
almost certainly never need to touch it.

**Two things follow from this:**

- If the **build fails**, nothing publishes — the old version stays live. A
  broken push can't take your site down, it just won't update it.
- The live site is **plain static HTML**. There's no server, no database.

To check the deploy from the terminal instead of the browser:

```bash
gh run list --limit 3
```

---

## 5. Add / edit / remove an app

**Everything about the Apps section lives in one file:**

```
src/app/lib/apps.ts
```

Open it and you'll see a big list called `apps`. Each app is one block in `{ }`.
**The order in that list is the order on the page** — the first block shows
first.

### The anatomy of one app

```ts
{
  slug: "cal-care",                    // short unique id, lowercase-with-dashes.
                                       // Never shown to visitors. Just keep it unique.

  title: "Cal Care - AI Calorie Tracker",  // big heading on the card

  tagline: "Snap a photo of any meal and get instant calories and macros.",
                                       // ONE short sentence. Shows on the card.

  about:                               // the long paragraph in the popup.
    "An AI-powered nutrition tracker for iOS. Point the camera at a plate and ...",

  highlights: [                        // the ticked "What I built" list in the popup.
    "AI food scanner: photo → food identification → calorie & macro estimate",
    "Automatic meal logging with editable portions and a searchable history",
  ],                                   // 3–6 bullets is the sweet spot.

  category: "Health & Fitness",        // App Store category, shown in the popup
  platforms: ["iOS", "iPadOS"],        // e.g. ["iOS"], ["iOS","Android"], ["macOS"]

  icon: withBasePath("/images/apps/cal-care.jpg"),   // see section 6
                                       // ↑ note withBasePath — required!

  tags: ["SwiftUI", "AI Food Scanner", "Vision", "Nutrition AI", "StoreKit"],
                                       // small pills. First 4 show on the card,
                                       // the rest appear as "+2". All show in the popup.

  appStore: "https://apps.apple.com/us/app/cal-care-ai-calorie-tracker/id6766514242",
  playStore: null,                     // a Play Store link, or null to hide that button
},
```

### To add a new app

1. Save its icon into `public/images/apps/` (see [section 6](#6-getting-an-app-icon-from-the-app-store)).
2. **Copy an existing block** in `apps.ts`, paste it where you want the app to
   appear, and change every field.
3. Make sure the block ends with a **comma** `},` and that `slug` isn't already
   used by another app.
4. Save → check localhost → commit → push.

That's it. The hero stats ("16 apps shipped"), the line under the app grid, the
Google structured data, and the social share card **all count the list
automatically**. You never update numbers by hand.

### To reorder apps

Cut a whole `{ ... },` block and paste it higher or lower in the list.

### To remove an app

Delete its whole `{ ... },` block — from the opening `{` to the comma after `}`.

### An app you haven't published to Google Play yet

Keep the URL you *will* use, and add `playStorePending: true`:

```ts
playStore: "https://play.google.com/store/apps/details?id=com.your.package",
playStorePending: true,   // ← no Play Store button is shown while this is here
```

The card and popup show only the App Store button, so nobody taps through to a
Play Store 404. **On launch day, delete the `playStorePending` line** — the
button, the store badge and the "live on stores" count all switch on by
themselves. (TEXT UP is set up this way right now.)

### An app with no public store listing

Set `icon: null` and give it a `glyph` and a `gradient` instead:

```ts
icon: null,
glyph: "video",        // "video" | "chat" | "subscription"
gradient: "from-fuchsia-600/50 via-purple-700/40 to-blue-700/50",
appStore: null,
playStore: null,
```

Those apps show a coloured tile with an icon instead of artwork, and the popup
says "Client-internal or unreleased build". To add a new glyph option, edit
`src/app/components/home/AppGlyph.tsx`.

### A Mac or desktop app

Same as any other app, with two differences:

- `platforms: ["macOS"]` — this also tells Google it's desktop software, not a
  mobile app.
- Add `?platform=mac` to the end of the App Store link so it opens the Mac
  version, e.g.
  `https://apps.apple.com/us/app/pdf-editor-fill-edit-e-sign/id1591585643?platform=mac`

### How the app popup behaves (by design)

Tapping a card does **not** jump to the App Store. It opens the "About this app"
sheet first, and the store buttons live inside that sheet. So visitors always
read about your work before they leave the site. Keep that in mind when writing
`about` and `highlights` — that popup is the part that sells the work.

---

## 6. Getting an app icon from the App Store

1. Take the App Store link, e.g.
   `https://apps.apple.com/us/app/id6766514242` → the number is `6766514242`.
2. Run this in Terminal, replacing the number:

   ```bash
   curl -s "https://itunes.apple.com/lookup?id=6766514242" | grep -o 'artworkUrl512":"[^"]*'
   ```

3. Copy the URL it prints (after `artworkUrl512":"`), and download it straight
   into the right folder — replace both the URL and the filename:

   ```bash
   cd ~/Desktop/"New Folder 1"/portfolio_code
   curl -s -o public/images/apps/my-new-app.jpg "PASTE_THE_URL_HERE"
   ```

4. In `apps.ts` use:

   ```ts
   icon: withBasePath("/images/apps/my-new-app.jpg"),
   ```

**Naming:** lowercase, dashes instead of spaces, `.jpg`. Match the `slug` where
you can — it keeps the folder tidy.

**If two apps share the same icon** (like the iOS and Mac PDF Editor), don't
download it twice — just point both at the same file.

**No Terminal?** Open `https://itunes.apple.com/lookup?id=6766514242` in your
browser, use Cmd+F to find `artworkUrl512`, open that URL, then right-click →
Save Image As into the `public/images/apps/` folder.

---

## 6b. Blog posts — they add themselves

**You don't have to do anything.** A scheduled job checks your Medium feed
every day at 06:00 UTC, adds any new posts to the site, and publishes them.
Write on Medium, and within a day it's on your portfolio.

You can also run it on demand, two ways:

- **From GitHub:** repo → **Actions** → *Sync Medium articles* → **Run workflow**.
- **From your Mac:** `npm run sync:medium`, then commit and push as usual.

### If you want to check or fix something

The article list lives in **`src/app/lib/writing.ts`**, newest first. The sync
job only ever *adds* posts it hasn't seen — it never rewrites existing ones, so
anything you edit by hand stays edited.

**One thing to know:** Medium truncates long titles with a "…" in its feed, and
there's no way to get the full text back. The script trims a truncated title
back to the last complete phrase and prints a warning naming that post. If it
reads oddly, just fix that one line in `writing.ts` — your version will stick.

To add a post manually, copy a block and edit it:

```ts
{
  title: "The exact article title",
  url: "https://medium.com/@ananyakaul/your-article-slug-abc123",
  date: "2026-08-14",              // YYYY-MM-DD
  publication: "Towards AI",       // or "Stackademic", or "Medium" if self-published
  blurb: "One or two sentences — the hook under the title.",
  tags: ["LLMs", "Machine Learning", "RAG"],   // first 3 show on the card
},
```

Put new posts at the **top** of the list. The "AI/ML articles" stat in the hero,
the social share card, and the Google structured data all count the list
automatically — you never update a number by hand.

---

## 7. Editing every other section

| What you want to change | File to open |
|---|---|
| Name, intro paragraph, rotating job titles, the 3 stat boxes | `src/app/components/home/Hero.tsx` |
| Social links (LinkedIn / email / WhatsApp / Instagram) | `socialLinks` list at the top of `Hero.tsx` — **and** the same list in `Footer.tsx` and `Contact.tsx` |
| Work experience bullet points | `src/app/components/home/Experience.tsx` (`responsibilities` list at the top) |
| Tech stack / skills | `src/app/components/home/Skills.tsx` (`skillsData` list) |
| Blog posts (the Writing section) | `src/app/lib/writing.ts` — but these sync automatically, see [6b](#6b-blog-posts--they-add-themselves) |
| Education | `src/app/components/home/Education.tsx` (`education` list) |
| Achievements, certifications, extracurricular | `src/app/components/home/Achievements.tsx` |
| Contact section text + the direct email/WhatsApp buttons | `src/app/components/home/Contact.tsx` |
| Top navigation links | `navLinks` at the top of `src/app/components/Header.tsx` |
| Footer text and links | `src/app/components/Footer.tsx` |
| Section order on the page | `src/app/page.tsx` — reorder the lines |
| Section titles / subtitles / descriptions | the `<SectionHeader ... />` in each section file |
| Your details used by Google (job title, employer, city, links) | `src/app/lib/site.ts` |
| Page title, description, keywords | `src/app/layout.tsx` |

**Most sections start with a plain list at the top of the file.** Edit the text
in the list, not the code below it. For example in `Experience.tsx`:

```ts
const responsibilities = [
    "Engineered and maintained high-performance iOS applications ...",
    "Boosted app performance and stability across core modules ...",
];
```

Add a line, delete a line, change the words. Keep the quotes and the trailing
comma.

> **Careful with apostrophes.** Inside quotes, write `don't` as `don\'t`, or use
> a curly apostrophe `don’t`. A bare `'` inside `'...'` breaks the build. The
> safest habit: use double quotes `"don't"`.

---

## 8. Replacing your photo and resume

**Resume** — save the new PDF over the old one, same filename:

```
public/resume.pdf
```

Nothing else to change. Both "Download Resume" buttons pick it up.

**Profile photo** — easiest path is to overwrite the existing file with the same
name:

```
public/images/hero/IMG_4620.JPG
```

If you use a *different* filename, update it in two places in
`src/app/components/home/Hero.tsx`:

```tsx
src={withBasePath("/images/hero/YOUR-NEW-FILE.JPG")}
```

and in `src/app/layout.tsx` (it's used for Google's structured data — search for
`IMG_4620`).

A roughly square photo, around 800×800, looks best in the circle.

---

## 9. SEO — what to change and where

The SEO setup is already complete and doesn't need routine maintenance. For
reference, here's what's where:

| Thing | File | Notes |
|---|---|---|
| Browser tab title, Google result title | `src/app/layout.tsx` → `TITLE` | Keep under ~60 characters |
| The description Google shows | `src/app/lib/site.ts` → `SITE_DESCRIPTION` | Keep under ~155 characters |
| Search keywords | `src/app/layout.tsx` → `keywords` | Minor impact; harmless to extend |
| Your job title, employer, university, city, social profiles | `src/app/lib/site.ts` → `PERSON` | Feeds Google's structured data |
| Social share card (the image on LinkedIn/WhatsApp/Twitter) | `src/app/og-image.png/route.tsx` | **Auto-generated** — the app counts on it update themselves |
| Favicon / app icons | `public/icon.svg`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` | Replace the files to change them |
| sitemap.xml, robots.txt | `src/app/sitemap.ts`, `src/app/robots.ts` | Generated at build; no edits needed |

### One thing worth doing once (not automatic)

Tell Google the site exists. Go to
[Google Search Console](https://search.google.com/search-console), add
`https://brisinger23.github.io/portfolio_code/` as a URL-prefix property, and
submit the sitemap:

```
https://brisinger23.github.io/portfolio_code/sitemap.xml
```

### Checking your share card looks right

After a change, paste the live URL into
[LinkedIn's Post Inspector](https://www.linkedin.com/post-inspector/) — it shows
what the preview looks like and lets you clear LinkedIn's cache. WhatsApp and
Twitter cache for a while too, so an old preview doesn't mean it's broken.

---

## 10. The one rule you must not forget: withBasePath

The live site is served from `/portfolio_code/`, **not** from the root of the
domain. So a link like `/images/apps/foo.jpg` points at the wrong place in
production. The `withBasePath()` helper adds the missing prefix.

**Always:**

```tsx
<Image src={withBasePath("/images/apps/foo.jpg")} ... />
<a href={withBasePath("/resume.pdf")}>Resume</a>
```

**Never:**

```tsx
<Image src="/images/apps/foo.jpg" ... />     // ❌ 404 on the live site
```

External links (`https://...`) and on-page links (`#projects`) never need it.

**The tell-tale symptom:** the image works perfectly on localhost:3000 and is
broken on the live site. That's always a missing `withBasePath`.

---

## 11. Checking your work before you publish

For a small text edit, eyeballing localhost is enough. For anything bigger, run
these three — they catch almost every mistake before it reaches the internet:

```bash
npx tsc --noEmit     # catches typos, missing commas, wrong field names
npx eslint src       # catches unused code and bad patterns
npm run build        # the real build — if this passes, the deploy will pass
```

If all three are silent, you're safe to push.

**Also worth a look:** shrink your browser window to phone width and scroll the
whole page. The site is built to work down to 320px wide — that's where layout
mistakes show up first.

---

## 12. When something goes wrong

**"The live site didn't change after I pushed."**
1. Hard refresh: **Cmd + Shift + R** (your browser caches aggressively).
2. Check https://github.com/brisinger23/portfolio_code/actions — is the latest
   run green? If it's red, click it, open the red step, and read the error. It
   names the file and line.
3. If it's still running, wait — it takes about a minute.

**`npm run build` fails.**
Read the last few lines of the error; it names the file and line number. The
usual culprits, in order of likelihood:
- a missing comma between two `{ ... }` blocks in `apps.ts`
- an unescaped apostrophe inside a `'single-quoted'` string
- a missing closing `}` or `"` 
- a field name typed wrong (`titel` instead of `title`)

**An image is broken on the live site but fine locally.**
Missing `withBasePath(...)`. See [section 10](#10-the-one-rule-you-must-not-forget-withbasepath).

**I broke something and want to go back.**

```bash
# Undo your last commit but keep the edits in your files
git reset --soft HEAD~1

# Throw away ALL uncommitted edits (careful — this can't be undone)
git restore .

# Go back to exactly what's live right now, discarding local work
git fetch origin && git reset --hard origin/main
```

**The live site is broken and I need it back now.**
Roll back to the previous commit and push that:

```bash
git revert HEAD        # creates a new commit undoing the last one
git push
```

**`npm run dev` says the port is in use.**
An old preview is still running. Either use that tab, or:

```bash
lsof -ti:3000 | xargs kill
```

**I pulled the repo on another Mac and nothing runs.**

```bash
npm ci
```

---

## 13. Command cheat sheet

```bash
# Go to the project (mind the quotes — the folder name has a space)
cd ~/Desktop/"New Folder 1"/portfolio_code

# Preview locally at http://localhost:3000   (Ctrl+C to stop)
npm run dev

# Check for mistakes
npx tsc --noEmit
npx eslint src
npm run build

# Publish
git add -A
git commit -m "what you changed"
git push

# See what you've changed but not yet committed
git status
git diff

# Watch the deploy
gh run list --limit 3
gh run watch

# Pull new Medium articles into the site
npm run sync:medium

# Reinstall packages if things get weird
npm ci
```

---

## 14. How the site is put together

Only useful if you're curious or making a structural change.

```
src/app/
├── page.tsx              ← the order of sections on the home page
├── layout.tsx            ← page title, SEO tags, Google structured data, shell
├── globals.css           ← site-wide styles (colours, grid background, glass effect)
├── sitemap.ts            ← generates /sitemap.xml
├── robots.ts             ← generates /robots.txt
├── manifest.ts           ← generates the PWA manifest
├── og-image.png/route.tsx ← generates the social share card image
├── lib/
│   ├── apps.ts           ← ★ ALL app content lives here
│   ├── site.ts           ← your name, job title, links, meta description
│   └── basePath.ts       ← the withBasePath() helper
└── components/
    ├── Header.tsx        ← nav bar + mobile menu
    ├── Footer.tsx        ← footer
    ├── BackToTop.tsx     ← floating scroll-to-top button
    ├── CursorTrail.tsx   ← mouse glow (desktop only)
    ├── ui/SectionHeader.tsx  ← the shared "subtitle / TITLE / description" block
    └── home/
        ├── Hero.tsx          ← intro, photo, stats, socials
        ├── Skills.tsx        ← tech stack
        ├── Experience.tsx    ← work history
        ├── Projects.tsx      ← the app grid
        ├── Writing.tsx       ← the Medium articles section
        ├── AppDetailModal.tsx← the "About this app" popup
        ├── AppGlyph.tsx      ← fallback art for apps with no icon
        ├── Education.tsx
        ├── Achievements.tsx
        └── Contact.tsx

scripts/
└── sync-medium.mjs       ← pulls new Medium posts into lib/writing.ts

public/                   ← files served as-is (always use withBasePath to link them)
├── images/apps/          ← app icons
├── images/hero/          ← profile photo
├── resume.pdf
├── icon.svg, icon-192.png, icon-512.png, apple-touch-icon.png
└── .nojekyll             ← required by GitHub Pages; don't delete

.github/workflows/
├── deploy.yml            ← publishes the site on every push
└── sync-medium.yml       ← daily: pulls new Medium posts, commits, redeploys
```

**Built with:** Next.js 15 (static export), React 19, TypeScript, Tailwind CSS 4,
Framer Motion. Hosted free on GitHub Pages.

**Styling note:** the odd-looking strings in `className="..."` are Tailwind
utility classes. `sm:` / `md:` / `lg:` prefixes mean "from this screen width
up", so `text-sm sm:text-base` = small text on phones, normal on bigger
screens. Reference: https://tailwindcss.com/docs

---

*This guide is committed to the repo, so it travels with the code and survives a
new laptop — but that also means it's public, like the rest of this repository.
Don't add passwords, tokens or private notes to it. `README.md` has a shorter
version of the "adding an app" steps.*
