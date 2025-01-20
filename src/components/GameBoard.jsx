import React from 'react';
import GameTile from './GameTile';

const GameBoard = ({ activeTile, picture, onTileClick }) => {
    const tiles = Array(9).fill(null); // Example for a 3x3 grid

    return (
        <div id="game-board">
        {tiles.map((_, index) => (
            <GameTile
                key={index}
                isActive={index === activeTile}
                onClick={() => onTileClick(index)}
                picture={picture}
            />
        ))}
        </div>
    );
};

export default GameBoard;
