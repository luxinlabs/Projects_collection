import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import profilePicture from "public/profile_luxin1.jpg";
import SidebarNav from "../SidebarNav";
import { openSourceProjects, researchArticles } from "../siteContent";

export const metadata: Metadata = {
  title: "Research | Luxin Zhang",
  description:
    "Luxin Zhang's official researcher profile: lifelong agent memory, agent-facing interfaces, reliable AI systems, accepted papers, and academic service.",
};

const researchInterests = [
  {
    title: "Lifelong Agent Memory",
    description:
      "How agents turn individual experiences into reliable shared procedures, with scope-aware promotion, evidence gates, and resistance to memory poisoning.",
  },
  {
    title: "Agent-Facing Interfaces",
    description:
      "How documentation, interface design, and tool access affect code generation and correctness, including controlled studies of StableHLO.",
  },
  {
    title: "AI for Scientific Discovery & Health",
    description:
      "Evidence mapping for scientific research and digital phenotyping for neurodegenerative disease detection.",
  },
];

export default function ResearchPage() {
  const acceptedPapers = researchArticles.filter((article) => article.status === "Accepted");
  const otherWriting = researchArticles.filter((article) => article.status !== "Accepted");

  return (
    <main className="theme-page min-h-screen px-6 pb-16 pt-36 md:pt-24">
      <SidebarNav />

      <div className="max-w-5xl mx-auto space-y-12">
        <header className="theme-surface rounded-3xl border theme-border p-6 md:p-10">
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            <Image
              src={profilePicture}
              alt="Luxin Zhang"
              width={160}
              height={160}
              priority
              className="rounded-2xl w-40 h-40 object-cover shrink-0"
            />
            <div>
              <p className="text-sm uppercase tracking-widest theme-muted mb-3">
                Research · Official Researcher Profile
              </p>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">Luxin Zhang</h1>
              <p className="text-xl theme-muted mb-5">Researcher in AI Systems</p>
              <p className="leading-relaxed max-w-2xl">
                I study how AI agents learn from experience and interact with
                the systems around them. My work focuses on reliable memory
                for lifelong agents, documentation and interfaces for agent
                programming, and AI tools for scientific discovery and health.
                I connect these questions with my background in software
                engineering, secure systems, and computer vision.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <a
                  href="mailto:philomela.zhang@gmail.com"
                  className="theme-toggle rounded-lg px-4 py-2 font-semibold transition-colors"
                >
                  Email
                </a>
                <a
                  href="https://github.com/luxinlabs"
                  className="theme-toggle rounded-lg px-4 py-2 font-semibold transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/luxin-zhang-96777b192/"
                  className="theme-toggle rounded-lg px-4 py-2 font-semibold transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          <nav aria-label="Research sections" className="flex flex-wrap gap-x-6 gap-y-3 mt-8 pt-6 border-t theme-border text-sm font-semibold">
            <a href="#interests" className="underline underline-offset-4">Research Interests</a>
            <a href="#accepted-papers" className="underline underline-offset-4">Accepted Papers</a>
            <a href="#research-writing" className="underline underline-offset-4">Research Writing</a>
            <a href="#academic-service" className="underline underline-offset-4">Academic Service</a>
          </nav>
        </header>

        <section id="interests" aria-labelledby="interests-heading" className="scroll-mt-36">
          <h2 id="interests-heading" className="text-3xl font-bold mb-6">Research Interests</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {researchInterests.map((interest) => (
              <article key={interest.title} className="theme-surface border theme-border rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-3">{interest.title}</h3>
                <p className="theme-muted leading-relaxed">{interest.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="accepted-papers" aria-labelledby="papers-heading" className="scroll-mt-36">
          <h2 id="papers-heading" className="text-3xl font-bold mb-6">Accepted Papers</h2>
          <div className="space-y-6">
            {acceptedPapers.map((paper) => (
              <article key={paper.title} className="theme-surface border theme-border rounded-2xl p-6 md:p-8">
                <p className="text-xs uppercase tracking-widest theme-muted mb-3">{paper.topic}</p>
                <h3 className="text-2xl font-semibold mb-5">{paper.title}</h3>
                <h4 className="font-semibold mb-2">Abstract</h4>
                <p className="leading-relaxed">{paper.abstract}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="research-writing" aria-labelledby="writing-heading" className="scroll-mt-36">
          <h2 id="writing-heading" className="text-3xl font-bold mb-6">Research Writing</h2>
          <div className="space-y-5">
            {otherWriting.map((article) => (
              <article key={article.title} className="theme-surface border theme-border rounded-2xl p-6">
                <p className="text-xs uppercase tracking-widest theme-muted mb-3">{article.topic}</p>
                <h3 className="text-xl font-semibold mb-3">{article.title}</h3>
                <p className="theme-muted leading-relaxed mb-4">{article.summary}</p>
                {article.href && (
                  <Link href={article.href} className="underline underline-offset-4 font-semibold">Read More →</Link>
                )}
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="software-heading">
          <h2 id="software-heading" className="text-3xl font-bold mb-6">Research Software</h2>
          {openSourceProjects.map((project) => (
            <article key={project.title} className="theme-surface border theme-border rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
              <p className="theme-muted leading-relaxed mb-4">{project.summary}</p>
              <a href={project.href} className="underline underline-offset-4 font-semibold">View Repository →</a>
            </article>
          ))}
        </section>

        <section id="academic-service" aria-labelledby="service-heading" className="theme-surface border theme-border rounded-2xl p-6 md:p-8 scroll-mt-36">
          <h2 id="service-heading" className="text-3xl font-bold mb-6">Academic Service</h2>
          <ul className="space-y-3 leading-relaxed">
            <li><span className="font-semibold">EMNLP 2026 Industry Track</span> — Paper reviewer; reviewed two papers.</li>
            <li><span className="font-semibold">AAAI-UG</span> — Judge.</li>
            <li><span className="font-semibold">ASPPH27</span> — Judge.</li>
          </ul>
          <Link href="/judge" className="inline-block mt-6 underline underline-offset-4 font-semibold">View All Judging Experience →</Link>
        </section>
      </div>
    </main>
  );
}
