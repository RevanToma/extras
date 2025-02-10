'use client';
import { useTrivia } from '../context/QuizContext'; // Importera QuizContext
import { usePlayerContext } from '../pages/api/PlayerContext'; // Importera PlayerContext
import { useEffect } from 'react';
import { useRouter } from 'next/router'; // Importera useRouter
import { Button } from './ui/button';
import MotionDiv from './motion-div';
export default function Results() {
  const { questions, resetGame, score, userAnswers } = useTrivia(); // Hämta userAnswers från TriviaContext
  const { playerName, addHighScore } = usePlayerContext(); // Hämta spelardata från PlayerContext
  const router = useRouter(); // Använd useRouter för routning

  // Spara högsta poäng när komponenten renderas
  useEffect(() => {
    if (playerName && score > 0) {
      addHighScore(playerName, score); // Spara spelarens namn och poäng
    }
  }, [playerName, score, addHighScore]);

  // Hantera "Restart Quiz"-knappen
  const handleRestartQuiz = () => {
    resetGame(); // Återställ quizet
    router.push('/'); // Omdirigera till quiz-sidan
  };

  return (
    <MotionDiv className='max-w-3xl mx-auto p-2 border rounded-lg text-center'>
      <h2 className='text-2xl font-semibold text-center mb-4 pb-4'>
        Quiz Results
      </h2>

      <p className='text-center text-gray-700'>
        You answered {score} out of {questions.length} questions correctly.
      </p>

      <div className='mt-10'>
        <h3 className='text-xl font-semibold mb-4'>Your Answers:</h3>
        {questions.map((question, index) => (
          <div key={index} className='mb-4'>
            <p className='font-medium'>{question.question}</p>
            <p className='text-gray-600'>
              Your answer: {userAnswers[index]}
              {userAnswers[index] === question.correct_answer ? (
                <span className='text-green-600'> (Correct)</span>
              ) : (
                <span className='text-red-600'> (Incorrect)</span>
              )}
            </p>
            <p className='text-gray-600'>
              Correct answer: {question.correct_answer}
            </p>
          </div>
        ))}
      </div>

      <div className='mt-10 text-center'>
        <Button onClick={handleRestartQuiz}>Restart Quiz</Button>
      </div>
    </MotionDiv>
  );
}
