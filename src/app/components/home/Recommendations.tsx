"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Quote, Linkedin, PenLine, ShieldCheck, RotateCw } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import Stars from "../ui/Stars";
import RecommendationForm from "./RecommendationForm";
import { liveApps } from "../../lib/apps";
import {
  fetchListedRecommendations,
  YEARS_EXPERIENCE,
  type Recommendation,
} from "../../lib/recommendations";

const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

type LoadState = "loading" | "ready" | "error";

const Recommendations = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [items, setItems] = useState<Recommendation[]>([]);
  const [state, setState] = useState<LoadState>("loading");
  /* Bumping this re-runs the effect, which is how the Try again button and the
     "you just submitted one" case both ask for fresh data. */
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setState("loading");

    fetchListedRecommendations(controller.signal)
      .then((rows) => {
        setItems(rows);
        setState("ready");
      })
      .catch((error: unknown) => {
        // A cancelled request is us navigating away, not a failure worth showing
        if (controller.signal.aborted) return;
        console.error("Could not load recommendations:", error);
        setState("error");
      });

    return () => controller.abort();
  }, [attempt]);

  const count = items.length;

  /**
   * Everything except "Years experience" is counted from live data, so the
   * numbers can never drift from what a visitor can see on the page. The
   * count only appears once there is something to count.
   *
   * There is deliberately no average-rating tile: an average of one or two
   * fives says less than the cards themselves do, and reads as padding.
   * Each card still carries its own stars.
   */
  const stats = [
    ...(state === "ready" && count > 0
      ? [
          {
            value: `${count}`,
            label: count === 1 ? "Recommendation" : "Recommendations",
          },
        ]
      : []),
    { value: `${liveApps.length}`, label: "Live apps delivered" },
    { value: YEARS_EXPERIENCE, label: "Years experience" },
  ];

  return (
    <section
      className="w-full mt-20 sm:mt-25 px-4 sm:px-6"
      id="recommendations"
      aria-labelledby="recommendations-heading"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-2 justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full"
        >
          <SectionHeader
            id="recommendations-heading"
            title="What People Say"
            subtitle="Recommendations"
            description="Managers, teammates and clients I've shipped with — in their own words, not mine."
          />
        </motion.div>

        {/* Stats — the quick-scan version for anyone who won't read the cards */}
        <motion.dl
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          viewport={{ once: true }}
          /* Three tiles want three columns — in a two-column grid the third
             would sit alone on a second row, which reads as a mistake. */
          className={`mt-7 w-full grid gap-2.5 sm:gap-4 ${
            stats.length === 3
              ? "grid-cols-3 max-w-2xl"
              : "grid-cols-2 max-w-md"
          }`}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass-effect rounded-2xl px-3 py-4 text-center flex flex-col items-center justify-center gap-1"
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd className="contents">
                <span className="block font-display text-xl sm:text-2xl font-bold text-gray-50">
                  {stat.value}
                </span>
                <span
                  aria-hidden
                  className="block text-[10px] sm:text-xs text-gray-500 leading-tight"
                >
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </motion.dl>

        {/* aria-live so a screen reader is told when the cards finish loading,
            rather than being left on "Loading recommendations" forever */}
        <div className="w-full flex flex-col items-center" aria-live="polite">
          {state === "loading" && <LoadingCards />}

          {state === "error" && <ErrorState onRetry={() => setAttempt((n) => n + 1)} />}

          {state === "ready" &&
            (count > 0 ? (
              <motion.ul
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      staggerChildren: 0.08,
                      duration: 0.6,
                      ease: "easeOut",
                    },
                  },
                }}
                className="mt-6 sm:mt-8 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5"
              >
                {items.map((item) => (
                  <motion.li
                    key={item.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    className="h-full"
                  >
                    <RecommendationCard item={item} />
                  </motion.li>
                ))}
              </motion.ul>
            ) : (
              <EmptyState onOpen={() => setFormOpen(true)} />
            ))}
        </div>

        {/* The ask — always visible, so a happy visitor never has to hunt for it */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 flex flex-col items-center gap-3"
        >
          <button
            type="button"
            onClick={() => setFormOpen(true)}
            className="inline-flex items-center gap-2 min-h-12 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-colors shadow-lg shadow-blue-600/20 active:scale-[0.98]"
          >
            <PenLine size={16} aria-hidden />
            {/* "Be the first" is only true once we've actually heard back that
                there are none. While loading, or if the request failed, we
                don't know — so fall back to the neutral wording. */}
            {state === "ready" && count === 0
              ? "Be the first to recommend me"
              : "Leave a Recommendation"}
          </button>
          {/* items-start, not items-center: on a phone this line wraps, and
              centring the icon against a two-line block parks it in the gutter
              between the lines. Aligning to the top and nudging it down by
              half a line's leading keeps it on the first line at every width.
              shrink-0 stops flex from squashing the 13px square. */}
          <p className="text-xs text-gray-600 flex items-start justify-center gap-1.5 text-center">
            <ShieldCheck size={13} className="shrink-0 mt-[1.5px]" aria-hidden />
            <span>
              Every recommendation is read and approved by me before it appears
              here.
            </span>
          </p>
        </motion.div>
      </div>

      <RecommendationForm open={formOpen} onClose={() => setFormOpen(false)} />
    </section>
  );
};

export default Recommendations;

/* ---------------------------------------------------------------- states */

