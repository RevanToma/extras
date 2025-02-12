'use client';
import { SearchIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Search = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      router.push(`/search?q=${query}`);
      setQuery('');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <form onSubmit={handleSearch} className='flex items-center gap-3'>
      <div
        className={`relative flex items-center transition-all duration-300 ${
          open ? 'max-w-[300px]' : 'max-w-0'
        } sm:max-w-none overflow-hidden`}
      >
        <Input
          type='text'
          placeholder='Search articles...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='w-60  focus-visible:ring-0'
        />
      </div>
      <Button onClick={() => setOpen(!open)} type='submit'>
        <SearchIcon />
      </Button>
    </form>
  );
};

export default Search;
