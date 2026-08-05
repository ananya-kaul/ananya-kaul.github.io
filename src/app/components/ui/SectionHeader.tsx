"use client";
import React from "react";

const SectionHeader = ({
  title,
  subtitle,
  description,
  className,
  id,
}: {
  className?: string;
  title: string;
  subtitle?: string;
  description?: string;
  /** Set when the parent section uses aria-labelledby */
  id?: string;
}) => {
  const styles = `text-center flex flex-col justify-center items-center ${className ?? ""}`;

  return (
    <div className={styles}>
      {subtitle && (
        <span className="text-[11px] sm:text-sm uppercase tracking-[0.2em] text-muted underline decoration-1 decoration-red-500 underline-offset-4">
          {subtitle}
        </span>
      )}
      <h2
        id={id}
        className="mt-2 font-display tracking-wide text-2xl sm:text-3xl md:text-4xl font-medium text-ink"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-2 text-sm sm:text-base text-faint max-w-xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
