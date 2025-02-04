'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MainNav from './main-nav';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem('isAuthenticated');
      if (auth !== 'true') {
        router.push('/admin/login');
      }
    }
  }, [router]);

  return (
    <>
      <div className='flex flex-col'>
        <div className='border-b container mx-auto'>
          <div className='flex items-center h-16 px-4'>
            <Link href={'/'} className='w-22'>
              <Image
                src={'/logo.svg'}
                height={48}
                width={48}
                alt='porfolio logo'
              />
            </Link>
            <MainNav className='mx-6' />
            <div className='ml-auto items-center flex space-x-4'></div>
          </div>
        </div>
        <div className='flex-1 space-y-4 p-8 pt-6 container mx-auto'>
          {children}
        </div>
      </div>
    </>
  );
}
