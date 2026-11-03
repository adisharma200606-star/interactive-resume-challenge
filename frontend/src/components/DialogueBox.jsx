import { useEffect, useState } from "react";
import { chip } from "../audio/chiptune";

// GBA dialogue box — types text, auto-advances, tap to hurry.
export default function DialogueBox({ lines, onDone, testid = "dialogue-box", speed = 1 }) {
  const [li, setLi] = useState(0);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    setLi(0);
    setShown(0);
  }, [lines]);

  const line = lines[li] || "";

  useEffect(() => {
    if (shown < line.length) {
      const t = setTimeout(() => {
        setShown((s) => s + 1);
        if (shown % 3 === 0) chip.sfx("text");
      }, Math.max(6, Math.round(22 / speed)));
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => advance(), 1600 / speed);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown, line, li]);

  function advance() {
    if (shown < line.length) {
      setShown(line.length);
      return;
    }
    if (li < lines.length - 1) {
      setLi(li + 1);
      setShown(0);
    } else {
      onDone();
    }
  }

  return (
    <div className="dlg" data-testid={testid} onClick={advance}>
      <span className="dlg-text">{line.slice(0, shown)}</span>
      {shown >= line.length && <i className="dlg-arrow" data-testid="dialogue-continue-arrow" />}
    </div>
  );
}
