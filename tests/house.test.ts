import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, relative, resolve, sep } from "node:path";
import {
  canWalk,
  findWalkPath,
  obstacles,
  walkDirection,
} from "../src/app/house/navigation";
import { houseSpots, portfolioProjects } from "../src/app/house/houseContent";
import { castleGalleries, isInsideCastle } from "../src/app/house/houseLayout";
import { companionActions } from "../src/app/house/companionContent";
import { createPuppyFollower } from "../src/app/house/puppyFollower";
import { petHomes } from "../src/app/house/animals";
import { judgeExperiences } from "../src/app/judge/experiences";
import { getPresetAnswer, presetQuestions } from "../src/app/house/faqContent";

test("project and judging images match the exact filenames in public", () => {
  const root = resolve("public"),
    files = new Set<string>();
  function visit(dir: string) {
    for (const item of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, item.name);
      if (item.isDirectory()) visit(path);
      else files.add(relative(root, path).split(sep).join("/"));
    }
  }
  visit(root);
  for (const project of portfolioProjects)
    assert.ok(files.has(project.imagePath.slice(1)), project.slug);
  for (const entry of judgeExperiences)
    if (entry.image) assert.ok(files.has(entry.image.slice(1)), entry.title);
});

test("walking follows the camera and diagonal movement keeps a constant speed", () => {
  for (const forward of [
    [0, -1],
    [-1, 0],
    [1, 0],
    [-3, -4],
  ] as [number, number][]) {
    const direction = walkDirection(new Set(["w"]), forward),
      length = Math.hypot(...forward);
    assert.ok(Math.abs(direction[0] - forward[0] / length) < 1e-10);
    assert.ok(Math.abs(direction[1] - forward[1] / length) < 1e-10);
    const right = walkDirection(new Set(["arrowright"]), forward);
    assert.ok(
      Math.abs(right[0] * direction[0] + right[1] * direction[1]) < 1e-10,
    );
    assert.ok(
      Math.abs(Math.hypot(...walkDirection(new Set(["w", "d"]), forward)) - 1) <
        1e-10,
    );
  }
  assert.deepEqual(
    walkDirection(new Set(["w", "s", "a", "d"]), [1, -1]),
    [0, 0],
  );
});

test("the castle has dedicated exhibition galleries, with no residential rooms", () => {
  assert.deepEqual(
    castleGalleries.map((g) => g.name),
    ["Research Gallery", "Grand Hall", "Project Gallery"],
  );
  for (const point of [
    [-8.4, 1.5],
    [0, 1],
    [8.1, -0.6],
  ] as [number, number][]) {
    assert.ok(isInsideCastle(...point));
    assert.ok(findWalkPath([0, 6.5], point).length);
  }
  const architecture = readFileSync(
    "src/app/house/castleArchitecture.ts",
    "utf8",
  );
  assert.match(architecture, /ConeGeometry/);
  assert.match(architecture, /archWindow/);
  assert.doesNotMatch(
    architecture,
    /\b(fridge|kitchen|bedroom|cookbook|stove)\b/i,
  );
});

test("all exhibition objects are reachable without crossing walls or display cases", () => {
  for (const spot of houseSpots) {
    assert.ok(canWalk(...spot.approach), spot.id);
    const path = findWalkPath([0, 6.5], spot.approach);
    assert.ok(path.length, spot.id);
    let previous: [number, number] = [0, 6.5];
    for (const point of path) {
      for (let part = 1; part <= 4; part++)
        assert.ok(
          canWalk(
            previous[0] + ((point[0] - previous[0]) * part) / 4,
            previous[1] + ((point[1] - previous[1]) * part) / 4,
          ),
          spot.id,
        );
      previous = point;
    }
    assert.ok(
      Math.hypot(
        previous[0] - spot.approach[0],
        previous[1] - spot.approach[1],
      ) < 0.3,
      spot.id,
    );
  }
  for (const from of houseSpots)
    for (const to of houseSpots)
      if (from.id !== to.id)
        assert.ok(
          findWalkPath(from.approach, to.approach).length,
          `${from.id} → ${to.id}`,
        );
});

test("walls and exhibits block walking, while a click on an exhibit finds a safe point", () => {
  assert.equal(canWalk(100, 100), false);
  for (const object of obstacles)
    assert.equal(canWalk(object.x, object.z), false);
  const path = findWalkPath([0, 6.5], [8.1, -2.4]);
  assert.ok(path.length);
  assert.ok(path.every((p) => canWalk(...p)));
});

