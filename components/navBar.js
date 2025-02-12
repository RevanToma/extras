'use client';
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
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from './ui/sheet';
import { EllipsisVertical } from 'lucide-react';
import ChasNewsIcon from './chas-news-icon';
import Search from './search';
import ProgressScroll from './progress-scroll';
import { categories } from '@/lib/constants';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className='sticky top-0 z-50 opacity-95'>
      <ProgressScroll />

      <Menubar className='p-4 w-full flex justify-between items-center py-4 h-fit border-none'>
        <nav className='md:hidden'>
          <Sheet>
            <SheetTrigger className='align-middle'>
              <EllipsisVertical />
            </SheetTrigger>
            <SheetContent className='flex flex-col' side='left'>
              <div className='flex flex-col gap-5'>
                <Link href='/'>
                  <ChasNewsIcon size={50} />
                </Link>
                <SheetTitle className='border-b w-full'>Categories</SheetTitle>
              </div>
              {categories.map((category) => (
                <SheetTitle key={category}>
                  <Link
                    href={`/categories/${category}`}
                    className='flex items-center gap-2 py-2 capitalize'
                  >
                    {pathname === `/categories/${category}` && <span>🔹</span>}
                    {category}
                  </Link>
                </SheetTitle>
              ))}
              <ModeToggle />
            </SheetContent>
          </Sheet>
        </nav>
        <div className='flex items-center gap-4'>
          {/* <Image
            src='/newlogo.webp'
            alt='Chas News Logo'
            width={40}
            height={40}
          /> */}
          <Link href='/' className='hidden md:flex'>
            <ChasNewsIcon size={60} />
          </Link>

          <Link href='/' className='hidden md:flex text-2xl font-bold '>
            Chas News
          </Link>
        </div>
        <Search />
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
              className={`${
                pathname.includes('/bookmarks') ? 'border-b-2' : ''
              }`}
            >
              Bookmarks
            </Link>

            <ModeToggle />
          </div>
        </MenubarMenu>
      </Menubar>
    </header>
  );
}
