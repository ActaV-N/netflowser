import type { Preview } from "@storybook/react";
import { FinProvider } from "@actav/floating-icon-navigation";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [(StoryFn: Function) => <FinProvider>{StoryFn()}</FinProvider>],
};

export default preview;
