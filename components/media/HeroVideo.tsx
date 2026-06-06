"use client";

import { useEffect, useState } from "react";
import { publicAsset } from "@/lib/assets";

type HeroVideoProps = {
  poster: string;
  mobilePoster: string;
  video: string;
};

function shouldAvoidVideo() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;

  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    connection?.saveData === true ||
    window.matchMedia("(max-width: 767px)").matches
  );
}

export function HeroVideo({ poster, mobilePoster, video }: HeroVideoProps) {
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
      <picture>
        <source media="(max-width: 767px)" srcSet={publicAsset(mobilePoster)} />
        <img
          src={publicAsset(poster)}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          decoding="async"
          aria-hidden="true"
        />
      </picture>
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
