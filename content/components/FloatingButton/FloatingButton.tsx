import styled from '@emotion/styled';

const FloatingButtonContainer = styled.button``;
interface FloatingButtonProps {
  onClick?: React.MouseEventHandler;
  children: React.ReactNode;
}

function FloatingButton(props: FloatingButtonProps) {
  // prop destruction
  const { onClick, children } = props;

  // lib hooks

  // state, ref, querystring hooks

  // form hooks

  // query hooks

  // calculated values

  // effects

  // handlers

  return <FloatingButtonContainer onClick={onClick}>{children}</FloatingButtonContainer>;
}

export { FloatingButton };
