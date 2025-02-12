'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const ProgressScroll = ({
  vertical = false,
  hideOnSmallScreens,
  className,
}) => {
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
      className={cn(
        `${
          hideOnSmallScreens ? 'hidden lg:block' : ''
        }  h-2 absolute bg-gradient-to-r from-blue-500 to-purple-500 transition-all animate-pulse shadow-md backdrop-blur-sm z-50 `,
        className
      )}
      style={{
        width: vertical ? '2px' : `${scrollProgress}%`,
        height: vertical ? `${scrollProgress}%` : '3px',
      }}
    >
      {vertical && (
        <div className='absolute left-0 w-4 h-4 bg-purple-500 rounded-full bottom-0 -translate-x-2'></div>
      )}
    </div>
  );
};

export default ProgressScroll;
