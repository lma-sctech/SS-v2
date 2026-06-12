import html
import os
import re
import secrets
import smtplib
import ssl
import time
from collections import defaultdict, deque
from datetime import datetime, timezone
from email.message import EmailMessage

from flask import Flask, jsonify, make_response, request


def load_env_file(path=".env"):
    if not os.path.exists(path):
        return

    with open(path, "r", encoding="utf-8") as env_file:
        for line in env_file:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue

            key, value = line.split("=", 1)
            os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


load_env_file()

app = Flask(__name__)

ALLOWED_ORIGINS = parse_csv(os.environ.get("FRONTEND_URL", "http://localhost:3000"))
RATE_LIMIT_WINDOW = int(os.environ.get("CONTACT_RATE_LIMIT_WINDOW_MS", "900000")) / 1000
RATE_LIMIT_MAX = int(os.environ.get("CONTACT_RATE_LIMIT_MAX", "10"))
RATE_BUCKETS = defaultdict(deque)

ALLOWED_FIELDS = [
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
]


@app.after_request
def add_cors_headers(response):
    origin = request.headers.get("Origin")

    if origin and origin in ALLOWED_ORIGINS:
        response.headers["Access-Control-Allow-Origin"] = origin
        response.headers["Vary"] = "Origin"

    response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    return response


@app.get("/")
def root():
    return jsonify({"success": True, "service": "Sanaa Services contact API"})


@app.get("/health")
def health():
    return jsonify({"success": True, "status": "ok"})


@app.route("/api/contact", methods=["OPTIONS"])
def contact_options():
    return make_response("", 204)


@app.post("/api/contact")
def contact():
    origin = request.headers.get("Origin")
    if origin and origin not in ALLOWED_ORIGINS:
        return jsonify({"success": False, "error": "Origin not allowed."}), 403

    client_ip = get_client_ip()
    if is_rate_limited(client_ip):
        return (
            jsonify(
                {
                    "success": False,
                    "error": "Too many requests. Please wait a moment before sending another request.",
                }
            ),
            429,
        )

    payload = normalize_payload(request.get_json(silent=True) or {})

    if payload.get("company"):
        return jsonify({"success": False, "error": "Invalid request."}), 400

    errors = validate_payload(payload)
    if errors:
        return jsonify({"success": False, "error": " ".join(errors)}), 400

    try:
        request_id = create_request_id()
        payload["requestId"] = request_id
        send_contact_email(payload)
        return jsonify(
            {
                "success": True,
                "requestId": request_id,
                "message": "Contact request sent successfully.",
            }
        )
    except Exception as error:
        app.logger.exception("Contact API error: %s", error)
        return (
            jsonify(
                {
                    "success": False,
                    "error": "We could not send your request right now. Please try again or contact us on WhatsApp.",
                }
            ),
            500,
        )


def parse_csv(value):
    return [item.strip() for item in str(value or "").split(",") if item.strip()]


def get_client_ip():
    forwarded_for = request.headers.get("X-Forwarded-For", "")
    if forwarded_for:
        return forwarded_for.split(",")[0].strip()

    return request.remote_addr or "unknown"


def is_rate_limited(client_ip):
    now = time.time()
    bucket = RATE_BUCKETS[client_ip]

    while bucket and bucket[0] <= now - RATE_LIMIT_WINDOW:
        bucket.popleft()

    if len(bucket) >= RATE_LIMIT_MAX:
        return True

    bucket.append(now)
    return False


def normalize_payload(body):
    safe_body = body if isinstance(body, dict) else {}
    return {field: clean_text(safe_body.get(field, "")) for field in ALLOWED_FIELDS}


