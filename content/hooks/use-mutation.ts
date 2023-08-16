import { ChannelContext } from 'content/provider/ChannelProvider';
import { useCallback, useContext, useEffect, useState } from 'react';

function useMutation<T>(
  path: string,
  options: { onComplete?: (data: T) => void; onError?: (error: Error) => void } = { onComplete() {}, onError() {} },
  queryKey: string[],
  method: ChannelRequest['method'] = 'post',
): [(variables?: Record<string, any>) => void, { isLoading: boolean }] {
  // prop destruction

  // lib hooks
  const { channelStore } = useContext(ChannelContext);

  // state, ref, querystring hooks
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // form hooks

  // query hooks

  // calculated values
  const mutate = useCallback((variables?: Record<string, any>) => {
    setIsLoading(true);
    channelStore.mutate(path, queryKey, method, variables);
  }, []);

  // effects
  useEffect(() => {
    const listener = (res: ChannelResponse) => {
      setIsLoading(false);
      if (res.data) {
        options?.onComplete?.(res.data);
      } else if (res.error) {
        options?.onError?.(res.data);
      }
    };

    channelStore.subscribe(listener, path, queryKey, method);

    return () => {
      channelStore.unsubscribe(path, queryKey, method);
    };
  }, []);

  // handlers

  return [mutate, { isLoading }];
}

export { useMutation };
