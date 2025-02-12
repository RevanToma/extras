import Link from 'next/link';
import { Button } from './ui/button';
import ProgressScroll from './progress-scroll';

const AsideNews = ({ news, category }) => {
  return (
    <aside className='lg:border-l border-gray-300 pl-2 sticky top-20 lg:h-[calc(100vh-10rem)] overflow-x-hidden w-full relative'>
      <ProgressScroll className='left-0' vertical hideOnSmallScreens />
      {category ? (
        <h2 className='text-xl font-semibold mb-4'>
          Recent {category.charAt(0).toUpperCase() + category.slice(1)} News
        </h2>
      ) : (
        <h1 className='text-3xl font-bold mb-4 '>Recent News</h1>
      )}

      <ul className='space-y-3'>
        {news.slice(0, 7).map((article) => (
          <li key={article.article_id} className='border-b p-1 '>
            <Button asChild variant='link' className='px-0'>
              <Link href={article.link} target='_blank'>
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
