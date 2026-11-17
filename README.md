# ByeByeLoan

Marketing website, consultation intake and admin dashboard for ByeByeLoan
(loan settlement and clearance assistance, Pakistan).

Next.js (App Router) · Tailwind CSS v4 · libSQL / Turso database · Nodemailer.

## Run

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

Production: `npm run build` then `npm start`, or deploy to Vercel (see below). Requires Node 20+.

## Configuration (`.env.local`)

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public URL (`https://byebyeloan.online`), used for canonical links, sitemap, robots and structured data |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_ADDRESS` | Contact details shown on the site. WhatsApp number in international format without `+` |
| `ADMIN_PASSWORD` | Password for `/admin` |
| `SESSION_SECRET` | 32+ character secret used to sign the admin session cookie |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM`, `MAIL_TO` | Email notifications. Leave `SMTP_HOST` empty to disable |
| `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN` | Hosted database (required on Vercel). Leave empty locally to use `data/loanclear.db` |
| `DATABASE_DIR` | Optional. Folder for the local database file (default `./data`) |

## Brand colours

All colours are defined once as design tokens in `src/app/globals.css` (`@theme`):
`navy`, `sky`, `sky-light`, `orange`, `orange-hover`, `surface`, `ink`, `muted`, `line`.
Use the Tailwind utilities (`bg-navy`, `text-sky`, …) and the shared classes
(`btn btn-primary`, `card`, `field`, `icon-tile`, …). Do not add hex values in components.

## Where things live

- `src/lib/content.ts` – services, steps, FAQs, articles
- `src/lib/legal.ts` – legal pages (draft; needs legal review before launch)
- `src/lib/site.ts` – site name, contact details, navigation
- `src/app/(site)` – public pages · `src/app/admin` – dashboard · `src/app/api` – form endpoints
- `data/loanclear.db` – local development database (created on first use). Production data lives in Turso.

## Before launch

- Replace the placeholder office address (WhatsApp number and email are set).
- Have the legal pages reviewed and add the registered business details.
- Set a strong `ADMIN_PASSWORD` and a fresh `SESSION_SECRET` on the server.
- Create the Turso database and set `TURSO_DATABASE_URL` / `TURSO_AUTH_TOKEN` before deploying.

## Deploying to Vercel

1. Push this project to GitHub and import it in Vercel (Add New → Project). Next.js is detected automatically.
2. Create the database: in Vercel open **Storage → Create Database → Turso** (Marketplace), or create one at turso.tech.
   Make sure the project has `TURSO_DATABASE_URL` (starts with `libsql://`) and `TURSO_AUTH_TOKEN`.
   Tables are created automatically on the first request.
3. Add the other environment variables in **Settings → Environment Variables**: `NEXT_PUBLIC_SITE_URL=https://byebyeloan.online`,
   a new `ADMIN_PASSWORD`, a new `SESSION_SECRET`, contact details and (optional) SMTP settings. Redeploy after changing them.
4. **Settings → Domains**: add `byebyeloan.online` and `www.byebyeloan.online`; make the apex primary and redirect www to it.
5. In GoDaddy **DNS → DNS Records**, set the records Vercel shows (usually A `@` → `76.76.21.21` and CNAME `www` → `cname.vercel-dns.com`).
   Leave MX and TXT records alone (they handle email) and turn off any GoDaddy forwarding.
6. After it is live, submit `https://byebyeloan.online/sitemap.xml` in Google Search Console.

Note: the form rate limiter is in memory, so on Vercel each server instance counts separately. That is fine for normal traffic.
