import type { Meta, StoryObj } from '@storybook/angular-vite';
import { MtIcon } from './icon';

const CHECK_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5" /></svg>`;

const meta: Meta<MtIcon> = {
  title: 'Foundation/Icon',
  component: MtIcon,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          "A sizing/accessibility wrapper around a consumer-supplied icon — this library doesn't bundle an icon set. Project any SVG as content.",
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    size: 'md',
    label: null,
  },
  render: (args) => ({
    props: args,
    template: `<mt-icon [size]="size" [label]="label">${CHECK_SVG}</mt-icon>`,
  }),
};

export default meta;
type Story = StoryObj<MtIcon>;

export const Default: Story = {};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const Labeled: Story = {
  args: { label: 'Completed' },
  parameters: {
    docs: {
      description: {
        story:
          'When the icon conveys meaning on its own (no adjacent visible text), pass `label` — it gets `role="img"` + `aria-label` instead of `aria-hidden`.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; gap: 12px;">
        <mt-icon size="sm">${CHECK_SVG}</mt-icon>
        <mt-icon size="md">${CHECK_SVG}</mt-icon>
        <mt-icon size="lg">${CHECK_SVG}</mt-icon>
      </div>
    `,
  }),
};

export const InheritsTextColor: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; gap: 8px; color: var(--mtilabs-color-destructive);">
        <mt-icon>${CHECK_SVG}</mt-icon>
        <span>Icon color follows the surrounding text color (currentColor)</span>
      </div>
    `,
  }),
};
