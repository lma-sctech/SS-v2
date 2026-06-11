export type ContactPayload = Record<string, string>;

type ContactApiResponse = {
  success: boolean;
  requestId?: string;
  message?: string;
  error?: string;
};

const defaultContactApiUrl = process.env.NODE_ENV === "development" ? "http://localhost:4000/api/contact" : "";

export async function submitContactRequest(payload: ContactPayload) {
  const endpoint = process.env.NEXT_PUBLIC_CONTACT_API_URL || defaultContactApiUrl;

  if (!endpoint) {
    throw new Error("Contact API is not configured yet.");
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const body = (await response.json().catch(() => null)) as ContactApiResponse | null;

  if (!response.ok || !body?.success) {
    throw new Error(body?.error || "Unable to send the request.");
  }

  return body;
}

export function formDataToPayload(formData: FormData, extra: ContactPayload = {}) {
  const payload: ContactPayload = { ...extra };

  formData.forEach((value, key) => {
    if (typeof value !== "string") return;
    payload[key] = value.trim();
  });

  return payload;
}

export function buildWhatsAppMessage(subject: string, payload: ContactPayload) {
  const lines = [
    "Hello Sanaa Services,",
    "",
    "I just submitted a request on your website.",
    "",
  ];

  if (payload.requestId) {
    lines.push(`Request ID: ${payload.requestId}`, "");
  }

  lines.push(`Service: ${subject}`);

  Object.entries(payload).forEach(([key, value]) => {
    if (["company", "formType", "requestId", "service"].includes(key) || !value.trim()) return;
    lines.push(`${formatLabel(key)}: ${value.trim()}`);
  });

  return lines.join("\n");
}

function formatLabel(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/^./, (letter) => letter.toUpperCase());
}
