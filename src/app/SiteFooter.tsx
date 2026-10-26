"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteFooter() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return (
    <footer className="site-footer">
      <Link href="/">⌂ Back to the little castle</Link>
      <span>A personal space. An open invitation.</span>
      <a href="mailto:philomela.zhang@gmail.com">
        Let’s make something lovely ↗
      </a>
    </footer>
  );
}
