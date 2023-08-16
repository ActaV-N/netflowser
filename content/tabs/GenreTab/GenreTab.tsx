import { useEffect } from 'react';
import { Building } from '../Building';
import { useMutation, useQuery } from '~hooks';

function GenreTab() {
  // prop destruction

  // lib hooks
  const { data } = useQuery<string>('/ping', ['ping']);
  const [test] = useMutation(
    '/ping',
    {
      onComplete(data) {
        console.log('m', data);
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
