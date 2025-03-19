'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ModeToggle } from './mode-toggle';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import Logo from './logo';
import FooterNavLinks from './footer-nav-links';

const links = ['About', 'FAQ', 'Support', 'Privacy'];

const Footer = () => {
  const { theme } = useTheme();

  const currentTheme =
    theme === 'dark' || theme === 'system'
      ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300'
      : 'bg-white text-gray-900 shadow-md';

  return (
    <footer
      className={cn(
        'w-full p-6 text-center transition-all duration-300 ',
        currentTheme
      )}
    >
      <div className='max-w-6xl mx-auto flex flex-col sm:flex-col md:flex-row lg:flex-row items-center justify-between gap-6'>
        <div className='text-center md:text-left'>
          <Logo />
          <p className='text-sm mt-1 text-muted-foreground'>
            Your trusted financial partner.
          </p>
        </div>
        <div className='flex gap-6 text-sm'>
          {links.map((link) => (
            <FooterNavLinks key={link} href={`/${link.toLowerCase()}`}>
              {link}
            </FooterNavLinks>
          ))}
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
