import styled from '@emotion/styled';
import { useState } from 'react';
import { BsList } from 'react-icons/bs';
import { Popover, FloatingButton } from '~components';

const Container = styled.div``;

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
  const handleTogglePopover = () => {
    setOpen((open) => !open);
  };

  return (
    <Container>
      <FloatingButton onClick={handleTogglePopover}>
        <BsList />
      </FloatingButton>
    </Container>
  );
}

export default App;
