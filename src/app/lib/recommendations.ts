/**
 * Recommendations shown in the "What People Say" section.
 *
 * Nothing on this page is automatic, and that is deliberate. Someone fills in
 * the form on the site, their answers land in the same Google Sheet as your
 * contact form, you read them, and you paste the ones you're happy with into
 * the `recommendations` array below. That manual step is what keeps spam and
 * joke entries off your site.
 *
 * The numbers above the cards (average rating, how many recommendations) are
 * calculated from this array, so they can never disagree with what a visitor
 * can actually count on screen.
 *
 * -> Full step-by-step instructions live in HOW-TO-EDIT.md, section 7b.
 */

/** How the person knows you. Use one of these exact strings. */
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
  /** Any short unique slug — used as the React key. e.g. "rahul-sharma" */
  id: string;
  name: string;
  /** Job title, e.g. "Senior Mobile Developer" */
  designation: string;
  /** Where they work. Leave it out if they'd rather not say. */
  company?: string;
  relationship: Relationship;
  /** Whole numbers, 1 to 5. */
  rating: number;
  /** The recommendation itself, in their own words. Don't rewrite it. */
  quote: string;
  /** Optional: what they worked on with you, shown under their name. */
  project?: string;
  /** Optional: the qualities they picked out, shown as small chips. */
  highlights?: string[];
  /** Optional: their LinkedIn. Makes the recommendation verifiable — worth asking for. */
  linkedin?: string;
  /** Optional: shown as a green badge on the card. */
  wouldWorkAgain?: WouldWorkAgain;
};

/**
 * Paste approved recommendations here, newest first.
 *
 * The section is built to look right whether there are zero, one or twenty —
 * with none it shows an invitation to be the first, so it never looks broken.
 *
 * Copy this shape for each new one:
 *
 *   {
 *     id: "rahul-sharma",
 *     name: "Rahul Sharma",
 *     designation: "Senior Mobile Developer",
 *     company: "iApp Technologies LLP",
 *     relationship: "Worked with me",
 *     rating: 5,
 *     project: "SecondLine — VoIP calling",
 *     highlights: ["Problem solving", "Swift", "Teamwork"],
 *     wouldWorkAgain: "Yes, absolutely",
 *     linkedin: "https://www.linkedin.com/in/example",
 *     quote:
 *       "Ananya consistently delivered features ahead of deadline without letting code quality slip...",
 *   },
 */
export const recommendations: Recommendation[] = [];

/** How many recommendations are live on the site right now. */
export const recommendationCount = recommendations.length;

/** Average rating to one decimal place, e.g. 4.9. Zero when there are none. */
export const averageRating =
  recommendationCount === 0
    ? 0
    : Math.round(
        (recommendations.reduce((sum, item) => sum + item.rating, 0) /
          recommendationCount) *
          10
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
