import { createFileRoute } from '@tanstack/react-router';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

type Article = {
  id: number;
  title: string;
  slug: string;
  content: any;
  category?: { name: string; slug: string } | null;
};

export async function getArticleBySlug({
  params,
}: {
  params: { slug: string };
}) {
  const baseUrl = 'http://localhost:1336',
    url = `${baseUrl}/api/articles?filters[slug][$eq]=${encodeURIComponent(params.slug)}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Failed to fetch article');
  const json = await res.json(),
    item = json?.data?.[0];
  if (!item) throw new Response('Not Found', { status: 404 });
  const article: Article = {
    id: item.id,
    title: item.title ?? item.attributes?.title,
    slug: item.slug ?? item.attributes?.slug,
    content: item.content ?? item.attributes?.content ?? [],
    category: item.category?.data
      ? {
          name: item.category.data.attributes?.name,
          slug: item.category.data.attributes?.slug,
        }
      : item.attributes?.category?.data
        ? {
            name: item.attributes.category.data.attributes?.name,
            slug: item.attributes.category.data.attributes?.slug,
          }
        : null,
  };
  return { article };
}

export const Route = createFileRoute('/articles/$slug')({
  loader: getArticleBySlug,
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData() as { article: Article };
  return (
    <div className='max-w-3xl mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-2'>{article.title}</h1>
      {article.category?.name ? (
        <p className='text-sm text-slate-400 mb-6'>{article.category.name}</p>
      ) : null}
      <div className='prose prose-invert'>
        <BlocksRenderer
          content={Array.isArray(article.content) ? article.content : []}
        />
      </div>
    </div>
  );
}
