import { useEffect } from 'react';
import { Building } from '../Building';
import { useChannel } from '~hooks';

function GenreTab() {
  // prop destruction

  // lib hooks
  const { get } = useChannel();

  // state, ref, querystring hooks

  // form hooks

  // query hooks

  // calculated values

  // effects
  useEffect(() => {
    get('/ping', ['ping']);
  }, []);

  // handlers
  return <Building />;
}

export { GenreTab };
