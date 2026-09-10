import { Component } from '@angular/core';

/**
 * Not part of the public API. Exists only to prove the Storybook + Vitest +
 * axe-core pipeline renders real components, applies the design tokens, and
 * respects light/dark theming end to end. Delete this once the first real
 * component (Button) ships with its own stories in its place.
 */
@Component({
  selector: 'mt-smoke-card',
  template: `
    <section class="card">
      <h2>Pipeline smoke test</h2>
      <p>This card is styled entirely from --mtilabs-* design tokens.</p>
      <button type="button" class="action">Focusable action</button>
    </section>
  `,
  styles: `
    .card {
      display: flex;
      flex-direction: column;
      gap: var(--mtilabs-spacing-md);
      max-width: 24rem;
      padding: var(--mtilabs-spacing-xl);
      color: var(--mtilabs-color-surface-foreground);
      background-color: var(--mtilabs-color-surface);
      border: 1px solid var(--mtilabs-color-border);
      border-radius: var(--mtilabs-radius-lg);
      box-shadow: var(--mtilabs-shadow-md);
      font-family: var(--mtilabs-font-family-sans);
    }

    h2 {
      margin: 0;
      font-size: var(--mtilabs-font-size-lg);
      font-weight: var(--mtilabs-font-weight-semibold);
    }

    p {
      margin: 0;
      color: var(--mtilabs-color-muted-foreground);
      font-size: var(--mtilabs-font-size-sm);
    }

    .action {
      align-self: flex-start;
      height: var(--mtilabs-height-sm);
      padding-inline: var(--mtilabs-spacing-lg);
      color: var(--mtilabs-color-primary-foreground);
      background-color: var(--mtilabs-color-primary);
      border: none;
      border-radius: var(--mtilabs-radius-md);
      cursor: pointer;
      transition: background-color var(--mtilabs-transition-base);
    }

    .action:hover {
      background-color: var(--mtilabs-color-primary-hover);
    }

    .action:focus-visible {
      outline: 2px solid var(--mtilabs-color-focus-ring);
      outline-offset: 2px;
    }
  `,
})
export class MtSmokeCard {}
