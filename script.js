// ======== VARIABLES GLOBALES ========
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const $sprite = document.getElementById("sprite");
const $bricks = document.getElementById("bricks");
const $score = document.getElementById("puntuacion");

canvas.width = 500;
canvas.height = 450;

// Pelota
const ballRadius = 3;
let x = canvas.width / 2;
let y = canvas.height - 40;
let dx = 3;
let dy = -1;
const BALL_SPEED = Math.sqrt(dx * dx + dy * dy);

// Paleta
const paddleHeight = 10;
const paddleWidth = 50;
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = canvas.height - paddleHeight - 10;

let leftPressed = false;
let rightPressed = false;

// Puntuacion
let score = 0;

// ======== NIVELES Y LADRILLOS ========

const brickWidth = 32;
const brickHeight = 16;
const brickPadding = 1;
const brickOffsetTop = 60;

const BRICK_STATUS = {
  DESTROYED: 0,
  ACTIVE: 1,
};

// Niveles creativos (12x16) con colores (1 a 7)
const levels = [
  // Nivel 1: Alien Retro
  [
    [0, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 0],
    [0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0],
    [0, 4, 4, 0, 4, 4, 4, 4, 0, 4, 4, 0],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 0, 5, 5, 5, 5, 5, 5, 0, 5, 5],
    [6, 6, 0, 6, 0, 0, 0, 0, 6, 0, 6, 6],
    [0, 0, 0, 7, 7, 0, 0, 7, 7, 0, 0, 0],
    [0, 0, 7, 7, 0, 0, 0, 0, 7, 7, 0, 0],
    [0, 0, 7, 7, 0, 0, 0, 0, 7, 7, 0, 0],
    [0, 7, 7, 0, 0, 0, 0, 0, 0, 7, 7, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  // Nivel 2: Calavera
  [
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0],
    [0, 3, 3, 0, 3, 3, 3, 3, 0, 3, 3, 0],
    [4, 4, 0, 0, 4, 4, 4, 4, 0, 0, 4, 4],
    [4, 4, 0, 0, 4, 4, 4, 4, 0, 0, 4, 4],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0],
    [0, 0, 7, 0, 7, 0, 0, 7, 0, 7, 0, 0],
    [0, 7, 0, 0, 7, 0, 0, 7, 0, 0, 7, 0],
    [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  // Nivel 3: Nave espacial
  [
    [0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0],
    [0, 0, 0, 4, 4, 4, 4, 4, 4, 0, 0, 0],
    [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0],
    [0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0],
    [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 0],
    [0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0],
    [0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  // Nivel 4: Flecha
  [
    [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0],
    [0, 0, 0, 3, 3, 3, 3, 3, 0, 0, 0, 0],
    [0, 0, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0],
    [0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0],
    [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0],
  ],
  // Nivel 5: Fantasma
  [
    [0, 0, 2, 2, 2, 0, 0, 2, 2, 2, 0, 0],
    [0, 2, 2, 3, 3, 2, 2, 3, 3, 2, 2, 0],
    [2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2],
    [2, 3, 4, 4, 3, 3, 3, 3, 4, 4, 3, 2],
    [2, 3, 4, 4, 3, 3, 3, 3, 4, 4, 3, 2],
    [2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2],
    [2, 3, 3, 0, 0, 3, 3, 0, 0, 3, 3, 2],
    [2, 3, 3, 0, 0, 3, 3, 0, 0, 3, 3, 2],
    [2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2],
    [2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2],
    [0, 2, 3, 3, 3, 0, 0, 3, 3, 3, 2, 0],
    [0, 0, 2, 2, 2, 0, 0, 2, 2, 2, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  // Nivel 6: Lava
  [
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
    [0, 1, 2, 3, 3, 3, 3, 3, 3, 2, 1, 0],
    [0, 1, 2, 3, 4, 4, 4, 3, 3, 2, 1, 0],
    [1, 1, 2, 3, 4, 5, 4, 3, 2, 2, 1, 1],
    [1, 1, 2, 3, 4, 5, 4, 3, 2, 2, 1, 1],
    [0, 1, 2, 3, 4, 5, 4, 3, 2, 2, 1, 0],
    [0, 1, 2, 3, 3, 3, 3, 3, 2, 2, 1, 0],
    [0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  ],

  // Nivel 7: Árbol
  [
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1],
    [1, 2, 2, 3, 3, 3, 3, 3, 3, 2, 2, 1],
    [1, 2, 3, 3, 4, 4, 4, 4, 3, 3, 2, 1],
    [1, 2, 3, 4, 4, 4, 4, 4, 4, 3, 2, 1],
    [1, 2, 3, 4, 5, 5, 5, 5, 4, 3, 2, 1],
    [1, 2, 3, 4, 5, 6, 6, 5, 4, 3, 2, 1],
    [0, 2, 3, 4, 5, 6, 6, 5, 4, 3, 2, 0],
    [0, 2, 3, 4, 5, 6, 6, 5, 4, 3, 2, 0],
    [0, 1, 2, 3, 4, 5, 5, 4, 3, 2, 1, 0],
    [0, 0, 1, 2, 3, 4, 4, 3, 2, 1, 0, 0],
    [0, 0, 1, 2, 3, 4, 4, 3, 2, 1, 0, 0],
    [0, 0, 0, 1, 2, 3, 3, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0],
  ],
  // Nivel 8: Escudo
  [
    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 0],
    [1, 1, 2, 3, 3, 3, 3, 3, 3, 2, 1, 1],
    [1, 2, 3, 4, 4, 4, 4, 4, 4, 3, 2, 1],
    [1, 2, 3, 4, 5, 5, 5, 5, 4, 3, 2, 1],
    [1, 2, 3, 4, 5, 6, 6, 5, 4, 3, 2, 1],
    [0, 2, 3, 4, 5, 6, 6, 5, 4, 3, 2, 0],
    [0, 2, 3, 4, 5, 6, 6, 5, 4, 3, 2, 0],
    [0, 1, 2, 3, 4, 5, 5, 4, 3, 2, 1, 0],
    [0, 0, 1, 2, 3, 4, 4, 3, 2, 1, 0, 0],
    [0, 0, 1, 2, 3, 4, 4, 3, 2, 1, 0, 0],
    [0, 0, 0, 1, 2, 3, 3, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  ],
  // Nivel 9: Ojo
  [
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0],
    [0, 1, 2, 3, 3, 3, 3, 3, 3, 2, 1, 0],
    [0, 1, 2, 3, 4, 4, 4, 4, 3, 2, 1, 0],
    [0, 1, 2, 3, 4, 5, 5, 4, 3, 2, 1, 0],
    [1, 2, 3, 4, 5, 6, 6, 5, 4, 3, 2, 1],
    [1, 2, 3, 4, 5, 6, 6, 5, 4, 3, 2, 1],
    [1, 2, 3, 4, 5, 6, 6, 5, 4, 3, 2, 1],
    [0, 2, 3, 4, 5, 6, 6, 5, 4, 3, 2, 0],
    [0, 0, 3, 4, 5, 6, 6, 5, 4, 3, 0, 0],
    [0, 0, 0, 3, 4, 5, 5, 4, 3, 0, 0, 0],
    [0, 0, 0, 0, 3, 4, 4, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  // Nivel 10: Espiral
  [
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 0],
    [1, 1, 2, 3, 3, 3, 3, 3, 3, 2, 1, 1],
    [1, 2, 3, 4, 4, 4, 4, 4, 4, 3, 2, 1],
    [1, 2, 3, 4, 5, 5, 5, 5, 4, 3, 2, 1],
    [1, 2, 3, 4, 5, 6, 6, 5, 4, 3, 2, 1],
    [0, 2, 3, 4, 5, 6, 6, 5, 4, 3, 2, 0],
    [0, 2, 3, 4, 5, 6, 6, 5, 4, 3, 2, 0],
    [0, 1, 2, 3, 4, 5, 5, 4, 3, 2, 1, 0],
    [0, 0, 1, 2, 3, 4, 4, 3, 2, 1, 0, 0],
    [0, 0, 1, 2, 3, 4, 4, 3, 2, 1, 0, 0],
    [0, 0, 0, 1, 2, 3, 3, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  ],
];

let bricks = [];
let currentLevel = levels[1];

// Generador de nivel a partir de array de colores
const initLevel = (levelData) => {
  const rows = levelData.length;
  const cols = levelData[0].length;

  const totalBricksWidth = cols * brickWidth + (cols - 1) * brickPadding;
  const brickOffsetLeft = (canvas.width - totalBricksWidth) / 2;

  bricks = [];

  for (let r = 0; r < rows; r++) {
    bricks[r] = [];
    for (let c = 0; c < cols; c++) {
      const color = levelData[r][c];
      if (color === 0) {
        bricks[r][c] = null;
        continue;
      }

      const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
      const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;

      bricks[r][c] = {
        x: brickX,
        y: brickY,
        status: BRICK_STATUS.ACTIVE,
        color: color,
      };
    }
  }
};

// ======== FUNCIONES DE DIBUJADO ========
const drawBall = () => {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath();
};

const drawPaddle = () => {
  ctx.beginPath();
  ctx.drawImage(
    $sprite,
    29,
    174,
    paddleWidth,
    paddleHeight,
    paddleX,
    paddleY,
    paddleWidth,
    paddleHeight
  );
  ctx.closePath();
};

const drawBricks = () => {
  for (let r = 0; r < bricks.length; r++) {
    for (let c = 0; c < bricks[r].length; c++) {
      const brick = bricks[r][c];
      if (!brick || brick.status === BRICK_STATUS.DESTROYED) continue;

      const clipX = brick.color * brickWidth;

      ctx.drawImage(
        $bricks,
        clipX,
        0,
        brickWidth,
        brickHeight,
        brick.x,
        brick.y,
        brickWidth,
        brickHeight
      );
    }
  }
};

const drawScore = () => {
  // Placeholder
};

const cleanCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

// ======== FUNCIONES DE LÓGICA ========
const ballMovement = () => {
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  if (y + dy < ballRadius) {
    dy = -dy;
  }

  if (
    y + ballRadius + dy > paddleY &&
    x > paddleX &&
    x < paddleX + paddleWidth
  ) {
    const relativeImpact =
      (x - (paddleX + paddleWidth / 2)) / (paddleWidth / 2);
    const maxBounceAngle = Math.PI / 3;
    const bounceAngle = relativeImpact * maxBounceAngle;

    dx = BALL_SPEED * Math.sin(bounceAngle);
    dy = -BALL_SPEED * Math.cos(bounceAngle);
  }

  if (y + ballRadius + dy > canvas.height) {
    document.location.reload();
  }

  x += dx;
  y += dy;
};

const paddleMovement = () => {
  if (leftPressed && paddleX > 3) {
    paddleX -= 6;
  } else if (rightPressed && paddleX < canvas.width - paddleWidth - 3) {
    paddleX += 6;
  }
};

const collisionDetection = () => {
  for (let r = 0; r < bricks.length; r++) {
    for (let c = 0; c < bricks[r].length; c++) {
      const brick = bricks[r][c];
      if (!brick || brick.status === BRICK_STATUS.DESTROYED) continue;

      const brickLeft = brick.x;
      const brickRight = brick.x + brickWidth;
      const brickTop = brick.y;
      const brickBottom = brick.y + brickHeight;

      const nextX = x + dx;
      const nextY = y + dy;

      const collisionX =
        nextX + ballRadius > brickLeft && nextX - ballRadius < brickRight;
      const collisionY =
        nextY + ballRadius > brickTop && nextY - ballRadius < brickBottom;

      if (collisionX && collisionY) {
        const prevX = x - dx;
        const prevY = y - dy;

        const wasAbove = prevY + ballRadius <= brickTop;
        const wasBelow = prevY - ballRadius >= brickBottom;
        const wasLeft = prevX + ballRadius <= brickLeft;
        const wasRight = prevX - ballRadius >= brickRight;

        if (wasAbove || wasBelow) {
          dy = -dy;
        } else if (wasLeft || wasRight) {
          dx = -dx;
        } else {
          dy = -dy;
        }
        score += 10;
        $score.innerText = score.toString().padStart(4, "0");

        brick.status = BRICK_STATUS.DESTROYED;
      }
    }
  }
};

// ======== EVENTOS DE TECLADO ========
const initEvent = () => {
  document.addEventListener("keydown", (event) => {
    if (event.key === "Right" || event.key === "ArrowRight") {
      rightPressed = true;
    } else if (event.key === "Left" || event.key === "ArrowLeft") {
      leftPressed = true;
    }
  });

  document.addEventListener("keyup", (event) => {
    if (event.key === "Right" || event.key === "ArrowRight") {
      rightPressed = false;
    } else if (event.key === "Left" || event.key === "ArrowLeft") {
      leftPressed = false;
    }
  });
};

// ======== FUNCIÓN PRINCIPAL ========
const draw = () => {
  cleanCanvas();

  drawBall();
  drawPaddle();
  drawBricks();
  drawScore();

  collisionDetection();
  ballMovement();
  paddleMovement();

  window.requestAnimationFrame(draw);
};

// ======== INICIO ========
ctx.closePath();
initEvent();
initLevel(currentLevel); // Primer nivel por defecto
draw();
