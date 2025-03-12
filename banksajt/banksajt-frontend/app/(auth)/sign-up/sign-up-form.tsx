'use client';
import { useActionState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFormStatus } from 'react-dom';
import { signUpAction } from '@/actions/user.actions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SignUpForm = () => {
  const [data, action] = useActionState(signUpAction, {
      success: false,
      message: '',
    }),
    router = useRouter();

  const SignUpButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button variant={'default'} className='w-full' disabled={pending}>
        {pending ? 'Signin In...' : 'Sign In'}
      </Button>
    );
  };

  useEffect(() => {
    if (data.success) {
      router.push('/me');
    }
  }, [data, router]);
  return (
    <div className='flex items-center justify-center flex-col min-h-screen gap-3'>
      <h2 className='text-2xl font-bold '>Sign Up</h2>
      {data && !data.success && (
        <p className='text-destructive'>{data.message}</p>
      )}
      <form
        className=' flex flex-col items-center justify-center gap-2 '
        action={action}
      >
        <div className='flex flex-col gap-5'>
          <Input type='text' placeholder='Username' name='username' />
          <Input type='password' placeholder='Password' name='password' />
        </div>
        <SignUpButton />
      </form>
      <div>
        <span>Already have an account?</span>
        <Button asChild variant={'link'} className='p-2 '>
          <Link href='/sign-in'>Sign In</Link>
        </Button>
      </div>
    </div>
  );
};
export default SignUpForm;
