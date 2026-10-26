import * as THREE from "three";

export interface HouseKit {
  world: THREE.Group;
  box: (
    w: number,
    h: number,
    d: number,
    color: string,
    x: number,
    y: number,
    z: number,
    parent?: THREE.Object3D,
    radius?: number,
  ) => THREE.Mesh;
  ball: (
    r: number,
    color: string,
    x: number,
    y: number,
    z: number,
    parent?: THREE.Object3D,
  ) => THREE.Mesh;
  cylinder: (
    rt: number,
    rb: number,
    h: number,
    color: string,
    x: number,
    y: number,
    z: number,
    parent?: THREE.Object3D,
  ) => THREE.Mesh;
  mesh: (
    geo: THREE.BufferGeometry,
    color: string,
    x: number,
    y: number,
    z: number,
    parent?: THREE.Object3D,
    metal?: boolean,
  ) => THREE.Mesh;
  rod: (
    from: THREE.Vector3,
    to: THREE.Vector3,
    radius: number,
    color: string,
    parent?: THREE.Object3D,
  ) => THREE.Mesh;
  groupAt: (x: number, y: number, z: number) => THREE.Group;
  plant: (
    x: number,
    y: number,
    z: number,
    size?: number,
    parent?: THREE.Object3D,
  ) => void;
  mat: (color: string, metal?: boolean) => THREE.MeshStandardMaterial;
}

function grainTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#adadad";
  ctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 220; i++) {
    const seed = Math.sin(i * 12.9898) * 43758.5453;
    const noise = seed - Math.floor(seed);
    ctx.strokeStyle = `rgba(${noise > 0.5 ? "230,230,230" : "45,45,45"},${0.06 + noise * 0.1})`;
    ctx.lineWidth = 0.4 + noise;
    ctx.beginPath();
    ctx.moveTo(0, i * 1.2);
    ctx.bezierCurveTo(80, i * 1.2 + 5, 170, i * 1.2 - 5, 256, i * 1.2);
    ctx.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

export function addCottageDetails(kit: HouseKit) {
  const { world, box, ball, cylinder, mesh, rod, groupAt, plant, mat } = kit;
  const wood = "#99704b",
    dark = "#694c37",
    cream = "#eee4ce",
    brass = "#c39952";
  const grain = grainTexture();
  [wood, dark, "#d4b58d", "#d9bd97", "#d0ac80", "#d9b78e", "#b78c60"].forEach(
    (color) => {
      mat(color).bumpMap = grain;
      mat(color).bumpScale = 0.035;
    },
  );

  // Two real, walkable wings turn the original room into a small cottage.
  for (const [center, width] of [
    [-7.75, 4.9],
    [8.25, 5.9],
  ]) {
    box(width, 0.48, 8.8, "#8b6549", center, 0.17, 0, world, 0.08);
    box(width, 4.15, 0.25, cream, center, 2.4, -4.32);
    box(width + 0.12, 0.2, 0.42, wood, center, 4.52, -4.32);
    box(width, 0.22, 0.1, wood, center, 0.62, -4.12);
    box(width, 0.35, 0.18, wood, center, 0.6, 4.25);
  }
  for (let x = -10; x < -5.3; x += 0.48)
    for (let z = -3.85; z < 4.25; z += 1.04)
      box(
        0.46,
        0.07,
        1.02,
        Math.round(z * 10) % 2 ? "#d4b58d" : "#d9bd97",
        x,
        0.44,
        z,
        world,
        0.006,
      );
  for (let x = 5.65; x < 11.15; x += 0.52)
    for (let z = -3.9; z < 4.2; z += 0.52)
      box(
        0.5,
        0.07,
        0.5,
        Math.round(x * 2 + z * 2) % 2 ? "#d5cfba" : "#e9e0cc",
        x,
        0.44,
        z,
        world,
        0.008,
      );
  box(0.25, 4.15, 8.65, "#ded3b9", -10.25, 2.4, 0);
  box(0.4, 0.2, 8.75, wood, -10.25, 4.52, 0);
  for (const x of [-5.3, 5.35, 11.2]) {
    for (const z of [-4.2, 4.2]) box(0.19, 4.1, 0.2, wood, x, 2.45, z);
    box(0.22, 0.2, 8.65, wood, x, 4.52, 0);
  }

  function windowAt(x: number, width: number, y = 2.9) {
    const frame = groupAt(x, y, -4.1);
    box(width, 1.6, 0.12, wood, 0, 0, 0, frame);
    box(width - 0.18, 1.42, 0.05, "#b9cfc6", 0, 0, 0.1, frame);
    box(width, 0.08, 0.12, "#f4ead5", 0, 0, 0.17, frame);
    box(0.07, 1.45, 0.12, "#f4ead5", 0, 0, 0.17, frame);
    box(width + 0.2, 0.1, 0.38, wood, 0, -0.83, 0.12, frame);
    for (const side of [-1, 1])
      for (let fold = 0; fold < 3; fold++)
        box(
          0.12,
          1.85,
          0.1,
          fold % 2 ? "#e7d8ba" : "#f1e5cc",
          side * (width / 2 + fold * 0.08),
          0,
          0.12,
          frame,
        );
  }
  windowAt(-7.8, 2.25);
  windowAt(8.4, 2.5, 3.25);

  // A linen bed, quilt, bedside lamp, and a soft reading rug.
  const bed = groupAt(-7.7, 0.5, -1.85);
  box(2.6, 0.38, 3.5, wood, 0, 0.35, 0, bed, 0.12);
  for (const x of [-1.08, 1.08])
    for (const z of [-1.45, 1.45]) box(0.14, 0.22, 0.14, dark, x, 0.11, z, bed);
  box(2.65, 1.25, 0.16, "#9a7859", 0, 0.9, -1.75, bed, 0.14);
  box(2.5, 0.35, 3.3, "#f4ebd8", 0, 0.68, 0, bed, 0.17);
  box(2.55, 0.15, 2.4, "#9caa91", 0, 0.9, 0.4, bed, 0.09);
  for (const x of [-0.66, 0.66]) {
    const pillow = box(1.08, 0.26, 0.68, "#fbf1db", x, 0.99, -1.05, bed, 0.12);
    pillow.rotation.x = 0.1;
  }
  for (let row = 0; row < 6; row++)
    for (let col = 0; col < 6; col++)
      box(
        0.32,
        0.012,
        0.32,
        (row + col) % 2 ? "#aab69b" : "#bec6ac",
        -1.04 + col * 0.4,
        0.982,
        -0.55 + row * 0.39,
        bed,
        0.015,
      );
  box(0.76, 0.82, 0.72, wood, -9.45, 0.91, -2.7);
  box(0.64, 0.04, 0.04, brass, -9.45, 1.05, -2.31);
  cylinder(0.14, 0.17, 0.05, brass, -9.45, 1.36, -2.7);
  cylinder(0.02, 0.02, 0.35, brass, -9.45, 1.55, -2.7);
  cylinder(0.2, 0.31, 0.38, "#ecd5ad", -9.45, 1.85, -2.7);
  const bedroomLamp = new THREE.PointLight("#ffca8e", 1.8, 4);
  bedroomLamp.position.set(-9.45, 1.7, -2.7);
  world.add(bedroomLamp);
  const readingRug = cylinder(1.55, 1.55, 0.025, "#d6bdac", -7.5, 0.505, 2.1);
  readingRug.scale.z = 0.72;
  plant(-6, 0.5, -3.4, 0.85);
  box(0.7, 0.12, 0.48, "#c99b7d", -7.6, 0.64, 2.7);

  // Painted cabinets, a farmhouse sink, hob, and a kettle.
  const kitchen = groupAt(8.5, 0.5, -3.3);
  box(5.15, 1.1, 1.3, "#91a08c", 0, 0.55, 0, kitchen);
  box(5.25, 0.14, 1.4, "#ece2cc", 0, 1.17, 0, kitchen);
  for (let i = 0; i < 5; i++) {
    box(0.86, 0.87, 0.06, "#9caa96", -2.05 + i * 1.02, 0.6, 0.68, kitchen);
    box(0.27, 0.035, 0.07, brass, -2.05 + i * 1.02, 0.9, 0.73, kitchen);
  }
  box(1.1, 0.04, 0.85, "#a9b4aa", -0.2, 1.25, 0, kitchen, 0.12);
  box(0.84, 0.045, 0.64, "#c6d2ca", -0.2, 1.265, 0, kitchen, 0.11);
  const faucet = mesh(
    new THREE.TorusGeometry(0.2, 0.025, 8, 24, Math.PI),
    brass,
    -0.2,
    1.52,
    -0.38,
    kitchen,
    true,
  );
  faucet.rotation.y = Math.PI / 2;
  cylinder(0.025, 0.025, 0.32, brass, -0.2, 1.4, -0.58, kitchen);
  box(1.3, 0.045, 0.93, "#5b6259", 1.5, 1.28, 0, kitchen, 0.06);
  for (const x of [1.2, 1.8])
    for (const z of [-0.24, 0.24]) {
      const hob = mesh(
        new THREE.TorusGeometry(0.15, 0.018, 6, 24),
        "#b8b7a5",
        x,
        1.31,
        z,
        kitchen,
      );
      hob.rotation.x = Math.PI / 2;
    }
  const kettle = ball(0.2, "#d6b28c", 1.45, 1.48, 0.1, kitchen);
  kettle.scale.y = 0.8;
  mesh(
    new THREE.TorusGeometry(0.17, 0.025, 7, 24, Math.PI),
    dark,
    1.45,
    1.67,
    0.1,
    kitchen,
  );
  const fridge = groupAt(5.95, 0.5, -3.2);
  box(0.95, 2.65, 1.28, "#e4dccc", 0, 1.33, 0, fridge, 0.14);
  box(0.84, 1.73, 0.08, "#eee7d7", 0, 1.63, 0.68, fridge, 0.05);
  box(0.06, 0.52, 0.09, brass, 0.29, 1.68, 0.76, fridge);
  box(0.84, 0.65, 0.08, "#ded8c6", 0, 0.4, 0.68, fridge);
  // An island with an open cookbook, bread board, and a vase of flowers.
  box(3.25, 0.95, 1.18, "#ac8b68", 8.3, 0.98, -0.15);
  box(3.4, 0.15, 1.32, "#eee1c7", 8.3, 1.53, -0.15, world, 0.08);
  box(0.82, 0.05, 0.55, "#f2e5ca", 7.6, 1.64, -0.15);
  box(0.018, 0.03, 0.5, wood, 7.6, 1.67, -0.15);
  cylinder(0.13, 0.14, 0.3, "#c49d88", 9.1, 1.76, -0.15);
  for (let i = 0; i < 5; i++) {
    rod(
      new THREE.Vector3(9.1, 1.9, -0.15),
      new THREE.Vector3(
        9.1 + Math.sin(i * 2.4) * 0.2,
        2.2 + (i % 2) * 0.12,
        -0.15 + Math.cos(i * 2.4) * 0.14,
      ),
      0.008,
      "#81916c",
    );
    ball(
      0.07,
      "#e0b0a0",
      9.1 + Math.sin(i * 2.4) * 0.2,
      2.2 + (i % 2) * 0.12,
      -0.15 + Math.cos(i * 2.4) * 0.14,
    );
  }
  const dining = groupAt(8, 0.5, 2.65);
  cylinder(1.05, 1.05, 0.12, "#b89369", 0, 1.05, 0, dining);
  cylinder(0.14, 0.22, 1.02, wood, 0, 0.51, 0, dining);
  cylinder(0.47, 0.5, 0.06, dark, 0, 0.03, 0, dining);
  const runner = box(0.5, 0.012, 1.85, "#e0beab", 0, 1.12, 0, dining);
  runner.rotation.y = 0.12;
  for (const x of [-0.5, 0.5]) {
    cylinder(0.22, 0.22, 0.025, "#f9eed8", x, 1.14, 0, dining);
    cylinder(0.07, 0.065, 0.14, "#a2b39a", x, 1.22, 0.43, dining);
  }
  for (const x of [-1.4, 1.4]) {
    const chair = groupAt(8 + x, 0.5, 2.65);
    box(0.63, 0.12, 0.63, "#a7af92", 0, 0.55, 0, chair);
    box(0.12, 0.7, 0.63, wood, Math.sign(x) * 0.27, 0.94, 0, chair);
    for (const dx of [-0.23, 0.23])
      for (const dz of [-0.23, 0.23])
        box(0.06, 0.55, 0.06, wood, dx, 0.27, dz, chair);
  }

  // The stove is tucked between the living-room window and the awards.
  const hearth = groupAt(0.35, 0.5, -3.7);
  box(1.5, 0.1, 1, "#bbb3a0", 0, 0.05, 0, hearth);
  box(1.1, 1.1, 0.68, "#595b50", 0, 0.7, 0, hearth, 0.09);
  box(0.77, 0.64, 0.04, "#332d25", 0, 0.72, 0.365, hearth, 0.06);
  cylinder(0.12, 0.12, 2.3, "#696658", 0, 2.36, -0.15, hearth);
  box(0.12, 0.025, 0.1, brass, 0.47, 0.77, 0.39, hearth);
  const flames: THREE.Mesh[] = [];
  for (let i = 0; i < 3; i++) {
    const flame = mesh(
      new THREE.SphereGeometry(0.12, 12, 10),
      ["#f1ac62", "#ffd18b", "#e68d56"][i],
      (i - 1) * 0.2,
      0.6,
      0.4,
      hearth,
    );
    flame.scale.set(0.7, 1.8, 0.35);
    flame.castShadow = false;
    const material = flame.material as THREE.MeshStandardMaterial;
    material.emissive.set("#d98435");
    material.emissiveIntensity = 1.2;
    flames.push(flame);
  }
  const fireLight = new THREE.PointLight("#ffba70", 3.2, 5);
  fireLight.position.set(0.35, 1.2, -3.1);
  world.add(fireLight);
  // Draped linen, seams, a cushion, and a mug soften the living room.
  box(0.7, 0.04, 1.6, "#ba8f8c", -3.25, 1.49, 1.6, world, 0.02);
  box(0.04, 0.55, 1.6, "#b18484", -2.75, 1.24, 1.6, world, 0.02);
  for (let i = 0; i < 8; i++)
    box(0.02, 0.015, 1.5, "#d0aaa0", -3.55 + i * 0.09, 1.52, 1.6);
  plant(10.5, 0.5, 3.6, 1);
  plant(-9.7, 0.5, 3.65, 0.8);
  return { flames, fireLight, bedroomLamp, grain };
}
