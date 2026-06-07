"use client";

import { useEffect, useState } from "react";
import { publicAsset } from "@/lib/assets";

type HeroVideoProps = {
  video: string;
};

function shouldAvoidVideo() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;

  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    connection?.saveData === true
  );
}

export function HeroVideo({ video }: HeroVideoProps) {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (shouldAvoidVideo()) return;

    const timeout = window.setTimeout(() => {
      setVideoSrc(publicAsset(video));
    }, 900);

    return () => window.clearTimeout(timeout);
  }, [video]);

  return (
    <div className="absolute inset-0">
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
