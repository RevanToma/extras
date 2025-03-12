import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getAuditLogs, signOutUser } from '@/actions/user.actions';
import { cookies } from 'next/headers';
import AuditLogsSheet from '@/app/(root)/me/audit-logs';

const Navbar = async () => {
  const token = (await cookies()).get('token')?.value,
    isAuthenticated = !!token,
    auditLogs = await getAuditLogs();

  return (
    <nav className='p-4 shadow-lg flex justify-between items-center '>
      <Link
        href='/'
        className='text-2xl font-bold tracking-widest bg-gradient-to-r from-emerald-300 to-sky-400 
            bg-clip-text text-transparent'
      >
        MoneyMate
      </Link>
      <div className='flex gap-4'>
        {isAuthenticated ? (
          <>
            <Button>
              <Link href='/me'>Dashboard</Link>
            </Button>

            <AuditLogsSheet auditLogs={auditLogs.logs} />
            <Button
              variant='destructive'
              onClick={signOutUser}
              className='cursor-pointer'
            >
              Sign Out
            </Button>
          </>
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
