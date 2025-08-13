# Deployment (GitHub Pages)

1. **Repository Settings → Pages**: Source = GitHub Actions.
2. **(Optional) Custom Domain**: Domain in Settings → Pages eintragen. Setze `CUSTOM_DOMAIN` in `.github/workflows/pages.yml` oder leer lassen.
3. **Secrets** (falls Supabase genutzt):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Commit & Push auf `main`. Der Workflow baut `apps/app` und deployed `/dist`.
5. SPA-Routing: `404.html` wird automatisch aus `index.html` erzeugt.
6. `env.js` wird nach dem Build erzeugt (Runtime-Keys, kein Rebuild nötig).
