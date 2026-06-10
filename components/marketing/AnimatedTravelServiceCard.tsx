"use client";

import { KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { whatsappLink } from "@/lib/contact";

type TravelServiceCardProps = {
  service: {
    title: string;
    body: string;
    image: string;
    images?: string[];
    accentLabel: string;
    ctaPrompt: string;
    highlights: string[];
    bestFor: string[];
    process: string[];
    included: string[];
  };
  index: number;
};

export function AnimatedTravelServiceCard({ service, index }: TravelServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const imageCount = service.images?.length ?? 0;
  const titleId = useId();
  const galleryImages = service.images?.length ? service.images : [service.image];

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
    if ((!isVisible && !isOpen) || imageCount < 2) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const interval = window.setInterval(() => {
      setActiveImageIndex((current) => (current + 1) % imageCount);
    }, 3000);

    return () => window.clearInterval(interval);
  }, [imageCount, isOpen, isVisible]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  function onCardKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen(true);
    }
  }

  return (
    <>
      <div
        ref={cardRef}
        className={`travel-service-card ${isVisible ? "travel-service-card-visible" : ""}`}
        style={{ transitionDelay: `${index * 110}ms` }}
      >
        <div
          role="button"
          tabIndex={0}
          aria-label={`Explore ${service.title}`}
          className="focus-ring group relative min-h-[17rem] cursor-pointer overflow-hidden rounded-2xl border border-white/45 bg-navy text-left text-white shadow-[0_22px_70px_rgba(15,23,42,0.16)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(15,23,42,0.18)]"
          onClick={() => setIsOpen(true)}
          onKeyDown={onCardKeyDown}
        >
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
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-champagne">{service.accentLabel}</p>
            <p className="mt-2 text-xl font-bold text-white">{service.title}</p>
            <p className="mt-3 text-sm leading-6 text-white/78">{service.body}</p>
            <span className="mt-5 inline-flex w-fit rounded-full border border-white/20 bg-white/12 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white transition group-hover:bg-champagne group-hover:text-navy">
              Explore service
            </span>
          </div>
        </div>
      </div>

      {isOpen ? (
        <div className="fixed inset-0 z-[90] flex items-center justify-center px-4 py-5 sm:px-6" role="dialog" aria-modal="true" aria-labelledby={titleId}>
          <button
            type="button"
            className="service-modal-overlay absolute inset-0 bg-navy/80 backdrop-blur-md"
            aria-label={`Close ${service.title} details`}
            onClick={() => setIsOpen(false)}
          />
          <div className="service-modal-panel relative max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-2xl border border-white/25 bg-navy/72 text-white shadow-[0_30px_100px_rgba(0,0,0,0.48)] backdrop-blur-2xl">
            <div className="grid max-h-[90vh] overflow-y-auto lg:grid-cols-[0.98fr_1.02fr]">
              <div className="relative aspect-[1.08/1] min-h-[18rem] overflow-hidden lg:sticky lg:top-1/2 lg:m-6 lg:self-start lg:-translate-y-1/2 lg:rounded-2xl">
                {galleryImages.length > 1 ? (
                  galleryImages.map((image, imageIndex) => (
                    <ResponsiveImage
                      key={image}
                      src={image}
                      alt=""
                      className={`travel-service-card-slide absolute inset-0 h-full w-full object-cover object-center service-modal-hero-image ${
                        imageIndex === activeImageIndex ? "travel-service-card-slide-active" : ""
                      }`}
                      loading="lazy"
                    />
                  ))
                ) : (
                  <ResponsiveImage src={service.image} alt="" className="absolute inset-0 h-full w-full object-cover object-center service-modal-hero-image" loading="lazy" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/42 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-champagne">{service.accentLabel}</p>
                  <h2 id={titleId} className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-sm leading-6 text-white/82 sm:text-base">{service.body}</p>
                </div>
              </div>

              <div className="relative p-5 sm:p-7">
                <button
                  type="button"
                  className="focus-ring absolute right-5 top-5 z-10 flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/12 text-xl font-bold leading-none text-white transition hover:bg-champagne hover:text-navy"
                  aria-label="Close"
                  onClick={() => setIsOpen(false)}
                >
                  x
                </button>

                <div className="pr-12">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-champagne">Service details</p>
                  <p className="mt-2 text-2xl font-bold leading-tight text-white sm:text-3xl">Plan with a team that understands the whole trip.</p>
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  {service.highlights.map((highlight, highlightIndex) => (
                    <div
                      key={highlight}
                      className="service-modal-card rounded-2xl border border-white/12 bg-white/10 p-4 shadow-[0_18px_55px_rgba(0,0,0,0.16)] backdrop-blur-md"
                      style={{ transitionDelay: `${highlightIndex * 80}ms` }}
                    >
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-champagne">0{highlightIndex + 1}</p>
                      <p className="mt-2 text-sm font-bold leading-5 text-white">{highlight}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-7 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
                  <InfoPanel title="Best for" items={service.bestFor} />
                  <InfoPanel title="Included support" items={service.included} />
                </div>

                <div className="mt-7 rounded-2xl border border-white/12 bg-white/8 p-5 backdrop-blur-md">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-champagne">How it works</p>
                  <ol className="mt-5 grid gap-3">
                    {service.process.map((step, stepIndex) => (
                      <li key={step} className="flex gap-3 rounded-xl bg-white/8 p-3">
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-champagne text-sm font-bold text-navy">{stepIndex + 1}</span>
                        <span className="text-sm font-semibold leading-6 text-white/84">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="sticky bottom-0 -mx-5 mt-7 border-t border-white/12 bg-navy/82 px-5 py-4 backdrop-blur-xl sm:-mx-7 sm:px-7">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <ButtonLink href={whatsappLink(service.ctaPrompt)} variant="whatsapp" fullMobile target="_blank" rel="noreferrer">
                      Message us on WhatsApp
                    </ButtonLink>
                    <ButtonLink href="#quick-request" variant="primary" fullMobile onClick={() => setIsOpen(false)}>
                      Start request
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function InfoPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-white/12 bg-white/8 p-5 backdrop-blur-md">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-champagne">{title}</p>
      <ul className="mt-4 grid gap-3">
        {items.map((item) => (
          <li key={item} className="rounded-xl bg-white/8 px-4 py-3 text-sm font-semibold leading-5 text-white/84">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
