'use client';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Search = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      router.push(`/search?q=${query}`);
      setQuery('');
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <div className='flex w-full max-w-sm items-center space-x-2'>
        <Input
          type='text'
          placeholder='Search articles...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='md:w-[100] lg:w-[300px]'
        />
        <Button type='submit'>
          <SearchIcon />
        </Button>
      </div>
    </form>
  );
};

export default Search;
