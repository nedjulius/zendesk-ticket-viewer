import {useEffect} from 'react';

export const useScrollToTop = (dependencies: unknown[]): void =>
  useEffect(
    () => () => {
      window.scrollTo(0, 0);
    },
    dependencies
  );
