"use client";

import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import AboutMeContent from "../AboutMeContent";
import { judgeExperiences } from "../judge/experiences";
import { openSourceProjects, researchArticles } from "../siteContent";
import {
  awardedProjects,
  houseSpots,
  portfolioProjects,
  type RoomSection,
} from "./houseContent";
import HostChat, { type ChatTurn } from "./HostChat";

const TravelGlobe = dynamic(() => import("./TravelGlobe"), {
  ssr: false,
  loading: () => <p className="room-loading">Unfolding the atlas…</p>,
});

function ProjectCollection({ awards = false }: { awards?: boolean }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const collection = awards ? awardedProjects : portfolioProjects;
  const categories = [
    "All",
    ...Array.from(new Set(collection.map((project) => project.category))),
  ];
  const filtered = collection.filter(
    (project) =>
      (category === "All" || project.category === category) &&
      `${project.name} ${project.description} ${project.tools.join(" ")} ${project.award || ""}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  return (
    <>
      <p className="room-intro">
        {awards
          ? "Experiments that became milestones. A few things I’m proud to have built, and the recognition along the way."
          : "Small experiments, ambitious ideas, and things built to be used. Pull up a chair and have a look."}
      </p>
      {awards && (
        <div className="room-stat">
          <span>7</span>
          <p>
            AI hackathon wins
            <br />
            <small>in the past year</small>
          </p>
          <i>✧</i>
        </div>
      )}
      <label className="room-search">
        <span>⌕</span>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label={awards ? "Search awards" : "Search projects"}
          placeholder={
            awards
              ? "Find an award or project…"
              : "Find a project, idea, or technology…"
          }
        />
      </label>
      {!awards && (
        <div className="room-filters" aria-label="Project categories">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "selected" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      )}
      <p className="room-result-count" aria-live="polite">
        {filtered.length} {awards ? "recorded distinctions" : "projects"}
      </p>
      <div className="room-projects">
        {filtered.map((project) => (
          <article key={project.slug} className="room-project-card">
            <Link
              href={`/projects/${project.slug}`}
              className="room-project-image"
              aria-label={`View ${project.name}`}
            >
              <Image
                src={project.imagePath}
                alt={project.name}
                width={640}
                height={360}
              />
            </Link>
            <div className="room-project-copy">
              {project.award && (
                <p className="project-award">{project.award}</p>
              )}
              <h3>
                <Link href={`/projects/${project.slug}`}>{project.name}</Link>
              </h3>
              <p>{project.description}</p>
              <div className="project-tools">
                {project.tools.map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>
              <Link
                href={`/projects/${project.slug}`}
                className="room-text-link"
              >
                Step into the project ↗
              </Link>
            </div>
          </article>
        ))}
        {!filtered.length && (
          <p className="room-empty">
            Nothing in this corner yet. Try a different word or category.
          </p>
        )}
      </div>
      <Link className="room-page-link" href="/projects">
        Open the full project portfolio ↗
      </Link>
    </>
  );
}

function ResearchCollection() {
  return (
    <>
      <p className="room-intro">
        Questions I keep coming back to: how agents remember, how interfaces
        shape their capabilities, and how we make AI reliable enough to matter.
      </p>
      <Link href="/research" className="room-page-link">
        Visit my official researcher profile ↗
      </Link>
      {researchArticles.map((paper) => (
        <article key={paper.title} className="room-paper">
          <span className="room-eyebrow">{paper.topic}</span>
          <h3>{paper.title}</h3>
          {paper.abstract ? (
            <details>
              <summary>
                Read the abstract <span>＋</span>
              </summary>
              <p>{paper.abstract}</p>
            </details>
          ) : (
            <>
              <p>{paper.summary}</p>
              {paper.href && (
                <Link href={paper.href} className="room-text-link">
                  Read the article ↗
                </Link>
              )}
            </>
          )}
        </article>
      ))}
    </>
  );
}

function JudgingCollection() {
  return (
    <>
      <p className="room-intro">
        A seat on the other side of the table. Supporting thoughtful research,
        original ideas, and the next generation of builders.
      </p>
      {judgeExperiences.map((experience) => (
        <article key={experience.title} className="room-judge-card">
          <div className="judge-card-heading">
            <span>⚖</span>
            <div>
              <span className="room-eyebrow">
                {experience.date || "Judging & service"}
              </span>
              <h3>{experience.title}</h3>
            </div>
          </div>
          <p>{experience.description}</p>
          {!!experience.details?.length && (
            <ul>
              {experience.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          )}
          {experience.image && (
            <a
              className="room-text-link"
              href={experience.image}
              target="_blank"
              rel="noreferrer"
            >
              View supporting document ↗
            </a>
          )}
        </article>
      ))}
      <Link href="/judge" className="room-page-link">
        Open all judging experience ↗
      </Link>
    </>
  );
}

function OpenSourceCollection() {
  return (
    <>
      <p className="room-intro">
        A window into what I’m building in the open. Ideas grow a little further
        when other people can join in.
      </p>
      {openSourceProjects.map((project) => (
        <article key={project.title} className="room-open-source">
          <span className="repo-illustration">
            ⌘<span>↗</span>
          </span>
          <span className="room-eyebrow">Featured open-source project</span>
          <h3>{project.title}</h3>
          <p>{project.summary}</p>
          <div className="project-tools">
            {project.stack.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
          <a
            href={project.href}
            className="room-button"
            target="_blank"
            rel="noreferrer"
          >
            Explore the repository ↗
          </a>
        </article>
      ))}
      <a
        href="https://github.com/luxinlabs"
        target="_blank"
        rel="noreferrer"
        className="room-page-link"
      >
        More from my GitHub ↗
      </a>
    </>
  );
}

export default function RoomPanel({
  active,
  onClose,
  onSwitch,
  messages,
  setMessages,
}: {
  active: RoomSection;
  onClose: () => void;
  onSwitch: (section: RoomSection) => void;
  messages: ChatTurn[];
  setMessages: Dispatch<SetStateAction<ChatTurn[]>>;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [aboutTab, setAboutTab] = useState<"chat" | "bio">("chat");
  const spot = houseSpots.find((item) => item.id === active)!;
  useEffect(() => {
    dialog.current?.showModal();
  }, []);
  useEffect(() => {
    const body = dialog.current?.querySelector(".room-panel-body");
    body?.scrollTo(0, 0);
  }, [active]);

  return (
    <dialog
      ref={dialog}
      className="room-panel"
      aria-labelledby="room-panel-heading"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const bounds = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < bounds.left ||
            event.clientY < bounds.top ||
            event.clientX > bounds.right ||
            event.clientY > bounds.bottom
          )
            dialog.current?.close();
        }
      }}
    >
      <div className="room-panel-header">
        <div>
          <span className="room-eyebrow">{spot.icon} A corner of my world</span>
          <h2 id="room-panel-heading">{spot.title}</h2>
        </div>
        <button
          className="room-close"
          onClick={() => dialog.current?.close()}
          aria-label="Close details and return to the house"
        >
          ×
        </button>
      </div>
      <div
        className={`room-panel-body ${active === "about" && aboutTab === "chat" ? "room-panel-chat-body" : ""}`}
      >
        {active === "about" && (
          <>
            <div className="about-tabs" role="tablist" aria-label="Meet Luxin">
              <button
                role="tab"
                aria-selected={aboutTab === "chat"}
                aria-controls="about-chat"
                id="chat-tab"
                onClick={() => setAboutTab("chat")}
              >
                Have a little chat
              </button>
              <button
                role="tab"
                aria-selected={aboutTab === "bio"}
                aria-controls="about-bio"
                id="bio-tab"
                onClick={() => setAboutTab("bio")}
              >
                The person behind it
              </button>
            </div>
            {aboutTab === "chat" ? (
              <div
                id="about-chat"
                role="tabpanel"
                aria-labelledby="chat-tab"
                className="host-chat-container"
              >
                <HostChat messages={messages} setMessages={setMessages} />
              </div>
            ) : (
              <div
                id="about-bio"
                role="tabpanel"
                aria-labelledby="bio-tab"
                className="room-bio"
              >
                <Image
                  src="/profile_luxin1.jpg"
                  alt="Luxin Zhang"
                  width={120}
                  height={120}
                />
                <h3>Luxin Zhang</h3>
                <span className="room-eyebrow">
                  Software / AI Engineer & Researcher
                </span>
                <AboutMeContent />
                <Link href="/bio" className="room-page-link">
                  The full story: experience & education ↗
                </Link>
                <Link href="/research" className="room-text-link">
                  Official researcher profile ↗
                </Link>
              </div>
            )}
          </>
        )}
        {active === "projects" && <ProjectCollection />}
        {active === "awards" && <ProjectCollection awards />}
        {active === "research" && <ResearchCollection />}
        {active === "judge" && <JudgingCollection />}
        {active === "open-source" && <OpenSourceCollection />}
        {active === "travel" && <TravelGlobe />}
        {active === "garden" && (
          <div className="room-garden">
            <span className="garden-flower">❋</span>
            <p className="room-eyebrow">A pause between ideas</p>
            <h3>
              Good things grow
              <br />
              in good company.
            </h3>
            <p>
              I’m looking to connect with fellow builders, accelerator teams,
              and investors who share the ambition to turn emerging AI
              capabilities into products with global impact.
            </p>
            <p>
              Have a bold idea, a question, or just a little hello? There’s room
              on this bench.
            </p>
            <a href="mailto:philomela.zhang@gmail.com" className="room-button">
              Say hello ↗
            </a>
            <a
              href="https://www.linkedin.com/in/luxin-zhang-96777b192/"
              className="room-text-link"
              target="_blank"
              rel="noreferrer"
            >
              Find me on LinkedIn ↗
            </a>
          </div>
        )}
      </div>
      <div className="room-panel-footer">
        <span>Another little corner?</span>
        <div>
          {houseSpots
            .filter((item) => item.id !== active)
            .map((item) => (
              <button
                key={item.id}
                onClick={() => onSwitch(item.id)}
                aria-label={`Open ${item.object}`}
                title={item.object}
              >
                {item.icon}
              </button>
            ))}
        </div>
      </div>
    </dialog>
  );
}
