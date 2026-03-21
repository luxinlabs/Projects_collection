"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";

import profile_picture from "public/profile_luxin1.jpg";

import {
  faEnvelope,
  faFile,
  faMoon,
  faSun,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { Project } from "./Project";
import ProjectCard from "./ProjectCard";
import Arrow from "./Arrow";

import projectData from "./projects.json" assert { type: "json" };

import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

interface ProjectData {
  [key: string]: Project;
}

interface CategorizedProjectData {
  [category: string]: ProjectData;
}

const categorizedProjects: CategorizedProjectData = projectData;

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  const filteredProjects = useMemo(() => {
    if (!searchQuery && !selectedCategory) return categorizedProjects;

    const filtered: CategorizedProjectData = {};

    Object.entries(categorizedProjects).forEach(([category, projects]) => {
      if (selectedCategory && category !== selectedCategory) return;

      const matchingProjects: ProjectData = {};
      Object.entries(projects).forEach(([id, project]) => {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch =
          !searchQuery ||
          project.name.toLowerCase().includes(searchLower) ||
          project.description.toLowerCase().includes(searchLower) ||
          project.tools.some((tool) =>
            tool.toLowerCase().includes(searchLower),
          );

        if (matchesSearch) {
          matchingProjects[id] = project;
        }
      });

      if (Object.keys(matchingProjects).length > 0) {
        filtered[category] = matchingProjects;
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory]);

  const totalProjects = useMemo(() => {
    return Object.values(filteredProjects).reduce(
      (sum, projects) => sum + Object.keys(projects).length,
      0,
    );
  }, [filteredProjects]);

  if (!mounted) return null;
  return (
    <div
      id="index_wrapper"
      className={`flex flex-col w-screen items-center transition-colors duration-500 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 z-50 p-3 rounded-xl border-2 border-black shadow-lg transition-all duration-300 hover:scale-110 ${
          isDarkMode
            ? "bg-white text-black hover:bg-gray-100"
            : "bg-black text-white hover:bg-gray-800"
        }`}
      >
        <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} size="lg" />
      </button>

      <div
        id="main_content"
        className="flex flex-col mt-5 md:mt-0 max-w-3xl h-fit md:h-[80vh] items-center justify-center"
      >
        <div
          id="picture_name_links"
          className="flex flex-row flex-wrap justify-center"
        >
          <div id="picture" className="rounded-2xl">
            <Image
              title="Picture"
              src={profile_picture}
              alt="Profile Picture"
              priority={true}
              className="rounded-2xl w-52 md:w-80"
            />
          </div>
          <div id="name_links" className="py-2 px-5 flex flex-col items-center">
            <div
              id="name"
              className="text-center text-5xl md:text-9xl md:text-left w-80"
            >
              Luxin Zhang
            </div>
            <div
              id="links"
              className={`w-52 md:w-full m-2 flex flex-row justify-between rounded-xl border-4 p-2 md:p-5 ${
                isDarkMode ? "border-white" : "border-black"
              }`}
            >
              <a href="https://www.linkedin.com/in/luxin-zhang-96777b192/">
                <FontAwesomeIcon
                  icon={faLinkedin}
                  size="2x"
                  className={`transition ${
                    isDarkMode
                      ? "text-white hover:text-emerald-300"
                      : "text-black hover:text-emerald-300"
                  }`}
                />
              </a>
              <a href="https://github.com/luxinlabs">
                <FontAwesomeIcon
                  icon={faGithub}
                  size="2x"
                  className={`transition ${
                    isDarkMode
                      ? "text-white hover:text-emerald-300"
                      : "text-black hover:text-emerald-300"
                  }`}
                />
              </a>
              <a href="mailto:philomela.zhang@gmail.com">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  size="2x"
                  className={`transition ${
                    isDarkMode
                      ? "text-white hover:text-emerald-300"
                      : "text-black hover:text-emerald-300"
                  }`}
                />
              </a>
              <a href="SDE_Luxin_1027.pdf">
                <FontAwesomeIcon
                  icon={faFile}
                  size="2x"
                  className={`transition ${
                    isDarkMode
                      ? "text-white hover:text-emerald-300"
                      : "text-black hover:text-emerald-300"
                  }`}
                />
              </a>
            </div>
          </div>
        </div>
        <div id="about_text" className="px-4 text-left w-full md:pt-4">
          <hr
            className={`border-2 w-full my-1 ${
              isDarkMode ? "border-white" : "border-black"
            }`}
          />
          Hi! I&apos;m an MEng in Electrical & Computer Engineering (ECE)
          student at Duke. I am focused on full-stack development, web
          application development, and I also have experience in image
          algorithms(clarity, sharpness, noise), and AI algorithms. I enjoy
          exploring cutting-edge technologies! Please feel free to explore some
          of my past projects!
          <hr
            className={`border-2 w-full my-1 ${
              isDarkMode ? "border-white" : "border-black"
            }`}
          />
        </div>
      </div>
      <div
        id="down_arrow"
        className="flex flex-row justify-center my-3 h-fit md:h-[20vh]"
      >
        <Arrow />
      </div>
      <div
        id="projects"
        className="flex flex-col items-center w-full px-4 pb-20"
      >
        <div
          className={`w-full py-12 mb-8 sticky top-0 z-40 shadow-lg ${
            isDarkMode ? "bg-gray-800" : "bg-gray-50"
          }`}
        >
          <h2 className="text-center w-full mb-6 text-5xl font-bold">
            My Projects
          </h2>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6 px-4">
            <div
              className={`relative flex items-center rounded-xl border-2 overflow-hidden transition-all duration-300 ${
                isDarkMode
                  ? "border-white bg-gray-700"
                  : "border-black bg-white"
              }`}
            >
              <FontAwesomeIcon
                icon={faSearch}
                className={`absolute left-4 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <input
                type="text"
                placeholder="Search projects by name, description, or technology..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full py-3 pl-12 pr-12 text-lg outline-none ${
                  isDarkMode
                    ? "bg-gray-700 text-white placeholder-gray-400"
                    : "bg-white text-black placeholder-gray-500"
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className={`absolute right-4 p-1 rounded-full transition-all duration-200 hover:scale-110 ${
                    isDarkMode
                      ? "hover:bg-gray-600 text-gray-400"
                      : "hover:bg-gray-200 text-gray-500"
                  }`}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              )}
            </div>
            <div className="text-center mt-2 text-sm font-semibold">
              {totalProjects} {totalProjects === 1 ? "project" : "projects"}{" "}
              found
            </div>
          </div>

          {/* Category Tabs - Horizontal Scroll */}
          <div className="w-full overflow-x-auto pb-4">
            <div
              className="flex justify-center gap-3 min-w-max px-4 mx-auto"
              style={{ width: "fit-content" }}
            >
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-6 py-3 rounded-xl border-2 font-semibold transition-all duration-300 hover:scale-105 whitespace-nowrap ${
                  selectedCategory === null
                    ? isDarkMode
                      ? "bg-white text-black border-white"
                      : "bg-black text-white border-black"
                    : isDarkMode
                      ? "border-white bg-transparent text-white hover:bg-white hover:text-black"
                      : "border-black bg-transparent text-black hover:bg-black hover:text-white"
                }`}
              >
                All Categories
              </button>
              {Object.keys(categorizedProjects).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  onMouseEnter={() => setHoveredCategory(category)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  className={`px-6 py-3 rounded-xl border-2 font-semibold transition-all duration-300 hover:scale-105 whitespace-nowrap relative ${
                    selectedCategory === category
                      ? isDarkMode
                        ? "bg-white text-black border-white"
                        : "bg-black text-white border-black"
                      : isDarkMode
                        ? "border-white bg-transparent text-white hover:bg-white hover:text-black"
                        : "border-black bg-transparent text-black hover:bg-black hover:text-white"
                  }`}
                >
                  {category}
                  <span
                    className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                      selectedCategory === category
                        ? isDarkMode
                          ? "bg-black text-white"
                          : "bg-white text-black"
                        : isDarkMode
                          ? "bg-gray-700"
                          : "bg-gray-200"
                    }`}
                  >
                    {Object.keys(categorizedProjects[category]).length}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
        {Object.entries(filteredProjects).length === 0 ? (
          <div
            className={`text-center py-20 px-4 rounded-3xl shadow-2xl max-w-2xl ${
              isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No projects found</h3>
            <p className="text-lg">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          Object.entries(filteredProjects).map(
            ([category, projects], categoryIndex) => (
              <div
                key={category}
                id={category.toLowerCase().replace(/\s+/g, "-")}
                className="w-full max-w-[1800px] mb-16 scroll-mt-32"
              >
                {/* Category Header */}
                <div
                  className={`mb-6 p-6 rounded-2xl border-2 shadow-lg transition-all duration-300 ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-600"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <h3 className="text-3xl md:text-4xl font-bold">
                      {category}
                    </h3>
                    <div
                      className={`px-4 py-2 rounded-full font-semibold text-lg ${
                        isDarkMode ? "bg-gray-700" : "bg-gray-100"
                      }`}
                    >
                      {Object.keys(projects).length}{" "}
                      {Object.keys(projects).length === 1
                        ? "Project"
                        : "Projects"}
                    </div>
                  </div>
                </div>

                {/* Projects Grid - Responsive: 1 col mobile, 2 cols tablet, 3-4 cols desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {Object.entries(projects).map(
                    ([id, project], projectIndex) => (
                      <div
                        key={id}
                        className={`rounded-2xl p-4 border-2 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 ${
                          isDarkMode
                            ? "border-gray-600 bg-gray-700 hover:border-emerald-400"
                            : "border-gray-300 bg-white hover:border-emerald-500"
                        }`}
                      >
                        <div
                          className={`text-center text-base font-bold pb-3 line-clamp-2 min-h-[3rem] ${
                            isDarkMode ? "text-white" : "text-black"
                          }`}
                        >
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
                              className={`text-xs px-2 py-1 rounded-full ${
                                isDarkMode
                                  ? "bg-gray-600 text-gray-200"
                                  : "bg-gray-200 text-gray-700"
                              }`}
                            >
                              {tool}
                            </span>
                          ))}
                          {project.tools.length > 3 && (
                            <span
                              className={`text-xs px-2 py-1 rounded-full font-semibold ${
                                isDarkMode
                                  ? "bg-emerald-600 text-white"
                                  : "bg-emerald-500 text-white"
                              }`}
                            >
                              +{project.tools.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            ),
          )
        )}
      </div>
    </div>
  );
}
