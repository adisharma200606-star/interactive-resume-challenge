import { useEffect, useMemo, useRef, useState } from "react";
import { PixelSprite } from "./PixelSprite";
import DialogueBox from "./DialogueBox";
import { STARTERS, TYPE_COLORS, FUN_FACTS, EVOLUTIONS } from "../data/story";
import { chip } from "../audio/chiptune";

function formFor(starterId, chapterIndex) {
  const line = EVOLUTIONS[starterId] || EVOLUTIONS.movies;
  const stageIdx = chapterIndex <= 1 ? 0 : chapterIndex <= 3 ? 1 : 2;
  return { ...line[stageIdx], stageIdx, line };
}

function buildScript(ch, form, prevForm, evolvesHere) {
  const opp =
    ch.kind === "champion"
      ? { ...form, title: "the final evolution of you · worn by THE DOUBT", level: 60 }
      : ch.opponent;
  const s = [];
  s.push({ t: "lines", beat: "ENCOUNTER", lines: ch.intro });
  if (evolvesHere) {
    s.push({ t: "fx", beat: "EVOLUTION", kind: "evo", banner: `What? ${prevForm.name} is evolving!`, sfx: "evo", dur: 2100 });
    s.push({ t: "fx", beat: "EVOLUTION", kind: "evo-done", banner: `${prevForm.name} evolved into ${form.name}!`, sfx: "badge", dur: 2300 });
  }
  s.push({ t: "fx", beat: "SETBACK", kind: "attack-player", banner: `${opp.name} used ${ch.setback.move}!`, pHp: ch.setback.playerHp ?? 22, sfx: "hit", dur: 2100, shake: "me" });
  s.push({ t: "lines", beat: "SETBACK", lines: ch.setback.lines });
  s.push({ t: "lines", beat: "LESSON", lines: ch.lesson.lines });
  s.push({ t: "fx", beat: "LESSON", kind: "heal", banner: `${form.name} steadied itself!`, pHp: ch.lesson.playerHp ?? 78, sfx: "heal", dur: 1800 });
  s.push({ t: "fx", beat: "LESSON", kind: "attack-opp", banner: `${form.name} used ${ch.lesson.move}!`, oHp: 55, sfx: "hit", dur: 1800, shake: "opp" });
  s.push({ t: "fx", beat: "HAIL MARY", kind: "super", banner: `${form.name} used ${ch.hailMary.move}!`, oHp: 0, sfx: "super", dur: 2400, flash: true, shake: "opp" });
  s.push({ t: "lines", beat: "HAIL MARY", lines: ch.hailMary.lines });
  s.push({ t: "fx", beat: "VICTORY", kind: "faint", banner: ch.kind === "champion" ? "THE DOUBT fainted!" : `${opp.name} fainted!`, sfx: "faint", dur: 1700 });
  s.push({ t: "fx", beat: "VICTORY", kind: "badge", banner: `${ch.badge.name} GET!`, sfx: "badge", dur: 2200 });
  s.push({ t: "lines", beat: "VICTORY", lines: [...ch.outro, `HIDDEN FUN FACT UNLOCKED: ${FUN_FACTS[(ch.index - 1) % FUN_FACTS.length]}`] });
  return s;
}

function HpBar({ v, testid, label = "HP" }) {
  const color = v > 50 ? "#4fae57" : v > 25 ? "#e8b84b" : "#d94040";
  return (
    <div className="hp-row">
      <span className="hp-label">{label}</span>
      <div className="hp-track" data-testid={`${testid}-track`}>
        <div className="hp-fill" data-testid={testid} style={{ width: `${v}%`, background: color }} />
      </div>
    </div>
  );
}

