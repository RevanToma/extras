'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchNews } from '@/lib/fetchNews';
import NewsCard from '@/components/news-card';
import LoadingSkeleton from '@/app/loading';

const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;

    const getSearchResults = async () => {
      const articles = await fetchNews('top', query);
      setNews(articles);
      setLoading(false);
    };

    getSearchResults();
  }, [query]);

  if (loading) return <LoadingSkeleton />;

  return (
    <main className='max-w-7xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-4'>
        Found {news.length} Search Results for "{query}"
      </h1>
      {news.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {news.map((article) => (
            <NewsCard key={article.article_id} article={article} />
          ))}
        </div>
      )}
    </main>
  );
};

export default SearchResultsPage;
