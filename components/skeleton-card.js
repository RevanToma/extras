export default function SkeletonCard() {
  return (
    <div className='animate-pulse-fast bg-gray-200 dark:bg-gray-700 rounded-md p-4 h-[250px]'>
      <div className='w-full h-32 bg-gray-300 dark:bg-gray-600 rounded-md mb-4'></div>
      <div className='h-4 w-3/4 bg-gray-300 dark:bg-gray-600 rounded mb-2'></div>
      <div className='h-4 w-1/2 bg-gray-300 dark:bg-gray-600 rounded'></div>
    </div>
  );
}
