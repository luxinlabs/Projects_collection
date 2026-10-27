export const cats = [
  {
    name: "Luna",
    breed: "British Shorthair",
    x: -3.8,
    z: 0.3,
    approach: [-3.1, -0.55],
    reaction: "Luna leans into your hand.",
  },
  {
    name: "Momo",
    breed: "Ragdoll",
    x: -2.5,
    z: 1.15,
    approach: [-1.55, 1.15],
    reaction: "Momo stretches and gives a sleepy little nod.",
  },
  {
    name: "Coco",
    breed: "Siamese",
    x: -3.8,
    z: 2,
    approach: [-3.1, 2.9],
    reaction: "Coco perks up and swishes her tail.",
  },
] as const;
export const chair = {
  x: 5.1,
  z: -1.35,
  approach: [5.1, -0.35] as [number, number],
};
export const companionActions = [
  ...cats.map((cat, index) => ({
    id: `cat-${index}`,
    label: `Pet ${cat.name}`,
    caption: cat.name,
    icon: "♡",
    x: cat.x - 0.32,
    y: 0.72,
    z: cat.z - 0.16,
    approach: [...cat.approach] as [number, number],
  })),
  {
    id: "chair",
    label: "Sit on the chair",
    caption: "Take a seat",
    icon: "♧",
    x: chair.x,
    y: 1.65,
    z: chair.z,
    approach: chair.approach,
  },
];
