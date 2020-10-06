let canv, ctx;
let trail = [],
  tail = 5;    // initial tail length
let gaming = false;

function init() {
  canv = document.getElementById('field');
  ctx = canv.getContext("2d");
  document.addEventListener('keydown', keyPush);
  setInterval(game, 1000 / 10);
}

window.addEventListener('load', init);

let xv = 0, yv = 0;
let playerX = 10, playerY = 10;
const gridSize = 20, tileCount = 20;
let targetX = 15, targetY = 15;

function game() {
  playerX += xv;
  playerY += yv;

  // cross horizontal & vertical border
  if (playerX < 0) {
    playerX = tileCount - 1;
  }
  if (playerX > tileCount - 1) {
    playerX = 0;
  }

  if (playerY < 0) {
    playerY = tileCount - 1;
  }
  if (playerY > tileCount - 1) {
    playerY = 0;
  }

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canv.width, canv.height);

  // render snake
  ctx.fillStyle = 'lime';
  for (let i = 0; i < trail.length; i++) {
    ctx.fillRect(trail[i].x * gridSize, trail[i].y * gridSize, gridSize - 2, gridSize - 2);

    // when snake crashes, reset its tail
    if (!gaming) continue;
    if (trail[i].x === playerX && trail[i].y === playerY) {
      console.log(trail, playerX, playerY);
      reset();
    }
  }
  trail.push({ x: playerX, y: playerY });
  while (trail.length > tail) {
    trail.shift();
  }

  // render target
  if (targetX === playerX && targetY === playerY) {
    tail++;
    targetX = Math.floor(Math.random() * tileCount);
    targetY = Math.floor(Math.random() * tileCount);
  }

  ctx.fillStyle = 'red';
  ctx.fillRect(targetX * gridSize, targetY * gridSize, gridSize - 2, gridSize - 2);
}

function reset() {
  console.log('dead');

  gaming = false;
  tail = 5;
  trail = [];
  playerX = 10;
  playerY = 10;
  xv = 0;
  yv = 0;
}

function keyPush(e) {
  if (!gaming) {
    gaming = true;
  }

  switch (e.keyCode) {
    case 37:    // left arrow
      xv = -1;
      yv = 0;
      break;
    case 38:    // up arrow
      xv = 0;
      yv = -1;
      break;
    case 39:    // right arrow
      xv = 1;
      yv = 0;
      break;
    case 40:    // down arrow
      xv = 0;
      yv = 1;
      break;
    default:
      break;
  }
}