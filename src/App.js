// src/App.js
import React, { useState } from 'react';
import './App.css'; // Import the CSS file
import GameInput from './components/GameInput';
import OutcomeList from './components/OutcomeList';

const App = () => {
  const [games, setGames] = useState([]);
  const [outcomes, setOutcomes] = useState([]);
  const [savedRecords, setSavedRecords] = useState([]);
  const [results, setResults] = useState({}); // State to hold results input
  const [winningCombination, setWinningCombination] = useState(null);

  const handleAddGame = (game) => {
    setGames((prevGames) => [...prevGames, game]);
  };

  const calculateOutcomes = () => {
    const possibleOutcomes = games.length > 0 ? generateCombinations(games) : [];
    setOutcomes(possibleOutcomes);
    setWinningCombination(null); // Reset winning combination when recalculating
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
        const oddsKey = outcome.toLowerCase();
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

  const handleSaveRecord = (outcomeSet) => {
    setSavedRecords((prevRecords) => [...prevRecords, outcomeSet]);
  };

  const handleClearRecords = () => {
    setSavedRecords([]);
  };

  const handleResultChange = (gameName, result) => {
    setResults((prevResults) => ({
      ...prevResults,
      [gameName]: result
    }));
  };

  const identifyWinningCombination = () => {
    const winningCombo = outcomes.find(outcomeSet =>
      outcomeSet.combination.every(outcome =>
        results[outcome.game] && results[outcome.game].toLowerCase() === outcome.outcome.toLowerCase()
      )
    );
    setWinningCombination(winningCombo || null);
  };

  return (
    <div className="app-container">
      <h1>Bet Analyzer</h1>
      <GameInput onAddGame={handleAddGame} onCalculate={calculateOutcomes} />
      <OutcomeList 
        games={games} 
        outcomes={outcomes} 
        onSaveRecord={handleSaveRecord} 
      />
      <h2>Enter Results</h2>
      {games.length > 0 ? (
        <div>
          {games.map((game, index) => (
            <div key={index}>
              <label>
                {game.name}: 
                <select onChange={(e) => handleResultChange(game.name, e.target.value)}>
                  <option value="">Select Result</option>
                  {game.betType === 'over/under' ? (
                    <>
                      <option value="Over">Over</option>
                      <option value="Under">Under</option>
                    </>
                  ) : (
                    <>
                      <option value="GG">GG</option>
                      <option value="NG">NG</option>
                    </>
                  )}
                </select>
              </label>
            </div>
          ))}
          <button onClick={identifyWinningCombination}>Identify Winning Combination</button>
        </div>
      ) : (
        <p>Add games to input results.</p>
      )}
      {winningCombination && (
        <div>
          <h2>Winning Combination</h2>
          <ul>
            {winningCombination.combination.map((outcome, idx) => (
              <li key={idx}>
                {outcome.game}: {outcome.outcome} (Odds: {outcome.odds})
              </li>
            ))}
            <br />
            <strong>Total Odds: {winningCombination.totalOdds}</strong>
          </ul>
        </div>
      )}
      <h2>Saved Records</h2>
      {savedRecords.length > 0 ? (
        <ul>
          {savedRecords.map((record, index) => (
            <li key={index}>
              {record.combination.map((outcome, idx) => (
                <span key={idx}>
                  {outcome.game}: {outcome.outcome} (Odds: {outcome.odds}){idx < games.length - 1 ? ', ' : ''}
                </span>
              ))}
              <br />
              <strong>Total Odds: {record.totalOdds}</strong>
            </li>
          ))}
        </ul>
      ) : (
        <p>No saved records yet.</p>
      )}
      {savedRecords.length > 0 && (
        <button onClick={handleClearRecords}>Clear All Saved Records</button>
      )}
    </div>
  );
};

export default App;
