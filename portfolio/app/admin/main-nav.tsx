'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const links = [
  {
    title: 'Projects',
    href: '/admin/projects',
  },
  {
    title: 'Tech-Skills',
    href: '/admin/tech-skills',
  },
];

const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname(),
    isAuthenticated = localStorage.getItem('isAuthenticated');

  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      {isAuthenticated &&
        links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'text-sm font-medium transition-colors hover:text-primnary text-white',
              pathname.includes(link.href) ? '' : 'text-muted-foreground'
            )}
          >
            {link.title}
          </Link>
        ))}
    </nav>
  );
};

export default MainNav;
