import SkeletonCard from '@/components/skeleton-card';
import { cn } from '@/lib/utils';

const LoadingSkeleton = ({ className }) => {
  return (
    <main className='max-w-7xl mx-auto p-6'>
      <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-6', className)}>
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </main>
  );
};

export default LoadingSkeleton;
