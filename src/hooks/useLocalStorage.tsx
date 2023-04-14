import { useState, useEffect } from "react";

const useLocalStorage = (
  key: string,
  initialValue: string
): [string, (value: string) => void] => {
  const [storedValue, setStoredValue] = useState<string>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? item : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, storedValue);
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  const setValue = (value: string) => {
    setStoredValue(value);
  };

  return [storedValue, setValue];
};

export { useLocalStorage };
