import { fetchAndCacheNews } from '@/lib/newsApi';

export async function GET() {
  try {
    const trendingArticles = await fetchAndCacheNews(
      '?category=top',
      'trending'
    );
    return new Response(JSON.stringify(trendingArticles.slice(0, 5)), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
