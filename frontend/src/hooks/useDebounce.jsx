import { useEffect, useState } from "react";

function useDebounce(value) {
  console.log(value);

  const [debouncedValue, setDebouncedValue] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);
  return debouncedValue;
}

export default useDebounce;
