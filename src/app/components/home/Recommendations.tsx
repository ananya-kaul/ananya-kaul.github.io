"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Quote, Linkedin, PenLine, ShieldCheck } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import Stars from "../ui/Stars";
import RecommendationForm from "./RecommendationForm";
import { liveApps } from "../../lib/apps";
import {
  averageRating,
  recommendationCount,
  recommendations,
  YEARS_EXPERIENCE,
  type Recommendation,
} from "../../lib/recommendations";

/**
 * Everything except "Years experience" is counted from the data files, so the
 * numbers can never drift from what a visitor can see on the page.
 */
const stats = [
  ...(recommendationCount > 0
    ? [
        {
          value: `${averageRating.toFixed(1)}/5`,
          label: "Average rating",
          rating: averageRating,
        },
        {
          value: `${recommendationCount}`,
          label:
            recommendationCount === 1 ? "Recommendation" : "Recommendations",
        },
      ]
    : []),
  { value: `${liveApps.length}`, label: "Live apps delivered" },
  { value: YEARS_EXPERIENCE, label: "Years experience" },
];

const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

const Recommendations = () => {
  const [formOpen, setFormOpen] = useState(false);

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
          className={`mt-7 w-full grid grid-cols-2 gap-2.5 sm:gap-4 ${
            stats.length === 4
              ? "max-w-3xl md:grid-cols-4"
              : "max-w-md"
          }`}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass-effect rounded-2xl px-3 py-4 text-center flex flex-col items-center justify-center gap-1"
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd className="contents">
                {"rating" in stat && stat.rating !== undefined && (
                  <Stars value={stat.rating} size={13} label="" />
                )}
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

        {recommendations.length > 0 ? (
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
            {recommendations.map((item) => (
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
        )}

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
            {recommendationCount > 0
              ? "Leave a Recommendation"
              : "Be the first to recommend me"}
          </button>
          <p className="text-xs text-gray-600 flex items-center gap-1.5 text-center">
            <ShieldCheck size={13} aria-hidden />
            Every recommendation is read and approved by me before it appears
            here.
          </p>
        </motion.div>
      </div>

      <RecommendationForm open={formOpen} onClose={() => setFormOpen(false)} />
    </section>
  );
};

export default Recommendations;

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
      <span
        className="grid place-items-center shrink-0 h-11 w-11 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 font-display text-sm font-bold"
        aria-hidden
      >
        {initials(item.name)}
      </span>
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
