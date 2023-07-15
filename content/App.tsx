import styled from '@emotion/styled';
import { useState } from 'react';
import { BsList } from 'react-icons/bs';
import { ClickAwayListener, FloatingButton, Popover } from '~components';

const Container = styled.div`
  color: #fff;
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
          <Popover open={open}>Hello</Popover>
          <FloatingButton onClick={handleTogglePopover}>
            <BsList />
          </FloatingButton>
        </>
      </ClickAwayListener>
    </Container>
  );
}

export default App;
