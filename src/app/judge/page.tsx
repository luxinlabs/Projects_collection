"use client";

import Link from "next/link";
import Image from "next/image";
import SidebarNav from "../SidebarNav";

interface JudgeExperience {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  date?: string;
  details?: string[];
}

const judgeExperiences: JudgeExperience[] = [
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

export default function JudgePage() {
  return (
    <div className="theme-page min-h-screen pt-16 md:pt-0">
      <SidebarNav />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link
            href="/"
            className="theme-toggle inline-flex items-center justify-center h-9 w-9 rounded-full transition-colors"
            aria-label="Back to home"
          >
            ←
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-widest theme-muted mb-2">
            Professional Experience
          </p>
          <h1 className="text-5xl font-bold mb-4">Judge Experience</h1>
          <p className="text-xl theme-muted">
            Evaluating innovation in AI, hackathons, and academic research
          </p>
        </div>

        {/* Judge Experiences Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {judgeExperiences.map((experience, index) => {
              const isPDF = experience.image.endsWith(".pdf");

              return (
                <div
                  key={index}
                  className="theme-surface rounded-2xl border theme-border overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  {/* Image or PDF */}
                  <div className="relative h-64 bg-gray-100 dark:bg-gray-800">
                    {isPDF ? (
                      <a
                        href={experience.image}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center h-full hover:opacity-80 transition-opacity"
                      >
                        <div className="text-center p-8">
                          <div className="text-6xl mb-4">📄</div>
                          <p className="font-semibold text-lg">
                            View Certificate (PDF)
                          </p>
                          <p className="text-sm theme-muted mt-2">
                            Click to open
                          </p>
                        </div>
                      </a>
                    ) : (
                      <Image
                        src={experience.image}
                        alt={experience.imageAlt}
                        fill
                        className="object-contain p-4"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold flex-1">
                        {experience.title}
                      </h3>
                      {experience.date && (
                        <span className="theme-surface-2 rounded-full border theme-border px-3 py-1 text-xs font-semibold ml-2">
                          {experience.date}
                        </span>
                      )}
                    </div>

                    <p className="theme-muted text-lg mb-4">
                      {experience.description}
                    </p>

                    {experience.details && (
                      <ul className="space-y-2">
                        {experience.details.map((detail, idx) => (
                          <li
                            key={idx}
                            className="text-sm theme-muted flex items-start"
                          >
                            <span className="mr-2">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="max-w-4xl mx-auto mt-16 theme-surface rounded-2xl border theme-border p-8">
          <h2 className="text-2xl font-bold mb-4">About My Judging Work</h2>
          <p className="theme-muted leading-relaxed mb-4">
            I am passionate about fostering innovation and supporting the next
            generation of technologists. Through my judging experience across
            academic conferences, hackathons, and innovation competitions, I
            have evaluated hundreds of projects spanning AI/ML, full-stack
            development, and research applications.
          </p>
          <p className="theme-muted leading-relaxed">
            My approach to judging emphasizes technical rigor, real-world
            impact, and innovative thinking. I provide constructive feedback to
            help participants grow and improve their work, while celebrating
            creativity and excellence in technology.
          </p>
        </div>
      </div>
    </div>
  );
}
