"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ProjectCard from "../ProjectCard";
import { Project } from "../Project";
import projectData from "../projects.json";
import SidebarNav from "../SidebarNav";

interface ProjectData {
  [key: string]: Project;
}

interface CategorizedProjectData {
  [category: string]: ProjectData;
}

const categorizedProjects: CategorizedProjectData = projectData;

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...Object.keys(categorizedProjects)];

  const filteredProjects = useMemo(() => {
    let filtered: { [key: string]: { [key: string]: Project } } = {};

    Object.entries(categorizedProjects).forEach(([category, projects]) => {
      if (selectedCategory === "All" || selectedCategory === category) {
        const categoryFiltered: { [key: string]: Project } = {};

        Object.entries(projects).forEach(([id, project]) => {
          const matchesSearch =
            searchQuery === "" ||
            project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            project.tools.some((tool) =>
              tool.toLowerCase().includes(searchQuery.toLowerCase()),
            );

          if (matchesSearch) {
            categoryFiltered[id] = project;
          }
        });

        if (Object.keys(categoryFiltered).length > 0) {
          filtered[category] = categoryFiltered;
        }
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory]);

  return (
    <div className="theme-page min-h-screen pt-16 md:pt-0">
      <SidebarNav />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link
            href="/"
            className="theme-toggle inline-flex items-center justify-center h-9 w-9 rounded-full transition-colors"
            aria-label="Back to home"
          >
            ←
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-widest theme-muted mb-2">
            Professional Website
          </p>
          <h1 className="text-5xl font-bold mb-4">All Projects</h1>
          <p className="text-xl theme-muted">
            Explore my complete portfolio of AI, full-stack, and research
            projects across multiple domains
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="max-w-4xl mx-auto mb-12">
          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search projects by name, description, or technology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="theme-input w-full px-6 py-4 rounded-full text-lg focus:outline-none"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? "theme-toggle scale-105"
                    : "theme-nav-link"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid by Category */}
        <div className="space-y-16">
          {Object.entries(filteredProjects).map(([category, projects]) => {
            const projectCount = Object.keys(projects).length;

            return (
              <div key={category}>
                <div className="theme-surface mb-6 flex items-center justify-between rounded-2xl border theme-border px-4 py-4 md:px-6">
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {category} Projects
                  </h2>
                  <span className="theme-surface-2 rounded-full border theme-border px-3 py-1 text-sm font-semibold">
                    {projectCount} Project{projectCount > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {Object.entries(projects).map(([id, project]) => (
                    <ProjectCard key={id} id={id} project={project} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results Message */}
        {Object.keys(filteredProjects).length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl theme-muted">
              No projects found matching your criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
