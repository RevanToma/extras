import { createContext, useState, useContext, useEffect } from 'react';
import { decodeHTML } from '../lib/utils';

const TriviaContext = createContext();

const url = 'https://opentdb.com/api.php';

export const TriviaProvider = ({ children }) => {
  const [adminSettings, setAdminSettings] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedSettings = localStorage.getItem('adminSettings');
      return storedSettings
        ? JSON.parse(storedSettings)
        : { numOfQuestions: 10, questionType: 'multiple' };
    }
    return { numOfQuestions: 10, questionType: 'multiple' };
  });

  const [playerSettings, setPlayerSettings] = useState({
    category: '',
    difficulty: 'easy',
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]); // Ny state för användarens svar
  const [quizStarted, setQuizStarted] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  const resetGame = () => {
    setQuizStarted(false); //Reset quiz when game restarts
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0); // Återställ score till 0
    setUserAnswers([]); // Återställ användarens svar
  };

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);

      try {
        const response = await fetch('https://opentdb.com/api_category.php');
        const data = await response.json();

        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }

        setCategories(data.trivia_categories || []);
      } catch (error) {
        setError(error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const fetchQuestions = async (newSettings = playerSettings) => {
    setLoading(true);
    setError(null);

    const { category, difficulty } = newSettings,
      apiUrl = `${url}?amount=${adminSettings.numOfQuestions}&category=${category}&difficulty=${difficulty}&type=${adminSettings.questionType}`;

    try {
      const response = await fetch(apiUrl);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      const decodedQuestions = data.results.map((q) => ({
        ...q,
        question: decodeHTML(q.question),
        correct_answer: decodeHTML(q.correct_answer),
        incorrect_answers: q.incorrect_answers.map(decodeHTML),
      }));

      setQuestions(decodedQuestions);
      setCurrentQuestionIndex(0);
      setScore(0); // Återställ score när nya frågor hämtas
      setUserAnswers([]); // Återställ användarens svar
      setQuizStarted(true);

      // return data.results;
    } catch (error) {
      setError(error);
      console.log('error: ' + error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const answerQuestion = (answer) => {
    // Spara användarens svar
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestionIndex] = answer;
    setUserAnswers(updatedUserAnswers);

    // Kontrollera om svaret är korrekt och uppdatera score
    if (questions[currentQuestionIndex].correct_answer === answer) {
      setScore((prev) => prev + 1);
    }

    // Öka currentQuestionIndex även för sista frågan
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const updateAdminSettings = (newSettings) => {
    setAdminSettings((prevSettings) => {
      const updatedSettings = { ...prevSettings, ...newSettings };

      localStorage.setItem('adminSettings', JSON.stringify(updatedSettings));

      return updatedSettings;
    });
  };

  return (
    <TriviaContext.Provider
      value={{
        resetGame,
        fetchQuestions,
        questions,
        currentQuestionIndex,
        score,
        userAnswers, // Exportera userAnswers
        adminSettings,
        playerSettings,
        setPlayerSettings,
        setAdminSettings,
        answerQuestion,
        quizStarted,
        setQuizStarted,
        loading,
        error,
        updateAdminSettings,
        categories,
        loadingCategories,
      }}
    >
      {children}
    </TriviaContext.Provider>
  );
};

export const useTrivia = () => useContext(TriviaContext);
