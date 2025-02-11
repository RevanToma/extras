import Layout from '@/components/layout';

export default function RootLayout({ children }) {
  return (
    <div className='flex h-screen flex-col'>
      <main className='flex-1 wrapper'>
        <Layout>{children}</Layout>
      </main>
    </div>
  );
}
