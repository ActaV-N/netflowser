import { useEffect } from 'react';
import { Building } from '../Building';
import { useMutation, useQuery } from '~hooks';

function GenreTab() {
  // prop destruction

  // lib hooks
  const { data } = useQuery<string>('/ping', ['ping']);
  const [test] = useMutation(
    'post',
    '/ping',
    {
      onComplete(data, error) {
        console.log(data, error);
      },
    },
    ['ping'],
  );

  // state, ref, querystring hooks

  // form hooks

  // query hooks

  // calculated values

  // effects
  useEffect(() => {
    console.log(data);
  }, [data]);

  // handlers
  return (
    <>
      <Building /> <button onClick={() => test()}>Hello</button>
    </>
  );
}

export { GenreTab };
