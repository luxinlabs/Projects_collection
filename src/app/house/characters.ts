import * as THREE from "three";
import { visitorHipHeight } from "./seating";
import type { HouseKit } from "./housePrimitives";

export function createLuxin({ box, ball, cylinder, mesh }: HouseKit) {
  const group = new THREE.Group();
  group.name = "Little Luxin — girl with long hair and rose dress";
  const legs: THREE.Object3D[] = [],
    arms: THREE.Object3D[] = [];
  const skin = "#efc4a6",
    hairColor = "#49312d",
    rose = "#c78d94";
  // Soft cardigan, an A-line dress, little socks, and Mary Jane shoes.
  cylinder(0.17, 0.2, 0.37, rose, 0, 0.7, 0, group);
  cylinder(0.18, 0.3, 0.32, "#d1a0a3", 0, 0.48, 0, group);
  cylinder(0.187, 0.187, 0.035, "#f7e6cf", 0, 0.65, 0, group);
  for (const x of [-0.045, 0.045]) {
    const bow = ball(0.045, "#f0d6bd", x, 0.66, 0.19, group);
    bow.scale.set(1.2, 0.6, 0.5);
  }
  for (const y of [0.72, 0.79]) ball(0.012, "#e6c590", 0, y, 0.17, group);
  const backHair = ball(0.29, hairColor, 0, 1.04, -0.11, group);
  backHair.scale.set(1.05, 1.45, 0.7);
  ball(0.265, skin, 0, 1.09, 0.025, group);
  mesh(
    new THREE.SphereGeometry(0.285, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.43),
    hairColor,
    0,
    1.13,
    0.005,
    group,
  );
  for (const side of [-1, 1]) {
    const lock = ball(0.095, hairColor, side * 0.24, 1.01, 0, group);
    lock.scale.set(0.8, 2.7, 0.9);
    lock.rotation.z = side * -0.1;
    const fringe = ball(0.12, "#533834", side * 0.11, 1.23, 0.17, group);
    fringe.scale.set(1.2, 0.5, 0.65);
    fringe.rotation.z = side * 0.3;
    ball(0.043, skin, side * 0.255, 1.07, 0.03, group);
    const eye = ball(0.035, "#382b29", side * 0.095, 1.09, 0.266, group);
    eye.scale.set(0.8, 1.2, 0.45);
    ball(0.011, "#fff8eb", side * 0.095 - 0.008, 1.102, 0.281, group);
    const blush = ball(0.048, "#df9b91", side * 0.15, 1.025, 0.234, group);
    blush.scale.set(1, 0.42, 0.12);
    const lash = box(
      0.035,
      0.008,
      0.012,
      "#49312d",
      side * 0.12,
      1.11,
      0.268,
      group,
    );
    lash.rotation.z = side * 0.35;
    const leg = new THREE.Group();
    leg.position.set(side * 0.1, 0.2725, 0);
    group.add(leg);
    cylinder(0.053, 0.052, 0.2, skin, 0, -0.03, 0, leg);
    cylinder(0.055, 0.056, 0.09, "#f7ebd9", 0, -0.15, 0, leg);
    box(0.13, 0.085, 0.21, "#906b61", 0, -0.23, 0.035, leg, 0.035);
    box(0.12, 0.018, 0.035, "#d6bca2", 0, -0.185, 0.04, leg);
    legs.push(leg);
    const arm = new THREE.Group();
    arm.position.set(side * 0.215, 0.82, 0);
    group.add(arm);
    cylinder(0.065, 0.055, 0.25, rose, 0, -0.1, 0, arm);
    ball(0.06, skin, 0, -0.25, 0, arm);
    arms.push(arm);
  }
  ball(0.017, "#e6b394", 0, 1.045, 0.284, group);
  const smile = mesh(
    new THREE.TorusGeometry(0.044, 0.006, 6, 16, Math.PI),
    "#b3766d",
    0,
    0.998,
    0.263,
    group,
  );
  smile.rotation.z = Math.PI;
  // A little rose bow sits in her long dark hair.
  for (const side of [-1, 1]) {
    const bow = ball(0.067, "#d8a3aa", 0.24 + side * 0.045, 1.31, 0.08, group);
    bow.scale.set(1.1, 0.65, 0.45);
    bow.rotation.z = side * 0.4;
  }
  ball(0.029, "#edd2bd", 0.24, 1.31, 0.11, group);
  arms[0].rotation.z = -0.12;
  arms[1].rotation.z = 2.4;
  return { group, legs, arms };
}

export function createVisitor({ box, ball, cylinder, mesh }: HouseKit) {
  const group = new THREE.Group();
  const knees: THREE.Object3D[] = [];
  const legs: THREE.Object3D[] = [],
    arms: THREE.Object3D[] = [];
  cylinder(0.17, 0.21, 0.42, "#cf956f", 0, 0.66, 0, group);
  ball(0.26, "#e1b28e", 0, 1.06, 0, group);
  mesh(
    new THREE.SphereGeometry(0.275, 20, 14, 0, Math.PI * 2, 0, Math.PI * 0.44),
    "#45382f",
    0,
    1.1,
    -0.015,
    group,
  );
  box(0.28, 0.35, 0.15, "#b28d55", 0, 0.69, -0.2, group, 0.06);
  for (const x of [-0.1, 0.1]) {
    ball(0.023, "#3c332d", x, 1.08, 0.235, group);
    box(0.035, 0.36, 0.04, "#b28d55", x, 0.72, 0.15, group);
    const leg = new THREE.Group();
    leg.position.set(x, visitorHipHeight, 0);
    group.add(leg);
    cylinder(0.065, 0.06, 0.2, "#4d615b", 0, -0.1, 0, leg);
    const knee = new THREE.Group();
    knee.position.y = -0.2;
    leg.add(knee);
    cylinder(0.06, 0.06, 0.18, "#4d615b", 0, -0.09, 0, knee);
    box(0.14, 0.08, 0.22, "#514537", 0, -0.23, 0.035, knee);
    knees.push(knee);
    legs.push(leg);
    const arm = new THREE.Group();
    arm.position.set(x * 2.3, 0.8, 0);
    group.add(arm);
    cylinder(0.065, 0.06, 0.3, "#cf956f", 0, -0.12, 0, arm);
    ball(0.065, "#e1b28e", 0, -0.28, 0, arm);
    arms.push(arm);
  }
  return { group, legs, knees, arms };
}
