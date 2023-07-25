import { useContext } from 'react';
import { ChannelContext } from '../provider/ChannelProvider';

function useChannel() {
  const { get } = useContext(ChannelContext);

  return { get };
}

export { useChannel };
