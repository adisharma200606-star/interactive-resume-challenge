import { CHAPTERS, DEX } from "../data/story";

function OverlayShell({ title, onClose, testid, children }) {
  return (
    <div className="overlay-backdrop" data-testid={`${testid}-backdrop`} onClick={onClose}>
      <div className="overlay panel" onClick={(e) => e.stopPropagation()}>
        <div className="overlay-head">
          <span>{title}</span>
          <button className="btn-pix small" data-testid={`${testid}-close`} onClick={onClose}>
            X
          </button>
        </div>
        <div className="overlay-body">{children}</div>
      </div>
    </div>
  );
}

export function OverlayDex({ unlocked, onClose }) {
  return (
    <OverlayShell title={`ADI-DEX · ${unlocked.length}/${DEX.length}`} onClose={onClose} testid="dex">
      <div className="dex-grid" data-testid="dex-grid">
        {DEX.map((entry) => {
          const got = unlocked.includes(entry.id);
          return (
            <div
              key={entry.id}
              className={`dex-card ${got ? "" : "locked"}`}
              data-testid={`dex-card-${entry.id}`}
            >
              <span className="dex-name">{got ? entry.name : "???"}</span>
              <span className="dex-cat">{entry.cat}</span>
              {got && <span className="dex-desc">{entry.desc}</span>}
            </div>
          );
        })}
      </div>
    </OverlayShell>
  );
}

export function OverlayBadges({ earned, onClose }) {
  const badgeChapters = CHAPTERS.filter((c) => c.badge);
  return (
    <OverlayShell title={`BADGE CASE · ${earned.length}/${badgeChapters.length}`} onClose={onClose} testid="badges">
      <div className="badge-grid" data-testid="badge-grid">
        {badgeChapters.map((c) => {
          const got = earned.includes(c.id);
          return (
            <div key={c.id} className={`badge-card ${got ? "" : "locked"}`} data-testid={`badge-card-${c.id}`}>
              <span className="badge-circ" style={{ background: got ? c.badge.color : "#3a3226" }} />
              <span className="badge-name">{got ? c.badge.name : "???"}</span>
              <span className="badge-sub">{got ? c.town : "not yet earned"}</span>
            </div>
          );
        })}
      </div>
    </OverlayShell>
  );
}

export function OverlayLessons({ lessons, onClose }) {
  return (
    <OverlayShell title={`LIFE LESSONS · ${lessons.length}`} onClose={onClose} testid="lessons">
      {lessons.length === 0 && (
        <p className="scene-hint" data-testid="lessons-empty">
          No lessons logged yet. Every setback gets logged here — honestly.
        </p>
      )}
      <div className="lessons-list" data-testid="lessons-list">
        {lessons.map((l) => {
          const ch = CHAPTERS.find((c) => c.id === l.id);
          return (
            <div key={l.id} className="lesson-card" data-testid={`lesson-card-${l.id}`}>
              <div className="lesson-head">
                <b>{ch ? ch.company : l.id}</b>
                {ch && <span>{ch.role}</span>}
              </div>
              <p>
                <b>WHAT WENT WRONG:</b> {l.what}
              </p>
              <p>
                <b>WHAT IT TAUGHT ME:</b> {l.why}
              </p>
            </div>
          );
        })}
      </div>
    </OverlayShell>
  );
}
