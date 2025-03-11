import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { signOutUser } from '@/actions/user.actions';
import { cookies } from 'next/headers';

const Navbar = async () => {
  const token = (await cookies()).get('token')?.value,
    isAuthenticated = !!token;
  return (
    <nav className='p-4 shadow-lg flex justify-between items-center'>
      <Link href='/' className='text-2xl font-bold'>
        BankSite
      </Link>
      <div className='flex gap-4'>
        {isAuthenticated ? (
          <Button
            variant='destructive'
            onClick={signOutUser}
            className='cursor-pointer'
          >
            Sign Out
          </Button>
        ) : (
          <>
            <Button asChild>
              <Link href='/sign-in'>Sign In</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
