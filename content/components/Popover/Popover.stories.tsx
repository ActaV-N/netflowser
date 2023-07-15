import { Meta, StoryObj } from '@storybook/react';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';
import { ComponentProps } from 'react';
import { Popover } from './Popover';

type ArgTypes = ComponentProps<typeof Popover>;

const wrapper = (StoryFn: Function) => <div style={{ color: '#fff' }}>{StoryFn()}</div>;

export default {
  title: 'Components/Popover',
  component: Popover,
  decorators: [wrapper],
  args: {
    children: "Hi I'm popover",
    name: 'example poover',
  },
  argTypes: {
    open: {
      type: 'boolean',
    },
  },
} as Meta<ArgTypes>;

export const Default: StoryObj<ArgTypes> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(await canvas.findByRole('dialog')).toBeInTheDocument();
    expect(await canvas.findByRole('dialog', { name: 'example poover' })).toBeInTheDocument();
  },
};

export const Show: StoryObj<ArgTypes> = {
  args: {
    open: true,
  },
};
