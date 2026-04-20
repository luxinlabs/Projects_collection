import Link from "next/link";

import { researchArticles } from "../siteContent";
import SidebarNav from "../SidebarNav";

export default function ArticlesPage() {
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

        <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
          <div>
            <p className="text-sm uppercase tracking-widest theme-muted mb-2">
              Research Interest
            </p>
            <h1 className="text-4xl md:text-5xl font-bold">Articles & Notes</h1>
          </div>
        </div>

        <div className="space-y-5">
          {researchArticles.map((article) => (
            <article
              key={article.title}
              className="theme-surface rounded-2xl border theme-border p-6"
            >
              <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                <span className="text-xs uppercase tracking-widest theme-muted">
                  {article.topic}
                </span>
                <span className="text-sm theme-muted">{article.readTime}</span>
              </div>
              <h2 className="text-2xl font-semibold mb-3">{article.title}</h2>
              <p className="leading-relaxed mb-4">{article.summary}</p>
              <Link
                href={article.href}
                className="theme-toggle inline-flex items-center rounded-lg px-3 py-1.5 font-semibold transition-colors"
              >
                Read More →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
