"use client";

import { useEffect } from "react";

type RequestSuccessModalProps = {
  requestId: string;
  whatsappHref: string;
  onClose: () => void;
};

export function RequestSuccessModal({ requestId, whatsappHref, onClose }: RequestSuccessModalProps) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center px-4 py-6" role="dialog" aria-modal="true" aria-labelledby="request-success-title">
      <button type="button" className="absolute inset-0 bg-navy/72 backdrop-blur-md" aria-label="Close confirmation" onClick={onClose} />
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/20 bg-white/15 p-5 text-white shadow-[0_28px_90px_rgba(0,0,0,0.38)] backdrop-blur-2xl sm:p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(214,184,124,0.28),transparent_18rem)]" aria-hidden="true" />
        <div className="relative">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-champagne">Request sent</p>
              <h2 id="request-success-title" className="mt-2 text-2xl font-bold text-white">Your request has been sent.</h2>
            </div>
            <button type="button" className="focus-ring rounded-full border border-white/30 px-3 py-1 text-sm font-bold text-white transition hover:border-champagne hover:text-champagne" onClick={onClose}>
              x
            </button>
          </div>

          <div className="mt-5 rounded-2xl border border-champagne/40 bg-navy/40 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/65">Request ID</p>
            <p className="mt-1 text-xl font-black tracking-[0.08em] text-champagne">{requestId}</p>
          </div>

          <p className="mt-4 text-sm leading-6 text-white/78">
            Our team received your request by email. You can also send the same details on WhatsApp with this request ID, if that is easier for you.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex min-h-11 items-center justify-center rounded-full bg-whatsapp px-5 py-3 text-sm font-bold text-navy transition hover:bg-[#20be5b]"
            >
              Send on WhatsApp
            </a>
            <button
              type="button"
              className="focus-ring inline-flex min-h-11 items-center justify-center rounded-full border border-white/35 px-5 py-3 text-sm font-bold text-white transition hover:border-champagne hover:text-champagne"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
