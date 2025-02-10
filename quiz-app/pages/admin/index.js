'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminDashboard from '../../components/admin/admin-dashboard';
import LoginPage from './sign-in';

export default function AdminLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const authStatus = localStorage.getItem('isAuthenticated') === 'true';
      setIsAuthenticated(authStatus);

      if (authStatus) {
        router.push('/admin');
      }
    }
  }, []);

  return (
    <div className='flex flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6 container mx-auto'>
        {isAuthenticated ? <AdminDashboard /> : <LoginPage />}
      </div>
    </div>
  );
}
