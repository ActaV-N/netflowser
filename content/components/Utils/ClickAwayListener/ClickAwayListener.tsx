import { useEffect, useRef } from 'react';

const isDescendant = (el: any, target: any): boolean => {
  if (target !== null) {
    return el === target || isDescendant(el, target.parentNode);
  }
  return false;
};

function ClickAwayListener(props: { children: React.ReactElement; onClickAway: (e: MouseEvent) => void }) {
  // prop destruction
  const { children, onClickAway } = props;
  // lib hooks

  // state, ref, querystring hooks
  const ref = useRef<HTMLDivElement>(null);

  // form hooks

  // query hooks

  // calculated values

  // effects
  useEffect(() => {
    const handleClickAway = (e: any) => {
      if (e.defaultPrevented) {
        return;
      }

      const el = ref.current;

      if (document.documentElement.contains(e.target) && !isDescendant(el, e.target)) {
        onClickAway(e);
      }
    };

    document.addEventListener('mousedown', handleClickAway);

    return () => {
      document.removeEventListener('mousedown', handleClickAway);
    };
  }, [onClickAway, ref]);

  // handlers

  return <div ref={ref}>{children}</div>;
}

export { ClickAwayListener };
