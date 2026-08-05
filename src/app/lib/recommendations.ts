/**
 * Recommendations shown in the "What People Say" section.
 *
 * These are no longer typed into this file. They live in a Supabase database,
 * and you decide what appears from your admin dashboard:
 *
 *   Visitor fills the form  ->  row lands in the database as "pending"
 *                           ->  you open your admin site and press List
 *                           ->  it appears here within seconds, no rebuild
 *
 * Pressing Unlist takes it off the site again without deleting anything, and
 * pressing List later brings it straight back. Nothing on this page is
 * automatic: only rows you have explicitly listed are readable by the public.
 *
 * The site reads a *view* called `public_recommendations`, not the table. The
 * view leaves out the submitter's email address, so the public key used by
 * this file physically cannot read it.
 *
 * -> Setup and day-to-day use are in HOW-TO-EDIT.md, section 7b.
 */

/**
 * Both values are meant to be public — they are compiled into the JavaScript
 * that every visitor downloads, which is how Supabase is designed to work. The
 * anon key alone grants nothing: the database rules decide that it may read
 * listed recommendations and submit new pending ones, and nothing else.
 *
 * Set them in `.env.local` for local development, and as repository secrets
 * for the deploy (see HOW-TO-EDIT.md 7b). If they are missing the site still
 * builds and every other section works — the recommendations section simply
 * reports that it could not load.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

/** How the person knows you. The database only accepts these exact strings. */
export type Relationship =
  | "Managed me"
  | "Worked with me"
  | "Reported to me"
  | "Client"
  | "Mentor"
  | "Studied with me";

/** Their answer to "Would you hire or work with Ananya again?" */
export type WouldWorkAgain = "Yes, absolutely" | "Yes" | "Maybe";

export type Recommendation = {
  id: string;
  name: string;
  /** Job title, e.g. "Senior Mobile Developer" */
  designation: string;
  /** Where they work. Optional — some people would rather not say. */
  company?: string;
  relationship: Relationship;
  /** Whole numbers, 1 to 5. */
  rating: number;
  /** The recommendation itself, in their own words. */
  quote: string;
  /** Optional: what they worked on with you, shown under their name. */
  project?: string;
  /** Optional: the qualities they picked out, shown as small chips. */
  highlights?: string[];
  /** Optional: their LinkedIn. Turns their name into a verifiable link. */
  linkedin?: string;
  /** Optional: shown as a green badge on the card. */
  wouldWorkAgain?: WouldWorkAgain;
  /** Optional: a photo URL. Falls back to their initials when empty. */
  photoUrl?: string;
};

/** One row of the `public_recommendations` view, exactly as Postgres sends it. */
type Row = {
  id: string;
  name: string;
  designation: string;
  company: string | null;
  relationship: string;
  rating: number;
  quote: string;
  project: string | null;
  highlights: string[] | null;
  linkedin: string | null;
  would_work_again: string | null;
  photo_url: string | null;
};

/** Postgres uses snake_case and nulls; the rest of the app doesn't. */
const fromRow = (row: Row): Recommendation => ({
  id: row.id,
  name: row.name,
  designation: row.designation,
  company: row.company ?? undefined,
  relationship: row.relationship as Relationship,
  rating: row.rating,
  quote: row.quote,
  project: row.project ?? undefined,
  highlights: row.highlights?.length ? row.highlights : undefined,
  linkedin: row.linkedin ?? undefined,
  wouldWorkAgain: (row.would_work_again as WouldWorkAgain) || undefined,
  photoUrl: row.photo_url ?? undefined,
});

/**
 * Everything currently listed, newest first.
 *
 * Throws if the database can't be reached, so the section can tell the
 * difference between "he has no recommendations yet" and "something is broken"
 * — showing the friendly empty state in the second case would be a lie.
 */
export const fetchListedRecommendations = async (
  signal?: AbortSignal
): Promise<Recommendation[]> => {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase is not configured");
  }

  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/public_recommendations?select=*&order=listed_at.desc`,
    {
      signal,
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Recommendations request failed (${response.status})`);
  }

  const rows: Row[] = await response.json();
  return rows.map(fromRow);
};

/** Send a new submission. It always arrives as "pending" — see 7b. */
export const submitRecommendation = async (payload: {
  name: string;
  designation: string;
  company: string;
  relationship: string;
  rating: number;
  quote: string;
  project: string;
  highlights: string[];
  linkedin: string;
  wouldWorkAgain: string;
  recommend: string;
  howYouKnowMe: string;
  email: string;
}): Promise<void> => {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase is not configured");
  }

  /* A stored function rather than a plain insert. The function forces the new
     row to "pending" no matter what is sent, so nobody can publish straight to
     your site by calling this endpoint themselves. */
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/rpc/submit_recommendation`,
    {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        p_name: payload.name,
        p_designation: payload.designation,
        p_company: payload.company,
        p_relationship: payload.relationship,
        p_rating: payload.rating,
        p_quote: payload.quote,
        p_project: payload.project,
        p_highlights: payload.highlights,
        p_linkedin: payload.linkedin,
        p_would_work_again: payload.wouldWorkAgain,
        p_recommend: payload.recommend,
        p_how_you_know_me: payload.howYouKnowMe,
        p_email: payload.email,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Submission failed (${response.status})`);
  }
};

/** Average rating to one decimal place, e.g. 4.9. Zero when there are none. */
export const averageOf = (items: Recommendation[]) =>
  items.length === 0
    ? 0
    : Math.round(
        (items.reduce((sum, item) => sum + item.rating, 0) / items.length) * 10
      ) / 10;

/**
 * Shown in the stats row. This is the one number here that isn't calculated,
 * because only you know when you started — bump it by hand each year.
 */
export const YEARS_EXPERIENCE = "2+";

/** The chips someone can tick under "What impressed you the most?" */
export const STRENGTH_OPTIONS = [
  "Problem solving",
  "Mobile Development",
  "Flutter",
  "Swift",
  "AI knowledge",
  "Communication",
  "Teamwork",
  "Leadership",
  "Code quality",
  "Meeting deadlines",
] as const;

export const RELATIONSHIP_OPTIONS: Relationship[] = [
  "Worked with me",
  "Managed me",
  "Reported to me",
  "Client",
  "Mentor",
  "Studied with me",
];

export const RECOMMEND_OPTIONS = ["Definitely", "Yes", "Maybe"] as const;

export const WORK_AGAIN_OPTIONS: WouldWorkAgain[] = [
  "Yes, absolutely",
  "Yes",
  "Maybe",
];
