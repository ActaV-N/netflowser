import { Fin, FinReceiver, Fins, FinClasses } from '@actav/floating-icon-navigation';
import styled from '@emotion/styled';
import { useState } from 'react';
import { BsListColumnsReverse as GenresIcon } from 'react-icons/bs';
import { AiFillHeart as LikeIcon } from 'react-icons/ai';
import { AiFillSetting as SettingIcon } from 'react-icons/ai';
import { ClickAwayListener, FloatingButton, Popover, ToggleIcon } from '~components';
import { GenreTab, LikeTab, SettingTab } from '~tabs';

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
        align-items: center;

        .netflowser-item--receiver {
          width: 100%;
          flex: 1;

          .netflowser-receiver {
            width: 100%;
            height: 100%;
          }
        }

        .netflowser-item--fins {
          padding: 10px;

          .${FinClasses.icon} {
            box-sizing: border-box;
            padding: 3px;

            svg {
              width: 100%;
              height: 100%;
            }
          }
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
                  <FinReceiver className='netflowser-receiver' />
                </div>
                <div className='netflowser-item--fins'>
                  <Fins>
                    <Fin index path='genres' activeColor='#5352FA' icon={<GenresIcon />}>
                      <GenreTab />
                    </Fin>
                    <Fin path='like' activeColor='#FA5352' icon={<LikeIcon />}>
                      <LikeTab />
                    </Fin>
                    <Fin path='setting' activeColor='#001C38' icon={<SettingIcon />}>
                      <SettingTab />
                    </Fin>
                  </Fins>
                </div>
              </div>
            </div>
          </Popover>
          <FloatingButton className='fab' onClick={handleTogglePopover}>
            <ToggleIcon open={open} />
          </FloatingButton>
        </>
      </ClickAwayListener>
    </Container>
  );
}

export default App;
