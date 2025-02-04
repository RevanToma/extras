'use client';
import Link from 'next/link';

const AdminPage = () => {
  return (
    <main className='min-h-screen flex flex-col items-center justify-center  text-white'>
      <h1 className='text-3xl font-bold mb-6'>Admin Dashboard</h1>
      <div className='space-y-4'>
        <Link
          href='/admin/projects'
          className='block px-6 py-3 bg-gray-800 rounded-md text-center hover:bg-gray-700'
        >
          Manage Projects
        </Link>
        <Link
          href='/admin/tech-skills'
          className='block px-6 py-3 bg-gray-800 rounded-md text-center hover:bg-gray-700'
        >
          Manage Tech Skills
        </Link>
        <button
          onClick={() => {
            localStorage.removeItem('isAuthenticated');
            window.location.href = '/';
          }}
          className='mt-4 px-4 py-2 bg-red-500 rounded-md hover:bg-red-600'
        >
          Logout
        </button>
      </div>
    </main>
  );
};

export default AdminPage;
