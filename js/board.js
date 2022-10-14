class Board {
  constructor(bWidth, bHeight, numQueens) {
    this.bWidth = bWidth;
    this.bHeight = bHeight;
    this.htmlBoard = document.querySelector("#board");
    this.htmlBoard.width = bHeight;
    this.htmlBoard.height = bHeight;
    this.ctx = this.htmlBoard.getContext("2d");
    this.colors = ["white", "gray"];
    this.numQueens = numQueens;
    this.cells = [];
    this.queens = new Map();
    this.row = this.bWidth / this.numQueens;
    this.col = this.bHeight / this.numQueens;
  }
  getCells() {
    for (let i = 0; i < this.numQueens; i++) {
      const rows = [];
      for (let j = 0; j < this.numQueens; j++) {
        const cell = new Cell(this.row * j, this.col * i, this.row, this.col);
        rows.push(cell);
      }
      this.cells.push(rows);
    }
  }
  getQueens() {
    for (let i = 0; i < this.numQueens; i++) {
      const rng = Math.floor(Math.random() * this.numQueens);
      this.queens.set(i, rng);
    }
  }
  displayCells() {
    for (let i = 0; i < this.cells.length; i++) {
      for (let j = 0; j < this.cells[0].length; j++) {
        this.ctx.fillStyle = this.colors[(i + j) % 2];
        const cell = this.cells[j][i];
        this.ctx.fillRect(cell.x, cell.y, cell.x2, cell.y2);
      }
    }
  }
  displayBoard() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.bWidth, this.bHeight);
    this.ctx.fillRect(0, 0, 3000, 3000);
  }
  displayQueens() {
    const img = new Image();
    img.src = "../img/queen.png";
    img.onload = () => {
      this.queens.forEach((k, v) => {
        this.ctx.drawImage(img, k * this.row, v * this.col, this.row, this.col);
      });
    };
  }
}

class Cell {
  constructor(x, y, x2, y2) {
    this.x = x;
    this.y = y;
    this.x2 = x2;
    this.y2 = y2;
  }
}

export const board = new Board(1000, 1000, 5);
// board.displayBoard();
board.getCells();
board.displayCells();
board.getQueens();
board.displayQueens();
console.log(board.queens);
console.log(board.cells);
