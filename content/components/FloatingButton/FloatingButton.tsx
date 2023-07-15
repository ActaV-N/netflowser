import styled from '@emotion/styled';
import { EASE_IN_OUT } from '~styles';

const FloatingButtonContainer = styled.button`
  outline: none;
  border: none;

  width: 36px;
  height: 36px;

  border-radius: 18px;

  background-color: #e5e5e5;
  color: #000000;

  cursor: pointer;

  transition: background-color 0.15s ${EASE_IN_OUT};

  &: hover {
    background-color: #b7b7b7;
  }
`;
interface FloatingButtonProps {
  onClick?: React.MouseEventHandler;
  children: React.ReactNode;
  role?: string;
  name?: string;
}

function FloatingButton(props: FloatingButtonProps) {
  // prop destruction
  const { onClick, role = 'button', name, children } = props;

  // lib hooks

  // state, ref, querystring hooks

  // form hooks

  // query hooks

  // calculated values

  // effects

  // handlers

  return (
    <FloatingButtonContainer role={role} aria-label={name} onClick={onClick}>
      {children}
    </FloatingButtonContainer>
  );
}

export { FloatingButton };
