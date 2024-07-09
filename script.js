document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('gameArea');
    let snake = [{x: 200, y: 200}]; // Initial snake position
    let food = createFoodPosition();
    let dx = 0;
    let dy = 0;
    let score = 0;
  
    function createFoodPosition() {
      const x = Math.floor(Math.random() * 20) * 20;
      const y = Math.floor(Math.random() * 20) * 20;
      return {x, y};
    }
  
    function drawSnake() {
      gameArea.innerHTML = ''; // Clear previous snake parts
      snake.forEach(part => {
        const snakePart = document.createElement('div');
        snakePart.className = 'snakePart';
        snakePart.style.left = `${part.x}px`;
        snakePart.style.top = `${part.y}px`;
        gameArea.appendChild(snakePart);
      });
    }
  
    function drawFood() {
      const foodElement = document.createElement('div');
      foodElement.id = 'food';
      foodElement.style.left = `${food.x}px`;
      foodElement.style.top = `${food.y}px`;
      gameArea.appendChild(foodElement);
    }
  
    function moveSnake() {
      const head = {x: snake[0].x + dx, y: snake[0].y + dy};
      snake.unshift(head); // Add new head position
      if (head.x === food.x && head.y === food.y) {
        score++;
        food = createFoodPosition();
      } else {
        snake.pop(); // Remove tail if no food eaten
      }
    }
  
    function checkCollision() {
      const head = snake[0];
      if (head.x < 0 || head.x >= 400 || head.y < 0 || head.y >= 400) {
        gameOver();
      }
      for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
          gameOver();
        }
      }
    }
  
    function gameOver() {
      alert(`Game Over! Score: ${score}`);
      snake = [{x: 200, y: 200}];
      food = createFoodPosition();
      dx = 0;
      dy = 0;
      score = 0;
    }
  
    function gameLoop() {
      moveSnake();
      checkCollision();
      drawSnake();
      drawFood();
      setTimeout(gameLoop, 100); // Game speed (100ms)
    }
  
    gameLoop();
  
    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowUp':
          if (dy === 0) {
            dx = 0;
            dy = -20;
          }
          break;
        case 'ArrowDown':
          if (dy === 0) {
            dx = 0;
            dy = 20;
          }
          break;
        case 'ArrowLeft':
          if (dx === 0) {
            dx = -20;
            dy = 0;
          }
          break;
        case 'ArrowRight':
          if (dx === 0) {
            dx = 20;
            dy = 0;
          }
          break;
      }
    });
  });
  