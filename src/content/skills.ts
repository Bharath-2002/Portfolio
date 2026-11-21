export type SkillGroup = { id: string; label: string; skills: string[] };

export const skillGroups: SkillGroup[] = [
  {
    id: "genai",
    label: "GenAI & LLMs",
    skills: [
      "OpenAI", "Gemini", "Claude", "GPT-Image", "Prompt Engineering",
      "RAG", "Agents", "LangChain", "LangGraph", "Copilots",
    ],
  },
  {
    id: "agents",
    label: "Agents & Orchestration",
    skills: [
      "Tool Calling", "Multi-Agent Workflows", "Human-in-the-Loop",
      "Durable Task Queues", "Streaming Responses", "Memory & Context",
    ],
  },
  {
    id: "backend",
    label: "Backend & Data",
    skills: [
      "Python", "FastAPI", "SQLAlchemy", "Django", "Flask",
      "PostgreSQL", "Job Queues", "Qdrant", "SQL",
    ],
  },
];
