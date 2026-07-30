/**
 * The site is served from the domain root (https://ananya-kaul.github.io), so
 * there is no path prefix to add and this helper is now a pass-through.
 *
 * It is kept rather than deleted so every existing `withBasePath("/images/...")`
 * call stays valid, and so the site could move back under a subpath later by
 * setting `basePath` in next.config.ts plus NEXT_PUBLIC_BASE_PATH — without
 * touching a single component.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const withBasePath = (path: string) => `${BASE_PATH}${path}`;
