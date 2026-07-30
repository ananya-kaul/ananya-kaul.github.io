"use client";

import React, { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, Check, ExternalLink } from "lucide-react";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import type { AppProject } from "../../lib/apps";
import { GlyphArt } from "./AppGlyph";

type Props = {
  app: AppProject | null;
  onClose: () => void;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const AppDetailModal = ({ app, onClose }: Props) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  // Remember what was focused before opening so we can restore it on close
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      // Keep Tab inside the dialog
      const nodes = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((node) => node.offsetParent !== null);
      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!app) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    document.body.classList.add("no-scroll");
    document.addEventListener("keydown", handleKeyDown);

    // Let the open animation start before stealing focus
    const timer = window.setTimeout(() => closeButtonRef.current?.focus(), 60);

    return () => {
      window.clearTimeout(timer);
      document.body.classList.remove("no-scroll");
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused.current?.focus?.();
    };
  }, [app, handleKeyDown]);

  return (
    <AnimatePresence>
      {app && (
        <motion.div
          key="app-detail-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm p-0 sm:p-6"
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="app-detail-title"
            key="app-detail-panel"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full sm:max-w-2xl max-h-[92dvh] sm:max-h-[88dvh] flex flex-col overflow-hidden rounded-t-3xl sm:rounded-3xl border border-white/10 bg-[#0d1117] shadow-2xl shadow-black/60"
          >
            {/* Drag affordance on mobile so the sheet reads as dismissible */}
            <div className="sm:hidden pt-3 pb-1 flex justify-center shrink-0">
              <span className="h-1.5 w-10 rounded-full bg-white/20" />
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close app details"
              className="absolute right-3 top-3 sm:right-4 sm:top-4 z-10 grid place-items-center h-11 w-11 rounded-full bg-black/50 text-gray-300 border border-white/10 hover:text-white hover:bg-black/70 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Scrollable body */}
            <div className="overflow-y-auto overscroll-contain px-5 sm:px-8 pb-6 pt-4 sm:pt-8">
              {/* Header: icon + title */}
              <div className="flex gap-4 sm:gap-5 items-start pr-12">
                <div className="relative shrink-0 h-20 w-20 sm:h-24 sm:w-24 rounded-[22%] overflow-hidden ring-1 ring-white/15 shadow-xl shadow-black/50">
                  {app.icon ? (
                    <Image
                      src={app.icon}
                      alt={`${app.title} app icon`}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  ) : (
                    <div
                      className={`h-full w-full bg-gradient-to-br ${
                        app.gradient ?? "from-gray-700/60 to-gray-900/60"
                      } grid place-items-center text-white/90`}
                    >
                      <GlyphArt glyph={app.glyph} size={32} />
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <h3
                    id="app-detail-title"
                    className="font-display text-xl sm:text-2xl font-bold text-gray-50 leading-tight tracking-tight"
                  >
                    {app.title}
                  </h3>
                  <p className="mt-1.5 text-sm sm:text-base text-gray-400 leading-snug">
                    {app.tagline}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-2 gap-y-1 text-xs text-gray-500">
                    <span className="text-blue-400/90">{app.category}</span>
                    <span aria-hidden>·</span>
                    <span>{app.platforms.join(" · ")}</span>
                  </div>
                </div>
              </div>

              {/* About */}
              <div className="mt-6 sm:mt-7">
                <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 mb-2.5">
                  About this app
                </h4>
                <p className="text-sm sm:text-[15px] leading-relaxed text-gray-300">
                  {app.about}
                </p>
              </div>

              {/* What I built */}
              <div className="mt-6 sm:mt-7">
                <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 mb-3">
                  What I built
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {app.highlights.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-gray-300">
                      <Check
                        size={16}
                        className="mt-0.5 shrink-0 text-blue-400"
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech */}
              <div className="mt-6 sm:mt-7">
                <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 mb-3">
                  Built with
                </h4>
                <div className="flex flex-wrap gap-2">
                  {app.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-white/10 bg-white/5 text-gray-300 text-xs px-3 py-1.5 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {!app.appStore && !app.playStore && (
                <p className="mt-6 text-xs text-gray-500 italic">
                  Client-internal or unreleased build — no public store listing.
                </p>
              )}
            </div>

            {/* Sticky store actions — the only place that leaves the site */}
            {(app.appStore || app.playStore) && (
              <div className="shrink-0 border-t border-white/10 bg-[#0d1117]/95 backdrop-blur px-5 sm:px-8 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] flex flex-col sm:flex-row gap-3">
                {app.appStore && (
                  <a
                    href={app.appStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-h-12 flex justify-center items-center gap-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-blue-600/20 active:scale-[0.98]"
                  >
                    <FaApple size={18} aria-hidden />
                    Get it on the App Store
                    <ExternalLink size={14} className="opacity-70" aria-hidden />
                  </a>
                )}
                {app.playStore && (
                  <a
                    href={app.playStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-h-12 flex justify-center items-center gap-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-gray-100 font-semibold text-sm transition-colors active:scale-[0.98]"
                  >
                    <FaGooglePlay size={16} aria-hidden />
                    Get it on Google Play
                    <ExternalLink size={14} className="opacity-70" aria-hidden />
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AppDetailModal;
