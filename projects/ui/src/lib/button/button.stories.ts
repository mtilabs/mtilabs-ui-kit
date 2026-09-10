import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { MtButton } from './button';

const meta: Meta<MtButton> = {
  title: 'Foundation/Button',
  component: MtButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A button for triggering an action. Use a styled `<a>` for navigation instead — this component intentionally only renders a native `<button>`.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'destructive', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    type: 'button',
  },
  render: (args) => ({
    props: args,
    template: `<mt-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading" [type]="type">Save changes</mt-button>`,
  }),
};

export default meta;
type Story = StoryObj<MtButton>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: 'secondary' },
};

export const Destructive: Story = {
  args: { variant: 'destructive' },
};

export const Ghost: Story = {
  args: { variant: 'ghost' },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Loading: Story = {
  args: { loading: true },
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <mt-button variant="primary">Primary</mt-button>
        <mt-button variant="secondary">Secondary</mt-button>
        <mt-button variant="destructive">Destructive</mt-button>
        <mt-button variant="ghost">Ghost</mt-button>
      </div>
    `,
  }),
  parameters: {
    docs: { description: { story: 'All four variants side by side — check this in both themes.' } },
  },
};

export const ClickInteraction: StoryObj = {
  args: {
    onClick: fn(),
  },
  render: (args) => ({
    props: args,
    template: `<mt-button (click)="onClick($event)">Click me</mt-button>`,
  }),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Click me' });
    await userEvent.click(button);
    await expect(args['onClick']).toHaveBeenCalledOnce();
  },
};

export const DisabledDoesNotFireClick: StoryObj = {
  args: {
    disabled: true,
    onClick: fn(),
  },
  render: (args) => ({
    props: args,
    template: `<mt-button [disabled]="disabled" (click)="onClick($event)">Can't click me</mt-button>`,
  }),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: "Can't click me" });
    await userEvent.click(button);
    await expect(args['onClick']).not.toHaveBeenCalled();
  },
};
