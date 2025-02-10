export default async function GET(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { numOfQuestions, category, difficulty, questionType } = req.query,
      url = `https://opentdb.com/api.php?amount=${numOfQuestions}&category=${category}&difficulty=${difficulty}&type=${questionType}`,
      response = await fetch(url),
      data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch questions');
    }

    return res.status(200).json(data.results);
  } catch (error) {
    console.error('API Error:', error);
    return res
      .status(500)
      .json({ message: error.message || 'Internal Server Error' });
  }
}
