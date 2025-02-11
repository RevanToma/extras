'use client';

import { useBookmarks } from '@/context/bookmarkContext';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { categoryFallbacks } from '@/lib/constants';

export default function NewsCard({ article }) {
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();
  const isBookmarked = bookmarks.some(
    (b) => b.article_id === article.article_id
  );

  const imageUrl =
    article.image_url ||
    categoryFallbacks[article.category?.[0]] ||
    categoryFallbacks.default;

  return (
    <Card className='2 border rounded-lg shadow flex flex-col gap-2 h-[450px] p-2'>
      <CardHeader className='h-[180px]'>
        <Image
          src={imageUrl}
          width={400}
          height={180}
          alt='News'
          className='w-full h-full object-cover rounded-md'
        />
      </CardHeader>
      <div className='flex-grow'>
        <CardTitle className='text-lg line-clamp-2'>{article.title}</CardTitle>
        <CardDescription className='text-sm mt-3 line-clamp-5 '>
          {!article.description
            ? 'No description available'
            : article.description}
        </CardDescription>
      </div>
      <CardFooter className='flex justify-between p-2'>
        <Button asChild variant='outline'>
          <Link href={article.link} target='_blank'>
            Read more
          </Link>
        </Button>
        <Button
          variant={isBookmarked ? 'destructive' : ''}
          onClick={() =>
            isBookmarked
              ? removeBookmark(article.article_id)
              : addBookmark(article)
          }
        >
          {isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
        </Button>
      </CardFooter>
    </Card>
  );
}
