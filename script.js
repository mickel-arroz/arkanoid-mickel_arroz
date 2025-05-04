// ======== VARIABLES GLOBALES ========
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let animationFrameId = null;

const $sprite = document.getElementById("sprite");
const $bricks = document.getElementById("bricks");
const $score = document.getElementById("puntuacion");
const levelSelector = document.getElementById("levelSelector");
const difficultySelector = document.getElementById("difficultySelector");

canvas.width = 700;
canvas.height = 475;

const FPS = 60;
let lastRender = 0;
let deltaTime = 0;

const baseDx = 3;
const baseDy = -1;

// Pelota
const ballRadius = 3;
let x = canvas.width / 2;
let y = canvas.height - 40;

let BALL_SPEED;
let dx = baseDx;
let dy = baseDy;

// Paleta
const paddleHeight = 10;
const paddleWidth = 50;
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = canvas.height - paddleHeight - 2;

let leftPressed = false;
let rightPressed = false;

// Puntuación
let score = 0;

// Ladrillos
const brickWidth = 32;
const brickHeight = 16;
const brickPadding = 1;
const brickOffsetTop = 60;

const BRICK_STATUS = {
  DESTROYED: 0,
  ACTIVE: 1,
};

// Niveles creativos (14x20) con colores (1 a 7)
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
  ],
  [
    [0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0],
    [0, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 0],
    [1, 2, 2, 3, 3, 3, 3, 3, 3, 2, 2, 1],
    [1, 2, 3, 4, 4, 4, 4, 4, 4, 3, 2, 1],
    [1, 3, 4, 4, 5, 5, 5, 5, 4, 4, 3, 1],
    [1, 3, 4, 5, 5, 5, 5, 5, 4, 4, 3, 1],
    [0, 3, 4, 5, 6, 6, 5, 5, 4, 4, 3, 0],
    [0, 3, 4, 5, 6, 6, 5, 5, 4, 4, 3, 0],
    [0, 0, 3, 4, 5, 5, 4, 4, 3, 3, 0, 0],
    [0, 0, 3, 4, 4, 4, 4, 4, 3, 3, 0, 0],
    [0, 0, 0, 3, 3, 3, 3, 3, 3, 0, 0, 0],
    [0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 1, 1, 2, 2, 2, 2, 1, 1, 0, 0],
    [0, 1, 1, 2, 2, 3, 3, 2, 2, 1, 1, 0],
    [1, 1, 2, 2, 3, 3, 3, 3, 2, 2, 1, 1],
    [1, 2, 2, 3, 3, 4, 4, 3, 3, 2, 2, 1],
    [2, 2, 3, 3, 4, 4, 4, 4, 3, 3, 2, 2],
    [2, 3, 3, 4, 4, 5, 5, 4, 4, 3, 3, 2],
    [3, 3, 4, 4, 5, 5, 5, 5, 4, 4, 3, 3],
    [3, 4, 4, 5, 5, 6, 6, 5, 5, 4, 4, 3],
    [3, 5, 5, 6, 6, 7, 7, 6, 6, 5, 5, 3],
    [3, 4, 4, 5, 5, 6, 6, 5, 5, 4, 4, 3],
    [3, 3, 4, 4, 5, 5, 5, 5, 4, 4, 3, 3],
    [2, 3, 3, 4, 4, 5, 5, 4, 4, 3, 3, 2],
    [2, 2, 3, 3, 4, 4, 4, 4, 3, 3, 2, 2],
  ],
];

let bricks = [];

let currentLevelIndex = 0;

let currentModal = null;

// ======== FUNCIONES AUXILIARES ========
const difficultySettings = {
  facil: { ballMultiplier: 1, paddleSpeed: 6 },
  normal: { ballMultiplier: 2, paddleSpeed: 8 },
  dificil: { ballMultiplier: 2.5, paddleSpeed: 11 },
  extremo: { ballMultiplier: 4, paddleSpeed: 14 },
};
let currentDifficulty = "facil";

