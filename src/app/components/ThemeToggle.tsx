"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Sun, Moon } from "lucide-react";

export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "theme";

/**
 * The script that runs before the page is painted, so the correct theme is
 * already in place on the very first frame. Without it every visitor who
 * prefers light mode would see a flash of the dark site first.
 *
 * It has to be a string of plain ES5 rather than a normal function, because it
 * is injected into <head> and runs before any of the app's JavaScript exists.
 * Keep it tiny and make sure it can never throw — Safari in private mode
 * throws just for *reading* localStorage, and an error here would leave the
 * page unstyled.
 */
export const themeInitScript = `
(function () {
  try {
    var saved = localStorage.getItem("${THEME_STORAGE_KEY}");
    var prefersLight =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches;
    var theme = saved === "light" || saved === "dark"
      ? saved
      : (prefersLight ? "light" : "dark");
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();
`;

/** Reads what the script above already decided, rather than guessing again. */
const currentTheme = (): Theme =>
  document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";

const ThemeToggle = ({
  className = "",
  /** Desktop header bar is short; 44px there would make it taller. On touch
      targets (mobile menu) always leave this off — 44px is the minimum. */
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) => {
  /* Starts as "dark" and is corrected on mount. It has to: this component is
     also rendered during the static build, where there is no document to ask,
     and rendering different markup on the server than on the client would be a
     hydration error. `mounted` keeps the icon hidden for that one frame. */
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setTheme(currentTheme());
    setMounted(true);
  }, []);

  /* Follow the system if — and only if — the visitor has never chosen for
     themselves. Someone who picked light shouldn't be yanked back to dark
     because the sun went down on their laptop. */
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (event: MediaQueryListEvent) => {
      if (localStorage.getItem(THEME_STORAGE_KEY)) return;
      const next: Theme = event.matches ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      setTheme(next);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggle = useCallback(() => {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    const root = document.documentElement;

    /** The part that actually changes the theme. Everything else is dressing. */
    const apply = () => {
      root.setAttribute("data-theme", next);
      setTheme(next);

      /* Keep the browser chrome (Safari's toolbar, Android's status bar) in
         step with the page, or a dark bar sits above a light site. */
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", next === "light" ? "#f7f8fa" : "#0d1117");

      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        /* Private mode. The theme still changes, it just isn't remembered. */
      }
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* Firefox has no View Transitions yet, and anyone who asked for less
       motion shouldn't get a full-screen wipe. Both fall back to the crossfade
       in globals.css, which is calm but still not a hard snap. */
    const canAnimate =
      "startViewTransition" in document && !reduced && buttonRef.current;

    if (!canAnimate) {
      if (!reduced) {
        root.classList.add("theme-switching");
        window.setTimeout(() => root.classList.remove("theme-switching"), 320);
      }
      apply();
      return;
    }

    /* Open the new theme out from the middle of the button. The radius has to
       reach the furthest corner of the screen, or the wipe stops short and
       leaves a visible disc edge — hence the max() on both axes. */
    const box = buttonRef.current!.getBoundingClientRect();
    const x = box.left + box.width / 2;
    const y = box.top + box.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = (
      document as Document & {
        startViewTransition: (cb: () => void) => { ready: Promise<void> };
      }
    ).startViewTransition(apply);

    transition.ready
      .then(() => {
        root.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 520,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      })
      .catch(() => {
        /* A transition that never becomes ready has already applied the theme
           in its callback, so there is nothing to undo — only the wipe is lost. */
      });
  }, []);

  const goingTo = theme === "dark" ? "light" : "dark";

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${goingTo} mode`}
      title={`Switch to ${goingTo} mode`}
      className={`relative grid place-items-center shrink-0 rounded-xl border border-line bg-tint text-muted hover:text-ink hover:bg-tint-strong transition-colors ${
        compact ? "h-9 w-9" : "h-11 w-11"
      } ${className}`}
    >
      {/* Both icons are always mounted and cross-rotate, so the swap reads as
          one object turning over rather than two icons blinking. */}
      <Sun
        size={compact ? 16 : 18}
        aria-hidden
        className={`absolute transition-all duration-300 ${
          mounted && theme === "light"
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-50 opacity-0"
        }`}
      />
      <Moon
        size={compact ? 16 : 18}
        aria-hidden
        className={`absolute transition-all duration-300 ${
          mounted && theme === "dark"
            ? "rotate-0 scale-100 opacity-100"
            : "rotate-90 scale-50 opacity-0"
        }`}
      />
    </button>
  );
};

export default ThemeToggle;
