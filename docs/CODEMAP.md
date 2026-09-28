# ALPHA Marketing code map

## Entry points
- `src/app/page.tsx` — marketing home route.
- `src/components/landing-page.tsx` — main landing-page composition.
- `src/app/layout.tsx` — root layout.
- `src/app/globals.css` — central styling and responsive/theme behavior.

## Main visual sections
- `src/components/dashboard-preview.tsx` — product/dashboard presentation.
- `src/components/device-showcase.tsx` — device/mobile product presentation.
- `src/components/audience-showcase.tsx` — audience/use-case presentation.
- `src/components/logo.tsx` — ALPHA branding.
- `src/components/theme-toggle.tsx` — Dark/Light control.
- `src/components/back-to-top.tsx`.

## Leads/contact
- `src/components/contact-modal.tsx`.
- `src/components/lead-form.tsx`.
- `src/app/api/leads/route.ts`.
- `src/lib/leads.ts`.

## Accessibility and legal
- `src/components/accessibility-widget.tsx`.
- `src/app/accessibility/page.tsx`.
- `src/app/privacy/page.tsx`.
- `src/app/terms/page.tsx`.
- `src/components/legal-shell.tsx`.

## CI
- `.github/workflows/ci.yml` runs lint, typecheck and build on Node 22.
