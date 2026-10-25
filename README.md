# Dmytro Rudniev — Portfolio

Independent, responsive portfolio site for Dmytro Rudniev. It runs and builds separately from the parent application.

## Requirements

- Node.js 20.9 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

- `npm run dev` — start the local development server
- `npm run build` — create a production build
- `npm run start` — serve the production build
- `npm run lint` — lint the project
- `npm run typecheck` — check TypeScript types
- `npm run format` — format source files
- `npm run format:check` — check formatting without changing files

The site uses the Next.js App Router, React, TypeScript, CSS Modules, Framer Motion, and Lucide icons. The resume PDF is stored in `public/downloads/` and served by Next.js as a static asset.

## Typography

Manrope is used for the interface, headings, and body copy. Lora is reserved for short italic display accents. Both include Latin and Cyrillic subsets and are self-hosted at build time through `next/font`.
