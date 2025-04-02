import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getAuditLogs, signOutUser } from '@/actions/user.actions';
import { cookies } from 'next/headers';
import AuditLogsSheet from '@/app/(root)/me/audit-logs';
import { ModeToggle } from './mode-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { User } from 'lucide-react';
import StyledNavBar from './styled-navbar';
import Logo from './logo';

const Navbar = async () => {
  const token = (await cookies()).get('token')?.value,
    isAuthenticated = !!token;

  let auditLogs = { logs: [] };

  if (isAuthenticated) {
    auditLogs = await getAuditLogs();
  }

  return (
    <StyledNavBar>
      <Logo />
      <div className='flex gap-4'>
        {isAuthenticated ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' className='cursor-pointer '>
                  <User className='text-primary' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align='end'
                className='flex flex-col gap-2 py-2 '
              >
                <DropdownMenuItem asChild>
                  <Button>
                    <Link href='/me'>Dashboard</Link>
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Button variant='secondary'>
                    <Link href='/scheduled-payments'>Scheduled Deposits</Link>
                  </Button>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <AuditLogsSheet auditLogs={auditLogs.logs} />
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Button>
                    <Link href='/loan'>Request Loan</Link>
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Button
                    variant='destructive'
                    onClick={signOutUser}
                    className='cursor-pointer'
                  >
                    Sign Out
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Button asChild>
              <Link href='/sign-in'>Sign In</Link>
            </Button>
          </>
        )}
        <ModeToggle />
      </div>
    </StyledNavBar>
  );
};

export default Navbar;
