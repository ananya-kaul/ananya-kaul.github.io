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

  const row = (filled: boolean) => (
    <span className="flex gap-0.5" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          size={size}
          className={filled ? "text-amber-400 fill-amber-400" : "text-gray-700"}
        />
      ))}
    </span>
  );

  return (
    <span className="relative inline-flex shrink-0 align-middle">
      {row(false)}
      <span
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${percent}%` }}
      >
        {row(true)}
      </span>
      <span className="sr-only">
        {label ?? `${clamped} out of 5 stars`}
      </span>
    </span>
  );
};

export default Stars;
