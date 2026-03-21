"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { faArrowLeft, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { Project } from "../../Project";
import ProjectCard from "../../ProjectCard";

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
  
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  if (!mounted) return null;

  const projects = categorizedProjects[categoryName];

  if (!projects) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
      }`}>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
          <Link href="/" className="text-emerald-500 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
    }`}>
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 z-50 p-3 rounded-xl border-2 border-black shadow-lg transition-all duration-300 hover:scale-110 ${
          isDarkMode 
            ? 'bg-white text-black hover:bg-gray-100' 
            : 'bg-black text-white hover:bg-gray-800'
        }`}
      >
        <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} size="lg" />
      </button>

      {/* Header */}
      <div className={`sticky top-0 z-40 shadow-lg ${
        isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Link 
            href="/#projects"
            className={`inline-flex items-center gap-2 mb-6 text-lg font-semibold transition-colors ${
              isDarkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'
            }`}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Back to All Projects
          </Link>
          
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              {categoryName}
            </h1>
            <div className={`px-6 py-3 rounded-full font-semibold text-xl ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`}>
              {Object.keys(projects).length} {Object.keys(projects).length === 1 ? 'Project' : 'Projects'}
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
              className={`rounded-2xl p-4 border-2 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 ${
                isDarkMode 
                  ? 'border-gray-600 bg-gray-700 hover:border-emerald-400' 
                  : 'border-gray-300 bg-white hover:border-emerald-500'
              }`}
            >
              <div className={`text-center text-base font-bold pb-3 line-clamp-2 min-h-[3rem] ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>
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
                        ? 'bg-gray-600 text-gray-200' 
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {tool}
                  </span>
                ))}
                {project.tools.length > 3 && (
                  <span 
                    className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      isDarkMode 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-emerald-500 text-white'
                    }`}
                  >
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
