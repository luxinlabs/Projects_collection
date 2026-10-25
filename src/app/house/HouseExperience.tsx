"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import type { HouseSceneHandle } from "./HouseScene";
import { houseSpots, type RoomSection } from "./houseContent";
import { initialConversation } from "./HostChat";
import RoomPanel from "./RoomPanel";
import "./house.css";

const HouseScene = dynamic(() => import("./HouseScene"), { ssr: false });

function HouseMark() {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path
        d="m5 19 15-12 15 12M9 17v17h22V17M17 34V23h7v11"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27 11V6h4v8M4 35h32"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="20" cy="16" r="2" fill="currentColor" />
    </svg>
  );
}

export default function HouseExperience() {
  const scene = useRef<HouseSceneHandle>(null);
  const [active, setActive] = useState<RoomSection | null>(null);
  const [near, setNear] = useState<RoomSection | null>(null);
  const [ready, setReady] = useState(false);
  const [entered, setEntered] = useState(false);
  const [walking, setWalking] = useState(false);
  const [evening, setEvening] = useState(false);
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
      <header className="world-header">
        <Link
          href="/"
          className="world-brand"
          aria-label="Luxin Zhang’s little world, home"
        >
          <HouseMark />
          <span>
            LUXIN ZHANG<small>A LITTLE WORLD OF BIG IDEAS</small>
          </span>
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/research">Research</Link>
          <Link href="/bio">About me</Link>
          <a href="mailto:philomela.zhang@gmail.com">
            Let’s connect <span>↗</span>
          </a>
        </nav>
        <button
          className="world-day-switch"
          onClick={() => setEvening((value) => !value)}
          aria-label={evening ? "Switch to daylight" : "Switch to cozy evening"}
          title={evening ? "Daylight" : "Cozy evening"}
        >
          {evening ? "☾" : "☼"}
        </button>
      </header>
      <section
        className="world-stage"
        aria-label="Explore Luxin’s house and garden"
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
            <span /> COME ON IN, STAY A WHILE
          </p>
          {entered ? (
            <>
              <h1>
                Make yourself
                <br />
                at home<span>.</span>
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
                Big ideas.
                <br />A little home<span>.</span>
              </h1>
              <p>
                I’m Luxin. Engineer, researcher,
                <br />
                and a builder of things that matter.
                <br />
                Welcome to my corner of the internet.
              </p>
              <button
                className="world-enter-button"
                disabled={!ready}
                onClick={() => {
                  setEntered(true);
                  scene.current?.visit("about");
                }}
              >
                {ready ? "Come on in" : "Opening the door…"}
                <span>↗</span>
              </button>
              <span className="world-welcome-note">
                No shoes required. Just a little curiosity.
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
            <span>Putting the kettle on…</span>
          </div>
        )}
        <div className="world-location-status" aria-live="polite">
          <span className={`status-seed ${walking ? "is-walking" : ""}`} />
          {walking
            ? "A little wander…"
            : nearest
              ? `You’re near ${nearest.object.toLowerCase()}`
              : entered
                ? "A little room for curiosity"
                : "Somewhere between an idea & a cup of tea"}
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
              Drag the room to look around.
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
            Explore the house <span>{menu ? "−" : "＋"}</span>
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
          aria-label="Explore the house"
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
