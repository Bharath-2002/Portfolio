export type Chapter = {
  id: string;
  index: string;
  company: string;
  role: string;
  period: string;
  mode: string;
  title: string;
  aside: string;
  art: string;
  bullets: { lead: string; text: string }[];
  tags: string[];
};

/** Story order: chronological, so the plot builds. */
export const chapters: Chapter[] = [
  {
    id: "quantiphi",
    index: "01",
    company: "Quantiphi",
    role: "Backend Developer",
    period: "Feb 2024 – Dec 2025",
    mode: "Hybrid",
    title: "Where I learned that production is the only real test.",
    aside: "chapter one: learning what production means",
    art: "/art/ch-quantiphi.webp",
    bullets: [
      {
        lead: "GenAI automation",
        text: "Built tools for audit processes and minutes-of-meeting generation, cutting manual documentation effort and improving accuracy.",
      },
      {
        lead: "Talk to your data",
        text: "Developed LLM-driven SQL agents that turn natural language into SQL, so non-technical people get their own insights.",
      },
      {
        lead: "Fast, scalable APIs",
        text: "Designed scalable APIs and optimised codebases to improve performance and response times.",
      },
      {
        lead: "~30% less downtime",
        text: "Resolved critical production issues, and automated operational workflows with cron jobs, cutting manual effort by ~50%.",
      },
    ],
    tags: ["Python", "LLM agents", "Text-to-SQL", "APIs", "Cron"],
  },
  {
    id: "jnaara",
    index: "02",
    company: "Jnaara",
    role: "AI Engineer",
    period: "Jan 2026 – Jun 2026",
    mode: "On-site",
    title: "Teaching copilots to remember what you told them yesterday.",
    aside: "side quest: giving AI a memory",
    art: "/art/ch-jnaara.webp",
    bullets: [
      {
        lead: "Agent backbone",
        text: "Developed a scalable FastAPI backend for conversational AI, real-time streaming and durable orchestration of agent tasks with human-in-the-loop approval checkpoints.",
      },
      {
        lead: "Memory that sticks",
        text: "Architected context and memory systems on Qdrant and VoyageAI to give copilots persistent chat history.",
      },
      {
        lead: "Retrieval, done properly",
        text: "Implemented RAG pipelines with hybrid semantic and keyword retrieval, plus semantic code search over GitLab repositories with LLM-generated repository summaries.",
      },
      {
        lead: "Shipped on AWS",
        text: "Deployed backend, frontend and PostgreSQL as containers on ECS Fargate with logging, metrics and alarms in CloudWatch.",
      },
    ],
    tags: ["FastAPI", "Qdrant", "VoyageAI", "RAG", "ECS Fargate", "CloudWatch"],
  },
  {
    id: "bluestone",
    index: "03",
    company: "BlueStone",
    role: "AI Engineer",
    period: "Jul 2026 – Present",
    mode: "On-site",
    title: "Turning a product catalogue into on-brand posters. 500 at a time.",
    aside: "current level: multi-tenant, GPU-adjacent, mildly sparkly",
    art: "/art/ch-bluestone.webp",
    bullets: [
      {
        lead: "Poster factory",
        text: "Architected and built from scratch a multi-tenant AI image generation service (FastAPI, PostgreSQL) that turns catalogue products into on-brand marketing posters from brand templates, plus the e-catalog backend that orchestrates it.",
      },
      {
        lead: "A queue that survives crashes",
        text: "Designed a durable PostgreSQL job queue with leases, retries, crash recovery, idempotency keys and per-call cost metering, running bulk generation of up to 500 products per run.",
      },
      {
        lead: "Templates that understand themselves",
        text: "Built LLM-driven template analysis: product slot detection against a product-type taxonomy, SAM3 segmentation, and a typed decomposition into editable text, image and shape layers with font matching.",
      },
      {
        lead: "0.99 mAP50 ears",
        text: "Trained a YOLO11-pose keypoint model on 1,090 labelled worn-ear images (custom labelling tool) to find each ear's piercing and lobe-centre points; exported to ONNX and served with ONNX Runtime to size and place earrings.",
      },
      {
        lead: "Catalogue import",
        text: "Built an intelligent catalogue import that uses LLMs to read product feeds, extract attributes and sizes, map categories and pick the best reference photos; shipped on AWS (EC2, S3, CloudFront).",
      },
    ],
    tags: ["FastAPI", "PostgreSQL", "YOLO11", "ONNX", "SAM3", "AWS", "LLMs"],
  },
];
