import DialogueBox from "./DialogueBox";
import { PROLOGUE_LINES } from "../data/story";

export default function Prologue({ onDone, speed = 1 }) {
  return (
    <div className="scene scene-prologue" data-testid="prologue-screen">
      <div className="prologue-spacer" />
      <DialogueBox
        lines={PROLOGUE_LINES}
        onDone={onDone}
        speed={speed}
        testid="prologue-dialogue"
      />
    </div>
  );
}
