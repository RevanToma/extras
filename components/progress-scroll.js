'use client';

import { useEffect, useState } from 'react';

const ProgressScroll = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollY = window.scrollY,
        docHeight =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;

      setScrollProgress((scrollY / docHeight) * 100);
    };
    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);
  return (
    <div
      className='md:h-1 h-2 absolute bg-gradient-to-r from-blue-500 to-purple-500
    transition-all animate-pulse shadow-md backdrop-blur-sm '
      style={{ width: `${scrollProgress}%` }}
    ></div>
  );
};

export default ProgressScroll;
