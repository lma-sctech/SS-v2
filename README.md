# Sanaa Services

Premium frontend and contact API for Sanaa Services.

## Architecture

```txt
frontend/  Next.js static website
backend/   Node.js + Express contact API
```

Production domain:

```txt
Frontend: https://www.sanaaservices.com
Backend API: https://api.sanaaservices.com/api/contact
Mailbox: contact@sanaaservices.com
```

The API URL is the public address of the Express backend route that receives form submissions. It is different from the email address. The email address is used by SMTP/Nodemailer to send and receive messages.

## Local Setup

Install dependencies:

```bash
npm --prefix frontend install
npm --prefix backend install
```

Create backend environment variables:

```bash
copy backend\.env.example backend\.env
```

Configure `backend/.env`:

```txt
PORT=4000
FRONTEND_URL=http://localhost:3000,http://127.0.0.1:3000,https://www.sanaaservices.com,https://sanaaservices.com
CONTACT_RATE_LIMIT_WINDOW_MS=900000
CONTACT_RATE_LIMIT_MAX=10

SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=contact@sanaaservices.com
SMTP_PASS=your-smtp-password

MAIL_FROM="Sanaa Services <contact@sanaaservices.com>"
MAIL_TO=contact@sanaaservices.com
```

Create frontend environment variables:

```bash
copy frontend\.env.example frontend\.env.local
```

For local testing, configure `frontend/.env.local`:

```txt
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_BASE_PATH=/
NEXT_PUBLIC_CONTACT_API_URL=http://localhost:4000/api/contact
```

Run both apps:

```bash
npm --prefix backend run dev
npm --prefix frontend run dev
```

Open:

```txt
http://localhost:3000
```

## Contact API

Endpoint:

```txt
POST /api/contact
```

Expected JSON fields:

```json
{
  "name": "Full name",
  "phone": "Phone number",
  "email": "Email address",
  "service": "Travel request",
  "contactMethod": "WhatsApp",
  "travelPurpose": "World Cup 2026",
  "departureCity": "New York",
  "destination": "Miami",
  "destinationCity": "Miami",
  "date": "June 10-18, 2026",
  "travelDates": "June 10-18, 2026",
  "travelers": "2",
  "needFlight": "Yes",
  "needHotel": "Yes",
  "needInsurance": "Not sure",
  "needDocuments": "No",
  "budget": "$1,500-$2,500",
  "message": "Additional details"
}
```

Success response:

```json
{
  "success": true,
  "requestId": "SS-20260611-A7K4",
  "message": "Contact request sent successfully."
}
```

Error response:

```json
{
  "success": false,
  "error": "Missing required field: phone."
}
```

## cPanel Frontend Deployment

The repository includes `.cpanel.yml` at the root. cPanel Git Deployment requires this file in the top-level directory and runs the listed deployment commands.

The current deployment file:

- builds `frontend/` as a static Next.js export;
- uses `NEXT_PUBLIC_BASE_PATH=/`;
- uses `NEXT_PUBLIC_SITE_URL=https://www.sanaaservices.com`;
- uses `NEXT_PUBLIC_CONTACT_API_URL=https://api.sanaaservices.com/api/contact`;
- copies `frontend/out/` into `$HOME/public_html/`.

Recommended flow:

1. In cPanel, open Git Version Control.
2. Clone or connect this GitHub repository.
3. Use pull deployment from GitHub.
4. Click Update from Remote.
5. Click Deploy HEAD Commit.

## cPanel Backend Deployment

Deploy `backend/` as a Node.js application in cPanel, ideally on:

```txt
https://api.sanaaservices.com
```

Recommended cPanel Node app settings:

```txt
Application root: backend
Application startup file: server.js
Node version: 20
Start command: npm start
```

Required backend environment variables:

```txt
NODE_ENV=production
PORT=4000
FRONTEND_URL=https://www.sanaaservices.com,https://sanaaservices.com
CONTACT_RATE_LIMIT_WINDOW_MS=900000
CONTACT_RATE_LIMIT_MAX=10

SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=contact@sanaaservices.com
SMTP_PASS=your-smtp-password

MAIL_FROM="Sanaa Services <contact@sanaaservices.com>"
MAIL_TO=contact@sanaaservices.com
```

If cPanel gives the Node app a different public URL, update `NEXT_PUBLIC_CONTACT_API_URL` in `.cpanel.yml` before deploying the frontend.

## Useful Commands

```bash
npm run lint
npm run build
npm run build:pages
npm run audit:assets
npm run perf:budget
```

Backend:

```bash
npm --prefix backend run dev
npm --prefix backend start
```

## Notes

- SMTP credentials are only used by the backend.
- Never expose SMTP credentials in `frontend/.env.local`.
- The backend creates a request ID and includes it in the email and API response.
- The frontend shows a confirmation modal after the email is sent. WhatsApp is optional and uses the same request ID.
- CORS is restricted by `FRONTEND_URL`.
- `/api/contact` is rate-limited to 10 requests per IP by default.
- Current video assets are intentionally kept because they are part of the site identity; the performance budget may still flag the hero video size.
