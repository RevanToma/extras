import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { GoogleGenerativeAI } from '@google/generative-ai';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export const summarizeWithGemini = async (articleContent) => {
  if (!articleContent) return 'No content available to summarize.';

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `Summarize the following news article in a few sentences:\n\n"${articleContent}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text(); // ✅ Extract the summary

    return summary || 'Summary unavailable.';
  } catch (error) {
    console.error('❌ Gemini API Error:', error);
    return 'Failed to summarize article.';
  }
};

export const truncateText = (text, maxLength = 1000) => {
  if (!text) return 'No content available to summarize.';
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};
