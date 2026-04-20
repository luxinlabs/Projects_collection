"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { Project } from "../../Project";
import ProjectCard from "../../ProjectCard";
import SidebarNav from "../../SidebarNav";

import projectData from "../../projects.json" assert { type: "json" };

import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

interface ProjectData {
  [key: string]: Project;
}

interface CategorizedProjectData {
  [category: string]: ProjectData;
}

const categorizedProjects: CategorizedProjectData = projectData;

export default function CategoryPage() {
  const params = useParams();
  const categoryName = decodeURIComponent(params.categoryName as string);

  const projects = categorizedProjects[categoryName];

  if (!projects) {
    return (
      <div className="theme-page min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
          <Link href="/" className="underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="theme-page min-h-screen pt-16 md:pt-0">
      <SidebarNav />

      {/* Header */}
      <div className="theme-surface sticky top-0 z-30 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-4">
            <Link
              href="/"
              className="theme-toggle inline-flex items-center justify-center h-9 w-9 rounded-full transition-colors"
              aria-label="Back to home"
            >
              ←
            </Link>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 mb-6 text-lg font-semibold hover:opacity-75 transition-opacity"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Back to All Projects
          </Link>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <h1 className="text-4xl md:text-5xl font-bold">{categoryName}</h1>
            <div className="theme-surface-2 px-6 py-3 rounded-full border theme-border font-semibold text-xl">
              {Object.keys(projects).length}{" "}
              {Object.keys(projects).length === 1 ? "Project" : "Projects"}
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Object.entries(projects).map(([id, project]) => (
            <div
              key={id}
              className="theme-surface rounded-2xl p-4 border theme-border shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="text-center text-base font-bold pb-3 line-clamp-2 min-h-[3rem]">
                {project.name}
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <ProjectCard id={id} project={project} />
              </div>
              {/* Tech Stack Preview */}
              <div className="mt-3 flex flex-wrap gap-1 justify-center">
                {project.tools.slice(0, 3).map((tool, idx) => (
                  <span
                    key={idx}
                    className="theme-surface-2 border theme-border text-xs px-2 py-1 rounded-full"
                  >
                    {tool}
                  </span>
                ))}
                {project.tools.length > 3 && (
                  <span className="theme-toggle text-xs px-2 py-1 rounded-full font-semibold">
                    +{project.tools.length - 3}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
