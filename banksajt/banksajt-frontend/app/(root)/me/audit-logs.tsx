import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { AuditLogs as AuditLogType } from '@/types';
import { useMemo } from 'react';

const AuditLogsSheet = ({ auditLogs }: { auditLogs: AuditLogType[] }) => {
  const sortedLogs = useMemo(() => {
    return [...auditLogs].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [auditLogs]);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' className='cursor-pointer'>
          View Account Activity
        </Button>
      </SheetTrigger>
      <SheetContent side='right' className='w-80 p-4 '>
        <SheetTitle className='text-xl font-semibold mb-3 '>
          Account Activity
        </SheetTitle>

        {sortedLogs.length > 0 ? (
          <ul className='overflow-y-auto divide-y divide-muted-foreground '>
            {sortedLogs.map((log, index) => (
              <li
                key={index}
                className='py-3 flex justify-between items-center text-sm sm:text-base '
              >
                <span>{new Date(log.date).toLocaleString()}</span>
                <span className='font-medium'>{log.action}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-gray-500 text-center'>
            No account activity recorded.
          </p>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default AuditLogsSheet;
