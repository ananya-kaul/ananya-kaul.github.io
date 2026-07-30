#!/usr/bin/env node
/**
 * Pulls new articles from the Medium RSS feed into src/app/lib/writing.ts.
 *
 *   node scripts/sync-medium.mjs           # add anything new
 *   node scripts/sync-medium.mjs --dry-run # show what would change
 *
 * Runs on a schedule in .github/workflows/sync-medium.yml, so publishing on
 * Medium puts the post on the site within a day without anyone touching code.
 *
 * Design note: this only ever PREPENDS posts it hasn't seen before, matched by
 * URL. Existing entries are never rewritten — so any wording you fix by hand
 * stays fixed, and re-running is always safe.
 */

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const FEED = "https://medium.com/feed/@ananyakaul";
const TARGET = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../src/app/lib/writing.ts"
);

// Medium reports every publication as "Medium" in its metadata, so map the host
const PUBLICATIONS = {
  "pub.towardsai.net": "Towards AI",
  "blog.stackademic.com": "Stackademic",
  "levelup.gitconnected.com": "Level Up Coding",
  "medium.com": "Medium",
  "betterprogramming.pub": "Better Programming",
  "javascript.plainenglish.io": "JavaScript in Plain English",
  "ai.plainenglish.io": "AI in Plain English",
  "python.plainenglish.io": "Python in Plain English",
};

/** Readable labels for Medium's lowercase-hyphenated tags */
const TAG_LABELS = {
  ai: "AI",
  "ai-agent": "AI Agents",
  "ai-projects": "AI Projects",
  "artificial-intelligence": "Artificial Intelligence",
  llm: "LLMs",
  "machine-learning": "Machine Learning",
  "prompt-engineering": "Prompt Engineering",
  "data-science": "Data Science",
  "software-engineering": "Software Engineering",
  "software-development": "Software Development",
  "backend-development": "Backend",
  database: "Databases",
  "future-of-work": "Future of Work",
  "job-hunting": "Careers",
  "self-improvement": "Growth",
  nlp: "NLP",
  rag: "RAG",
  api: "APIs",
  ios: "iOS",
  ux: "UX",
};

const decode = (s = "") =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");

const tagOf = (xml, name) => {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return m ? decode(m[1]).trim() : "";
};

const allTags = (xml, name) =>
  [...xml.matchAll(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, "g"))].map(
    (m) => decode(m[1]).trim()
  );

/**
 * Medium truncates long titles with an ellipsis in every field it exposes
 * (RSS, og:title, schema headline), so there is no source for the full text.
 * Trim back to the last complete phrase instead of leaving a dangling fragment.
 */
const cleanTitle = (raw) => {
  const stripped = raw.replace(/\s*(…|\.\.\.)\s*$/, "").trim();
  if (stripped === raw.trim()) return stripped; // wasn't truncated

  let t = stripped;
  const open = t.lastIndexOf("(");
  if (open !== -1 && !t.slice(open).includes(")")) t = t.slice(0, open).trim();
  t = t.replace(
    /[\s—–-]+(and|or|the|a|an|to|of|in|for|with|not|that|how|why|is|are)$/i,
    ""
  );
  return t.replace(/[,:;—–\-]+$/, "").trim();
};

