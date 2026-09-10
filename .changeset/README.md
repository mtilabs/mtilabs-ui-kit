# Changesets

This directory contains changesets — see [the Changesets documentation](https://github.com/changesets/changesets) for details on adding a changeset.

Every pull request that changes `@mtilabs/ui`'s published behavior must include a changeset. Run:

```bash
npx changeset
```

and follow the prompts to describe the change and pick a bump type (patch/minor/major). See [CONTRIBUTING.md](../CONTRIBUTING.md#releasing) for how this feeds into releases.
