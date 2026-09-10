# Component development guidelines

This is the process and conventions for adding or changing a component in `@mtilabs/ui`. The goal: a component built months from now by someone who's never seen this codebase should still feel like it belongs next to the rest of the library.

## Workflow

1. **Create a feature branch** off `main`: `feature/<component-name>` (e.g. `feature/dialog`).
2. **Check it doesn't already exist** — search `projects/ui/src/lib/` and open PRs/issues. Consider whether it's really a new component or a variant/composition of an existing one.
3. **Decide whether Angular CDK earns its place** (see [When to reach for CDK](#when-to-reach-for-cdk)). Don't add a CDK dependency for something a dozen lines of plain Angular/CSS already solves; don't reinvent overlay positioning, focus trapping, or listbox keyboard nav that CDK already gets right.
4. **Define the public API first** — inputs, outputs, content projection points, variants, sizes, states — before writing the template. See [API design](#api-design).
5. **Define any new design tokens** it needs in `projects/ui/styles/tokens/` (see [Design tokens](#design-tokens)). Reuse existing tokens wherever the visual role matches; don't invent a parallel token for something `--mtilabs-color-primary` already covers.
6. **Implement accessible behavior** — semantic HTML first, ARIA only to fill gaps native semantics don't cover, full keyboard support, correct focus management for anything overlay-based. See [Accessibility](#accessibility).
7. **Verify light and dark themes** — nothing should be hardcoded outside the token system, so this should mostly just work; check it in Storybook's theme toolbar anyway.
8. **Add unit tests** (`*.spec.ts` next to the component) covering rendering, every input/variant, output emission, disabled/loading/error states where applicable, keyboard interactions, and `ControlValueAccessor` behavior for form controls.
9. **Add an accessibility test** using the shared helper: `import { expectNoA11yViolations } from '../../test-helpers/a11y'`, called against the rendered fixture in at least one spec.
10. **Add Storybook stories** (`*.stories.ts` next to the component) — see [Storybook stories](#storybook-stories).
11. **Add documentation** — the story file's own docs (via `parameters.docs` / JSDoc on the component) covering purpose, usage, inputs/outputs, accessibility notes, and customization. Component-specific prose belongs in Storybook, not in a separate markdown file per component.
12. **Add/update exports** in `projects/ui/src/public-api.ts` — only what's meant to be public.
13. **Run the full local check suite**: `npm run format:check && npm run lint && npm run test && npm run build && npm run test:storybook && npm run storybook:build`.
14. **Add a changeset**: `npx changeset` (minor for a new component; see [CONTRIBUTING.md](../CONTRIBUTING.md#semantic-versioning)).
15. **Open a pull request** against `main`, filled out per the PR template.
16. **Review and merge** — squash merge once CI is green and review feedback is addressed.

## File structure

Each component lives in its own folder under `projects/ui/src/lib/<component-name>/`:

```text
projects/ui/src/lib/button/
  button.ts                # the component
  button.spec.ts           # unit + a11y tests
  button.stories.ts         # Storybook stories
```

Split multi-part components (e.g. a component family like Tabs/TabPanel, or Select/Option) into one file per class, still grouped under a single folder (`projects/ui/src/lib/tabs/tabs.ts`, `tab-panel.ts`, ...). Shared internal helpers for a component family live in that same folder, not in a shared top-level `utils/` grab-bag — if two unrelated components end up needing the same helper, that's a signal to promote it deliberately, not to default new code there.

## Naming

- **Selectors**: `mt-` prefix, kebab-case elements (`mt-button`), camelCase attribute directives (`mtTooltip`) — enforced by `eslint.config.js`'s `@angular-eslint/component-selector` / `directive-selector` rules.
- **Classes**: `Mt` prefix, PascalCase (`MtButton`, `MtDialogRef`).
- **Public types**: `Mt` prefix for anything exported from `public-api.ts` (`MtButtonVariant`, `MtTheme`).
- **CSS custom properties**: `--mtilabs-<category>-<name>[-<scale>]`, e.g. `--mtilabs-color-primary`, `--mtilabs-radius-md`, `--mtilabs-spacing-lg`. Never introduce a one-off `--mt-*` or unprefixed variable.
- Reuse terminology across components: if Button has `variant`/`size`/`disabled`/`loading`, a new component with the same concepts uses the same input names and the same value sets — don't call it `type` on one component and `variant` on another, or `small`/`large` on one and `sm`/`lg` on another (the library standard is `sm`/`md`/`lg`).

## API design

- Standalone components only. Use `input()`/`input.required()`, `output()`, and `signal()`/`computed()` for state — no `@Input()`/`@Output()` decorators or `NgModule`s.
- Prefer a small number of typed variant/size unions over booleans that multiply (`variant: 'primary' | 'secondary' | 'destructive' | 'ghost'`, not `isPrimary`/`isDestructive`/... flags).
- Every input needs a real default — don't require configuration for the common case.
- Content projection (`<ng-content>`, slots via attribute selectors) over configuration inputs when the content is arbitrary markup (icons, custom labels) rather than a fixed set of options.
- Don't export anything from `public-api.ts` "just in case." Internal helper types, base classes, and directives used only for composition inside the library stay unexported.

## Design tokens

- Never hardcode a color, spacing value, radius, shadow, font size, duration, or z-index in a component stylesheet — reference the token: `background-color: var(--mtilabs-color-surface);`, not a literal hex/rem value.
- If an existing semantic token fits the visual role, use it. Only add a new token in `projects/ui/styles/tokens/` when no existing one fits, and add it to both `colors.css`/`colors.dark.css` (or the relevant category file) so light and dark stay in sync — see [projects/ui/styles/tokens/colors.dark.css](../projects/ui/styles/tokens/colors.dark.css) for the pattern.
- Remember `projects/ui/styles/index.css` needs updating if you add a whole new token file (rare — most new tokens slot into an existing category file).

## Accessibility

- Reach for the correct native element first (`<button>`, not a styled `<div role="button">`) — ARIA fills gaps native HTML doesn't cover, it doesn't replace it.
- Every interactive element must be keyboard operable and show a visible focus indicator (use the `.mt-focus-ring` utility class from `projects/ui/styles/base.css` or the equivalent `--mtilabs-color-focus-ring`-based outline directly).
- Disabled/loading/error states must be exposed to assistive tech (`aria-disabled`/`disabled`, `aria-busy`, `aria-invalid` + `aria-describedby` pointing at the error text), not just styled differently.
- Anything overlay-based (dialog, popover, menu, dropdown) must trap/restore focus correctly and support <kbd>Escape</kbd> to dismiss — use CDK's `A11yModule`/overlay/focus-trap utilities rather than reimplementing this.
- No keyboard traps outside of an intentional, escapable focus trap (dialogs).
- Run `npm run test:storybook` (or check the Accessibility panel in a running Storybook) before opening a PR — CI fails the build on any axe-core violation from a story.

## When to reach for CDK

Use Angular CDK for: overlay positioning, dialog/modal infrastructure, menus, popovers/tooltips (positioning + dismiss behavior), focus trapping/restoration, listbox/roving-tabindex keyboard navigation, drag & drop, virtual scrolling, and selection models.

Don't reach for CDK for: a Button, Badge, Avatar, Card, Divider, or anything else that's just markup + CSS + a couple of `@HostListener`s — adding `@angular/cdk` as a dependency for something that doesn't need it just adds bundle weight and indirection.

## Storybook stories

- One `*.stories.ts` per component, `title: 'Category/ComponentName'` matching the groupings in the [README](../README.md) / spec (Foundation, Forms, Navigation, Feedback, Data display, Layout).
- Cover: the default state, every `variant`, every `size`, `disabled`, `loading`/error states where applicable, and a story exercising keyboard/interaction behavior for anything non-trivial (use `play` functions for interaction tests where it adds real coverage, not for every trivial story).
- Don't hardcode a light or dark background in a story — the global theme toolbar (`projects/ui/.storybook/preview.ts`) handles that; a component's own stories should just render correctly under both.
- Storybook is the documentation surface — use `parameters.docs.description` / doc-block MDX where prose is needed. Don't create parallel per-component markdown files.

## Testing

- Unit tests use Angular's own Vitest-based test builder (`ng test ui`, `TestBed`) — see `projects/ui/src/lib/theme/theme.service.spec.ts` for the service-testing pattern and `projects/ui/src/stories/smoke/smoke.component.spec.ts` for the component + a11y-helper pattern.
- Story-level interaction/accessibility tests run separately via `npm run test:storybook` (Storybook's Vitest addon + Playwright) — these exercise the actual rendered story, including the a11y addon's axe-core checks.
- For `ControlValueAccessor` components, test `writeValue`, `registerOnChange`/`registerOnTouched`, and the disabled state explicitly — don't just test that the component renders.

## Breaking changes and deprecation

- A breaking change to a public input/output/export needs a **major** changeset and a clear migration note in the changeset summary.
- Prefer deprecating over breaking where practical: keep the old API working, mark it `@deprecated` with a JSDoc comment pointing at the replacement, and remove it in a later major version.
- Don't rename a CSS custom property without an explicit major-version changeset — consumers may have overridden it.
