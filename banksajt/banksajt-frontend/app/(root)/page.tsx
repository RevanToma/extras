import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center h-screen p-6 gap-4'>
      <h1 className='text-5xl font-bold'>Welcome to BankSite</h1>
      <p className='text-lg text-muted-foreground '>
        Manage your finances with ease. Secure transactions, real-time updates,
        and effortless banking—all at your fingertips.
      </p>

      <Button asChild>
        <Link href='/sign-up'>Get Started</Link>
      </Button>
    </div>
  );
}
