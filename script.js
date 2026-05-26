const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#status');
const newRoundBtn = document.querySelector('#newRoundBtn');
const resetScoreBtn = document.querySelector('#resetScoreBtn');
const scoreX = document.querySelector('#scoreX strong');
const scoreO = document.querySelector('#scoreO strong');
const scoreDraw = document.querySelector('#scoreDraw strong');
const scoreXCard = document.querySelector('#scoreX');
const scoreOCard = document.querySelector('#scoreO');

let board = Array(9).fill('');
let currentPlayer = 'X';
let gameActive = true;
let scores = {
  X: 0,
  O: 0,
  draw: 0
};

function handleCellClick(event) {
  const cell = event.target;
  const index = Number(cell.dataset.index);

  if (!gameActive || board[index]) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());
  cell.disabled = true;

  const winningCombo = getWinningCombination();

  if (winningCombo) {
    endGame(`${currentPlayer} wins!`, winningCombo);
    scores[currentPlayer] += 1;
    updateScores();
    return;
  }

  if (board.every(Boolean)) {
    endGame("It's a draw!");
    scores.draw += 1;
    updateScores();
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatus();
}

function getWinningCombination() {
  return winningCombinations.find(([a, b, c]) => {
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function endGame(message, winningCombo = []) {
  gameActive = false;
  statusText.textContent = message;

  cells.forEach(cell => {
    cell.disabled = true;
  });

  winningCombo.forEach(index => {
    cells[index].classList.add('win');
  });
}

function startNewRound() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  gameActive = true;

  cells.forEach(cell => {
    cell.textContent = '';
    cell.disabled = false;
    cell.className = 'cell';
  });

  updateStatus();
}

function resetScores() {
  scores = { X: 0, O: 0, draw: 0 };
  updateScores();
  startNewRound();
}

function updateStatus() {
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  scoreXCard.classList.toggle('active', currentPlayer === 'X');
  scoreOCard.classList.toggle('active', currentPlayer === 'O');
}

function updateScores() {
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
  scoreDraw.textContent = scores.draw;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
newRoundBtn.addEventListener('click', startNewRound);
resetScoreBtn.addEventListener('click', resetScores);

updateStatus();
updateScores();
