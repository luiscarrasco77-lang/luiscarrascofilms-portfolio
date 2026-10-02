// Lightweight 5-second, muted hover previews live next to the full videos
// (public/videos/previews/<same name>.mp4). Hover only ever loads the preview;
// the full file loads when someone actually opens the player.
export function previewSrc(src: string): string {
  return src.replace("/videos/", "/videos/previews/");
}
