"use client";

import Image from "next/image";
import Link from "next/link";

import profile_picture from "public/profile_luxin1.jpg";

import { faEnvelope, faFile } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";

import Arrow from "./Arrow";
import SidebarNav from "./SidebarNav";

import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export default function Home() {
  return (
    <div
      id="index_wrapper"
      className="theme-page flex flex-col w-screen items-center pt-16 md:pt-0"
    >
      <SidebarNav />

      {/* Hero Section with Full-Screen Background */}
      <div
        id="hero_section"
        className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/Golden Bridge.png"
            alt="Golden Gate Bridge Background"
            fill={true}
            priority={true}
            style={{ objectFit: "cover" }}
            className="brightness-90"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-20 text-center">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight">
            Luxin Zhang
          </h1>

          <p className="text-lg md:text-2xl text-gray-100 leading-relaxed max-w-3xl mx-auto mb-8">
            I build secure, production-grade AI systems and full-stack products
            focused on reliability, execution, and real-world impact.
          </p>

          <div className="flex flex-row justify-center gap-4 mb-8">
            <a
              href="https://www.linkedin.com/in/luxin-zhang-96777b192/"
              className="group relative"
            >
              <div className="relative bg-gray-800/80 backdrop-blur-sm p-4 rounded-full border-2 border-gray-600 hover:border-gray-400 hover:bg-gray-700/80 transition-all duration-300 hover:scale-110 shadow-lg">
                <FontAwesomeIcon
                  icon={faLinkedin}
                  size="2x"
                  className="text-white"
                />
              </div>
            </a>
            <a href="https://github.com/luxinlabs" className="group relative">
              <div className="relative bg-gray-800/80 backdrop-blur-sm p-4 rounded-full border-2 border-gray-600 hover:border-gray-400 hover:bg-gray-700/80 transition-all duration-300 hover:scale-110 shadow-lg">
                <FontAwesomeIcon
                  icon={faGithub}
                  size="2x"
                  className="text-white"
                />
              </div>
            </a>
            <a
              href="mailto:philomela.zhang@gmail.com"
              className="group relative"
            >
              <div className="relative bg-gray-800/80 backdrop-blur-sm p-4 rounded-full border-2 border-gray-600 hover:border-gray-400 hover:bg-gray-700/80 transition-all duration-300 hover:scale-110 shadow-lg">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  size="2x"
                  className="text-white"
                />
              </div>
            </a>
            <a href="SDE_AI_20260414.pdf" className="group relative">
              <div className="relative bg-gray-800/80 backdrop-blur-sm p-4 rounded-full border-2 border-gray-600 hover:border-gray-400 hover:bg-gray-700/80 transition-all duration-300 hover:scale-110 shadow-lg">
                <FontAwesomeIcon
                  icon={faFile}
                  size="2x"
                  className="text-white"
                />
              </div>
            </a>
          </div>

          <div className="flex justify-center">
            <a
              href="#bio"
              className="group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold"
            >
              <div className="absolute inset-0 bg-white rounded-xl blur group-hover:blur-lg transition duration-300 opacity-50" />
              <div className="relative bg-white px-8 py-4 rounded-xl text-black border-2 border-white hover:bg-gray-100 transition-all duration-300 hover:scale-105 font-bold">
                Read My Bio
                <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <Arrow />
        </div>
      </div>
      <section id="bio" className="theme-page w-full px-4 py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8">
          <aside className="theme-surface rounded-3xl p-6 border theme-border shadow-xl h-fit lg:sticky lg:top-24">
            <Image
              title="Luxin Zhang"
              src={profile_picture}
              alt="Profile Picture"
              priority={true}
              className="rounded-2xl w-full h-auto object-cover border-2 border-emerald-400/60"
              width={320}
              height={380}
            />
            <h3 className="text-2xl font-bold mt-5">Luxin Zhang</h3>
            <p className="opacity-80 mt-1">Software Engineer & AI Builder</p>
            <p className="opacity-80 mt-1">AI Systems · Security</p>
          </aside>

          <div className="theme-surface rounded-3xl p-8 md:p-10 border theme-border shadow-xl">
            <p className="text-sm uppercase tracking-widest opacity-60 mb-3">
              Bio
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">About Me</h2>
            <div className="space-y-5 text-lg leading-relaxed opacity-95">
              <p>
                I am a Software Engineer in the cybersecurity space and a
                founder-minded builder focused on designing and shipping
                real-world, production-grade AI systems.
              </p>
              <p>
                I specialize in full-stack development and secure system design,
                with experience building scalable applications that integrate
                AI, data systems, and security principles.
              </p>
              <p>
                My background includes computer vision and AI algorithms, and I
                have evolved that foundation into building intelligent,
                security-aware systems that operate reliably in complex
                real-world environments.
              </p>
              <p>
                I am particularly interested in AI-driven security, agentic
                systems, and autonomous workflows where intelligent agents can
                reason, detect, and act with high reliability.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
