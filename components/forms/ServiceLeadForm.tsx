"use client";

import { FormEvent, useState } from "react";
import type { Service } from "@/data/services";
import { trackEvent } from "@/lib/analytics";
import { whatsappMessageLink } from "@/lib/contact";
import { UploadField } from "@/components/forms/UploadField";
import { CardSurface } from "@/components/ui/CardSurface";
import { SubmitButton } from "@/components/ui/SubmitButton";

type Status = "idle" | "loading" | "success" | "error";

export function ServiceLeadForm({ service }: { service: Service }) {
  const [status, setStatus] = useState<Status>("idle");
  const [started, setStarted] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (data.get("company")) {
      setStatus("error");
      trackEvent("form_error", { form: service.slug, reason: "honeypot" });
      return;
    }

    if (!form.checkValidity()) {
      setStatus("error");
      trackEvent("form_error", { form: service.slug, reason: "invalid" });
      return;
    }

    const message = buildWhatsAppMessage(service.title, data);
    window.open(whatsappMessageLink(message), "_blank", "noopener,noreferrer");
    setStatus("success");
    form.reset();
    trackEvent("form_submit", { form: service.slug, destination: "whatsapp" });
  }

  return (
    <CardSurface
      as="form"
      glow
      className="p-5 sm:p-6"
      onSubmit={onSubmit}
      onFocus={() => {
        if (!started) {
          setStarted(true);
          trackEvent("form_start", { form: service.slug });
        }
      }}
    >
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-champagne">Service request</p>
      <h2 className="mt-2 text-2xl font-bold text-navy">{service.primaryCta}</h2>
      <p className="mt-2 text-sm leading-6 text-slate">Share your details and our team will follow up with clear next steps.</p>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Full name" name="name" required />
        <Field label="Phone" name="phone" type="tel" required />
        <Field label="Email" name="email" type="email" />
        <Field label="Preferred date" name="preferredDate" type="date" />
        {service.formFields.map((field) => (
          <Field key={field} label={field} name={field.toLowerCase().replaceAll(" ", "_")} required />
        ))}
        {service.upload ? (
          <div className="sm:col-span-2">
            <UploadField service={service.slug} />
          </div>
        ) : null}
        <label className="block text-sm font-bold text-navy sm:col-span-2">
          Additional details
          <textarea required name="message" rows={4} className="focus-ring mt-2 w-full rounded-xl border border-navy/15 bg-white px-3 py-3 text-sm text-navy" />
        </label>
      </div>
      <SubmitButton disabled={status === "loading"}>
        Send Request
      </SubmitButton>
      {status === "success" ? <p className="mt-3 text-sm font-semibold text-navy">Your message is ready. WhatsApp will open so you can send it to our team.</p> : null}
      {status === "error" ? <p className="mt-3 text-sm font-semibold text-red-700">Please fill in all required fields before submitting.</p> : null}
    </CardSurface>
  );
}

function buildWhatsAppMessage(serviceTitle: string, data: FormData) {
  const lines = [`Hello Sanaa Services, I would like help with ${serviceTitle}.`, ""];

  data.forEach((value, key) => {
    if (key === "company" || typeof value !== "string" || !value.trim()) return;
    lines.push(`${formatLabel(key)}: ${value.trim()}`);
  });

  return lines.join("\n");
}

function formatLabel(key: string) {
  return key
    .replace(/_/g, " ")
    .replace(/^./, (letter) => letter.toUpperCase());
}

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="block text-sm font-bold text-navy">
      {label}
      <input
        required={required}
        name={name}
        type={type}
        className="focus-ring mt-2 min-h-11 w-full rounded-xl border border-navy/15 bg-white px-3 text-sm text-navy"
      />
    </label>
  );
}
