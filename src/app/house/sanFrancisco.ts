import * as THREE from "three";
import type { HouseKit } from "./housePrimitives";

const bridgeRed = "#c65d43";

// A miniature bay beyond the courtyard; it never changes walkable floor space.
export function addSanFranciscoBay(kit: HouseKit) {
  const { world, box, mesh, rod, cylinder, ball, groupAt } = kit;
  const bay = groupAt(0.7, -0.3, -11.3);
  bay.name = "San Francisco Bay and Golden Gate Bridge";
  box(30.2, 0.25, 8.1, "#8bb5b5", 0, -0.3, 0, bay, 0.15);
  // Low Marin headlands make a quiet backdrop to the suspension span.
  for (let i = 0; i < 7; i++) {
    const hill = mesh(
      new THREE.IcosahedronGeometry(1, 1),
      i % 2 ? "#8b9f8a" : "#a4b09a",
      -12 + i * 4,
      0.05,
      -3.1,
      bay,
    );
    hill.scale.set(3.4, 0.8 + (i % 3) * 0.35, 1.5);
  }
  for (let i = 0; i < 32; i++) {
    box(
      0.6 + (i % 4) * 0.3,
      0.012,
      0.035,
      "#bad2cb",
      -13.2 + ((i * 3.7) % 27),
      -0.155,
      -2.8 + ((i * 1.7) % 5.8),
      bay,
      0.005,
    );
  }
  const bridge = new THREE.Group();
  bridge.name = "Golden Gate suspension bridge";
  bay.add(bridge);
  box(26, 0.18, 0.95, "#a06b57", 0, 1.9, 0, bridge);
  box(25.9, 0.025, 0.62, "#666d69", 0, 2.005, 0, bridge);
  for (let x = -12; x < 13; x += 0.8)
    box(0.35, 0.012, 0.025, "#e8d1a0", x, 2.025, 0, bridge);
  for (const x of [-6.5, 6.5]) {
    for (const z of [-0.55, 0.55]) {
      box(0.3, 6.4, 0.28, bridgeRed, x, 3.05, z, bridge);
      box(0.5, 0.2, 0.45, "#c97959", x, 6.3, z, bridge);
      box(0.65, 0.5, 1.65, "#aca895", x, 0.1, 0, bridge);
    }
    for (const y of [1.3, 3, 4.6, 5.9])
      box(0.28, 0.18, 1.35, bridgeRed, x, y, 0, bridge);
    for (const y of [3.2, 4.8]) {
      rod(
        new THREE.Vector3(x, y, -0.47),
        new THREE.Vector3(x, y + 0.9, 0.47),
        0.035,
        "#d78160",
        bridge,
      );
      rod(
        new THREE.Vector3(x, y, 0.47),
        new THREE.Vector3(x, y + 0.9, -0.47),
        0.035,
        "#d78160",
        bridge,
      );
    }
  }
  function cableHeight(x: number) {
    return Math.abs(x) <= 6.5
      ? 2.7 + 3.45 * (x / 6.5) ** 2
      : 6.15 - (Math.abs(x) - 6.5) * 0.6;
  }
  for (const z of [-0.55, 0.55]) {
    const points = Array.from({ length: 105 }, (_, i) => {
      const x = -13 + i * 0.25;
      return new THREE.Vector3(x, cableHeight(x), z);
    });
    mesh(
      new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(points),
        104,
        0.048,
        5,
        false,
      ),
      bridgeRed,
      0,
      0,
      0,
      bridge,
    );
    for (let x = -12.5; x <= 12.5; x += 0.5)
      rod(
        new THREE.Vector3(x, 2.02, z),
        new THREE.Vector3(x, cableHeight(x), z),
        0.015,
        "#bd634c",
        bridge,
      );
  }
  // A sailboat and low ribbons of fog, kept below the distinctive tower tops.
  const boat = groupAt(8, -0.25, -8.5);
  const hull = ball(0.4, "#fff1d8", 0, 0.05, 0, boat);
  hull.scale.set(1.8, 0.25, 0.5);
  cylinder(0.02, 0.02, 1.35, "#b18d68", 0, 0.65, 0, boat);
  const sail = new THREE.Shape();
  sail.moveTo(0.04, 0.15);
  sail.lineTo(0.04, 1.3);
  sail.lineTo(0.65, 0.18);
  sail.closePath();
  const sailMesh = mesh(
    new THREE.ShapeGeometry(sail),
    "#fff4df",
    0,
    0,
    0,
    boat,
  );
  (sailMesh.material as THREE.Material).side = THREE.DoubleSide;
  for (const [x, z, width] of [
    [-10, -1.5, 5],
    [0, -2, 7],
    [9, 1.3, 4],
  ]) {
    const fog = ball(1, "#d9e4da", x, 0.75, z, bay);
    fog.scale.set(width, 0.2, 0.55);
    fog.castShadow = false;
  }
  // Painted Lady miniatures beside the garden, with bay windows and gables.
  for (let i = 0; i < 3; i++) {
    const lady = groupAt(-13.7, 0.1, -3.4 + i * 1.6);
    lady.rotation.y = Math.PI / 2;
    const color = ["#c9a0a0", "#a2b8ac", "#d8bd88"][i];
    box(1.15, 1.8, 0.7, color, 0, 0.9, 0, lady);
    const gable = new THREE.Shape();
    gable.moveTo(-0.67, 0);
    gable.lineTo(0, 0.65);
    gable.lineTo(0.67, 0);
    gable.closePath();
    mesh(
      new THREE.ExtrudeGeometry(gable, { depth: 0.85, bevelEnabled: false }),
      "#f4e4c9",
      0,
      1.8,
      -0.4,
      lady,
    );
    box(0.65, 1.2, 0.18, "#efdfc7", 0, 1.1, 0.43, lady);
    for (const y of [0.85, 1.4])
      for (const x of [-0.18, 0.18])
        box(0.2, 0.34, 0.04, "#6d9699", x, y, 0.54, lady);
    box(0.27, 0.46, 0.05, "#7b7764", 0, 0.25, 0.39, lady);
    for (let y = 0.3; y < 1.8; y += 0.2)
      box(1.13, 0.018, 0.015, "#e6d6bb", 0, y, 0.365, lady);
  }
  return bay;
}

