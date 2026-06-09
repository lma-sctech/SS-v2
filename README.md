# Sanaa Services

Premium, mobile-first website for Sanaa Services clients across the United States.

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS
- Vercel-ready App Router structure

## Placeholder Business Details

- Phone / WhatsApp: +1 718-626-0236
- Email: hello@sanaaservices.com
- Address: 2525 Steinway Street, Astoria, NY 11103
- Hours: Mon-Sat, 9:00 AM - 6:00 PM
- Languages: English, French, Arabic
- Service area: Based in Astoria, NY · Serving clients across the United States

## Routes

- `/`
- `/services`
- `/services/notary`
- `/services/legal-consultancy`
- `/services/insurance`
- `/services/translation`
- `/services/driving-school`
- `/services/visa-immigration`
- `/services/travel`
- `/about`
- `/reviews`
- `/faq`
- `/contact`
- `/privacy`

## Development

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Start production build:

```bash
npm run start
```

Static export for GitHub Pages:

```bash
npm run build:pages
```

The GitHub Pages workflow lives in `.github/workflows/deploy.yml`.

For the `lma-sctech/SS-v2` repository, the published URL is:

```txt
https://lma-sctech.github.io/SS-v2
```

In GitHub, publish with:

1. Open `Settings > Pages`.
2. Set `Build and deployment > Source` to `GitHub Actions`.
3. Push to `main`, or run the `Deploy to GitHub Pages` workflow manually.

The workflow uses Git LFS for `.mp4` files and creates `out/.nojekyll` automatically.

## Content

Core editable content lives in:

- `data/site.ts`
- `data/services.ts`
- `data/faq.ts`
- `data/testimonials.ts`

Media assets used by the website live in:

- `public/img`
- `public/vid`

## Forms

The current form layer includes:

- required field validation
- simulated loading and success states
- honeypot field
- GTM-ready dataLayer event hooks
- upload UI for Translation and Visa & Immigration

No form data or files are sent anywhere yet.

Future providers can be connected in:

- `components/forms/QuickLeadForm.tsx`
- `components/forms/ServiceLeadForm.tsx`
- `components/forms/UploadField.tsx`

## Analytics

Prepared events:

- `cta_click`
- `call_click`
- `whatsapp_click`
- `form_start`
- `form_submit`
- `form_error`
- `upload_start`
- `upload_success`
- `faq_open`
- `service_card_click`

Event helper:

- `lib/analytics.ts`

## Google Reviews

The reviews section can use Google Places API when these environment variables are configured:

```bash
GOOGLE_PLACES_API_KEY=
GOOGLE_PLACES_TEXT_QUERY="Sanaa Services 2525 Steinway Street Astoria NY"
GOOGLE_REVIEWS_URL="https://www.google.com/search?q=sanaaservices#lrd=0x89c25f402a398c2d:0x20cbdb6005b7476c,1,,,,"
```

Without an API key, the site falls back to local reviews in `data/testimonials.ts`.

## SEO

The app includes:

- route metadata
- canonical URLs
- Open Graph/Twitter metadata
- `robots.ts`
- `sitemap.ts`
- LocalBusiness JSON-LD

Update the production URL in `data/site.ts` before launch.

## Production Checklist

- Add real brand photography or approved premium assets
- Choose a real form provider
- Choose a secure upload provider before accepting files
- Configure GA4/GTM consent behavior
- Add Sentry DSN if needed
- Run Lighthouse audits on preview and production
- Submit sitemap in Google Search Console
