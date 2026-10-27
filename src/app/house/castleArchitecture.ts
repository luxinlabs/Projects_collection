import * as THREE from "three";
import { createBayWindowMaterial } from "./sanFrancisco";
import type { HouseKit } from "./housePrimitives";

export function addCastleArchitecture(kit: HouseKit) {
  const { world, box, cylinder, mesh, ball, rod, groupAt, plant } = kit;
  const stone = "#b7c4b4",
    pale = "#f1e2c9",
    trim = "#a99877",
    gold = "#b99557";
  const windowMaterial = createBayWindowMaterial();
  const flames: THREE.Mesh[] = [],
    lights: THREE.PointLight[] = [];
  box(30.4, 0.65, 18.8, "#b9b19b", 0.7, -0.42, 0.8, world, 0.2);
  box(30.3, 0.18, 18.7, "#afbd91", 0.7, -0.05, 0.8, world, 0.08);
  box(21.6, 0.48, 8.8, "#b1a183", 0.5, 0.17, 0, world, 0.06);
  for (let i = 0; i < 25; i++)
    for (let j = 0; j < 10; j++)
      box(
        0.84,
        0.07,
        0.85,
        (i + j) % 2 ? "#e1d9c6" : "#d7ceb9",
        -9.82 + i * 0.86,
        0.44,
        -3.91 + j * 0.87,
        world,
        0.008,
      );
  box(21.6, 5.75, 0.38, stone, 0.5, 3.25, -4.4);
  box(0.38, 5.75, 8.8, "#cba8a1", -10.3, 3.25, 0);
  box(21.8, 0.22, 0.56, pale, 0.5, 6.15, -4.4);
  box(0.56, 0.22, 8.9, pale, -10.3, 6.15, 0);
  box(21.3, 0.18, 0.14, trim, 0.5, 0.65, -4.16);
  for (let x = -9.8; x <= 10.9; x += 0.9)
    box(0.47, 0.52, 0.53, pale, x, 6.48, -4.4);
  for (let z = -3.8; z <= 4; z += 0.9)
    box(0.53, 0.52, 0.47, pale, -10.3, 6.48, z);
  // Painted clapboard and carved cornices recall San Francisco Victorians.
  for (let y = 0.9; y < 6; y += 0.26)
    box(21.1, 0.018, 0.018, "#d2d8c5", 0.5, y, -4.195);
  for (const x of [-9.6, -5.1, 0.7, 5.2, 10]) {
    box(0.12, 5.1, 0.1, pale, x, 3.25, -4.12);
    box(0.28, 0.18, 0.22, gold, x, 5.9, -4.02);
    const corbel = box(0.1, 0.3, 0.2, pale, x, 5.65, -4.02);
    corbel.rotation.x = -0.25;
  }
  for (const x of [-5.3, 5.35]) {
    for (const z of [-3.6, 3.6]) {
      box(0.75, 0.18, 0.75, pale, x, 0.56, z);
      cylinder(0.23, 0.29, 2.4, pale, x, 1.85, z);
      box(0.62, 0.2, 0.62, trim, x, 3.06, z);
    }
    const arch = mesh(
      new THREE.TorusGeometry(3.6, 0.17, 8, 56, Math.PI),
      pale,
      x,
      3.1,
      0,
    );
    arch.rotation.y = Math.PI / 2;
    const inner = mesh(
      new THREE.TorusGeometry(3.38, 0.035, 6, 56, Math.PI),
      gold,
      x + 0.05,
      3.1,
      0,
    );
    inner.rotation.y = Math.PI / 2;
  }
  // A cutaway facade leaves all exhibits visible; the entrance remains a gate.
  for (const [x, width] of [
    [-5.75, 8.9],
    [6.25, 9.9],
  ]) {
    box(width, 0.44, 0.28, stone, x, 0.65, 4.3);
    box(width, 0.09, 0.38, pale, x, 0.91, 4.3);
  }
  box(3.2, 0.2, 0.8, pale, 0, 0.2, 4.75);
  box(3.7, 0.15, 0.7, stone, 0, 0.08, 5.35);
  for (const x of [-1.6, 1.6]) {
    box(0.5, 0.2, 0.5, pale, x, 0.6, 4.3);
    cylinder(0.16, 0.23, 2.2, pale, x, 1.78, 4.3);
    ball(0.2, gold, x, 2.98, 4.3);
  }
  box(1.7, 0.025, 7.7, "#a16a72", 0.1, 0.498, 0.1);
  for (const x of [-0.7, 0.9]) box(0.025, 0.015, 7.7, gold, x, 0.52, 0.1);
  for (let i = 0; i < 15; i++)
    box(0.045, 0.01, 0.09, "#d1ad75", -0.62 + i * 0.1, 0.52, 3.9);
  // Round towers, battlements, slate roofs, and little rose standards.
  for (const x of [-10.25, 11.2]) {
    const tower = groupAt(x, 0, -4.4);
    cylinder(1.02, 1.15, 6.7, stone, 0, 3.42, 0, tower);
    for (const y of [0.65, 3.45, 6.5])
      cylinder(1.11, 1.11, 0.16, pale, 0, y, 0, tower);
    for (let i = 0; i < 10; i++) {
      const a = (i * Math.PI) / 5;
      const merlon = box(
        0.38,
        0.45,
        0.32,
        pale,
        Math.sin(a),
        6.93,
        Math.cos(a),
        tower,
      );
      merlon.rotation.y = a;
    }
    const roof = mesh(
      new THREE.ConeGeometry(1.25, 2.35, 16),
      "#748f91",
      0,
      7.95,
      0,
      tower,
    );
    roof.receiveShadow = true;
    cylinder(0.025, 0.025, 1.15, gold, 0, 9.45, 0, tower);
    const flag = new THREE.Shape();
    flag.moveTo(0, 0);
    flag.lineTo(0.85, -0.12);
    flag.lineTo(0.56, -0.37);
    flag.lineTo(0, -0.43);
    flag.closePath();
    mesh(
      new THREE.ExtrudeGeometry(flag, { depth: 0.025, bevelEnabled: false }),
      "#c65d43",
      0.03,
      9.88,
      0,
      tower,
    );
    // Slit window on the front of each tower.
    box(0.26, 0.9, 0.07, "#6d7b78", 0, 4.8, 1.03, tower, 0.1);
  }
  function archWindow(
    x: number,
    y: number,
    z: number,
    width: number,
    height: number,
  ) {
    const window = groupAt(x, y, z);
    function shape(w: number, h: number) {
      const p = new THREE.Shape();
      p.moveTo(-w / 2, 0);
      p.lineTo(w / 2, 0);
      p.lineTo(w / 2, h - w / 2);
      p.absarc(0, h - w / 2, w / 2, 0, Math.PI, false);
      p.lineTo(-w / 2, 0);
      return p;
    }
    mesh(
      new THREE.ExtrudeGeometry(shape(width + 0.28, height + 0.15), {
        depth: 0.14,
        bevelEnabled: false,
      }),
      pale,
      0,
      -0.08,
      0,
      window,
    );
    const viewGeometry = new THREE.ShapeGeometry(shape(width, height));
    const vertices = viewGeometry.getAttribute("position");
    const uv = viewGeometry.getAttribute("uv");
    for (let i = 0; i < vertices.count; i++)
      uv.setXY(i, vertices.getX(i) / width + 0.5, vertices.getY(i) / height);
    const pane = new THREE.Mesh(viewGeometry, windowMaterial);
    pane.name = "Golden Gate Bridge bay-window view";
    pane.position.set(0, 0, 0.18);
    window.add(pane);
    pane.castShadow = false;
    for (const side of [-1, 1])
      box(
        0.055,
        height - width / 2,
        0.04,
        gold,
        (side * width) / 6,
        (height - width / 2) / 2,
        0.22,
        window,
      );
    box(width, 0.055, 0.05, gold, 0, height - width / 2, 0.22, window);
    // A projecting sill, turned brackets and a pediment make a Victorian bay.
    const pediment = new THREE.Shape();
    pediment.moveTo(-width / 2 - 0.2, 0);
    pediment.lineTo(0, 0.4);
    pediment.lineTo(width / 2 + 0.2, 0);
    pediment.closePath();
    mesh(
      new THREE.ExtrudeGeometry(pediment, { depth: 0.2, bevelEnabled: false }),
      pale,
      0,
      height + 0.05,
      0.03,
      window,
    );
    for (const side of [-1, 1]) {
      box(
        0.1,
        height - width / 2,
        0.18,
        pale,
        side * (width / 2 + 0.06),
        (height - width / 2) / 2,
        0.2,
        window,
      );
      const bracket = box(
        0.13,
        0.35,
        0.28,
        gold,
        side * width * 0.36,
        -0.3,
        0.08,
        window,
      );
      bracket.rotation.x = -0.25;
    }
    box(width + 0.4, 0.13, 0.45, trim, 0, -0.11, 0.1, window);
    return window;
  }
  archWindow(-7.8, 3.2, -4.12, 2.7, 2.5);
  archWindow(8.2, 3.2, -4.12, 2.7, 2.5);
  // Heraldic banners frame the central hall, instead of domestic curtains.
  for (const [x, color] of [
    [-4.8, "#ac7b86"],
    [5, "#819681"],
  ] as [number, string][]) {
    box(0.08, 1.8, 0.08, gold, x, 4.72, -4.04);
    const banner = new THREE.Shape();
    banner.moveTo(-0.42, 0);
    banner.lineTo(0.42, 0);
    banner.lineTo(0.42, -1.55);
    banner.lineTo(0, -1.9);
    banner.lineTo(-0.42, -1.55);
    banner.closePath();
    mesh(
      new THREE.ExtrudeGeometry(banner, { depth: 0.03, bevelEnabled: false }),
      color,
      x,
      5.75,
      -4.02,
    );
    const emblem = mesh(
      new THREE.TorusGeometry(0.16, 0.025, 6, 32),
      gold,
      x,
      5.05,
      -3.96,
    );
    emblem.scale.y = 1.25;
  }
  // Candle sconces and a small chandelier keep the stone hall warm.
  for (const x of [-8.9, -4.6, 0.45, 5.25, 9.8]) {
    box(0.18, 0.5, 0.12, trim, x, 3.0, -3.98);
    rod(
      new THREE.Vector3(x, 2.95, -3.9),
      new THREE.Vector3(x, 3.1, -3.55),
      0.035,
      gold,
    );
    cylinder(0.07, 0.06, 0.22, "#f2e1bc", x, 3.23, -3.55);
    const flame = ball(0.065, "#f7c77c", x, 3.42, -3.55);
    flame.scale.set(0.65, 1.7, 0.65);
    flame.castShadow = false;
    (flame.material as THREE.MeshStandardMaterial).emissive.set("#da8d39");
    (flame.material as THREE.MeshStandardMaterial).emissiveIntensity = 1;
    flames.push(flame);
    const light = new THREE.PointLight("#ffd29a", 1.5, 5);
    light.position.set(x, 3.35, -3.3);
    world.add(light);
    lights.push(light);
  }
  const chandelier = mesh(
    new THREE.TorusGeometry(1.1, 0.04, 8, 48),
    gold,
    0.4,
    5.3,
    0.1,
  );
  chandelier.rotation.x = Math.PI / 2;
  rod(
    new THREE.Vector3(0.4, 6.6, 0.1),
    new THREE.Vector3(0.4, 5.3, 0.1),
    0.025,
    gold,
  );
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4,
      x = 0.4 + Math.cos(a) * 1.1,
      z = 0.1 + Math.sin(a) * 1.1;
    rod(
      new THREE.Vector3(0.4, 5.4, 0.1),
      new THREE.Vector3(x, 5.3, z),
      0.02,
      gold,
    );
    cylinder(0.045, 0.045, 0.2, "#efdfbf", x, 5.43, z);
    ball(0.045, "#efbb6c", x, 5.58, z);
  }
  plant(-6, 0.5, 3.5, 0.9);
  plant(10.5, 0.5, 3.6, 1);
  return { archWindow, flames, lights, windowMaterial };
}
