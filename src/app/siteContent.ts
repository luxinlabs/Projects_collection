export interface OpenSourceProject {
  title: string;
  summary: string;
  stack: string[];
  href: string;
}

export interface ResearchArticle {
  title: string;
  topic: string;
  summary: string;
  readTime: string;
  href: string;
}

export const openSourceProjects: OpenSourceProject[] = [
  {
    title: "Hypothesis ATLAS",
    summary:
      "AI-powered evidence mapping system for biotech research that discovers, organizes, and visualizes signals from papers, datasets, and scientific updates.",
    stack: ["Node.js", "Docker", "Groq API", "Redis"],
    href: "https://github.com/luxinlabs/Hypothesis-Atlas",
  },
];

export const researchArticles: ResearchArticle[] = [
  {
    title: "Hypothesis Atlas: An Open-Source Evidence Mapping Platform for Multi-Domain Scientific Research",
    topic: "Research Paper",
    summary:
      "Hypothesis Atlas introduces an open-source, hypothesis-first evidence mapping workflow that retrieves live papers, datasets, and early signals, then surfaces disagreements, gaps, and research opportunities through epistemically-labeled synthesis.",
    readTime: "18 min",
    href: "/articles/hypothesis-atlas",
  },
  {
    title: "NEURORA: Mandala-Based Digital Phenotyping for Early Detection of Parkinson's Disease and Alzheimer's Disease in the Era of Artificial Intelligence",
    topic: "Book Chapter",
    summary:
      "A book chapter exploring digital phenotyping approaches using mandala-based assessments for early detection of neurodegenerative diseases, published in 'Where Art and Technology Resonate: Binnovative Approaches to Digital Health and Wellbeing'.",
    readTime: "25 min",
    href: "/articles/neurora",
  },
];
