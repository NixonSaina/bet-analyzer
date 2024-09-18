// src/components/GameInput.js
import React, { useState } from 'react';

const GameInput = ({ onAddGame, onCalculate }) => {
  const [game, setGame] = useState('');
  const [betType, setBetType] = useState('over/under'); // Default bet type
  const [overOdds, setOverOdds] = useState('');
  const [underOdds, setUnderOdds] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (game.trim() && overOdds.trim() && underOdds.trim()) {
      onAddGame({
        name: game,
        betType: betType,
        odds: betType === 'over/under'
          ? {
              over: parseFloat(overOdds),
              under: parseFloat(underOdds),
            }
          : {
              gg: parseFloat(overOdds),
              ng: parseFloat(underOdds),
            },
      });
      setGame('');
      setOverOdds('');
      setUnderOdds('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter game (e.g., Manu vs Liverpool)"
          value={game}
          onChange={(e) => setGame(e.target.value)}
        />
        <select value={betType} onChange={(e) => setBetType(e.target.value)}>
          <option value="over/under">Over/Under</option>
          <option value="gg/ng">GG/NG</option>
        </select>
        <input
          type="number"
          placeholder={`Odds for ${betType === 'over/under' ? 'Over' : 'GG'}`}
          value={overOdds}
          onChange={(e) => setOverOdds(e.target.value)}
        />
        <input
          type="number"
          placeholder={`Odds for ${betType === 'over/under' ? 'Under' : 'NG'}`}
          value={underOdds}
          onChange={(e) => setUnderOdds(e.target.value)}
        />
        <button type="submit">Add Game</button>
      </form>
      <button onClick={onCalculate}>Calculate Outcomes</button>
    </div>
  );
};

export default GameInput;
