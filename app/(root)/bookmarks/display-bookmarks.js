'use client';
import NewsCard from '@/components/news-card';
import { useBookmarks } from '@/context/bookmarkContext';

export default function DisplayBookmakrs() {
  const { bookmarks } = useBookmarks();

  return (
    <>
      {bookmarks.length === 0 ? (
        <p>No bookmarks yet.</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6'>
          {bookmarks.map((article) => (
            <NewsCard key={article.article_id} article={article} />
          ))}
        </div>
      )}
    </>
  );
}
