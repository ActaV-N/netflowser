import { Meta, StoryObj } from '@storybook/react';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';
import { ComponentProps } from 'react';
import { AiFillAlert } from 'react-icons/ai';
import { FloatingButton } from './FloatingButton';

type ArgTypes = ComponentProps<typeof FloatingButton>;

export default {
  title: 'Components/FloatingButton',
  component: FloatingButton,
  args: {
    name: 'example button',
    children: <AiFillAlert />,
  },
} as Meta<ArgTypes>;

export const Default: StoryObj<ArgTypes> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(await canvas.findByRole('button')).toBeInTheDocument();

    expect(await canvas.findByRole('button', { name: 'example button' })).toBeInTheDocument();
  },
};
