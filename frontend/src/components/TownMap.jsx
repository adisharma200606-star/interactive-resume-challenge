import { useEffect, useState } from "react";
import { PixelSprite } from "./PixelSprite";
import { CHAPTERS, FUN_FACTS, INTERESTS } from "../data/story";
import { chip } from "../audio/chiptune";

const POS = {
  airlearn: [18, 80],
  livlive: [36, 66],
  musigma: [54, 78],
  consigliere: [66, 54],
  bitbybit: [48, 38],
  champion: [82, 24],
};

const PLACE_POS = {
  bedroom: [12, 52],
  library: [27, 38],
  pitch: [76, 82],
  tthall: [88, 60],
  irongym: [18, 16],
  workbench: [60, 14],
};

function skippedBefore(chapter, completed) {
  return CHAPTERS.slice(0, CHAPTERS.indexOf(chapter)).filter((c) => !completed.includes(c.id));
}

function OrderConfirm({ chapter, skipped, missingPlaces, onYes, onNo }) {
  const names = skipped.map((c) => (c.kind === "gym" ? c.town : c.company.split(" — ")[0].toUpperCase())).join(", ");
  return (
    <div className="order-confirm-wrap" data-testid="order-confirm">
      <div className="order-confirm">
        <p data-testid="order-confirm-text">
          The recommended experience is clearing{" "}
          {skipped.length === 1 ? "the previous story" : `the previous ${skipped.length} stories`} ({names})
          {chapter.kind === "champion" && missingPlaces.length > 0 ? " and visiting the side places" : ""} before
          playing this one.
        </p>
        <div className="order-confirm-actions">
          <button className="btn-pix small" data-testid="order-confirm-back" onClick={onNo}>
            GO BACK
          </button>
          <button className="btn-pix small" data-testid="order-confirm-play" onClick={onYes}>
            PLAY ANYWAY ▸
          </button>
        </div>
      </div>
    </div>
  );
}

function PlaceNode({ it, met, onVisit }) {
  const [x, y] = PLACE_POS[it.id];
  return (
    <div className={`node place ${met ? "met" : "unmet"}`} style={{ left: `${x}%`, top: `${y}%` }}>
      <button
        className="node-btn place-btn"
        data-testid={`map-place-${it.id}`}
        data-state={met ? "met" : "unmet"}
        onClick={() => {
          chip.sfx("select");
          onVisit(it);
        }}
      >
        <PixelSprite name={it.companion.sprite} scale={3} className={met ? "" : "silhouette"} />
        {!met && <i className="node-excl">?</i>}
      </button>
      <span className="node-label place-label">{it.place}</span>
    </div>
  );
}

export default function TownMap({ progress, onEnter, onHall, onVisit }) {
  const { completed, champion } = progress;
  const interests = progress.interests || [];
  const gymBadges = progress.badges.filter((b) => CHAPTERS.some((c) => c.kind === "gym" && c.id === b)).length;
  const gymTotal = CHAPTERS.filter((c) => c.kind === "gym").length;
  const next = CHAPTERS.find((c) => !completed.includes(c.id));
  const missing = INTERESTS.filter((it) => !interests.includes(it.id));
  const [fact] = useState(() => FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)]);
  const [pending, setPending] = useState(null);

  useEffect(() => () => chip.stopMusic(), []);

  function clickNode(ch) {
    chip.sfx("select");
    if (skippedBefore(ch, completed).length > 0) {
      setPending(ch);
      return;
    }
    onEnter(ch);
  }

  const points = CHAPTERS.map((c) => POS[c.id].join(",")).join(" ");

  return (
    <div className="scene scene-map" data-testid="town-map">
      <div className="map-head">
        <span data-testid="map-title">ADI REGION</span>
        <span data-testid="map-badges-count">
          {gymBadges}/{gymTotal} BADGES · {interests.length}/{INTERESTS.length} PARTY {champion ? "· CHAMPION" : ""}
        </span>
      </div>

      <div className="map-canvas">
        <svg className="map-routes" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline points={points} fill="none" stroke="#d4c88c" strokeWidth="1.4" strokeDasharray="3 2.5" />
        </svg>

        {INTERESTS.map((it) => (
          <PlaceNode key={it.id} it={it} met={interests.includes(it.id)} onVisit={onVisit} />
        ))}

        {CHAPTERS.map((ch) => {
          const [x, y] = POS[ch.id];
          const done = completed.includes(ch.id);
          const isNext = next && next.id === ch.id;
          return (
            <div
              key={ch.id}
              className={`node ${done ? "done" : ""} ${isNext ? "next" : ""}`}
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <button
                className="node-btn"
                data-testid={`map-node-${ch.id}`}
                data-state={done ? "done" : isNext ? "next" : "open"}
                onClick={() => clickNode(ch)}
              >
                <PixelSprite name={ch.opponent.sprite} scale={3} />
                {done && <i className="node-check" />}
                {isNext && <i className="node-excl">!</i>}
              </button>
              <span className="node-label">
                {ch.kind === "gym" ? ch.town : ch.kind === "elite" ? `ELITE ${ch.index - 3}` : "CHAMPION"}
              </span>
            </div>
          );
        })}

        {champion && (
          <div className="node next" style={{ left: "82%", top: "8%" }}>
            <button className="node-btn hall-btn" data-testid="map-node-hall" onClick={() => { chip.sfx("select"); onHall(); }}>
              ★
            </button>
            <span className="node-label">HALL OF FAME</span>
          </div>
        )}
      </div>

      {pending && (
        <OrderConfirm
          chapter={pending}
          skipped={skippedBefore(pending, completed)}
          missingPlaces={missing}
          onNo={() => setPending(null)}
          onYes={() => {
            const ch = pending;
            setPending(null);
            onEnter(ch);
          }}
        />
      )}

      <div className="map-foot" data-testid="map-hint">
        {next ? (
          <div>
            <b>RECOMMENDED NEXT:</b> {next.town} — {next.company}. {next.role}
            {missing.length > 0 && <span className="map-side"> · Side places (?) show who he is off the résumé.</span>}
          </div>
        ) : (
          <div>
            <b>All battles complete. Tap the star for the Hall of Fame.</b>
          </div>
        )}
        <div className="map-fact" data-testid="map-fun-fact">
          {fact} <span className="map-fact-src">— Adi, unprompted, always</span>
        </div>
      </div>
    </div>
  );
}
