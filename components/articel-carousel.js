'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useBookmarks } from '@/context/bookmarkContext';
import { categoryFallbacks } from '@/lib/constants';
import { fetchNews } from '@/lib/fetchNews';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { Button } from './ui/button';

const ArticelCarousel = () => {
  const [articles, setArticles] = useState([]);
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();

  useEffect(() => {
    const loadArticles = async () => {
      const news = await fetchNews('politics');
      setArticles(news.slice(0, 10));
    };
    loadArticles();
  }, []);

  return (
    <section className='mt-10 flex flex-col items-center'>
      <h2 className='text-3xl font-semibold mb-4'>More Articles</h2>
      <Carousel className='w-11/12'>
        <CarouselContent>
          {articles.map((article) => {
            const isBookmarked = bookmarks.some(
              (b) => b.article_id === article.article_id
            );
            return (
              <Fragment key={article.article_id}>
                <CarouselItem className='sm:basis-1/2 md:basis-1/3 lg:basis-1/4'>
                  <Card className='flex flex-col p-2 h-[280px]'>
                    <CardContent className='p-0 flex flex-col h-full justify-between'>
                      <Link
                        href={article.link}
                        target='_blank'
                        className='block'
                      >
                        <Image
                          src={
                            article.image_url ||
                            categoryFallbacks[article.category?.[0]] ||
                            categoryFallbacks.default
                          }
                          width={200}
                          height={200}
                          alt='Article'
                          className='w-full h-28 object-cover '
                        />
                        <div className='p-4 flex flex-col gap-3'>
                          <h3 className='text-lg font-semibold line-clamp-2 h-[50px]'>
                            {article.title}
                          </h3>
                          <p className='text-sm text-muted-foreground line-clamp-1'>
                            {article.description}
                          </p>
                        </div>
                      </Link>
                      <Button
                        variant={isBookmarked ? 'destructive' : ''}
                        onClick={() =>
                          isBookmarked
                            ? removeBookmark(article.article_id)
                            : addBookmark(article)
                        }
                        className='self-end'
                      >
                        {isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
                      </Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
              </Fragment>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className='hidden md:flex' />
        <CarouselNext className='hidden md:flex' />
      </Carousel>
    </section>
  );
};

export default ArticelCarousel;
