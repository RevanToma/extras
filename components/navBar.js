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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { EllipsisVertical } from 'lucide-react';

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

  return (
    <Menubar className='p-5w-full flex justify-between items-center px-6 py-4 h-fit sticky top-0 z-10'>
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
        <div className='hidden lg:flex items-center pr-10 gap-3'>
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
        <nav className='md:hidden'>
          <Sheet>
            <SheetTrigger className='align-middle'>
              <EllipsisVertical />
            </SheetTrigger>
            <SheetContent className='flex flex-col '>
              <div className='flex  items-center gap-10'>
                <SheetTitle>Menu</SheetTitle>
                <ModeToggle />
              </div>
              {categories.map((category) => (
                <SheetTitle key={category}>
                  <Link
                    href={`/categories/${category}`}
                    className={
                      `w-full  py-2 capitalize` +
                      (pathname === `/categories/${category}`
                        ? ' border-b-2'
                        : '')
                    }
                  >
                    {category}
                  </Link>
                </SheetTitle>
              ))}
              <SheetDescription></SheetDescription>
            </SheetContent>
          </Sheet>
        </nav>
      </MenubarMenu>
    </Menubar>
  );
}
