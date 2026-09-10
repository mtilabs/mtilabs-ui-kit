import { Component, input } from '@angular/core';

export type MtIconSize = 'sm' | 'md' | 'lg';

/**
 * A sizing/accessibility wrapper around a consumer-supplied icon — this
 * library doesn't bundle an icon set. Project any SVG (inline, or from an
 * icon package's Angular component) as content; MtIcon sizes it via design
 * tokens and makes it inherit the surrounding text color.
 *
 * Decorative by default (`aria-hidden`). Pass `label` when the icon conveys
 * meaning on its own (e.g. an icon-only button with no visible text).
 */
@Component({
  selector: 'mt-icon',
  host: {
    '[attr.data-size]': 'size()',
    '[attr.role]': "label() ? 'img' : null",
    '[attr.aria-label]': 'label()',
    '[attr.aria-hidden]': "label() ? null : 'true'",
  },
  template: `<ng-content />`,
  styles: `
    :host {
      display: inline-flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      width: var(--mtilabs-icon-size-md);
      height: var(--mtilabs-icon-size-md);
      color: inherit;
    }

    :host([data-size='sm']) {
      width: var(--mtilabs-icon-size-sm);
      height: var(--mtilabs-icon-size-sm);
    }

    :host([data-size='lg']) {
      width: var(--mtilabs-icon-size-lg);
      height: var(--mtilabs-icon-size-lg);
    }

    /*
     * Angular's emulated style encapsulation can't reach projected content
     * (it belongs to the consumer's own template scope), so there's no way
     * to size an arbitrary projected <svg> without piercing it. ::ng-deep is
     * deprecated but still the pragmatic tool for exactly this case; scope
     * is limited to this one selector.
     */
    ::ng-deep svg {
      width: 100%;
      height: 100%;
      display: block;
      fill: currentColor;
    }
  `,
})
export class MtIcon {
  readonly size = input<MtIconSize>('md');
  readonly label = input<string | null>(null);
}
