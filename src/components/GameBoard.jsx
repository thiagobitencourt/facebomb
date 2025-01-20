import React from 'react';
import GameTile from './GameTile';

const GameBoard = ({ updateScore, gameActive, picture }) => {
  const tiles = Array.from({ length: 9 }, (_, i) => i);

  return (
    <div id="game-board">
      {tiles.map(id => (
        <GameTile key={id} updateScore={updateScore} gameActive={gameActive} picture={picture} />
      ))}
    </div>
  );
};

export default GameBoard;