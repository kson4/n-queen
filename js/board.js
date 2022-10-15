import { getConflicts, showConflicts } from "./functions.js";

class Board {
  constructor(bWidth, bHeight, numQueens) {
    this.numQueens = numQueens;
    this.bWidth = bWidth;
    this.bHeight = bHeight;
    this.htmlBoard = document.querySelector("#board");
    this.htmlBoard.width = bHeight;
    this.htmlBoard.height = bHeight;
    this.ctx = this.htmlBoard.getContext("2d");
    this.row = this.bWidth / this.numQueens;
    this.col = this.bHeight / this.numQueens;

    this.colors = ["white", "gray"];
    this.cells = [];

    this.queenMap = new Map();
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
      this.queenMap.set(i, rng);
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
  displayQueens(map) {
    const img = new Image();
    img.src = "../img/queen.png";
    img.onload = () => {
      map.forEach((k, v) => {
        this.ctx.drawImage(img, k * this.row, v * this.col, this.row, this.col);
      });
    };
  }
  showSolution(map) {
    this.ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
    console.log(map);
    map.forEach((k, v) => {
      for (let i = 0; i < this.numQueens; i++) {
        const cell = this.cells[k][i];
        this.ctx.fillRect(cell.x, cell.y, cell.x2, cell.y2);
      }
    });
  }
  steepestClimb() {
    let minArrangement = new Map(
      JSON.parse(JSON.stringify(Array.from(this.queenMap)))
    );
    const curCost = getConflicts(this.queenMap, this.cells);
    let minCost = curCost;

    for (let i = 0; i < this.numQueens; i++) {
      for (let j = 0; j < this.numQueens; j++) {
        if (this.queenMap.get(i) !== j) {
          const arrangement = new Map(
            JSON.parse(JSON.stringify(Array.from(this.queenMap)))
          );
          arrangement.delete(i);
          arrangement.set(i, j);
          // console.log(arrangement);
          const cost = getConflicts(arrangement, this.cells);
          if (minCost > cost || minCost == cost) {
            // if (minCost > cost) {
            minCost = cost;
            minArrangement = new Map(
              JSON.parse(JSON.stringify(Array.from(arrangement)))
            );
          }
        }
      }
    }
    if (minCost == 0) {
      console.log("SOLUTION FOUND");
    }
    this.queenMap = minArrangement;
    console.log("number of conflicts: ", minCost);
    // return curCost == minCost;

    return minCost == 0;
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

export const board = new Board(1000, 1000, 10);
// board.displayBoard();
board.getCells();
board.displayCells();
board.getQueens();
board.displayQueens(board.queenMap);
console.log(board.queenMap);
console.log(board.cells);

const steepestMap = new Set();
function runSteepest() {
  // setTimeout(() => {
  //   let found = board.steepestClimb();
  //   if (found) {
  //     console.log("could not find a better arrangement");
  //   } else {
  //     board.displayCells();
  //     board.displayQueens(board.queenMap);
  //     runSteepest();
  //   }
  // }, 500);
  setTimeout(() => {
    let found = board.steepestClimb();
    if (found || steepestMap.has(JSON.stringify(Array.from(board.queenMap)))) {
      console.log("could not find a better arrangement");
      board.displayQueens(board.queenMap);
      showConflicts(board.queenMap, board.cells);
      console.log(board.queenMap);
      // board.showSolution(board.queenMap);
    } else {
      steepestMap.add(JSON.stringify(Array.from(board.queenMap)));
      board.displayCells();
      board.displayQueens(board.queenMap);
      showConflicts(board.queenMap, board.cells);
      setTimeout(() => {
        board.displayCells();
        board.displayQueens(board.queenMap);
      }, 250);
      runSteepest();
    }
  }, 500);
}

runSteepest();
