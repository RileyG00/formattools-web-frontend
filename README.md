# Data Formatters

A free, browser-based developer toolbox: formatters, escapers/encoders, converters, ciphers, random number generators, and string/number generators.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack), React 19, TypeScript
- [HeroUI v3](https://heroui.com) (`@heroui/react` + `@heroui/styles`) for all UI components
- [Tailwind CSS v4](https://tailwindcss.com) for styling
- [`next-themes`](https://github.com/pacocoursey/next-themes) for light/dark mode
- Deployed on Netlify via [`@netlify/plugin-nextjs`](https://github.com/opennextjs/opennextjs-netlify)

## Development

```bash
npm install
npm run dev
```

The app runs at http://localhost:3000.

| Script              | Description                      |
| ------------------- | -------------------------------- |
| `npm run dev`       | Start the dev server (Turbopack) |
| `npm run build`     | Production build                 |
| `npm run start`     | Serve the production build       |
| `npm run lint`      | Lint with ESLint                 |
| `npm run typecheck` | Type-check with TypeScript       |

## Project layout

```
src/
  app/                  App Router routes
    (features)/         Category + tool pages (share the sidebar layout)
    layout.tsx          Root layout: theme, router + toast providers, navbar, analytics
    sitemap.ts          Generated from src/config/features.ts
    robots.ts
  components/
    common/             Icons, syntax highlighter, small buttons
    features/           Tool implementations and shared tool building blocks
    layout/             Navbar, theme switch, navigation list, hero
  config/               Feature registry (routes, names, descriptions) and env
  hooks/, layouts/, types/, utils/
```

### Adding a tool

1. Add its sub-route and `FeatureOptionItem` in `src/config/features.ts`, and list it in the category's `items`.
2. Build the component in `src/components/features/<category>/`.
3. Add `src/app/(features)/<category>/<sub-route>/page.tsx` exporting `metadata` via `buildFeatureItemMetadata`.

Navigation, the sidebar, the category page, and the sitemap pick up the new entry automatically.

## Environment

Public settings live in `.env` (all `NEXT_PUBLIC_*`): app name, page title prefix, site URL (used for canonical URLs and the sitemap), the Google Analytics measurement ID, and the Chrome extension link.

## Deployment

`netlify.toml` builds with `npm run build` and uses the Netlify Next.js plugin.
