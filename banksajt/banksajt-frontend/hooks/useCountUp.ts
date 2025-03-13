'use client';
import { useState, useEffect } from 'react';

const useCountUp = (end: number, duration = 1.5) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = Math.ceil(end / (duration * 60));

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(counter);
        setCount(end);
      } else {
        setCount(start);
      }
    }, 1000 / 60);

    return () => clearInterval(counter);
  }, [end]);

  return count;
};

export default useCountUp;
