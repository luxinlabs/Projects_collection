import Link from "next/link";

import { openSourceProjects } from "../siteContent";
import SidebarNav from "../SidebarNav";

export default function OpenSourcePage() {
  const project = openSourceProjects[0];

  return (
    <main className="theme-page min-h-screen px-6 py-14 md:py-20 pt-20 md:pt-20">
      <SidebarNav />

      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="theme-toggle inline-flex items-center justify-center h-9 w-9 rounded-full transition-colors"
            aria-label="Back to home"
          >
            ←
          </Link>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4 mb-12">
          <div>
            <p className="text-sm uppercase tracking-widest theme-muted mb-2">
              Professional Website
            </p>
            <h1 className="text-4xl md:text-5xl font-bold">Open Source</h1>
          </div>
        </div>

        <article className="theme-surface rounded-3xl border theme-border p-8 md:p-10 shadow-2xl">
          <p className="text-sm uppercase tracking-widest theme-muted mb-3">
            Featured Repository
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {project.title}
          </h2>
          <p className="text-lg leading-relaxed mb-7 max-w-3xl">
            {project.summary}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.stack.map((item) => (
              <span
                key={item}
                className="theme-surface-2 border theme-border text-xs md:text-sm px-3 py-1.5 rounded-full"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="theme-toggle inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-colors"
            >
              Visit Repository
            </a>
            <Link
              href="/projects"
              className="theme-nav-link inline-flex items-center gap-2 px-5 py-3 rounded-xl transition-colors"
            >
              See Project Portfolio
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
