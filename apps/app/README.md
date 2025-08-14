# OptiSentry Dashboard

This is the front‑end dashboard of **OptiSentry**, a modern platform for privacy, security and compliance. It is built with [Vite](https://vitejs.dev), [React](https://reactjs.org), [TypeScript](https://www.typescriptlang.org) and [Tailwind CSS](https://tailwindcss.com).

## Development

To work on the dashboard locally you need Node.js (v18 or newer) and npm installed.

```bash
# install dependencies
npm install

# start the development server with hot reloading
npm run dev

# build for production into the `dist/` directory
npm run build

# preview the built application
npm run preview
```

## Deployment

The application is a static single page app (SPA) that can be hosted on any static hosting platform such as GitHub Pages, Vercel, Netlify or an S3 bucket. When deploying to GitHub Pages ensure that you:

1. Set `base: './'` in `vite.config.ts` so that assets are resolved correctly when served from a sub‑path.
2. Provide a `404.html` alongside `index.html` to act as an SPA fallback. This repository already includes a suitable `404.html`.
3. If you rely on runtime environment variables (e.g. Supabase keys), include an `env.js` file in the `dist/` folder at deploy time.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.