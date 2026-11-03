import { useEffect, useState } from "react";
import { COLD_OPEN } from "../data/story";

// BoJack-style cold open — the quote, typed over a rainy night. Tap to hurry.
export default function ColdOpen({ onDone, speed = 1 }) {
  const [li, setLi] = useState(0);
  const [shown, setShown] = useState(0);
  const [done, setDone] = useState(false);

  const all = [...COLD_OPEN.quote, `— ${COLD_OPEN.attribution}`, ...COLD_OPEN.close];
  const line = all[li] || "";

  useEffect(() => {
    if (done) return;
    if (shown < line.length) {
      const t = setTimeout(() => setShown((s) => s + 1), Math.max(10, Math.round(38 / speed)));
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      if (li < all.length - 1) {
        setLi(li + 1);
        setShown(0);
      } else {
        setDone(true);
      }
    }, 1500 / speed);
    return () => clearTimeout(t);
  }, [shown, line, li, all.length, done, speed]);

  function advance() {
    if (done) return onDone();
    if (shown < line.length) return setShown(line.length);
    if (li < all.length - 1) {
      setLi(li + 1);
      setShown(0);
    } else {
      setDone(true);
    }
  }

  const inQuote = li < COLD_OPEN.quote.length;
  const isAttribution = li === COLD_OPEN.quote.length;
  const isClose = li > COLD_OPEN.quote.length;

  return (
    <div className="scene scene-coldopen" data-testid="coldopen-screen" onClick={advance}>
      <div className="coldopen-rain" />
      <div className="coldopen-content">
        {!done && (
          <p
            className={`coldopen-line ${inQuote ? "quote" : ""} ${isAttribution ? "attrib" : ""} ${isClose ? "close" : ""}`}
            data-testid="coldopen-line"
          >
            {line.slice(0, shown)}
          </p>
        )}
        {done && (
          <div className="coldopen-done" data-testid="coldopen-done">
            <p className="coldopen-final">
              open every door · finish everything
            </p>
          </div>
        )}
      </div>
      <button
        className="coldopen-skip"
        data-testid="coldopen-skip"
        onClick={(e) => {
          e.stopPropagation();
          onDone();
        }}
      >
        SKIP ▸
      </button>
      {done && (
        <button className="btn-pix coldopen-start" data-testid="coldopen-start" onClick={(e) => { e.stopPropagation(); onDone(); }}>
          PRESS TO CONTINUE
        </button>
      )}
    </div>
  );
}
