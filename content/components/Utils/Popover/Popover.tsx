import { useAnimate } from 'framer-motion';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

const PopoverContainer = styled.div``;

interface PopoverProps {
  open?: boolean;
  className?: string;
  name?: string;
  children: React.ReactNode;
}

function Popover(props: PopoverProps) {
  // prop destruction
  const { open, className, name, children } = props;

  // lib hooks
  const [scope, animate] = useAnimate();
  const [initialOpacity] = useState<boolean>(!!open);

  // state, ref, querystring hooks

  // form hooks

  // query hooks

  // calculated values

  // effects
  useEffect(() => {
    const animation = async () => {
      if (open) {
        await animate(scope.current, {
          visibility: 'initial',
        });
      }

      await animate(
        scope.current,
        {
          opacity: Number(open),
          scale: 0.95 + 0.05 * Number(open),
        },
        {
          ease: 'easeInOut',
          duration: 0.2,
        },
      );

      if (!open) {
        await animate(scope.current, {
          visibility: 'hidden',
        });
      }
    };

    animation();
  }, [open]);

  // handlers

  return (
    <PopoverContainer
      style={{ opacity: Number(initialOpacity), scale: 0.95 + 0.05 * Number(initialOpacity) }}
      role='dialog'
      aria-label={name}
      className={className}
      ref={scope}
    >
      {children}
    </PopoverContainer>
  );
}

export { Popover };
