import { Search, X } from 'lucide-react';
import { FC } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export const SearchBar: FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
}) => {
  return (
    <div className='relative max-w-md mx-auto'>
      <div className='relative flex items-center '>
        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
        <input
          type='text'
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder='Sök efter recept...'
          className='w-full pl-10 pr-10 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
        />
        {value.length > 0 && (
          <button
            type='button'
            aria-label='Rensa sökning'
            title='Rensa'
            onClick={() => onChange('')}
            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1'
          >
            <X className='w-4 h-4' />
          </button>
        )}
      </div>
      <button
        onClick={onSearch}
        className='mt-3 w-full bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 transition-colors font-medium'
      >
        Sök recept
      </button>
    </div>
  );
};
