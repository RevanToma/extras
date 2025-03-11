'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFormStatus } from 'react-dom';
import { signInAction } from '@/actions/user.actions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SignInForm = () => {
  const { pending } = useFormStatus(),
    [error, setError] = useState<string | null>(null),
    router = useRouter();

  const handleSignIn = async (formData: FormData) => {
    setError(null);

    const { error } = await signInAction(formData);

    if (error) {
      setError(error);
      return;
    }

    router.push('/me');
  };

  return (
    <div className='flex items-center justify-center flex-col min-h-screen gap-3'>
      <form
        className=' flex flex-col items-center justify-center gap-2'
        action={handleSignIn}
      >
        <h2 className='text-2xl font-bold'>Sign In</h2>
        {error && <p className='text-red-500'>{error}</p>}
        <div className='flex flex-col gap-5'>
          <Input type='text' placeholder='Username' name='username' />
          <Input type='password' placeholder='Password' name='password' />
        </div>
        <Button
          type='submit'
          disabled={pending}
          className='w-full cursor-pointer'
        >
          {pending ? 'Logging in...' : 'Login'}
        </Button>
      </form>
      <div>
        <span>Don't have an account?</span>
        <Button asChild variant={'link'} className='p-2'>
          <Link href='/sign-up'>Sign Up</Link>
        </Button>
      </div>
    </div>
  );
};

export default SignInForm;
