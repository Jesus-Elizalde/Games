const selection = document.querySelector(".selection");
const playBoard = document.querySelector(".play-board");

let gameBoard,
  user = "X",
  computer = "O";
const cells = document.querySelectorAll(".cell");
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [6, 4, 2],
  [2, 5, 8],
  [1, 4, 7],
  [0, 3, 6],
];

const playerSelect = (player) => {
  user = player;
  computer = player === "X" ? "O" : "X";

  gameBoard = Array.from(Array(9).keys());

  for (let cell of cells) {
    cell.addEventListener("click", handleClick, false);
  }

  if (computer === "X") {
    turn(bestSpot(), computer);
  }
  selection.classList.add("fadeOut");
  setTimeout(() => {
    selection.style.display = "none";
  }, 290);
  playBoard.classList.add("fadeIn");
  setTimeout(() => {
    playBoard.style.display = "block";
  }, 290);
};

const startGame = () => {
  playBoard.classList.remove("fadeIn");
  playBoard.classList.add("fadeOut");
  setTimeout(() => {
    playBoard.style.display = "none";
  }, 290);

  selection.classList.add("fadeIn");
  setTimeout(() => {
    selection.style.display = "block";
  }, 290);

  for (let cell of cells) {
    cell.innerHTML = "";
    cell.style.color = "#000";
    cell.style.background = "ff9eb150";
  }
};

startGame();

const handleClick = (gameSpace) => {
  if (typeof gameBoard[gameSpace.target.id] === "number") {
    turn(gameSpace.target.id, user);
    if (!checkWin(gameBoard, user) && !checkTie()) {
      setTimeout(() => {
        turn(bestSpot(), computer);
      }, 500);
    }
  }
};
const turn = (spaceId, player) => {
  gameBoard[spaceId] = player;
  document.getElementById(spaceId).innerHTML = player;

  let gameWon = checkWin(gameBoard, player);
  if (gameWon) {
    gameOver(gameWon);
  }

  checkTie();
};
const checkWin = (board, player) => {
  let spaces = board.reduce((acc, ele, idx) => (ele === player) ? acc.concat(idx) : acc, []);
  let gameWon = null


};
const bestSpot = () => {};
const gameOver = () => {};
const checkTie = () => {};
