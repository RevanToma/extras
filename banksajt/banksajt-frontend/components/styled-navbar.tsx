'use client';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

const StyledNavBar = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  const currentTheme =
    theme === 'dark' || theme === 'system'
      ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 shadow-lg'
      : 'bg-gradient-to-r from-white to-gray-100 text-gray-900 shadow-md';

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
