import { useState } from "react";
import { PixelSprite } from "./PixelSprite";
import { STARTERS, TYPE_COLORS, EVOLUTIONS } from "../data/story";
import { chip } from "../audio/chiptune";

export default function StarterPick({ onPick }) {
  const [sel, setSel] = useState(null);

  const chosen = STARTERS.find((s) => s.id === sel);

  return (
    <div className="scene scene-starter" data-testid="starter-screen">
      <h2 className="scene-heading" data-testid="starter-heading">
        CHOOSE YOUR STARTERS
      </h2>
      <p className="scene-sub">All three join your party — they're your interests. Pick who leads.</p>

      <div className="starter-grid" data-testid="starter-grid">
        {STARTERS.map((s) => (
          <button
            key={s.id}
            className={`starter-card ${sel === s.id ? "selected" : ""}`}
            data-testid={`starter-card-${s.id}`}
            onClick={() => {
              chip.sfx("select");
              setSel(s.id);
            }}
          >
            <PixelSprite name={s.sprite} scale={6} className="bob" />
            <span className="starter-name">{s.name}</span>
            <div className="evo-line" data-testid={`evo-line-${s.id}`}>
              {EVOLUTIONS[s.id].map((e, i) => (
                <span key={e.name} className="evo-step" title={e.name}>
                  {i > 0 && <i className="evo-arrow">→</i>}
                  <PixelSprite name={e.sprite} scale={2} />
                </span>
              ))}
            </div>
            <span className="type-chip" style={{ background: TYPE_COLORS[s.type] || "#a8a090" }}>
              {s.type}
            </span>
            <span className="starter-from">STARTER · {s.from}</span>
            <span className="starter-desc">{s.desc}</span>
            <span className="starter-evolves">{s.evolves}</span>
          </button>
        ))}
      </div>

      <div className="starter-footer">
        {chosen ? (
          <button
            className="btn-pix"
            data-testid="starter-send-btn"
            onClick={() => {
              chip.sfx("start");
              onPick(chosen.id);
            }}
          >
            SEND OUT {chosen.name}!
          </button>
        ) : (
          <p className="scene-hint">tap a card to choose your lead</p>
        )}
      </div>
    </div>
  );
}
