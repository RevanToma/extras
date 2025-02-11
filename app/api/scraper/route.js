import * as cheerio from 'cheerio';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url) {
    return new Response(JSON.stringify({ error: 'Missing article URL' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Fake a user-agent header to avoid bot detection
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    // Handle non-200 responses
    if (!response.ok) {
      console.error(
        `❌ Fetch failed: ${response.status} ${response.statusText}`
      );
      return new Response(
        JSON.stringify({
          error: `Failed to fetch article: ${response.status}`,
        }),
        {
          status: response.status,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Parse HTML response
    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract meaningful content (common article structures)
    let content =
      $('article').text() ||
      $('.post-content').text() ||
      $('.content').text() ||
      $('main').text() ||
      $('p').text();

    // If content is empty, return an error
    if (!content.trim()) {
      return new Response(JSON.stringify({ error: 'No content found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ content }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('❌ Scraping failed:', error);
    return new Response(JSON.stringify({ error: 'Failed to scrape article' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
