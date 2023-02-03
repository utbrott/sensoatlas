import { useEffect, useLayoutEffect, useRef } from 'react';

const useBrowserLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const useTimeout = (callback: () => void, delay: number | null) => {
  const fnCallback = useRef(callback);

  useBrowserLayoutEffect(() => {
    fnCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay && delay !== 0) {
      return;
    }

    const timeout = setTimeout(() => fnCallback.current(), delay);

    return () => clearTimeout(timeout);
  }, [delay]);
};
