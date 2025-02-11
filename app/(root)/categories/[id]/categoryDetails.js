'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchNews } from '@/lib/fetchNews';
import NewsCard from '@/components/news-card';
import LoadingPage from '@/app/loading';
import Link from 'next/link';

const CategoryDetailsPage = () => {
  const { id: category } = useParams();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) return;

    const getNews = async () => {
      const articles = await fetchNews(category);

      const sortedNews = articles.sort(
        (a, b) => new Date(b.pubDate) - new Date(a.pubDate)
      );

      setNews(sortedNews);
      setLoading(false);
    };

    getNews();
  }, [category]);

  if (loading) return <LoadingPage />;

  return (
    <main className='p-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6'>
      {/* Left Column: Main Category News */}
      <section className='lg:col-span-2'>
        <h1 className='text-3xl font-bold mb-4 capitalize'>{category} News</h1>
        {news.length === 0 ? (
          <p>No articles found.</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {news.map((article) => (
              <NewsCard key={article.article_id} article={article} />
            ))}
          </div>
        )}
      </section>

      <aside className='border-l pl-4'>
        <h2 className='text-xl font-semibold mb-4'>
          Recent {category.charAt(0).toUpperCase() + category.slice(1)} News
        </h2>
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
};

export default CategoryDetailsPage;
