"use client";
import React, { useState } from "react";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import SectionHeader from "../ui/SectionHeader";
import { motion } from "framer-motion";
import {
  apps,
  liveApps,
  hasLivePlayStore,
  type AppProject,
} from "../../lib/apps";
import AppDetailModal from "./AppDetailModal";
import { GlyphArt } from "./AppGlyph";

const Projects = () => {
  const [selected, setSelected] = useState<AppProject | null>(null);

  return (
    <section
      className="w-full mt-20 sm:mt-25 px-4 sm:px-6"
      id="projects"
      aria-labelledby="projects-heading"
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
            id="projects-heading"
            title="Apps I've Built"
            subtitle="Featured"
            description="Apps I've built, improved, and shipped to production. Tap any app to read about it — the store links are inside."
          />
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                staggerChildren: 0.08,
                duration: 0.8,
                ease: "easeOut",
              },
            },
          }}
          className="mt-6 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-7 auto-rows-fr items-stretch"
        >
          {apps.map((app) => (
            <motion.div
              key={app.slug}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <ProjectCard app={app} onOpen={() => setSelected(app)} />
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mt-8 text-center text-sm sm:text-base text-faint max-w-xl"
        >
          {apps.length} production apps across iOS, Android and cross-platform
          stacks — {liveApps.length} of them live on the App Store or Google Play.
        </motion.p>
      </div>

      <AppDetailModal app={selected} onClose={() => setSelected(null)} />
    </section>
  );
};

export default Projects;

const CardArtwork = ({ app }: { app: AppProject }) => {
  return (
    <>
      {app.icon ? (
        <>
          {/* Blurred icon as ambient backdrop */}
          <Image
            fill
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            src={app.icon}
            alt=""
            aria-hidden
            className="object-cover scale-150 blur-2xl opacity-50 transition-transform duration-700 group-hover:scale-[1.7]"
          />
          <div className="absolute inset-0 bg-surface/40" />
          {/* Sharp app icon front and center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src={app.icon}
              width={96}
              height={96}
              loading="lazy"
              alt={`${app.title} app icon`}
              className="h-20 w-20 sm:h-24 sm:w-24 rounded-[22%] shadow-2xl shadow-shade-strong ring-1 ring-white/20 transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </>
      ) : (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${app.gradient ?? "from-gray-700/50 to-gray-900/50"} flex items-center justify-center`}
        >
          <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-[22%] bg-tint-strong ring-1 ring-white/20 shadow-2xl shadow-shade-strong flex items-center justify-center text-white/90 transition-transform duration-500 group-hover:scale-110">
            <GlyphArt glyph={app.glyph} />
          </div>
        </div>
      )}
    </>
  );
};

const ProjectCard = ({
  app,
  onOpen,
}: {
  app: AppProject;
  onOpen: () => void;
}) => {
  return (
    <article className="h-full">
      {/* The whole card opens the detail sheet — store links live inside it */}
      <button
        type="button"
        onClick={onOpen}
        aria-label={`${app.title} — read about this app`}
        className="h-full w-full text-left flex flex-col glass-effect text-body rounded-2xl overflow-hidden group transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-shade hover:border-line-strong active:scale-[0.99] cursor-pointer"
      >
        {/* Artwork */}
        <div className="relative overflow-hidden aspect-[16/10] sm:aspect-video w-full">
          <CardArtwork app={app} />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <span className="bg-blue-600 px-6 py-2 rounded-full text-white font-bold text-sm border border-blue-400/50 shadow-lg shadow-blue-500/30 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              About this app
            </span>
          </div>

          {/* Store availability badges.

              Both marks are bounding-box centred by the grid, but neither
              *looks* centred, because their ink is not evenly distributed
              inside that box. Measured against each glyph's alpha-weighted
              centre of mass at the sizes used here: the apple sits ~1px low
              (the leaf stretches the box upwards while the body hangs below)
              and the play mark reads ~1.7px right (it is widest at the left
              and tapers to a point). The nudges below pull each one back to
              its optical centre — half the offset for the play mark, since a
              full correction overshoots on a pointed shape. */}
          <div className="absolute top-3 right-3 flex gap-1.5">
            {app.appStore && (
              <span
                title="Available on the App Store"
                className="grid place-items-center h-7 w-7 rounded-full bg-scrim border border-line-strong text-ink backdrop-blur-sm"
              >
                <FaApple size={13} className="-translate-y-px" aria-hidden />
                <span className="sr-only">Available on the App Store</span>
              </span>
            )}
            {hasLivePlayStore(app) && (
              <span
                title="Available on Google Play"
                className="grid place-items-center h-7 w-7 rounded-full bg-scrim border border-line-strong text-ink backdrop-blur-sm"
              >
                <FaGooglePlay
                  size={12}
                  className="translate-x-[0.8px]"
                  aria-hidden
                />
                <span className="sr-only">Available on Google Play</span>
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5 sm:p-6 gap-3.5">
          <div>
            <h3 className="font-display text-lg sm:text-xl font-bold mb-1.5 text-ink group-hover:text-accent transition-colors tracking-tight leading-snug">
              {app.title}
            </h3>
            <p className="text-muted text-sm leading-relaxed line-clamp-3">
              {app.tagline}
            </p>
          </div>

          {/* Tags — capped so cards stay the same height on narrow screens */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {app.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="border border-line-soft bg-tint text-muted text-[11px] sm:text-xs px-2.5 py-1 rounded-full font-medium group-hover:bg-blue-500/10 group-hover:text-accent-soft group-hover:border-blue-500/20 transition-colors duration-500"
              >
                {tag}
              </span>
            ))}
            {app.tags.length > 4 && (
              <span className="text-[11px] sm:text-xs px-2 py-1 text-faint">
                +{app.tags.length - 4}
              </span>
            )}
          </div>

          <div className="mt-auto pt-3.5 border-t border-line flex items-center gap-1.5 text-sm font-semibold text-accent">
            View details
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </div>
        </div>
      </button>
    </article>
  );
};
