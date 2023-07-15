import styled from '@emotion/styled';
import { useState } from 'react';
import { BsList } from 'react-icons/bs';
import { Popover, FloatingButton } from '~components';

const Container = styled.div``;

function App() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Container>
      <FloatingButton>
        <BsList />
      </FloatingButton>
    </Container>
  );
}

export default App;
