/**
 * Articles published on Medium and its partner publications.
 *
 * Baked in rather than fetched at runtime: the site is a static export on
 * GitHub Pages, and Medium's feed blocks browser requests (CORS) anyway.
 * To refresh, re-read https://medium.com/feed/@ananyakaul and add new entries
 * at the top — newest first.
 */

export type Article = {
  title: string;
  url: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  /** Where it ran — "Towards AI", "Stackademic", or "Medium" for self-published */
  publication: string;
  blurb: string;
  tags: string[];
};

export const MEDIUM_PROFILE = "https://medium.com/@ananyakaul";

export const articles: Article[] = [
  {
    title:
      "The $206K Skill Gap: Why Most “AI Engineers” Still Can’t Get Hired in 2026",
    url: "https://medium.com/the-programmer/the-206k-skill-gap-why-most-ai-engineers-still-cant-get-hired-in-2026-cbb6920f5c15",
    date: "2026-08-06",
    publication: "Medium",
    blurb:
      "Salaries are up 33% year over year. Postings are up 61%. And hiring managers are rejecting nine out of ten applicants anyway. Open any hiring dashboard right now and you’ll see the same contradiction.",
    tags: ["Skills", "Hiring", "Ai Skills", "Software Development"],
  },
  {
    title:
      "Stop Building Toy Chatbots: The 5 AI Engineering Projects That Will Get You Hired",
    url: "https://pub.towardsai.net/stop-building-toy-chatbots-the-5-ai-engineering-projects-that-will-get-you-hired-d569eebe89fd",
    date: "2026-07-26",
    publication: "Towards AI",
    blurb:
      "Hiring managers in 2026 don’t care about your basic OpenAI wrapper. Here are 5 production-grade architectures that prove you actually know how to build real AI systems.",
    tags: ["AI Projects", "AI", "Learning", "Careers"],
  },
  {
    title:
      "AI Agents in 2026: The 5 Workflows That Are Already Replacing Hours of Human Work",
    url: "https://blog.stackademic.com/ai-agents-in-2026-the-5-workflows-that-are-already-replacing-hours-of-human-work-and-how-to-build-40178de395e3",
    date: "2026-06-04",
    publication: "Stackademic",
    blurb:
      "Forget chatbots. The real AI revolution isn’t answering questions — it’s autonomously completing multi-step jobs. Here’s what works in production today.",
    tags: ["Artificial Intelligence", "Automation", "AI Agents", "Future of Work"],
  },
  {
    title:
      "Prompt Engineering in 2026: The 7 Patterns That Actually Work in Production",
    url: "https://blog.stackademic.com/prompt-engineering-in-2026-the-7-patterns-that-actually-work-in-production-not-the-hype-you-see-73e4bb5ee8ba",
    date: "2026-06-03",
    publication: "Stackademic",
    blurb:
      "Most prompt engineering advice is useless for real products. Here are the patterns that reduce hallucinations, improve consistency, and scale across teams.",
    tags: ["Artificial Intelligence", "LLMs", "Prompt Engineering", "Software Development"],
  },
  {
    title: "7 LLM Evaluation Mistakes That Kill AI Products",
    url: "https://medium.com/@ananyakaul/7-llm-evaluation-mistakes-that-kill-ai-products-3a6d09fa6fa5",
    date: "2026-06-03",
    publication: "Medium",
    blurb:
      "Why your AI works in demos but fails with real users — and the 9-part checklist top teams run before shipping.",
    tags: ["Machine Learning", "LLMs", "AI", "Data Science"],
  },
  {
    title: "The 30-Day Roadmap to Building a Production RAG System (That Doesn’t Hallucinate)",
    url: "https://pub.towardsai.net/the-30-day-roadmap-to-building-a-production-rag-system-that-doesnt-hallucinate-4754aabd8b48",
    date: "2026-05-31",
    publication: "Towards AI",
    blurb:
      "RAG is the most practical AI pattern for most businesses. Most implementations are broken in ways teams don’t discover until users find them.",
    tags: ["Artificial Intelligence", "Software Engineering", "LLMs", "Machine Learning"],
  },
  {
    title: "Why Your Database Will Betray You at the Worst Possible Moment",
    url: "https://pub.towardsai.net/why-your-database-will-betray-you-at-the-worst-possible-moment-a2598745dede",
    date: "2026-05-29",
    publication: "Towards AI",
    blurb:
      "It won’t be a hacker. It won’t be a bug. It’ll be something you wrote six months ago and completely forgot about.",
    tags: ["Backend", "Software Engineering", "Technology", "Databases"],
  },
  {
    title: "The 2 AM Production Failure That Changed How I Write Code Forever",
    url: "https://medium.com/@ananyakaul/the-2-am-production-failure-that-changed-how-i-write-code-forever-4a5df0be9e4a",
    date: "2026-05-29",
    publication: "Medium",
    blurb:
      "Four hours, a deeply nested function, and a lesson about cleverness that I won’t forget.",
    tags: ["Careers", "Technology", "Programming", "Software Engineering"],
  },
  {
    title: "Why 40% of AI Agent Projects Fail Before They Ever Reach Production",
    url: "https://pub.towardsai.net/why-40-of-ai-agent-projects-fail-before-they-ever-reach-production-10b831e115d1",
    date: "2026-05-27",
    publication: "Towards AI",
    blurb:
      "It’s not the models. It’s not the prompts. It’s what you point the AI at.",
    tags: ["Software Engineering", "Automation", "Artificial Intelligence", "Machine Learning"],
  },
  {
    title: "We Deleted 12 Microservices and Rebuilt a “Boring” Monolith — Here’s Why We’re Not Sorry",
    url: "https://medium.com/@ananyakaul/we-deleted-12-microservices-and-rebuilt-a-boring-monolith-heres-why-we-re-not-sorry-bafcacae8783",
    date: "2026-05-27",
    publication: "Medium",
    blurb:
      "The microservices dream looked great on a slide deck. It was a living nightmare in production.",
    tags: ["Software Engineering", "Technology", "Backend", "Architecture"],
  },
  {
    title: "I Learned Python in 30 Days as a Complete Beginner — This Is the Exact Roadmap I Followed",
    url: "https://blog.stackademic.com/i-learned-python-in-30-days-as-a-complete-beginner-this-is-the-exact-roadmap-i-followed-b0f859329575",
    date: "2026-05-27",
    publication: "Stackademic",
    blurb:
      "A month before I wrote my first working Python script, I genuinely believed that programming was a talent — something you either had or didn’t.",
    tags: ["Growth", "Learning", "Python", "Programming"],
  },
];
