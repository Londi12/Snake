// Get the canvas element and its context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set the initial size and direction of the snake
const snakeSize = 20;
let snake = [
    { x: 100, y: 100 },
    { x: 80, y: 100 },
    { x: 60, y: 100 },
    { x: 40, y: 100 },
    { x: 20, y: 100 }
];
let dx = snakeSize;
let dy = 0;

// Main game loop using requestAnimationFrame
function main() {
    updateGame();
    drawGame();
    requestAnimationFrame(main);
}

// Update game state
function updateGame() {
    moveSnake();
    // Add other game logic here (e.g., collision detection)
}

// Draw game elements
function drawGame() {
    clearCanvas();
    drawSnake();
    // Add other drawing functions (e.g., drawFood())
}

// Clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Move the snake
function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    snake.pop();
}

// Draw the snake
function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = '#4CAF50'; // Snake color
        ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize);
    });
}

// Listen for keydown events to change direction
document.addEventListener('keydown', changeDirection);

// Change direction based on key pressed
function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;

    if (keyPressed === LEFT_KEY && dx === 0) {
        dx = -snakeSize;
        dy = 0;
    }

    if (keyPressed === RIGHT_KEY && dx === 0) {
        dx = snakeSize;
        dy = 0;
    }

    if (keyPressed === UP_KEY && dy === 0) {
        dx = 0;
        dy = -snakeSize;
    }

    if (keyPressed === DOWN_KEY && dy === 0) {
        dx = 0;
        dy = snakeSize;
    }
}

// Initialize the game
main();
