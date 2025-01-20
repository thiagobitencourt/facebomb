import React from 'react';
import defaultPicture from '/smiling.png';

const GameTile = ({ isActive, onClick, picture }) => {
    const pictureSrc = picture || defaultPicture;
    const handleTileClick = () => {
        if (isActive) {
          onClick();
        }
      };

    return (
        <div className={`game-tile ${isActive ? 'active' : ''}`} onClick={handleTileClick}>
            {isActive && picture && (
                <img src={pictureSrc} alt="Tile" className="tile-image" />
            )}
        </div>
    );
};

export default GameTile;
