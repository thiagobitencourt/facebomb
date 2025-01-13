document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-btn');
    const scoreDisplay = document.getElementById('score');
    const gameBoard = document.getElementById('game-board');
    let score = 0;
    let gameInterval;
    
    // Create tiles dynamically
    function createGameBoard() {
        for (let i = 0; i < 9; i++) {
            const tile = document.createElement('div');
            tile.classList.add('game-tile');
            tile.addEventListener('click', () => handleTileClick(tile));
            gameBoard.appendChild(tile);
        }
    }

    // Randomly activate a tile
    function activateTile() {
        const tiles = document.querySelectorAll('.game-tile');
        tiles.forEach(tile => tile.classList.remove('active'));
        const randomTile = tiles[Math.floor(Math.random() * tiles.length)];
        randomTile.classList.add('active');
    }

    // Handle tile click
    function handleTileClick(tile) {
        if (tile.classList.contains('active')) {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            tile.classList.remove('active');
        }
    }

    // Start game
    function startGame() {
        score = 0;
        scoreDisplay.textContent = `Score: ${score}`;
        gameBoard.innerHTML = '';
        createGameBoard();
        gameInterval = setInterval(activateTile, 1000);
    }

    // Stop game
    function stopGame() {
        clearInterval(gameInterval);
        alert('Game Over! Final Score: ' + score);
    }

    // Start/Stop button event listener
    startButton.addEventListener('click', () => {
        if (gameInterval) {
            stopGame();
            startButton.textContent = 'Start Game';
        } else {
            startGame();
            startButton.textContent = 'Stop Game';
        }
    });
});
