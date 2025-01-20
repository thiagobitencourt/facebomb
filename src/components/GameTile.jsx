import React, { useState, useEffect } from 'react';

const GameTile = ({ updateScore, gameActive, picture }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (gameActive) {
      const interval = setInterval(() => {
        setActive(Math.random() < 0.3); // Randomly activate tiles
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setActive(false);
    }
  }, [gameActive]);

  const handleClick = () => {
    if (active) {
      updateScore();
      setActive(false);
    }
  };

  return (
    <div className={`game-tile ${active ? 'active' : ''}`} onClick={handleClick}>
      {active && picture && (
        <img src={picture} alt="Tile" className="tile-image" />
      )}
    </div>
  );
};

export default GameTile;