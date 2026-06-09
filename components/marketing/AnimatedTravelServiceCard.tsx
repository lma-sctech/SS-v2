"use client";

import { useEffect, useRef, useState } from "react";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { CardSurface } from "@/components/ui/CardSurface";

type TravelServiceCardProps = {
  service: {
    title: string;
    body: string;
    image: string;
    images?: string[];
  };
  index: number;
};

export function AnimatedTravelServiceCard({ service, index }: TravelServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const imageCount = service.images?.length ?? 0;

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.18 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || imageCount < 2) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const interval = window.setInterval(() => {
      setActiveImageIndex((current) => (current + 1) % imageCount);
    }, 3000);

    return () => window.clearInterval(interval);
  }, [imageCount, isVisible]);

  return (
    <div
      ref={cardRef}
      className={`travel-service-card ${isVisible ? "travel-service-card-visible" : ""}`}
      style={{ transitionDelay: `${index * 110}ms` }}
    >
      <CardSurface variant="media" interactive className="group min-h-[17rem] p-0">
        {service.images?.length ? (
          service.images.map((image, imageIndex) => (
            <ResponsiveImage
              key={image}
              src={image}
              className={`travel-service-card-slide absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105 ${
                imageIndex === activeImageIndex ? "travel-service-card-slide-active" : ""
              }`}
            />
          ))
        ) : (
          <ResponsiveImage src={service.image} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/72 to-navy/18" />
        <div className="travel-service-card-shine" />
        <div className="relative z-10 flex h-full min-h-[17rem] flex-col justify-end p-6">
          <p className="text-xl font-bold text-white">{service.title}</p>
          <p className="mt-3 text-sm leading-6 text-white/78">{service.body}</p>
        </div>
      </CardSurface>
    </div>
  );
}
