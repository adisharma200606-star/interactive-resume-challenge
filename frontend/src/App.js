import { useEffect, useState } from "react";
import GbaShell from "./components/GbaShell";
import ColdOpen from "./components/ColdOpen";
import TitleScreen from "./components/TitleScreen";
import Prologue from "./components/Prologue";
import StarterPick from "./components/StarterPick";
import TownMap from "./components/TownMap";
import BattleScreen from "./components/BattleScreen";
import HallOfFame from "./components/HallOfFame";
import InterestScene from "./components/InterestScene";
import { OverlayDex, OverlayBadges, OverlayLessons } from "./components/Overlays";
import { STARTERS, EVOLUTIONS, INTERESTS } from "./data/story";
import { chip, useMuted } from "./audio/chiptune";
import { uuid, loadProgress, saveProgressRemote } from "./game/save";

const EMPTY = {
  starter: null,
  completed: [],
  badges: [],
  dex: [],
  lessons: [],
  interests: [],
  champion: false,
};

export default function App() {
  const [muted, setMuted] = useMuted();
  const [screen, setScreen] = useState("coldopen");
  const [speed, setSpeed] = useState(1);
  const [chapter, setChapter] = useState(null);
  const [interest, setInterest] = useState(null);
  const [overlay, setOverlay] = useState(null);
  const [progress, setProgress] = useState(EMPTY);
  const [playerId, setPlayerId] = useState(null);
  const [shortVersion, setShortVersion] = useState(false);

  // Load save: backend first, localStorage fallback
  useEffect(() => {
    (async () => {
      let pid = localStorage.getItem("adi-player-id");
      if (!pid) {
        pid = uuid();
        localStorage.setItem("adi-player-id", pid);
      }
      setPlayerId(pid);
      const remote = await loadProgress(pid);
      let local = null;
      try {
        local = JSON.parse(localStorage.getItem("adi-progress") || "null");
      } catch (e) {
        local = null;
      }
      // keep whichever save has travelled further
      const score = (p) => (p ? (p.completed || []).length * 10 + (p.interests || []).length + (p.starter ? 1 : 0) : -1);
      const rDone = score(remote);
      const lDone = score(local);
      const p = rDone >= lDone ? remote || local || EMPTY : local || EMPTY;
      setProgress({
        starter: p.starter || null,
        completed: p.completed || [],
        badges: p.badges || [],
        dex: p.dex || [],
        lessons: p.lessons || [],
        interests: p.interests || [],
        champion: !!p.champion,
      });
    })();
  }, []);

  function commit(next) {
    setProgress(next);
    localStorage.setItem("adi-progress", JSON.stringify(next));
    if (playerId) saveProgressRemote(playerId, next);
  }

  function startNew() {
    const fresh = { ...EMPTY };
    commit(fresh);
    setChapter(null);
    setInterest(INTERESTS.find((it) => it.opening));
    setScreen("interest");
  }

  function completeInterest(it, extraDex = []) {
    commit({
      ...progress,
      interests: [...new Set([...(progress.interests || []), it.id])],
      dex: [...new Set([...progress.dex, ...(it.dex || []), ...extraDex])],
    });
    setInterest(null);
    setScreen(progress.starter ? "map" : "prologue");
  }

  function startContinue() {
    setScreen(progress.starter ? "map" : "prologue");
  }

  function pickStarter(id) {
    const starter = STARTERS.find((s) => s.id === id) || STARTERS[0];
    const dexIds = STARTERS.map((s) => s.dexId || `dex-${s.from.toLowerCase()}`);
    const next = {
      ...progress,
      starter: starter.id,
      dex: [...new Set([...progress.dex, ...dexIds, "dex-pokedex-habit"])],
    };
    commit(next);
    setScreen("map");
  }

  function completeChapter(ch) {
    const completed = [...new Set([...progress.completed, ch.id])];
    const badges = ch.badge ? [...new Set([...progress.badges, ch.id])] : progress.badges;
    const evoDex = [];
    if (progress.starter && (ch.index === 2 || ch.index === 4)) {
      const line = EVOLUTIONS[progress.starter];
      const form = line && line[ch.index === 2 ? 1 : 2];
      if (form) evoDex.push(form.dexId);
    }
    const factDex = ch.kind ? [`dex-fun-${ch.index}`] : [];
    const dex = [...new Set([...progress.dex, ...(ch.dex || []), ...evoDex, ...factDex])];
    const lessons = ch.lessonLog
      ? [...progress.lessons.filter((l) => l.id !== ch.id), { id: ch.id, ...ch.lessonLog }]
      : progress.lessons;
    const next = {
      ...progress,
      completed,
      badges,
      dex,
      lessons,
      champion: progress.champion || ch.kind === "champion",
    };
    commit(next);
    if (ch.kind === "champion") {
      setScreen("hall");
    } else {
      setChapter(null);
      setScreen("map");
    }
  }

  // Per-screen music
  useEffect(() => {
    if (screen === "map") chip.music("map");
    if (screen === "battle" && chapter) {
      chip.music(chapter.kind === "elite" ? "elite" : chapter.kind === "champion" ? "champion" : "battle");
    }
    if (screen === "hall") chip.music("hall");
  }, [screen, chapter]);

  const inBattle = screen === "battle";

  return (
    <GbaShell
      muted={muted}
      onToggleMute={() => {
        chip.unlock();
        setMuted(!muted);
      }}
      badges={progress.badges.length}
      dexCount={progress.dex.length}
      hwDisabled={inBattle}
      onHw={(key) => {
        if (key === "sound") return;
        if (key === "speed") {
          setSpeed((s) => (s === 1 ? 1.5 : s === 1.5 ? 2 : 1));
          return;
        }
        if (inBattle) return;
        setOverlay(key);
      }}
      speed={speed}
    >
      {screen === "loading" && (
        <div className="scene scene-loading" data-testid="loading-screen">
          <p className="blink">LOADING…</p>
        </div>
      )}

      {screen === "coldopen" && <ColdOpen onDone={() => setScreen("title")} speed={speed} />}

      {screen === "title" && (
        <TitleScreen
          hasSave={!!progress.starter}
          onNew={startNew}
          onContinue={startContinue}
          onShortVersion={() => {
            setShortVersion(true);
            setScreen("hall");
          }}
        />
      )}

      {screen === "prologue" && <Prologue speed={speed} onDone={() => setScreen("starter")} />}

      {screen === "starter" && <StarterPick onPick={pickStarter} />}

      {screen === "map" && (
        <TownMap
          progress={progress}
          onEnter={(ch) => {
            setChapter(ch);
            setScreen("battle");
          }}
          onHall={() => setScreen("hall")}
          onVisit={(it) => {
            setInterest(it);
            setScreen("interest");
          }}
        />
      )}

      {screen === "interest" && interest && (
        <InterestScene
          key={interest.id}
          interest={interest}
          speed={speed}
          fresh={!progress.starter}
          onDone={(extra) => completeInterest(interest, extra)}
        />
      )}

      {screen === "battle" && chapter && (
        <BattleScreen
          chapter={chapter}
          starterId={progress.starter}
          speed={speed}
          onComplete={() => completeChapter(chapter)}
        />
      )}

      {screen === "hall" && (
        <HallOfFame
          progress={progress}
          shortVersion={shortVersion}
          onMap={() => {
            setShortVersion(false);
            setScreen("map");
          }}
          onRestart={() => {
            setShortVersion(false);
            startNew();
          }}
          onPlay={() => {
            setShortVersion(false);
            progress.starter ? startContinue() : startNew();
          }}
        />
      )}

      {overlay === "dex" && (
        <OverlayDex unlocked={progress.dex} onClose={() => setOverlay(null)} />
      )}
      {overlay === "badges" && (
        <OverlayBadges earned={progress.badges} onClose={() => setOverlay(null)} />
      )}
      {overlay === "lessons" && (
        <OverlayLessons lessons={progress.lessons} onClose={() => setOverlay(null)} />
      )}
    </GbaShell>
  );
}
