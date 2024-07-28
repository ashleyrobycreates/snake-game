// Get the canvas element and its context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define the size of each box in the grid
const box = 20;

// Initialize the snake as an array of coordinates
let snake = [{ x: 9 * box, y: 10 * box }];

let obstacles = [
	x: 5 * box, y: 7 * box,
	x: 8 * box, y: 12 * box,
	x: 15 * box, y: 17 * box
	x: 3 * box, y: 4 * box,
	x: 6 * box, y: 9 * box,
];

// Set the initial direction of the snake
let direction = 'RIGHT';

// Generate the initial position of the food
let food = {
	x: Math.floor(Math.random() * 19 + 1) * box,
	y: Math.floor(Math.random() * 19 + 1) * box
};

// Set the game speed (interval in milliseconds)
let gameSpeed = 100;

// Listen for keydown events to change the direction of the snake
document.addEventListener('keydown', changeDirection);

// Function to change the direction based on key pressed
function changeDirection(event) {
	if (event.keyCode == 37 && direction != 'RIGHT') direction = 'LEFT';
	else if (event.keyCode == 38 && direction != 'DOWN') direction = 'UP';
	else if (event.keyCode == 39 && direction != 'LEFT') direction = 'RIGHT';
	else if (event.keyCode == 40 && direction != 'UP') direction = 'DOWN';
}


function generateObstacles(numObstacles) {
    for (let i = 0; i < numObstacles; i++) {
        let obstacle = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
        obstacles.push(obstacle);
    }
}

// Generate 5 obstacles
generateObstacles(5);


function drawObstacles() {
    ctx.fillStyle = 'brown';
    for (let i = 0; i < obstacles.length; i++) {
        ctx.fillRect(obstacles[i].x, obstacles[i].y, box, box);
    }
}

// Function to draw the game elements on the canvas
function draw() {
	// Clear the canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Draw the snake
	for (let i = 0; i < snake.length; i++) {
		ctx.fillStyle = (i == 0) ? 'green' : 'white';
		ctx.fillRect(snake[i].x, snake[i].y, box, box);
		ctx.strokeStyle = 'red';
		ctx.strokeRect(snake[i].x, snake[i].y, box, box);
	}
	
	// Draw the foodfunction drawObstacles() 
	{
    ctx.fillStyle = 'brown';
    for (let i = 0; i < obstacles.length; i++) {
        ctx.fillRect(obstacles[i].x, obstacles[i].y, box, box);
    }
}
	ctx.fillStyle = 'red';
	ctx.fillRect(food.x, food.y, box, box);

	// Get the current head position of the snake
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	// Update the head position based on the direction
	if (direction == 'LEFT') snakeX -= box;
	if (direction == 'UP') snakeY -= box;
	if (direction == 'RIGHT') snakeX += box;
	if (direction == 'DOWN') snakeY += box;

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

	// Check if the snake eats the food
	if (snakeX == food.x && snakeY == food.y) {
		// Increase the length of the snake
		snake.unshift({ x: snakeX, y: snakeY });
		// Generate new food position
		food = {
			x: Math.floor(Math.random() * 19 + 1) * box,
			y: Math.floor(Math.random() * 19 + 1) * box
		};
	} else {
		// Remove the tail of the snake
		snake.pop();
	}

	// Add the new head position to the snake
	let newHead = { x: snakeX, y: snakeY };
	snake.unshift(newHead);
}
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