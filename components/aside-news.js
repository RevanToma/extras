import Link from 'next/link';

const AsideNews = ({ news, category }) => {
  return (
    <aside className='border-l pl-4 sticky top-20 h-[calc(100vh-5rem)] overflow-auto'>
      {category ? (
        <h2 className='text-xl font-semibold mb-4'>
          Recent {category.charAt(0).toUpperCase() + category.slice(1)} News
        </h2>
      ) : (
        <h1 className='text-3xl font-bold mb-4'>Recent News</h1>
      )}

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
  );
};

export default AsideNews;
