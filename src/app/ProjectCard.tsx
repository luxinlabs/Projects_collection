import Link from "next/link";
import Image from "next/image";
import { getProjectAwards } from "./projectAwards";
import type { Project } from "./Project";

export default function ProjectCard({
  id,
  project,
}: {
  id: string;
  project: Project;
}) {
  const href = `/projects/${encodeURIComponent(id)}`;
  return (
    <article className="portfolio-card">
      <Link
        href={href}
        className="portfolio-card-image"
        aria-label={`Explore ${project.name}`}
      >
        <Image
          src={project.imagePath}
          alt={project.name}
          fill
          sizes="(max-width:640px) 90vw,(max-width:1024px) 45vw,25vw"
        />
      </Link>
      <div className="portfolio-card-copy">
        {getProjectAwards(project).map((award) => (
          <p key={award} className="portfolio-card-award">
            {award}
          </p>
        ))}
        <h3>
          <Link href={href}>{project.name}</Link>
        </h3>
        <p className="line-clamp-3">{project.description}</p>
        <div className="portfolio-card-tools">
          {project.tools.slice(0, 4).map((tool) => (
            <span key={tool}>{tool}</span>
          ))}
        </div>
        <Link href={href} className="portfolio-card-link">
          Step into the project ↗
        </Link>
      </div>
    </article>
  );
}
