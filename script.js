document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-btn');
    const cameraButton = document.getElementById('camera-btn');
    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');
    const recordDisplay = document.getElementById('personal-record');
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const gameBoard = document.getElementById('game-board');
    const TILE_ACTIVE_DURATION = 700; // Tile active time in milliseconds
    let score = 0;
    let gameInterval;
    let timerInterval;
    let timeLeft = 30;
    let customImageSrc = 'images/smiling.png'; // Default image
    // Load personal record from localStorage
    let personalRecord = localStorage.getItem('personalRecord') || 0;
    recordDisplay.textContent = `Personal Record: ${personalRecord}`;

    // Create tiles dynamically
    function createGameBoard() {
        for (let i = 0; i < 9; i++) {
            const tile = document.createElement('div');
            tile.classList.add('game-tile');

            const image = document.createElement('img');
            image.src = customImageSrc;
            tile.appendChild(image);

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
        setTimeout(() => randomTile.classList.remove('active'), TILE_ACTIVE_DURATION);
    }

    // Handle tile click
    function handleTileClick(tile) {
        if (tile.classList.contains('active')) {
            const image = tile.querySelector('img');
            if (image) {
                // Add the blow effect class
                image.classList.add('blow');
                
                // Remove the blow effect class after animation ends
                setTimeout(() => image.classList.remove('blow'), 500);
            }

            // Update the score
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            tile.classList.remove('active');
        }
    }

    // Start game
    function startGame() {
        // Reset state for a fresh game
        clearInterval(gameInterval);
        clearInterval(timerInterval);

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

        startButton.textContent = 'Restart Game';
    }

    // Stop game
    function stopGame() {
        clearInterval(gameInterval);
        clearInterval(timerInterval);

        // Update personal record if the score is higher
        if (score > personalRecord) {
            personalRecord = score;
            localStorage.setItem('personalRecord', personalRecord);
            recordDisplay.textContent = `Personal Record: ${personalRecord}`;
            alert(`Game Over! New Personal Record: ${score}`);
        } else {
            alert(`Game Over! Final Score: ${score}`);
        }

        // Reset the button to "Start Game" after game ends
        startButton.textContent = 'Start Game';
        gameInterval = null; // Reset game interval
        timerInterval = null; // Reset timer interval
    }

    // Access the camera and capture an image
    cameraButton.addEventListener('click', async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            video.srcObject = stream;
            video.style.display = 'block';

            video.addEventListener('click', () => {
                const context = canvas.getContext('2d');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                customImageSrc = canvas.toDataURL('image/png');
                video.style.display = 'none';
                stream.getTracks().forEach(track => track.stop()); // Stop the camera
                alert('Picture taken! It will be used in the game.');
            });
        } catch (error) {
            console.error('Camera access denied or not available.', error);
        }
    });

    // Start/Restart button event listener
    startButton.addEventListener('click', () => {
        startGame(); // Always starts a fresh game
    });
});
