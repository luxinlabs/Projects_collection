import Image from "next/image";

import projectData from "../../projects.json" assert { type: "json" };
import Link from "next/link";
import TechChip from "./TechChip";
import SidebarNav from "../../SidebarNav";

import { Project } from "../../Project";
import LinkChip from "./LinkChip";

import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

interface ProjectPageProps {
  params: {
    projectName: string;
  };
}

interface ProjectData {
  [key: string]: Project;
}

interface CategorizedProjectData {
  [category: string]: ProjectData;
}

// Flatten the categorized projects into a single object
function flattenProjects(categorizedData: CategorizedProjectData): ProjectData {
  const flattened: ProjectData = {};
  Object.values(categorizedData).forEach((category) => {
    Object.entries(category).forEach(([id, project]) => {
      flattened[id] = project;
    });
  });
  return flattened;
}

const categorizedProjects: CategorizedProjectData = projectData;
const projects: ProjectData = flattenProjects(categorizedProjects);

interface ProjectName {
  projectName: string;
}

export async function generateStaticParams() {
  const namesDict: ProjectName[] = Object.keys(projects).map((p, i) => ({
    projectName: p,
  }));
  return namesDict;
}

export async function generateMetadata(
  { params }: ProjectPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const id = params.projectName;
  const project = projects[id];

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project does not exist.",
    };
  }

  return {
    title: project.name,
    description: project.description,
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const id = params.projectName;
  const project = projects[id];

  if (!project) {
    notFound();
  }

  return (
    <main className="theme-page project-detail-page min-h-screen">
      <SidebarNav />
      <div className="max-w-6xl mx-auto px-6 pt-6 flex items-center gap-4">
        <Link
          href="/"
          className="theme-toggle inline-flex items-center justify-center h-10 w-10 rounded-full"
          aria-label="Back to the little home"
        >
          ⌂
        </Link>
        <Link href="/projects" className="theme-accent text-sm">
          The project collection ↗
        </Link>
      </div>
      <div id="title">
        <p className="text-center text-xs uppercase tracking-widest theme-muted mb-4">
          From an idea to something real
        </p>
        <h1>{project.name}</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto px-6 pb-8">
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden border theme-border theme-surface-2">
          <Image
            src={project.imagePath}
            alt={project.name}
            fill
            priority
            sizes="(min-width:1024px) 550px,90vw"
            className="object-contain"
          />
        </div>
        <section
          id="information"
          className="theme-surface rounded-2xl border theme-border p-6 md:p-8 flex flex-col"
        >
          {project.award && (
            <p className="theme-award rounded-xl p-4 text-sm">
              {project.award}
            </p>
          )}
          <h2>Description</h2>
          <p>{project.description}</p>
          <h2>Made with</h2>
          <div id="tools" className="flex flex-wrap">
            {project.tools.map((tool) => (
              <TechChip key={tool} name={tool} />
            ))}
          </div>
          <h2>Take a closer look</h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(project.links)
              .filter(([, href]) => href)
              .map(([name, href]) => (
                <a key={name} href={href} target="_blank" rel="noreferrer">
                  <LinkChip name={name} />
                </a>
              ))}
          </div>
        </section>
      </div>
    </main>
  );
}
