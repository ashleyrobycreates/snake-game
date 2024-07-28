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

// Function to check for collisions with the snake itself
function collision(newHead, snake) {
	for (let i = 0; i < snake.length; i++) {
		if (newHead.x == snake[i].x && newHead.y == snake[i].y) {
			return true;
		}
	}
	return false;
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

	// Draw the food
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

	// Check if the snake has eaten the food
	if (snakeX == food.x && snakeY == food.y) {
		// Generate new food position
		food = {
			x: Math.floor(Math.random() * 19 + 1) * box,
			y: Math.floor(Math.random() * 19 + 1) * box
		};
	} else {
		// Remove the tail of the snake
		snake.pop();
	}

	// Create the new head of the snake
	let newHead = {
		x: snakeX,
		y: snakeY
	};

	// Check for collisions with the walls or itself
	if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
		// End the game if a collision is detected
		clearInterval(game);
	}

	// Add the new head to the snake
	snake.unshift(newHead);
}

// Start the game loop
let game = setInterval(draw, gameSpeed);