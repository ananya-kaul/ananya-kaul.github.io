import type { Metadata, Viewport } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import ScrollToTop from "./components/ScrollToTop";
import BackToTop from "./components/BackToTop";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CursorTrail from "./components/CursorTrail";
import { PERSON, SITE_DESCRIPTION, SITE_URL } from "./lib/site";
import { apps } from "./lib/apps";
import { withBasePath } from "./lib/basePath";

const OG_IMAGE = {
  url: `${SITE_URL}/og-image.png`,
  width: 1200,
  height: 630,
  alt: "Ananya Kaul — iOS & Flutter Developer building AI-powered mobile apps",
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

const TITLE = "Ananya Kaul — iOS & Flutter Developer | Mobile App Portfolio";

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
      about: { "@id": `${SITE_URL}/#person` },
      primaryImageOfPage: `${SITE_URL}/images/hero/IMG_4620.JPG`,
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: PERSON.name,
      url: `${SITE_URL}/`,
      image: `${SITE_URL}/images/hero/IMG_4620.JPG`,
      email: `mailto:${PERSON.email}`,
      telephone: PERSON.phone,
      jobTitle: PERSON.jobTitle,
      description: SITE_DESCRIPTION,
      sameAs: [PERSON.linkedin, PERSON.instagram, PERSON.github],
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
        "iOS Development",
        "Swift",
        "SwiftUI",
        "UIKit",
        "Objective-C",
        "Flutter",
        "Dart",
        "Core ML",
        "Vision Framework",
        "Firebase",
        "Machine Learning",
        "Mobile App Architecture",
      ],
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
          "@type": "MobileApplication",
          name: app.title,
          description: app.tagline,
          applicationCategory: app.category,
          operatingSystem: app.platforms.join(", "),
          ...(app.appStore || app.playStore
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
  themeColor: "#0d1117",
  colorScheme: "dark",
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
    <html lang="en">
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
