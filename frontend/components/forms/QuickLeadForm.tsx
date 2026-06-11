"use client";

import { FormEvent, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { buildWhatsAppMessage, formDataToPayload, submitContactRequest } from "@/lib/contact-api";
import { whatsappMessageLink } from "@/lib/contact";
import { publicAsset } from "@/lib/assets";
import { RequestSuccessModal } from "@/components/forms/RequestSuccessModal";
import { SubmitButton } from "@/components/ui/SubmitButton";

type Status = "idle" | "loading" | "success" | "error";

type SuccessState = {
  requestId: string;
  whatsappHref: string;
};

export function QuickLeadForm() {
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
      trackEvent("form_error", { form: "quick_lead", reason: "honeypot" });
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      setStatus("error");
      setFeedback("Please fill in the required fields before submitting.");
      trackEvent("form_error", { form: "quick_lead", reason: "invalid" });
      return;
    }

    if (!hasPhoneOrEmail(data)) {
      setStatus("error");
      setFeedback("Please add a phone number or an email address so our team can follow up.");
      trackEvent("form_error", { form: "quick_lead", reason: "missing_contact" });
      return;
    }

    const payload = formDataToPayload(data, {
      formType: "travel_request",
      service: "Travel request",
      destination: String(data.get("destinationCity") || "").trim(),
      date: String(data.get("travelDates") || "").trim(),
    });

    try {
      setStatus("loading");
      setFeedback("");
      const result = await submitContactRequest(payload);
      const requestId = result.requestId || "SS-PENDING";
      const whatsappPayload = { ...payload, requestId };
      const message = buildWhatsAppMessage("Travel request", whatsappPayload);

      setSuccessState({
        requestId,
        whatsappHref: whatsappMessageLink(message),
      });
      setStatus("success");
      setFeedback("Your request was sent. You can also send it on WhatsApp from the confirmation window.");
      form.reset();
      trackEvent("form_submit", { form: "quick_lead", destination: "api" });
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "We could not send your request. Please try again.");
      trackEvent("form_error", { form: "quick_lead", reason: "api" });
    }
  }

  return (
    <>
      <form
        className="relative overflow-hidden rounded-2xl border border-white/45 p-5 text-white shadow-[0_22px_70px_rgba(15,23,42,0.22)] sm:p-6"
        onSubmit={onSubmit}
        onFocus={() => {
          if (!started) {
            setStarted(true);
            trackEvent("form_start", { form: "quick_lead" });
          }
        }}
      >
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src={publicAsset("/vid/CSM1.mp4")} type="video/mp4" />
        </video>
        <div className="site-background-scrim absolute inset-0" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/48 to-black/18" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(214,184,124,0.28),transparent_24rem)]" />
        <div className="relative z-20 rounded-2xl border border-white/20 bg-black/24 p-4 shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-md sm:p-5">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-champagne">Travel request</p>
            <h2 className="mt-2 text-2xl font-bold text-white">Tell us about your trip.</h2>
            <p className="mt-2 text-sm leading-6 text-white/78">Share the essentials now. Our Astoria team can follow up for the travel details.</p>
          </div>
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field label="Full name" name="name" required />
            <Select label="Preferred contact method" name="contactMethod" required options={["Call", "WhatsApp", "Email"]} />
            <Field label="Phone number" name="phone" type="tel" placeholder="Phone or email required" />
            <Field label="Email address" name="email" type="email" placeholder="Phone or email required" />
            <Select label="Travel purpose" name="travelPurpose" required options={["World Cup 2026", "Family trip", "Morocco trip", "Business trip", "Vacation", "Other"]} className="sm:col-span-2" />
            <label className="block text-sm font-bold text-white sm:col-span-2">
              Message
              <textarea
                required
                name="message"
                rows={4}
                placeholder="Tell us what you need help with."
                className="focus-ring mt-2 w-full rounded-xl border border-white/45 bg-white/45 px-3 py-3 text-sm font-semibold text-navy shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur-md"
              />
            </label>
          </div>

          <details className="mt-5 rounded-2xl border border-white/20 bg-white/10 p-4">
            <summary className="cursor-pointer text-sm font-bold text-champagne">
              Add travel details <span className="font-semibold text-white/65">(optional)</span>
            </summary>
            <p className="mt-2 text-xs leading-5 text-white/70">Helpful if you already know them. You can also leave this for our follow-up.</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Departure city" name="departureCity" />
              <Field label="Destination city" name="destinationCity" />
              <Field label="Travel dates" name="travelDates" placeholder="Example: June 10-18, 2026" />
              <Field label="Number of travelers" name="travelers" type="number" min="1" />
              <Select label="Need flight?" name="needFlight" options={["Yes", "No", "Not sure"]} />
              <Select label="Need hotel?" name="needHotel" options={["Yes", "No", "Not sure"]} />
              <Select label="Need insurance?" name="needInsurance" options={["Yes", "No", "Not sure"]} />
              <Select label="Need documents, translation or visa support?" name="needDocuments" options={["Yes", "No", "Not sure"]} />
              <Field label="Budget range" name="budget" placeholder="Example: $1,500-$2,500" />
            </div>
          </details>

          <SubmitButton className="bg-champagne text-navy hover:bg-[#c9aa67]" disabled={status === "loading"}>
            {status === "loading" ? "Sending request..." : "Send Travel Request"}
          </SubmitButton>
          {status === "success" ? <p className="mt-3 text-sm font-semibold text-white">{feedback}</p> : null}
          {status === "error" ? <p className="mt-3 text-sm font-semibold text-red-200">{feedback}</p> : null}
        </div>
      </form>

      {successState ? (
        <RequestSuccessModal requestId={successState.requestId} whatsappHref={successState.whatsappHref} onClose={() => setSuccessState(null)} />
      ) : null}
    </>
  );
}

function hasPhoneOrEmail(data: FormData) {
  return Boolean(String(data.get("phone") || "").trim() || String(data.get("email") || "").trim());
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  min,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  min?: string;
}) {
  return (
    <label className="block text-sm font-bold text-white">
      {label}
      <input
        required={required}
        name={name}
        type={type}
        placeholder={placeholder}
        min={min}
        className="focus-ring mt-2 min-h-11 w-full rounded-xl border border-white/45 bg-white/45 px-3 text-sm font-semibold text-navy shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur-md placeholder:text-navy/50"
      />
    </label>
  );
}

function Select({
  label,
  name,
  options,
  required = false,
  className = "",
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={`block text-sm font-bold text-white ${className}`}>
      {label}
      <select required={required} name={name} className="focus-ring mt-2 min-h-11 w-full rounded-xl border border-white/45 bg-white/45 px-3 text-sm font-semibold text-navy shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur-md">
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
