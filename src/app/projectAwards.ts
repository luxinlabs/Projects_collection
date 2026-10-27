import type { Project } from "./Project";

export function getProjectAwards(
  project: Pick<Project, "award" | "awards">,
): string[] {
  return project.awards?.length
    ? project.awards
    : project.award
      ? [project.award]
      : [];
}

// Curated by Luxin: VentureD, NEURORA, Hypothesis Atlas, then PatchPilot.
export function compareProjectAwards(a: Project, b: Project) {
  return (
    (a.awardOrder ?? Number.MAX_SAFE_INTEGER) -
    (b.awardOrder ?? Number.MAX_SAFE_INTEGER)
  );
}
