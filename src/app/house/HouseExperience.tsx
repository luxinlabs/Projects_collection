"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import type { HouseSceneHandle } from "./HouseScene";
import { houseSpots, type RoomSection } from "./houseContent";
import { initialConversation } from "./HostChat";
import RoomPanel from "./RoomPanel";
import SidebarNav, { HouseMark } from "../SidebarNav";
import { useSiteTheme } from "../useSiteTheme";
import "./house.css";

const HouseScene = dynamic(() => import("./HouseScene"), { ssr: false });

export default function HouseExperience() {
  const scene = useRef<HouseSceneHandle>(null);
  const [active, setActive] = useState<RoomSection | null>(null);
  const [near, setNear] = useState<RoomSection | null>(null);
  const [ready, setReady] = useState(false);
  const [entered, setEntered] = useState(false);
  const [walking, setWalking] = useState(false);
  const { evening } = useSiteTheme();
  const [menu, setMenu] = useState(false);
  const [help, setHelp] = useState(false);
  const [dpad, setDpad] = useState(false);
  const [messages, setMessages] = useState(initialConversation);
  const onReady = useCallback(() => setReady(true), []);
  const onReach = useCallback((id: RoomSection) => {
    setEntered(true);
    setActive(id);
    setMenu(false);
  }, []);
  const close = useCallback(() => {
    setActive(null);
    scene.current?.reset();
  }, []);
  const openDirect = (id: RoomSection) => {
    setEntered(true);
    setMenu(false);
    setActive(id);
  };
  const nearest = houseSpots.find((spot) => spot.id === near);

  return (
    <main
      className={`little-world ${evening ? "little-world-evening" : ""} ${entered ? "little-world-entered" : ""}`}
    >
      <a href="#house-rooms" className="world-skip-link">
        Skip to portfolio sections
      </a>
      <SidebarNav inHouse />
      <section
        className="world-stage"
        aria-label="Explore Luxin’s castle exhibition hall and garden"
      >
        <div className="world-scene-wrap">
          <HouseScene
            sceneRef={scene}
            active={active}
            evening={evening}
            onReach={onReach}
            onNear={setNear}
            onReady={onReady}
            onWalking={setWalking}
          />
        </div>
        <div className="world-welcome">
          <p className="world-eyebrow">
            <span /> A LITTLE CASTLE OF BIG IDEAS
          </p>
          {entered ? (
            <>
              <h1>
                Welcome to
                <br />
                the Grand Hall<span>.</span>
              </h1>
              <p>
                Every little corner
                <br />
                has a story to tell.
              </p>
            </>
          ) : (
            <>
              <h1>
                A castle
                <br />
                of ideas<span>.</span>
              </h1>
              <p>
                I’m Luxin. Engineer, researcher,
                <br />
                and a builder of things that matter.
                <br />
                Welcome to my exhibition hall.
              </p>
              <button
                className="world-enter-button"
                disabled={!ready}
                onClick={() => {
                  setEntered(true);
                  scene.current?.visit("about");
                }}
              >
                {ready ? "Enter the hall" : "Opening the gates…"}
                <span>↗</span>
              </button>
              <span className="world-welcome-note">
                A little curiosity opens every door.
              </span>
            </>
          )}
        </div>
        <div className="world-side-note">
          <span>EST. WITH CURIOSITY</span>
          <i>made of ideas & a little sunshine</i>
        </div>
        {!ready && (
          <div className="world-loading" role="status">
            <HouseMark />
            <span>Opening the castle gates…</span>
          </div>
        )}
        <div className="world-location-status" aria-live="polite">
          <span className={`status-seed ${walking ? "is-walking" : ""}`} />
          {walking
            ? "A little wander…"
            : nearest
              ? `You’re near ${nearest.object.toLowerCase()}`
              : entered
                ? "A grand hall for curious minds"
                : "An invitation to explore a castle of ideas"}
          {nearest && !walking && (
            <button onClick={() => openDirect(nearest.id)}>
              Inspect <kbd>E</kbd>
            </button>
          )}
        </div>
        <div className="world-view-controls" aria-label="View controls">
          <button onClick={() => scene.current?.zoom(0.2)} aria-label="Zoom in">
            ＋
          </button>
          <button
            onClick={() => scene.current?.zoom(-0.2)}
            aria-label="Zoom out"
          >
            −
          </button>
          <button
            onClick={() => scene.current?.reset()}
            aria-label="Reset camera view"
          >
            ⌂
          </button>
          <span />
          <button
            onClick={() => setHelp(!help)}
            aria-label="Show exploration controls"
            aria-expanded={help}
          >
            ?
          </button>
        </div>
        {help && (
          <div className="world-help">
            <strong>A small guide to wandering</strong>
            <p>
              <kbd>W A S D</kbd> or <kbd>↑ ← ↓ →</kbd> to walk
            </p>
            <p>
              Click the ground to move.
              <br />
              Drag the hall to look around.
              <br />
              Scroll or pinch to zoom the 3D scene.
              <br />
              Click a cat’s name to pet her, or the chair to sit.
              <br />
              Walk again to stand up.
              <br />
              Click an object to walk over and inspect it.
            </p>
            <p>
              <kbd>E</kbd> Inspect a nearby object
              <br />
              <kbd>Esc</kbd> Back to the house
            </p>
            <button onClick={() => setHelp(false)}>
              Got it, let’s wander ↗
            </button>
          </div>
        )}
        <button
          className="world-mobile-walk"
          onClick={() => setDpad(!dpad)}
          aria-expanded={dpad}
        >
          ♧ {dpad ? "Hide controls" : "Walk around"}
        </button>
        {dpad && (
          <div className="world-dpad" aria-label="Walking controls">
            {["arrowup", "arrowleft", "arrowdown", "arrowright"].map(
              (direction, index) => (
                <button
                  key={direction}
                  className={`dpad-${direction}`}
                  aria-label={`Walk ${["forward", "left", "backward", "right"][index]}`}
                  onPointerDown={(event) => {
                    event.currentTarget.setPointerCapture(event.pointerId);
                    scene.current?.move(direction, true);
                  }}
                  onPointerUp={() => scene.current?.move(direction, false)}
                  onPointerCancel={() => scene.current?.move(direction, false)}
                  onLostPointerCapture={() =>
                    scene.current?.move(direction, false)
                  }
                >
                  {["↑", "←", "↓", "→"][index]}
                </button>
              ),
            )}
          </div>
        )}
      </section>
      <footer className="world-footer">
        <div className="world-footer-heading">
          <span>FOLLOW YOUR CURIOSITY</span>
          <button
            onClick={() => setMenu(!menu)}
            aria-expanded={menu}
            aria-controls="house-room-menu"
          >
            Explore the castle <span>{menu ? "−" : "＋"}</span>
          </button>
        </div>
        <nav
          id="house-rooms"
          className="world-room-dock"
          aria-label="Portfolio rooms"
        >
          {houseSpots.map((spot) => (
            <button key={spot.id} onClick={() => openDirect(spot.id)}>
              <span>{spot.icon}</span>
              <span>{spot.object}</span>
            </button>
          ))}
        </nav>
        <div className="world-footer-bottom">
          <span>A personal space. An open invitation.</span>
          <Link href="/classic">Prefer a simple portfolio? ↗</Link>
          <span>
            BUILT WITH A LITTLE WONDER <i>✧</i>
          </span>
        </div>
      </footer>
      {menu && (
        <nav
          id="house-room-menu"
          className="world-room-menu"
          aria-label="Explore the castle"
        >
          {houseSpots.map((spot) => (
            <button key={spot.id} onClick={() => openDirect(spot.id)}>
              <span>{spot.icon}</span>
              <span>
                <strong>{spot.object}</strong>
                <small>{spot.title}</small>
              </span>
              <i>↗</i>
            </button>
          ))}
        </nav>
      )}
      {active && (
        <RoomPanel
          active={active}
          onClose={close}
          onSwitch={openDirect}
          messages={messages}
          setMessages={setMessages}
        />
      )}
    </main>
  );
}
