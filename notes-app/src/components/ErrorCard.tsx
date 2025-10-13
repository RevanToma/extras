import { Card, CardContent } from '@/components/ui/card';

interface ErrorCardProps {
  message: string;
  action?: React.ReactNode;
}

export function ErrorCard({ message, action }: ErrorCardProps) {
  return (
    <Card>
      <CardContent className='py-8 text-center'>
        <p className='text-red-500'>{message}</p>
        {action}
      </CardContent>
    </Card>
  );
}
