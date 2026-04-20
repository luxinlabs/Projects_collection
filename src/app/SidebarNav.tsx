"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/bio", label: "Bio" },
  { href: "/projects", label: "Projects" },
  { href: "/open-source", label: "Open Source" },
  { href: "/articles", label: "Articles" },
];

export default function SidebarNav() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const dark = savedTheme === "dark";
    setIsDarkMode(dark);
    document.documentElement.setAttribute(
      "data-theme",
      dark ? "dark" : "light",
    );
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    localStorage.setItem("theme", nextDark ? "dark" : "light");
    document.documentElement.setAttribute(
      "data-theme",
      nextDark ? "dark" : "light",
    );
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed top-4 right-6 z-40 flex items-center gap-2 max-w-[calc(100vw-2rem)]">
      <button
        onClick={toggleTheme}
        className="theme-toggle inline-flex items-center justify-center h-10 w-10 rounded-lg text-sm font-semibold transition-colors"
        aria-label="Toggle theme"
      >
        <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
      </button>

      <nav className="flex flex-wrap justify-end gap-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="theme-nav-link px-3 py-2 rounded-lg text-xs md:text-sm font-semibold transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
