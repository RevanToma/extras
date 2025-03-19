'use client';
import { useActionState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface AuthFormProps {
  title: string;
  action: (
    prevState: unknown,
    formData: FormData
  ) => Promise<{ success: boolean; message: string }>;
  buttonText: string;
  linkText: string;
  linkHref: string;
  type: 'sign-in' | 'sign-up';
}

const AuthForm = ({
  title,
  action,
  buttonText,
  linkText,
  linkHref,
  type,
}: AuthFormProps) => {
  const [data, formAction] = useActionState(action, {
      success: false,
      message: '',
    }),
    router = useRouter();

  useEffect(() => {
    if (data.success) {
      router.push('/me');
    }
  }, [data, router]);

  return (
    <div className='flex items-center justify-center flex-col min-h-screen gap-3'>
      <h2 className='text-2xl font-bold'>{title}</h2>
      {data && !data.success && (
        <p className='text-destructive'>{data.message}</p>
      )}
      <form
        className='flex flex-col items-center justify-center gap-2'
        action={formAction}
      >
        <div className='flex flex-col gap-5'>
          <Input
            type='text'
            placeholder='Username'
            name='username'
            autoComplete='username'
          />
          <Input
            type='password'
            placeholder='Password'
            name='password'
            autoComplete='current-password'
          />
        </div>
        <AuthButton text={buttonText} type={type} />
      </form>
      <div>
        <span>{linkText}</span>
        <Button asChild variant={'link'} className='p-2'>
          <Link href={linkHref}>
            {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
          </Link>
        </Button>
      </div>
    </div>
  );
};

const AuthButton = ({
  text,
  type,
}: {
  text: string;
  type: 'sign-in' | 'sign-up';
}) => {
  const { pending } = useFormStatus();
  return (
    <Button variant={'default'} className='w-full' disabled={pending}>
      {pending && type === 'sign-up'
        ? 'Signing Up...'
        : pending && type === 'sign-in'
        ? 'Signing In...'
        : text}
    </Button>
  );
};

export default AuthForm;
