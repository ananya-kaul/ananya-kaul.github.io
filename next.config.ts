import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // → ensures pure static HTML/CSS/JS
  images: { unoptimized: true }, // prevents image optimization issues on GitHub Pages
  // No basePath: this is a GitHub Pages *user* site (repo ananya-kaul.github.io),
  // so it is served from the domain root rather than a /repo-name subpath.
};

export default nextConfig;
