"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { CardSurface } from "@/components/ui/CardSurface";

type FAQ = {
  question: string;
  answer: string;
};

export function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => {
        const isOpen = open === index;
        return (
          <CardSurface key={faq.question} className={`${isOpen ? "border-champagne/45" : ""}`}>
            <button
              type="button"
              className="focus-ring flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left font-bold text-navy"
              aria-expanded={isOpen}
              onClick={() => {
                setOpen(isOpen ? null : index);
                if (!isOpen) trackEvent("faq_open", { question: faq.question });
              }}
            >
              <span>{faq.question}</span>
              <span aria-hidden="true" className="text-xl text-champagne">{isOpen ? "-" : "+"}</span>
            </button>
            {isOpen ? <p className="px-5 pb-5 text-sm leading-6 text-slate">{faq.answer}</p> : null}
          </CardSurface>
        );
      })}
    </div>
  );
}
