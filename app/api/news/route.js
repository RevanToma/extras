import path from 'path';
import fs from 'fs';
const CACHE_DIR = path.join(process.cwd(), '.cache');
const CACHE_FILE = (category) => path.join(CACHE_DIR, `${category}.json`);

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category') || 'top';

  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR);
  }

  const cacheFilePath = CACHE_FILE(category);

  if (fs.existsSync(cacheFilePath)) {
    console.log(`📂 Serving cached news for category: ${category}`);
    const cachedData = fs.readFileSync(cacheFilePath, 'utf-8');
    return new Response(cachedData, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
  const apiUrl = process.env.NEXT_PUBLIC_NEWS_API_URL;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key is missing' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const response = await fetch(
      `${apiUrl}?apikey=${apiKey}&category=${category}&language=en`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch news, Status: ${response.status}`);
    }

    const data = await response.json();

    fs.writeFileSync(cacheFilePath, JSON.stringify(data.results || []));

    return new Response(JSON.stringify(data.results || []), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('❌ API Fetch Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to load news' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
