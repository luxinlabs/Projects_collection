import { walkBounds } from "./houseLayout";

// Furniture footprints also feed pathfinding, so the visitor walks around objects.
export const obstacles = [
  { x: -10.2, z: 0, w: 0.3, d: 8.8 },
  { x: 0.5, z: -4.28, w: 21.4, d: 0.4 },
  { x: -5.75, z: 4.25, w: 8.9, d: 0.18 },
  { x: 6.25, z: 4.25, w: 9.9, d: 0.18 },
  { x: 3.1, z: -2.6, w: 2.6, d: 1.2 },
  { x: -9.4, z: 1.35, w: 0.9, d: 2.5 },
  { x: -3.4, z: 1.4, w: 1.5, d: 3.2 },
  { x: -0.7, z: 2.35, w: 1.7, d: 1.2 },
  { x: 3.65, z: 1.8, w: 1.45, d: 1.25 },
  { x: -7.7, z: -1.85, w: 2.6, d: 3.5 },
  { x: -9.45, z: -2.7, w: 0.8, d: 0.8 },
  { x: 8.4, z: -3.3, w: 5.4, d: 1.4 },
  { x: 8.3, z: -0.15, w: 3.4, d: 1.4 },
  { x: 8, z: 2.65, w: 3.6, d: 2.2 },
  { x: 0.35, z: -3.7, w: 1.4, d: 0.9 },
  { x: 12.8, z: 0.3, w: 2.8, d: 3.3 },
];

export function canWalk(x: number, z: number) {
  return (
    x >= walkBounds.minX &&
    x <= walkBounds.maxX &&
    z >= walkBounds.minZ &&
    z <= walkBounds.maxZ &&
    !obstacles.some(
      (o) =>
        Math.abs(x - o.x) < o.w / 2 + 0.18 &&
        Math.abs(z - o.z) < o.d / 2 + 0.18,
    )
  );
}

export function walkDirection(
  keys: ReadonlySet<string>,
  cameraForward: [number, number],
): [number, number] {
  const forward =
    Number(keys.has("w") || keys.has("arrowup")) -
    Number(keys.has("s") || keys.has("arrowdown"));
  const right =
    Number(keys.has("d") || keys.has("arrowright")) -
    Number(keys.has("a") || keys.has("arrowleft"));
  const viewLength = Math.hypot(...cameraForward);
  if ((!forward && !right) || viewLength < 0.001) return [0, 0];
  const [fx, fz] = cameraForward.map((value) => value / viewLength);
  const x = fx * forward - fz * right;
  const z = fz * forward + fx * right;
  const length = Math.hypot(x, z);
  return [x / length, z / length];
}

const STEP = 0.4;
const key = (x: number, z: number) => `${x},${z}`;

export function findWalkPath(
  start: [number, number],
  end: [number, number],
): [number, number][] {
  const sx = Math.round(start[0] / STEP),
    sz = Math.round(start[1] / STEP);
  let ex = Math.round(end[0] / STEP),
    ez = Math.round(end[1] / STEP);
  if (!canWalk(ex * STEP, ez * STEP)) {
    let nearest = Infinity;
    for (let x = ex - 5; x <= ex + 5; x++)
      for (let z = ez - 5; z <= ez + 5; z++) {
        const distance = (x * STEP - end[0]) ** 2 + (z * STEP - end[1]) ** 2;
        if (canWalk(x * STEP, z * STEP) && distance < nearest) {
          nearest = distance;
          ex = x;
          ez = z;
        }
      }
    if (!Number.isFinite(nearest)) return [];
  }
  const open = [{ x: sx, z: sz, g: 0, f: 0 }];
  const came = new Map<string, [number, number]>();
  const scores = new Map([[key(sx, sz), 0]]);
  let attempts = 0;
  while (open.length && attempts++ < 5000) {
    open.sort((a, b) => a.f - b.f);
    const current = open.shift()!;
    if (current.x === ex && current.z === ez) {
      const path: [number, number][] = [];
      let point: [number, number] = [ex, ez];
      while (point[0] !== sx || point[1] !== sz) {
        path.unshift([point[0] * STEP, point[1] * STEP]);
        const previous = came.get(key(...point));
        if (!previous) return [];
        point = previous;
      }
      return path;
    }
    for (const [dx, dz] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
      [1, 1],
      [-1, 1],
      [1, -1],
      [-1, -1],
    ]) {
      const x = current.x + dx,
        z = current.z + dz;
      if (!canWalk(x * STEP, z * STEP)) continue;
      if (
        dx &&
        dz &&
        (!canWalk((current.x + dx) * STEP, current.z * STEP) ||
          !canWalk(current.x * STEP, (current.z + dz) * STEP))
      )
        continue;
      const g = current.g + Math.hypot(dx, dz);
      const id = key(x, z);
      if (g >= (scores.get(id) ?? Infinity)) continue;
      scores.set(id, g);
      came.set(id, [current.x, current.z]);
      open.push({ x, z, g, f: g + Math.hypot(ex - x, ez - z) });
    }
  }
  return [];
}
