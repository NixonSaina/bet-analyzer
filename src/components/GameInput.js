// src/components/GameInput.js
import React, { useState } from 'react';

const GameInput = ({ onAddGame, onCalculate }) => {
  const [game, setGame] = useState('');
  const [overOdds, setOverOdds] = useState('');
  const [underOdds, setUnderOdds] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (game.trim() && overOdds.trim() && underOdds.trim()) {
      onAddGame({
        name: game,
        odds: {
          over: parseFloat(overOdds),
          under: parseFloat(underOdds),
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
        <input
          type="number"
          placeholder="Odds for Over"
          value={overOdds}
          onChange={(e) => setOverOdds(e.target.value)}
        />
        <input
          type="number"
          placeholder="Odds for Under"
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
