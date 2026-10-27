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
const chairX = 5.1,
  chairZ = -1.1;
const chairRotation = Math.atan2(2.9 - chairX, -4.12 - chairZ);
export const chair = {
  x: chairX,
  z: chairZ,
  rotation: chairRotation,
  width: 2.6,
  depth: 0.9,
  floorY: 0.51,
  seatTop: 0.4,
  approach: [
    chairX + Math.sin(chairRotation) * 1.8,
    chairZ + Math.cos(chairRotation) * 1.8,
  ] as [number, number],
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
    caption: "A seat by the bay",
    icon: "♧",
    x: chair.x,
    y: 1.45,
    z: chair.z,
    approach: chair.approach,
  },
];
