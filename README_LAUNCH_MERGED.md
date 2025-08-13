# OptiSentry – Full Launch (Merged)

Dieses Archiv enthält dein Originalprojekt **plus** alle Dateien für einen sofortigen Test-Launch:
- GitHub Pages Workflow (Vite) – arbeitet im Ordner: `apps/app`
- Öffentliche Test-Seite: `apps/app/public/buy-test.html`
- Minimal-API für Stripe-Checkout: `services/minapi` (Render Free)
- Render Blueprint: `render_min.yaml`
- Frontend ENV Beispiel: `apps/app/.env.production.example`

## Quickstart (ohne Codeänderungen)
1) Repo pushen (dieses komplette Projekt).
2) GitHub → Settings → Pages → *GitHub Actions* aktivieren. Warten bis Deploy „✅“.
3) (Optional) GitHub Pages → Custom domain `optisentry.com` + **Enforce HTTPS**.
4) Render → New → „Blueprint from YAML“ → `render_min.yaml` importieren.
5) ENV in Render setzen (Stripe Test Keys/Prices).
6) Testen: `https://<deine-domain>/buy-test.html` → Button startet Stripe Checkout.

Viel Erfolg!
