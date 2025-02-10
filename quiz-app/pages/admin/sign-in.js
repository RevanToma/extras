'use client';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../hooks/use-toast';
import { Loader, Plus } from 'lucide-react';

const SignIn = () => {
  const [password, setPassword] = useState(''),
    router = useRouter(),
    { toast } = useToast(),
    [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    if (password === 'admin123') {
      localStorage.setItem('isAuthenticated', 'true');

      setTimeout(() => {
        router.push('/admin');
        location.reload();
      }, 500);
    } else {
      toast({
        description: 'Invalid Password',
      });
      setIsLoading(false);

      return;
    }
  };

  return (
    <main className='flex flex-col items-center justify-center '>
      <h1 className='h2-bold text-3xl font-bold mb-6'>Admin Login</h1>
      <Input
        type='password'
        className='p-2 border border-gray-600 rounded-md w-80'
        placeholder='Enter Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        onClick={handleLogin}
        disable={isLoading}
        type='button'
        className='mt-4'
      >
        {isLoading ? <Loader className='w-4 h-4 animate-spin' /> : 'Login'}
      </Button>
    </main>
  );
};
export default SignIn;
