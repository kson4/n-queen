export function getConflicts(map) {
  let conflicts = 0;
  const cols = new Map();
  const diags = new Map();
  // k is cols, v is rows
  map.forEach((k, v) => {
    // console.log("looking at queen: ", k, v);
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
          // console.log(diags);
        }
      }
    });
    // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~");
  });
  console.log(conflicts);
  return conflicts;
}
