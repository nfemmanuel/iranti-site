"use client";

import { useEffect, useRef } from "react";
import { track, type IrantiEvent } from "@/lib/track";

export function useSectionView(event: IrantiEvent, threshold = 0.4) {
  const ref = useRef<HTMLElement | null>(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || fired.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !fired.current) {
            fired.current = true;
            track(event);
            observer.disconnect();
          }
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [event, threshold]);

  return ref;
}
