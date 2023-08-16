import { useQuery } from '~hooks';
import { Building } from '../Building';
import { Genre } from '~models';
import { useEffect, useMemo } from 'react';

function GenreTab() {
  // prop destruction

  // lib hooks

  // state, ref, querystring hooks

  // form hooks

  // query hooks
  const { data } = useQuery<Genre[]>('/genres', ['Genres']);

  // calculated values
  const genres = useMemo(() => data || [], [data]);

  // effects
  useEffect(() => {
    console.log(genres);
  }, [genres]);

  // handlers
  return (
    <>
      <Building />
    </>
  );
}

export { GenreTab };
