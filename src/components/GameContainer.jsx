import React, { useState } from 'react';
import GameBoard from './GameBoard';
import Controls from './Controls';

const GameContainer = () => {
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [record, setRecord] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [picture, setPicture] = useState(null);

  const updateScore = () => {
    setScore(prev => prev + 1);
  };

  const handleStartGame = () => {
    setScore(0);
    setTimer(30);
    setGameActive(true);
    // Start a countdown timer
    const countdown = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(countdown);
          setGameActive(false);
          setRecord(prevRecord => Math.max(prevRecord, score));
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div id="game-container">
      <div id="score">Score: {score}</div>
      <div id="timer">Time: {timer}s</div>
      <div id="record-container">Best Score: {record}</div>
      <GameBoard updateScore={updateScore} gameActive={gameActive} picture={picture} />
      <Controls
        onStartGame={handleStartGame}
        setPicture={setPicture}
        gameActive={gameActive}
      />
    </div>
  );
};

export default GameContainer;