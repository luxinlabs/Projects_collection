export const castleGalleries = [
  {
    name: "Research Gallery",
    minX: -10.2,
    maxX: -5.3,
    minZ: -4.4,
    maxZ: 4.4,
  },
  {
    name: "Grand Hall",
    minX: -5.3,
    maxX: 5.35,
    minZ: -4.4,
    maxZ: 4.4,
  },
  {
    name: "Project Gallery",
    minX: 5.35,
    maxX: 11.2,
    minZ: -4.4,
    maxZ: 4.4,
  },
];
export function isInsideCastle(x: number, z: number) {
  return castleGalleries.some(
    (room) =>
      x >= room.minX && x <= room.maxX && z >= room.minZ && z <= room.maxZ,
  );
}
export const walkBounds = { minX: -14, maxX: 14.5, minZ: -6.5, maxZ: 8.5 };

export const robotHome = { x: 10, z: -0.8, width: 0.75, depth: 0.65 };

export const borderTrees = [-13.9, 15.1].flatMap((x) =>
  [-4, 1, 6.2].map((z, index) => ({ x, z, scale: [0.96, 1.06, 1][index] })),
);
