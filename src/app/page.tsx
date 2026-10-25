import type { Metadata } from "next";
import HouseExperience from "./house/HouseExperience";

export const metadata: Metadata = {
  title: "Luxin Zhang | A Little World of Big Ideas",
  description:
    "Step inside Luxin Zhang’s cozy interactive portfolio. Explore AI projects, research, awards, open source, and a little world of stories — and meet your virtual host.",
};

export default function Home() {
  return <HouseExperience />;
}
