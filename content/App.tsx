import { Fin, FinReceiver, Fins } from '@actav/floating-icon-navigation';
import styled from '@emotion/styled';
import { useState } from 'react';
import { BsList, BsListColumnsReverse as GenresIcon } from 'react-icons/bs';
import { AiFillLike as LikeIcon } from 'react-icons/ai';
import { ClickAwayListener, FloatingButton, Popover } from '~components';

const Container = styled.div`
  color: #fff;

  .netflowser-popover {
    position: fixed;
    bottom: 66px;
    right: 20px;

    z-index: 999;

    .netflowser-popover--container {
      width: 330px;
      height: 510px;

      .netflowser-popover--wrapper {
        width: 100%;
        height: 100%;

        background: rgba(30, 30, 30, 0.8);
        backdrop-filter: blur(12px);
        border-radius: 5px;
        border: 0.5px solid #3e3e3e;

        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .netflowser-item--fins {
          padding: 10px;
        }
      }
    }
  }

  .fab {
    position: fixed;
    bottom: 20px;
    right: 20px;

    z-index: 999;
  }
`;

function App() {
  // prop destruction

  // lib hooks

  // state, ref, querystring hooks
  const [open, setOpen] = useState<boolean>(false);

  // form hooks

  // query hooks

  // calculated values

  // effects

  // handlers
  const handleClose = () => {
    setOpen(false);
  };

  const handleTogglePopover = () => {
    setOpen((open) => !open);
  };

  return (
    <Container>
      <ClickAwayListener onClickAway={handleClose}>
        <>
          <Popover className='netflowser-popover' open={open}>
            <div className='netflowser-popover--container'>
              <div className='netflowser-popover--wrapper'>
                <div className='netflowser-item--receiver'>
                  <FinReceiver />
                </div>
                <div className='netflowser-item--fins'>
                  <Fins>
                    <Fin index path='genres' icon={<GenresIcon />}>
                      Genres
                    </Fin>
                    <Fin path='like' icon={<LikeIcon />}>
                      Like
                    </Fin>
                  </Fins>
                </div>
              </div>
            </div>
          </Popover>
          <FloatingButton className='fab' onClick={handleTogglePopover}>
            <BsList />
          </FloatingButton>
        </>
      </ClickAwayListener>
    </Container>
  );
}

export default App;
