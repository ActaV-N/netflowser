import React from 'react';
import type { Preview } from '@storybook/react';
import { FinProvider } from '@actav/floating-icon-navigation';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (StoryFn: Function) => (
      <FinProvider>
        <div
          style={{
            width: '100vw',
            height: '100vh',
            backgroundColor: '#141414',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {StoryFn()}
        </div>
      </FinProvider>
    ),
  ],
};

export default preview;
