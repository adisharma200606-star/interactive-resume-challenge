import { useEffect, useMemo, useState } from "react";
import { PixelSprite } from "./PixelSprite";
import DialogueBox from "./DialogueBox";
import { PLAYER, TYPE_COLORS } from "../data/story";
import { chip } from "../audio/chiptune";
import Minigame from "./Minigames";

export default function InterestScene({ interest, speed = 1, fresh = false, onDone }) {
  const [phase, setPhase] = useState("talk");
  const [bonus, setBonus] = useState(false);
  const { companion } = interest;
  const finish = () => onDone(bonus && interest.minigame ? [interest.minigame.bonusDex] : []);

  useEffect(() => {
    chip.music("room");
    return () => chip.stopMusic();
  }, []);

  useEffect(() => {
    if (phase !== "join") return;
    chip.sfx("badge");
  }, [phase]);

  const afterLines = useMemo(() => [interest.after], [interest.after]);
  const lines = phase === "after" ? afterLines : interest.lines;
  const showAfter = fresh && !!interest.after;

  return (
    <div
      className="scene scene-interest"
      data-testid={`interest-screen-${interest.id}`}
      style={{ backgroundImage: `linear-gradient(180deg, rgba(8,12,24,0.1), rgba(8,12,24,0.45)), url(/art/bg_${interest.bg}.jpg)` }}
    >
      <div className="interest-place" data-testid="interest-place">{interest.place}</div>
      <div className="interest-stage">
        <PixelSprite name={interest.playerSprite || PLAYER.sprite} scale={interest.playerSprite ? 11 : 9} className="bob" />
        <PixelSprite name={companion.sprite} scale={8} className={phase === "talk" ? "interest-shy" : "bob"} />
      </div>

      {phase === "join" && (
        <div className="join-panel" data-testid="join-panel">
          <PixelSprite name={companion.sprite} scale={6} className="bob" />
          <span className="join-title">{companion.name} joined the party!</span>
          <span className="type-chip" style={{ background: TYPE_COLORS[companion.type] || "#a8a090" }}>
            {companion.type}
          </span>
          <span className="join-sub">{companion.blurb}</span>
          {bonus && interest.minigame && (
            <span className="join-bonus" data-testid="join-bonus">BONUS DEX: {interest.minigame.bonusName}</span>
          )}
          <button
            className="btn-pix small"
            data-testid="join-continue"
            onClick={() => {
              chip.sfx("select");
              if (showAfter) setPhase("after");
              else finish();
            }}
          >
            CONTINUE ▸
          </button>
        </div>
      )}

      {phase === "game" && (
        <Minigame
          game={interest.minigame}
          onDone={(passed) => {
            setBonus(passed);
            setPhase("join");
          }}
        />
      )}

      {(phase === "talk" || phase === "after") && (
        <DialogueBox
          key={phase}
          lines={lines}
          speed={speed}
          onDone={() => (phase === "talk" ? setPhase(interest.minigame ? "game" : "join") : finish())}
          testid="interest-dialogue"
        />
      )}
    </div>
  );
}