const blurbFrom = (content, rawTitle, cleanedTitle) => {
  let text = decode(content)
    .replace(/<figure[\s\S]*?<\/figure>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // Posts often open by repeating their own headline. Try the feed's title
  // first — it's longer than our trimmed one, so it strips more of the repeat.
  const candidates = [
    rawTitle.replace(/\s*(…|\.\.\.)\s*$/, "").trim(),
    cleanedTitle,
  ];
  for (const candidate of candidates) {
    if (!candidate) continue;
    const head = candidate.slice(0, 40).toLowerCase();
    if (text.toLowerCase().startsWith(head)) {
      text = text.slice(candidate.length).replace(/^[\s:—–-]+/, "");
      break;
    }
  }

  // A truncated headline can leave its own tail at the front of the body
  // (e.g. "Them) Forget chatbots…") — cut through the orphaned bracket.
  const close = text.indexOf(")");
  const open = text.indexOf("(");
  if (close !== -1 && close < 40 && (open === -1 || open > close)) {
    text = text.slice(close + 1).replace(/^[\s:—–-]+/, "");
  }

  const capped = text.slice(0, 210);
  const cut = Math.max(
    capped.lastIndexOf(". "),
    capped.lastIndexOf("? "),
    capped.lastIndexOf("! ")
  );
  return (cut > 80 ? capped.slice(0, cut + 1) : capped).trim();
};

const publicationOf = (url) => {
  const host = new URL(url).hostname;
  if (PUBLICATIONS[host]) return PUBLICATIONS[host];
  // Unknown publication — make a readable guess from the host
  const label = host.replace(/^(www|blog|pub)\./, "").split(".")[0];
  return label.charAt(0).toUpperCase() + label.slice(1);
};

const labelTag = (tag) =>
  TAG_LABELS[tag] ??
  tag
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

const tsString = (s) => s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

const parseFeed = (xml) =>
  [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => {
    const item = m[1];
    const url = tagOf(item, "link").split("?")[0];
    const rawTitle = tagOf(item, "title");
    const title = cleanTitle(rawTitle);
    const seen = new Set();
    const tags = allTags(item, "category")
      .map(labelTag)
      .filter((t) => t && !seen.has(t) && seen.add(t))
      .slice(0, 4);

    return {
      title,
      url,
      date: new Date(tagOf(item, "pubDate")).toISOString().slice(0, 10),
      publication: publicationOf(url),
      blurb: blurbFrom(tagOf(item, "content:encoded"), rawTitle, title),
      tags,
      truncated: /(…|\.\.\.)\s*$/.test(rawTitle),
    };
  });

const renderEntry = (a) =>
  `  {\n` +
  `    title:\n      "${tsString(a.title)}",\n` +
  `    url: "${a.url}",\n` +
  `    date: "${a.date}",\n` +
  `    publication: "${tsString(a.publication)}",\n` +
  `    blurb:\n      "${tsString(a.blurb)}",\n` +
  `    tags: [${a.tags.map((t) => `"${tsString(t)}"`).join(", ")}],\n` +
  `  },\n`;

async function main() {
  const dryRun = process.argv.includes("--dry-run");

  const res = await fetch(FEED, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
        "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      Accept: "application/rss+xml, text/xml, */*",
    },
  });
  if (!res.ok) throw new Error(`Feed returned HTTP ${res.status}`);

  const items = parseFeed(await res.text());
  if (items.length === 0) throw new Error("Feed parsed but contained no items");

  const source = await readFile(TARGET, "utf8");
  const known = new Set(
    [...source.matchAll(/^\s*url:\s*"([^"]+)"/gm)].map((m) => m[1])
  );

  const fresh = items.filter((a) => a.url && !known.has(a.url));
  if (fresh.length === 0) {
    console.log(`Up to date — ${known.size} articles already listed.`);
    return;
  }

  // Newest first, matching the order of the array
  fresh.sort((a, b) => b.date.localeCompare(a.date));

  const anchor = "export const articles: Article[] = [\n";
  if (!source.includes(anchor)) {
    throw new Error(`Could not find the articles array in ${TARGET}`);
  }
  const updated = source.replace(
    anchor,
    anchor + fresh.map(renderEntry).join("")
  );

  console.log(`Found ${fresh.length} new article(s):`);
  for (const a of fresh) {
    console.log(`  • ${a.date}  ${a.title}  [${a.publication}]`);
    if (a.truncated) {
      console.log(
        `    ⚠︎  Medium truncated this title in its feed — it was trimmed to the`
      );
      console.log(
        `        last complete phrase. Check it against the article and edit`
      );
      console.log(`        src/app/lib/writing.ts if it reads wrong.`);
    }
  }

  if (dryRun) {
    console.log("\n--dry-run: nothing written.");
    return;
  }

  await writeFile(TARGET, updated);
  console.log(`\nWrote ${TARGET}`);
}

main().catch((err) => {
  console.error(`sync-medium failed: ${err.message}`);
  process.exit(1);
});
