import { Card, CardContent } from '@/components/ui/card';
import { Loader } from 'lucide-react';

interface LoadingCardProps {
  message?: string;
}

export function LoadingCard({ message = 'Loading...' }: LoadingCardProps) {
  return (
    <Card>
      <CardContent className='py-8 text-center'>
        <Loader className='h-10 w-10 animate-spin m-auto' />
        <p className='text-muted-foreground mt-4'>{message}</p>
      </CardContent>
    </Card>
  );
}
