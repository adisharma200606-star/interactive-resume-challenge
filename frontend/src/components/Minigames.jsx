import { useEffect, useRef, useState } from "react";
import { chip } from "../audio/chiptune";
import { useLoop, useTapKey } from "../game/loop";
import { CrossGame, RepsGame, CROSS_SHOTS } from "./MinigamesSport";

// ---------------- RIFF RHYTHM TAP ----------------
const RIFF = [["E2", 0], ["E2", 1], ["G2", 2], ["A2", 3], ["E2", 5], ["E2", 6], ["A#2", 7], ["A2", 8], ["E2", 10], ["E2", 11], ["G2", 12], ["D2", 14], ["E2", 15]];
const BEAT = 380;
const LEAD = 1700;
const START = 1800;
const WIN = 180;

function RiffTap({ onFinish }) {
  const t0 = useRef(performance.now());
  const notes = useRef(RIFF.map(([n, b]) => ({ n, t: START + b * BEAT, hit: false, miss: false })));
  const [now, setNow] = useState(0);
  const [hits, setHits] = useState(0);
  const [flash, setFlash] = useState("");
  const done = useRef(false);

  useLoop(true, () => {
    const t = performance.now() - t0.current;
    notes.current.forEach((x) => {
      if (!x.hit && !x.miss && t - x.t > WIN) x.miss = true;
    });
    setNow(t);
    const last = notes.current[notes.current.length - 1].t;
    if (!done.current && t > last + 700) {
      done.current = true;
      onFinish(notes.current.filter((x) => x.hit).length);
    }
  });

  function tap() {
    const t = performance.now() - t0.current;
    const n = notes.current.find((x) => !x.hit && !x.miss && Math.abs(t - x.t) <= WIN);
    if (n) {
      n.hit = true;
      chip.chord(n.n);
      setHits((h) => h + 1);
      setFlash("hit");
    } else {
      chip.sfx("whiff");
      setFlash("miss");
    }
    setTimeout(() => setFlash(""), 140);
  }
  useTapKey(true, tap);

  const ready = notes.current.some((x) => !x.hit && !x.miss && Math.abs(now - x.t) <= WIN);

  return (
    <div className="mg mg-riff" data-testid="minigame-riff">
      <div className="mg-head">
        <span>TAP THE RIFF</span>
        <span data-testid="riff-score">{hits}/{RIFF.length}</span>
      </div>
      <div className={`riff-track ${flash}`} data-testid="riff-track">
        <i className="riff-target" />
        {now < START - 900 && <span className="mg-count">READY…</span>}
        {notes.current.map((x, i) => {
          const d = x.t - now;
          if (d > LEAD || d < -260 || x.hit) return null;
          return (
            <i key={i} className={`riff-note ${x.miss ? "miss" : ""}`} style={{ left: `${12 + (d / LEAD) * 82}%` }} />
          );
        })}
      </div>
      <button className="btn-pix mg-tap" data-testid="riff-tap-btn" data-ready={ready ? "true" : "false"} onPointerDown={tap}>
        STRUM ▸
      </button>
      <p className="mg-hint">Tap (or press Space) as each note hits the ring.</p>
    </div>
  );
}

// ---------------- PING PONG RALLY ----------------
const RALLY_CAP = 12;

