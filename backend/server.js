const crypto = require("node:crypto");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const rateLimit = require("express-rate-limit");
const nodemailer = require("nodemailer");

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 4000);
const allowedOrigins = parseAllowedOrigins(process.env.FRONTEND_URL);
const contactRateLimit = rateLimit({
  windowMs: Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000),
  limit: Number(process.env.CONTACT_RATE_LIMIT_MAX || 10),
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many requests. Please wait a moment before sending another request.",
  },
});

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    methods: ["POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.use(express.json({ limit: "32kb" }));

app.get("/health", (_request, response) => {
  response.json({ success: true, status: "ok" });
});

app.post("/api/contact", contactRateLimit, async (request, response) => {
  try {
    const payload = normalizePayload(request.body);

    if (payload.company) {
      response.status(400).json({ success: false, error: "Invalid request." });
      return;
    }

    const validationErrors = validateContactPayload(payload);
    if (validationErrors.length > 0) {
      response.status(400).json({
        success: false,
        error: validationErrors.join(" "),
      });
      return;
    }

    const requestId = createRequestId();
    const requestPayload = { ...payload, requestId };

    const transporter = createTransporter();
    const mail = buildContactEmail(requestPayload);

    await transporter.sendMail(mail);

    response.json({
      success: true,
      requestId,
      message: "Contact request sent successfully.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    response.status(500).json({
      success: false,
      error: "We could not send your request right now. Please try again or contact us on WhatsApp.",
    });
  }
});

app.use((error, _request, response, _next) => {
  if (error && error.message === "Not allowed by CORS") {
    response.status(403).json({ success: false, error: "Origin not allowed." });
    return;
  }

  if (error instanceof SyntaxError && "body" in error) {
    response.status(400).json({ success: false, error: "Invalid JSON payload." });
    return;
  }

  response.status(500).json({ success: false, error: "Server error." });
});

app.listen(port, () => {
  console.log(`Sanaa Services contact API running on port ${port}`);
});

function parseAllowedOrigins(value) {
  return String(value || "http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function normalizePayload(body) {
  const safeBody = body && typeof body === "object" ? body : {};
  const allowedFields = [
    "company",
    "formType",
    "name",
    "phone",
    "email",
    "service",
    "contactMethod",
    "travelPurpose",
    "departureCity",
    "destination",
    "destinationCity",
    "date",
    "travelDates",
    "travelers",
    "needFlight",
    "needHotel",
    "needInsurance",
    "needDocuments",
    "budget",
    "preferredDate",
    "message",
    "additionalDetails",
    "serviceDetails",
    "requestId",
  ];

  return allowedFields.reduce((payload, field) => {
    payload[field] = cleanText(safeBody[field]);
    return payload;
  }, {});
}

function cleanText(value) {
  if (typeof value !== "string" && typeof value !== "number") {
    return "";
  }

  return String(value)
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 1500);
}

function validateContactPayload(payload) {
  const errors = [];

  if (!payload.name) {
    errors.push("Full name is required.");
  }

  if (!payload.phone && !payload.email) {
    errors.push("Please provide a phone number or an email address.");
  }

  if (payload.email && !isValidEmail(payload.email)) {
    errors.push("Please provide a valid email address.");
  }

  if (!payload.contactMethod) {
    errors.push("Preferred contact method is required.");
  }

  if (!payload.service && !payload.travelPurpose) {
    errors.push("Service or travel purpose is required.");
  }

  if (!payload.message && !payload.additionalDetails) {
    errors.push("Please add a short message about what you need.");
  }

  return errors;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function createTransporter() {
  const requiredEnv = ["SMTP_HOST", "SMTP_USER", "SMTP_PASS", "MAIL_TO"];
  const missing = requiredEnv.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing SMTP configuration: ${missing.join(", ")}`);
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function buildContactEmail(payload) {
  const subjectLabel = payload.service || payload.travelPurpose || "Travel request";
  const lines = [
    `New Sanaa Services request: ${subjectLabel}`,
    `Request ID: ${payload.requestId}`,
    "",
    ...formatPayloadLines(payload),
  ];

  return {
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    to: process.env.MAIL_TO,
    replyTo: payload.email || undefined,
    subject: `[${payload.requestId}] New contact request - ${subjectLabel}`,
    text: lines.join("\n"),
    html: buildEmailHtml(subjectLabel, payload),
  };
}

function formatPayloadLines(payload) {
  return [
    ["Request ID", payload.requestId],
    ["Full name", payload.name],
    ["Phone number", payload.phone],
    ["Email address", payload.email],
    ["Preferred contact method", payload.contactMethod],
    ["Service", payload.service],
    ["Travel purpose", payload.travelPurpose],
    ["Departure city", payload.departureCity],
    ["Destination city", payload.destinationCity || payload.destination],
    ["Travel dates", payload.travelDates || payload.date || payload.preferredDate],
    ["Number of travelers", payload.travelers],
    ["Need flight?", payload.needFlight],
    ["Need hotel?", payload.needHotel],
    ["Need insurance?", payload.needInsurance],
    ["Need documents, translation or visa support?", payload.needDocuments],
    ["Budget range", payload.budget],
    ["Service details", payload.serviceDetails],
    ["Message", payload.message || payload.additionalDetails],
  ]
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`);
}

function buildEmailHtml(subjectLabel, payload) {
  const rows = formatPayloadLines(payload)
    .map((line) => {
      const [label, ...valueParts] = line.split(": ");
      const value = valueParts.join(": ");
      return `<tr><th align="left" style="padding:10px;border-bottom:1px solid #e5e7eb;color:#0f172a;">${escapeHtml(label)}</th><td style="padding:10px;border-bottom:1px solid #e5e7eb;color:#334155;">${escapeHtml(value)}</td></tr>`;
    })
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#0f172a;">
      <h1 style="font-size:22px;">New Sanaa Services request</h1>
      <p style="color:#475569;">${escapeHtml(subjectLabel)}</p>
      <p style="display:inline-block;padding:8px 12px;border-radius:999px;background:#0f172a;color:#f8fafc;font-weight:700;">Request ID: ${escapeHtml(payload.requestId)}</p>
      <table cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;">${rows}</table>
    </div>
  `;
}

function createRequestId() {
  const date = new Date();
  const stamp = date.toISOString().slice(0, 10).replace(/-/g, "");
  const token = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `SS-${stamp}-${token}`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
