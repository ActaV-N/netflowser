import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import { MouseEventHandler } from 'react';
import { AiFillHeart as LikeIcon } from 'react-icons/ai';
import { Genre } from '~models';

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

const GenreListItem = styled.a`
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
    }
  }
`;

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
  const handleClickHeart: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
  };

  return (
    <GenreListContainer>
      <div className='content-wrapper'>
        {genres.map((genre) => (
          <GenreListItem key={genre.code} href={`https://www.netflix.com/browse/genre/${genre.code}`}>
            <div className='genre-item--title'>{genre.ko}</div>
            <div className='genre-item--wrapper'></div>
            <button className={cx('genre-item--like', genre.like && 'liked')} onClick={handleClickHeart}>
              <LikeIcon />
            </button>
          </GenreListItem>
        ))}
      </div>
    </GenreListContainer>
  );
}

export { GenreList };
