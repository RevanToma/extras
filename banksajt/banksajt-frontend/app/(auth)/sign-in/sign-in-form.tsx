'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFormStatus } from 'react-dom';
import { signInAction } from '@/actions/user.actions';
import { useRouter } from 'next/navigation';

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
    <form
      className='min-h-screen flex flex-col items-center justify-center gap-2'
      action={handleSignIn}
    >
      <h2 className='text-2xl font-bold'>Login</h2>
      {error && <p className='text-red-500'>{error}</p>}
      <div className='flex flex-col gap-5'>
        <Input type='text' placeholder='Username' name='username' />
        <Input type='password' placeholder='Password' name='password' />
      </div>
      <Button type='submit' disabled={pending} className='mt-4 px-4 py-2'>
        {pending ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
};

export default SignInForm;
