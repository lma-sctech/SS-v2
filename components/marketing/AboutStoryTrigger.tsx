"use client";

import { ReactNode, useEffect, useId, useState } from "react";

const aboutSections = [
  {
    title: "A Story Built on Trust, Community and Service",
    paragraphs: [
      "Sanaa Services was born from a simple belief: when people face important life decisions - traveling, preparing documents, protecting their family, moving forward with immigration steps, or planning a new journey - they deserve guidance they can trust.",
      "Founded and led by Sanaa Bergha, Sanaa Services has grown over the past two decades from a small local service office into a trusted multilingual agency serving thousands of individuals, families, travelers and community members in Astoria, Queens and beyond.",
      "What started as a personal commitment to helping people navigate essential paperwork and travel needs has become a recognized community-based agency offering travel services, translation, notary support, insurance guidance, visa and immigration assistance, legal document support and driving-related services.",
    ],
  },
  {
    title: "The Journey of Sanaa Bergha",
    paragraphs: [
      "Sanaa Bergha built her professional reputation step by step, through consistency, dedication and personal involvement with every client.",
      "As a Moroccan-American entrepreneur based in New York, Sanaa understands the challenges faced by immigrants, families, travelers and newcomers. She knows that behind every document, every ticket, every insurance request and every travel plan, there is a person, a family, a responsibility or an important life moment.",
      "For nearly 20 years, Sanaa has been serving her community with a hands-on approach. She started with determination, working closely with clients one by one, building relationships based on honesty, reliability and care. Over time, her reputation grew naturally through word of mouth, repeat clients and community trust.",
      "Today, Sanaa Services has evolved from a one-woman initiative into a dedicated team serving people across multiple needs, while keeping the same personal attention that made the agency trusted from the beginning.",
    ],
  },
  {
    title: "From One Person to a Trusted Team",
    paragraphs: [
      "The growth of Sanaa Services reflects the trust of the community.",
      "Over the years, thousands of clients have turned to Sanaa and her team for help with travel arrangements, important documents, translations, notarizations, insurance needs, visa-related questions, administrative support and more.",
      "This evolution came from years of showing up, solving problems, explaining complex processes, helping families prepare for important steps, and treating each client with respect.",
      "What makes Sanaa Services different is not only the range of services offered, but the way those services are delivered: with patience, clarity, multilingual support and a deep understanding of the community.",
    ],
  },
  {
    title: "What We Do",
    paragraphs: [
      "Sanaa Services is a multilingual agency based in Astoria, New York, offering practical support for everyday and life-changing needs: travel agency services, flights, hotel guidance, trip planning, travel insurance, notary services, translation services, visa consulting, immigration support, insurance guidance, legal document guidance, driving school and DMV-related support.",
      "Whether a client is planning a family trip, preparing documents, looking for insurance, translating official papers, arranging travel to Morocco or another destination, or seeking guidance for an important administrative step, Sanaa Services is here to simplify the process.",
    ],
  },
  {
    title: "A Strong Focus on Travel",
    paragraphs: [
      "Travel has always been at the heart of Sanaa Services.",
      "From helping families book flights to Morocco, to supporting travelers with insurance and documents, to guiding clients through complex travel planning, the agency has become a reliable travel partner for the Moroccan, Arab and international communities in New York.",
      "With major global events such as World Cup 2026 coming to the United States, Sanaa Services continues to strengthen its travel agency services to help families, fans, visitors and community members plan their journeys with confidence.",
      "Our role is simple: we help clients travel better, prepare better and feel supported from the first question to the final confirmation.",
    ],
  },
  {
    title: "Rooted in Astoria, Connected to the Community",
    paragraphs: [
      "Located in the heart of Astoria, Queens, Sanaa Services is deeply connected to one of New York's most diverse and vibrant neighborhoods.",
      "The agency serves clients in English, French and Arabic, making it easier for individuals and families from different backgrounds to access clear guidance and personalized support.",
      "For many clients, Sanaa Services is more than an agency. It is a place where they can ask questions, receive help, understand their options and feel heard.",
    ],
  },
  {
    title: "Our Mission",
    paragraphs: [
      "Our mission is to simplify important services for individuals, families and travelers by providing trusted, multilingual and community-based support.",
      "We believe that every client deserves clear information, honest guidance, respectful service, practical solutions, personal attention and a team that understands their needs.",
      "For Sanaa Bergha and her team, service is not just about completing a transaction. It is about helping people move forward with confidence.",
    ],
  },
  {
    title: "Why Clients Trust Sanaa Services",
    paragraphs: [
      "Clients choose Sanaa Services because they find a team that is experienced, accessible and committed.",
      "They come for travel, documents, translation, notary services, insurance or visa-related guidance - but they stay because they feel supported.",
      "For nearly two decades, Sanaa Services has built its name on trust, reliability and community connection. That is the foundation of the agency, and it remains the promise behind every service provided today.",
    ],
  },
  {
    title: "Sanaa Services Today",
    paragraphs: [
      "Today, Sanaa Services continues to grow while staying true to its original values.",
      "The agency combines experience, multilingual support and a strong local presence to serve thousands of people with professionalism and care.",
      "From Astoria to the world, from family travel to official documents, from personal insurance to immigration-related support, Sanaa Services remains committed to helping clients handle important steps with clarity and confidence.",
      "Sanaa Services - trusted guidance for travel, documents, insurance and life's important moments.",
    ],
  },
];

type AboutStoryTriggerProps = {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
};

export function AboutStoryTrigger({
  children,
  className = "",
  ariaLabel = "Open About us story",
}: AboutStoryTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
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

  return (
    <>
      <button type="button" className={className} aria-label={ariaLabel} onClick={() => setIsOpen(true)}>
        {children}
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-6 sm:px-6" role="dialog" aria-modal="true" aria-labelledby={titleId}>
          <button
            type="button"
            className="absolute inset-0 bg-navy/78 backdrop-blur-sm"
            aria-label="Close About us story"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative max-h-[88vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-white/25 bg-navy/62 text-white shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),rgba(255,255,255,0.05)_38%,rgba(214,184,124,0.12))]" />
            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.24),inset_0_-40px_90px_rgba(0,0,0,0.2)]" />
            <div className="sticky top-0 z-10 border-b border-white/15 bg-navy/72 px-5 py-4 backdrop-blur-2xl sm:px-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-champagne">About us</p>
                  <h2 id={titleId} className="mt-1 font-sans text-2xl font-bold tracking-normal text-white sm:text-3xl">
                    The story behind Sanaa Services
                  </h2>
                </div>
                <button
                  type="button"
                  className="focus-ring flex size-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/12 text-xl font-bold leading-none text-white transition hover:bg-champagne hover:text-navy"
                  aria-label="Close"
                  onClick={() => setIsOpen(false)}
                >
                  x
                </button>
              </div>
            </div>
            <div className="relative z-10 max-h-[calc(88vh-5.5rem)] overflow-y-auto px-5 py-6 sm:px-7">
              <div className="space-y-6">
                {aboutSections.map((section) => (
                  <section key={section.title} className="rounded-2xl border border-white/12 bg-white/8 p-5 shadow-[0_18px_55px_rgba(0,0,0,0.16)] backdrop-blur-md">
                    <h3 className="font-sans text-xl font-bold tracking-normal text-champagne">{section.title}</h3>
                    <div className="mt-3 space-y-3 border-t border-white/10 pt-3">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="text-sm font-medium leading-7 text-white/82 sm:text-base sm:leading-8">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
