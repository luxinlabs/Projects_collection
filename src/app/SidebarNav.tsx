"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSiteTheme } from "./useSiteTheme";

const navItems = [
  { href: "/", label: "Golden Gate castle" },
  { href: "/bio", label: "About me" },
  { href: "/research", label: "Research" },
  { href: "/projects", label: "Projects" },
  { href: "/open-source", label: "Open source" },
  { href: "/articles", label: "Articles" },
  { href: "/judge", label: "Judging" },
];

export function HouseMark() {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path
        d="M4 35V8h4v4h3V8h4v27M25 35V8h4v4h3V8h4v27M15 20h10M3 35h34M18 35v-8a2 2 0 0 1 4 0v8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 19v4M11 19v4M29 19v4M32 19v4M17 18v-3h6v3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function SidebarNav({ inHouse = false }: { inHouse?: boolean }) {
  const pathname = usePathname();
  const { evening, toggle, ready } = useSiteTheme();
  const [menu, setMenu] = useState(false);
  return (
    <header className={`site-header ${inHouse ? "site-header-home" : ""}`}>
      <Link
        href="/"
        className="site-brand"
        aria-label="Luxin Zhang’s Golden Gate castle, home"
      >
        <HouseMark />
        <span>
          LUXIN ZHANG<small>A LITTLE CASTLE BY THE BAY</small>
        </span>
      </Link>
      <button
        className="site-menu-toggle"
        disabled={!ready}
        onClick={() => setMenu(!menu)}
        aria-expanded={menu}
        aria-controls="site-navigation"
        aria-label={menu ? "Close navigation" : "Open navigation"}
      >
        {menu ? "×" : "☰"}
      </button>
      <nav
        id="site-navigation"
        className={menu ? "site-nav-open" : ""}
        aria-label="Main navigation"
      >
        {navItems.map((item) => {
          const current =
            item.href === "/"
              ? pathname === "/"
              : pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={current ? "page" : undefined}
              onClick={() => setMenu(false)}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <button
        className="site-theme-toggle"
        disabled={!ready}
        onClick={toggle}
        aria-label={evening ? "Switch to daylight" : "Switch to cozy evening"}
        title={evening ? "Daylight" : "Cozy evening"}
      >
        {evening ? "☾" : "☼"}
      </button>
    </header>
  );
}
