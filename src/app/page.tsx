import type { Metadata } from "next";
import HouseExperience from "./house/HouseExperience";

export const metadata: Metadata = {
  title: "Luxin Zhang | Golden Gate Castle",
  description:
    "Step inside Luxin Zhang’s Golden Gate castle exhibition hall, with San Francisco bay windows and three friendly cats. Explore AI projects, research, awards, open source, and a little world of stories — and meet your preset guide.",
};

export default function Home() {
  return <HouseExperience />;
}
