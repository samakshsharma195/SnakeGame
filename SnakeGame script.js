{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // script.js\
const canvas = document.getElementById('gameCanvas');\
const ctx = canvas.getContext('2d');\
const scoreEl = document.getElementById('score');\
\
const gridSize = 20;\
let snake, food, direction, score, gameRunning, gameInterval;\
\
function initGame() \{\
  snake = [\
    \{ x: 160, y: 160 \},\
    \{ x: 140, y: 160 \},\
    \{ x: 120, y: 160 \}\
  ];\
  direction = \{ x: gridSize, y: 0 \};\
  score = 0;\
  scoreEl.textContent = score;\
  food = generateFood();\
  gameRunning = false;\
  clearInterval(gameInterval);\
  drawGame();\
\}\
\
function generateFood() \{\
  let pos;\
  do \{\
    pos = \{\
      x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,\
      y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize\
    \};\
  \} while (snake.some(s => s.x === pos.x && s.y === pos.y));\
  return pos;\
\}\
\
function drawGame() \{\
  ctx.fillStyle = '#1a1a1a';\
  ctx.fillRect(0, 0, canvas.width, canvas.height);\
\
  snake.forEach((segment, idx) => \{\
    ctx.fillStyle = idx === 0 ? '#e74c3c' : '#27ae60';\
    ctx.fillRect(segment.x, segment.y, gridSize, gridSize);\
    ctx.strokeStyle = '#2c3e50';\
    ctx.lineWidth = 2;\
    ctx.strokeRect(segment.x, segment.y, gridSize, gridSize);\
  \});\
\
  ctx.fillStyle = '#f39c12';\
  ctx.beginPath();\
  ctx.arc(\
    food.x + gridSize/2,\
    food.y + gridSize/2,\
    gridSize/2 - 2,\
    0,\
    Math.PI * 2\
  );\
  ctx.fill();\
\
  if (!gameRunning) \{\
    ctx.fillStyle = 'rgba(0,0,0,0.7)';\
    ctx.fillRect(0,0,canvas.width,canvas.height);\
    ctx.fillStyle = '#ecf0f1';\
    ctx.font = 'bold 30px Arial';\
    ctx.textAlign = 'center';\
    if (score === 0) \{\
      ctx.fillText('Click to Start', canvas.width/2, canvas.height/2);\
    \} else \{\
      ctx.fillText('Game Over!', canvas.width/2, canvas.height/2 - 30);\
      ctx.font = '20px Arial';\
      ctx.fillText(`Final Score: $\{score\}`, canvas.width/2, canvas.height/2 + 10);\
      ctx.fillText('Click to Restart', canvas.width/2, canvas.height/2 + 40);\
    \}\
  \}\
\}\
\
function moveSnake() \{\
  const head = \{ x: snake[0].x + direction.x, y: snake[0].y + direction.y \};\
  snake.unshift(head);\
  if (head.x === food.x && head.y === food.y) \{\
    score += 10;\
    scoreEl.textContent = score;\
    food = generateFood();\
  \} else \{\
    snake.pop();\
  \}\
\}\
\
function checkCollisions() \{\
  const head = snake[0];\
  if (\
    head.x < 0 || head.x >= canvas.width ||\
    head.y < 0 || head.y >= canvas.height\
  ) return true;\
  for (let i = 1; i < snake.length; i++) \{\
    if (head.x === snake[i].x && head.y === snake[i].y) return true;\
  \}\
  return false;\
\}\
\
function gameLoop() \{\
  if (checkCollisions()) \{\
    gameRunning = false;\
    clearInterval(gameInterval);\
    drawGame();\
    return;\
  \}\
  moveSnake();\
  drawGame();\
\}\
\
function startGame() \{\
  if (!gameRunning) \{\
    gameRunning = true;\
    gameInterval = setInterval(gameLoop, 150);\
  \}\
\}\
\
canvas.addEventListener('click', () => \{\
  if (!gameRunning) \{\
    initGame();\
    startGame();\
  \}\
\});\
\
document.addEventListener('keydown', e => \{\
  if (!gameRunning) return;\
  const key = e.key;\
  if (key === 'ArrowUp' && direction.y === 0) direction = \{ x: 0, y: -gridSize \};\
  if (key === 'ArrowDown' && direction.y === 0) direction = \{ x: 0, y: gridSize \};\
  if (key === 'ArrowLeft' && direction.x === 0) direction = \{ x: -gridSize, y: 0 \};\
  if (key === 'ArrowRight' && direction.x === 0) direction = \{ x: gridSize, y: 0 \};\
\});\
\
window.onload = initGame;\
}