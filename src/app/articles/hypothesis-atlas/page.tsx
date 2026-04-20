import Link from "next/link";
import SidebarNav from "../../SidebarNav";

export default function HypothesisAtlasArticlePage() {
  return (
    <main className="theme-page min-h-screen px-6 py-14 md:py-20 pt-20 md:pt-20">
      <SidebarNav />

      <article className="theme-surface max-w-4xl mx-auto rounded-3xl border theme-border p-6 md:p-10">
        <div className="flex flex-wrap items-center gap-6 mb-8">
          <Link
            href="/articles"
            className="theme-toggle inline-flex items-center gap-2 rounded-lg px-3 py-1.5 font-semibold transition-colors"
          >
            <span className="text-lg">-</span> Back to Articles
          </Link>
        </div>

        <header className="mb-10 border-b theme-border pb-8">
          <p className="text-sm uppercase tracking-widest theme-muted mb-3">
            Research Paper
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Hypothesis Atlas: An Open-Source Evidence Mapping Platform for
            Multi-Domain Scientific Research
          </h1>
          <p className="theme-muted">
            Luxin Zhang · AI Builder & Independent Researcher · United States
          </p>
        </header>

        <section className="max-w-none leading-relaxed [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1 [&_p]:mb-4">
          <h2>Abstract</h2>
          <p>
            Hypothesis Atlas is an open-source, web-based research intelligence
            platform that automatically discovers, analyzes, and visualizes the
            evidence landscape surrounding a scientific hypothesis. Given a
            research topic, the system executes an 8-stage asynchronous pipeline
            that retrieves peer-reviewed papers from OpenAlex and PubMed,
            experimental datasets from NCBI GEO, and early community signals,
            then synthesizes results into an interactive knowledge tree that
            explicitly surfaces supporting evidence, contradicting findings,
            methodological disagreements, and open research problems.
          </p>
          <p>
            A built-in Notebook Copilot grounds AI-assisted ideation in real
            citations. Unlike general-purpose LLMs that synthesize from training
            data, Hypothesis Atlas pulls from live databases, labels every
            source by epistemic reliability tier, and treats disagreements and
            knowledge gaps as first-class outputs. The platform currently
            supports biotech, technical finance, and chemistry domains, with a
            roadmap toward fully user-defined topic landscapes.
          </p>

          <h2>1. Introduction</h2>
          <p>
            The early orientation phase of research — determining where a new
            hypothesis stands relative to existing literature — is among the
            most time-consuming aspects of scientific work. Researchers must
            manually search multiple databases, synthesize conflicting findings,
            locate relevant datasets, and construct a coherent picture of what
            is known, contested, and unexplored.
          </p>
          <p>
            Existing tools each solve only part of the workflow. Citation graph
            tools map neighborhoods of known work, semantic search tools return
            relevant papers, and general-purpose LLMs provide fluent summaries.
            But none consistently combine live retrieval, explicit disagreement
            surfacing, dataset integration, and epistemic weighting in one
            hypothesis-first system.
          </p>
          <p>
            Hypothesis Atlas addresses this with three commitments: hypothesis-
            first orientation, live multi-source retrieval, and epistemic
            guardrails that preserve uncertainty rather than hiding it.
          </p>

          <h2>2. System Design</h2>
          <h3>2.1 Architecture</h3>
          <p>
            Hypothesis Atlas is implemented with Next.js 14 App Router,
            PostgreSQL via Prisma ORM, and BullMQ + Redis for background
            processing. The architecture separates API, data, and asynchronous
            worker responsibilities for reliability and scalability.
          </p>

          <h3>2.2 8-Stage Evidence Pipeline</h3>
          <ol>
            <li>Initialization and job orchestration</li>
            <li>Query expansion via LLM-generated related keywords</li>
            <li>Paper retrieval from OpenAlex and PubMed</li>
            <li>Dataset retrieval from NCBI GEO</li>
            <li>Social signal retrieval</li>
            <li>Source ranking and deduplication by reliability + recency</li>
            <li>Root knowledge node synthesis</li>
            <li>Child node generation with disagreements and open problems</li>
          </ol>
          <p>
            Pipeline progress is streamed to users in real time using
            Server-Sent Events (SSE).
          </p>

          <h3>2.3 Epistemic Guardrails</h3>
          <p>
            Every source is labeled by a reliability tier ({"peer_reviewed"}{" "}
            &gt; {"preprint"} &gt; {"dataset"} &gt; {"social_signal"}). Prompts
            explicitly weight strong evidence and preserve unresolved
            contradictions, turning disagreement into a first-class signal for
            future research.
          </p>

          <h2>3. Differentiation</h2>
          <p>
            Compared with existing tools, Hypothesis Atlas combines live
            multi-source retrieval, dataset integration, disagreement surfacing,
            gap-node generation, and notebook-grounded AI ideation in one
            open-source workflow.
          </p>

          <h2>4. Current Domains and Roadmap</h2>
          <p>
            Current domains include biotech/life sciences, technical finance,
            and chemistry. Planned roadmap items include fully user-defined
            topic seeds, vector retrieval, richer social integrations, PDF
            full-text extraction, and citation graph visualizations.
          </p>

          <h2>5. Conclusion</h2>
          <p>
            Hypothesis Atlas automates the evidence orientation phase before
            research ideation. By combining live retrieval, epistemic labeling,
            and notebook support, it helps researchers transform uncertainty and
            disagreement into structured, actionable research directions.
          </p>
        </section>

        <footer className="mt-14 border-t theme-border pt-8">
          <a
            href="https://github.com/luxinlabs/Hypothesis-Atlas"
            target="_blank"
            rel="noreferrer"
            className="theme-toggle inline-flex items-center px-5 py-3 rounded-xl font-semibold transition-colors"
          >
            View Hypothesis Atlas Repository
          </a>
        </footer>
      </article>
    </main>
  );
}
