import { FC } from 'react';
import { SearchBar } from './SearchBar';

interface SearchSectionProps {
  value: string;
  onChange: (v: string) => void;
  onSearch: () => void;
}

export const SearchSection: FC<SearchSectionProps> = ({
  value,
  onChange,
  onSearch,
}) => {
  return (
    <div className='mb-8'>
      <div className='text-center mb-6'>
        <h2 className='text-3xl font-bold text-gray-900 mb-4'>
          Hitta dina favoritrecept
        </h2>
        <p className='text-gray-600 max-w-2xl mx-auto'>
          Sök bland tusentals recept från världens kök och spara dina favoriter
        </p>
      </div>

      <SearchBar value={value} onChange={onChange} onSearch={onSearch} />
    </div>
  );
};
