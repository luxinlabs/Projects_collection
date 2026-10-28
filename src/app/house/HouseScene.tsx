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
import { isInsideCastle } from "./houseLayout";
import { cats, chair, companionActions } from "./companionContent";
import { seatedPosition, seatedLegAngles } from "./seating";
import LuxinAvatar from "./LuxinAvatar";

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
  const companionLabels = useRef<Record<string, HTMLButtonElement | null>>({});
  const suppressClick = useRef(false);
  const act = useRef<(id: string) => void>();
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
      "Interactive 3D Golden Gate castle exhibition hall in San Francisco style, with a Golden Gate Bridge and bay panorama outside Victorian windows, pastel towers, a dedicated Research Gallery, a Grand Hall, and a Project Gallery. Meet little Luxin, a girl in a rose dress, a waving mint robot in the Project Gallery, a puppy and three cats sleeping in little beds inside, and three ducks in the garden pond. Click objects to explore or use WASD and arrow keys to walk.",
    );
    renderer.domElement.setAttribute("role", "img");
    renderer.domElement.tabIndex = 0;
    element.prepend(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-12, 12, 9, -9, 0.1, 120);
    const homeTarget = new THREE.Vector3(0.5, 3.1, 0.8);
    const homePosition = new THREE.Vector3(24, 28, 31);
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
      house.sun.intensity = evening ? 1.35 : 3.0;
      house.sun.color.set(evening ? "#ffc589" : "#fff0cf");
      house.ambient.intensity = evening ? 1.45 : 2.15;
      house.ambient.color.set(evening ? "#e7d6ce" : "#fff6df");
      house.lampLight.intensity = evening ? 6 : 2.5;
      house.castle.windowMaterial.color.set(evening ? "#c0a5b5" : "#ffffff");
      house.castle.lights.forEach((light) => {
        light.intensity = evening ? 2.5 : 1.5;
      });
    };
    lightSwitch.current(handlers.current.evening);
    const target = new THREE.Vector3();
    const desiredCameraTarget = homeTarget.clone();
    let desiredZoom = 1;
    let path: [number, number][] = [];
    let pending: RoomSection | null = null;
    let pendingAction: string | null = null;
    let pose: "standing" | "sitting" | "petting" = "standing";
    let poseUntil = 0;
    let sitProgress = 0;
    const sitOrigin = new THREE.Vector3();
    const sitTarget = new THREE.Vector3(...seatedPosition());
    let currentAction: string | null = null;
    const touches = new Map<number, THREE.Vector2>();
    let pinchDistance = 0;
    let gesture = false;
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
    function standUp() {
      if (pose === "sitting")
        house.visitor.group.position.set(
          ...([chair.approach[0], 0.51, chair.approach[1]] as [
            number,
            number,
            number,
          ]),
        );
      pose = "standing";
      currentAction = null;
      pendingAction = null;
      house.visitor.group.rotation.x = 0;
    }
    function completeAction(id: string) {
      currentAction = id;
      if (id === "chair") {
        pose = "sitting";
        sitOrigin.copy(house.visitor.group.position);
        sitProgress = reduceMotion ? 1 : 0;
        house.visitor.group.rotation.y = chair.rotation;
      } else {
        const index = Number(id.slice(4));
        const cat = cats[index];
        pose = "petting";
        poseUntil = previousTime + 4200;
        house.visitor.group.rotation.y = Math.atan2(
          cat.x - house.visitor.group.position.x,
          cat.z - house.visitor.group.position.z,
        );
        house.animals.pet(index, previousTime);
      }
      renderer.shadowMap.needsUpdate = true;
    }
    act.current = (id) => {
      if (handlers.current.active) return;
      const action = companionActions.find((action) => action.id === id);
      if (!action) return;
      renderer.domElement.focus({ preventScroll: true });
      desiredCameraTarget.set(action.x, 1, action.z);
      desiredZoom = 1.8;
      startWalk(...action.approach);
      pendingAction = id;
      if (!path.length) {
        completeAction(id);
        pendingAction = null;
      }
    };
    function startWalk(
      x: number,
      z: number,
      section: RoomSection | null = null,
    ) {
      standUp();
      path = findWalkPath(
        [house.visitor.group.position.x, house.visitor.group.position.z],
        [x, z],
      );
      pending = section;
      house.destination.position.set(x, isInsideCastle(x, z) ? 0.52 : 0.13, z);
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
      desiredZoom = window.innerWidth < 760 ? 1.35 : 1.65;
      handlers.current.onReach(id);
    }
    function manualMovement(direction: string, pressed: boolean) {
      if (pressed) {
        standUp();
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
        pendingAction = null;
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
    const onWheel = (event: WheelEvent) => {
      if (handlers.current.active) return;
      event.preventDefault();
      const delta =
        event.deltaY *
        (event.deltaMode === 1
          ? 16
          : event.deltaMode === 2
            ? element!.clientHeight
            : 1);
      desiredZoom = THREE.MathUtils.clamp(
        desiredZoom * Math.exp(-delta * 0.002),
        0.7,
        2.4,
      );
    };
    const onDown = (event: PointerEvent) => {
      if (event.pointerType !== "touch") suppressClick.current = false;
      if (event.pointerType === "touch") {
        if (!touches.size) {
          gesture = false;
          suppressClick.current = false;
        }
        touches.set(
          event.pointerId,
          new THREE.Vector2(event.clientX, event.clientY),
        );
        if (touches.size === 2) {
          const points = Array.from(touches.values());
          pinchDistance = points[0].distanceTo(points[1]);
          gesture = true;
          suppressClick.current = true;
        }
      }
      if (event.button !== 0 || !event.isPrimary) return;
      pointerStart.set(event.clientX, event.clientY);
    };
    const onUp = (event: PointerEvent) => {
      touches.delete(event.pointerId);
      if (
        gesture ||
        !!(event.target as HTMLElement).closest("button") ||
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
        const action = objects[0].object.userData.action as string | undefined;
        if (action) {
          act.current?.(action);
          return;
        }
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
      if (
        event.isPrimary &&
        (event.buttons === 1 || touches.has(event.pointerId)) &&
        pointerStart.distanceTo(
          new THREE.Vector2(event.clientX, event.clientY),
        ) > 7
      )
        suppressClick.current = true;
      if (touches.has(event.pointerId)) {
        touches.set(
          event.pointerId,
          new THREE.Vector2(event.clientX, event.clientY),
        );
        if (touches.size === 2) {
          const points = Array.from(touches.values());
          const distance = points[0].distanceTo(points[1]);
          if (pinchDistance > 0)
            desiredZoom = THREE.MathUtils.clamp(
              (desiredZoom * distance) / pinchDistance,
              0.7,
              2.4,
            );
          pinchDistance = distance;
        }
      }
      setPointer(event);
      const hits = raycaster.intersectObjects(house.interactables, true);
      hovered = hits.length ? hits[0].object.userData.section : null;
      renderer.domElement.style.cursor = hits.length ? "pointer" : "grab";
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
    const clearKeys = () => {
      keys.clear();
      touches.clear();
      pinchDistance = 0;
    };
    const onCancel = (event: PointerEvent) => {
      touches.delete(event.pointerId);
      pinchDistance = 0;
    };
    let gestureZoom = 1;
    const onGesture = (event: Event) => {
      if (handlers.current.active) return;
      event.preventDefault();
      suppressClick.current = true;
      if (event.type === "gesturestart") gestureZoom = desiredZoom;
      const scale = (event as Event & { scale?: number }).scale;
      if (event.type === "gesturechange" && scale)
        desiredZoom = THREE.MathUtils.clamp(gestureZoom * scale, 0.7, 2.4);
    };
    element.addEventListener("wheel", onWheel, { passive: false });
    element.addEventListener("gesturestart", onGesture, { passive: false });
    element.addEventListener("gesturechange", onGesture, { passive: false });
    element.addEventListener("pointercancel", onCancel);
    element.addEventListener("pointerdown", onDown);
    element.addEventListener("pointerup", onUp);
    element.addEventListener("pointermove", onMove);
    const onContextLost = (event: Event) => {
      event.preventDefault();
      renderer.setAnimationLoop(null);
      renderer.domElement.style.display = "none";
      clearKeys();
      act.current = undefined;
      api.current = {
        visit: (id) => handlers.current.onReach(id),
        reset: () => {},
        zoom: () => {},
        move: () => {},
      };
      setError(true);
      handlers.current.onReady();
    };
    renderer.domElement.addEventListener("webglcontextlost", onContextLost);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", clearKeys);
    const resize = () => {
      const { width, height } = element.getBoundingClientRect();
      const aspect = width / Math.max(height, 1);
      const halfHeight =
        window.innerWidth < 760
          ? 18 / aspect
          : aspect < 0.8
            ? 13.8
            : aspect < 1.2
              ? 13.5
              : 13.6;
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
            if (pendingAction) {
              completeAction(pendingAction);
              pendingAction = null;
            }
          }
        }
      }
      if (pose === "petting" && time >= poseUntil) standUp();
      renderer.domElement.dataset.pose = pose;
      renderer.domElement.dataset.sceneZoom = camera.zoom.toFixed(3);
      const indoor = isInsideCastle(visitor.position.x, visitor.position.z);
      if (pose === "sitting") {
        sitProgress = Math.min(1, sitProgress + delta / 0.5);
        const ease = sitProgress * sitProgress * (3 - 2 * sitProgress);
        visitor.position.lerpVectors(sitOrigin, sitTarget, ease);
      } else {
        sitProgress = 0;
        visitor.position.y = THREE.MathUtils.lerp(
          visitor.position.y,
          indoor ? 0.51 : 0.13,
          Math.min(delta * 12, 1),
        );
      }
      renderer.domElement.dataset.seatSettled = String(
        pose === "sitting" && sitProgress === 1,
      );
      const seatBlend = sitProgress * sitProgress * (3 - 2 * sitProgress);
      if (walking !== wasWalking) {
        handlers.current.onWalking(walking);
        wasWalking = walking;
      }
      walkingPhase += walking ? delta * 13 : 0;
      house.visitor.legs.forEach((leg, i) => {
        leg.rotation.x =
          pose === "sitting"
            ? seatedLegAngles(i).hip * seatBlend
            : walking && !reduceMotion
              ? Math.sin(walkingPhase + i * Math.PI) * 0.6
              : 0;
      });
      house.visitor.knees.forEach((knee, i) => {
        knee.rotation.x =
          pose === "sitting" ? seatedLegAngles(i).knee * seatBlend : 0;
      });
      house.visitor.group.rotation.x = pose === "petting" ? 0.2 : 0;
      house.visitor.arms.forEach((arm, i) => {
        arm.rotation.x =
          pose === "petting" && i === 1
            ? -1.3 + (reduceMotion ? 0 : Math.sin(time * 0.006) * 0.15)
            : pose === "sitting"
              ? -0.65 * seatBlend
              : walking && !reduceMotion
                ? Math.sin(walkingPhase + i * Math.PI) * -0.4
                : 0;
      });
      if (!reduceMotion) {
        house.robot.arm.rotation.z = 1.9 + Math.sin(time * 0.0025) * 0.16;
        house.robot.head.rotation.z = Math.sin(time * 0.0008) * 0.06;
        house.host.arms[1].rotation.z = 2.4 + Math.sin(time * 0.002) * 0.18;
        house.host.group.scale.y = 1.12 + Math.sin(time * 0.0018) * 0.012;
        house.globe.rotation.y += delta * 0.08;
        house.castle.flames.forEach((flame, index) => {
          flame.scale.y = 1.6 + Math.sin(time * 0.004 + index) * 0.3;
        });
      }
      const puppyMoving = house.animals.update(
        time,
        visitor.position,
        reduceMotion,
        delta,
        walking,
      );
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
      // Phones reveal exhibit markers on approach or after zooming in.
      const detail = String(camera.zoom >= 1.35);
      if (element.dataset.detail !== detail) element.dataset.detail = detail;
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
      for (const action of companionActions) {
        const button = companionLabels.current[action.id];
        if (!button) continue;
        scratch.set(action.x, action.y, action.z).project(camera);
        button.style.transform = `translate(-50%, ${action.id.startsWith("cat-") ? "-50%" : "-100%"}) translate(${(scratch.x * 0.5 + 0.5) * element.clientWidth}px, ${(-scratch.y * 0.5 + 0.5) * element.clientHeight}px)`;
        button.setAttribute(
          "aria-pressed",
          String(currentAction === action.id),
        );
      }
      if (visitorLabel.current) {
        visitorLabel.current.firstChild!.textContent =
          pose === "sitting"
            ? "Taking a little rest "
            : pose === "petting"
              ? cats[Number(currentAction!.slice(4))].reaction + " "
              : "you ";
        scratch
          .copy(visitor.position)
          .add(new THREE.Vector3(0, 1.22, 0))
          .project(camera);
        visitorLabel.current.style.transform = `translate(-50%, -100%) translate(${(scratch.x * 0.5 + 0.5) * element.clientWidth}px, ${(-scratch.y * 0.5 + 0.5) * element.clientHeight}px)`;
      }
      if (
        (walking || puppyMoving || !reduceMotion) &&
        time - lastShadow > 160
      ) {
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
      act.current = undefined;
      renderer.domElement.removeEventListener(
        "webglcontextlost",
        onContextLost,
      );
      element.removeEventListener("wheel", onWheel);
      element.removeEventListener("gesturestart", onGesture);
      element.removeEventListener("gesturechange", onGesture);
      element.removeEventListener("pointercancel", onCancel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", clearKeys);
      document.removeEventListener("visibilitychange", visibility);
      element.removeEventListener("pointerdown", onDown);
      element.removeEventListener("pointerup", onUp);
      element.removeEventListener("pointermove", onMove);
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
            for (const value of Object.values(material))
              if (value instanceof THREE.Texture) textures.add(value);
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
          <h2>Welcome to the castle.</h2>
          <p>
            This device couldn’t open the 3D hall. Every part of the portfolio
            is still available in the gallery menu below.
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
              className={`house-object-label house-gallery-label label-${spot.id}`}
              onClick={(event) => {
                if (!suppressClick.current || event.detail === 0)
                  api.current?.visit(spot.id);
              }}
              aria-label={`Explore ${spot.object}`}
            >
              <span className="object-dot">
                {spot.id === "about" ? (
                  <LuxinAvatar className="world-host-miniature" />
                ) : (
                  spot.icon
                )}
              </span>
              <span className="object-caption">{spot.object}</span>
            </button>
          ))}
          {companionActions.map((action) => (
            <button
              key={action.id}
              ref={(node) => {
                companionLabels.current[action.id] = node;
              }}
              className={`house-object-label house-companion-label ${action.id.startsWith("cat-") ? "house-cat-name" : "house-gallery-label"}`}
              title={
                action.label +
                (action.id.startsWith("cat-")
                  ? " · " + cats[Number(action.id.slice(4))].breed
                  : "")
              }
              aria-label={action.label}
              onClick={(event) => {
                if (!suppressClick.current || event.detail === 0)
                  act.current?.(action.id);
              }}
            >
              <span className="object-dot">{action.icon}</span>
              <span className="object-caption">{action.caption}</span>
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
