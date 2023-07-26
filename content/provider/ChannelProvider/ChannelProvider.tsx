import { createContext } from 'react';
import { channelStore, type ChannelStore } from '~channel';

export const ChannelContext = createContext<{
  channelStore: ChannelStore;
}>({
  channelStore,
});

function ChannelProvider(props: { children: React.ReactNode }) {
  // prop destruction
  const { children } = props;

  // lib hooks

  // state, ref, querystring hooks

  // form hooks

  // query hooks

  // calculated values

  // effects

  // handlers
  return <ChannelContext.Provider value={{ channelStore }}>{children}</ChannelContext.Provider>;
}

export { ChannelProvider };
