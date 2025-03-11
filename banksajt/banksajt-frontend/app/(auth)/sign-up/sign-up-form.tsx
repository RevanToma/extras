'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFormStatus } from 'react-dom';
import { signUpAction } from '@/actions/user.actions';
import { useRouter } from 'next/navigation';

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
    <form
      className='min-h-screen flex flex-col items-center justify-center gap-2'
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
        className='cursor-pointer'
        variant={'outline'}
      >
        {pending ? 'Creating account...' : 'Sign Up'}
      </Button>
    </form>
  );
};
export default SignUpForm;
