import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import { useState } from 'react';
import { AiFillHeart as LikeIcon, AiFillFrown as NoDataIcon } from 'react-icons/ai';
import { useMutation } from '~hooks';
import { Genre } from '~models';

const NoGenreContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  font-size: 48px;

  p {
    font-size: 14px;
  }
`;

const GenreListContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  padding: 10px;
  box-sizing: border-box;

  .content-wrapper {
    flex: 1;

    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }
`;

const GenreItemContainer = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  background: rgba(14, 14, 14, 0.8);
  border-radius: 5px;

  color: #fff;
  font-size: 12px;
  text-decoration: none;

  cursor: pointer;

  .genre-item--title {
    padding: 10px;
  }

  .genre-item--like {
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 10px;

    background: transparent;
    border: none;
    outline: none;

    color: #4e4e4e;

    &.liked {
      color: #fa5252;
    }

    transition: color 0.2s cubic-bezier(0.37, 0, 0.63, 1);

    cursor: pointer;

    &: hover {
      color: #2e2e2e;

      &.liked {
        color: #a03534;
      }
    }
  }
`;

function GenreItem(props: { genre: Genre }) {
  // prop destruction
  const { genre } = props;

  // lib hooks

  // state, ref, querystring hooks
  const [liked, setLiked] = useState(genre.like);

  // form hooks

  // query hooks
  const [like] = useMutation<{
    id: number;
    liked: boolean;
  }>(
    '/genres/like',
    {
      onComplete({ id, liked }) {
        // TODO: react-query처럼 같은 queryKey에 해당하는 mutate 발생시 refetch하는걸로 대체하기
        if (genre.code === id) {
          setLiked(liked);
        }
      },
    },
    ['genres'],
  );

  // calculated values

  // effects

  // handlers
  const handleLike: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    like({
      id: genre.code,
    });
  };

  return (
    <GenreItemContainer key={genre.code} href={`https://www.netflix.com/browse/genre/${genre.code}`}>
      <div className='genre-item--title'>{genre.title}</div>
      <div className='genre-item--wrapper'></div>
      <button className={cx('genre-item--like', liked && 'liked')} onClick={handleLike}>
        <LikeIcon />
      </button>
    </GenreItemContainer>
  );
}

function GenreList(props: { genres: Genre[] }) {
  // prop destruction
  const { genres } = props;

  // lib hooks

  // state, ref, querystring hooks

  // form hooks

  // query hooks

  // calculated values

  // effects

  // handlers
  if (genres.length === 0) {
    return (
      <NoGenreContainer>
        <NoDataIcon />
        <p>아이템이 없어요</p>
      </NoGenreContainer>
    );
  }

  return (
    <GenreListContainer>
      <div className='content-wrapper'>
        {genres.map((genre) => (
          <GenreItem key={genre.code} genre={genre} />
        ))}
      </div>
    </GenreListContainer>
  );
}

export { GenreList };
