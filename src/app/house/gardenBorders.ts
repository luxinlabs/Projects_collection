import * as THREE from "three";
import type { HouseKit } from "./housePrimitives";
import { borderTrees } from "./houseLayout";

export function addGardenBorders(kit: HouseKit) {
  const { cylinder, mesh, ball, groupAt } = kit;
  for (const { x, z, scale } of borderTrees) {
    const tree = groupAt(x, 0.11, z);
    tree.name = "Tall slender tree on the outer garden edge";
    tree.scale.setScalar(scale);
    cylinder(0.07, 0.12, 5.3, "#82725b", 0, 2.65, 0, tree);
    for (let i = 0; i < 3; i++) {
      const crown = mesh(
        new THREE.ConeGeometry(0.43 - i * 0.07, 3.5 - i * 0.4, 12),
        ["#688471", "#78947c", "#8ca388"][i],
        0,
        2.8 + i * 0.95,
        0,
        tree,
      );
      crown.scale.z = 0.88;
    }
  }
  const flowerXs = [-8.5, -6.1, -3.7, 3.7, 6.1, 8.5];
  for (let index = 0; index < flowerXs.length; index++) {
    const x = flowerXs[index];
    const bed = groupAt(x, 0.11, 7.8);
    bed.name = "Soft rose, cream and lavender flower border";
    const soil = cylinder(0.7, 0.72, 0.025, "#9caa7c", 0, 0, 0, bed);
    soil.scale.z = 0.55;
    for (let i = 0; i < 7; i++) {
      const a = i * 2.4,
        radius = i ? 0.48 : 0;
      const px = Math.cos(a) * radius,
        pz = Math.sin(a) * radius * 0.48;
      const height = 0.3 + (i % 3) * 0.11;
      cylinder(0.012, 0.014, height, "#70865d", px, height / 2, pz, bed);
      const leaf = ball(0.07, "#8da375", px + 0.05, height * 0.48, pz, bed);
      leaf.scale.set(1.5, 0.35, 0.55);
      leaf.rotation.z = 0.4;
      const color = ["#dba3a5", "#f0e5bc", "#b6a4c7", "#e3ad89"][
        (index + i) % 4
      ];
      for (let petal = 0; petal < 5; petal++) {
        const angle = (petal * Math.PI * 2) / 5;
        const petalMesh = mesh(
          new THREE.SphereGeometry(0.075, 8, 6),
          color,
          px + Math.cos(angle) * 0.085,
          height,
          pz + Math.sin(angle) * 0.085,
          bed,
        );
        petalMesh.scale.set(1, 0.35, 1);
      }
      ball(0.04, "#c99f5a", px, height + 0.02, pz, bed);
    }
  }
}
