import Link from 'next/link';
import Image from 'next/image';

import Menu from './menu';

const Header = () => {
  return (
    <header className='w-full border-b border-[#141414]'>
      <div className='flex justify-between p-5 w-full'>
        <div className='flex-start'>
          <Link href={'/'} className='flex items-center '>
            <Image
              src='/logo.svg'
              alt={`Porfolio logo`}
              width={48}
              height={48}
              priority
            />
          </Link>
        </div>
        <Menu />
      </div>
    </header>
  );
};

export default Header;
