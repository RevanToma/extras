'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ModeToggle } from './mode-toggle';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import Logo from './logo';

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer
      className={cn(
        'w-full p-6 text-center transition-all duration-300 my-10',
        theme === 'dark'
          ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300'
          : 'bg-white text-gray-700 border-t border-gray-200'
      )}
    >
      <div className='max-w-6xl mx-auto flex flex-col sm:flex-col md:flex-row lg:flex-row items-center justify-between gap-4'>
        <div className='text-center md:text-left'>
          <Logo />
          <p className='text-sm mt-1 text-muted-foreground'>
            Your trusted financial partner.
          </p>
        </div>
        <div className='flex gap-6 text-sm'>
          <Link href='/about' className='hover:text-primary transition'>
            About
          </Link>
          <Link href='/faq' className='hover:text-primary transition'>
            FAQ
          </Link>
          <Link href='/support' className='hover:text-primary transition'>
            Support
          </Link>
          <Link href='/privacy' className='hover:text-primary transition'>
            Privacy
          </Link>
        </div>
        <div className='flex flex-col sm:flex-col md:flex-row lg:flex-row gap-3 items-center'>
          <Button
            asChild
            size='sm'
            className='text-secondary bg-gradient-to-r from-emerald-400 to-sky-500 hover:from-emerald-500 hover:to-sky-800'
          >
            <Link href='/sign-up'>Get Started</Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
      <div className='text-center text-xs text-muted-foreground mt-6 pt-4'>
        ©2025 MoneyMate. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
