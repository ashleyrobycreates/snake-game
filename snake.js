// Get the canvas element and its context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define the size of each box in the grid
const box = 20;

// Initialize the snake as an array of coordinates
let snake = [{ x: 9 * box, y: 10 * box }];

// Set the initial direction of the snake
let direction = 'RIGHT';

// Generate the initial position of the food
let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
};

// Initialize the obstacles as an array of coordinates
let obstacles = [];

// Generate 5 obstacles
generateObstacles(5);

// Initialize the score
let score = 0;

// Set the game speed (interval in milliseconds)
let gameSpeed = 100;

// Listen for keydown events to change the direction of the snake
document.addEventListener('keydown', changeDirection);

function generateObstacles(numObstacles) {
    for (let i = 0; i < numObstacles; i++) {
        let obstacle = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
        obstacles.push(obstacle);
    }
}

function drawObstacles() {
    ctx.fillStyle = 'brown';
    for (let i = 0; i < obstacles.length; i++) {
        ctx.fillRect(obstacles[i].x, obstacles[i].y, box, box);
    }
}

function checkCollision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

// Main game loop
function game() {
    // Update the snake's position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'UP') snakeY -= box;
    if (direction === 'RIGHT') snakeX += box;
    if (direction === 'DOWN') snakeY += box;

    // Check for collision with obstacles
    if (checkCollision({ x: snakeX, y: snakeY }, obstacles)) {
        clearInterval(gameInterval);
        alert('Game Over');
        return;
    }

    // Check for collision with the snake itself
    if (checkCollision({ x: snakeX, y: snakeY }, snake)) {
        clearInterval(gameInterval);
        alert('Game Over');
        return;
    }

    // Check for collision with the walls
    if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height) {
        clearInterval(gameInterval);
        alert('Game Over');
        return;
    }

    // Move the snake
    let newHead = { x: snakeX, y: snakeY };
    snake.unshift(newHead);

    // Check if the snake has eaten the food
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        document.getElementById('score').innerText = 'Score: ' + score;
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
    } else {
        snake.pop();
    }

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    ctx.fillStyle = 'green';
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Draw the food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    // Draw the obstacles
    drawObstacles();
}

// Start the game loop
let gameInterval = setInterval(game, gameSpeed);