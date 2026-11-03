export default function GbaShell({ children, muted, onToggleMute, badges, dexCount, hwDisabled, onHw, speed }) {
  return (
    <div className="gba-wrap">
      <div className="gba">
        <div className="bezel">
          <div className="screen">
            {children}
            <div className="scanlines" />
          </div>
          <div className="bezel-brand">
            ADI ADVANCE <span>· EMERALD</span>
          </div>
          <div className="hw">
            <button
              className="hw-btn"
              data-testid="hw-dex"
              disabled={hwDisabled}
              onClick={() => onHw("dex")}
            >
              DEX {dexCount}
            </button>
            <button
              className="hw-btn"
              data-testid="hw-badges"
              disabled={hwDisabled}
              onClick={() => onHw("badges")}
            >
              BADGES {badges}
            </button>
            <button
              className="hw-btn"
              data-testid="hw-lessons"
              disabled={hwDisabled}
              onClick={() => onHw("lessons")}
            >
              LOG
            </button>
            <button className="hw-btn" data-testid="hw-speed" onClick={() => onHw("speed")}>
              SPEED {speed}x
            </button>
            <button className="hw-btn" data-testid="hw-sound" onClick={onToggleMute}>
              {muted ? "SOUND: OFF" : "SOUND: ON"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
