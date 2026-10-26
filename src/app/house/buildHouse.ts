import * as THREE from "three";
import { createHouseKit } from "./housePrimitives";
import { batchStaticGeometry } from "./batchGeometry";
import { addCastleArchitecture } from "./castleArchitecture";
import { createLuxin, createVisitor } from "./characters";
import { addAnimals } from "./animals";
import { houseSpots, type RoomSection } from "./houseContent";

export function buildHouse(scene: THREE.Scene) {
  const kit = createHouseKit(scene);
  const { world, box, ball, cylinder, mesh, rod, groupAt, plant } = kit;
  const wood = "#99704b",
    darkWood = "#694c37",
    brass = "#c39952";
  const castle = addCastleArchitecture(kit);
  const interactables: THREE.Object3D[] = [];
  function interactive(object: THREE.Object3D, id: RoomSection) {
    object.traverse((child) => {
      child.userData.section = id;
    });
    interactables.push(object);
  }
  function label(
    parent: THREE.Object3D,
    text: string,
    x: number,
    y: number,
    z: number,
    width = 2.6,
    height = 0.32,
  ) {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 128;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#e3d9c2";
    ctx.fillRect(0, 0, 1024, 128);
    ctx.fillStyle = "#7e6947";
    ctx.font = "46px Georgia";
    ctx.textAlign = "center";
    ctx.fillText(text, 512, 82);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    const plaque = new THREE.Mesh(
      new THREE.PlaneGeometry(width, height),
      new THREE.MeshBasicMaterial({ map: texture }),
    );
    plaque.position.set(x, y, z);
    parent.add(plaque);
  }
  label(world, "RESEARCH GALLERY", -7.75, 2.92, -4.13, 3.6, 0.34);
  label(world, "THE GRAND HALL", 0.1, 5.82, -4.12, 4, 0.36);
  label(world, "PROJECT GALLERY", 8.2, 2.92, -4.13, 3.7, 0.34);
  const awardWall = groupAt(-2.45, 0, -4.02);
  function frame(x: number, y: number, w: number, h: number, number: string) {
    box(w, h, 0.12, brass, x, y, 0, awardWall);
    box(w - 0.13, h - 0.13, 0.04, "#fff7e7", x, y, 0.09, awardWall);
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 320;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#fff7e7";
    ctx.fillRect(0, 0, 256, 320);
    ctx.strokeStyle = "#b88f4c";
    ctx.lineWidth = 3;
    ctx.strokeRect(15, 15, 226, 290);
    ctx.textAlign = "center";
    ctx.fillStyle = "#8b6337";
    ctx.font = "72px Georgia";
    ctx.fillText("✦", 128, 116);
    ctx.font = "24px Georgia";
    ctx.fillText(number, 128, 184);
    ctx.font = "14px Georgia";
    ctx.fillText("A LITTLE MILESTONE", 128, 225);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    const print = new THREE.Mesh(
      new THREE.PlaneGeometry(w - 0.16, h - 0.16),
      new THREE.MeshBasicMaterial({ map: texture }),
    );
    print.position.set(x, y, 0.115);
    awardWall.add(print);
  }
  frame(-1.45, 2.85, 0.9, 1.25, "CREATE");
  frame(-0.15, 3.05, 1.1, 1.5, "BUILD");
  frame(1.25, 2.85, 0.9, 1.25, "GROW");
  box(4.1, 0.12, 0.55, wood, 0, 1.63, 0.2, awardWall);
  for (let i = 0; i < 4; i++) {
    const x = -1.4 + i * 0.9;
    box(0.42, 0.09, 0.3, darkWood, x, 1.74, 0.2, awardWall);
    cylinder(0.05, 0.07, 0.22, brass, x, 1.9, 0.2, awardWall);
    mesh(
      new THREE.CylinderGeometry(0.19, 0.07, 0.28, 16),
      brass,
      x,
      2.1,
      0.2,
      awardWall,
      true,
    );
    for (const side of [-1, 1]) {
      const handle = mesh(
        new THREE.TorusGeometry(0.105, 0.024, 6, 16),
        brass,
        x + side * 0.19,
        2.14,
        0.2,
        awardWall,
        true,
      );
      handle.scale.y = 1.1;
    }
  }
  interactive(awardWall, "awards");

  const sourceWindow = castle.archWindow(2.9, 2.55, -4.12, 2.05, 2.95);
  interactive(sourceWindow, "open-source");
  const desk = groupAt(8.1, 0.5, -2.4);
  box(1.6, 1.1, 1.1, "#c9bea7", 0, 0.55, 0, desk);
  box(1.85, 0.14, 1.25, "#e3d9c2", 0, 1.16, 0, desk);
  box(1.45, 1.03, 0.13, "#53635d", 0, 1.91, -0.23, desk, 0.06);
  box(0.1, 0.3, 0.1, brass, 0, 1.35, -0.23, desk);
  const codeCanvas = document.createElement("canvas");
  codeCanvas.width = 512;
  codeCanvas.height = 320;
  const code = codeCanvas.getContext("2d")!;
  code.fillStyle = "#233d36";
  code.fillRect(0, 0, 512, 320);
  for (let i = 0; i < 3; i++) {
    code.fillStyle = ["#d7a082", "#dbc77f", "#a6bc8c"][i];
    code.beginPath();
    code.arc(24 + i * 18, 22, 5, 0, Math.PI * 2);
    code.fill();
  }
  code.font = "24px monospace";
  code.fillStyle = "#d1dfb0";
  code.fillText("hello, world_", 32, 85);
  const codeColors = ["#b5cbb0", "#d2b28d", "#8fb9b0", "#b5cbb0", "#d2b28d"];
  for (let i = 0; i < 6; i++) {
    code.fillStyle = codeColors[i % 5];
    code.fillRect(33 + (i % 3) * 20, 122 + i * 25, 130 + ((i * 67) % 200), 7);
  }
  const codeTexture = new THREE.CanvasTexture(codeCanvas);
  codeTexture.colorSpace = THREE.SRGBColorSpace;
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(1.18, 0.75),
    new THREE.MeshBasicMaterial({ map: codeTexture }),
  );
  screen.position.set(0, 1.9, -0.15);
  desk.add(screen);
  interactive(desk, "projects");
  const judging = groupAt(3.65, 0.47, 1.8);
  box(1.3, 0.94, 1.05, "#c9bea7", 0, 0.47, 0, judging);
  box(1.5, 0.14, 1.2, "#e3d9c2", 0, 1, 0, judging);
  cylinder(0.24, 0.28, 0.06, brass, 0, 1.08, 0, judging);
  cylinder(0.04, 0.07, 0.84, brass, 0, 1.53, 0, judging);
  ball(0.075, brass, 0, 1.99, 0, judging);
  rod(
    new THREE.Vector3(-0.56, 1.92, 0),
    new THREE.Vector3(0.56, 1.92, 0),
    0.025,
    brass,
    judging,
  );
  for (const x of [-0.5, 0.5]) {
    for (const offset of [-0.16, 0.16])
      rod(
        new THREE.Vector3(x, 1.93, 0),
        new THREE.Vector3(x + offset, 1.5, 0),
        0.009,
        brass,
        judging,
      );
    const pan = mesh(
      new THREE.SphereGeometry(
        0.2,
        18,
        8,
        0,
        Math.PI * 2,
        Math.PI / 2,
        Math.PI / 2,
      ),
      brass,
      x,
      1.52,
      0,
      judging,
      true,
    );
    pan.scale.y = 0.24;
  }
  interactive(judging, "judge");

  const shelf = groupAt(-9.45, 0.5, 1.35);
  box(0.74, 2.6, 2.5, wood, 0, 1.3, 0, shelf);
  box(0.06, 2.4, 2.28, "#765b40", 0.4, 1.3, 0, shelf);
  const bookColors = [
    "#a27259",
    "#7b9686",
    "#d4bf88",
    "#738b91",
    "#c18f78",
    "#d8cbb1",
  ];
  for (let row = 0; row < 3; row++) {
    box(0.86, 0.1, 2.6, "#bb946a", 0.12, 0.5 + row * 0.8, 0, shelf);
    for (let j = 0; j < 10; j++) {
      const book = box(
        0.5,
        0.4 + (j % 3) * 0.08,
        0.13,
        bookColors[(j + row) % 6],
        0.38,
        0.8 + row * 0.8,
        -1.01 + j * 0.215,
        shelf,
        0.01,
      );
      book.rotation.x = j === 8 ? 0.16 : 0;
      box(
        0.012,
        0.024,
        0.1,
        "#e2d5b5",
        0.64,
        0.83 + row * 0.8,
        -1.01 + j * 0.215,
        shelf,
      );
    }
  }
  interactive(shelf, "research");

  function manuscript(x: number, z: number, title: string) {
    const display = groupAt(x, 0.5, z);
    box(2, 0.84, 1.15, "#c9bea7", 0, 0.42, 0, display);
    box(2.18, 0.12, 1.3, "#e3d9c2", 0, 0.9, 0, display);
    const glass = box(2.03, 0.45, 1.15, "#b8d0cf", 0, 1.17, 0, display);
    const glassMaterial = glass.material as THREE.MeshStandardMaterial;
    glassMaterial.transparent = true;
    glassMaterial.opacity = 0.18;
    glassMaterial.depthWrite = false;
    glass.castShadow = false;
    box(1.5, 0.025, 0.85, "#f5ead5", 0, 0.99, 0, display);
    for (let row = 0; row < 6; row++)
      box(
        1.15 - (row % 3) * 0.14,
        0.008,
        0.015,
        "#baac8e",
        0,
        1.008,
        -0.3 + row * 0.11,
        display,
      );
    label(display, title, 0, 0.58, 0.59, 1.7, 0.2);
    interactive(display, "research");
  }
  manuscript(-7.3, -1.65, "SCOPEAWARE");
  manuscript(-6.8, 1.6, "STABLEHLO");
  // Sculptural project exhibits flank the interactive computer terminal.
  for (const [x, title] of [
    [6.4, "WARDEN"],
    [9.8, "HYPOTHESIS ATLAS"],
  ] as [number, string][]) {
    const exhibit = groupAt(x, 0.5, 1.9);
    cylinder(0.55, 0.64, 1.05, "#c9bea7", 0, 0.525, 0, exhibit);
    cylinder(0.62, 0.62, 0.1, "#e3d9c2", 0, 1.1, 0, exhibit);
    label(exhibit, title, 0, 0.65, 0.58, 1.05, 0.15);
    const ring = mesh(
      new THREE.TorusGeometry(0.4, 0.035, 8, 40),
      brass,
      0,
      1.7,
      0,
      exhibit,
    );
    ring.rotation.y = 0.4;
    for (let i = 0; i < 5; i++) {
      const a = (i * Math.PI * 2) / 5;
      ball(
        0.065,
        "#829d91",
        Math.cos(a) * 0.3,
        1.7 + Math.sin(a) * 0.3,
        0,
        exhibit,
      );
      rod(
        new THREE.Vector3(0, 1.7, 0),
        new THREE.Vector3(Math.cos(a) * 0.3, 1.7 + Math.sin(a) * 0.3, 0),
        0.012,
        brass,
        exhibit,
      );
    }
    interactive(exhibit, "projects");
  }
  // A museum bench gives the little cat a comfortable place in the hall.
  const bench = groupAt(-3.45, 0.5, 1.35);
  box(1.2, 0.18, 3.05, "#ac7b86", 0, 0.84, 0, bench, 0.07);
  box(1.25, 0.1, 3.1, brass, 0, 0.7, 0, bench);
  for (const x of [-0.45, 0.45])
    for (const z of [-1.25, 1.25])
      box(0.09, 0.68, 0.09, "#a18c61", x, 0.34, z, bench);
  // The globe is a freestanding gallery exhibit, not a coffee table.
  const coffee = groupAt(-0.7, 0.5, 2.35);
  cylinder(0.47, 0.6, 0.95, "#c9bea7", 0, 0.475, 0, coffee);
  cylinder(0.62, 0.62, 0.12, "#e3d9c2", 0, 1.0, 0, coffee);
  cylinder(0.23, 0.26, 0.05, brass, 0, 1.1, 0, coffee);
  cylinder(0.035, 0.04, 0.2, brass, 0, 1.22, 0, coffee);
  const globe = ball(0.35, "#82aaa4", 0, 1.55, 0, coffee);
  for (let i = 0; i < 7; i++) {
    const patch = ball(0.14, "#aebc81", 0, 0, 0, globe);
    const a = i * 2.4;
    patch.position.set(
      Math.sin(a) * 0.3,
      Math.sin(i * 3.7) * 0.2,
      Math.cos(a) * 0.3,
    );
    patch.scale.set(0.8, 1, 0.35);
  }
  const globeRing = mesh(
    new THREE.TorusGeometry(0.4, 0.016, 6, 40),
    brass,
    0,
    1.55,
    0,
    coffee,
  );
  globeRing.rotation.z = 0.3;
  interactive(coffee, "travel");
  const host = createLuxin(kit);
  host.group.position.set(0.1, 0.5, -0.1);
  host.group.scale.setScalar(1.12);
  host.group.rotation.y = 0.4;
  world.add(host.group);
  interactive(host.group, "about");
  const visitor = createVisitor(kit);
  visitor.group.scale.setScalar(0.72);
  visitor.group.position.set(0, 0.12, 6.5);
  visitor.group.rotation.y = Math.PI;
  world.add(visitor.group);
  // Garden trees, pale picket fencing, wildflowers, a pond, and stepping stones.
  function tree(x: number, z: number, size = 1) {
    cylinder(
      0.13 * size,
      0.19 * size,
      1.9 * size,
      "#9a7853",
      x,
      0.95 * size,
      z,
    );
    for (let i = 0; i < 5; i++) {
      const a = i * 2.4;
      const crown = mesh(
        new THREE.IcosahedronGeometry(0.95 * size, 1),
        i % 2 ? "#93aa76" : "#a5b985",
        x + Math.sin(a) * 0.45 * size,
        (2.1 + (i % 2) * 0.6) * size,
        z + Math.cos(a) * 0.45 * size,
      );
      crown.rotation.y = a;
    }
  }
  tree(-12.7, -4.3, 1.15);
  tree(13.2, -4.5, 1.0);
  tree(11.6, 6.8, 0.9);
  const garden = groupAt(-12, 0.12, 3.8);
  for (let i = 0; i < 4; i++)
    box(1.55, 0.08, 0.16, wood, 0, 0.61, -0.36 + i * 0.22, garden);
  for (const x of [-0.6, 0.6])
    box(0.1, 0.58, 0.6, darkWood, x, 0.29, 0, garden);
  box(1.55, 0.3, 0.09, wood, 0, 0.97, -0.46, garden);
  interactive(garden, "garden");
  const pond = cylinder(1.35, 1.35, 0.045, "#97b6ad", 12.8, 0.09, 0.3);
  pond.scale.z = 1.3;
  const pondEdge = mesh(
    new THREE.TorusGeometry(1.4, 0.1, 7, 48),
    "#c4bea4",
    12.8,
    0.11,
    0.3,
  );
  pondEdge.rotation.x = Math.PI / 2;
  pondEdge.scale.y = 1.3;
  for (let i = 0; i < 3; i++) {
    const pad = cylinder(
      0.17,
      0.17,
      0.012,
      "#859e72",
      12.8 + Math.sin(i * 2) * 0.8,
      0.13,
      0.3 + Math.cos(i * 2) * 0.85,
    );
    pad.rotation.y = i;
  }
  for (let i = 0; i < 5; i++) {
    const stone = cylinder(
      0.48,
      0.53,
      0.09,
      i % 2 ? "#dfd5ba" : "#d5cbb1",
      i % 2 ? 0.08 : -0.08,
      0.1,
      5.5 + i * 0.5,
    );
    stone.scale.z = 0.65;
  }
  box(30, 0.45, 0.3, "#c9bea7", 0.7, 0.3, -6.05);
  for (let i = 0; i < 25; i++)
    box(0.45, 0.35, 0.42, "#e3d9c2", -14.2 + i * 1.24, 0.65, -6.05);
  for (let i = 0; i < 55; i++) {
    const a = i * 2.399;
    const x = i < 28 ? -12.4 + Math.sin(a) * 1.25 : 8.8 + Math.sin(a) * 1.25;
    const z = i < 28 ? 0.2 + Math.cos(a) * 1.5 : 5.8 + Math.cos(a) * 0.8;
    rod(
      new THREE.Vector3(x, 0.1, z),
      new THREE.Vector3(x, 0.33 + (i % 3) * 0.1, z),
      0.012,
      "#809267",
    );
    const flower = ball(
      0.075,
      ["#e5bd83", "#dba594", "#f2e8ca", "#c0aece"][i % 4],
      x,
      0.36 + (i % 3) * 0.1,
      z,
    );
    flower.scale.y = 0.65;
  }

  const destination = mesh(
    new THREE.RingGeometry(0.15, 0.2, 32),
    "#b88b54",
    0,
    0.51,
    0,
  );
  destination.rotation.x = -Math.PI / 2;
  destination.visible = false;
  const ring = mesh(
    new THREE.TorusGeometry(0.31, 0.018, 5, 40),
    "#e4bc73",
    0,
    0.03,
    0,
    visitor.group,
  );
  ring.rotation.x = Math.PI / 2;
  const ambient = new THREE.HemisphereLight("#fff6df", "#b0a68d", 2.15);
  scene.add(ambient);
  const sun = new THREE.DirectionalLight("#fff0cf", 3);
  sun.position.set(-8, 21, 13);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -22;
  sun.shadow.camera.right = 22;
  sun.shadow.camera.top = 20;
  sun.shadow.camera.bottom = -20;
  sun.shadow.normalBias = 0.045;
  sun.shadow.bias = -0.0003;
  scene.add(sun);
  const fill = new THREE.DirectionalLight("#e5ede4", 1.1);
  fill.position.set(8, 6, -5);
  scene.add(fill);
  const lampLight = new THREE.PointLight("#ffd6a1", 2.5, 9);
  lampLight.position.set(0.4, 4.9, 0.1);
  world.add(lampLight);
  const animals = addAnimals(kit);
  const anchors = Object.fromEntries(
    houseSpots.map((spot) => [spot.id, new THREE.Vector3(...spot.position)]),
  ) as Record<RoomSection, THREE.Vector3>;
  interactables.push(
    ...batchStaticGeometry(world, [
      host.group,
      visitor.group,
      globe,
      destination,
      ...castle.flames,
      ...animals.groups,
    ]),
  );
  return {
    world,
    host,
    visitor,
    interactables,
    anchors,
    destination,
    sun,
    ambient,
    lampLight,
    globe,
    castle,
    animals,
  };
}
