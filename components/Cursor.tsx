"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";

// Desktop-only cursor companion: over media marked data-cursor="play" | "view"
// a soft glass disc with a label follows the pointer. Transform-only, rAF-driven.
export default function Cursor() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"play" | "view" | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let x = -100, y = -100, cx = -100, cy = -100, raf = 0;
    const tick = () => {
      cx += (x - cx) * 0.22;
      cy += (y - cy) * 0.22;
      if (ref.current) ref.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = Math.abs(x - cx) + Math.abs(y - cy) > 0.3 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(tick);
      const target = (e.target as Element | null)?.closest?.("[data-cursor]");
      setMode((target?.getAttribute("data-cursor") as "play" | "view" | null) ?? null);
    };
    const onLeave = () => setMode(null);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[95] will-change-transform"
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 w-[88px] h-[88px] rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/25 text-[10px] uppercase tracking-[0.3em] pl-[0.3em] text-white transition-[opacity,scale] duration-300 ease-out ${
          mode ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
      >
        {mode === "view" ? t.cursor.view : t.cursor.play}
      </div>
    </div>
  );
}