test("the puppy and three distinct cats start in the hall, with three ducks outside", () => {
  assert.equal(petHomes.filter((p) => p.indoors).length, 4);
  assert.equal(petHomes.filter((p) => !p.indoors).length, 3);
  assert.equal(
    new Set(petHomes.filter((p) => p.kind === "cat").map((p) => p.breed)).size,
    3,
  );
  for (const pet of petHomes)
    assert.equal(isInsideCastle(pet.x, pet.z), pet.indoors);
});

test("six fixed questions cover bio, research, projects, awards, judging, and contact", () => {
  assert.deepEqual(
    presetQuestions.map((q) => q.id),
    ["intro", "research", "projects", "awards", "judging", "contact"],
  );
  assert.match(
    getPresetAnswer("research")!.answer,
    /Scope-Aware Memory Promotion/,
  );
  assert.match(getPresetAnswer("research")!.answer, /StableHLO/);
  assert.match(getPresetAnswer("judging")!.answer, /AAAI-UG/);
  assert.match(getPresetAnswer("judging")!.answer, /ASPPH27/);
  assert.match(getPresetAnswer("intro")!.answer, /Duke University/);
  assert.match(getPresetAnswer("contact")!.answer, /philomela.zhang@gmail.com/);
  assert.equal(getPresetAnswer("not-a-preset"), undefined);
});

test("preset answers are deterministic and never request a network or model", () => {
  const original = globalThis.fetch;
  globalThis.fetch = (() => {
    throw new Error("A preset must not call the network");
  }) as typeof fetch;
  try {
    for (const question of presetQuestions) {
      assert.deepEqual(getPresetAnswer(question.id), question);
      assert.equal(getPresetAnswer(question.id), getPresetAnswer(question.id));
    }
  } finally {
    globalThis.fetch = original;
  }
  for (const file of ["HostChat.tsx", "faqContent.ts"]) {
    const source = readFileSync(`src/app/house/${file}`, "utf8");
    assert.doesNotMatch(
      source,
      /\bfetch\s*\(|OPENAI_API_KEY|api\.openai\.com|\/api\/host|requestGuideReply/,
    );
  }
  assert.equal(existsSync("src/app/api/host/route.ts"), false);
  assert.equal(existsSync("src/app/house/guideClient.ts"), false);
  assert.doesNotMatch(
    readFileSync("src/app/house/HostChat.tsx", "utf8"),
    /<input|<textarea/,
  );
});

test("the puppy waits, follows through the doorway and galleries, and stops nearby", () => {
  const puppy = createPuppyFollower([1.45, 1.15]);
  for (let i = 0; i < 60; i++) puppy.update([0, 6.5], false, 1 / 60);
  assert.deepEqual(puppy.position, [1.45, 1.15]);
  for (const destination of [
    [0, 6.5],
    [8.1, -0.6],
    [-8.4, 1.5],
    [0, 6.5],
  ] as [number, number][]) {
    for (let i = 0; i < 1800; i++) {
      const before = [...puppy.position];
      puppy.update(destination, i === 0, 1 / 60);
      assert.ok(canWalk(...puppy.position), `collision at ${puppy.position}`);
      assert.ok(
        Math.hypot(
          puppy.position[0] - before[0],
          puppy.position[1] - before[1],
        ) <=
          3.9 / 60 + 1e-6,
      );
    }
    const distance = Math.hypot(
      puppy.position[0] - destination[0],
      puppy.position[1] - destination[1],
    );
    assert.ok(
      distance > 0.65 && distance < 1.5,
      `stopped ${distance} from ${destination}`,
    );
    const stopped = [...puppy.position];
    for (let i = 0; i < 120; i++) puppy.update(destination, false, 1 / 60);
    assert.deepEqual(puppy.position, stopped);
  }
});

test("all three cats and the chair have safe reachable interaction points", () => {
  for (const action of companionActions) {
    assert.ok(canWalk(...action.approach), action.id);
    assert.ok(findWalkPath([0, 6.5], action.approach).length, action.id);
    for (const other of companionActions)
      if (action.id !== other.id)
        assert.ok(
          findWalkPath(action.approach, other.approach).length,
          `${action.id} to ${other.id}`,
        );
  }
});
