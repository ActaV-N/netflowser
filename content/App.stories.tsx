import { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';
import App from './App';

type ArgTypes = ComponentProps<typeof App>;

export default {
  title: 'Main/App',
  component: App,
} as Meta<ArgTypes>;

export const Default: StoryObj<ArgTypes> = {};
