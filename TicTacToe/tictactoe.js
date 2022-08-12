class Board {
  constructor(win, tie) {
    this.print_winner = win;
    this.print_tie = tie;
    this.board = new Array(3).fill(new Array(3).fill(new Block()));
  }

  isFull() {
    let count = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[i][j].state != "") count++;
      }
    }

    return count === 9 ? true : false;
  }

  getAdjCoords(x, y, direction) {
    switch (direction) {
      case "v":
        x++;
        break;
      case "h":
        y++;
        break;
      case "dd":
        x++;
        y++;
        break;
      case "da":
        x++;
        y--;
        break;
    }
    return { x: x, y: y };
  }

  getAdjSqState(x, y, direction) {
    let coords = this.getAdjCoords(x, y, direction);
    if (
      !this.board[coords.x] ||
      !this.board[coords.x][coords.y] ||
      this.board[coords.x][coords.y].state === ""
    )
      return false;
    return this.grid[coords.x][coords.y].state;
  }

  getSquCntStartingAt(x, y, direction) {
    let sequence = 1;
    let state = this.board[x][y].state;
    while (true) {
      let nextState = this.getAdjSqState(x, y, direction);
      if (state === nextState && nextState !== false) sequence++;
      else break;
      let coords = this.getAdjCoords(x, y, direction);
      x = coords.x;
      y = coords.y;
    }
    return sequence;
  }

  checkWin() {
    let totalSquares = 3;

    for (let i = 0; i < totalSquares; i++) {
      if (this.getSquCntStartingAt(0, i, "v") === totalSquares)
        return this.print_winner();
    }
    for (let i = 0; i < totalSquares; i++) {
      if (this.getSquCntStartingAt(i, 0, "h") === totalSquares)
        return this.print_winner();
    }

    if (this.getSquCntStartingAt(0, 0, "da") === totalSquares)
      return this.print_winner();

    if (this.getSquCntStartingAt(0, totalSquares - 1, "dd") === totalSquares)
      return this.print_winner();

    if (this.isFull()) return this.print_tie();
  }
}

class Block {
  constructor() {
    this.state = "";
  }
  whoseTurn() {
    counter == 0 ? (this.state = "x") : (this.state = "o");
  }
}

class Player {
  constructor(symbol) {
    this.symbol = symbol;
  }
}

class Game {
  constructor() {
    this.board = new Board();
    this.players = [new Player("x"), new Player("o")];
  }
}

let g = new Game();
console.log(g.board);
