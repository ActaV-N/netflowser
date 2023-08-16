import { ChannelContext } from 'content/provider/ChannelProvider';
import { useContext, useEffect, useState } from 'react';

function useQuery<T>(path: string, queryKey: string[]) {
  // prop destruction

  // lib hooks
  const { channelStore } = useContext(ChannelContext);

  // state, ref, querystring hooks
  const [data, setData] = useState<T>();
  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // form hooks

  // query hooks

  // calculated values

  // effects
  useEffect(() => {
    const listener = (res: ChannelResponse) => {
      setIsLoading(true);
      if (res.data) {
        setData(res.data);
      } else if (res.error) {
        setError(res.error);
      }
      setIsLoading(false);
    };

    channelStore.subscribe(listener, path, queryKey);

    return () => {
      channelStore.unsubscribe(path, queryKey);
    };
  }, []);

  useEffect(() => {
    if (path && queryKey.length !== 0) {
      channelStore.query(path, queryKey);
    }
  }, []);

  // handlers

  return { data, error, isLoading };
}

export { useQuery };
