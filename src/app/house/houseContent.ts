import projectsData from "../projects.json";
import type { Project } from "../Project";

export type RoomSection =
  | "about"
  | "awards"
  | "projects"
  | "judge"
  | "open-source"
  | "research"
  | "travel"
  | "garden";

export interface HouseSpot {
  id: RoomSection;
  title: string;
  object: string;
  icon: string;
  position: [number, number, number];
  approach: [number, number];
}

export const houseSpots: HouseSpot[] = [
  {
    id: "awards",
    title: "The trophy wall",
    object: "Awards",
    icon: "✧",
    position: [-2.3, 3.6, -3.9],
    approach: [-2.3, -2.4],
  },
  {
    id: "projects",
    title: "The project gallery",
    object: "Projects",
    icon: "⌘",
    position: [8.1, 3.2, -2.4],
    approach: [8.1, -0.6],
  },
  {
    id: "judge",
    title: "A little balance",
    object: "Judging",
    icon: "⚖",
    position: [3.5, 2.3, 1.8],
    approach: [2.2, 2],
  },
  {
    id: "open-source",
    title: "An open window",
    object: "Open source",
    icon: "↗",
    position: [2.8, 5.5, -4.2],
    approach: [2.8, -2.8],
  },
  {
    id: "research",
    title: "The research gallery",
    object: "Research",
    icon: "▤",
    position: [-9.4, 3.3, 1.35],
    approach: [-8.4, 1.5],
  },
  {
    id: "travel",
    title: "The world exhibit",
    object: "The globe",
    icon: "◎",
    position: [-0.7, 2.65, 2.35],
    approach: [0.5, 2.6],
  },
  {
    id: "about",
    title: "A little hello",
    object: "Meet Luxin",
    icon: "☺",
    position: [0.1, 2.3, -0.1],
    approach: [0.1, 1.1],
  },
  {
    id: "garden",
    title: "Room to grow",
    object: "The garden",
    icon: "❋",
    position: [-12, 1.6, 3.8],
    approach: [-11.4, 4.8],
  },
];

export const portfolioProjects = Object.entries(projectsData).flatMap(
  ([category, projects]) =>
    Object.entries(projects).map(([slug, project]) => ({
      ...(project as Project),
      slug,
      category,
    })),
);

export const awardedProjects = portfolioProjects.filter(
  (project) => project.award,
);

export interface PlacePhoto {
  src: string;
  caption: string;
}
export interface StoryPlace {
  id: string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  description: string;
  kind: "Education" | "Work" | "Community" | "Travel";
  photos: PlacePhoto[];
}

// These locations are documented in the Bio page. Add confirmed trips and
// personal photographs here; do not substitute stock photos for travel memories.
export const storyPlaces: StoryPlace[] = [
  {
    id: "sunnyvale",
    name: "Sunnyvale, California",
    country: "United States",
    latitude: 37.37,
    longitude: -122.04,
    kind: "Work",
    description:
      "Software Developer II at Fortinet, building secure enterprise systems.",
    photos: [],
  },
  {
    id: "durham",
    name: "Durham, North Carolina",
    country: "United States",
    latitude: 35.99,
    longitude: -78.9,
    kind: "Education",
    description:
      "Duke University — Master of Engineering in Electrical and Computer Engineering, and software development team leadership.",
    photos: [],
  },
  {
    id: "stony-brook",
    name: "Stony Brook, New York",
    country: "United States",
    latitude: 40.91,
    longitude: -73.12,
    kind: "Education",
    description:
      "Stony Brook University — Bachelor of Science in Applied Mathematics and Statistics.",
    photos: [],
  },
  {
    id: "rockville",
    name: "Rockville, Maryland",
    country: "United States",
    latitude: 39.08,
    longitude: -77.15,
    kind: "Work",
    description:
      "Software engineering at Computer Packages Inc., working on enterprise applications.",
    photos: [],
  },
  {
    id: "shenzhen",
    name: "Shenzhen",
    country: "China",
    latitude: 22.54,
    longitude: 114.06,
    kind: "Work",
    description: "Computer vision and camera algorithm engineering at Vivo.",
    photos: [],
  },
  {
    id: "beijing",
    name: "Beijing",
    country: "China",
    latitude: 39.9,
    longitude: 116.4,
    kind: "Work",
    description: "Data platform analysis internship at TikTok.",
    photos: [],
  },
  {
    id: "new-york",
    name: "New York City",
    country: "United States",
    latitude: 40.71,
    longitude: -74.01,
    kind: "Community",
    description:
      "Reading is Fun Club — connecting readers, mentors, libraries, and bookstores.",
    photos: [],
  },
  {
    id: "qinghai",
    name: "Qinghai",
    country: "China",
    latitude: 36.62,
    longitude: 101.78,
    kind: "Community",
    description:
      "Environmental protection volunteering and conversations with local communities about animal protection.",
    photos: [],
  },
  {
    id: "nanjing",
    name: "Nanjing",
    country: "China",
    latitude: 32.06,
    longitude: 118.8,
    kind: "Community",
    description: "Supported referees and startup evaluation at SLUSH Nanjing.",
    photos: [],
  },
];
