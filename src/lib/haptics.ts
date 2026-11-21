/** Tiny, optional haptic punctuation (Android/Chrome). No-ops elsewhere. */
export function tick(ms = 10) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate(ms);
}
export function thud() {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate([12, 30, 18]);
}
