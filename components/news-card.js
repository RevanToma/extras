'use client';

import { useBookmarks } from '@/context/bookmarkContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { categoryFallbacks } from '@/lib/constants';
import { useState } from 'react';
import { summarizeWithGemini, truncateText } from '@/lib/utils';
import { BookMarked, EllipsisVertical, Loader, Star } from 'lucide-react';
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from './ui/menubar';

export default function NewsCard({ article }) {
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();
  const isBookmarked = bookmarks.some(
    (b) => b.article_id === article.article_id
  );
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const [imgSrc, setImgSrc] = useState(
    article.image_url ||
      categoryFallbacks[article.category?.[0]] ||
      categoryFallbacks.default
  );

  const handleSummarize = async () => {
    if (summary) return;

    setLoading(true);
    try {
      const truncatedContent = truncateText(article.description, 1000);

      const data = await summarizeWithGemini(truncatedContent);

      setSummary(data);
    } catch (error) {
      console.error('❌ Error fetching summary:', error);
    }
    setLoading(false);
  };

  const NewsCardActions = () => {
    return (
      <Menubar className='absolute right-0 -translate-y-1 bg-transparent border-none p-0 focus:bg-transparent'>
        <MenubarMenu>
          <div>
            <MenubarTrigger className='cursor-pointer focus:bg-transparent'>
              <EllipsisVertical className='rotate-90' />
            </MenubarTrigger>
            <MenubarContent className='flex flex-col gap-2'>
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
              <Button asChild variant='outline'>
                <Link href={article.link} target='_blank'>
                  Read more
                </Link>
              </Button>

              <Button
                onClick={handleSummarize}
                disabled={loading || summary}
                variant='secondary'
              >
                {loading ? 'Summarizing...' : 'Summarize'}
              </Button>
            </MenubarContent>
          </div>
        </MenubarMenu>
      </Menubar>
    );
  };

  return (
    <Card className='relative border rounded-lg shadow flex flex-col gap-3 px-2'>
      <CardHeader className='h-[180px] p-0 '>
        {isBookmarked && (
          <Star className='absolute top-2' fill='#FFD700 ' stroke='none' />
        )}
        <NewsCardActions />

        <Image
          src={imgSrc}
          width={300}
          height={200}
          alt='News'
          className='w-full h-full object-cover rounded-md '
          onError={() => setImgSrc(categoryFallbacks.default)}
        />
      </CardHeader>
      <CardContent>
        <CardTitle className='text-lg line-clamp-2'>{article.title}</CardTitle>
        <CardDescription className='text-sm mt-3 line-clamp-2 '>
          {!article.description
            ? 'No description available'
            : article.description}
        </CardDescription>
        {loading && (
          <>
            <span>Summarizing</span>{' '}
            <Loader className='h-4 w-4 animate-spin mx-auto mt-5' />
          </>
        )}
        {summary && (
          <p className='mt-2 text-sm bg-secondary p-2 rounded-md'>{summary}</p>
        )}
      </CardContent>
    </Card>
  );
}