export default function BattleScreen({ chapter, starterId, speed = 1, onComplete }) {
  const starter = STARTERS.find((s) => s.id === starterId) || STARTERS[0];
  const form = useMemo(() => formFor(starterId, chapter.index), [starterId, chapter.index]);
  const prevForm = form.stageIdx > 0 ? form.line[form.stageIdx - 1] : null;
  const evolvesHere = !!prevForm && (chapter.index === 2 || chapter.index === 4);
  const [displayStage, setDisplayStage] = useState(evolvesHere ? form.stageIdx - 1 : form.stageIdx);
  const script = useMemo(
    () => buildScript(chapter, form, prevForm, evolvesHere),
    [chapter, form, prevForm, evolvesHere]
  );
  const displayForm = { ...form.line[displayStage], stageIdx: displayStage, line: form.line };


  const [i, setI] = useState(0);
  const [pHp, setPHp] = useState(100);
  const [oHp, setOHp] = useState(100);
  const [fx, setFx] = useState(null);
  const [oFaint, setOFaint] = useState(false);
  const [card, setCard] = useState(true);
  const doneRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const t = setTimeout(() => setCard(false), 2100 / speed);
    return () => clearTimeout(t);
  }, [speed]);

  const fxFired = useRef("");

  useEffect(() => {
    const item = script[i];
    if (!item) {
      if (!doneRef.current) {
        doneRef.current = true;
        onCompleteRef.current();
      }
      return;
    }
    if (item.t === "lines") return;

    setFx(item);
    const fxKey = `${chapter.id}-${i}`;
    if (item.sfx && fxFired.current !== fxKey) {
      fxFired.current = fxKey;
      chip.sfx(item.sfx);
    }
    if (item.pHp != null) setPHp(item.pHp);
    if (item.oHp != null) setOHp(item.oHp);
    if (item.kind === "faint") setOFaint(true);
    if (item.kind === "evo-done") setDisplayStage(form.stageIdx);

    const to = setTimeout(() => {
      setFx(null);
      setI(i + 1);
    }, (item.dur || 1900) / speed);
    return () => clearTimeout(to);
  }, [i, script, speed]);

  const item = script[i];
  const opp =
    chapter.kind === "champion"
      ? { ...form, title: "the final evolution of you · worn by THE DOUBT", level: 60 }
      : chapter.opponent;
  const playerLevels = [9, 18, 27];
  const playerTitles = [
    "started at age 9 · grows with him",
    "evolved when it got hard",
    "fully evolved · still a learner",
  ];
  const showBadge = fx && fx.kind === "badge";
  const shakeClass = fx && fx.shake === "me" ? "shake" : fx && fx.shake === "opp" ? "shake-sm" : "";
  const evoActive = fx && (fx.kind === "evo" || fx.kind === "evo-done");

  return (
    <div className={`scene battle battle-${chapter.kind}`} data-testid="battle-screen">
      {fx && fx.flash && <div className="fx-flash" data-testid="fx-flash" />}
      {evoActive && (
        <div className="evo-overlay" data-testid="evo-overlay">
          <div className={fx.kind === "evo" ? "evo-flash" : "evo-new"}>
            <PixelSprite
              name={fx.kind === "evo" ? (prevForm ? prevForm.sprite : form.sprite) : form.sprite}
              scale={10}
            />
          </div>
        </div>
      )}

      <div className="beat-chip" data-testid="battle-beat-label">{item ? item.beat : "VICTORY"}</div>
      <div className="battle-chapter" data-testid="battle-chapter-info">
        {chapter.kind === "gym" ? `GYM ${chapter.index}` : chapter.kind === "elite" ? `ELITE ROAD ${chapter.index - 3}` : "FINAL"} · {chapter.company}
      </div>

      <div className={`battle-field ${shakeClass}`}>
        <div className="battle-row top">
          <div className={`sprite-slot opp ${oFaint ? "fainted" : ""}`} data-testid="opponent-sprite">
            <PixelSprite name={opp.sprite} scale={10} />
          </div>
          <div className="plate" data-testid="opponent-plate">
            <div className="plate-name">
              {opp.name} <span className="lv">LV {opp.level}</span>
            </div>
            <div className="plate-title">{opp.title}</div>
            <HpBar v={oHp} testid="opponent-hp" />
            <span className="type-chip" style={{ background: TYPE_COLORS[opp.type] || "#a8a090" }}>
              {opp.type}
            </span>
          </div>
        </div>

        <div className="battle-row bottom">
          <div className="plate" data-testid="player-plate">
            <div className="plate-name">
              {displayForm.name} <span className="lv">LV {playerLevels[displayStage]}</span>
            </div>
            <div className="plate-title">{playerTitles[displayStage]}</div>
            <HpBar v={pHp} testid="player-hp" />
            <div className="exp-track" data-testid="player-exp-track">
              <div className="exp-fill" data-testid="player-exp" style={{ width: "86%" }} />
            </div>
            <span className="exp-label">EXP · maxed by every scar</span>
            <span className="type-chip" style={{ background: TYPE_COLORS[starter.type] || "#a8a090" }}>
              {starter.type}
            </span>
          </div>
          <div className="sprite-slot me" data-testid="player-sprite">
            <PixelSprite name={displayForm.sprite} scale={12} flip />
          </div>
        </div>
      </div>

      {card && (
        <div className="title-card" data-testid="battle-title-card">
          <span>{chapter.card}</span>
        </div>
      )}

      {fx && (
        <div className="move-banner" data-testid="move-banner">
          {fx.banner}
        </div>
      )}

      {showBadge && (
        <div className="badge-panel" data-testid="badge-panel">
          <span className="badge-circ" style={{ background: chapter.badge.color }} />
          <span>{chapter.badge.name}</span>
        </div>
      )}

      {item && item.t === "lines" && (
        <DialogueBox
          key={`${chapter.id}-${i}`}
          lines={item.lines}
          speed={speed}
          onDone={() => setI(i + 1)}
          testid="battle-dialogue"
        />
      )}
    </div>
  );
}
