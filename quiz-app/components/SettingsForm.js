import { useEffect, useState } from 'react';
import { useTrivia } from '../context/QuizContext';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from './ui/button';
import LoadingPage from '../pages/loading';
import { Loader } from 'lucide-react';
import MotionDiv from './motion-div';

export default function SettingForm() {
  const {
    fetchQuestions,
    quizStarted,
    loading,
    loadingCategories,
    categories,
    setQuizStarted,
  } = useTrivia();
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const route = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/') {
      setQuizStarted(false);
    }
  }, [pathname]);

  const handleSelection = async (e) => {
    e.preventDefault();

    await fetchQuestions({ category, difficulty });

    route.push('/quiz-page');
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <MotionDiv>
      {!quizStarted && (
        <div className='max-w-md mx-auto p-6 rounded-lg shadow-lg border'>
          <h2 className='text-xl font-semibold text-center mb-4'>
            Quiz Setting
          </h2>
          <form onSubmit={handleSelection}>
            <label className='block mb-2 font-medium'>Category:</label>
            {loadingCategories && <Loader className='w-4- h-4 animate-spin' />}

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='w-full p-2 border rounded-lg mb-4'
              disabled={loadingCategories}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <label className='block mb-2 font-medium'>Difficulty:</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className='w-full p-2 border rounded-lg mb-4'
            >
              <option value='easy'>Easy</option>
              <option value='medium'>Medium</option>
              <option value='hard'>Hard</option>
            </select>

            <Button type='submit' className='w-full'>
              Start Quiz
            </Button>
          </form>
        </div>
      )}
    </MotionDiv>
  );
}
