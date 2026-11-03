import { useRef, useState } from "react";
import { chip } from "../audio/chiptune";
import { useLoop, useTapKey } from "../game/loop";

// ---------------- RIGHT WING CROSS ----------------
export const CROSS_SHOTS = 5;
const ZONE_C = 72;

export function CrossGame({ onFinish }) {
  const s = useRef({ last: null, phase: 0, pos: 0, pause: 1500, zoneW: 24, speed: 0.9, shot: 0, goals: 0, over: false, msg: "", scored: null });
  const [, force] = useState(0);

  useLoop(true, (t) => {
    const st = s.current;
    if (st.last == null) st.last = t;
    const dt = Math.min(50, t - st.last);
    st.last = t;
    if (st.pause > 0) {
      st.pause -= dt;
      if (st.pause <= 0) {
        if (st.shot >= CROSS_SHOTS && !st.over) {
          st.over = true;
          onFinish(st.goals);
        }
        st.msg = "";
        st.scored = null;
      }
    } else {
      st.phase += (dt * st.speed) / 1000;
      st.pos = 100 * (1 - Math.abs((st.phase % 2) - 1));
    }
    force((v) => v + 1);
  });

  function tap() {
    const st = s.current;
    if (st.pause > 0 || st.over) return;
    const hit = Math.abs(st.pos - ZONE_C) <= st.zoneW / 2;
    st.shot += 1;
    if (hit) {
      st.goals += 1;
      st.msg = "GOAL! WHIPPED IN, HEADED HOME!";
      st.zoneW = Math.max(12, st.zoneW - 3);
      st.speed *= 1.15;
      chip.sfx("goal");
    } else {
      st.msg = st.pos < ZONE_C ? "TOO SHORT — CLEARED AT THE NEAR POST" : "OVERHIT — SAILS OUT FOR A GOAL KICK";
      chip.sfx("whiff");
    }
    st.scored = hit;
    st.pause = 1300;
  }
  useTapKey(true, tap);

  const st = s.current;
  const ready = st.pause <= 0 && Math.abs(st.pos - ZONE_C) <= st.zoneW / 2;
  const waiting = st.shot === 0 && st.pause > 0;

  return (
    <div className="mg mg-cross" data-testid="minigame-cross">
      <div className="mg-head">
        <span>WHIP IN THE CROSS</span>
        <span data-testid="cross-score">{st.goals} GOALS · {Math.min(st.shot + 1, CROSS_SHOTS)}/{CROSS_SHOTS}</span>
      </div>
      <div className="cross-pitch" data-testid="cross-pitch">
        <i className="cross-goal" />
        <i className="cross-box" />
        <i className={`cross-ball ${st.scored === true ? "in" : st.scored === false ? "out" : ""}`} data-testid="cross-ball" />
        {waiting && <span className="mg-count">READY…</span>}
        {st.msg && (
          <span className={`cross-msg ${st.scored ? "good" : "bad"}`} data-testid="cross-msg">
            {st.msg}
          </span>
        )}
      </div>
      <div className="cross-meter" data-testid="cross-meter">
        <i className="cross-zone" style={{ left: `${ZONE_C - st.zoneW / 2}%`, width: `${st.zoneW}%` }} />
        <i className="cross-needle" style={{ left: `${st.pos}%` }} />
      </div>
      <button className="btn-pix mg-tap" data-testid="cross-tap-btn" data-ready={ready ? "true" : "false"} onPointerDown={tap}>
        CROSS ▸
      </button>
      <p className="mg-hint">Tap (or press Space) when the needle is in the green: that's the far post.</p>
    </div>
  );
}

// ---------------- IRON GYM REPS ----------------
const REP_TIME = 12000;
const STAGES = [
  { from: 0, name: "DUMBBELL CURLS", sub: "building the base" },
  { from: 3, name: "PULL-UPS", sub: "calisthenics, coming soon" },
  { from: 6, name: "HEAVY BAG", sub: "boxing, next on the list" },
];

export function RepsGame({ onFinish }) {
  const s = useRef({ last: null, wait: 1200, t: 0, h: 0, reps: 0, over: false });
  const [, force] = useState(0);
  const [pump, setPump] = useState(false);

  useLoop(true, (t) => {
    const st = s.current;
    if (st.over) return;
    if (st.last == null) st.last = t;
    const dt = Math.min(50, t - st.last);
    st.last = t;
    if (st.wait > 0) {
      st.wait -= dt;
    } else {
      st.t += dt;
      st.h = Math.max(0, st.h - (dt / 1000) * 32);
      if (st.t >= REP_TIME) {
        st.over = true;
        onFinish(st.reps);
      }
    }
    force((v) => v + 1);
  });

  function tap() {
    const st = s.current;
    if (st.wait > 0 || st.over) return;
    st.h += 20;
    setPump(true);
    setTimeout(() => setPump(false), 90);
    if (st.h >= 100) {
      st.reps += 1;
      st.h = 0;
      chip.sfx("rep");
    }
  }
  useTapKey(true, tap);

  const st = s.current;
  const stage = [...STAGES].reverse().find((x) => st.reps >= x.from);
  const left = Math.max(0, (REP_TIME - st.t) / 1000);

  return (
    <div className="mg mg-reps" data-testid="minigame-reps">
      <div className="mg-head">
        <span>TAP TO LIFT</span>
        <span data-testid="reps-score">{st.reps} REPS</span>
      </div>
      <div className="reps-stage" data-testid="reps-stage">
        <b>{stage.name}</b> <span>· {stage.sub}</span>
      </div>
      <div className="reps-rig">
        <div className="reps-bar" data-testid="reps-bar">
          <i className="reps-fill" style={{ height: `${st.h}%` }} />
        </div>
        <div className="reps-timer" data-testid="reps-timer">
          {st.wait > 0 ? "READY…" : `${left.toFixed(1)}s`}
        </div>
      </div>
      <button
        className={`btn-pix mg-tap ${pump ? "pump" : ""}`}
        data-testid="reps-tap-btn"
        data-ready={st.wait <= 0 && !st.over ? "true" : "false"}
        onPointerDown={tap}
      >
        LIFT ▸
      </button>
      <p className="mg-hint">Tap fast (or mash Space) to fill the bar before it drops. Every full bar is a rep.</p>
    </div>
  );
}
