import { Component, input } from '@angular/core';

export type MtButtonVariant = 'primary' | 'secondary' | 'destructive' | 'ghost';
export type MtButtonSize = 'sm' | 'md' | 'lg';
export type MtButtonType = 'button' | 'submit' | 'reset';

/**
 * A button for triggering an action. For navigation, use a native `<a>`
 * styled with the same visual variants (a link-flavored MtButton isn't part
 * of this library — an anchor already has the correct semantics for free).
 */
@Component({
  selector: 'mt-button',
  template: `
    <button
      class="button button--{{ variant() }} button--{{ size() }}"
      [attr.type]="type()"
      [disabled]="disabled() || loading()"
      [attr.aria-busy]="loading() ? 'true' : null"
    >
      @if (loading()) {
        <span class="spinner" aria-hidden="true"></span>
      }
      <ng-content />
    </button>
  `,
  styles: `
    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--mtilabs-spacing-sm);
      font-family: var(--mtilabs-font-family-sans);
      font-weight: var(--mtilabs-font-weight-medium);
      line-height: 1;
      white-space: nowrap;
      border: 1px solid transparent;
      border-radius: var(--mtilabs-radius-md);
      cursor: pointer;
      transition:
        background-color var(--mtilabs-transition-base),
        border-color var(--mtilabs-transition-base),
        color var(--mtilabs-transition-base);
    }

    .button:focus-visible {
      outline: 2px solid var(--mtilabs-color-focus-ring);
      outline-offset: 2px;
    }

    .button:disabled {
      color: var(--mtilabs-color-disabled-foreground);
      cursor: not-allowed;
      background-color: var(--mtilabs-color-disabled);
      border-color: transparent;
    }

    /* Sizes */
    .button--sm {
      height: var(--mtilabs-height-sm);
      padding-inline: var(--mtilabs-spacing-md);
      font-size: var(--mtilabs-font-size-sm);
    }

    .button--md {
      height: var(--mtilabs-height-md);
      padding-inline: var(--mtilabs-spacing-lg);
      font-size: var(--mtilabs-font-size-md);
    }

    .button--lg {
      height: var(--mtilabs-height-lg);
      padding-inline: var(--mtilabs-spacing-xl);
      font-size: var(--mtilabs-font-size-lg);
    }

    /* Variants */
    .button--primary {
      color: var(--mtilabs-color-primary-foreground);
      background-color: var(--mtilabs-color-primary);
    }

    .button--primary:not(:disabled):hover {
      background-color: var(--mtilabs-color-primary-hover);
    }

    .button--secondary {
      color: var(--mtilabs-color-secondary-foreground);
      background-color: var(--mtilabs-color-secondary);
    }

    .button--secondary:not(:disabled):hover {
      background-color: var(--mtilabs-color-secondary-hover);
    }

    .button--destructive {
      color: var(--mtilabs-color-destructive-foreground);
      background-color: var(--mtilabs-color-destructive);
    }

    .button--destructive:not(:disabled):hover {
      background-color: var(--mtilabs-color-destructive-hover);
    }

    .button--ghost {
      color: var(--mtilabs-color-foreground);
      background-color: transparent;
    }

    .button--ghost:not(:disabled):hover {
      background-color: var(--mtilabs-color-muted);
    }

    .spinner {
      width: 1em;
      height: 1em;
      border: 2px solid currentColor;
      border-right-color: transparent;
      border-radius: var(--mtilabs-radius-full);
      animation: mt-button-spin calc(var(--mtilabs-duration-slow) * 4) linear infinite;
    }

    @media (prefers-reduced-motion: reduce) {
      .spinner {
        animation: none;
      }
    }

    @keyframes mt-button-spin {
      to {
        transform: rotate(360deg);
      }
    }
  `,
})
export class MtButton {
  readonly variant = input<MtButtonVariant>('primary');
  readonly size = input<MtButtonSize>('md');
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly type = input<MtButtonType>('button');
}
