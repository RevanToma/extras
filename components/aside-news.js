import Link from 'next/link';
import { Button } from './ui/button';

const AsideNews = ({ news, category }) => {
  return (
    <aside className=' lg:border-l pl-2 sticky top-20 lg:h-[calc(100vh-10rem)] overflow-hidden '>
      {category ? (
        <h2 className='text-xl font-semibold mb-4'>
          Recent {category.charAt(0).toUpperCase() + category.slice(1)} News
        </h2>
      ) : (
        <h1 className='text-3xl font-bold mb-4 '>Recent News</h1>
      )}

      <ul className='space-y-3'>
        {news.slice(0, 6).map((article) => (
          <li key={article.article_id} className='border-b p-1 '>
            <Button asChild variant='link'>
              <Link href={article.link} target='_blank' className='w-fit px-0'>
                {article.title}
              </Link>
            </Button>
            <p className='text-xs text-muted-foreground'>{article.pubDate}</p>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AsideNews;
