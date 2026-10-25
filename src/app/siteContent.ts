export interface OpenSourceProject {
  title: string;
  summary: string;
  stack: string[];
  href: string;
}

export interface ResearchArticle {
  title: string;
  topic: string;
  status?: "Accepted";
  summary?: string;
  abstract?: string;
  readTime?: string;
  href?: string;
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
    title: "From Episodes to Procedures: Scope-Aware Memory Promotion for Lifelong Enterprise Agents",
    topic: "Accepted Paper · AIAS 2026 Workshop LLA",
    status: "Accepted",
    abstract:
      "A fix that worked for one customer is not automatically right for the next, yet most agent memories share every past case with everyone. We frame memory promotion as a decision problem for lifelong agents that serve many users: when is one user's experience well enough corroborated, scoped and reliable to become shared knowledge? Our method, ScopeAware, promotes experiences through a learned evidence gate, attaches to every shared procedure a predicate stating whom it applies to, checks claimed scopes against their source, and demotes procedures that stop working. We evaluate it in controlled longitudinal replays of an enterprise support desk, built on the memory logic of an open-source support-agent prototype. On eight fresh test streams, ScopeAware raises the share of tickets a Qwen2.5-7B agent resolves correctly from 56.5% with flat memory to 63.9%, and on three streams with Llama-3.1-8B it gains 4–7 percentage points over flat memory, scope-filtered flat memory and the prototype's deployed memory, while sending fewer wrong fixes. Scope metadata alone does not explain the gain, and the lead persists when setups appear only in free text. The method transfers unchanged to a scientific core-facility domain (+7.5 points), and a stricter gate cuts the harm from poisoned memories by more than an order of magnitude for about two points of accuracy.",
  },
  {
    title: "What Makes a Virtual ISA Agent-Programmable? A Controlled Study of Agent-Facing Documentation for StableHLO",
    topic: "Accepted Paper",
    status: "Accepted",
    abstract:
      "AI agents increasingly write code at the virtual instruction-set architecture (ISA) layer, while benchmarks score the agent, not the interface the ISA exposes. Isolating that interface is hard because documentation variants must carry the same facts, examples and length. We fix one intermediate representation (IR), StableHLO, with a pinned verifier and executor, the tasks and a harness-guided generate-and-repair loop, and vary only how documentation reaches the agent: none, syntax only, prose, a length-matched JSON contract with the same facts and examples, or retrieval through a tool (free, forced, or with cross-cutting rules upfront). With a protocol frozen beforehand, we evaluated 267 held-out tasks (114 synthetic, 153 from KernelBench) with independent oracles and three GPT-4.1 snapshots (5,005 pre-registered trials, the largest model on 91 tasks; 625 post-hoc ablation trials). Even syntax-only documentation added 16 to 33 percentage points (pp) of first-attempt correctness over none. With matched content, the tested JSON contract scored below prose for every model (-6.0, -7.9, -12.1 pp; significant for the two larger), reversing our earlier, unmatched comparison; an exploratory JSON-with-prose ablation also scored below prose, suggesting that the wrapper, grouping or added length may contribute. On-demand access trailed upfront delivery by 4-32 pp: the strongest model never called the tool unless forced, and partial upfront documentation suppressed lookup. Over 99% of observed failures were rejected statically, even on real-world tasks, and a stronger oracle re-grade (265 tasks) changed 1 of 1,069 accepted first attempts: well-formedness was the binding bottleneck.",
  },
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
