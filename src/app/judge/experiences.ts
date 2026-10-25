export interface JudgeExperience {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  date?: string;
  details?: string[];
}

export const judgeExperiences: JudgeExperience[] = [
  {
    title: "AAAI-UG",
    description: "Judge for AAAI-UG",
  },
  {
    title: "ASPPH27",
    description: "Judge for ASPPH27",
  },
  {
    title: "EMNLP Industry Track",
    description: "2 papers reviewed",
    image: "/projectImages/O1 Judging/Paper:Review/Review Received 1.png",
    imageAlt: "EMNLP Industry Track Review",
    date: "2026",
    details: [
      "Reviewed 2 papers for EMNLP 2026 Industry Track",
      "Evaluated cutting-edge NLP research and applications",
      "Provided detailed feedback on methodology and impact",
    ],
  },
  {
    title: "Los Altos Hacks Judge Certification",
    description: "Certified hackathon judge",
    image:
      "/projectImages/O1 Judging/Los Altos Judge/Los Altos Hacks Judge Certification.png",
    imageAlt: "Los Altos Hacks Judge Certification",
    details: [
      "Certified judge for Los Altos Hacks",
      "Evaluated student hackathon projects",
      "Mentored participants on technical implementation",
    ],
  },
  {
    title: "Girl Innovation 2026 Gold Judge",
    description: "Gold-level judge certification",
    image:
      "/projectImages/O1 Judging/Girl Innovation/girl_innovation_2026-gold_judge.png",
    imageAlt: "Girl Innovation 2026 Gold Judge",
    date: "2026",
    details: [
      "Gold-level judge for Girl Innovation 2026",
      "Evaluated innovative projects by young women in tech",
      "Promoted diversity and inclusion in technology",
    ],
  },
  {
    title: "USAII Global AI Hackathon 2026 Judge",
    description: "Judge for global AI competition",
    image: "/projectImages/O1 Judging/USAII/USAII_Certification.png",
    imageAlt: "USAII Global AI Hackathon Judge",
    date: "2026",
    details: [
      "Judge for USAII Global AI Hackathon 2026",
      "Evaluated AI/ML projects from participants worldwide",
      "Assessed technical innovation and real-world impact",
    ],
  },
];
