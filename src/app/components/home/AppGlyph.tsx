"use client";

import React from "react";
import { Clapperboard, Bot, CreditCard, Smartphone } from "lucide-react";
import type { GlyphKey } from "../../lib/apps";

/** Fallback artwork for apps with no public store icon. */
export const GlyphArt = ({
  glyph,
  size = 44,
}: {
  glyph?: GlyphKey;
  size?: number;
}) => {
  const props = { size, strokeWidth: 1.5, "aria-hidden": true } as const;

  switch (glyph) {
    case "video":
      return <Clapperboard {...props} />;
    case "chat":
      return <Bot {...props} />;
    case "subscription":
      return <CreditCard {...props} />;
    default:
      return <Smartphone {...props} />;
  }
};
