import React from 'react';

const Controls = ({ onStartGame, setPicture, gameActive }) => {
  const handleTakePicture = async () => {
    // Open camera and take picture logic here
    const picture = 'path/to/captured/image'; // Replace with real capture logic
    setPicture(picture);
  };

  return (
    <div id="controls-container">
      <button id="start-btn" onClick={onStartGame} disabled={gameActive}>
        {gameActive ? 'Playing...' : 'Start Game'}
      </button>
      <button id="camera-btn" onClick={handleTakePicture}>
        🔍
      </button>
    </div>
  );
};

export default Controls;