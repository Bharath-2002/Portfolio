export type Project = {
  id: string;
  title: string;
  kicker: string;
  blurb: string;
  stack: string[];
  href: string;
  year: string;
  kind: "AI" | "Backend" | "Frontend" | "Automation";
  hue: string; // card tint, all within the warm family
};

/** Pulled from github.com/Bharath-2002 (public repos). */
export const projects: Project[] = [
  {
    id: "softbox",
    title: "Softbox AI",
    kicker: "The catalog shoot, without the shoot",
    blurb:
      "Photograph a product a few times on a phone; Softbox generates every catalog image against scene templates, writes per-channel copy, runs automated quality checks and publishes. Multi-tenant with row-level security and a Postgres-backed queue.",
    stack: ["FastAPI", "PostgreSQL RLS", "SQLAlchemy 2", "Alembic", "Nano Banana"],
    href: "https://github.com/Bharath-2002/softbox-ai",
    year: "2026",
    kind: "AI",
    hue: "#ff5a2c",
  },
  {
    id: "ria",
    title: "Ria, the voice jeweller",
    kicker: "A phone-call AI consultant",
    blurb:
      "A voice assistant that runs a natural discovery chat, searches the catalogue live, sends product cards on WhatsApp mid-call and remembers the customer on their next call. Every call is scored by an LLM-judge eval dashboard.",
    stack: ["ElevenLabs Agents", "Twilio", "FastAPI", "Gemini judge", "Streamlit"],
    href: "https://github.com/Bharath-2002/ria-voice-ai-assistant",
    year: "2026",
    kind: "AI",
    hue: "#ff8a3d",
  },
  {
    id: "stampit",
    title: "Stampit",
    kicker: "Turn a photo into a collectible stamp",
    blurb:
      "Async FastAPI backend with strict downward-only layering (entities → services → features → api) on Supabase Postgres, with a TypeScript frontend and a free-tier deployment plan.",
    stack: ["FastAPI", "Supabase", "Async SQLAlchemy", "TypeScript"],
    href: "https://github.com/Bharath-2002/stampit",
    year: "2026",
    kind: "Backend",
    hue: "#ffb347",
  },
  {
    id: "agentic-jewelry",
    title: "Agentic Jewelry Intelligence",
    kicker: "Seven agents, one scraping pipeline",
    blurb:
      "Crawler, extractor, normalizer, vision-inference, summarizer, storage and orchestrator agents that scrape jewelry sites, infer gemstone and metal from images, and expose it all through an API.",
    stack: ["Playwright", "OpenAI Vision", "Celery", "Redis", "PostgreSQL"],
    href: "https://github.com/Bharath-2002/Agentic-Jewelry-Intelligence-Framework",
    year: "2025",
    kind: "AI",
    hue: "#ff6b4a",
  },
  {
    id: "linkedin",
    title: "LinkedIn automation",
    kicker: "Outreach on autopilot",
    blurb: "A backend and a frontend for automating LinkedIn outreach workflows.",
    stack: ["Python", "Frontend", "Backend"],
    href: "https://github.com/Bharath-2002/linkedin_automation_frontend",
    year: "2025",
    kind: "Automation",
    hue: "#ff9a62",
  },
  {
    id: "gmail",
    title: "Gmail rules engine",
    kicker: "Inbox, but it behaves",
    blurb:
      "OAuth-authenticated Gmail client that stores mail in SQLite and applies JSON-defined rules to label, move and mark messages automatically.",
    stack: ["Python", "Gmail API", "SQLite", "OAuth 2.0"],
    href: "https://github.com/Bharath-2002/Gmail-task-automation-script",
    year: "2025",
    kind: "Automation",
    hue: "#ffc078",
  },
  {
    id: "counterfeit",
    title: "Counterfeit detection",
    kicker: "Fake products vs. the blockchain",
    blurb: "Counterfeit product detection using blockchain: an early look at provenance and trust.",
    stack: ["Blockchain"],
    href: "https://github.com/Bharath-2002/counterfeit_product_detection",
    year: "2024",
    kind: "Backend",
    hue: "#ff7a50",
  },
];