def clean_text(value):
    if not isinstance(value, (str, int, float)):
        return ""

    text = str(value)
    text = re.sub(r"[<>]", "", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text[:1500]


def validate_payload(payload):
    errors = []

    if not payload.get("name"):
        errors.append("Full name is required.")

    if not payload.get("phone") and not payload.get("email"):
        errors.append("Please provide a phone number or an email address.")

    if payload.get("email") and not is_valid_email(payload["email"]):
        errors.append("Please provide a valid email address.")

    if not payload.get("contactMethod"):
        errors.append("Preferred contact method is required.")

    if not payload.get("service") and not payload.get("travelPurpose"):
        errors.append("Service or travel purpose is required.")

    if not payload.get("message") and not payload.get("additionalDetails"):
        errors.append("Please add a short message about what you need.")

    return errors


def is_valid_email(email):
    return re.match(r"^[^\s@]+@[^\s@]+\.[^\s@]+$", email) is not None


def create_request_id():
    date_part = datetime.now(timezone.utc).strftime("%Y%m%d")
    token = secrets.token_hex(2).upper()
    return f"SS-{date_part}-{token}"


def send_contact_email(payload):
    required_env = ["SMTP_HOST", "SMTP_USER", "SMTP_PASS", "MAIL_TO"]
    missing = [key for key in required_env if not os.environ.get(key)]
    if missing:
        raise RuntimeError(f"Missing SMTP configuration: {', '.join(missing)}")

    subject_label = payload.get("service") or payload.get("travelPurpose") or "Travel request"
    message = EmailMessage()
    message["From"] = os.environ.get("MAIL_FROM") or os.environ["SMTP_USER"]
    message["To"] = os.environ["MAIL_TO"]
    message["Subject"] = f"[{payload['requestId']}] New contact request - {subject_label}"

    if payload.get("email"):
        message["Reply-To"] = payload["email"]

    text_body = "\n".join(
        [
            f"New Sanaa Services request: {subject_label}",
            f"Request ID: {payload['requestId']}",
            "",
            *format_payload_lines(payload),
        ]
    )

    message.set_content(text_body)
    message.add_alternative(build_email_html(subject_label, payload), subtype="html")

    smtp_host = os.environ["SMTP_HOST"]
    smtp_port = int(os.environ.get("SMTP_PORT", "587"))
    smtp_secure = os.environ.get("SMTP_SECURE", "false").lower() == "true"
    smtp_starttls = os.environ.get("SMTP_STARTTLS", "true").lower() != "false"
    context = ssl.create_default_context()

    if smtp_secure:
        server = smtplib.SMTP_SSL(smtp_host, smtp_port, context=context, timeout=30)
    else:
        server = smtplib.SMTP(smtp_host, smtp_port, timeout=30)

    with server:
        server.ehlo()
        if not smtp_secure and smtp_starttls:
            server.starttls(context=context)
            server.ehlo()

        server.login(os.environ["SMTP_USER"], os.environ["SMTP_PASS"])
        server.send_message(message)


def format_payload_lines(payload):
    fields = [
        ("Request ID", payload.get("requestId")),
        ("Full name", payload.get("name")),
        ("Phone number", payload.get("phone")),
        ("Email address", payload.get("email")),
        ("Preferred contact method", payload.get("contactMethod")),
        ("Service", payload.get("service")),
        ("Travel purpose", payload.get("travelPurpose")),
        ("Departure city", payload.get("departureCity")),
        ("Destination city", payload.get("destinationCity") or payload.get("destination")),
        ("Travel dates", payload.get("travelDates") or payload.get("date") or payload.get("preferredDate")),
        ("Number of travelers", payload.get("travelers")),
        ("Need flight?", payload.get("needFlight")),
        ("Need hotel?", payload.get("needHotel")),
        ("Need insurance?", payload.get("needInsurance")),
        ("Need documents, translation or visa support?", payload.get("needDocuments")),
        ("Budget range", payload.get("budget")),
        ("Service details", payload.get("serviceDetails")),
        ("Message", payload.get("message") or payload.get("additionalDetails")),
    ]

    return [f"{label}: {value}" for label, value in fields if value]


def build_email_html(subject_label, payload):
    rows = []
    for line in format_payload_lines(payload):
        label, _, value = line.partition(": ")
        rows.append(
            "<tr>"
            f'<th align="left" style="padding:10px;border-bottom:1px solid #e5e7eb;color:#0f172a;">{html.escape(label)}</th>'
            f'<td style="padding:10px;border-bottom:1px solid #e5e7eb;color:#334155;">{html.escape(value)}</td>'
            "</tr>"
        )

    return (
        '<div style="font-family:Arial,sans-serif;background:#f8fafc;padding:24px;">'
        '<div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;">'
        '<div style="background:#0f1b3d;color:#ffffff;padding:24px;">'
        '<p style="margin:0;color:#d6b87c;font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:12px;">Sanaa Services</p>'
        f'<h1 style="margin:8px 0 0;font-size:24px;">New request: {html.escape(subject_label)}</h1>'
        f'<p style="margin:8px 0 0;color:#cbd5e1;">Request ID: {html.escape(payload["requestId"])}</p>'
        "</div>"
        '<table style="width:100%;border-collapse:collapse;font-size:14px;">'
        f'{"".join(rows)}'
        "</table>"
        "</div>"
        "</div>"
    )
