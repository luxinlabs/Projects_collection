"use client";

import { useCallback, useEffect, useState } from "react";

export function useSiteTheme() {
  const [evening, setEvening] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const sync = () =>
      setEvening(document.documentElement.dataset.theme === "dark");
    try {
      document.documentElement.dataset.theme =
        localStorage.getItem("theme") === "dark" ? "dark" : "light";
    } catch {
      /* Use the document theme when storage is unavailable. */
    }
    sync();
    setReady(true);
    window.addEventListener("portfolio-theme-change", sync);
    return () => window.removeEventListener("portfolio-theme-change", sync);
  }, []);
  const toggle = useCallback(() => {
    const dark = document.documentElement.dataset.theme !== "dark";
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      /* The theme still works for this visit. */
    }
    window.dispatchEvent(new Event("portfolio-theme-change"));
  }, []);
  return { evening, toggle, ready };
}
