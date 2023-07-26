import { ChannelContext } from 'content/provider/ChannelProvider';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Request, Response } from '~channel';

function useMutation(
  method: Request['method'],
  path: string,
  queryKey: string[],
): [(variables?: Record<string, any>) => void, { error: any; isLoading: boolean }] {
  // prop destruction

  // lib hooks
  const { channelStore } = useContext(ChannelContext);

  // state, ref, querystring hooks
  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // form hooks

  // query hooks

  // calculated values
  const mutate = useCallback((variables?: Record<string, any>) => {
    channelStore.mutate(path, queryKey, method, variables);
  }, []);

  // effects
  useEffect(() => {
    const listener = (res: Response) => {
      setIsLoading(true);
      if (res.error) {
        setError(res.error);
      }
      setIsLoading(false);
    };

    channelStore.subscribe(listener, path, queryKey, method);

    return () => {
      channelStore.unsubscribe(path, queryKey, method);
    };
  }, []);

  // handlers

  return [mutate, { error, isLoading }];
}

export { useMutation };
