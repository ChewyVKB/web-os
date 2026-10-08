# web-os

My portfolio, built as a small desktop OS in the browser with React, TypeScript and Vite.

**Live:** https://chewyvkb.github.io/web-os/

- Desktop icons open draggable windows (About Me, Previous Work, My Projects)
- macOS-style dock with magnification and social links
- Menu bar with a System Info panel and a calendar
- Phone-style home screen on small screens

## Development

```bash
npm install
npm run dev      # start the dev server
npm run lint     # eslint
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build locally
```

## Editing content

Almost everything you'd want to change lives in [`src/content.ts`](src/content.ts):
your name/title/location, bio, skills, work history and social links.
Windows (the "apps") are registered in [`src/apps/index.ts`](src/apps/index.ts).
The **My Projects** window loads your public GitHub repos automatically.

## Deployment

Every push to `main` is built and deployed to GitHub Pages by
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
One-time setup: in the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.
