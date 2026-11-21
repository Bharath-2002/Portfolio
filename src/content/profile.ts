export const profile = {
  name: "Bharath S",
  firstName: "Bharath",
  role: "AI Engineer",
  location: "Bangalore, India",
  email: "bharathsethu18@gmail.com",
  github: "https://github.com/Bharath-2002",
  linkedin: "https://www.linkedin.com/in/bharath-s-b58875420",
  about:
    "I build production GenAI systems end to end: from LLM and vision pipelines to the backend services and job queues that run them at scale. I also draw. Mostly bad cats, sometimes good robots.",
  longAbout:
    "AI Engineer who builds production GenAI systems end to end. I've built a multi-tenant AI image generation platform from scratch: LLM-driven template understanding, multi-model image generation with automated quality checks, a custom-trained keypoint model, and an intelligent catalogue import. Experienced with RAG, agents and copilots using OpenAI, Gemini, Claude, FastAPI and LangGraph, deployed on AWS.",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/story/", label: "Story" },
  { href: "/work/", label: "Work" },
  { href: "/lab/", label: "Lab" },
  { href: "/sketchbook/", label: "Sketchbook" },
  { href: "/contact/", label: "Contact" },
] as const;

export const stats = [
  { value: 0.99, decimals: 2, label: "pose mAP50", note: "YOLO11-pose, custom ear keypoints" },
  { value: 1090, decimals: 0, label: "labelled ears", note: "with a labelling tool I built" },
  { value: 500, decimals: 0, label: "products per run", note: "durable bulk generation" },
  { value: 50, decimals: 0, suffix: "%", prefix: "~", label: "less manual toil", note: "cron-automated ops" },
] as const;

export const marquee = [
  "RAG", "Agents", "LangGraph", "FastAPI", "PostgreSQL", "Qdrant", "YOLO11", "ONNX",
  "SAM3", "AWS ECS", "Gemini", "Claude", "OpenAI", "Job queues", "Human-in-the-loop",
];
