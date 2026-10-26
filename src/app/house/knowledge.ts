import {
  activitiesData,
  educationData,
  workExperienceData,
} from "../bio/content";
import { judgeExperiences } from "../judge/experiences";
import { openSourceProjects, researchArticles } from "../siteContent";
import {
  awardedProjects,
  portfolioProjects,
  storyPlaces,
} from "./houseContent";

export interface GuideSource {
  title: string;
  href: string;
}
export interface GuideAnswer {
  text: string;
  sources: GuideSource[];
  mode: "guide" | "ai";
}
export interface GuideMessage {
  role: "user" | "assistant";
  content: string;
}

const intro =
  "Hi, I’m little Luxin, the website guide! Luxin is a Software / AI Engineer building AI tools and applications with the ambition to improve lives worldwide. After winning 7 AI hackathons in the past year, Luxin is focused on turning bold ideas into ambitious products, connecting agentic workflows, multi-agent systems, reliable AI, and secure software engineering.";
const focus =
  "Luxin builds AI applications end to end, working with agentic workflows, multi-agent systems, LLMs, RAG, embeddings, vector and graph databases, and knowledge graphs. She also works with MCP and LLM evaluation, including LLM-as-judge. Her AI security and safety interests include agent permissions, sandboxed execution, and reliable evaluation.";

export function websiteKnowledge() {
  return JSON.stringify({
    identity:
      "You are little Luxin, a virtual website guide representing Luxin Zhang, a woman, not the person herself.",
    introduction: intro,
    focus,
    contact: {
      email: "philomela.zhang@gmail.com",
      portfolio: "https://www.luxinzhang.me/",
      github: "https://github.com/luxinlabs",
      linkedin: "https://www.linkedin.com/in/luxin-zhang-96777b192/",
      connections:
        "Fellow builders, accelerator teams, and investors interested in AI products with global impact.",
    },
    education: educationData,
    work: workExperienceData,
    community: activitiesData,
    projects: portfolioProjects,
    articles: researchArticles,
    openSource: openSourceProjects,
    judging: judgeExperiences,
    places: storyPlaces,
    house:
      "The virtual cottage has a sleeping and reading nook, a central living room with a fireplace, and a kitchen and dining room. Luxin’s avatar is a girl with long dark hair, a rose dress, and a bow. A puppy and a curled-up cat live inside this fictional cottage; three ducks swim in the garden pond. These are scene characters, not claims about Luxin’s real pets. Awards on the wall; projects on the computer; judging at the balance scale on the side table; open source at the window; research on the bookshelf; life and work locations at the globe; a garden bench for connecting. Walk with WASD or arrow keys, click to walk, click an object to approach it, or use Explore the house. E inspects a nearby object. Escape closes a detail sheet.",
    travelNote:
      "Only life/work/education/community locations documented in the bio are currently included. No personal travel photographs or additional trip destinations have been supplied. Do not invent them.",
  });
}

const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFKC")
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, " ")
    .trim();
const link = (title: string, href: string): GuideSource => ({ title, href });

