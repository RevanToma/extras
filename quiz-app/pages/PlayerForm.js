import React, { useState } from "react";
import { usePlayerContext } from "./PlayerContext";

const PlayerForm = ({ setGameStarted }) => {
  const [name, setName] = useState("");
  const { setPlayerName } = usePlayerContext();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleStartGame = () => {
    if (name.trim()) {
      setPlayerName(name);
      setGameStarted(true);
    } else {
      alert("Vänligen ange ditt namn!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <h2 className="text-4xl font-bold mb-6">Välkommen till Trivia!</h2>
      <input
        type="text"
        placeholder="Ange ditt namn"
        value={name}
        onChange={handleNameChange}
        className="p-4 mb-4 text-lg text-black rounded-md w-80 border-2 border-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        onClick={handleStartGame}
        className="px-6 py-3 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition duration-200"
      >
        Starta Quiz
      </button>
    </div>
  );
};

export default PlayerForm;
