'use client';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

const StyledNavBar = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  const currentTheme =
    theme === 'dark'
      ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300'
      : 'bg-white text-gray-900 shadow-md';

  return (
    <nav
      className={cn(
        'p-4 flex justify-between items-center transition-all duration-300',
        currentTheme
      )}
    >
      {children}
    </nav>
  );
};

export default StyledNavBar;
