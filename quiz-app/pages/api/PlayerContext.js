import React, { createContext, useState, useContext, useEffect } from "react";

// Skapa kontext för spelaren
const PlayerContext = createContext();

export const usePlayerContext = () => {
  return useContext(PlayerContext);
};

export const PlayerProvider = ({ children }) => {
  const [playerName, setPlayerName] = useState("");
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    const savedHighScores =
      JSON.parse(localStorage.getItem("highScores")) || [];
    setHighScores(savedHighScores);
  }, []);

  const addHighScore = (name, score) => {
    const newHighScore = { name, score };

    const updatedHighScores = [...highScores, newHighScore].sort(
      (a, b) => b.score - a.score
    );

    setHighScores(updatedHighScores);
    localStorage.setItem("highScores", JSON.stringify(updatedHighScores));
  };

  return (
    <PlayerContext.Provider
      value={{ playerName, setPlayerName, highScores, addHighScore }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
