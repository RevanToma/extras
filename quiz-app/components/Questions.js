import { AnimatePresence } from 'framer-motion';
import { useTrivia } from '../context/QuizContext';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader } from './ui/card';
import { motion } from 'framer-motion';

export default function Questions() {
  const { questions, currentQuestionIndex, answerQuestion } = useTrivia();

  if (!questions.length)
    return <p className='text-center text-gray-600'>No questions available.</p>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={currentQuestionIndex}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ ease: 'easeInOut' }}
      >
        <Card className='flex flex-col items-center text-center'>
          <CardHeader className='text-2xl font-bold'>
            {currentQuestion.question}
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-2 gap-4 w-full'>
              {currentQuestion.incorrect_answers
                .concat(currentQuestion.correct_answer)
                .sort()
                .map((answer) => (
                  <Button
                    key={answer}
                    onClick={() => answerQuestion(answer)}
                    className='min-w-40'
                  >
                    {answer}
                  </Button>
                ))}
            </div>
            <CardDescription className='mt-5'>
              Question: {currentQuestionIndex + 1} of {questions.length}
            </CardDescription>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
