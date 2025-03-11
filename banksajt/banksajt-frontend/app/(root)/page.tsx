import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center h-screen p-6 gap-4'>
      <h1
        className='text-5xl font-semibold tracking-widest bg-gradient-to-r from-emerald-300 to-sky-400 
            bg-clip-text text-transparent
            '
      >
        Welcome to MoneyMate
      </h1>
      <p className='text-lg text-muted-foreground '>
        Manage your finances with ease. Secure transactions, real-time updates,
        and effortless banking—all at your fingertips.
      </p>

      <Button
        asChild
        size='lg'
        className='relative overflow-hidden bg-gradient-to-r
         from-emerald-400 to-sky-500 hover:from-emerald-500 hover:to-sky-800 transition duration-300
         text-secondary text-lg font-semibold tracking-wider
         
         '
      >
        <Link href='/sign-up'>Get Started</Link>
      </Button>
    </div>
  );
}
