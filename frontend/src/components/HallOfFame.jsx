import { useState } from "react";
import { PixelSprite } from "./PixelSprite";
import { CHAPTERS, HALL_STATS, WEAKNESSES, LETS_TALK, PLAYER, TYPE_COLORS, META, HALL_MENTORS, HALL_EPILOGUE, EVOLUTIONS, INTERESTS, BUILT_WITH } from "../data/story";
import { chip } from "../audio/chiptune";

export default function HallOfFame({ progress, onMap, onRestart, shortVersion = false, onPlay }) {
  const [confirmRestart, setConfirmRestart] = useState(false);

  const badgeChapters = CHAPTERS.filter((c) => c.badge);
  // In the short version, everything is shown unlocked: the reader skipped the game, not the story.
  const hasBadge = (id) => shortVersion || progress.badges.includes(id);
  const hasMet = (id) => shortVersion || (progress.interests || []).includes(id);

  return (
    <div className="scene scene-hall" data-testid="hall-screen">
      <div className="hall-scroll">
        <h2 className="scene-heading" data-testid="hall-title">HALL OF FAME</h2>
        <p className="scene-sub">every badge, every receipt, every scar — displayed with equal pride</p>

        {shortVersion && (
          <div className="hall-section short-version" data-testid="hall-short-version">
            <h3>THE 2-MINUTE VERSION</h3>
            <p className="scene-sub">every chapter, what went wrong, and what it taught him</p>
            <ol className="short-list">
              {CHAPTERS.filter((c) => c.lessonLog).map((c) => (
                <li key={c.id} data-testid={`short-${c.id}`}>
                  <b>{c.company}</b>
                  {c.role ? <span className="short-role"> · {c.role}</span> : null}
                  {c.fact ? <span className="short-fact">{c.fact}</span> : null}
                  <span className="short-what">✗ {c.lessonLog.what}</span>
                  <span className="short-why">→ {c.lessonLog.why}</span>
                </li>
              ))}
            </ol>
            {onPlay && (
              <button className="btn-pix small" data-testid="hall-play-full" onClick={() => { chip.sfx("select"); onPlay(); }}>
                GOT TIME AFTER ALL? PLAY THE FULL STORY ▸
              </button>
            )}
          </div>
        )}

        <div className="hall-badges" data-testid="hall-badges">
          {badgeChapters.map((c) => (
            <div key={c.id} className={`badge-card ${hasBadge(c.id) ? "" : "locked"}`} data-testid={`hall-badge-${c.id}`}>
              <span className="badge-circ" style={{ background: hasBadge(c.id) ? c.badge.color : "#3a3226" }} />
              <span className="badge-name">{c.badge.name}</span>
            </div>
          ))}
        </div>

        <div className="hall-party" data-testid="hall-party">
          {Object.keys(EVOLUTIONS).map((k) => (
            <PixelSprite key={k} name={EVOLUTIONS[k][2].sprite} scale={4} className="bob" />
          ))}
          <PixelSprite name={PLAYER.sprite} scale={4} />
          <span className="hall-party-label">
            {Object.values(EVOLUTIONS).map((l) => l[2].name).join(" · ")} — fully evolved, like him. Still learners forever. <br /> trained by {PLAYER.name} — {PLAYER.blurb}
          </span>
        </div>

        <div className="hall-section hall-companions" data-testid="hall-companions">
          <h3>THE WHOLE TRAINER</h3>
          <p className="scene-sub">the side of him no résumé has a field for</p>
          <div className="companion-grid">
            {INTERESTS.map((it) => {
              const met = hasMet(it.id);
              return (
                <div key={it.id} className={`companion-card ${met ? "" : "locked"}`} data-testid={`hall-companion-${it.id}`}>
                  <PixelSprite name={it.companion.sprite} scale={4} className={met ? "bob" : "silhouette"} />
                  <span className="badge-name">{met ? it.companion.name : "???"}</span>
                  <span className="badge-sub">{it.place}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="hall-section" data-testid="hall-stats">
          <h3>FINAL STATS</h3>
          <div className="stats-grid">
            {HALL_STATS.map((s, idx) => (
              <div className="stat-card" key={s.label} style={{ animationDelay: `${idx * 60}ms` }} data-testid={`stat-${s.label.replace(/[^A-Z0-9]+/gi, "-").toLowerCase()}`}>
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hall-section weakness-panel" data-testid="hall-weaknesses">
          <h3>{WEAKNESSES.title}</h3>
          <p className="scene-sub">{WEAKNESSES.sub}</p>
          <ul>
            {WEAKNESSES.items.map((w, i) => (
              <li key={i} data-testid={`weakness-${i}`}>{w}</li>
            ))}
          </ul>
        </div>

        <div className="hall-section hall-mentors" data-testid="hall-mentors">
          <h3>{HALL_MENTORS.title}</h3>
          {HALL_MENTORS.lines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        <div className="hall-section lets-talk" data-testid="hall-lets-talk">
          <h3>{LETS_TALK.title}</h3>
          {LETS_TALK.lines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
          <p className="hall-sign">{LETS_TALK.sign}</p>
          <a className="btn-pix small" href={`mailto:${LETS_TALK.email}`} data-testid="hall-email-btn">
            SAY HELLO ▸
          </a>
        </div>

        <div className="hall-section epilogue-panel" data-testid="hall-epilogue">
          <h3>{HALL_EPILOGUE.title}</h3>
          {HALL_EPILOGUE.lines.map((line, i) => (
            <p key={i} className={i === HALL_EPILOGUE.lines.length - 1 ? "hall-sign" : ""}>
              {line}
            </p>
          ))}
        </div>

        <div className="hall-actions">
          <button
            className="btn-pix"
            data-testid="hall-back-map"
            onClick={() => {
              chip.sfx("select");
              onMap();
            }}
          >
            WALK THE REGION AGAIN
          </button>
          {!confirmRestart && (
            <button
              className="btn-pix ghost"
              data-testid="hall-restart"
              onClick={() => {
                chip.sfx("select");
                setConfirmRestart(true);
              }}
            >
              NEW GAME+
            </button>
          )}
          {confirmRestart && (
            <button
              className="btn-pix danger"
              data-testid="hall-restart-confirm"
              onClick={() => {
                chip.sfx("hit");
                onRestart();
              }}
            >
              ERASE & RESTART?
            </button>
          )}
        </div>
        <div className="hall-links" data-testid="hall-links">
          {META.links.map((l) => (
            <a
              key={l.label}
              className="btn-pix small"
              href={l.url}
              target="_blank"
              rel="noreferrer"
              data-testid={`hall-link-${l.label.toLowerCase()}`}
            >
              {l.label}
            </a>
          ))}
        </div>
        {BUILT_WITH && <p className="hall-built" data-testid="hall-built-with">{BUILT_WITH}</p>}
        <p className="title-foot">{PLAYER.blurb} · type: {Object.keys(TYPE_COLORS).length} types, all heart</p>
      </div>
    </div>
  );
}