function PingPong({ onFinish }) {
  const s = useRef({ p: 0, dir: 1, dur: 1150, rally: 0, last: null, over: false, wait: 1500 });
  const [, force] = useState(0);
  const [swing, setSwing] = useState(false);

  useLoop(true, (t) => {
    const st = s.current;
    if (st.over) return;
    if (st.last == null) st.last = t;
    const dt = Math.min(50, t - st.last);
    st.last = t;
    if (st.wait > 0) {
      st.wait -= dt;
      force((v) => v + 1);
      return;
    }
    st.p += (st.dir * dt) / st.dur;
    if (st.dir > 0 && st.p > 1.12) {
      st.over = true;
      chip.sfx("whiff");
      onFinish(st.rally);
    }
    if (st.dir < 0 && st.p <= 0) {
      st.p = 0;
      st.dir = 1;
      st.dur = Math.max(480, st.dur * 0.9);
      chip.sfx("plock");
    }
    force((v) => v + 1);
  });

  function tap() {
    const st = s.current;
    setSwing(true);
    setTimeout(() => setSwing(false), 120);
    if (st.over || st.dir < 0 || st.p < 0.76) return;
    st.dir = -1;
    st.rally += 1;
    chip.sfx("plock");
    if (st.rally >= RALLY_CAP) {
      st.over = true;
      onFinish(st.rally);
    }
  }
  useTapKey(true, tap);

  const st = s.current;
  const ready = st.dir > 0 && st.p >= 0.76 && st.p <= 1.12;
  const y = 10 + st.p * 78;
  const x = 50 + Math.sin((st.dir > 0 ? st.rally : st.rally - 1) * 1.9 + 0.6) * 22 * st.p;

  return (
    <div className="mg mg-pong" data-testid="minigame-pong">
      <div className="mg-head">
        <span>KEEP THE RALLY</span>
        <span data-testid="pong-score">RALLY {st.rally}</span>
      </div>
      <div className="pong-table" data-testid="pong-table">
        <i className="pong-net" />
        {st.wait > 0 && <span className="mg-count">READY…</span>}
        <i className="pong-zone" />
        <i className="pong-paddle opp" style={{ left: `${x}%` }} />
        <i className="pong-ball" data-testid="pong-ball" style={{ left: `${x}%`, top: `${y}%` }} />
        <i className={`pong-paddle me ${swing ? "swing" : ""} ${ready ? "ready" : ""}`} />
      </div>
      <button className="btn-pix mg-tap" data-testid="pong-tap-btn" data-ready={ready ? "true" : "false"} onPointerDown={tap}>
        RETURN ▸
      </button>
      <p className="mg-hint">Tap (or press Space) when the ball reaches your zone.</p>
    </div>
  );
}

// ---------------- WRAPPER ----------------
const GAMES = { riff: RiffTap, pong: PingPong, cross: CrossGame, reps: RepsGame };
const LABELS = {
  riff: (s) => `${s}/${RIFF.length} NOTES`,
  pong: (s) => `${s}-BALL RALLY`,
  cross: (s) => `${s}/${CROSS_SHOTS} GOALS`,
  reps: (s) => `${s} REPS`,
};
export default function Minigame({ game, onDone }) {
  const [attempt, setAttempt] = useState(0);
  const [score, setScore] = useState(null);
  const passed = score != null && score >= game.target;

  useEffect(() => {
    chip.stopMusic();
    return () => chip.music("room");
  }, []);

  useEffect(() => {
    if (passed) chip.sfx("badge");
  }, [passed]);

  const Game = GAMES[game.kind];

  return (
    <div className="mg-wrap" data-testid="minigame">
      {score == null ? (
        <Game key={attempt} onFinish={setScore} />
      ) : (
        <div className="mg mg-result" data-testid="minigame-result" data-passed={passed ? "true" : "false"}>
          <span className="mg-big">{LABELS[game.kind](score)}</span>
          <span className="mg-msg" data-testid="minigame-result-msg">
            {passed ? `BONUS UNLOCKED: ${game.bonusName}!` : `No bonus this time — the target is ${game.target}.`}
          </span>
          <div className="mg-actions">
            <button
              className="btn-pix small ghost"
              data-testid="minigame-retry"
              onClick={() => {
                chip.sfx("select");
                setScore(null);
                setAttempt((a) => a + 1);
              }}
            >
              TRY AGAIN
            </button>
            <button
              className="btn-pix small"
              data-testid="minigame-continue"
              onClick={() => {
                chip.sfx("select");
                onDone(passed);
              }}
            >
              CONTINUE ▸
            </button>
          </div>
        </div>
      )}
      {score == null && (
        <button className="mg-skip" data-testid="minigame-skip" onClick={() => onDone(false)}>
          SKIP ▸
        </button>
      )}
    </div>
  );
}
