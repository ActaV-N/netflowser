import { useMemo } from 'react';
import { useQuery } from '~hooks';
import { GenreList } from '~components';
import { Genre } from '~models';

function LikeTab() {
  // prop destruction

  // lib hooks

  // state, ref, querystring hooks

  // form hooks

  const { data } = useQuery<Genre[]>('/genres/only-like', ['Genres']);

  // calculated values
  const genres = useMemo(() => data || [], [data]);

  // effects

  // handlers
  return <GenreList genres={genres} />;
}

export { LikeTab };
