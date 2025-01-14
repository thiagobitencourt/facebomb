document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-btn');
    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');
    const gameBoard = document.getElementById('game-board');
    const TILE_ACTIVE_DURATION = 800; // Tile active time in milliseconds
    let score = 0;
    let gameInterval;
    let timerInterval;
    let timeLeft = 30;

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

        // Deactivate the tile after TILE_ACTIVE_DURATION
        setTimeout(() => {
            randomTile.classList.remove('active');
        }, TILE_ACTIVE_DURATION);
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
        timeLeft = 30;
        scoreDisplay.textContent = `Score: ${score}`;
        timerDisplay.textContent = `Time Left: ${timeLeft}s`;
        gameBoard.innerHTML = '';
        createGameBoard();

        // Start the game loop
        gameInterval = setInterval(activateTile, 1000);

        // Start the timer
        timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `Time Left: ${timeLeft}s`;

            if (timeLeft <= 0) {
                stopGame();
            }
        }, 1000);
    }

    // Stop game
    function stopGame() {
        clearInterval(gameInterval);
        clearInterval(timerInterval);
        alert(`Game Over! Final Score: ${score}`);
        startButton.textContent = 'Start Game';
    }

    // Start button event listener
    startButton.addEventListener('click', () => {
        if (!gameInterval && !timerInterval) {
            startGame();
            startButton.textContent = 'Restart Game';
        }
    });
});