export function answerFromWebsite(
  question: string,
  history: GuideMessage[] = [],
): GuideAnswer {
  let q = normalize(question);
  if (
    /^(tell me more|more|why|how|what else|go on|tell me about it|what about that)$/.test(
      q,
    )
  ) {
    const previous = [...history]
      .reverse()
      .find(
        (message) =>
          message.role === "user" && normalize(message.content) !== q,
      );
    if (previous) q = `${normalize(previous.content)} ${q}`;
  }
  const answer = (text: string, sources: GuideSource[] = []): GuideAnswer => ({
    text,
    sources,
    mode: "guide",
  });
  if (/\b(puppy|dog|cat|duck|duckling|pets?)\b|小狗|猫|鸭/.test(q))
    return answer(
      "There’s a friendly puppy in the living room, a sleepy tabby on the sofa, and a duck with two ducklings in the garden pond. They’re little characters in this virtual cottage. Come closer and you might catch a wagging tail, a dozing cat, or ducks drifting by!",
      [link("Explore the little home", "/")],
    );
  if (
    /\b(girl|woman|guy|gender|female|male|boy)\b/.test(q) &&
    /\b(luxin|you|your|she)\b/.test(q) &&
    !/innovation|judg|award|hackathon/.test(q)
  )
    return answer(
      "Luxin is a woman. The little host represents her with long dark hair, a rose outfit, and a friendly wave.",
      [link("Meet Luxin", "/bio")],
    );
  const namedProject = portfolioProjects.find((project) => {
    const name = normalize(project.name.split(/\s[-–]\s/)[0]);
    return (
      (name.length > 3 && q.includes(name)) ||
      q.includes(normalize(project.slug))
    );
  });
  if (namedProject)
    return answer(
      `${namedProject.name}\n\n${namedProject.description}\n\nBuilt with ${namedProject.tools.join(", ")}.${namedProject.award ? `\n\n${namedProject.award}` : ""}`,
      [
        link("Project details", `/projects/${namedProject.slug}`),
        ...Object.entries(namedProject.links)
          .filter(([, href]) => href && /^https?:/.test(href))
          .slice(0, 2)
          .map(([title, href]) => link(title, href)),
      ],
    );
  const namedPaper = researchArticles.find(
    (paper) =>
      q.includes(normalize(paper.title)) ||
      (q.includes("scopeaware") && paper.title.startsWith("From Episodes")) ||
      (q.includes("stablehlo") && paper.title.includes("StableHLO")) ||
      (q.includes("memory promotion") &&
        paper.title.startsWith("From Episodes")),
  );
  if (namedPaper)
    return answer(
      `${namedPaper.title}\n${namedPaper.topic}\n\n${namedPaper.abstract ?? namedPaper.summary}`,
      [link("Research profile", "/research")],
    );
  if (
    /contact|email|connect|investor|accelerator|hire|collaborat|reach|linkedin/.test(
      q,
    )
  )
    return answer(
      "Luxin is looking to connect with fellow builders, accelerator teams, and investors who want to turn emerging AI capabilities into products with global impact.\n\nYou can reach her at philomela.zhang@gmail.com, explore her portfolio, or connect on LinkedIn.",
      [
        link("Email Luxin", "mailto:philomela.zhang@gmail.com"),
        link("LinkedIn", "https://www.linkedin.com/in/luxin-zhang-96777b192/"),
        link("Portfolio", "https://www.luxinzhang.me/"),
      ],
    );
  if (/award|hackathon|win|prize|troph/.test(q))
    return answer(
      `Luxin reports 7 AI hackathon wins in the past year. Here are the award entries documented in the project portfolio:\n\n${awardedProjects.map((project) => `${project.name.split(" - ")[0]}: ${project.award?.replace("🏆 ", "")}`).join("\n\n")}\n\nSome entries include track awards or honorable mentions; the wall shows the portfolio’s recorded distinctions.`,
      [link("Award-winning projects", "/projects")],
    );
  if (/judg|review|aaai|aspph|emnlp|天平/.test(q))
    return answer(
      `Luxin’s judging and reviewing work includes:\n\n${judgeExperiences.map((item) => `${item.title}: ${item.description}`).join("\n\n")}\n\nThe brass balance scale on the side table opens this collection.`,
      [link("Judging experience", "/judge")],
    );
  if (/open source|opensource|github|window/.test(q))
    return answer(
      `${openSourceProjects.map((project) => `${project.title}: ${project.summary}\n\nStack: ${project.stack.join(", ")}.`).join("\n\n")}\n\nThe window in the house opens the featured open-source project, and her GitHub has more repositories.`,
      [
        ...openSourceProjects.map((project) =>
          link(project.title, project.href),
        ),
        link("GitHub", "https://github.com/luxinlabs"),
      ],
    );
  if (
    /research|paper|publicat|abstract|accept|agent memory|lifelong|isa|document/.test(
      q,
    )
  )
    return answer(
      `Luxin researches lifelong agent memory, agent-facing interfaces, and AI for scientific discovery and health.\n\n${researchArticles.map((paper) => `${paper.title}\n${paper.topic}`).join("\n\n")}\n\nThe bookshelf opens the official researcher profile. Ask me about ScopeAware or StableHLO for the full abstracts.`,
      [
        link("Official researcher profile", "/research"),
        link("Articles & notes", "/articles"),
      ],
    );
  if (/educat|degree|university|school|duke|stony|study|studied/.test(q))
    return answer(
      educationData
        .map(
          (item) =>
            `${item.degree}\n${item.institution}, ${item.location}\n${item.startDate} – ${item.endDate}${item.honors?.length ? `\n${item.honors.join("; ")}` : ""}`,
        )
        .join("\n\n"),
      [link("Education & bio", "/bio#education")],
    );
  if (
    /communit|volunteer|activit|reading|\brif\b|slush|tpifp|perk summit/.test(q)
  )
    return answer(
      activitiesData
        .map(
          (item) =>
            `${item.organization} — ${item.role}\n${item.startDate} – ${item.endDate}\n${item.highlights.join("\n")}`,
        )
        .join("\n\n"),
      [link("Community & activities", "/bio#activities")],
    );
  if (
    /work|job|career|experience|fortinet|vivo|tiktok|engineer/.test(q) &&
    !/agentic|skills|stack/.test(q)
  )
    return answer(
      `Luxin combines large-scale software systems and customer-facing engineering. Her documented experience includes:\n\n${workExperienceData.map((item) => `${item.company} — ${item.role}\n${item.startDate} – ${item.endDate}\n${item.highlights[0]}`).join("\n\n")}`,
      [link("Work experience", "/bio#work-experience")],
    );
  if (
    /\b(?:skill|stack|rag\b|embedding|graph|mcp\b|llm|security|safety|sandbox|agent|tech|build)/.test(
      q,
    )
  )
    return answer(focus, [
      link("About Luxin", "/bio"),
      link("Projects", "/projects"),
      link("Research", "/research"),
    ]);
  if (/travel|globe|place|live|city|cities|photo|地球|where/.test(q))
    return answer(
      `The globe currently traces Luxin’s education, work, and community experiences:\n\n${storyPlaces.map((place) => `${place.name}, ${place.country} — ${place.description}`).join("\n\n")}\n\nPersonal travel destinations and photographs haven’t been added yet, so I can’t tell you about undocumented trips.`,
      [link("Biography", "/bio")],
    );
  if (/project|portfolio|computer|app/.test(q))
    return answer(
      `The computer contains ${portfolioProjects.length} projects across AI, full-stack applications, algorithms, games, iOS, and more.\n\nA few starting points:\n${portfolioProjects
        .filter((project) => project.category === "AI Projects")
        .slice(0, 8)
        .map((project) => `• ${project.name}`)
        .join(
          "\n",
        )}\n\nAsk me about a project by name, or open the computer to search the full collection.`,
      [link("All projects", "/projects")],
    );
  if (/house|walk|control|explore|garden|help|move|keyboard/.test(q))
    return answer(
      "Make yourself at home! Click the ground to walk, or use WASD / arrow keys. Drag the room to look around.\n\n✧ Wall → awards\n⌘ Computer → projects\n⚖ Balance scale → judging\n↗ Window → open source\n▤ Bookshelf → research\n◎ Globe → places\n☺ Little Luxin → this conversation\n❋ Garden bench → connect\n\nClick any labeled object to walk over and inspect it. You can also use Explore the house, or press E near an object.",
    );
  if (/^(hi|hello|hey|你好|嗨)( |$)|introduc|about|bio|who|yourself/.test(q))
    return answer(
      intro +
        "\n\n" +
        focus +
        "\n\nWhat would you like to explore — projects, research, judging, or the story behind it all?",
      [link("Biography", "/bio"), link("Research profile", "/research")],
    );
  if (/thank|bye|nice|cool|love/.test(q))
    return answer(
      "You’re very welcome. Stay a while — there’s always another little corner to explore. The computer, bookshelf, and trophy wall are good places to start.",
    );
  return answer(
    "That detail isn’t documented on Luxin’s website, so I don’t want to make it up. I can help with her projects, research papers, education, work, awards, judging, technical interests, and contact details. Try a project name or a question like ‘What does Luxin research?’",
    [
      link("Biography", "/bio"),
      link("Research", "/research"),
      link("Projects", "/projects"),
    ],
  );
}
