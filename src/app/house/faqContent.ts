import { getProjectAwards } from "../projectAwards";
import { judgeExperiences } from "../judge/experiences";
import { researchArticles } from "../siteContent";
import { awardedProjects } from "./houseContent";

export interface GuideSource {
  title: string;
  href: string;
}
export interface PresetQuestion {
  id: string;
  question: string;
  answer: string;
  sources: GuideSource[];
}

// These are ordinary, prewritten website content. Selecting a question only
// reads this array in the browser: no requests, API keys, models, or tokens.
export const presetQuestions: PresetQuestion[] = [
  {
    id: "intro",
    question: "Tell me about Luxin",
    answer:
      "Hi! Luxin is a Software / AI Engineer and researcher who builds AI applications end to end. Her work spans agentic workflows, multi-agent systems, LLMs, RAG, knowledge graphs, MCP, and reliable evaluation.\n\nShe earned a Master of Engineering in Electrical and Computer Engineering from Duke University and a Bachelor of Science in Applied Mathematics and Statistics from Stony Brook University. She’s interested in AI that is both powerful and trustworthy.",
    sources: [{ title: "Read her bio", href: "/bio" }],
  },
  {
    id: "research",
    question: "What does Luxin research?",
    answer: `Luxin studies lifelong agent memory, agent-facing interfaces, and reliable AI systems. Her accepted papers include:\n\n${researchArticles
      .filter((paper) => paper.status === "Accepted")
      .map((paper) => `${paper.title}\n${paper.topic}`)
      .join(
        "\n\n",
      )}\n\nExplore the dedicated Research Gallery in the west wing, or read the full abstracts on her researcher profile.`,
    sources: [{ title: "Researcher profile", href: "/research" }],
  },
  {
    id: "projects",
    question: "What has she built?",
    answer:
      "A few projects to start with:\n\n• Warden — a runtime security firewall for agentic AI.\n• NEURORA — mandala-based digital phenotyping for neurological health.\n• Hypothesis Atlas — evidence mapping for scientific research.\n\nThe computer terminal in the Project Gallery opens the full collection, including descriptions, technologies, and project links.",
    sources: [
      { title: "All projects", href: "/projects" },
      { title: "Open source", href: "/open-source" },
    ],
  },
  {
    id: "awards",
    question: "Show me her awards",
    answer: `Luxin reports 7 AI hackathon wins in the past year. The portfolio records these distinctions:\n\n${awardedProjects.map((project) => `${project.name.split(" - ")[0]}\n${getProjectAwards(project).join("\n")}`).join("\n\n")}\n\nThe awards gallery shows the recorded awards and recognitions, including track prizes and honorable mentions.`,
    sources: [{ title: "Award-winning projects", href: "/projects" }],
  },
  {
    id: "judging",
    question: "What has she judged?",
    answer: `Her academic service and judging experience include:\n\n${judgeExperiences.map((item) => `${item.title} — ${item.description}`).join("\n\n")}\n\nThe brass balance scale in the Grand Hall opens the full collection.`,
    sources: [{ title: "Judging & reviewing", href: "/judge" }],
  },
  {
    id: "contact",
    question: "How can I connect?",
    answer:
      "Luxin is looking to connect with fellow builders, accelerator teams, and investors who want to turn emerging AI capabilities into products with global impact.\n\nSend a little hello to philomela.zhang@gmail.com, or connect on LinkedIn. This virtual guide displays preset answers; it doesn’t send messages to Luxin.",
    sources: [
      { title: "Email Luxin", href: "mailto:philomela.zhang@gmail.com" },
      {
        title: "LinkedIn",
        href: "https://www.linkedin.com/in/luxin-zhang-96777b192/",
      },
    ],
  },
];

export function getPresetAnswer(id: string) {
  return presetQuestions.find((question) => question.id === id);
}
