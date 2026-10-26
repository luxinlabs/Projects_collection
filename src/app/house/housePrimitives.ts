import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

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

export function createHouseKit(scene: THREE.Scene): HouseKit {
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

  return { world, mat, mesh, box, ball, cylinder, rod, groupAt, plant };
}
