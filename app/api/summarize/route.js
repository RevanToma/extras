import { summarizeWithGemini } from '@/lib/utils';

export async function POST(req) {
  try {
    const { articleContent } = await req.json();

    if (!articleContent) {
      return new Response(
        JSON.stringify({ error: 'Missing article content' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const summary = await summarizeWithGemini(articleContent);

    return new Response(JSON.stringify({ summary }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('❌ Gemini API Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to summarize article' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
