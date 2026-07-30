import type { MetadataRoute } from "next";
import { BASE_PATH } from "./lib/basePath";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ananya Kaul — iOS & Flutter Developer",
    short_name: "Ananya Kaul",
    description:
      "Portfolio of Ananya Kaul — iOS and Flutter developer building AI-powered mobile apps shipped to the App Store and Google Play.",
    start_url: `${BASE_PATH}/`,
    scope: `${BASE_PATH}/`,
    display: "standalone",
    background_color: "#0d1117",
    theme_color: "#0d1117",
    icons: [
      {
        src: `${BASE_PATH}/icon-192.png`,
        type: "image/png",
        sizes: "192x192",
        purpose: "any",
      },
      {
        src: `${BASE_PATH}/icon-512.png`,
        type: "image/png",
        sizes: "512x512",
        purpose: "any",
      },
      {
        src: `${BASE_PATH}/icon.svg`,
        type: "image/svg+xml",
        sizes: "any",
      },
    ],
  };
}
