import React, { useState } from 'react';
import GameBoard from './GameBoard';

const GameContainer = ({ picture }) => {
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(30);
    const [record, setRecord] = useState(0);
    const [gameActive, setGameActive] = useState(false);
    const [activeTile, setActiveTile] = useState(null);

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

    const activateTile = (tileIndex) => {
        setActiveTile(tileIndex);
    };

    const deactivateTile = () => {
        setScore(score => score + 1);
        setActiveTile(null);
    };

    const handleTileClick = (index) => {
        if (index === activeTile) {
            deactivateTile();
        }
    };

    return (
        <div id="game-container">
            <div id="score">
                <span>Score: {score}</span>
                <span id='score-record'>(record: {record})</span>
            </div>
            <div id="timer">Time: {timer}s</div>
            <GameBoard
                activeTile={activeTile}
                onTileClick={handleTileClick}
                picture={picture}
            />
            {/* <Controls
                onStartGame={handleStartGame}
                setPicture={setPicture}
                gameActive={gameActive}
            /> */}
        </div>
    );
};

export default GameContainer;
