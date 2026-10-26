"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSiteTheme } from "./useSiteTheme";

const navItems = [
  { href: "/", label: "Little home" },
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
        d="m5 19 15-12 15 12M9 17v17h22V17M17 34V23h7v11"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27 11V6h4v8M4 35h32"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="20" cy="16" r="2" fill="currentColor" />
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
        aria-label="Luxin Zhang’s little world, home"
      >
        <HouseMark />
        <span>
          LUXIN ZHANG<small>A LITTLE WORLD OF BIG IDEAS</small>
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
