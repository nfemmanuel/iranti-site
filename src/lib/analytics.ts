/**
 * Thin wrapper around Plausible's custom event API.
 *
 * Plausible is loaded via a <script> tag in layout.tsx and attaches
 * `window.plausible` when available. This module guards safely against
 * SSR and ad-blocker environments where the function may be absent.
 *
 * Usage:
 *   trackEvent("install_copy")
 *   trackEvent("step_copy", { step: "Install the CLI" })
 */
export function trackEvent(name: string, props?: Record<string, string>) {
  if (typeof window === "undefined") return;
  if (!(window as any).plausible) return;
  (window as any).plausible(name, { props });
}
