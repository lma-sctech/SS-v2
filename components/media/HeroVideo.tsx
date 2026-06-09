"use client";

import { useEffect, useState } from "react";
import { publicAsset } from "@/lib/assets";

type HeroVideoProps = {
  video: string;
  fixed?: boolean;
  priority?: boolean;
};

function shouldAvoidVideo() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;

  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    connection?.saveData === true
  );
}

export function HeroVideo({ video, fixed = false, priority = false }: HeroVideoProps) {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (shouldAvoidVideo()) return;

    let cancelled = false;
    let timeout: number | undefined;
    let idleId: number | undefined;
    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    function loadVideo() {
      if (cancelled) return;
      setVideoSrc(publicAsset(video));
    }

    if (priority) {
      loadVideo();
      return () => {
        cancelled = true;
      };
    }

    function scheduleVideoLoad() {
      if (idleWindow.requestIdleCallback) {
        idleId = idleWindow.requestIdleCallback(loadVideo, { timeout: 2200 });
        return;
      }

      timeout = window.setTimeout(loadVideo, 1600);
    }

    if (document.readyState === "complete") {
      scheduleVideoLoad();
    } else {
      window.addEventListener("load", scheduleVideoLoad, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", scheduleVideoLoad);
      if (timeout) window.clearTimeout(timeout);
      if (idleId && idleWindow.cancelIdleCallback) idleWindow.cancelIdleCallback(idleId);
    };
  }, [priority, video]);

  return (
    <div
      className={
        fixed
          ? "pointer-events-none fixed inset-0 z-0 h-screen w-screen overflow-hidden"
          : "absolute inset-0"
      }
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 bg-[linear-gradient(135deg,rgba(5,18,47,1)_0%,rgba(11,31,72,1)_48%,rgba(8,15,31,1)_100%)]"
        aria-hidden="true"
      />
      {videoSrc ? (
        <video
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${isReady ? "opacity-100" : "opacity-0"}`}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          onCanPlay={() => setIsReady(true)}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}
