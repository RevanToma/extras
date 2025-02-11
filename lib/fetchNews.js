export const fetchNews = async (category = 'top') => {
  try {
    const response = await fetch(`/api/news?category=${category}`);

    if (!response.ok) {
      throw new Error(`❌ Failed to fetch news, Status: ${response.status}`);
    }

    const data = await response.json();

    return data || [];
  } catch (error) {
    console.error('❌ Error fetching news from Next.js API:', error);
    return [];
  }
};
