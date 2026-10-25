import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

// Furniture and garden pieces sharing a material can be one draw call. Keep
// interactive sections separate, and leave the characters and globe animated.
export function batchStaticGeometry(
  root: THREE.Group,
  animated: THREE.Object3D[],
) {
  const excluded = new Set(animated);
  const buckets = new Map<
    string,
    { material: THREE.Material; section?: string; meshes: THREE.Mesh[] }
  >();
  root.updateWorldMatrix(true, true);
  root.traverse((object) => {
    if (!(object instanceof THREE.Mesh) || Array.isArray(object.material))
      return;
    let ancestor: THREE.Object3D | null = object;
    while (ancestor) {
      if (excluded.has(ancestor)) return;
      ancestor = ancestor.parent;
    }
    const section = object.userData.section as string | undefined;
    const key = `${object.material.uuid}:${section || "scenery"}`;
    if (!buckets.has(key))
      buckets.set(key, { material: object.material, section, meshes: [] });
    buckets.get(key)!.meshes.push(object);
  });
  const interactive: THREE.Object3D[] = [];
  for (const { material, section, meshes } of Array.from(buckets.values())) {
    const parts = meshes.map((object) => {
      const clone = object.geometry.clone().applyMatrix4(object.matrixWorld);
      if (!clone.index) return clone;
      const geometry = clone.toNonIndexed();
      clone.dispose();
      return geometry;
    });
    const geometry = mergeGeometries(parts, false);
    parts.forEach((part) => part.dispose());
    if (!geometry) continue;
    geometry.computeBoundingSphere();
    const combined = new THREE.Mesh(geometry, material);
    combined.castShadow = true;
    combined.receiveShadow = true;
    combined.userData.section = section;
    root.add(combined);
    if (section) interactive.push(combined);
    meshes.forEach((object) => {
      object.removeFromParent();
      object.geometry.dispose();
    });
  }
  return interactive;
}