/** Two card-shaped placeholders, so the page doesn't jump when the real ones land. */
const LoadingCards = () => (
  <div className="mt-6 sm:mt-8 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
    <span className="sr-only">Loading recommendations…</span>
    {[0, 1].map((index) => (
      <div
        key={index}
        aria-hidden
        className="glass-effect rounded-2xl p-5 sm:p-6 h-56 flex flex-col gap-4 animate-pulse"
      >
        <div className="h-4 w-28 rounded bg-white/10" />
        <div className="flex flex-col gap-2">
          <div className="h-3 w-full rounded bg-white/10" />
          <div className="h-3 w-11/12 rounded bg-white/10" />
          <div className="h-3 w-8/12 rounded bg-white/10" />
        </div>
        <div className="mt-auto pt-4 border-t border-white/5 flex items-center gap-3">
          <div className="h-11 w-11 rounded-full bg-white/10 shrink-0" />
          <div className="flex flex-col gap-2 w-full">
            <div className="h-3 w-32 rounded bg-white/10" />
            <div className="h-2.5 w-44 rounded bg-white/10" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

/**
 * Shown when the database can't be reached. Deliberately *not* the empty state:
 * telling a visitor "be the first to recommend me" when there are in fact
 * recommendations sitting behind a failed request would be untrue.
 */
const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <div className="mt-6 sm:mt-8 w-full max-w-2xl glass-effect rounded-2xl p-6 sm:p-8 text-center flex flex-col items-center gap-3">
    <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-md">
      Recommendations couldn&apos;t be loaded just now. It&apos;s almost
      certainly temporary.
    </p>
    <button
      type="button"
      onClick={onRetry}
      className="inline-flex items-center gap-2 min-h-11 px-5 rounded-xl border border-white/10 bg-white/5 text-sm font-semibold text-gray-200 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/5 transition-colors"
    >
      <RotateCw size={15} aria-hidden />
      Try again
    </button>
  </div>
);

const EmptyState = ({ onOpen }: { onOpen: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.2 }}
    viewport={{ once: true }}
    className="mt-6 sm:mt-8 w-full max-w-2xl glass-effect rounded-2xl p-6 sm:p-10 text-center flex flex-col items-center gap-3"
  >
    <Quote size={28} className="text-blue-400/60" aria-hidden />
    <h3 className="font-display text-lg sm:text-xl font-bold text-gray-100">
      This space is for the people I&apos;ve worked with
    </h3>
    <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-lg">
      If we&apos;ve shipped something together — a feature, an SDK, a whole app
      — I&apos;d be grateful for a couple of honest lines about what that was
      like. It takes two minutes, and it says far more than anything I could
      write about myself.
    </p>
    <button
      type="button"
      onClick={onOpen}
      className="mt-2 inline-flex items-center gap-2 min-h-12 px-6 rounded-xl border border-white/10 bg-white/5 text-sm font-semibold text-gray-200 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/5 transition-colors"
    >
      <PenLine size={15} aria-hidden />
      Write one
    </button>
  </motion.div>
);

const RecommendationCard = ({ item }: { item: Recommendation }) => (
  <figure className="h-full flex flex-col glass-effect rounded-2xl p-5 sm:p-6 gap-4 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl hover:shadow-black/40">
    <div className="flex items-start justify-between gap-3">
      <Stars
        value={item.rating}
        label={`${item.name} rated ${item.rating} out of 5`}
      />
      {item.wouldWorkAgain && (
        <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 rounded-full whitespace-nowrap">
          Would work with me again
        </span>
      )}
    </div>

    <blockquote className="relative text-sm sm:text-[15px] text-gray-300 leading-relaxed break-words">
      <Quote
        size={22}
        className="absolute -top-1 -left-0.5 text-white/5"
        aria-hidden
      />
      <p className="relative">&ldquo;{item.quote}&rdquo;</p>
    </blockquote>

    {item.highlights && item.highlights.length > 0 && (
      <ul className="flex flex-wrap gap-1.5">
        {item.highlights.map((highlight) => (
          <li
            key={highlight}
            className="border border-white/5 bg-white/5 text-gray-400 text-[11px] px-2.5 py-1 rounded-full font-medium"
          >
            {highlight}
          </li>
        ))}
      </ul>
    )}

    <figcaption className="mt-auto pt-4 border-t border-white/5 flex items-center gap-3">
      {item.photoUrl ? (
        /* Plain <img>: the URL is whatever you pasted into the dashboard, and
           next/image would need every possible host declared up front. */
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.photoUrl}
          alt=""
          loading="lazy"
          decoding="async"
          className="shrink-0 h-11 w-11 rounded-full object-cover border border-white/10"
        />
      ) : (
        <span
          className="grid place-items-center shrink-0 h-11 w-11 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 font-display text-sm font-bold"
          aria-hidden
        >
          {initials(item.name)}
        </span>
      )}
      <div className="min-w-0">
        {/* break-words throughout: a long unbroken company name or job title
            would otherwise run off the edge of the card on a narrow phone */}
        <p className="text-sm font-bold text-gray-100 flex items-center gap-1.5 flex-wrap break-words">
          {item.linkedin ? (
            <a
              href={item.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors inline-flex items-center gap-1.5"
            >
              {item.name}
              <Linkedin size={12} className="text-blue-400" aria-hidden />
              <span className="sr-only">— LinkedIn profile</span>
            </a>
          ) : (
            item.name
          )}
        </p>
        <p className="text-xs text-gray-500 leading-snug break-words">
          {item.designation}
          {item.company && ` · ${item.company}`}
        </p>
        <p className="text-[11px] text-gray-600 mt-0.5 break-words">
          {item.relationship}
          {item.project && ` · ${item.project}`}
        </p>
      </div>
    </figcaption>
  </figure>
);
