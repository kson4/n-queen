export function getConflicts(map) {
  let conflicts = 0;
  const cols = new Map();
  const diags = new Map();
  // k is cols, v is rows

  map.forEach((k, v) => {
    map.forEach((k2, v2) => {
      if (v2 > v) {
        if (v !== v2 && k == k2 && !(cols.has(v2, v) || cols.has(v, v2))) {
          // console.log("COL: ", k, v, k2, v2);
          conflicts++;
        }
        if (
          v !== v2 &&
          Math.abs(v - v2) === Math.abs(k - k2) &&
          !(diags.has(v2, v) || diags.has(v, v2))
        ) {
          // console.log("DIAG", k, v, k2, v2);
          conflicts++;
          diags.set(v, v2);
        }
      }
    });
  });
  return conflicts;
}

export function showConflicts(map, cells) {
  const htmlBoard = document.querySelector("#board");
  const ctx = htmlBoard.getContext("2d");
  ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
  // k is cols, v is rows
  map.forEach((k, v) => {
    map.forEach((k2, v2) => {
      if (v2 > v) {
        if (v !== v2 && k == k2) {
          console.log("COL: ", k, v, k2, v2);
          for (let i = v; i < v2 + 1; i++) {
            const cell = cells[i][k];
            ctx.fillRect(cell.x, cell.y, cell.x2, cell.y2);
          }
        }
        if (v !== v2 && Math.abs(v - v2) === Math.abs(k - k2)) {
          console.log("DIAG", k2, v2, k, v);
          if (k2 > k) {
            for (let i = 0; i < k2 - k + 1; i++) {
              console.log(v2 - i, k2 - i);
              const cell = cells[v2 - i][k2 - i];
              ctx.fillRect(cell.x, cell.y, cell.x2, cell.y2);
            }
          } else {
            for (let i = 0; i < k - k2 + 1; i++) {
              const cell = cells[v2 - i][k2 + i];
              ctx.fillRect(cell.x, cell.y, cell.x2, cell.y2);
            }
          }
        }
      }
    });
  });
}
