'use client';

import { useEffect, useState } from 'react';
import { fetchNews } from '@/lib/fetchNews';
import NewsCard from './news-card';
import LoadingPage from '@/app/loading';
import Link from 'next/link';

export default function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNews = async () => {
      const articles = await fetchNews();

      const sortedNews = articles.sort(
        (a, b) => new Date(b.pubDate) - new Date(a.pubDate)
      );
      setNews(sortedNews);
      setLoading(false);
    };

    getNews();
  }, []);

  return (
    <main className='p-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6'>
      <section className='lg:col-span-2'>
        <h1 className='text-3xl font-bold mb-4'>Latest News</h1>
        {loading ? (
          <LoadingPage />
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {news.map((article) => (
              <NewsCard key={article.article_id} article={article} />
            ))}
          </div>
        )}
      </section>

      <aside className='border-l pl-4'>
        <h1 className='text-3xl font-bold mb-4'>Recent News</h1>

        <ul className='space-y-3'>
          {news.slice(0, 6).map((article) => (
            <li key={article.article_id} className='border-b pb-2'>
              <Link
                href={article.link}
                target='_blank'
                className='text-blue-500 hover:underline block'
              >
                {article.title}
              </Link>
              <p className='text-xs text-gray-500'>{article.pubDate}</p>
            </li>
          ))}
        </ul>
      </aside>
    </main>
  );
}
