export const fetchNews = async (category = 'top', query = '') => {
  try {
    const endpoint = query
      ? `/api/search?q=${query}`
      : `/api/news?category=${category}`;

    const response = await fetch(endpoint);

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
