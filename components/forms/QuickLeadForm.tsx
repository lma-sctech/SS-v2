"use client";

import { FormEvent, useState } from "react";
import { services } from "@/data/services";
import { trackEvent } from "@/lib/analytics";
import { publicAsset } from "@/lib/assets";
import { SubmitButton } from "@/components/ui/SubmitButton";

type Status = "idle" | "loading" | "success" | "error";

export function QuickLeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [started, setStarted] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (data.get("company")) {
      setStatus("error");
      trackEvent("form_error", { form: "quick_lead", reason: "honeypot" });
      return;
    }

    if (!form.checkValidity()) {
      setStatus("error");
      trackEvent("form_error", { form: "quick_lead", reason: "invalid" });
      return;
    }

    setStatus("loading");
    window.setTimeout(() => {
      setStatus("success");
      form.reset();
      trackEvent("form_submit", { form: "quick_lead" });
    }, 700);
  }

  return (
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/48 to-black/18" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(214,184,124,0.28),transparent_24rem)]" />
      <div className="relative z-20 rounded-2xl border border-white/20 bg-black/24 p-4 shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-md sm:p-5">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-champagne">Quick request</p>
        <h2 className="mt-2 text-2xl font-bold text-white">Tell us what you need.</h2>
        <p className="mt-2 text-sm leading-6 text-white/78">Fill in the form and our team will follow up with you directly. We respond by call, WhatsApp or email, wherever you are in the US.</p>
      </div>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Full name" name="name" required />
        <Field label="Phone number" name="phone" type="tel" required />
        <Field label="Email address" name="email" type="email" />
        <label className="block text-sm font-bold text-white">
          Service needed
          <select required name="service" className="focus-ring mt-2 min-h-11 w-full rounded-xl border border-white/45 bg-white/45 px-3 text-sm font-semibold text-navy shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur-md">
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.slug} value={service.title}>{service.title}</option>
            ))}
            <option>Other</option>
          </select>
        </label>
        <label className="block text-sm font-bold text-white sm:col-span-2">
          Preferred contact method
          <select required name="contactMethod" className="focus-ring mt-2 min-h-11 w-full rounded-xl border border-white/45 bg-white/45 px-3 text-sm font-semibold text-navy shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur-md">
            <option value="">Select a method</option>
            <option>Call</option>
            <option>WhatsApp</option>
            <option>Email</option>
          </select>
        </label>
        <label className="block text-sm font-bold text-white sm:col-span-2">
          Your message (optional)
          <textarea name="message" rows={4} className="focus-ring mt-2 w-full rounded-xl border border-white/45 bg-white/45 px-3 py-3 text-sm font-semibold text-navy shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur-md" />
        </label>
      </div>
      <SubmitButton className="bg-champagne text-navy hover:bg-[#c9aa67]" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Send Request"}
      </SubmitButton>
      {status === "success" ? <p className="mt-3 text-sm font-semibold text-white">Thank you. Your request has been received. A member of the Sanaa Services team will follow up with you shortly.</p> : null}
      {status === "error" ? <p className="mt-3 text-sm font-semibold text-red-200">Please fill in all required fields before submitting.</p> : null}
      </div>
    </form>
  );
}

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="block text-sm font-bold text-white">
      {label}
      <input
        required={required}
        name={name}
        type={type}
        className="focus-ring mt-2 min-h-11 w-full rounded-xl border border-white/45 bg-white/45 px-3 text-sm font-semibold text-navy shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur-md"
      />
    </label>
  );
}
