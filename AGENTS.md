# ALPHA Marketing agent guide

## Purpose
This repository is the public ALPHA marketing site. It is a Next.js 16 App Router application focused on product presentation, lead capture, responsive design, accessibility and Dark/Light presentation.

## Before changing code
1. Read `docs/CODEMAP.md` and the affected components.
2. Preserve the existing visual language and motion unless the request intentionally changes it.
3. Check desktop and mobile behavior together; avoid desktop-only fixes.
4. Keep legal/accessibility routes and lead submission behavior intact.

## UI rules
- Hebrew/RTL is the primary experience.
- Maintain Dark/Light compatibility.
- Reuse existing components for logo, theme, contact modal and lead form rather than duplicating them.
- Visual sections may be animated, but accessibility and reduced-motion usability must not be sacrificed.
- Treat `src/app/globals.css` as the central styling layer; inspect existing selectors before adding overrides.

## Lead flow
- UI: `src/components/contact-modal.tsx` and `lead-form.tsx`.
- Route: `src/app/api/leads/route.ts`.
- Delivery/business logic: `src/lib/leads.ts`.
When changing this flow, verify both successful submission UX and server failure handling.

## Verification
Before considering a broad change complete run:
```bash
npm run verify
```
Do not claim a build passed unless it was actually run or CI confirms it.

## Documentation
Update `docs/CODEMAP.md` when major sections/components move or new subsystems are introduced.
