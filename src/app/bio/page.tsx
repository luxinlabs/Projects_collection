"use client";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faFile } from "@fortawesome/free-solid-svg-icons";
import profile_picture from "public/profile_luxin1.jpg";
import SidebarNav from "../SidebarNav";
import AboutMeContent from "../AboutMeContent";

import { activitiesData, educationData, workExperienceData } from "./content";

export default function BioPage() {
  return (
    <div className="theme-page min-h-screen pt-16 md:pt-0">
      <SidebarNav />

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="mb-8">
          <Link
            href="/"
            className="theme-toggle inline-flex items-center justify-center h-9 w-9 rounded-full transition-colors"
            aria-label="Back to home"
          >
            ←
          </Link>
        </div>

        {/* Header with Profile */}
        <div className="flex flex-col items-center mb-16">
          <div className="relative w-48 h-48 rounded-full overflow-hidden mb-6 shadow-2xl">
            <Image
              src={profile_picture}
              alt="Profile Picture"
              fill={true}
              style={{ objectFit: "cover" }}
              priority={true}
            />
          </div>
          <h1 className="text-5xl font-bold mb-4">Luxin Zhang</h1>
          <p className="text-xl theme-muted mb-6">
            Software / AI Engineer
          </p>

          {/* Social Links */}
          <div className="flex gap-4 mb-8">
            <a
              href="https://github.com/luxinlabs"
              target="_blank"
              className="group relative"
            >
              <div className="relative bg-gray-800/80 backdrop-blur-sm p-3 rounded-full border-2 border-gray-600 hover:border-gray-400 hover:bg-gray-700/80 transition-all duration-300 hover:scale-110 shadow-lg">
                <FontAwesomeIcon
                  icon={faGithub}
                  size="lg"
                  className="text-white"
                />
              </div>
            </a>
            <a
              href="https://www.linkedin.com/in/luxin-zhang-902/"
              target="_blank"
              className="group relative"
            >
              <div className="relative bg-gray-800/80 backdrop-blur-sm p-3 rounded-full border-2 border-gray-600 hover:border-gray-400 hover:bg-gray-700/80 transition-all duration-300 hover:scale-110 shadow-lg">
                <FontAwesomeIcon
                  icon={faLinkedin}
                  size="lg"
                  className="text-white"
                />
              </div>
            </a>
            <a href="mailto:luxin.zhang@duke.edu" className="group relative">
              <div className="relative bg-gray-800/80 backdrop-blur-sm p-3 rounded-full border-2 border-gray-600 hover:border-gray-400 hover:bg-gray-700/80 transition-all duration-300 hover:scale-110 shadow-lg">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  size="lg"
                  className="text-white"
                />
              </div>
            </a>
            <a href="SDE_AI_20260414.pdf" className="group relative">
              <div className="relative bg-gray-800/80 backdrop-blur-sm p-3 rounded-full border-2 border-gray-600 hover:border-gray-400 hover:bg-gray-700/80 transition-all duration-300 hover:scale-110 shadow-lg">
                <FontAwesomeIcon
                  icon={faFile}
                  size="lg"
                  className="text-white"
                />
              </div>
            </a>
          </div>

          {/* About Me */}
          <div className="theme-surface max-w-4xl w-full rounded-2xl border theme-border p-6 md:p-8 text-center shadow-xl">
            <h2 className="text-3xl font-bold mb-4">About Me</h2>
            <AboutMeContent />
            <Link
              href="/research"
              className="theme-toggle inline-flex items-center rounded-xl px-5 py-3 mt-8 font-semibold transition-colors"
            >
              View My Research Profile →
            </Link>

            {/* Section Navigation */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8 text-left">
              <a
                href="#work-experience"
                className="theme-nav-link group flex items-center justify-between rounded-xl px-4 py-3 transition-all"
              >
                <span className="text-sm font-semibold">Work Experience</span>
                <span className="text-lg group-hover:translate-y-0.5 transition-transform">
                  ↓
                </span>
              </a>
              <a
                href="#education"
                className="theme-nav-link group flex items-center justify-between rounded-xl px-4 py-3 transition-all"
              >
                <span className="text-sm font-semibold">Education</span>
                <span className="text-lg group-hover:translate-y-0.5 transition-transform">
                  ↓
                </span>
              </a>
              <a
                href="#activities"
                className="theme-nav-link group flex items-center justify-between rounded-xl px-4 py-3 transition-all"
              >
                <span className="text-sm font-semibold">Activities</span>
                <span className="text-lg group-hover:translate-y-0.5 transition-transform">
                  ↓
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Work Experience Timeline */}
        <div id="work-experience" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Work Experience
          </h2>
          <div className="relative ml-2 border-l theme-border pl-6 md:pl-8 space-y-5">
            {workExperienceData.map((item) => (
              <div
                key={`${item.company}-${item.startDate}`}
                className="theme-surface relative rounded-2xl border theme-border p-5 md:p-6 shadow-lg"
              >
                <div className="theme-surface-2 absolute -left-[1.98rem] top-6 h-3.5 w-3.5 rounded-full border-2 theme-border"></div>
                <div className="theme-surface-2 inline-flex rounded-full border theme-border px-3 py-1 text-xs font-medium mb-3">
                  {item.startDate} - {item.endDate}
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-1">
                  {item.company}
                </h3>
                <p className="text-base md:text-lg font-semibold mb-1">
                  {item.role}
                </p>
                <p className="text-sm theme-muted mb-3">{item.location}</p>
                <ul className="text-sm space-y-2 list-disc list-inside marker:text-current">
                  {item.highlights.map((highlight, hIndex) => (
                    <li key={hIndex}>{highlight}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education Timeline */}
        <div id="education" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Education
          </h2>
          <div className="relative ml-2 border-l theme-border pl-6 md:pl-8 space-y-5">
            {educationData.map((item, index) => (
              <div
                key={index}
                className="theme-surface relative rounded-2xl border theme-border p-5 md:p-6 shadow-lg"
              >
                <div className="theme-surface-2 absolute -left-[1.98rem] top-6 h-3.5 w-3.5 rounded-full border-2 theme-border"></div>
                <div className="theme-surface-2 inline-flex rounded-full border theme-border px-3 py-1 text-xs font-medium mb-3">
                  {item.startDate} - {item.endDate}
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-1">
                  {item.institution}
                </h3>
                <p className="text-base md:text-lg font-semibold mb-1">
                  {item.degree}
                </p>
                <p className="text-sm theme-muted mb-3">{item.location}</p>
                {item.honors && item.honors.length > 0 && (
                  <div>
                    <p className="font-semibold text-sm mb-2 theme-muted">
                      Honors & Awards
                    </p>
                    <ul className="text-sm space-y-1 list-disc list-inside marker:text-current">
                      {item.honors.map((honor, i) => (
                        <li key={i}>{honor}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Other Activities Timeline */}
        <div id="activities" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Other Activities
          </h2>
          <div className="relative ml-2 border-l theme-border pl-6 md:pl-8 space-y-5">
            {activitiesData.map((item) => (
              <div
                key={`${item.organization}-${item.startDate}`}
                className="theme-surface relative rounded-2xl border theme-border p-5 md:p-6 shadow-lg"
              >
                <div className="theme-surface-2 absolute -left-[1.98rem] top-6 h-3.5 w-3.5 rounded-full border-2 theme-border"></div>
                <div className="theme-surface-2 inline-flex rounded-full border theme-border px-3 py-1 text-xs font-medium mb-3">
                  {item.startDate} - {item.endDate}
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-1">
                  {item.organization}
                </h3>
                <p className="text-base md:text-lg font-semibold mb-1">
                  {item.role}
                </p>
                {item.location && (
                  <p className="text-sm theme-muted mb-3">{item.location}</p>
                )}
                <ul className="text-sm space-y-2 list-disc list-inside marker:text-current">
                  {item.highlights.map((highlight, hIndex) => (
                    <li key={hIndex}>{highlight}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
