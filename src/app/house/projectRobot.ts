import * as THREE from "three";
import type { HouseKit } from "./housePrimitives";
import { batchStaticGeometry } from "./batchGeometry";

import { robotHome } from "./houseLayout";

export function createProjectRobot(kit: HouseKit) {
  const { box, ball, cylinder, mesh } = kit;
  const group = new THREE.Group();
  group.name = "Friendly mint robot in the Project Gallery";
  const cream = "#f0e6ce",
    mint = "#93b7ac",
    brass = "#bf955e";
  box(0.55, 0.54, 0.36, cream, 0, 0.64, 0, group, 0.1);
  box(0.38, 0.28, 0.04, mint, 0, 0.68, 0.19, group, 0.06);
  const heart = mesh(
    new THREE.TorusGeometry(0.065, 0.014, 6, 20),
    brass,
    0,
    0.7,
    0.225,
    group,
  );
  heart.scale.y = 0.85;
  for (const x of [-0.08, 0, 0.08]) ball(0.015, brass, x, 0.58, 0.23, group);
  for (const side of [-1, 1]) {
    cylinder(0.065, 0.075, 0.24, mint, side * 0.16, 0.28, 0, group);
    box(0.22, 0.13, 0.3, brass, side * 0.16, 0.11, 0.04, group, 0.055);
    ball(0.095, mint, side * 0.32, 0.78, 0, group);
  }
  const head = new THREE.Group();
  head.position.y = 1.1;
  group.add(head);
  box(0.64, 0.46, 0.43, mint, 0, 0, 0, head, 0.11);
  box(0.53, 0.29, 0.05, "#405d5b", 0, -0.01, 0.22, head, 0.07);
  for (const x of [-0.13, 0.13]) {
    const eye = ball(0.045, "#f8e5a8", x, 0.02, 0.26, head);
    eye.scale.set(0.8, 1.1, 0.35);
  }
  const smile = mesh(
    new THREE.TorusGeometry(0.07, 0.012, 6, 20, Math.PI),
    "#f8e5a8",
    0,
    -0.035,
    0.262,
    head,
  );
  smile.rotation.z = Math.PI;
  cylinder(0.018, 0.025, 0.19, brass, 0, 0.31, 0, head);
  ball(0.06, "#c65d43", 0, 0.43, 0, head);
  const arm = new THREE.Group();
  arm.position.set(0.35, 0.78, 0);
  group.add(arm);
  cylinder(0.06, 0.065, 0.26, cream, 0, -0.13, 0, arm);
  ball(0.085, mint, 0, -0.3, 0, arm);
  arm.rotation.z = 1.9;
  cylinder(0.06, 0.065, 0.26, cream, -0.37, 0.61, 0, group);
  ball(0.085, mint, -0.37, 0.44, 0, group);
  batchStaticGeometry(group, [head, arm]);
  group.position.set(robotHome.x, 0.51, robotHome.z);
  group.rotation.y = 0.25;
  kit.world.add(group);
  return { group, head, arm };
}
