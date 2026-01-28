import { useState, useEffect } from 'react';

export type DebounceReturnType = {
  value: string;
  isLoading: boolean;
}

export function useDebounce(value: string, delay: number): DebounceReturnType {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
        setIsLoading(false);
      }, delay);

      return () => {
        setIsLoading(true);
        clearTimeout(handler);
      };
    },
    [value, delay]
  );

  return { value: debouncedValue, isLoading};
}