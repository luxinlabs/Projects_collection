import { chair } from "./companionContent";

export const visitorScale = 0.72;
export const visitorHipHeight = 0.47;

// Place the hips on the cushion, accounting for the miniature visitor's scale.
export function seatedPosition(scale = visitorScale): [number, number, number] {
  const x = 0.35,
    z = 0.2;
  return [
    chair.x + x * Math.cos(chair.rotation) + z * Math.sin(chair.rotation),
    chair.floorY + chair.seatTop - visitorHipHeight * scale,
    chair.z - x * Math.sin(chair.rotation) + z * Math.cos(chair.rotation),
  ];
}

export function seatedLegAngles(index: number) {
  // Raised knees and separately hinged calves give a relaxed, feet-up pose.
  return { hip: index ? -2.15 : -2.05, knee: index ? 0.7 : 0.65 };
}
