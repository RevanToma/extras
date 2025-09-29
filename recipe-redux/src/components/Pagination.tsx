import { FC } from 'react';

interface PaginationProps {
  total: number;
  limit: number;
  page: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = ({
  total,
  limit,
  page,
  onPageChange,
}) => {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const pagesToShow = 5;
  const half = Math.floor(pagesToShow / 2);
  let start = Math.max(1, page - half);
  const end = Math.min(totalPages, start + pagesToShow - 1);
  start = Math.max(1, end - pagesToShow + 1);

  if (totalPages === 1) return null;

  return (
    <div className='flex items-center justify-center space-x-2 mt-6'>
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className='px-3 py-1 rounded border bg-white disabled:opacity-50'
      >
        Prev
      </button>

      {Array.from({ length: end - start + 1 }, (_, i) => start + i).map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 rounded border ${
            p === page ? 'bg-blue-600 text-white' : 'bg-white'
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className='px-3 py-1 rounded border bg-white disabled:opacity-50'
      >
        Next
      </button>
    </div>
  );
};
