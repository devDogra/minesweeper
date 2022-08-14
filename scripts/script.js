import initialiseGrid, { MINE } from "./generateInitialGrid.js";
import renderGrid from "./renderGrid.js";
import {
    matrix,
    getPositionFromIndices,
    indicesFromCellId,
    getNumberOfClickedTiles,
    clickEmptyIslands,
    hasWon,
} from "./utils.js";

// smileys
const GAMEFACE = "🙂";
const WONFACE = "😎";
const LOSTFACE = "😵";

// also the number of mines
const GRID_SIZE = 10;
let numMines = GRID_SIZE;

// pplaying, won, lost
let gameState = "playing";

let marksRemaining = GRID_SIZE;
/* --------------------------------initial setup ------------------------------ */

function resetGame() {
    grid = initialiseGrid(GRID_SIZE);
    console.log(grid);
    marksRemaining = GRID_SIZE;
    gameState = "playing";
    updateSmiley();
    renderMarks();
    renderGrid(grid);

    return [grid, gameState, marksRemaining];
}

function renderMarks() {
    let marksElement = document.querySelector(".marks-remaining");
    marksElement.innerText = marksRemaining;
}
// initial setup
let grid = initialiseGrid(GRID_SIZE);

renderMarks();
renderGrid(grid);

/* ---------------------   smiley  -------------------------------------- */

const smileyBtn = document.querySelector(".info2");

function updateSmiley() {
    let smiley = smileyBtn.querySelector(".smiley");

    if (gameState == "playing") {
        smiley.innerText = GAMEFACE;
    } else if (gameState == "won") {
        smiley.innerText = WONFACE;
    } else if (gameState == "lost") {
        smiley.innerText = LOSTFACE;
    }
    return;
}

// Smiley click
smileyBtn.addEventListener("click", (e) => {
    if (gameState == "playing") return;
    else if (gameState == "lost") {
        resetGame();
    } else if (gameState == "won") {
        resetGame();
    }
});

/* -------------------------------------------------------------------------- */
// On click helper
function setToClickedAll() {
    let gridItemsAll = Array.from(document.querySelectorAll(".grid-item"));
    gridItemsAll.forEach((gridItemDiv) => {
        gridItemDiv.setAttribute("clicked", "");
    });
}
// On left click
document.addEventListener("click", (e) => {
    if (!e.target.matches(".grid-item")) return;

    let gridItemDiv = e.target;

    if (gridItemDiv.hasAttribute("flagged")) return;

    // if clicked on a mine
    if (gridItemDiv.dataset.cellType == "mine") {
        setToClickedAll();
        gameState = "lost";
        updateSmiley();
        return;
    }

    let clickedCellId = parseInt(gridItemDiv.dataset.cellId);
    let clickedCellType = gridItemDiv.dataset.cellType;

    if (clickedCellType == "empty") {
        let [i, j] = indicesFromCellId(clickedCellId, grid);
        console.log("gonna explore : " + i + ", " + j);

        // turn an island of 0s into clicked
        clickEmptyIslands(i, j, grid);
    }
    gridItemDiv.setAttribute("clicked", "");
});

/* -------------------------------------------------------------------------- */

// Right click
document.addEventListener(
    "contextmenu",
    (e) => {
        if (!e.target.matches(".grid-item")) return;
        if (e.target.hasAttribute("clicked")) return;

        // win condition
        if (hasWon(GRID_SIZE, marksRemaining)) {
            gameState = "won";
            updateSmiley();
            return;
        }

        e.preventDefault();
        //  set flag
        // if.. then we're turning the flag off, so marks++;
        if (e.target.hasAttribute("flagged")) {
            marksRemaining++;
        } else {
            marksRemaining--;
        }
        e.target.toggleAttribute("flagged");

        renderMarks();

        return false;
    },
    false
);
