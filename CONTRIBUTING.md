# Contributing to mtilabs-ui-kit

Thanks for considering a contribution to `@mtilabs/ui`. This document covers the day-to-day workflow; if you're adding a new component, read [docs/component-development-guidelines.md](./docs/component-development-guidelines.md) first — it's more prescriptive about API/token/testing conventions than this file.

## Development setup

Requirements: Node.js 24 (see `.nvmrc`) and npm 10+.

```bash
git clone git@github.com:mtilabs/mtilabs-ui-kit.git
cd mtilabs-ui-kit
npm install
npm run storybook
```

See the [README](./README.md#development) for the full list of npm scripts.

## Branching and pull requests

- Work happens on feature branches off `main`, named descriptively: `feature/<component-or-feature>` for new functionality, `fix/<short-description>` for bug fixes, `chore/<short-description>` for tooling/infra. Don't commit directly to `main`.
- Keep a branch/PR scoped to one component or one coherent change. Don't bundle unrelated components or refactors into the same PR.
- Before opening a PR, make sure these all pass locally:
  ```bash
  npm run format:check
  npm run lint
  npm run test
  npm run build
  npm run test:storybook
  npm run storybook:build
  ```
- Every PR that changes `@mtilabs/ui`'s published behavior (new component, new prop, bug fix, breaking change) needs a changeset — see [Changesets](#changesets) below. Pure internal/tooling/docs changes don't need one.
- CI runs the same checks listed above on every PR; it must be green before merge.
- Use squash merges so `main` has one commit per PR.

## Changesets

This repo uses [Changesets](https://github.com/changesets/changesets) to version `@mtilabs/ui` and generate its changelog. After making a change that should ship in the next release:

```bash
npx changeset
```

Pick `@mtilabs/ui`, choose patch/minor/major (see [Semantic versioning](#semantic-versioning)), and write a summary — it becomes a changelog entry, so write it for consumers, not just for the reviewer. Commit the generated `.changeset/*.md` file as part of your PR.

## Semantic versioning

- **Patch** — bug fixes, non-visible internal changes.
- **Minor** — new components, new (non-breaking) inputs/outputs/variants.
- **Major** — breaking changes to a public API: removed/renamed inputs or outputs, changed default behavior, removed exports, renamed CSS custom properties.

Breaking changes must be called out explicitly in the changeset summary and, once there's a real user base, in a migration note in the changelog.

## Releasing

Releasing is automated via `.github/workflows/release.yml` and doesn't need to be done by hand:

1. Merging a PR with one or more `.changeset/*.md` files into `main` triggers the release workflow, which opens (or updates) a "Version Packages" PR that applies the version bump(s) and updates `projects/ui/CHANGELOG.md`.
2. Merging that PR triggers the workflow again; this time, with no pending changesets, it publishes `@mtilabs/ui` to npm and creates the matching git tag / GitHub Release.

This requires two one-time pieces of repo/org configuration before it works end to end:

1. An **`NPM_TOKEN`** repository secret (an npm automation token with publish access to the `@mtilabs` org) — without it, only the final `npm publish` step fails.
2. **"Allow GitHub Actions to create and approve pull requests"** enabled for this repo — without it, the workflow fails when it tries to open the Version Packages PR, with `GitHub Actions is not permitted to create or approve pull requests`. This is a two-layer setting: it must be allowed at the **organization** level (Organization Settings → Actions → General) before it can also be enabled at the repo level (Settings → Actions → General) — an org-level "disabled" overrides any repo-level attempt to turn it on, and only an org owner/admin can change the org-level setting.

Until both are configured, `git push`ing the Version branch itself will still succeed; only the PR-creation and npm-publish steps will fail.

Nothing publishes to npm from a feature branch or any workflow other than `release.yml`.

## Code style

- TypeScript, standalone components, signals (`input()`/`output()`/`signal()`), `OnPush`-equivalent (signals avoid needing to opt in explicitly).
- No hardcoded colors/spacing/etc. in component styles — use the `--mtilabs-*` design tokens (see [docs/component-development-guidelines.md](./docs/component-development-guidelines.md#design-tokens)).
- Formatting is enforced by Prettier (`npm run format`), linting by ESLint + angular-eslint + eslint-plugin-storybook (`npm run lint`). Don't hand-format around what Prettier would produce.
- Keep internal implementation details out of `projects/ui/src/public-api.ts`. Anything exported there is public API and subject to semver.

## Reporting bugs / requesting features

Use the issue templates when opening a GitHub issue — they ask for the information needed to reproduce or evaluate the request. See [SECURITY.md](./SECURITY.md) instead if you're reporting a security vulnerability.
