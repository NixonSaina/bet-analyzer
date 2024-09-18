// src/App.js
import React, { useState } from 'react';
import './App.css'; // Import the CSS file
import GameInput from './components/GameInput';
import OutcomeList from './components/OutcomeList';

const App = () => {
  const [games, setGames] = useState([]);
  const [outcomes, setOutcomes] = useState([]);

  const handleAddGame = (game) => {
    setGames((prevGames) => [...prevGames, game]);
  };

  const calculateOutcomes = () => {
    const possibleOutcomes = games.length > 0 ? generateCombinations(games) : [];
    setOutcomes(possibleOutcomes);
  };

  const generateCombinations = (games) => {
    const results = [];

    const generate = (currentCombo, depth) => {
      if (depth === games.length) {
        // Calculate total odds for the current combination
        const totalOdds = currentCombo.reduce((total, outcome) => total * outcome.odds, 1);
        results.push({
          combination: [...currentCombo],
          totalOdds: totalOdds.toFixed(2) // Fix to 2 decimal places
        });
        return;
      }

      const game = games[depth];
      const outcomes = game.betType === 'over/under' ? ['Over', 'Under'] : ['GG', 'NG'];

      for (let i = 0; i < outcomes.length; i++) {
        const outcome = outcomes[i];
        // Map outcome to its respective key in the odds object
        const oddsKey = game.betType === 'over/under' ? outcome.toLowerCase() : outcome.toLowerCase();
        currentCombo.push({
          game: game.name,
          outcome: outcome,
          odds: game.odds[oddsKey]
        });
        generate(currentCombo, depth + 1);
        currentCombo.pop();
      }
    };

    generate([], 0);
    return results;
  };

  return (
    <div className="app-container"> {/* Add container class */}
      <h1>Bet Analyzer</h1>
      <GameInput onAddGame={handleAddGame} onCalculate={calculateOutcomes} />
      <OutcomeList games={games} outcomes={outcomes} />
    </div>
  );
};

export default App;
