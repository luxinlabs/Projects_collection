import { canWalk, findWalkPath } from "./navigation";

type Point = [number, number];

// Follow along the same walkable floor as the visitor, keeping a little space.
export function createPuppyFollower(start: Point) {
  const position: Point = [...start];
  let route: Point[] = [];
  let goal: Point = [...start];
  let cooldown = 0;
  let following = false;
  return {
    position,
    update(visitor: Point, walking: boolean, delta: number) {
      following ||= walking;
      const dt = Math.min(Math.max(delta, 0), 0.12);
      cooldown -= dt;
      if (!following) return false;
      if (
        cooldown <= 0 &&
        (!route.length ||
          Math.hypot(visitor[0] - goal[0], visitor[1] - goal[1]) > 0.6)
      ) {
        goal = [...visitor];
        route = findWalkPath(position, goal);
        // Begin at the grid centre so the first diagonal cannot cut a corner.
        const centre: Point = position.map(
          (v) => Math.round(v / 0.4) * 0.4,
        ) as Point;
        if (
          canWalk(...centre) &&
          Math.hypot(centre[0] - position[0], centre[1] - position[1]) > 0.01
        )
          route.unshift(centre);
        cooldown = 0.4;
      }
      let remaining = 0;
      let previous = position;
      for (const point of route) {
        remaining += Math.hypot(point[0] - previous[0], point[1] - previous[1]);
        previous = point;
      }
      let budget = Math.min(dt * 3.9, Math.max(0, remaining - 1.05));
      let moved = false;
      while (route.length && budget > 0.0001) {
        const next = route[0];
        const distance = Math.hypot(
          next[0] - position[0],
          next[1] - position[1],
        );
        if (distance < 0.001) {
          route.shift();
          continue;
        }
        const step = Math.min(distance, budget, 0.05);
        const x = position[0] + ((next[0] - position[0]) / distance) * step;
        const z = position[1] + ((next[1] - position[1]) / distance) * step;
        if (!canWalk(x, z)) {
          route = [];
          break;
        }
        position[0] = x;
        position[1] = z;
        moved = true;
        budget -= step;
        if (step >= distance - 0.0001) route.shift();
      }
      return moved;
    },
  };
}
