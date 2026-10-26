import * as THREE from "three";
import type { HouseKit } from "./housePrimitives";
import { batchStaticGeometry } from "./batchGeometry";

export const petHomes = [
  { kind: "puppy", x: 1.45, y: 0.51, z: 1.15, indoors: true },
  { kind: "cat", x: -3.25, y: 1.48, z: 0.65, indoors: true },
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
  for (const x of [-0.14, 0.14])
    for (const z of [-0.2, 0.2]) {
      cylinder(0.06, 0.065, 0.16, "#f1d6af", x, 0.13, z, puppy);
      const paw = ball(0.075, "#f4dfbf", x, 0.055, z + 0.025, puppy);
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
  batchStaticGeometry(puppy, [head, tail]);
  puppy.position.set(petHomes[0].x, petHomes[0].y, petHomes[0].z);
  puppy.rotation.y = 0.5;
  world.add(puppy);
  groups.push(puppy);
  // Her curled-up cat has tabby markings, ears, whiskers, and a soft tail.
  const cat = new THREE.Group();
  cat.name = "Cat curled up on the velvet bench";
  const catBody = ball(0.27, "#d6b58a", 0, 0.16, 0, cat);
  catBody.scale.set(1.45, 0.7, 1);
  const catHead = new THREE.Group();
  catHead.position.set(0.26, 0.22, 0.08);
  cat.add(catHead);
  ball(0.18, "#e9c99e", 0, 0, 0, catHead);
  for (const side of [-1, 1]) {
    const ear = mesh(
      new THREE.ConeGeometry(0.075, 0.17, 3),
      "#c9a176",
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
  ball(0.018, "#b6857c", 0, -0.025, 0.18, catHead);
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.3, 0.13, -0.1),
    new THREE.Vector3(-0.4, 0.1, 0.2),
    new THREE.Vector3(-0.1, 0.08, 0.3),
    new THREE.Vector3(0.1, 0.1, 0.2),
  ]);
  mesh(
    new THREE.TubeGeometry(curve, 20, 0.06, 8, false),
    "#b18b60",
    0,
    0,
    0,
    cat,
  );
  for (let i = 0; i < 3; i++) {
    const stripe = mesh(
      new THREE.TorusGeometry(0.24, 0.022, 5, 16, Math.PI),
      "#b08a5e",
      -0.17 + i * 0.15,
      0.13,
      -0.02,
      cat,
    );
    stripe.rotation.y = Math.PI / 2;
    stripe.scale.y = 0.7;
  }
  batchStaticGeometry(cat, [catHead]);
  cat.position.set(petHomes[1].x, petHomes[1].y, petHomes[1].z);
  cat.rotation.y = 0.6;
  world.add(cat);
  groups.push(cat);

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
    const home = petHomes[i + 2];
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
    update(time: number, visitor: THREE.Vector3, reduced: boolean) {
      if (reduced) return;
      const t = time / 1000;
      const nearby = visitor.distanceTo(puppy.position) < 3;
      tail.rotation.z = Math.sin(t * (nearby ? 9 : 4)) * (nearby ? 0.7 : 0.35);
      head.rotation.z = Math.sin(t * 0.7) * 0.06;
      const gaze = Math.atan2(
        visitor.x - puppy.position.x,
        visitor.z - puppy.position.z,
      );
      if (nearby)
        puppy.rotation.y = THREE.MathUtils.lerp(puppy.rotation.y, gaze, 0.025);
      puppy.scale.y = 1 + Math.sin(t * 2) * 0.018;
      cat.scale.y = 1 + Math.sin(t * 1.5) * 0.025;
      catHead.rotation.z = Math.sin(t * 0.45) * 0.025;
      ducks.forEach(({ group, angle, radius, speed }, index) => {
        const a = t * speed + angle;
        group.position.set(
          12.8 + Math.cos(a) * radius,
          0.15 + Math.sin(t * 2 + index) * 0.015,
          0.3 + Math.sin(a) * radius * 1.1,
        );
        group.rotation.y = -a;
      });
    },
  };
}
