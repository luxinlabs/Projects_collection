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

  const path = project.imagePath;

  return (
    <div className="p-1 pt-16 md:pt-0">
      <SidebarNav />

      <title>{project.name}</title>
      <div className="max-w-[1200px] mx-auto px-4 pt-6">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-slate-300 text-slate-700 hover:text-black hover:border-emerald-500 transition-colors"
            aria-label="Back to home"
          >
            ←
          </Link>
          <Link
            href="/projects"
            className="text-emerald-600 hover:text-emerald-500 font-semibold"
          >
            Back to Projects
          </Link>
        </div>
      </div>

      <div id="title" className="flex flex-row justify-center p-10">
        <h1 className="text-5xl">{project.name}</h1>
      </div>
      <div id="content-wrapper" className="flex flex-row justify-center">
        <div
          id="content"
          className="flex flex-row w-screen justify-center flex-wrap max-w-[1200px]"
        >
          <div
            id="picture"
            className="rounded-2xl overflow-hidden flex flex-row justify-center relative xl:w-[500px] xl:h-[500px] w-[400px] max-w-[500px] h-[400px] mx-5"
          >
            <Image
              src={path}
              alt="Picture"
              fill={true}
              priority={true}
              sizes="(min-width: 1280 px) 500px, 400px"
              style={{ objectFit: "cover" }}
            ></Image>
          </div>
          <div
            id="information"
            className="max-w-[500px] flex flex-col justify-between mx-5"
          >
            {project.award && (
              <div className="mb-4 flex justify-center">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg border border-yellow-300/50 inline-block">
                  {project.award}
                </div>
              </div>
            )}
            <h2 className="text-center text-3xl pb-4">Description</h2>
            <p className="px-2">{project.description}</p>
            <h2 className="text-center text-3xl py-2">Tools Used</h2>
            <div id="tools" className="flex flex-row flex-wrap">
              {project.tools.map((tool: string) => (
                <TechChip key={tool} name={tool} />
              ))}
            </div>
            <h2 className="text-center text-3xl py-2">Links</h2>
            <div id="tools" className="flex flex-row flex-wrap justify-around">
              {Object.entries(project.links).map(([linkName, link]) => (
                <a key={linkName} href={link} target="_blank">
                  <LinkChip name={linkName} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
