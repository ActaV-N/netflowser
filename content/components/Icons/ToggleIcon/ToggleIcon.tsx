import styled from '@emotion/styled';
import { useAnimate, motion } from 'framer-motion';

const ToggleIconContainer = motion(styled.div`
  width: 100%;
  height: 100%;

  padding: 3px;
`);

const ToggleIconWrapper = styled.div`
  position: relative;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  .line {
    position: absolute;

    width: 100%;
    height: 1px;

    background: #000;
    left: 0;

    transform-origin: center;
  }
`;

interface ToggleIconProps {
  open: boolean;
}

function ToggleIcon(props: ToggleIconProps) {
  // prop destruction
  const { open } = props;

  // lib hooks
  const [scope] = useAnimate();

  // state, ref, querystring hooks

  // form hooks

  // query hooks

  // calculated values

  // effects

  // handlers

  return (
    <ToggleIconContainer ref={scope}>
      <ToggleIconWrapper>
        <motion.span
          className='line'
          animate={{
            y: open ? ['5px', '0px', '0px'] : ['0px', '0px', '5px'],
            rotate: open ? ['0', '0', '45deg'] : ['45deg', '0deg', '0deg'],
          }}
          transition={{ duration: 0.5, times: [0, 0.3, 1] }}
          initial={false}
        ></motion.span>
        <motion.span className='line' animate={{ opacity: open ? [1, 0, 0] : [0, 1, 1] }} initial={false}></motion.span>
        <motion.span
          className='line'
          animate={{
            y: open ? ['-5px', '0px', '0px'] : ['0px', '0px', '-5px'],
            rotate: open ? ['0', '0', '-45deg'] : ['-45deg', '0deg', '0deg'],
          }}
          transition={{ duration: 0.5, times: [0, 0.3, 1] }}
          initial={false}
        ></motion.span>
      </ToggleIconWrapper>
    </ToggleIconContainer>
  );
}

export { ToggleIcon };