// ======== FUNCIONES AUXILIARES ========
const cleanCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
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
    showModal("gameover");
  }

  x += dx;
  y += dy;
};

const paddleMovement = () => {
  let paddleSpeed = difficultySettings[currentDifficulty].paddleSpeed;
  if (leftPressed && paddleX > 3) {
    paddleX -= paddleSpeed;
  } else if (rightPressed && paddleX < canvas.width - paddleWidth - 3) {
    paddleX += paddleSpeed;
  }
};

const collisionDetection = () => {
  let remainingBricks = 0;
  for (let r = 0; r < bricks.length; r++) {
    for (let c = 0; c < bricks[r].length; c++) {
      const brick = bricks[r][c];
      if (!brick || brick.status === BRICK_STATUS.DESTROYED) continue;

      remainingBricks++;

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

  if (remainingBricks === 0 && isGameStarted) {
    showModal("level-complete");
  }
};

// ======== INICIALIZACIÓN DEL SELECTOR DE NIVELES ========
function initLevelSelector() {
  levels.forEach((_, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `Nivel ${index + 1}`;
    levelSelector.appendChild(option);
  });

  levelSelector.value = 0;
  updateSelectorState();
}

// ======== EVENTO DE CAMBIO DE NIVEL ========

levelSelector.addEventListener("change", () => {
  currentLevelIndex = parseInt(levelSelector.value);
  reiniciarJuego();
  showModal("inicio");
  isGameStarted = false;
  updateSelectorState();
});

function updateSelectorState() {
  if (currentModal) {
    levelSelector.disabled = false;
    difficultySelector.disabled = false;
  } else {
    levelSelector.disabled = true;
    difficultySelector.disabled = true;
  }
}

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

// ======== INICIALIZACIÓN DEL SELECTOR DE DIFICULTAD ========
function initDifficultySelector() {
  Object.keys(difficultySettings).forEach((key) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)}`;
    difficultySelector.appendChild(option);
  });

  difficultySelector.value = currentDifficulty;
  updateDifficultySelectorState();
}

// ======== EVENTOS DE CAMBIO DE DIFICULTAD ========
difficultySelector.addEventListener("change", () => {
  currentDifficulty = difficultySelector.value;
  // Reiniciamos el juego para aplicar la nueva velocidad de pelota y paleta.
  reiniciarJuego();
  showModal("inicio");
  isGameStarted = false;
  updateDifficultySelectorState();
});

function updateDifficultySelectorState() {
  if (currentModal) {
    difficultySelector.disabled = false;
  } else {
    difficultySelector.disabled = true;
  }
}

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

// ======== FUNCIONES DE MODALES ========

let isGameStarted = false;
let juegoPausado = false;
let isGameOver = false;

const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modalMessage");
const modalButton = document.getElementById("modalButton");

function showModal(modalType) {
  if (currentModal && currentModal !== modalType) return;

  currentModal = modalType;

  switch (modalType) {
    case "inicio":
      currentModal = "inicio";
      modalMessage.textContent = "PLAY GAME";
      modalButton.textContent = "START";
      updateSelectorState(); // Habilita el select
      modalButton.onclick = () => {
        modal.style.display = "none";
        currentModal = null;
        isGameStarted = true;
        juegoPausado = false;
        isGameOver = false;
        updateSelectorState();
      };
      break;

    case "gameover":
      currentModal = "gameover";
      modalMessage.textContent = "GAME OVER";
      modalButton.textContent = "CONTINUAR";
      isGameStarted = false;
      isGameOver = true;
      updateSelectorState();

      modalButton.onclick = () => {
        modal.style.display = "none";
        currentModal = null;
        reiniciarJuego();
        isGameStarted = true;
        updateSelectorState();
      };
      break;

    case "pausa":
      if (isGameOver || !isGameStarted) return;
      currentModal = "pausa";
      modalMessage.textContent = "PAUSA";
      modalButton.textContent = "REANUDAR";
      isGameStarted = false; // Mantener este estado
      updateSelectorState(); // Habilitar select al estar pausa
      modalButton.onclick = () => {
        modal.style.display = "none";
        juegoPausado = false;
        currentModal = null;
        isGameStarted = true;
        updateSelectorState();
      };
      break;

    case "level-complete":
      currentModal = "level-complete";
      const isLastLevel = currentLevelIndex === levels.length - 1;
      modalMessage.textContent = isLastLevel
        ? "¡FELICIDADES! JUEGO COMPLETADO"
        : "¡NIVEL COMPLETADO!";
      modalButton.textContent = isLastLevel ? "REINICIAR" : "SIGUIENTE NIVEL";
      updateSelectorState();
      modalButton.onclick = () => {
        if (isLastLevel) {
          currentLevelIndex = 0;
          reiniciarJuego(true);
        } else {
          currentLevelIndex++;
          reiniciarJuego(false);
        }
        levelSelector.value = currentLevelIndex;
        modal.style.display = "none";
        currentModal = null;
      };
      break;

    default:
      console.error("Modal type no reconocido");
      return;
  }
  modal.style.display = "flex";
}

showModal("inicio");

// Botón de pausa en pantalla
btnPause.addEventListener("click", () => {
  if (currentModal && currentModal !== "pausa") return;

  if (currentModal === "pausa") {
    // Cerrar
    modal.style.display = "none";
    juegoPausado = false;
    currentModal = null;
    isGameStarted = true;
  } else if (isGameStarted) {
    // Abrir
    juegoPausado = true;
    showModal("pausa");
  }
  updateSelectorState();
});

// Evento para pausar/reanudar con la tecla "P"
document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "p" && !isGameOver) {
    // Solo actuar si no hay game over
    if (currentModal === "pausa") {
      // Cerrar modal de pausa
      modal.style.display = "none";
      juegoPausado = false;
      currentModal = null;
      isGameStarted = true;
    } else if (!currentModal && isGameStarted) {
      juegoPausado = true;
      showModal("pausa");
    }
    updateSelectorState();
  }
});

// ======== FUNCIÓN DE REINICIO ========
function reiniciarJuego(resetScore = true) {
  x = canvas.width / 2;
  y = canvas.height - 40;
  dx = baseDx * difficultySettings[currentDifficulty].ballMultiplier;
  dy = baseDy * difficultySettings[currentDifficulty].ballMultiplier;
  BALL_SPEED = Math.sqrt(dx * dx + dy * dy);
  paddleX = (canvas.width - paddleWidth) / 2;

  if (resetScore) {
    score = 0;
    $score.innerText = "0000";
  }

  isGameOver = false;
  juegoPausado = false;
  leftPressed = false;
  rightPressed = false;

  currentModal = null;

  updateSelectorState();

  currentLevel = levels[currentLevelIndex];
  initLevel(currentLevel);

  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }

  modal.style.display = "none";
  cleanCanvas();
  drawBall();
  drawPaddle();
  drawBricks();

  animationFrameId = window.requestAnimationFrame(draw);
}

// ======== FUNCIÓN PRINCIPAL ========

const draw = (timestamp) => {
  if (!isGameStarted) {
    animationFrameId = window.requestAnimationFrame(draw);
    return;
  }

  deltaTime = timestamp - lastRender;

  if (deltaTime < 1000 / FPS) {
    animationFrameId = window.requestAnimationFrame(draw);
    return;
  }

  lastRender = timestamp;

  cleanCanvas();
  drawBall();
  drawPaddle();
  drawBricks();
  drawScore();

  if (!juegoPausado) {
    collisionDetection();
    ballMovement();
    paddleMovement();
  }

  animationFrameId = window.requestAnimationFrame(draw);
};

// ======== INICIO ========
ctx.closePath();
initEvent();
initLevelSelector();
initDifficultySelector();
initLevel(levels[currentLevelIndex]);

draw();
