import { createFileRoute, Link } from '@tanstack/react-router';

type ArticleListItem = {
  id: number;
  title: string;
  slug: string;
  category?: { name: string; slug: string } | null;
};

export async function getArticles() {
  const baseUrl = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1336',
    url = `${baseUrl}/api/articles?pagination[pageSize]=100&sort=title:asc`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Failed to fetch articles');
  const json = await res.json(),
    articles: ArticleListItem[] = (json?.data || [])
      .map((item: any) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        category: null,
      }))
      .filter((a: ArticleListItem) => !!a.slug);
  return { articles };
}

export const Route = createFileRoute('/articles')({
  loader: getArticles,
  component: ArticlesPage,
});

function ArticlesPage() {
  const { articles } = Route.useLoaderData() as { articles: ArticleListItem[] };
  return (
    <div className='max-w-3xl mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>Articles</h1>
      <ul className='space-y-4'>
        {articles.map((a) => (
          <li key={a.id} className='border-b border-slate-700 pb-4'>
            <div className='flex flex-col gap-1'>
              <Link
                to='/articles/$slug'
                params={{ slug: a.slug }}
                className='text-cyan-400 hover:underline text-xl'
              >
                {a.title}
              </Link>
              {a.category?.name ? (
                <span className='text-sm text-slate-400'>
                  {a.category.name}
                </span>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
