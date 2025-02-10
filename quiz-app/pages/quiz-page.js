import { useTrivia } from '../context/QuizContext';
import Questions from '../components/Questions';
import Results from '../components/Results';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const QuizPage = () => {
  const { questions, currentQuestionIndex, quizStarted } = useTrivia();
  const router = useRouter();

  useEffect(() => {
    if (!quizStarted) {
      router.replace('/');
    }
  }, [quizStarted, router]);

  if (!quizStarted) return null;

  // Kontrollera om frågor är tomma
  if (!questions.length) {
    return <p className='text-center text-gray-600'>No questions available.</p>;
  }

  const quizCompleted = currentQuestionIndex >= questions.length;

  return <div>{quizCompleted ? <Results /> : <Questions />}</div>;
};

export default QuizPage;
