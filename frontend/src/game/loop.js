import { useEffect, useRef } from "react";

export function useLoop(active, fn) {
  const fnRef = useRef(fn);
  fnRef.current = fn;
  useEffect(() => {
    if (!active) return;
    let id;
    const loop = (t) => {
      fnRef.current(t);
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, [active]);
}

export function useTapKey(active, onTap) {
  const ref = useRef(onTap);
  ref.current = onTap;
  useEffect(() => {
    if (!active) return;
    const h = (e) => {
      if (e.target && e.target.tagName === "BUTTON" && !e.target.classList.contains("mg-tap")) return;
      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        ref.current();
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [active]);
}
