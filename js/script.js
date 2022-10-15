import { runSteepest } from "./board.js";

const hcs = document.querySelector("#hill-climb-sideways");
hcs.addEventListener("click", runSteepest);
