// src/components/OutcomeList.js
import React from 'react';

const OutcomeList = ({ games, outcomes }) => {
  return (
    <div>
      {outcomes.length > 0 ? (
        <div>
          <h2>Possible Outcomes</h2>
          <ul>
            {outcomes.map((outcomeSet, index) => (
              <li key={index}>
                {outcomeSet.combination.map((outcome, idx) => (
                  <span key={idx}>
                    {outcome.game}: {outcome.outcome} (Odds: {outcome.odds}){idx < games.length - 1 ? ', ' : ''}
                  </span>
                ))}
                <br />
                <strong>Total Odds: {outcomeSet.totalOdds}</strong>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No outcomes to display. Please add games and calculate outcomes.</p>
      )}
    </div>
  );
};

export default OutcomeList;
