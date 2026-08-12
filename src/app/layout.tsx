import type { Metadata, Viewport } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import ScrollToTop from "./components/ScrollToTop";
import BackToTop from "./components/BackToTop";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CursorTrail from "./components/CursorTrail";
import { themeInitScript } from "./components/ThemeToggle";
import { PERSON, SITE_DESCRIPTION, SITE_URL } from "./lib/site";
import { apps, hasLivePlayStore } from "./lib/apps";
import { articles } from "./lib/writing";
import { withBasePath } from "./lib/basePath";

const OG_IMAGE = {
  url: `${SITE_URL}/og-image.png`,
  width: 1200,
  height: 630,
  alt: "Ananya Kaul — AI/ML & Mobile Developer building AI-powered products",
};

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
});

const TITLE = "Ananya Kaul — AI/ML & Mobile Developer | Portfolio";

const MOBILE_PLATFORMS = ["iOS", "iPadOS", "Android"];

/**
 * The Person node, defined once. It carries an @id so the other nodes in the
 * graph can point at it, and it is nested inline under ProfilePage.mainEntity
 * rather than sitting beside it — that is the shape Google documents for the
 * Profile Page rich result, and it does not depend on the validator resolving
 * a sibling @id reference.
 */
const person = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: PERSON.name,
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/images/hero/IMG_4620.JPG`,
  email: `mailto:${PERSON.email}`,
  telephone: PERSON.phone,
  jobTitle: PERSON.jobTitle,
  description: SITE_DESCRIPTION,
  sameAs: [
    PERSON.linkedin,
    PERSON.medium,
    PERSON.github,
    PERSON.instagram,
    PERSON.orcid,
  ],
  // ORCID is a persistent researcher identifier, so it is worth stating as an
  // identifier as well as a sameAs link — that is the pairing Google and
  // scholarly indexers read it from.
  identifier: {
    "@type": "PropertyValue",
    propertyID: "ORCID",
    value: PERSON.orcid,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: PERSON.location.city,
    addressCountry: PERSON.location.country,
  },
  worksFor: {
    "@type": "Organization",
    name: PERSON.employer.name,
    url: PERSON.employer.url,
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: PERSON.university,
  },
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Large Language Models",
    "Retrieval-Augmented Generation",
    "LLM Evaluation",
    "AI Agents",
    "Prompt Engineering",
    "Core ML",
    "Vision Framework",
    "Python",
    "iOS Development",
    "Swift",
    "SwiftUI",
    "UIKit",
    "Flutter",
    "Dart",
    "Mobile App Architecture",
  ],
};

/**
 * One JSON-LD graph rather than a lone Person node: the page itself, the
 * person, and every shipped app, so search engines can connect them.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: `${PERSON.name} — Portfolio`,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: TITLE,
      description: SITE_DESCRIPTION,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      // mainEntity is the ONE required property of ProfilePage. Omitting it is
      // what produced "1 invalid item detected" in Search Console — `about`
      // alone does not satisfy it.
      mainEntity: person,
      primaryImageOfPage: `${SITE_URL}/images/hero/IMG_4620.JPG`,
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#articles`,
      name: "Articles written by Ananya Kaul",
      numberOfItems: articles.length,
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Article",
          headline: article.title,
          url: article.url,
          datePublished: article.date,
          description: article.blurb,
          keywords: article.tags.join(", "),
          author: { "@id": `${SITE_URL}/#person` },
          publisher: { "@type": "Organization", name: article.publication },
        },
      })),
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#apps`,
      name: "Apps built by Ananya Kaul",
      numberOfItems: apps.length,
      itemListElement: apps.map((app, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          // Desktop-only builds aren't mobile apps
          "@type": app.platforms.some((os) => MOBILE_PLATFORMS.includes(os))
            ? "MobileApplication"
            : "SoftwareApplication",
          name: app.title,
          // The full "About this app" copy, not the one-line card tagline: the
          // detail sheet only renders on tap, so this is the only place a
          // crawler ever sees the substantive text. Still user-visible on the
          // page, so it stays within Google's structured-data guidelines.
          description: app.about,
          abstract: app.tagline,
          featureList: app.highlights.join(" · "),
          applicationCategory: app.category,
          operatingSystem: app.platforms.join(", "),
          // Only point Google at a listing that actually resolves
          ...(app.appStore || hasLivePlayStore(app)
            ? { url: app.appStore ?? app.playStore }
            : {}),
          author: { "@id": `${SITE_URL}/#person` },
        },
      })),
    },
  ],
};

export const metadata: Metadata = {
  title: {
    default: TITLE,
    template: "%s | Ananya Kaul",
  },
  description: SITE_DESCRIPTION,
  applicationName: `${PERSON.name} Portfolio`,
  authors: [{ name: PERSON.name, url: PERSON.linkedin }],
  creator: PERSON.name,
  publisher: PERSON.name,
  category: "technology",
  keywords: [
    "Ananya Kaul",
    "AI ML Developer",
    "AI Engineer",
    "Machine Learning Developer",
    "RAG Systems",
    "LLM Evaluation",
    "Prompt Engineering",
    "iOS Developer",
    "Flutter Developer",
    "Mobile App Developer",
    "Swift Developer",
    "SwiftUI",
    "UIKit",
    "Dart",
    "AI/ML Developer",
    "Core ML",
    "App Store apps",
    "Mobile Developer India",
    "Mobile Developer Chandigarh",
    "iOS Developer Portfolio",
    "Freelance iOS Developer",
  ],
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  openGraph: {
    type: "profile",
    url: `${SITE_URL}/`,
    title: TITLE,
    description: SITE_DESCRIPTION,
    siteName: `${PERSON.name} — Portfolio`,
    locale: "en_US",
    firstName: "Ananya",
    lastName: "Kaul",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  icons: {
    icon: [
      { url: withBasePath("/icon.svg"), type: "image/svg+xml" },
      { url: withBasePath("/icon-192.png"), sizes: "192x192", type: "image/png" },
      { url: withBasePath("/icon-512.png"), sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: withBasePath("/apple-touch-icon.png"), sizes: "180x180" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: PERSON.name,
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  /* The starting value only. ThemeToggle rewrites this tag when the theme
     changes, so Safari's toolbar and Android's status bar follow the page. */
  themeColor: "#0d1117",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
  // Never block pinch-zoom — it's an accessibility requirement
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* suppressHydrationWarning: the inline script below sets data-theme on this
       element before React runs, so the server's markup and the browser's
       differ by that one attribute. That is the entire point of the script. */
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Must be in <head> and must not be deferred — it has to run before
            the first paint, or light-mode visitors get a flash of dark. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${montserrat.variable} ${openSans.variable} antialiased grid-background`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <a
          href="#projects"
          className="sr-only focus:not-sr-only focus:fixed focus:z-[70] focus:top-3 focus:left-3 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold"
        >
          Skip to apps
        </a>
        <CursorTrail />
        <ScrollToTop />
        <Header />
        <main>{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
