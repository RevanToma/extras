'use client';
import Image from 'next/image';
import Link from 'next/link';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from './ui/menubar';
import { ModeToggle } from './toggle-mode';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const categories = [
  'business',
  'sports',
  'technology',
  'entertainment',
  'health',
  'science',
];

export default function Navbar() {
  const pathname = usePathname();

  console.log('pathname', pathname);
  return (
    <Menubar className='flex justify-between items-center px-6 py-2 h-fit sticky top-0 z-10'>
      <div className='flex items-center gap-4'>
        <Image
          src='/newlogo.webp'
          alt='Chas News Logo'
          width={40}
          height={40}
        />
        <Link href='/' className='text-2xl font-bold'>
          Chas News
        </Link>
      </div>
      <MenubarMenu>
        <div className='flex items-center pr-10 gap-3'>
          <MenubarTrigger
            className={`cursor-pointer px-4 py-2 rounded-md transition-all 
              ${pathname.startsWith('/categories') ? 'border-b-2' : ''}`}
          >
            Categories
          </MenubarTrigger>
          <MenubarContent>
            {categories.map((category) => (
              <MenubarItem key={category}>
                <Link
                  href={`/categories/${category}`}
                  className={
                    `w-full px-4 py-2 capitalize` +
                    (pathname === `/categories/${category}`
                      ? ' border-b-2'
                      : '')
                  }
                >
                  {category}
                </Link>
              </MenubarItem>
            ))}
          </MenubarContent>
          <Link
            href='/bookmarks'
            className={`${pathname.includes('/bookmarks') ? 'border-b-2' : ''}`}
          >
            Bookmarks
          </Link>
          <ModeToggle />
        </div>
      </MenubarMenu>
    </Menubar>
  );
}
