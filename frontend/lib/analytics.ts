export type AnalyticsEvent =
  | "cta_click"
  | "call_click"
  | "whatsapp_click"
  | "form_start"
  | "form_submit"
  | "form_error"
  | "upload_start"
  | "upload_success"
  | "faq_open"
  | "service_card_click";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackEvent(event: AnalyticsEvent, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
}
