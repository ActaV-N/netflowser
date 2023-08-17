import { useQuery } from '~hooks';
import { Genre } from '~models';
import { useMemo } from 'react';
import { GenreList } from '~components';

function GenreTab() {
  // prop destruction

  // lib hooks

  // state, ref, querystring hooks

  // form hooks

  // query hooks
  const { data, isLoading } = useQuery<Genre[]>('/genres', ['Genres']);

  // calculated values
  const genres = useMemo(() => data || [], [data]);

  // effects

  // handlers
  return <GenreList loading={isLoading} searchable genres={genres} />;
}

export { GenreTab };
