# Deployment (GitHub Pages)

1. **Repository Settings → Pages**: Source = GitHub Actions.
2. **(Optional) Custom Domain**: Add your domain in Settings → Pages. Then set `CUSTOM_DOMAIN` in `.github/workflows/pages.yml` or leave it empty.
3. **Secrets** (if you use Supabase):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Commit & push to `main`. The workflow builds `apps/app` and deploys `/dist`.
5. SPA routing is handled by `404.html` → `index.html` copy.

**We also ship `env.js` at runtime** so you can rotate keys without rebuilds.
