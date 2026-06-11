# Sanaa Services

Premium website and contact API for Sanaa Services.

## Architecture

```txt
frontend/  Next.js static website
backend/   Node.js + Express contact API
```

The frontend can still be deployed to GitHub Pages. The backend must be deployed on a Node-capable host such as Render, Railway, Fly.io, a VPS, or any platform that can run an Express server.

## Local Setup

Install frontend dependencies:

```bash
cd frontend
npm install
```

Install backend dependencies:

```bash
cd backend
npm install
```

Create backend environment variables:

```bash
cd backend
copy .env.example .env
```

Configure `backend/.env`:

```txt
PORT=4000
FRONTEND_URL=http://localhost:3000,http://127.0.0.1:3000

SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password

MAIL_FROM="Sanaa Services <no-reply@sanaaservices.com>"
MAIL_TO=hello@sanaaservices.com
```

Create frontend environment variables:

```bash
cd frontend
copy .env.example .env.local
```

Configure `frontend/.env.local`:

```txt
NEXT_PUBLIC_CONTACT_API_URL=http://localhost:4000/api/contact
```

Run the backend:

```bash
npm --prefix backend run dev
```

Run the frontend:

```bash
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

## Backend Deployment

GitHub Pages cannot run the backend. Deploy `backend/` separately.

Generic deployment settings:

- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Node version: `20`

Required environment variables:

```txt
PORT=4000
FRONTEND_URL=https://lma-sctech.github.io
CONTACT_RATE_LIMIT_WINDOW_MS=900000
CONTACT_RATE_LIMIT_MAX=10
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
MAIL_FROM="Sanaa Services <no-reply@sanaaservices.com>"
MAIL_TO=hello@sanaaservices.com
```

If your frontend uses a custom domain, set `FRONTEND_URL` to that origin instead. You can use a comma-separated list when several origins must be allowed, for example local `localhost` and `127.0.0.1`.

```txt
FRONTEND_URL=https://sanaaservices.com
```

## Frontend Deployment

The GitHub Pages workflow lives in `.github/workflows/deploy.yml` and builds from `frontend/`.

Before production, set this GitHub repository variable:

```txt
NEXT_PUBLIC_CONTACT_API_URL=https://your-backend-domain.com/api/contact
```

Then push to `main`, or run the workflow manually.

Static export:

```bash
npm --prefix frontend run build:pages
```

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
