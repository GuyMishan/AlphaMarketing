# AlphaMarketing

Marketing website for ALPHA – תפעול פנסיוני.

## Central legal document

The public `/legal` page reads the current effective legal document from AlphaBACKEND. Configure the **server-side** `ALPHA_API_URL` to the backend HTTPS origin in the deployment environment (do not use `NEXT_PUBLIC_`). The page renders an unavailable state when the backend has no approved published document. The legacy `/terms` and `/privacy` routes redirect to `/legal`; accessibility remains an independent operational declaration until its approved text is incorporated into the central document.
