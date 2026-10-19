import { useSyncExternalStore } from "react";

// Muted 5-second previews live next to the full videos: 1080p in
// public/videos/previews-hd/ and a light version in public/videos/previews/
// (same file names). Cards only ever load a preview; the full film loads when
// someone actually opens the player.
export function previewSrc(src: string, hd = false): string {
  return src.replace("/videos/", hd ? "/videos/previews-hd/" : "/videos/previews/");
}

type NetworkInfo = { saveData?: boolean; effectiveType?: string };

// HD on desktop-size screens unless the visitor asked to save data or is on a
// 2G/3G connection. Phones get the light version (they have no hover anyway).
function prefersHd(): boolean {
  if (window.innerWidth < 768) return false;
  const conn = (navigator as Navigator & { connection?: NetworkInfo }).connection;
  if (conn?.saveData) return false;
  if (/(^|-)(2g|3g)$/.test(conn?.effectiveType ?? "")) return false;
  return true;
}

const subscribe = () => () => {};

/** false during server render / hydration, then the real value on the client. */
export function useHdPreviews(): boolean {
  return useSyncExternalStore(subscribe, prefersHd, () => false);
}
