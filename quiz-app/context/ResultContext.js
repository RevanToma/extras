import { createContext, useState, useContext } from 'react';

const ResultContext = createContext();

export const ResultProvider = ({ children }) => {
    const [userAnswers, setUserAnswers] = useState([]); // Användarens svar
    const [score, setScore] = useState(0); // Antal rätt svar

    // Funktion för att lägga till ett svar och uppdatera poäng
    const addAnswer = (answer, isCorrect) => {
        setUserAnswers((prev) => [...prev, answer]);
        if (isCorrect) {
            setScore((prev) => prev + 1);
        }
    };

    // Funktion för att återställa resultat
    const resetResults = () => {
        setUserAnswers([]);
        setScore(0);
    };

    return (
        <ResultContext.Provider value={{
            userAnswers,
            score,
            addAnswer,
            resetResults,
        }}>
            {children}
        </ResultContext.Provider>
    );
};

// Se till att du exporterar useResult korrekt
export const useResult = () => useContext(ResultContext);