import type { Meta, StoryObj } from '@storybook/angular-vite';
import { MtSmokeCard } from './smoke.component';

/**
 * Not part of the public API — see smoke.component.ts. Proves the
 * Storybook/Vitest/axe-core pipeline works before real component stories
 * exist. Remove once the Button stories (next PR) cover the same ground.
 */
const meta: Meta<MtSmokeCard> = {
  title: 'Internal/Pipeline Smoke Test',
  component: MtSmokeCard,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<MtSmokeCard>;

export const Default: Story = {};
