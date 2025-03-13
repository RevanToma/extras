import { getTotalUsers } from '@/actions/user.actions';
import LandingPage from '@/components/landing-page';
import { Button } from '@/components/ui/button';
import useCountUp from '@/hooks/useCountUp';
import Link from 'next/link';

export default async function Home() {
  const data = await getTotalUsers(),
    baseUsers = 20,
    totalUsers = baseUsers + (data || 0);

  return <LandingPage totalUsers={totalUsers} />;
}
