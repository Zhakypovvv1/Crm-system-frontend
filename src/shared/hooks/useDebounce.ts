import { useState, useEffect } from 'react';

const useDebounce = <T,>(value: T, delay: number = 1000): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [delay, value]);
  return debouncedValue;
};

export default useDebounce;
