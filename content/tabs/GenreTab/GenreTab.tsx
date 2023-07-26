import { useEffect } from 'react';
import { Building } from '../Building';
import { useQuery } from '~hooks';

function GenreTab() {
  // prop destruction

  // lib hooks
  const { data } = useQuery('/ping', ['ping']);

  // state, ref, querystring hooks

  // form hooks

  // query hooks

  // calculated values

  // effects
  useEffect(() => {
    console.log(data);
  }, [data]);

  // handlers
  return <Building />;
}

export { GenreTab };
