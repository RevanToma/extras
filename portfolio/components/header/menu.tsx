'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { EllipsisVertical } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { BiUser } from 'react-icons/bi';

const Menu = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  return (
    <div className='flex justify-end gap-3 text-white'>
      <nav className='hidden md:flex w-full max-w-xs gap-1'>
        <div className='space-x-2'>
          <Button asChild variant={'ghost'}>
            <Link href={'/admin'}>
              <BiUser /> {isAuthenticated ? 'Admin Dashboard' : 'Login'}
            </Link>
          </Button>
        </div>
      </nav>
      <nav className='md:hidden'>
        <Sheet>
          <SheetTrigger className='align-middle'>
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent className='flex flex-col items-start'>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
