import { board } from "./board.js";

function getConflicts() {
  let conflicts = 0;
  const cols = new Map();
  const diags = new Map();
  // k is cols, v is rows
  board.queens.forEach((k, v) => {
    console.log("looking at queen: ", k, v);
    board.queens.forEach((k2, v2) => {
      // check columns
      if (v !== v2 && k == k2 && !(cols.has(k, k2) || cols.has(k2, k))) {
        console.log("COL: ", k, v, k2, v2);
        conflicts++;
        cols.set(k, k2);
      }
      // check diagonals
      if (
        v !== v2 &&
        Math.abs(v - v2) == Math.abs(k - k2) &&
        !(diags.has(v, v2) || diags.has(v2, v))
      ) {
        console.log("DIAG", k, v, k2, v2);
        conflicts++;
        diags.set(v, v2);
      }
    });
  });
  console.log(conflicts);
}
getConflicts();
