"use client";
import React from "react";
import { Star } from "lucide-react";

/**
 * Read-only star rating. Whole stars for a single review, partial fill for an
 * average like 4.7 — the filled row is drawn on top of the empty one and
 * clipped to the right width.
 */
const Stars = ({
  value,
  size = 16,
  label,
}: {
  value: number;
  size?: number;
  /** Screen-reader text; falls back to "4.7 out of 5 stars" */
  label?: string;
}) => {
  const clamped = Math.max(0, Math.min(5, value));
  const percent = (clamped / 5) * 100;

  /* w-max and shrink-0 matter: inside the clipping span the row must keep its
     natural width and get cut off. Without them the SVGs shrink to fit and the
     partial star comes out squashed rather than half-drawn. */
  const row = (filled: boolean) => (
    <span className="flex gap-0.5 w-max" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          size={size}
          className={`shrink-0 ${
            filled ? "text-star fill-star" : "text-line-strong"
          }`}
        />
      ))}
    </span>
  );

  return (
    <span className="relative inline-flex shrink-0 align-middle">
      {row(false)}
      <span
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${percent}%` }}
      >
        {row(true)}
      </span>
      <span className="sr-only">{label ?? `${clamped} out of 5 stars`}</span>
    </span>
  );
};

export default Stars;
