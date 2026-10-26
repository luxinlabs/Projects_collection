import type { Metadata } from "next";
import HouseExperience from "./house/HouseExperience";

export const metadata: Metadata = {
  title: "Luxin Zhang | A Little Castle of Big Ideas",
  description:
    "Step inside Luxin Zhang’s castle exhibition hall. Explore AI projects, research, awards, open source, and a little world of stories — and meet your preset guide.",
};

export default function Home() {
  return <HouseExperience />;
}
