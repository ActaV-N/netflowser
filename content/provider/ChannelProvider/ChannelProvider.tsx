import { createContext } from 'react';
import { channelStore } from '~channel';

const ChannelContext = createContext<{
  get: (path: string, queryKey: string[]) => void;
}>({
  get: () => {},
});

function ChannelProvider(props: { children: React.ReactNode }) {
  // prop destruction
  const { children } = props;

  // lib hooks

  // state, ref, querystring hooks

  // form hooks

  // query hooks

  // calculated values
  const get = (path: string, queryKey: string[]) => channelStore.get(path, queryKey);

  // effects

  // handlers
  return <ChannelContext.Provider value={{ get }}>{children}</ChannelContext.Provider>;
}

export { ChannelProvider };
