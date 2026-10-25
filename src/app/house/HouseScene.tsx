"use client";

import {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type Ref,
} from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { buildHouse } from "./buildHouse";
import { houseSpots, type RoomSection } from "./houseContent";
import { canWalk, findWalkPath, walkDirection } from "./navigation";

export interface HouseSceneHandle {
  visit: (section: RoomSection) => void;
  reset: () => void;
  zoom: (amount: number) => void;
  move: (direction: string, pressed: boolean) => void;
}

interface Props {
  sceneRef: Ref<HouseSceneHandle>;
  active: RoomSection | null;
  evening: boolean;
  onReach: (section: RoomSection) => void;
  onNear: (section: RoomSection | null) => void;
  onReady: () => void;
  onWalking: (walking: boolean) => void;
}

export default function HouseScene(props: Props) {
  const container = useRef<HTMLDivElement>(null);
  const labels = useRef<Partial<Record<RoomSection, HTMLButtonElement | null>>>(
    {},
  );
  const visitorLabel = useRef<HTMLSpanElement>(null);
  const handlers = useRef(props);
  const api = useRef<HouseSceneHandle>();
  const lightSwitch = useRef<(evening: boolean) => void>();
  const [error, setError] = useState(false);
  handlers.current = props;

  useImperativeHandle(
    props.sceneRef,
    () => ({
      visit: (id) => api.current?.visit(id),
      reset: () => api.current?.reset(),
      zoom: (amount) => api.current?.zoom(amount),
      move: (direction, pressed) => api.current?.move(direction, pressed),
    }),
    [],
  );
  useEffect(() => {
    lightSwitch.current?.(props.evening);
  }, [props.evening]);

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      api.current = {
        visit: (id) => handlers.current.onReach(id),
        reset: () => {},
        zoom: () => {},
        move: () => {},
      };
      setError(true);
      handlers.current.onReady();
      return () => {
        api.current = undefined;
      };
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMap.autoUpdate = false;
    renderer.shadowMap.needsUpdate = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute(
      "aria-label",
      "Interactive 3D house. Click objects to explore, click the ground to walk, or use WASD and arrow keys.",
    );
    renderer.domElement.setAttribute("role", "img");
    renderer.domElement.tabIndex = 0;
    element.prepend(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-12, 12, 9, -9, 0.1, 120);
    const homeTarget = new THREE.Vector3(0, 0.7, 0.8);
    const homePosition = new THREE.Vector3(18, 19, 23);
    camera.position.copy(homePosition);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.copy(homeTarget);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.minPolarAngle = 0.55;
    controls.maxPolarAngle = 1.16;
    controls.minAzimuthAngle = -0.15;
    controls.maxAzimuthAngle = 1.3;
    const house = buildHouse(scene);
    lightSwitch.current = (evening) => {
      house.sun.intensity = evening ? 1.5 : 3.5;
      house.sun.color.set(evening ? "#ffc589" : "#fff0cf");
      house.ambient.intensity = evening ? 1.8 : 2.6;
      house.ambient.color.set(evening ? "#e7d6ce" : "#fff6df");
      house.lampLight.intensity = evening ? 6 : 2.5;
    };
    lightSwitch.current(handlers.current.evening);
    const target = new THREE.Vector3();
    const desiredCameraTarget = homeTarget.clone();
    let desiredZoom = 1;
    let path: [number, number][] = [];
    let pending: RoomSection | null = null;
    let nearest: RoomSection | null = null;
    let wasWalking = false;
    let ready = false;
    let previousTime = 0;
    let lastShadow = 0;
    let lastRender = 0;
    let walkingPhase = 0;
    let hovered: RoomSection | null = null;
    const keys = new Set<string>();
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const ground = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.48);
    const pointerStart = new THREE.Vector2();
    const scratch = new THREE.Vector3();
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    function startWalk(
      x: number,
      z: number,
      section: RoomSection | null = null,
    ) {
      path = findWalkPath(
        [house.visitor.group.position.x, house.visitor.group.position.z],
        [x, z],
      );
      pending = section;
      house.destination.position.set(
        x,
        x > -5.2 && x < 5.3 && z > -4.3 && z < 4.4 ? 0.52 : 0.13,
        z,
      );
      house.destination.visible = path.length > 0;
      if (!path.length && pending) {
        focus(pending);
        pending = null;
      }
    }
    function focus(id: RoomSection) {
      const spot = houseSpots.find((item) => item.id === id)!;
      // Keep the selected object to the left of the detail sheet.
      desiredCameraTarget.set(spot.approach[0] + 1.4, 1.2, spot.approach[1]);
      desiredZoom = window.innerWidth < 760 ? 1.15 : 1.35;
      handlers.current.onReach(id);
    }
    function manualMovement(direction: string, pressed: boolean) {
      if (pressed) {
        keys.add(direction);
        path = [];
        pending = null;
        house.destination.visible = false;
      } else keys.delete(direction);
    }
    api.current = {
      visit(id) {
        const spot = houseSpots.find((item) => item.id === id)!;
        desiredZoom = 1.1;
        desiredCameraTarget.copy(homeTarget);
        startWalk(...spot.approach, id);
      },
      reset() {
        desiredZoom = 1;
        desiredCameraTarget.copy(homeTarget);
        path = [];
        pending = null;
        house.destination.visible = false;
        // Preserve the current orbit to avoid a disorienting camera jump.
      },
      zoom(amount) {
        desiredZoom = THREE.MathUtils.clamp(desiredZoom + amount, 0.7, 2.4);
      },
      move(direction, pressed) {
        manualMovement(direction, pressed);
      },
    };
    function setPointer(event: PointerEvent) {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1,
      );
      raycaster.setFromCamera(pointer, camera);
    }
    const onDown = (event: PointerEvent) => {
      if (event.button !== 0 || !event.isPrimary) return;
      pointerStart.set(event.clientX, event.clientY);
    };
    const onUp = (event: PointerEvent) => {
      if (
        handlers.current.active ||
        event.button !== 0 ||
        !event.isPrimary ||
        pointerStart.distanceTo(
          new THREE.Vector2(event.clientX, event.clientY),
        ) > 7
      )
        return;
      setPointer(event);
      const objects = raycaster.intersectObjects(house.interactables, true);
      if (objects.length) {
        const section = objects[0].object.userData.section as RoomSection;
        api.current?.visit(section);
        return;
      }
      if (
        raycaster.ray.intersectPlane(ground, target) &&
        canWalk(target.x, target.z)
      )
        startWalk(target.x, target.z);
    };
    const onMove = (event: PointerEvent) => {
      setPointer(event);
      const hits = raycaster.intersectObjects(house.interactables, true);
      hovered = hits.length ? hits[0].object.userData.section : null;
      renderer.domElement.style.cursor = hovered ? "pointer" : "grab";
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        handlers.current.active ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey
      )
        return;
      if (
        (event.target as HTMLElement).closest(
          "input, textarea, button, a, [role=dialog]",
        )
      )
        return;
      const key = event.key.toLowerCase();
      if (
        [
          "w",
          "a",
          "s",
          "d",
          "arrowup",
          "arrowdown",
          "arrowleft",
          "arrowright",
          "e",
        ].includes(key)
      ) {
        event.preventDefault();
        if (key === "e") {
          if (nearest) focus(nearest);
          return;
        }
        manualMovement(key, true);
      }
    };
    const onKeyUp = (event: KeyboardEvent) =>
      keys.delete(event.key.toLowerCase());
    const clearKeys = () => keys.clear();
    renderer.domElement.addEventListener("pointerdown", onDown);
    renderer.domElement.addEventListener("pointerup", onUp);
    renderer.domElement.addEventListener("pointermove", onMove);
    renderer.domElement.addEventListener("webglcontextlost", (event) =>
      event.preventDefault(),
    );
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", clearKeys);
    const resize = () => {
      const { width, height } = element.getBoundingClientRect();
      const aspect = width / Math.max(height, 1);
      const halfHeight =
        window.innerWidth < 760
          ? 13.5 / aspect
          : aspect < 0.8
            ? 13.8
            : aspect < 1.2
              ? 11.3
              : 8.9;
      camera.left = -halfHeight * aspect;
      camera.right = halfHeight * aspect;
      camera.top = halfHeight;
      camera.bottom = -halfHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    resize();
    const visibility = () => {
      if (document.hidden) {
        keys.clear();
        previousTime = 0;
      }
    };
    document.addEventListener("visibilitychange", visibility);

    renderer.setAnimationLoop((time) => {
      if (document.hidden) return;
      const delta = previousTime
        ? Math.min((time - previousTime) / 1000, 0.12)
        : 0.016;
      previousTime = time;
      const visitor = house.visitor.group;
      let walking = false;
      if (!handlers.current.active) {
        let [dx, dz] = walkDirection(keys, [
          controls.target.x - camera.position.x,
          controls.target.z - camera.position.z,
        ]);
        if (dx || dz) {
          const length = Math.hypot(dx, dz),
            step = delta * 3.1;
          dx = (dx / length) * step;
          dz = (dz / length) * step;
          const oldX = visitor.position.x,
            oldZ = visitor.position.z;
          const steps = Math.max(1, Math.ceil(Math.hypot(dx, dz) / 0.1));
          for (let step = 0; step < steps; step++) {
            if (canWalk(visitor.position.x + dx / steps, visitor.position.z))
              visitor.position.x += dx / steps;
            if (canWalk(visitor.position.x, visitor.position.z + dz / steps))
              visitor.position.z += dz / steps;
          }
          walking = oldX !== visitor.position.x || oldZ !== visitor.position.z;
          visitor.rotation.y = Math.atan2(dx, dz);
        } else if (path.length) {
          let remaining = delta * 3.6;
          // Consume short waypoints in the same frame, so slow devices do not
          // pause for a frame at every step of a route.
          while (path.length && remaining > 0) {
            const next = path[0];
            const distance = Math.hypot(
              next[0] - visitor.position.x,
              next[1] - visitor.position.z,
            );
            if (distance < 0.001) {
              path.shift();
              continue;
            }
            const speed = Math.min(remaining, distance);
            dx = (next[0] - visitor.position.x) / distance;
            dz = (next[1] - visitor.position.z) / distance;
            visitor.position.x += dx * speed;
            visitor.position.z += dz * speed;
            visitor.rotation.y = Math.atan2(dx, dz);
            walking = true;
            remaining -= speed;
            if (speed >= distance) path.shift();
          }
          if (!path.length) {
            house.destination.visible = false;
            if (pending) {
              focus(pending);
              pending = null;
            }
          }
        }
      }
      const indoor =
        visitor.position.x > -5.2 &&
        visitor.position.x < 5.3 &&
        visitor.position.z > -4.3 &&
        visitor.position.z < 4.4;
      visitor.position.y = THREE.MathUtils.lerp(
        visitor.position.y,
        indoor ? 0.51 : 0.13,
        Math.min(delta * 12, 1),
      );
      if (walking !== wasWalking) {
        handlers.current.onWalking(walking);
        wasWalking = walking;
      }
      walkingPhase += walking ? delta * 13 : 0;
      house.visitor.legs.forEach((leg, i) => {
        leg.rotation.x =
          walking && !reduceMotion
            ? Math.sin(walkingPhase + i * Math.PI) * 0.6
            : 0;
      });
      house.visitor.arms.forEach((arm, i) => {
        arm.rotation.x =
          walking && !reduceMotion
            ? Math.sin(walkingPhase + i * Math.PI) * -0.4
            : 0;
      });
      if (!reduceMotion) {
        house.host.arms[1].rotation.z = -0.35 + Math.sin(time * 0.002) * 0.18;
        house.host.group.scale.y = 1 + Math.sin(time * 0.0018) * 0.012;
        house.globe.rotation.y += delta * 0.08;
      }
      let nearestDistance = 1.7;
      let nextNearest: RoomSection | null = null;
      houseSpots.forEach((spot) => {
        const distance = Math.hypot(
          visitor.position.x - spot.approach[0],
          visitor.position.z - spot.approach[1],
        );
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nextNearest = spot.id;
        }
      });
      if (nextNearest !== nearest) {
        nearest = nextNearest;
        handlers.current.onNear(nearest);
      }
      const lerp = reduceMotion ? 1 : 1 - Math.exp(-delta * 4);
      // Move the target and camera together to preserve the user's chosen angle.
      scratch
        .copy(desiredCameraTarget)
        .sub(controls.target)
        .multiplyScalar(lerp);
      controls.target.add(scratch);
      camera.position.add(scratch);
      camera.zoom = THREE.MathUtils.lerp(camera.zoom, desiredZoom, lerp);
      camera.updateProjectionMatrix();
      controls.enabled = !handlers.current.active;
      controls.update();
      for (const spot of houseSpots) {
        const button = labels.current[spot.id];
        if (!button) continue;
        const projected = house.anchors[spot.id].clone().project(camera);
        const width = element.clientWidth,
          height = element.clientHeight;
        button.style.transform = `translate(-50%, -100%) translate(${(projected.x * 0.5 + 0.5) * width}px, ${(-projected.y * 0.5 + 0.5) * height}px)`;
        button.style.visibility =
          projected.z > 1 ||
          Math.abs(projected.x) > 1.1 ||
          Math.abs(projected.y) > 1.1
            ? "hidden"
            : "visible";
        button.dataset.near = String(
          nearest === spot.id || hovered === spot.id,
        );
      }
      if (visitorLabel.current) {
        scratch
          .copy(visitor.position)
          .add(new THREE.Vector3(0, 1.22, 0))
          .project(camera);
        visitorLabel.current.style.transform = `translate(-50%, -100%) translate(${(scratch.x * 0.5 + 0.5) * element.clientWidth}px, ${(-scratch.y * 0.5 + 0.5) * element.clientHeight}px)`;
      }
      if (walking && time - lastShadow > 80) {
        renderer.shadowMap.needsUpdate = true;
        lastShadow = time;
      }
      if (!handlers.current.active || time - lastRender > 90) {
        renderer.render(scene, camera);
        lastRender = time;
      }
      if (!ready) {
        ready = true;
        handlers.current.onReady();
      }
    });

    return () => {
      renderer.setAnimationLoop(null);
      observer.disconnect();
      controls.dispose();
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", clearKeys);
      document.removeEventListener("visibilitychange", visibility);
      renderer.domElement.removeEventListener("pointerdown", onDown);
      renderer.domElement.removeEventListener("pointerup", onUp);
      renderer.domElement.removeEventListener("pointermove", onMove);
      const geometries = new Set<THREE.BufferGeometry>(),
        materials = new Set<THREE.Material>(),
        textures = new Set<THREE.Texture>();
      scene.traverse((item) => {
        if (item instanceof THREE.Mesh) {
          geometries.add(item.geometry);
          for (const material of Array.isArray(item.material)
            ? item.material
            : [item.material]) {
            materials.add(material);
            if (material.map) textures.add(material.map);
          }
        }
      });
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      textures.forEach((texture) => texture.dispose());
      renderer.dispose();
      renderer.domElement.remove();
      api.current = undefined;
      lightSwitch.current = undefined;
    };
  }, []);

  return (
    <div
      ref={container}
      className={`house-canvas ${props.active ? "house-canvas-focused" : ""}`}
    >
      {error ? (
        <div className="house-render-error">
          <span>⌂</span>
          <h2>Make yourself at home.</h2>
          <p>
            This device couldn’t open the 3D room. Every part of the portfolio
            is still available in the room menu below.
          </p>
        </div>
      ) : (
        <div className="house-labels" aria-label="Objects in the house">
          {houseSpots.map((spot) => (
            <button
              key={spot.id}
              ref={(node) => {
                labels.current[spot.id] = node;
              }}
              className={`house-object-label label-${spot.id}`}
              onClick={() => api.current?.visit(spot.id)}
              aria-label={`Explore ${spot.object}`}
            >
              <span className="object-dot">{spot.icon}</span>
              <span className="object-caption">{spot.object}</span>
            </button>
          ))}
          <span ref={visitorLabel} className="house-visitor-label">
            you <span>↓</span>
          </span>
        </div>
      )}
    </div>
  );
}
