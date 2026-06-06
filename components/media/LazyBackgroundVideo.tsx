/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import { publicAsset } from "@/lib/assets";

type LazyBackgroundVideoProps = {
  poster: string;
  video: string;
};

function canLoadVideo() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;

  return (
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    connection?.saveData !== true
  );
}

export function LazyBackgroundVideo({ poster, video }: LazyBackgroundVideoProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const element = rootRef.current;
    if (!element || !canLoadVideo()) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "700px 0px", threshold: 0.01 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="absolute inset-0">
      <img
        src={publicAsset(poster)}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        decoding="async"
        aria-hidden="true"
      />
      {shouldLoad ? (
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
          <source src={publicAsset(video)} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}
