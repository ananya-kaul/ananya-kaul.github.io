"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import { articles, MEDIUM_PROFILE, type Article } from "../../lib/writing";

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

const Writing = () => {
  return (
    <section
      className="w-full mt-20 sm:mt-25 px-4 sm:px-6"
      id="writing"
      aria-labelledby="writing-heading"
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
            id="writing-heading"
            title="Writing"
            subtitle="Articles"
            description="I write about AI engineering — RAG, LLM evaluation, agents and prompting in production. Published on Medium, Towards AI and Stackademic."
          />
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.07, duration: 0.6, ease: "easeOut" },
            },
          }}
          className="mt-6 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5"
        >
          {articles.map((article) => (
            <motion.li
              key={article.url}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="h-full"
            >
              <ArticleCard article={article} />
            </motion.li>
          ))}
        </motion.ul>

        <motion.a
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          href={MEDIUM_PROFILE}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 min-h-12 px-6 rounded-xl border border-white/10 bg-white/5 text-sm font-semibold text-gray-200 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/5 transition-colors"
        >
          Read everything on Medium
          <ArrowUpRight size={16} aria-hidden />
        </motion.a>
      </div>
    </section>
  );
};

export default Writing;

const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="h-full flex flex-col glass-effect rounded-2xl p-5 sm:p-6 gap-3 group transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl hover:shadow-black/40"
    >
      <div className="flex items-center gap-2 text-xs text-gray-500 flex-wrap">
        <span className="text-blue-400 font-semibold">{article.publication}</span>
        <span aria-hidden>·</span>
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays size={12} aria-hidden />
          <time dateTime={article.date}>{formatDate(article.date)}</time>
        </span>
      </div>

      <h3 className="font-display text-base sm:text-lg font-bold text-gray-100 leading-snug group-hover:text-blue-400 transition-colors">
        {article.title}
      </h3>

      <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
        {article.blurb}
      </p>

      <div className="mt-auto pt-3 flex flex-wrap items-center gap-1.5">
        {article.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="border border-white/5 bg-white/5 text-gray-400 text-[11px] px-2.5 py-1 rounded-full font-medium group-hover:bg-blue-500/10 group-hover:text-blue-300 group-hover:border-blue-500/20 transition-colors"
          >
            {tag}
          </span>
        ))}
        <ArrowUpRight
          size={16}
          className="ml-auto text-blue-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      </div>
    </a>
  );
};
