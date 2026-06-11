"use client";

import { FormEvent, useState } from "react";
import type { Service } from "@/data/services";
import { trackEvent } from "@/lib/analytics";
import { buildWhatsAppMessage, formDataToPayload, submitContactRequest } from "@/lib/contact-api";
import { whatsappMessageLink } from "@/lib/contact";
import { RequestSuccessModal } from "@/components/forms/RequestSuccessModal";
import { UploadField } from "@/components/forms/UploadField";
import { CardSurface } from "@/components/ui/CardSurface";
import { SubmitButton } from "@/components/ui/SubmitButton";

type Status = "idle" | "loading" | "success" | "error";

type SuccessState = {
  requestId: string;
  whatsappHref: string;
};

export function ServiceLeadForm({ service }: { service: Service }) {
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const [started, setStarted] = useState(false);
  const [successState, setSuccessState] = useState<SuccessState | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (data.get("company")) {
      setStatus("error");
      setFeedback("Please review the form before submitting.");
      trackEvent("form_error", { form: service.slug, reason: "honeypot" });
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      setStatus("error");
      setFeedback("Please fill in the required fields before submitting.");
      trackEvent("form_error", { form: service.slug, reason: "invalid" });
      return;
    }

    if (!hasPhoneOrEmail(data)) {
      setStatus("error");
      setFeedback("Please add a phone number or an email address so our team can follow up.");
      trackEvent("form_error", { form: service.slug, reason: "missing_contact" });
      return;
    }

    const payload = formDataToPayload(data, {
      formType: "service_request",
      service: service.title,
      date: String(data.get("preferredDate") || "").trim(),
      additionalDetails: String(data.get("message") || "").trim(),
      serviceDetails: collectServiceDetails(service, data),
    });

    try {
      setStatus("loading");
      setFeedback("");
      const result = await submitContactRequest(payload);
      const requestId = result.requestId || "SS-PENDING";
      const whatsappPayload = { ...payload, requestId };
      const message = buildWhatsAppMessage(service.title, whatsappPayload);

      setSuccessState({
        requestId,
        whatsappHref: whatsappMessageLink(message),
      });
      setStatus("success");
      setFeedback("Your request was sent. You can also send it on WhatsApp from the confirmation window.");
      form.reset();
      trackEvent("form_submit", { form: service.slug, destination: "api" });
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "We could not send your request. Please try again.");
      trackEvent("form_error", { form: service.slug, reason: "api" });
    }
  }

  return (
    <>
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
        <p className="mt-2 text-sm leading-6 text-slate">Share the essentials now. Our team can follow up for the remaining details.</p>
        <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="Full name" name="name" required />
          <Select label="Preferred contact method" name="contactMethod" required options={["Call", "WhatsApp", "Email"]} />
          <Field label="Phone" name="phone" type="tel" placeholder="Phone or email required" />
          <Field label="Email" name="email" type="email" placeholder="Phone or email required" />
          <label className="block text-sm font-bold text-navy sm:col-span-2">
            Message
            <textarea required name="message" rows={4} placeholder="Tell us what you need help with." className="focus-ring mt-2 w-full rounded-xl border border-navy/15 bg-white px-3 py-3 text-sm text-navy placeholder:text-navy/50" />
          </label>
        </div>

        <details className="mt-5 rounded-2xl border border-navy/10 bg-white/70 p-4">
          <summary className="cursor-pointer text-sm font-bold text-navy">
            Add service details <span className="font-semibold text-slate">(optional)</span>
          </summary>
          <p className="mt-2 text-xs leading-5 text-slate">Helpful if you already know them. You can also leave this for our follow-up.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Preferred date" name="preferredDate" type="date" />
            {service.formFields.map((field) => (
              <Field key={field} label={field} name={fieldName(field)} />
            ))}
            {service.upload ? (
              <div className="sm:col-span-2">
                <UploadField service={service.slug} />
              </div>
            ) : null}
          </div>
        </details>

        <SubmitButton disabled={status === "loading"}>
          {status === "loading" ? "Sending request..." : "Send Request"}
        </SubmitButton>
        {status === "success" ? <p className="mt-3 text-sm font-semibold text-navy">{feedback}</p> : null}
        {status === "error" ? <p className="mt-3 text-sm font-semibold text-red-700">{feedback}</p> : null}
      </CardSurface>

      {successState ? (
        <RequestSuccessModal requestId={successState.requestId} whatsappHref={successState.whatsappHref} onClose={() => setSuccessState(null)} />
      ) : null}
    </>
  );
}

function hasPhoneOrEmail(data: FormData) {
  return Boolean(String(data.get("phone") || "").trim() || String(data.get("email") || "").trim());
}

function collectServiceDetails(service: Service, data: FormData) {
  return service.formFields
    .map((field) => {
      const value = String(data.get(fieldName(field)) || "").trim();
      return value ? `${field}: ${value}` : "";
    })
    .filter(Boolean)
    .join(" | ");
}

function fieldName(label: string) {
  return label.toLowerCase().replaceAll(" ", "_");
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block text-sm font-bold text-navy">
      {label}
      <input
        required={required}
        name={name}
        type={type}
        placeholder={placeholder}
        className="focus-ring mt-2 min-h-11 w-full rounded-xl border border-navy/15 bg-white px-3 text-sm text-navy placeholder:text-navy/50"
      />
    </label>
  );
}

function Select({
  label,
  name,
  options,
  required = false,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-bold text-navy">
      {label}
      <select required={required} name={name} className="focus-ring mt-2 min-h-11 w-full rounded-xl border border-navy/15 bg-white px-3 text-sm text-navy">
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
