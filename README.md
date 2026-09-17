# Developer Toolkit

Fast, free and privacy-friendly utilities for developers. Next.js (App Router) + TypeScript + Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

## Structure

```
app/                    routes (App Router)
components/ui/          design system primitives
components/layout/      Header, Footer, SearchBar
components/home/        homepage-specific components
components/theme/       dark/light theme toggle
lib/                    data access + utilities
data/                   tools.ts, categories.ts — single source of truth
types/                  Tool, Category, Guide interfaces
```

Adding a tool means adding an entry to `data/tools.ts` — no other file needs to change for it to show up across the site (homepage, category page, search, sitemap).

## Principles

- Tool logic lives in `lib/tools/*` as pure, framework-agnostic functions, separate from UI.
- Every tool that can run entirely in the browser does — no data leaves the client unless a tool says so explicitly.
- SEO metadata (title, description, OG) is generated per-page from the data model, not hardcoded.
