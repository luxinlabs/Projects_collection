"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { storyPlaces, type StoryPlace } from "./houseContent";

function globePosition(place: StoryPlace, radius = 2.04) {
  const lat = THREE.MathUtils.degToRad(place.latitude),
    lon = THREE.MathUtils.degToRad(place.longitude);
  return new THREE.Vector3(
    Math.cos(lat) * Math.cos(lon),
    Math.sin(lat),
    -Math.cos(lat) * Math.sin(lon),
  ).multiplyScalar(radius);
}

// A deliberately illustrated atlas, drawn locally without external map requests.
function atlasTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#8daea8";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#b2c8bc";
  ctx.lineWidth = 1;
  for (let x = 0; x < 2048; x += 2048 / 24) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 1024);
    ctx.stroke();
  }
  for (let y = 0; y < 1024; y += 1024 / 12) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(2048, y);
    ctx.stroke();
  }
  const continents = [
    [
      [-168, 71],
      [-145, 70],
      [-128, 58],
      [-124, 49],
      [-125, 40],
      [-117, 32],
      [-109, 29],
      [-106, 22],
      [-96, 16],
      [-88, 16],
      [-83, 10],
      [-78, 8],
      [-80, 21],
      [-87, 21],
      [-81, 25],
      [-80, 31],
      [-75, 35],
      [-66, 44],
      [-57, 51],
      [-65, 59],
      [-78, 63],
      [-90, 71],
      [-112, 73],
      [-136, 69],
    ],
    [
      [-73, 60],
      [-45, 60],
      [-22, 72],
      [-27, 83],
      [-50, 82],
      [-63, 76],
    ],
    [
      [-81, 12],
      [-70, 10],
      [-61, 7],
      [-50, 0],
      [-35, -6],
      [-38, -17],
      [-48, -27],
      [-54, -35],
      [-68, -55],
      [-75, -45],
      [-71, -30],
      [-76, -14],
      [-81, -4],
    ],
    [
      [-10, 36],
      [-10, 44],
      [-2, 49],
      [9, 55],
      [5, 59],
      [17, 71],
      [28, 70],
      [31, 60],
      [42, 54],
      [50, 55],
      [67, 68],
      [100, 77],
      [144, 72],
      [178, 65],
      [169, 57],
      [151, 59],
      [143, 48],
      [132, 42],
      [127, 35],
      [121, 23],
      [110, 19],
      [105, 9],
      [100, 2],
      [94, 15],
      [85, 21],
      [78, 8],
      [72, 21],
      [62, 25],
      [57, 15],
      [46, 13],
      [40, 29],
      [35, 31],
      [26, 40],
      [22, 37],
      [15, 37],
      [12, 43],
      [6, 43],
      [2, 37],
    ],
    [
      [-17, 15],
      [-17, 28],
      [-6, 36],
      [10, 37],
      [25, 32],
      [33, 30],
      [43, 12],
      [51, 12],
      [43, -12],
      [35, -21],
      [31, -30],
      [19, -35],
      [12, -25],
      [8, -5],
      [-1, 5],
      [-11, 6],
    ],
    [
      [113, -22],
      [121, -15],
      [130, -12],
      [137, -12],
      [143, -18],
      [153, -25],
      [151, -36],
      [139, -39],
      [130, -32],
      [115, -35],
    ],
    [
      [47, -13],
      [50, -17],
      [47, -26],
      [44, -24],
    ],
    [
      [130, 32],
      [140, 39],
      [145, 44],
      [142, 34],
      [134, 31],
    ],
    [
      [95, 5],
      [106, -6],
      [117, -8],
      [115, 1],
      [108, 7],
    ],
    [
      [167, -35],
      [178, -39],
      [172, -45],
      [165, -47],
    ],
    [
      [-8, 50],
      [2, 51],
      [-3, 59],
      [-7, 57],
    ],
  ];
  continents.forEach((points, index) => {
    ctx.fillStyle = ["#d8d1a5", "#e1d8b7", "#d2cea0"][index % 3];
    ctx.strokeStyle = "#c4c396";
    ctx.lineWidth = 2;
    ctx.beginPath();
    points.forEach(([lon, lat], i) => {
      const x = ((lon + 180) / 360) * 2048,
        y = ((90 - lat) / 180) * 1024;
      if (i) ctx.lineTo(x, y);
      else ctx.moveTo(x, y);
    });
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  });
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export default function TravelGlobe() {
  const mount = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(storyPlaces[0]);
  const [photo, setPhoto] = useState<number | null>(null);
  const [fallback, setFallback] = useState(false);
  const lightbox = useRef<HTMLDialogElement>(null);
  const select = useRef<(place: StoryPlace) => void>();
  useEffect(() => {
    select.current?.(selected);
    setPhoto(null);
  }, [selected]);
  useEffect(() => {
    if (photo !== null) lightbox.current?.showModal();
  }, [photo]);

  useEffect(() => {
    if (!mount.current) return;
    const element = mount.current;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setFallback(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    element.appendChild(renderer.domElement);
    renderer.domElement.setAttribute(
      "aria-label",
      "Rotatable travel globe. Select a location below, or click a pin.",
    );
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 40);
    camera.position.set(-1, 3, 6);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.minDistance = 4.9;
    controls.maxDistance = 9;
    scene.add(new THREE.HemisphereLight("#fff4dd", "#87948d", 3));
    const sun = new THREE.DirectionalLight("#fff4df", 2);
    sun.position.set(-3, 5, 5);
    scene.add(sun);
    const texture = atlasTexture();
    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(2, 64, 48),
      new THREE.MeshStandardMaterial({ map: texture, roughness: 0.95 }),
    );
    scene.add(globe);
    const pins: THREE.Mesh[] = [];
    storyPlaces.forEach((place) => {
      const pin = new THREE.Mesh(
        new THREE.SphereGeometry(0.055, 12, 10),
        new THREE.MeshStandardMaterial({
          color: "#b97b52",
          emissive: "#794121",
          emissiveIntensity: 0.15,
        }),
      );
      pin.position.copy(globePosition(place));
      pin.userData.place = place;
      pins.push(pin);
      scene.add(pin);
    });
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.28, 0.018, 6, 100),
      new THREE.MeshStandardMaterial({
        color: "#b59966",
        metalness: 0.6,
        roughness: 0.4,
      }),
    );
    ring.rotation.x = 0.35;
    ring.rotation.z = -0.25;
    scene.add(ring);
    const halo = new THREE.Mesh(
      new THREE.TorusGeometry(0.12, 0.014, 6, 32),
      new THREE.MeshBasicMaterial({ color: "#895b34" }),
    );
    scene.add(halo);
    let desiredPosition: THREE.Vector3 | null = null;
    select.current = (place) => {
      const direction = globePosition(place).normalize();
      desiredPosition = direction.clone().multiplyScalar(6.7);
      halo.position.copy(direction.clone().multiplyScalar(2.06));
      halo.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), direction);
      pins.forEach((pin) => {
        (pin.material as THREE.MeshStandardMaterial).color.set(
          pin.userData.place.id === place.id ? "#773f2a" : "#b97b52",
        );
      });
    };
    select.current(storyPlaces[0]);
    const stopFocus = () => {
      desiredPosition = null;
    };
    controls.addEventListener("start", stopFocus);
    const pointer = new THREE.Vector2(),
      ray = new THREE.Raycaster(),
      down = new THREE.Vector2();
    const pointerDown = (event: PointerEvent) =>
      down.set(event.clientX, event.clientY);
    const pointerUp = (event: PointerEvent) => {
      if (down.distanceTo(new THREE.Vector2(event.clientX, event.clientY)) > 6)
        return;
      const bounds = element.getBoundingClientRect();
      pointer.set(
        ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
        -((event.clientY - bounds.top) / bounds.height) * 2 + 1,
      );
      ray.setFromCamera(pointer, camera);
      // Account for globe occlusion: a pin on the far side is not clickable.
      const hits = ray.intersectObjects([globe, ...pins]);
      if (hits[0]?.object.userData.place)
        setSelected(hits[0].object.userData.place);
    };
    renderer.domElement.addEventListener("pointerdown", pointerDown);
    renderer.domElement.addEventListener("pointerup", pointerUp);
    const resize = () => {
      const w = element.clientWidth,
        h = element.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / Math.max(1, h);
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    resize();
    let previous = 0;
    renderer.setAnimationLoop((time) => {
      const dt = previous ? Math.min((time - previous) / 1000, 0.05) : 0.016;
      previous = time;
      if (desiredPosition) {
        camera.position
          .lerp(desiredPosition, 1 - Math.exp(-dt * 4))
          .setLength(6.7);
        if (camera.position.distanceTo(desiredPosition) < 0.01)
          desiredPosition = null;
      }
      controls.update();
      renderer.render(scene, camera);
    });
    return () => {
      renderer.setAnimationLoop(null);
      observer.disconnect();
      controls.dispose();
      renderer.domElement.removeEventListener("pointerdown", pointerDown);
      renderer.domElement.removeEventListener("pointerup", pointerUp);
      texture.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          (object.material as THREE.Material).dispose();
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
      select.current = undefined;
    };
  }, []);

  return (
    <div className="travel-atlas">
      <p className="room-intro">
        Some places become a part of you. Turn the globe and explore the places
        in my story.
      </p>
      <div ref={mount} className="travel-globe">
        {fallback && <span className="globe-fallback">◎</span>}
      </div>
      <p className="globe-instruction">
        Drag to turn · Scroll to zoom · Select a place
      </p>
      <div className="travel-place-list" aria-label="Places in Luxin’s story">
        {storyPlaces.map((place) => (
          <button
            key={place.id}
            className={selected.id === place.id ? "selected" : ""}
            onClick={() => setSelected(place)}
          >
            {place.name.split(",")[0]}
          </button>
        ))}
      </div>
      <article className="travel-place-card" aria-live="polite">
        <span className="room-eyebrow">
          {selected.kind} · {selected.country}
        </span>
        <h3>{selected.name}</h3>
        <p>{selected.description}</p>
        {selected.photos.length ? (
          <div className="travel-photo-grid">
            {selected.photos.map((item, index) => (
              <button
                key={item.src}
                onClick={() => setPhoto(index)}
                aria-label={`Expand photo: ${item.caption}`}
              >
                <Image
                  src={item.src}
                  alt={item.caption}
                  width={320}
                  height={240}
                  unoptimized
                />
                <span>{item.caption}</span>
              </button>
            ))}
          </div>
        ) : (
          <p className="travel-photo-note">
            A space for photographs, when I add them.
          </p>
        )}
      </article>
      <p className="room-footnote">
        These pins come from my education, work, and community experiences in my
        bio. Personal travel destinations and photo albums will be added here.
      </p>
      {photo !== null && selected.photos[photo] && (
        <dialog
          ref={lightbox}
          className="travel-lightbox"
          aria-label="Expanded travel photograph"
          onClose={() => setPhoto(null)}
        >
          <button
            autoFocus
            onClick={() => lightbox.current?.close()}
            aria-label="Close photograph"
          >
            ×
          </button>
          <Image
            src={selected.photos[photo].src}
            alt={selected.photos[photo].caption}
            width={1200}
            height={900}
            unoptimized
          />
          <p>{selected.photos[photo].caption}</p>
        </dialog>
      )}
    </div>
  );
}
