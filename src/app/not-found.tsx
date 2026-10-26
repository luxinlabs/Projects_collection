import Link from "next/link";
import SidebarNav from "./SidebarNav";

export default function NotFound() {
  return (
    <main className="theme-page min-h-screen flex flex-col items-center justify-center text-center px-6">
      <SidebarNav />
      <span className="theme-accent text-7xl mb-6">⌂</span>
      <p className="theme-muted text-xs uppercase tracking-widest mb-4">
        A little detour
      </p>
      <h1 className="mb-5">This corner is still a mystery.</h1>
      <p className="theme-muted max-w-md mb-8">
        That page isn’t here, but there’s always a warm welcome back at the
        little castle.
      </p>
      <Link href="/" className="theme-primary px-6 py-3 rounded-xl">
        Find your way home ↗
      </Link>
    </main>
  );
}
