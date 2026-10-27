import * as THREE from "three";
import type { HouseKit } from "./housePrimitives";
import { batchStaticGeometry } from "./batchGeometry";
import { createPuppyFollower } from "./puppyFollower";
import { cats as catProfiles } from "./companionContent";
import { isInsideCastle } from "./houseLayout";

export const petHomes: {
  kind: string;
  x: number;
  y: number;
  z: number;
  indoors: boolean;
  breed?: string;
}[] = [
  { kind: "puppy", x: 1.45, y: 0.51, z: 1.15, indoors: true },
  ...catProfiles.map((cat) => ({
    kind: "cat",
    ...cat,
    y: 0.68,
    indoors: true,
  })),
  { kind: "duck", x: 12.8, y: 0.15, z: 0.25, indoors: false },
  { kind: "duckling", x: 12.3, y: 0.15, z: 1.1, indoors: false },
  { kind: "duckling", x: 13.25, y: 0.15, z: 1.3, indoors: false },
];

export function addAnimals(kit: HouseKit) {
  const { world, ball, box, cylinder, mesh, rod } = kit;
  const groups: THREE.Group[] = [];
  const puppy = new THREE.Group();
  puppy.name = "Puppy in the Grand Hall";
  const body = ball(0.25, "#e6c394", 0, 0.32, 0, puppy);
  body.scale.set(0.85, 0.95, 1.4);
  const legs: THREE.Group[] = [];
  for (const x of [-0.14, 0.14])
    for (const z of [-0.2, 0.2]) {
      const leg = new THREE.Group();
      leg.position.set(x, 0.23, z);
      puppy.add(leg);
      legs.push(leg);
      cylinder(0.06, 0.065, 0.16, "#f1d6af", 0, -0.1, 0, leg);
      const paw = ball(0.075, "#f4dfbf", 0, -0.175, 0.025, leg);
      paw.scale.set(1, 0.6, 1.25);
    }
  const head = new THREE.Group();
  head.position.set(0, 0.54, 0.26);
  puppy.add(head);
  ball(0.235, "#efcf9e", 0, 0, 0, head);
  for (const side of [-1, 1]) {
    const ear = ball(0.105, "#bd9163", side * 0.21, -0.035, -0.005, head);
    ear.scale.set(0.65, 1.7, 0.8);
    ear.rotation.z = side * 0.25;
    ball(0.031, "#43372c", side * 0.085, 0.035, 0.207, head);
    ball(0.01, "#fff5df", side * 0.085 - 0.008, 0.047, 0.23, head);
    const muzzle = ball(0.085, "#f7e3bf", side * 0.045, -0.065, 0.2, head);
    muzzle.scale.y = 0.7;
  }
  ball(0.035, "#5d4734", 0, -0.04, 0.28, head);
  const tongue = ball(0.035, "#d89991", 0, -0.115, 0.245, head);
  tongue.scale.set(0.8, 1.1, 0.35);
  const collar = mesh(
    new THREE.TorusGeometry(0.16, 0.025, 6, 24),
    "#819676",
    0,
    0.47,
    0.25,
    puppy,
  );
  collar.rotation.x = Math.PI / 2;
  ball(0.026, "#c59e60", 0, 0.43, 0.4, puppy);
  const tail = new THREE.Group();
  tail.position.set(0, 0.42, -0.28);
  puppy.add(tail);
  const tailFur = ball(0.09, "#e8c494", 0, 0.14, -0.12, tail);
  tailFur.scale.set(0.6, 1.8, 0.7);
  tailFur.rotation.x = -0.6;
  batchStaticGeometry(puppy, [head, tail, ...legs]);
  const follower = createPuppyFollower([petHomes[0].x, petHomes[0].z]);
  puppy.position.set(petHomes[0].x, petHomes[0].y, petHomes[0].z);
  puppy.rotation.y = 0.5;
  world.add(puppy);
  groups.push(puppy);
  const cats: {
    group: THREE.Group;
    head: THREE.Group;
    tail: THREE.Mesh;
    until: number;
  }[] = [];
  const interactables: THREE.Object3D[] = [];
  const catHomes = petHomes.filter((home) => home.kind === "cat");
  catHomes.forEach((home, index) => {
    const coat = ["#a0a9b5", "#f4eadd", "#dfc9a5"][index];
    const points = ["#77818f", "#8d8077", "#665045"][index];
    const bed = new THREE.Group();
    bed.name = `${home.breed} cat bed`;
    bed.position.set(home.x, 0.51, home.z);
    world.add(bed);
    groups.push(bed);
    interactables.push(bed);
    const rim = mesh(
      new THREE.TorusGeometry(0.48, 0.095, 8, 32),
      ["#ac7b86", "#91a58d", "#a593bb"][index],
      0,
      0.12,
      0,
      bed,
    );
    rim.rotation.x = Math.PI / 2;
    cylinder(0.43, 0.46, 0.1, "#f0dfc6", 0, 0.1, 0, bed);
    const cat = new THREE.Group();
    cat.name = `${home.breed} sleeping in a small cat bed`;
    const catBody = ball(0.27, coat, 0, 0.16, 0, cat);
    catBody.scale.set(
      index === 2 ? 1.35 : 1.45,
      index === 0 ? 0.85 : 0.7,
      index === 1 ? 1.15 : 1,
    );
    const catHead = new THREE.Group();
    catHead.position.set(0.26, 0.22, 0.08);
    cat.add(catHead);
    ball(0.18, coat, 0, 0, 0, catHead);
    for (const side of [-1, 1]) {
      const ear = mesh(
        new THREE.ConeGeometry(0.075, 0.17, 3),
        points,
        side * 0.115,
        0.16,
        0,
        catHead,
      );
      ear.rotation.z = side * -0.2;
      const earInner = mesh(
        new THREE.ConeGeometry(0.04, 0.1, 3),
        "#d9aaa0",
        side * 0.115,
        0.17,
        0.035,
        catHead,
      );
      earInner.rotation.z = side * -0.2;
      const eye = mesh(
        new THREE.TorusGeometry(0.035, 0.006, 5, 12, Math.PI),
        "#6e533b",
        side * 0.07,
        0.02,
        0.16,
        catHead,
      );
      eye.scale.y = 0.45;
      for (const row of [-1, 1])
        rod(
          new THREE.Vector3(side * 0.07, -0.045, 0.16),
          new THREE.Vector3(side * 0.23, -0.04 + row * 0.03, 0.17),
          0.004,
          "#8a6e4d",
          catHead,
        );
    }
    if (index > 0) {
      const mask = ball(0.13, points, 0, -0.01, 0.08, catHead);
      mask.scale.set(1.1, 0.85, 0.7);
    }
    ball(0.018, "#b6857c", 0, -0.025, 0.18, catHead);
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.3, 0.13, -0.1),
      new THREE.Vector3(-0.4, 0.1, 0.2),
      new THREE.Vector3(-0.1, 0.08, 0.3),
      new THREE.Vector3(0.1, 0.1, 0.2),
    ]);
    const catTail = mesh(
      new THREE.TubeGeometry(curve, 20, index === 1 ? 0.085 : 0.06, 8, false),
      points,
      0,
      0,
      0,
      cat,
    );
    if (index === 0)
      for (let i = 0; i < 3; i++) {
        const stripe = mesh(
          new THREE.TorusGeometry(0.24, 0.022, 5, 16, Math.PI),
          points,
          -0.17 + i * 0.15,
          0.13,
          -0.02,
          cat,
        );
        stripe.rotation.y = Math.PI / 2;
        stripe.scale.y = 0.7;
      }
    batchStaticGeometry(cat, [catHead, catTail]);
    cat.position.set(home.x, home.y, home.z);
    cat.rotation.y = 0.6;
    world.add(cat);
    groups.push(cat);
    cats.push({ group: cat, head: catHead, tail: catTail, until: 0 });
    for (const root of [bed, cat])
      root.traverse((child) => {
        child.userData.action = `cat-${index}`;
      });
    interactables.push(cat);
  });

  const ducks: {
    group: THREE.Group;
    angle: number;
    radius: number;
    speed: number;
  }[] = [];
  for (let i = 0; i < 3; i++) {
    const duck = new THREE.Group();
    duck.name = i === 0 ? "Garden duck" : "Duckling";
    const color = i ? "#ead08b" : "#f0e5ca";
    const duckBody = ball(0.25, color, 0, 0.24, 0, duck);
    duckBody.scale.set(1, 0.8, 1.45);
    const neck = ball(0.145, color, 0, 0.43, 0.19, duck);
    neck.scale.y = 1.3;
    ball(0.18, color, 0, 0.59, 0.21, duck);
    box(0.17, 0.055, 0.18, "#d69b55", 0, 0.56, 0.39, duck, 0.025);
    for (const side of [-1, 1]) {
      ball(0.021, "#443c2b", side * 0.12, 0.62, 0.325, duck);
      const wing = ball(
        0.16,
        i ? "#ddbd77" : "#dfd2b1",
        side * 0.21,
        0.27,
        -0.025,
        duck,
      );
      wing.scale.set(0.25, 0.7, 1.3);
    }
    const feather = mesh(
      new THREE.ConeGeometry(0.09, 0.25, 5),
      color,
      0,
      0.33,
      -0.34,
      duck,
    );
    feather.rotation.x = -Math.PI / 3;
    batchStaticGeometry(duck, []);
    const scale = i ? 0.56 : 0.9;
    duck.scale.setScalar(scale);
    const home = petHomes.filter((home) => !home.indoors)[i];
    duck.position.set(home.x, home.y, home.z);
    world.add(duck);
    groups.push(duck);
    ducks.push({
      group: duck,
      angle: i * 2.1,
      radius: i ? 0.85 : 0.5,
      speed: 0.09 + i * 0.012,
    });
  }
  return {
    groups,
    interactables,
    pet(index: number, time: number) {
      if (cats[index]) cats[index].until = time + 4200;
    },
    update(
      time: number,
      visitor: THREE.Vector3,
      reduced: boolean,
      delta: number,
      walking: boolean,
    ) {
      const oldX = puppy.position.x,
        oldZ = puppy.position.z;
      const moving = follower.update([visitor.x, visitor.z], walking, delta);
      puppy.position.x = follower.position[0];
      puppy.position.z = follower.position[1];
      puppy.position.y = THREE.MathUtils.lerp(
        puppy.position.y,
        isInsideCastle(puppy.position.x, puppy.position.z) ? 0.51 : 0.13,
        1 - Math.exp(-delta * 12),
      );
      if (moving) {
        const heading = Math.atan2(
          puppy.position.x - oldX,
          puppy.position.z - oldZ,
        );
        puppy.rotation.y +=
          Math.atan2(
            Math.sin(heading - puppy.rotation.y),
            Math.cos(heading - puppy.rotation.y),
          ) *
          (1 - Math.exp(-delta * 12));
      }
      legs.forEach((leg, index) => {
        leg.rotation.x =
          moving && !reduced
            ? Math.sin(
                time * 0.014 + (index === 0 || index === 3 ? 0 : Math.PI),
              ) * 0.5
            : 0;
      });
      if (reduced) return moving;
      const t = time / 1000;
      const nearby = visitor.distanceTo(puppy.position) < 3;
      tail.rotation.z = Math.sin(t * (nearby ? 9 : 4)) * (nearby ? 0.7 : 0.35);
      head.rotation.z = Math.sin(t * 0.7) * 0.06;
      const gaze = Math.atan2(
        visitor.x - puppy.position.x,
        visitor.z - puppy.position.z,
      );
      if (nearby && !moving)
        puppy.rotation.y +=
          Math.atan2(
            Math.sin(gaze - puppy.rotation.y),
            Math.cos(gaze - puppy.rotation.y),
          ) *
          (1 - Math.exp(-delta * 2));
      puppy.scale.y = 1 + Math.sin(t * 2) * 0.018;
      cats.forEach(({ group, head, tail, until }, index) => {
        const petted = time < until;
        group.scale.y = 1 + Math.sin(t * 1.5 + index) * 0.025;
        group.scale.z = petted && index === 1 ? 1 + Math.sin(t * 3) * 0.08 : 1;
        head.rotation.z = petted
          ? Math.sin(t * (index === 0 ? 4 : 2)) * 0.18
          : Math.sin(t * 0.45 + index) * 0.025;
        head.position.y = petted ? 0.28 + Math.sin(t * 3) * 0.025 : 0.22;
        tail.rotation.y = petted
          ? Math.sin(t * (index === 2 ? 6 : 3)) * 0.22
          : 0;
      });
      ducks.forEach(({ group, angle, radius, speed }, index) => {
        const a = t * speed + angle;
        group.position.set(
          12.8 + Math.cos(a) * radius,
          0.15 + Math.sin(t * 2 + index) * 0.015,
          0.3 + Math.sin(a) * radius * 1.1,
        );
        group.rotation.y = -a;
      });
      return moving;
    },
  };
}
