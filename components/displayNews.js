'use client';

import { useEffect, useState } from 'react';
import { fetchNews } from '@/lib/fetchNews';
import NewsCard from './news-card';
import AsideNews from './aside-news';
import LoadingSkeleton from '@/app/loading';
import TrendingNews from './tranding-news';

const DisplayNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNews = async () => {
      const articles = await fetchNews('other');

      const sortedNews = articles.sort(
        (a, b) => new Date(b.pubDate) - new Date(a.pubDate)
      );
      setNews(sortedNews);
      setLoading(false);
    };

    getNews();
  }, []);

  if (loading) return <LoadingSkeleton />;

  return (
    <main
      className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mt-3 
    '
    >
      <section className='lg:col-span-2 px-2'>
        <h1 className='text-3xl font-bold mb-4 pl-1'>🔥 Trending News</h1>
        <TrendingNews />
        <h1 className='text-3xl font-bold mb-4 pl-1 mt-5'>🆕 Latest News</h1>
        <div className='grid grid-cols-1 md:grid-cols-1 gap-6'>
          {news.map((article) => (
            <NewsCard key={article.article_id} article={article} />
          ))}
        </div>
      </section>
      <AsideNews news={news} />
    </main>
  );
};
export default DisplayNews;
