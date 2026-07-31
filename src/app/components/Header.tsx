"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, FileText } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { withBasePath } from "../lib/basePath";

const navLinks = [
  { label: "Tech Stack", href: "#skills", id: "skills" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Reviews", href: "#recommendations", id: "recommendations" },
  { label: "Apps", href: "#projects", id: "projects" },
  { label: "Writing", href: "#writing", id: "writing" },
  { label: "Contact", href: "#contact", id: "contact" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  /** Condense the bar once the page has moved */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /** Highlight the section currently in view */
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      // Offset the top by the header height so the "current" section feels right
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /* Deliberately no scroll lock here — the sheet's own links are anchors, and
     locking body overflow swallows the jump to the target section. */

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full flex items-center justify-center fixed top-0 left-0 right-0 z-[60] px-3 sm:px-4"
    >
      <div
        className={`mx-auto w-full max-w-4xl text-gray-400 glass-effect rounded-2xl flex justify-between items-center shadow-xl shadow-black/20 transition-all duration-300 ${
          scrolled
            ? "mt-3 py-2.5 px-4 sm:px-6 md:px-8"
            : "mt-4 sm:mt-6 py-3.5 px-4 sm:px-6 md:px-10"
        }`}
      >
        {/* Wordmark */}
        <Link
          href="/"
          className="font-medium font-display text-gray-50 flex gap-2 justify-center items-center group shrink-0"
          aria-label="Ananya Kaul — home"
        >
          <span className="flex items-center gap-1.5 font-mono text-blue-400 font-bold group-hover:rotate-12 transition-transform duration-300">
            <span className="text-gray-500 font-light">{"{"}</span>
            <span className="text-blue-400 tracking-tighter">AK</span>
            <span className="text-gray-500 font-light">{"}"}</span>
          </span>
          {/* Hidden only at tablet width, where six nav links plus the Resume
              button would otherwise overflow the bar. The {AK} monogram and
              the aria-label still identify it. */}
          <span className="tracking-widest uppercase text-[11px] sm:text-sm ml-0.5 sm:ml-1 whitespace-nowrap md:hidden lg:inline">
            Ananya Kaul
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden md:flex gap-1 items-center">
          <ul className="flex gap-0.5 text-sm font-medium items-center">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={activeId === link.id ? "true" : undefined}
                  className={`block whitespace-nowrap px-2 lg:px-3 py-2 rounded-xl transition-colors duration-300 hover:text-gray-100 hover:bg-white/5 ${
                    activeId === link.id
                      ? "text-blue-400 bg-blue-500/10"
                      : "text-gray-400"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={withBasePath("/resume.pdf")}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1.5 lg:ml-2 flex items-center gap-1.5 whitespace-nowrap bg-blue-600 hover:bg-blue-500 text-white px-3.5 lg:px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95"
          >
            <FileText size={13} aria-hidden />
            Resume
          </a>
        </nav>

        {/* Mobile toggle — 44px tap target */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="md:hidden grid place-items-center h-11 w-11 -mr-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="md:hidden fixed inset-0 -z-10 bg-black/60 backdrop-blur-sm"
            />
            <motion.nav
              key="nav-sheet"
              id="mobile-nav"
              aria-label="Mobile"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="md:hidden absolute top-full left-3 right-3 mt-2 rounded-2xl glass-effect p-3 shadow-2xl shadow-black/50"
            >
              <ul className="flex flex-col">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center min-h-12 px-4 rounded-xl text-base font-medium transition-colors ${
                        activeId === link.id
                          ? "text-blue-400 bg-blue-500/10"
                          : "text-gray-300 hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={withBasePath("/resume.pdf")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 min-h-12 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-colors active:scale-[0.98]"
              >
                <FileText size={15} aria-hidden />
                Download Resume
              </a>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
