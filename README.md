# Frontend Static

Vite + React static portfolio site.

## Local dev

```bash
pnpm install
pnpm dev
```

## Build static dist

```bash
pnpm build
```

Build output goes to `dist/`.

## Docker flow

Image does not build app inside container.

1. Build static files on local machine.
2. Build nginx image from prebuilt `dist/`.

```bash
pnpm build
docker build -t frontend-static .
docker run --rm -p 3000:3000 frontend-static
```

## Deploy notes

- `nginx.conf` serves SPA with `try_files`.
- `/projects/smartqr` redirects to `https://smart-secure-qrcode.netlify.app` and keeps child path + query params.
- Container uses unprivileged nginx and copies only `dist/` plus nginx config.
