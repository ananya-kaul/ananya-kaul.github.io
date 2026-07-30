import { withBasePath } from "./basePath";

export type GlyphKey = "video" | "chat" | "subscription";

export type AppProject = {
  /** Stable id — used for React keys and the deep-link hash (#app-<slug>) */
  slug: string;
  title: string;
  /** One-line hook shown on the card */
  tagline: string;
  /** Longer "About this app" copy shown in the detail sheet */
  about: string;
  /** What was actually built / shipped, as bullets in the detail sheet */
  highlights: string[];
  /** App Store style category */
  category: string;
  platforms: string[];
  /** App icon from the store; null for unreleased / client-internal apps */
  icon: string | null;
  /** Fallback artwork key when there is no store icon */
  glyph?: GlyphKey;
  gradient?: string;
  tags: string[];
  appStore: string | null;
  playStore: string | null;
};

export const apps: AppProject[] = [
  {
    slug: "cal-care",
    title: "Cal Care - AI Calorie Tracker",
    tagline: "Snap a photo of any meal and get instant calories and macros.",
    about:
      "An AI-powered nutrition tracker for iOS. Point the camera at a plate and an on-device vision pipeline plus an LLM food-recognition model identifies what's on it, estimates portion size, and logs calories, protein, carbs and fat automatically — no manual food-database searching. Around that sits a full tracking experience: daily macro rings, weight logging, streaks, personalised targets for weight loss or muscle gain, and progress analytics over time.",
    highlights: [
      "AI food scanner: photo → food identification → calorie & macro estimate",
      "Automatic meal logging with editable portions and a searchable history",
      "Personalised daily calorie / macro targets driven by the user's goal",
      "Weight tracking with trend charts and progress analytics",
      "Built for iOS 18+ with SwiftUI, HealthKit-friendly data modelling and StoreKit subscriptions",
    ],
    category: "Health & Fitness",
    platforms: ["iOS", "iPadOS"],
    icon: withBasePath("/images/apps/cal-care.jpg"),
    tags: ["SwiftUI", "AI Food Scanner", "Vision", "Nutrition AI", "StoreKit"],
    appStore:
      "https://apps.apple.com/us/app/cal-care-ai-calorie-tracker/id6766514242",
    playStore: null,
  },
  {
    slug: "second-line",
    title: "Second Line: 2nd Phone Number",
    tagline: "A full second phone line on your iPhone — calls, texts, voicemail.",
    about:
      "Native iOS app that lets people buy and run an additional phone number on their existing device, used by 6,000+ active users. Real VoIP calling and SMS on top of the Telnyx API, with CallKit so incoming calls look and behave like native ones, PushKit for wake-on-call reliability, and Core Data for offline call logs and message threads.",
    highlights: [
      "VoIP calling and messaging built on Telnyx + WebRTC",
      "CallKit and PushKit integration so calls ring like native iOS calls",
      "Number purchasing, credits, call logs and threaded messaging",
      "Core Data offline cache for conversations and history",
      "Led the UI overhaul of the core calling screen — +40% DAUs, +25% average call duration",
    ],
    category: "Utilities",
    platforms: ["iOS"],
    icon: withBasePath("/images/apps/second-line.jpg"),
    tags: ["Swift", "UIKit", "Telnyx API", "Core Data", "WebRTC", "CallKit"],
    appStore:
      "https://apps.apple.com/us/app/second-line-2nd-phone-number/id1645238377",
    playStore: null,
  },
  {
    slug: "invitation-maker",
    title: "Invitation Maker & RSVP",
    tagline: "Design invitations and stories, then collect digital RSVPs.",
    about:
      "Invitation and story creation app for iOS (shipped as Ripl / Adgram) with a genuinely deep media editor. Users compose from custom templates, layer text and images, apply Metal-backed filters, and send the result out with a digital RSVP flow that tracks responses.",
    highlights: [
      "Custom CALayer-based canvas with resizable views and snap-line alignment",
      "Metal shader filters and Core ML powered image enhancement",
      "Template engine with Core Data persistence for drafts",
      "Digital RSVP flow with response tracking and sharing",
      "Screenshot prevention for paid template content",
    ],
    category: "Photo & Video",
    platforms: ["iOS"],
    icon: withBasePath("/images/apps/ripl-invitation-maker.jpg"),
    tags: ["iOS", "Core ML", "Metal", "Custom Templates", "Digital RSVP"],
    appStore:
      "https://apps.apple.com/us/app/invitation-maker-digital-rsvp/id1465210016",
    playStore: null,
  },
  {
    slug: "pdf-scanner",
    title: "PDF Scanner ~ Scan Document",
    tagline: "Turn the camera into a scanner, then annotate, sign and share.",
    about:
      "Advanced document manager written in Swift 5 and published under Protools LLP. VisionKit-based edge detection and scanning, OCR text extraction, annotation and signature tooling, plus QR and barcode scanning and generation — all wrapped in a file manager with extensions that reach into the rest of iOS.",
    highlights: [
      "VisionKit document scanning with automatic edge detection and perspective correction",
      "Annotations, signatures and text extraction (OCR)",
      "QR / barcode scanning and creation",
      "Share and Widget extensions plus deep linking",
      "In-app purchases and subscription entitlement handling",
    ],
    category: "Productivity",
    platforms: ["iOS", "iPadOS"],
    icon: withBasePath("/images/apps/pdf-scanner.jpg"),
    tags: ["Swift 5", "VisionKit", "QR & Barcode", "Annotations", "Widgets"],
    appStore:
      "https://apps.apple.com/us/app/pdf-scanner-scan-document/id1469182761",
    playStore: null,
  },
  {
    slug: "math-ai",
    title: "Math AI - Homework Helper",
    tagline: "Solve maths problems, write essays and summarise PDFs with AI.",
    about:
      "Cross-platform Flutter study assistant for iOS and Android. Students photograph a problem and get a step-by-step solution, chat with an AI tutor by text or voice, generate essays, and drop in a PDF to get it summarised. Built end to end with GetX for state, Realm for offline storage, and several AI providers behind one abstraction layer.",
    highlights: [
      "Step-by-step maths solving from a photo or typed expression",
      "AI tutor chat with voice interaction",
      "Essay writing and PDF summarisation modules",
      "GetX state management with a modular, testable feature structure",
      "Realm database for offline history plus in-app purchase monetisation",
    ],
    category: "Education",
    platforms: ["iOS", "Android"],
    icon: withBasePath("/images/apps/math-ai.jpg"),
    tags: ["Flutter", "Dart", "GetX", "Realm", "AI APIs", "PDF Summaries"],
    appStore: "https://apps.apple.com/us/app/apple-store/id6748338780",
    playStore:
      "https://play.google.com/store/apps/details?id=com.Mathai.homework.helper",
  },
  {
    slug: "word-editor",
    title: "Word Editor: Docs, Office & PDF",
    tagline: "Open, edit and export Word documents natively on iOS.",
    about:
      "iOS Word document editor built on a hybrid architecture — native Swift shell around a TypeScript web editor — so rich text fidelity survives round-tripping between .docx and the app. I built the Components, Editor, Navigation and Services modules.",
    highlights: [
      "Hybrid native Swift + TypeScript editor bridge",
      "Document import / export with formatting fidelity",
      "Rich text editing: styles, tables, lists, images",
      "File management, recents and cloud provider access",
      "Modular architecture across Components, Editor, Navigation and Services",
    ],
    category: "Productivity",
    platforms: ["iOS", "iPadOS"],
    icon: withBasePath("/images/apps/word-editor.jpg"),
    tags: ["Swift", "TypeScript", "Hybrid Architecture", "Rich Text"],
    appStore:
      "https://apps.apple.com/us/app/word-editor-docs-office-pdf/id6760694732",
    playStore: null,
  },
  {
    slug: "text-up",
    title: "TEXT UP - 2nd Phone Number",
    tagline: "The second-number product rebuilt in Flutter for every platform.",
    about:
      "Cross-platform rewrite of SecondLine in Flutter, targeting Android, iOS, macOS, Windows, Linux and Web from one codebase. I architected the clean modular layers — domain, data, presentation — and integrated the APIs behind number purchasing, credits, call logs and messaging.",
    highlights: [
      "One Flutter codebase shipping to six platforms",
      "Clean architecture with clearly separated domain / data / presentation layers",
      "Number purchase, credit and billing API integration",
      "VoIP calling and messaging parity with the native app",
      "Shared design system across mobile, desktop and web form factors",
    ],
    category: "Utilities",
    platforms: ["iOS", "Android", "macOS", "Windows", "Web"],
    icon: withBasePath("/images/apps/text-up.jpg"),
    tags: ["Flutter", "Dart", "Cross-Platform", "VoIP", "Clean Architecture"],
    appStore: "https://apps.apple.com/us/app/apple-store/id6755144921",
    playStore:
      "https://play.google.com/store/apps/details?id=com.second.phonenumber.secondline",
  },
  {
    slug: "pdf-editor",
    title: "PDF Editor: Fill, Edit, e-Sign",
    tagline: "A complete PDF suite — convert, fill, sign, and chat with your docs.",
    about:
      "Comprehensive iOS PDF toolkit built on PDFKit. Two-way conversion between PDF and Word, Excel, PowerPoint, PNG, JPG and SVG; form filling and e-signatures; and an AI chat layer that answers questions about the open document with the conversation persisted in Core Data.",
    highlights: [
      "Two-way conversions: Word, Excel, PowerPoint, PNG, JPG, SVG",
      "Form filling, annotation and e-signature flows",
      "AI-powered PDF chat with Core Data conversation history",
      "File Provider, Share and Action extensions for system-wide access",
      "Firebase Analytics and Crashlytics for release monitoring",
    ],
    category: "Productivity",
    platforms: ["iOS", "iPadOS"],
    icon: withBasePath("/images/apps/pdf-editor.jpg"),
    tags: ["Swift", "PDFKit", "Action Extensions", "Core Data", "AI Chat"],
    appStore:
      "https://apps.apple.com/us/app/pdf-editor-fill-edit-e-sign/id1591585643",
    playStore: null,
  },
  {
    slug: "pdf-filler-mac",
    title: "PDF Filler for Mac",
    tagline: "The same PDF suite, native on macOS — fill, edit, sign, OCR.",
    about:
      "The macOS build of PDF Editor, shipped as a universal purchase so one licence covers iPhone, iPad and Mac. Everything moves to a desktop canvas: fill PDF forms, edit and annotate pages, drop in signatures and watermarks, reorder / rotate / split pages, scan multi-page documents, run OCR, and export or share straight to email and cloud storage. Requires macOS 14 or later.",
    highlights: [
      "Native macOS build of the PDF Editor codebase, distributed as a universal purchase",
      "Form filling and e-signature flows reworked for pointer-and-keyboard input",
      "Page management: reorder, rotate, split, merge and print",
      "Annotation, watermarks and OCR text recognition",
      "Document scanning plus export and sharing to email and cloud providers",
    ],
    category: "Business",
    platforms: ["macOS"],
    // Same store listing and artwork as the iOS build — reuse the icon file
    icon: withBasePath("/images/apps/pdf-editor.jpg"),
    tags: ["macOS", "PDFKit", "Universal Purchase", "e-Sign", "OCR"],
    appStore:
      "https://apps.apple.com/us/app/pdf-editor-fill-edit-e-sign/id1591585643?platform=mac",
    playStore: null,
  },
  {
    slug: "photo-translator",
    title: "AI Photo Translator & Scanner",
    tagline: "Point the camera at any text and read it in your language.",
    about:
      "iOS app for real-time photo translation and text extraction. The Vision framework locates and reads text in the camera feed, the Google Translation API renders it in the target language, and an AI tutor layer lets users ask follow-up questions about what they just translated. Also handles word-to-text and PDF-to-text extraction.",
    highlights: [
      "Real-time camera translation using the Vision framework",
      "Google Translation API integration across many language pairs",
      "PDF and image text extraction pipelines",
      "New Realm data model for saved translations",
      "AI tutor prompts and chat for an interactive learning loop",
    ],
    category: "Utilities",
    platforms: ["iOS"],
    icon: withBasePath("/images/apps/photo-translator.jpg"),
    tags: ["Swift", "UIKit", "Vision", "Google Translation API", "Realm"],
    appStore:
      "https://apps.apple.com/us/app/ai-photo-translator-scanner/id1583769542",
    playStore: null,
  },
  {
    slug: "meme-me",
    title: "Meme Me: AI Selfie Maker",
    tagline: "Turn a selfie into a meme with generative AI.",
    about:
      "Selfie-to-meme generator for iOS. I built the camera and API modules that capture a face, ship it to the generation backend, and return styled meme output — plus the generation limits, watermarking and local notification loops that keep free users engaged and paid users converting.",
    highlights: [
      "Camera capture module and generation API layer",
      "Generation limits, credit gating and watermarking for free tier",
      "Local notifications to bring users back to finished generations",
      "Diagnosed and fixed production Firebase crashes",
      "Shipped to the App Store and gained significant early traction",
    ],
    category: "Photo & Video",
    platforms: ["iOS"],
    icon: withBasePath("/images/apps/meme-me.jpg"),
    tags: ["iOS", "Camera", "AI Meme Generation", "Firebase", "Notifications"],
    appStore:
      "https://apps.apple.com/us/app/meme-me-ai-selfie-maker/id6751577271",
    playStore: null,
  },
  {
    slug: "memes-maker",
    title: "Memes Photo Maker Video Editor",
    tagline: "Meme photo and video editing with a built-in referral loop.",
    about:
      "Meme photo and video creation app for iOS. I built new in-app screens and a referral code system, and reworked the app's navigation flow and stability — which translated into materially higher engagement on the App Store.",
    highlights: [
      "New in-app screens and editing flows",
      "Referral code system with reward tracking",
      "Video editing pipeline improvements",
      "Navigation and UX flow rework that lifted engagement",
      "Crash and stability fixes across the release",
    ],
    category: "Photo & Video",
    platforms: ["iOS"],
    icon: withBasePath("/images/apps/memes.jpg"),
    tags: ["iOS", "Referral System", "Video Editing", "UX Flow"],
    appStore:
      "https://apps.apple.com/us/app/memes-photo-maker-video-editor/id1513382617",
    playStore: null,
  },
  {
    slug: "ai-cleaner",
    title: "AI Cleaner: Duplicate Photos",
    tagline: "Find duplicate photos and reclaim storage in a couple of taps.",
    about:
      "iOS phone-cleaning app (shipped as CleanMyPhone) written in SwiftUI. Scans the photo library for duplicates, near-duplicates, screenshots and large videos, then walks the user through bulk cleanup. Built as a set of reusable SwiftUI views and modular feature screens, with Google OAuth sign-in and Firebase behind auth and analytics.",
    highlights: [
      "SwiftUI design system of reusable views and modular feature screens",
      "Duplicate and near-duplicate photo detection with bulk review",
      "Google OAuth sign-in plus Firebase auth and analytics",
      "Smart cleaning suggestions ranked by reclaimable storage",
      "Clean, intuitive review UI that avoids accidental deletion",
    ],
    category: "Utilities",
    platforms: ["iOS"],
    icon: withBasePath("/images/apps/photo-cleaner.jpg"),
    tags: ["SwiftUI", "Google OAuth", "Firebase", "Smart Cleaning"],
    appStore:
      "https://apps.apple.com/us/app/duplicate-photos-cleaning-app/id6748720062",
    playStore: null,
  },
  {
    slug: "ai-video-editor",
    title: "AI Video Editor",
    tagline: "Generate and edit video with state-of-the-art AI models.",
    about:
      "AI-powered video editing and generation app. I shipped feature updates and the credit-check system that gates generation for live users, and ran the R&D comparing AI video generation models — including SeeDance Pro and Kling 1.6 Standard — on cost, latency and output quality before integration.",
    highlights: [
      "Credit check and quota system for live generation users",
      "R&D and benchmarking across SeeDance Pro and Kling 1.6 Standard",
      "Feature updates shipped to production",
      "Prompt and parameter tuning for consistent output quality",
    ],
    category: "Photo & Video",
    platforms: ["iOS"],
    icon: null,
    glyph: "video",
    gradient: "from-fuchsia-600/50 via-purple-700/40 to-blue-700/50",
    tags: ["AI Video Generation", "SeeDance Pro", "Kling 1.6", "Credit System"],
    appStore: null,
    playStore: null,
  },
  {
    slug: "jeeves",
    title: "Jeeves - AI Chat App",
    tagline: "An AI chat assistant, tuned for better answers.",
    about:
      "AI chat assistant app. My work focused on response quality and reliability: tracking down why answers were degrading, integrating newer models to widen what the assistant could do, and cutting response latency.",
    highlights: [
      "Diagnosed and fixed AI response quality issues",
      "Integrated newer LLMs to expand capability",
      "Improved response accuracy and latency",
      "Hardened streaming and error handling in the chat layer",
    ],
    category: "Productivity",
    platforms: ["iOS"],
    icon: null,
    glyph: "chat",
    gradient: "from-emerald-600/50 via-teal-700/40 to-cyan-700/50",
    tags: ["AI Chat", "LLM Integration", "Model Upgrades", "Performance"],
    appStore: null,
    playStore: null,
  },
  {
    slug: "cancel-subscription",
    title: "Cancel Subscription Management",
    tagline: "See every subscription you're paying for, and cancel it.",
    about:
      "Dedicated iOS app for surfacing and cancelling a user's active subscriptions. Structured into App, Core, Features, Resources and Shared modules with unit test coverage, and designed so the cancellation path is short and unambiguous rather than deliberately obstructive.",
    highlights: [
      "Modular architecture: App, Core, Features, Resources, Shared",
      "Subscription discovery and management flows",
      "Deliberately frictionless cancellation UX",
      "Unit test coverage across core logic",
    ],
    category: "Finance",
    platforms: ["iOS"],
    icon: null,
    glyph: "subscription",
    gradient: "from-orange-600/50 via-rose-700/40 to-red-700/50",
    tags: ["iOS", "Swift", "Modular Architecture", "Unit Testing"],
    appStore: null,
    playStore: null,
  },
];

/** Apps that are publicly downloadable — used for counts and structured data. */
export const liveApps = apps.filter((a) => a.appStore || a.playStore);
