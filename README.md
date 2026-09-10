# mtilabs-ui-kit

`@mtilabs/ui` is a modern, accessible, highly customizable Angular UI component library, built with standalone components, signals, and Angular CDK.

> **Status:** pre-release / under active development. The workspace, design-token architecture, and tooling are being built out incrementally; components are added in small batches. Nothing has been published to npm yet.

## Goals

- Modern, standalone, signal-based Angular components
- Accessible by default (targeting WCAG 2.2 AA)
- Themeable via CSS custom properties, with built-in light/dark themes and runtime switching
- Tree-shakeable, SSR/hydration-friendly, no required dependency on Tailwind for consumers
- Documented and developed through [Storybook](https://storybook.js.org/) (coming soon)

## Theming

Design tokens (colors, spacing, radii, shadows, typography, z-index, motion) are published as CSS custom properties. Import the stylesheet once, globally:

```css
@import '@mtilabs/ui/styles/index.css';
```

This defaults to your OS/browser's light or dark preference. To force a theme or let users toggle at runtime, inject `MtThemeService` and call `setTheme('light' | 'dark' | 'system')` — it sets `[data-theme]` on `<html>`, which the token stylesheet keys off of. Override any `--mtilabs-*` custom property on `:root` in your own CSS to customize the theme; no component internals need to change.

## Repository layout

```text
projects/ui/     the @mtilabs/ui library (public API in projects/ui/src/public-api.ts)
```

## Development

Requirements: Node.js (see `.nvmrc`/`engines` once added) and npm.

```bash
npm install       # install dependencies
npm run build     # build the @mtilabs/ui library (ng-packagr) into dist/ui
npm run test      # run unit tests (Vitest)
npm run lint      # lint the library (ESLint + angular-eslint)
npm run format    # format the repo with Prettier
npm run format:check
```

## Installation (once published)

```bash
npm install @mtilabs/ui
```

```ts
import { MtButton } from '@mtilabs/ui';
```

## Contributing

Contribution guidelines, the component-development workflow, and release process are being documented as the project's infrastructure lands. See `CONTRIBUTING.md` (coming soon) once available.

## License

[MIT](./LICENSE)
