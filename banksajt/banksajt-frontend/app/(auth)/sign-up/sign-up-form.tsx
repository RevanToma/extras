'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFormStatus } from 'react-dom';
import { signUpAction } from '@/actions/user.actions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SignUpForm = () => {
  const { pending } = useFormStatus(),
    [error, setError] = useState<string | null>(null),
    router = useRouter();

  const handleSignUp = async (formData: FormData) => {
    setError(null);

    const { error } = await signUpAction(formData);

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
        action={handleSignUp}
      >
        <h2 className='text-2xl font-bold'>Sign Up</h2>
        {error && <p className='text-red-500'>{error}</p>}

        <div className='flex flex-col gap-5'>
          <Input type='text' placeholder='Username' name='username' />
          <Input type='password' placeholder='Password' name='password' />
        </div>
        <Button
          type='submit'
          disabled={pending}
          className='cursor-pointer w-full'
        >
          {pending ? 'Creating account...' : 'Sign Up'}
        </Button>
      </form>
      <div>
        <span>Already have an account?</span>
        <Button asChild variant={'link'} className='p-2'>
          <Link href='/sign-in'>Sign In</Link>
        </Button>
      </div>
    </div>
  );
};
export default SignUpForm;
