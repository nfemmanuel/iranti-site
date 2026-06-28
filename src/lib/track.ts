declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props?: Record<string, string | number | boolean>; callback?: () => void }
    ) => void;
  }
}

export type IrantiEvent =
  | "install_copied"
  | "cta_get_started"
  | "cta_evidence"
  | "outbound_github"
  | "outbound_docs"
  | "scrolled_evidence"
  | "waitlist_submitted";

export function track(
  event: IrantiEvent,
  props?: Record<string, string | number | boolean>
): void {
  if (typeof window === "undefined" || typeof window.plausible !== "function") return;
  window.plausible(event, props ? { props } : undefined);
}

export function trackOutbound(
  event: IrantiEvent,
  href: string,
  props?: Record<string, string | number | boolean>
): void {
  if (typeof window === "undefined" || typeof window.plausible !== "function") {
    window.location.href = href;
    return;
  }
  let navigated = false;
  const go = () => {
    if (navigated) return;
    navigated = true;
    window.location.href = href;
  };
  window.plausible(event, { props, callback: go });
  setTimeout(go, 600);
}