// Illustrated views keep the bridge visible in each window from every orbit.
// These are local canvas materials, with no image download or external API.
export function createBayWindowMaterial() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 768;
  const ctx = canvas.getContext("2d")!;
  const sky = ctx.createLinearGradient(0, 0, 0, 550);
  sky.addColorStop(0, "#abcbd0");
  sky.addColorStop(0.65, "#f5d8b6");
  sky.addColorStop(1, "#efd1ac");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, 1024, 768);
  ctx.fillStyle = "#fff0c5";
  ctx.beginPath();
  ctx.arc(770, 230, 55, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#9faf99";
  ctx.beginPath();
  ctx.moveTo(0, 430);
  ctx.bezierCurveTo(110, 280, 200, 390, 325, 425);
  ctx.bezierCurveTo(610, 470, 800, 300, 1024, 390);
  ctx.lineTo(1024, 570);
  ctx.lineTo(0, 570);
  ctx.fill();
  const water = ctx.createLinearGradient(0, 440, 0, 768);
  water.addColorStop(0, "#80adb0");
  water.addColorStop(1, "#b5d0c5");
  ctx.fillStyle = water;
  ctx.fillRect(0, 455, 1024, 313);
  ctx.strokeStyle = "#daebe0";
  ctx.lineWidth = 3;
  for (let i = 0; i < 28; i++) {
    const x = (i * 137) % 1024,
      y = 490 + ((i * 53) % 260);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 25 + (i % 4) * 17, y);
    ctx.stroke();
  }
  const deckY = 505,
    top = 205;
  ctx.fillStyle = bridgeRed;
  ctx.fillRect(0, deckY, 1024, 13);
  for (const x of [255, 755]) {
    ctx.fillRect(x - 18, top, 13, 390);
    ctx.fillRect(x + 12, top, 13, 390);
    for (const y of [top + 12, top + 85, top + 160, deckY + 40])
      ctx.fillRect(x - 18, y, 43, 11);
    ctx.fillStyle = "#a75943";
    ctx.fillRect(x - 29, 585, 65, 16);
    ctx.fillStyle = bridgeRed;
  }
  function height(x: number) {
    return x < 255
      ? top + (255 - x) * 0.82
      : x > 755
        ? top + (x - 755) * 0.82
        : 425 - 220 * ((x - 505) / 250) ** 2;
  }
  ctx.strokeStyle = bridgeRed;
  ctx.lineWidth = 7;
  ctx.beginPath();
  for (let x = 0; x <= 1024; x += 4) {
    if (!x) ctx.moveTo(x, height(x));
    else ctx.lineTo(x, height(x));
  }
  ctx.stroke();
  ctx.lineWidth = 2;
  for (let x = 15; x < 1024; x += 22) {
    ctx.beginPath();
    ctx.moveTo(x, height(x));
    ctx.lineTo(x, deckY);
    ctx.stroke();
  }
  ctx.fillStyle = "rgba(241,243,225,.62)";
  ctx.beginPath();
  ctx.ellipse(180, 555, 290, 20, 0, 0, Math.PI * 2);
  ctx.ellipse(850, 570, 300, 24, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#758c8a";
  ctx.lineWidth = 3;
  for (const [x, y] of [
    [140, 160],
    [650, 120],
    [850, 330],
  ]) {
    ctx.beginPath();
    ctx.moveTo(x - 13, y);
    ctx.quadraticCurveTo(x - 5, y - 10, x, y);
    ctx.quadraticCurveTo(x + 5, y - 10, x + 13, y);
    ctx.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return new THREE.MeshBasicMaterial({ map: texture, toneMapped: false });
}
