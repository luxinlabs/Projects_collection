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
