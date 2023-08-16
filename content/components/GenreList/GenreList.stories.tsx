import { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';
import { GenreList } from '~components';

type ArgTypes = ComponentProps<typeof GenreList>;

export default {
  title: 'components/GenreList',
  component: GenreList,
  args: {
    genres: [
      {
        code: 1365,
        title: '액션 & 어드벤처',
        like: false,
      },
      {
        code: 1568,
        title: '액션 SF & 판타지',
        like: false,
      },
      {
        code: 43040,
        title: '액션 코미디 영화',
        like: true,
      },
    ],
  },
} as Meta<ArgTypes>;

export const Default: StoryObj<ArgTypes> = {};
