import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { batchStaticGeometry } from "./batchGeometry";
import { houseSpots, type RoomSection } from "./houseContent";

export function buildHouse(scene: THREE.Scene) {
  const world = new THREE.Group();
  scene.add(world);
  const materials = new Map<string, THREE.MeshStandardMaterial>();
  const mat = (color: string, metal = false) => {
    const key = color + metal;
    if (!materials.has(key))
      materials.set(
        key,
        new THREE.MeshStandardMaterial({
          color,
          roughness: metal ? 0.35 : 0.85,
          metalness: metal ? 0.65 : 0,
        }),
      );
    return materials.get(key)!;
  };
  const wood = "#99704b",
    darkWood = "#694c37",
    cream = "#eee4ce",
    brass = "#c39952";
  function mesh(
    geo: THREE.BufferGeometry,
    color: string,
    x: number,
    y: number,
    z: number,
    parent: THREE.Object3D = world,
    metal = false,
  ) {
    const object = new THREE.Mesh(geo, mat(color, metal));
    object.position.set(x, y, z);
    object.castShadow = true;
    object.receiveShadow = true;
    parent.add(object);
    return object;
  }
  function box(
    w: number,
    h: number,
    d: number,
    color: string,
    x: number,
    y: number,
    z: number,
    parent: THREE.Object3D = world,
    radius = 0.04,
  ) {
    return mesh(
      new RoundedBoxGeometry(w, h, d, 2, Math.min(radius, w / 4, h / 4, d / 4)),
      color,
      x,
      y,
      z,
      parent,
    );
  }
  function ball(
    r: number,
    color: string,
    x: number,
    y: number,
    z: number,
    parent: THREE.Object3D = world,
  ) {
    return mesh(new THREE.SphereGeometry(r, 16, 12), color, x, y, z, parent);
  }
  function cylinder(
    rt: number,
    rb: number,
    h: number,
    color: string,
    x: number,
    y: number,
    z: number,
    parent: THREE.Object3D = world,
  ) {
    return mesh(
      new THREE.CylinderGeometry(rt, rb, h, 20),
      color,
      x,
      y,
      z,
      parent,
    );
  }
  function rod(
    from: THREE.Vector3,
    to: THREE.Vector3,
    radius: number,
    color: string,
    parent: THREE.Object3D = world,
  ) {
    const middle = from.clone().add(to).multiplyScalar(0.5);
    const item = cylinder(
      radius,
      radius,
      from.distanceTo(to),
      color,
      middle.x,
      middle.y,
      middle.z,
      parent,
    );
    item.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      to.clone().sub(from).normalize(),
    );
    return item;
  }
  const groupAt = (x: number, y: number, z: number) => {
    const group = new THREE.Group();
    group.position.set(x, y, z);
    world.add(group);
    return group;
  };
  const interactables: THREE.Object3D[] = [];
  function interactive(object: THREE.Object3D, id: RoomSection) {
    object.traverse((child) => {
      child.userData.section = id;
    });
    interactables.push(object);
  }

  // A little island, with the room sliced open like an architectural dollhouse.
  box(18.4, 0.65, 15.2, "#c7bea2", 0, -0.42, 0.8, world, 0.25);
  box(18.3, 0.18, 15.1, "#b8c497", 0, -0.05, 0.8, world, 0.08);
  box(10.8, 0.48, 8.8, "#8b6549", 0, 0.17, 0, world, 0.08);
  const plankColors = ["#d4b58d", "#d9bd97", "#d0ac80", "#d9b78e"];
  for (let i = 0; i < 20; i++)
    for (let j = 0; j < 4; j++) {
      box(
        0.505,
        0.07,
        2.08,
        plankColors[(i + j * 3) % 4],
        -4.94 + i * 0.52,
        0.44,
        -3.15 + j * 2.1,
        world,
        0.008,
      );
    }
  box(10.8, 4.15, 0.25, cream, 0, 2.4, -4.32);
  box(0.25, 4.15, 8.65, "#e1d8be", -5.3, 2.4, 0);
  box(10.9, 0.2, 0.42, wood, 0, 4.52, -4.32);
  box(0.4, 0.2, 8.75, wood, -5.3, 4.52, 0);
  box(10.6, 0.22, 0.1, wood, 0, 0.62, -4.12);
  box(0.1, 0.22, 8.45, wood, -5.12, 0.62, 0);
  for (const x of [-5.15, 0.35, 5.15])
    box(0.15, 4, 0.18, "#c4aa84", x, 2.4, -4.12);
  // Low edges leave the visitor's view open; front steps lead into the house.
  box(3.9, 0.35, 0.18, wood, -3.25, 0.6, 4.25);
  box(3.9, 0.35, 0.18, wood, 3.25, 0.6, 4.25);
  box(2.5, 0.18, 0.7, "#b79b78", 0, 0.16, 4.65);
  box(3.1, 0.13, 0.6, "#c5b18e", 0, 0.07, 5.12);

  // A woven oval rug and a few tiny stitches.
  const rug = cylinder(2.22, 2.22, 0.025, "#e9dcc0", -0.2, 0.505, 0.75);
  rug.scale.z = 0.76;
  const rugBorder = mesh(
    new THREE.TorusGeometry(2.06, 0.022, 5, 80),
    "#bd8f68",
    -0.2,
    0.53,
    0.75,
  );
  rugBorder.rotation.x = Math.PI / 2;
  rugBorder.scale.y = 0.76;
  for (let i = 0; i < 11; i++)
    box(0.025, 0.012, 0.16, "#bd8f68", -1.2 + i * 0.2, 0.53, 2.18);

  // Framed awards, a trophy shelf, and small brass cups.
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

  // The open-source window has a blue view, cream curtains, and a window box.
  const windowGroup = groupAt(2.9, 2.8, -4.1);
  box(2.65, 2.25, 0.2, wood, 0, 0, 0, windowGroup);
  box(2.4, 2.02, 0.08, "#accbc7", 0, 0, 0.13, windowGroup);
  const sky = box(2.3, 0.8, 0.02, "#cfdfd1", 0, 0.56, 0.18, windowGroup);
  sky.castShadow = false;
  for (const x of [-0.8, 0, 0.7]) {
    const cloud = ball(0.21, "#edf0df", x, 0.66, 0.22, windowGroup);
    cloud.scale.set(1.7, 0.6, 0.2);
  }
  box(0.08, 2, 0.1, "#f6ebd2", 0, 0, 0.22, windowGroup);
  box(2.4, 0.08, 0.1, "#f6ebd2", 0, 0, 0.22, windowGroup);
  box(3, 0.12, 0.55, "#bf9c73", 0, -1.15, 0.22, windowGroup);
  rod(
    new THREE.Vector3(-1.7, 1.3, 0.2),
    new THREE.Vector3(1.7, 1.3, 0.2),
    0.04,
    brass,
    windowGroup,
  );
  for (const side of [-1, 1])
    for (let j = 0; j < 3; j++) {
      const curtain = box(
        0.18,
        2.4,
        0.17,
        j % 2 ? "#d6b384" : "#e5c698",
        side * (1.3 + j * 0.13),
        -0.02,
        0.2,
        windowGroup,
      );
      curtain.rotation.z = side * -0.055;
    }
  interactive(windowGroup, "open-source");

  // The computer is deliberately a real model, with a tiny drawn IDE on screen.
  const desk = groupAt(3.1, 0.47, -2.6);
  box(2.6, 0.16, 1.25, wood, 0, 1.15, 0, desk);
  for (const x of [-1.08, 1.08])
    for (const z of [-0.44, 0.44])
      box(0.12, 1.12, 0.12, darkWood, x, 0.56, z, desk);
  box(1.3, 0.88, 0.1, "#444c44", 0, 1.9, -0.23, desk);
  box(0.08, 0.3, 0.09, "#444c44", 0, 1.37, -0.23, desk);
  box(0.5, 0.045, 0.3, "#444c44", 0, 1.26, -0.15, desk);
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
  screen.position.set(0, 1.9, -0.17);
  desk.add(screen);
  box(0.9, 0.04, 0.3, "#e1d8c6", 0, 1.26, 0.33, desk);
  for (let i = 0; i < 10; i++)
    box(0.045, 0.008, 0.19, "#b2a591", -0.36 + i * 0.08, 1.285, 0.33, desk);
  cylinder(0.1, 0.085, 0.19, "#d7b17a", 0.9, 1.33, 0.28, desk);
  const mugHandle = mesh(
    new THREE.TorusGeometry(0.065, 0.018, 6, 12),
    "#d7b17a",
    1.01,
    1.34,
    0.28,
    desk,
  );
  mugHandle.rotation.y = Math.PI / 2;
  const chair = groupAt(3.1, 0.48, -1.35);
  box(0.75, 0.12, 0.7, "#83917b", 0, 0.65, 0, chair);
  box(0.75, 0.65, 0.12, "#83917b", 0, 0.96, 0.3, chair);
  for (const x of [-0.27, 0.27])
    for (const z of [-0.25, 0.25])
      box(0.07, 0.62, 0.07, wood, x, 0.31, z, chair);
  interactive(desk, "projects");
  interactive(chair, "projects");

  // A proper brass balance scale on a little side table.
  const judging = groupAt(3.65, 0.47, 1.8);
  box(1.5, 0.15, 1.2, "#a47b53", 0, 0.95, 0, judging);
  for (const x of [-0.58, 0.58])
    for (const z of [-0.42, 0.42])
      box(0.09, 0.9, 0.09, wood, x, 0.45, z, judging);
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

  // Books, a comfortable sofa, a sleeping cat, and a reading lamp.
  const shelf = groupAt(-4.65, 0.5, -1.35);
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
  const sofa = groupAt(-3.45, 0.5, 1.35);
  box(1.42, 0.45, 3.15, "#bc8468", 0, 0.53, 0, sofa, 0.12);
  box(0.3, 0.92, 3.15, "#aa745c", -0.64, 0.86, 0, sofa, 0.12);
  for (const z of [-1.4, 1.4])
    box(1.45, 0.7, 0.3, "#b97e63", 0, 0.88, z, sofa, 0.1);
  for (const z of [-0.73, 0.73])
    box(1.15, 0.22, 1.16, "#d09b7c", 0.1, 0.85, z, sofa, 0.1);
  const pillow = box(
    0.28,
    0.58,
    0.56,
    "#dcc899",
    -0.25,
    1.17,
    -0.75,
    sofa,
    0.09,
  );
  pillow.rotation.z = -0.22;
  const cat = ball(0.22, "#e9cf9e", 0.1, 1.08, 0.65, sofa);
  cat.scale.set(1.5, 0.65, 1);
  ball(0.14, "#e9cf9e", 0.35, 1.12, 0.6, sofa);
  for (const z of [0.52, 0.68]) {
    const ear = mesh(
      new THREE.ConeGeometry(0.065, 0.13, 3),
      "#d4af80",
      0.36,
      1.25,
      z,
      sofa,
    );
    ear.rotation.x = 0.15;
  }
  cylinder(0.18, 0.24, 0.07, brass, -3.3, 0.54, -0.65);
  cylinder(0.025, 0.025, 2.35, brass, -3.3, 1.72, -0.65);
  cylinder(0.24, 0.43, 0.5, "#f3dab0", -3.3, 2.9, -0.65);
  const lampLight = new THREE.PointLight("#ffce89", 2.5, 5);
  lampLight.position.set(-3.3, 2.6, -0.65);
  world.add(lampLight);

  // Coffee table and the little physical globe.
  const coffee = groupAt(-0.7, 0.5, 2.35);
  box(1.8, 0.12, 1.2, "#b78c60", 0, 0.65, 0, coffee, 0.12);
  for (const x of [-0.66, 0.66])
    for (const z of [-0.35, 0.35])
      box(0.08, 0.65, 0.08, darkWood, x, 0.32, z, coffee);
  cylinder(0.23, 0.26, 0.05, brass, 0.15, 0.76, 0, coffee);
  cylinder(0.035, 0.04, 0.2, brass, 0.15, 0.86, 0, coffee);
  const globe = ball(0.35, "#82aaa4", 0.15, 1.28, 0, coffee);
  for (let i = 0; i < 7; i++) {
    const patch = ball(0.15, "#aebc81", 0, 0, 0, globe);
    const angle = i * 2.4;
    patch.position.set(
      Math.sin(angle) * 0.3,
      Math.sin(i * 3.7) * 0.2,
      Math.cos(angle) * 0.3,
    );
    patch.scale.set(0.8, 1, 0.35);
    patch.lookAt(globe.position);
  }
  const globeRing = mesh(
    new THREE.TorusGeometry(0.4, 0.016, 6, 40),
    brass,
    0.15,
    1.28,
    0,
    coffee,
  );
  globeRing.rotation.z = 0.3;
  box(0.4, 0.07, 0.3, "#6d8977", -0.5, 0.76, 0.12, coffee);
  interactive(coffee, "travel");

  // A recognizable miniature host, and a smaller visitor with a backpack.
  function person(color: string, isHost: boolean) {
    const group = new THREE.Group();
    const legs: THREE.Object3D[] = [],
      arms: THREE.Object3D[] = [];
    cylinder(0.17, 0.21, 0.42, color, 0, 0.66, 0, group);
    ball(0.26, "#e1b28e", 0, 1.06, 0, group);
    const hair = mesh(
      new THREE.SphereGeometry(
        0.275,
        20,
        14,
        0,
        Math.PI * 2,
        0,
        Math.PI * 0.44,
      ),
      "#45382f",
      0,
      1.1,
      -0.015,
      group,
    );
    if (isHost) {
      ball(0.13, "#45382f", 0, 1.17, -0.21, group);
      for (const x of [-0.1, 0.1]) {
        const glasses = mesh(
          new THREE.TorusGeometry(0.075, 0.012, 6, 18),
          "#5a4536",
          x,
          1.08,
          0.232,
          group,
        );
        glasses.scale.y = 0.8;
      }
      box(0.04, 0.015, 0.02, "#5a4536", 0, 1.08, 0.25, group);
    } else {
      hair.rotation.x = -0.15;
      box(0.28, 0.35, 0.15, "#b28d55", 0, 0.69, -0.2, group, 0.06);
      for (const x of [-0.13, 0.13])
        box(0.045, 0.36, 0.04, "#b28d55", x, 0.72, 0.15, group);
    }
    for (const x of [-0.1, 0.1]) {
      ball(0.023, "#3c332d", x, 1.08, 0.235, group);
      const leg = new THREE.Group();
      leg.position.set(x, 0.47, 0);
      group.add(leg);
      cylinder(0.065, 0.06, 0.3, "#4d615b", 0, -0.15, 0, leg);
      box(0.14, 0.08, 0.22, "#514537", 0, -0.33, 0.035, leg);
      legs.push(leg);
      const arm = new THREE.Group();
      arm.position.set(x * 2.3, 0.8, 0);
      group.add(arm);
      cylinder(0.065, 0.06, 0.3, color, 0, -0.12, 0, arm);
      ball(0.065, "#e1b28e", 0, -0.28, 0, arm);
      arms.push(arm);
    }
    // A small smile.
    const smile = mesh(
      new THREE.TorusGeometry(0.045, 0.009, 5, 12, Math.PI),
      "#a56e59",
      0,
      0.99,
      0.242,
      group,
    );
    smile.rotation.z = Math.PI;
    return { group, legs, arms };
  }
  const host = person("#7e9476", true);
  host.group.position.set(0.1, 0.5, -0.1);
  host.group.rotation.y = 0.4;
  world.add(host.group);
  interactive(host.group, "about");
  const visitor = person("#cf956f", false);
  visitor.group.scale.setScalar(0.72);
  visitor.group.position.set(0, 0.12, 6.5);
  visitor.group.rotation.y = Math.PI;
  world.add(visitor.group);

  // Clay pots with leaves are scattered through the room and garden.
  function plant(
    x: number,
    y: number,
    z: number,
    size = 1,
    parent: THREE.Object3D = world,
  ) {
    const group = new THREE.Group();
    group.position.set(x, y, z);
    group.scale.setScalar(size);
    parent.add(group);
    cylinder(0.23, 0.16, 0.4, "#bf8466", 0, 0.2, 0, group);
    cylinder(0.24, 0.24, 0.06, "#ce9675", 0, 0.39, 0, group);
    for (let i = 0; i < 7; i++) {
      const a = (i * Math.PI * 2) / 7;
      rod(
        new THREE.Vector3(0, 0.4, 0),
        new THREE.Vector3(
          Math.sin(a) * 0.24,
          0.8 + (i % 2) * 0.2,
          Math.cos(a) * 0.24,
        ),
        0.013,
        "#6f8260",
        group,
      );
      const leaf = ball(
        0.15,
        i % 2 ? "#7e996c" : "#98ad7b",
        Math.sin(a) * 0.25,
        0.79 + (i % 2) * 0.2,
        Math.cos(a) * 0.25,
        group,
      );
      leaf.scale.set(0.7, 1.8, 0.65);
      leaf.rotation.z = Math.sin(a) * -0.5;
    }
  }
  plant(4.6, 0.5, -3.6, 1.1);
  plant(-4.7, 0.5, 3.2, 1.15);
  plant(3.7, 1.7, -3.75, 0.4);

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
  tree(-7.5, -3.8, 1.15);
  tree(7.5, -3.8, 0.95);
  tree(7.6, 4.8, 0.85);
  const garden = groupAt(-7, 0.12, 3.8);
  for (let i = 0; i < 4; i++)
    box(1.55, 0.08, 0.16, wood, 0, 0.61, -0.36 + i * 0.22, garden);
  for (const x of [-0.6, 0.6])
    box(0.1, 0.58, 0.6, darkWood, x, 0.29, 0, garden);
  box(1.55, 0.3, 0.09, wood, 0, 0.97, -0.46, garden);
  interactive(garden, "garden");
  const pond = cylinder(1, 1, 0.045, "#97b6ad", 6.9, 0.09, 0);
  pond.scale.z = 1.3;
  const pondEdge = mesh(
    new THREE.TorusGeometry(1.04, 0.1, 7, 36),
    "#c4bea4",
    6.9,
    0.11,
    0,
  );
  pondEdge.rotation.x = Math.PI / 2;
  pondEdge.scale.y = 1.3;
  for (let i = 0; i < 3; i++) {
    const pad = cylinder(
      0.17,
      0.17,
      0.012,
      "#859e72",
      6.7 + Math.sin(i * 2) * 0.4,
      0.13,
      Math.cos(i * 2) * 0.6,
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
  for (let i = 0; i < 15; i++) {
    const x = -8.7 + i * 1.24;
    box(0.13, 0.8, 0.14, "#efead5", x, 0.45, -5.9);
    if (i < 14)
      for (const y of [0.3, 0.64])
        box(1.25, 0.08, 0.07, "#efead5", x + 0.6, y, -5.9);
  }
  for (let i = 0; i < 55; i++) {
    const a = i * 2.399;
    const x = i < 28 ? -7 + Math.sin(a) * 1.45 : 6.9 + Math.sin(a) * 1.25;
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
  // A small welcome sign and a brass ring identify the player.
  box(0.12, 1.1, 0.12, wood, 2.3, 0.6, 6.3);
  const sign = box(1.15, 0.55, 0.1, cream, 2.3, 1.1, 6.3);
  sign.rotation.y = 0.1;
  const ring = mesh(
    new THREE.TorusGeometry(0.31, 0.018, 5, 40),
    "#e4bc73",
    0,
    0.03,
    0,
    visitor.group,
  );
  ring.rotation.x = Math.PI / 2;
  const destination = mesh(
    new THREE.RingGeometry(0.15, 0.2, 32),
    "#b88b54",
    0,
    0.51,
    0,
  );
  destination.rotation.x = -Math.PI / 2;
  destination.visible = false;
  const ambient = new THREE.HemisphereLight("#fff6df", "#b0a68d", 2.6);
  scene.add(ambient);
  const sun = new THREE.DirectionalLight("#fff0cf", 3.5);
  sun.position.set(-6, 16, 10);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -15;
  sun.shadow.camera.right = 15;
  sun.shadow.camera.top = 14;
  sun.shadow.camera.bottom = -14;
  sun.shadow.normalBias = 0.045;
  sun.shadow.bias = -0.0003;
  scene.add(sun);
  const fill = new THREE.DirectionalLight("#e5ede4", 1.1);
  fill.position.set(8, 6, -5);
  scene.add(fill);
  const anchors = Object.fromEntries(
    houseSpots.map((spot) => [spot.id, new THREE.Vector3(...spot.position)]),
  ) as Record<RoomSection, THREE.Vector3>;

  interactables.push(
    ...batchStaticGeometry(world, [
      host.group,
      visitor.group,
      globe,
      destination,
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
  };
}
