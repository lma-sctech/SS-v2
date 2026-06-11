"use client";

import { useEffect, useRef, useState } from "react";
import { ServiceCard } from "@/components/marketing/ServiceCard";
import { services } from "@/data/services";

export function ServiceGrid({ featured = false, className = "mt-10" }: { featured?: boolean; className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const orderedServices = [...services].sort((a, b) => {
    if (a.slug === "travel") return -1;
    if (b.slug === "travel") return 1;
    return 0;
  });

  useEffect(() => {
    const element = gridRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={gridRef} className={`${className} grid gap-5 md:grid-cols-2 lg:grid-cols-3`}>
      {orderedServices.map((service, index) => (
        <ServiceCard
          key={service.slug}
          service={service}
          featured={featured && (service.slug === "travel" || index === 1)}
          revealDirection={index % 2 === 0 ? "left" : "right"}
          revealIndex={index}
          revealActive={isVisible}
        />
      ))}
    </div>
  );
}
