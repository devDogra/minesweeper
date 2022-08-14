const gridContainer = document.querySelector(".grid-container");
const gridWrapper = document.querySelector(".grid-wrapper");
const gridItemTemplate = document.querySelector("#grid-item-template");

function* gridItemIdGenerator(start) {
    let count = start;
    while (true) {
        yield count;
        count++;
    }
}
let g = gridItemIdGenerator(0);

function resetGenerator() {
    g = gridItemIdGenerator(0);
}

const FLAG_EMOJI = "🚩";
const BOMB_EMOJI = "💣";
let colors = [
    "orange",
    "blue",
    "green",
    "red",
    "purple",
    "black",
    "grey",
    "maroon",
    "turquoise",
];
function createGridItem(grid) {
    let GRID_SIZE = grid.length;
    let gridItemTemplateClone = gridItemTemplate.content.cloneNode(true);

    let gridItemDiv = gridItemTemplateClone.querySelector(".grid-item");
    let gridItemSpan = gridItemTemplateClone.querySelector(
        ".grid-item-cell-value"
    );
    // console.log(gridItemTemplateClone);

    // create gs*gs items

    let newId = g.next();
    // console.log(newID.value);
    gridItemDiv.dataset.cellId = newId.value;
    let gridItemRow = Math.floor(newId.value / GRID_SIZE);
    let gridItemCol = newId.value % GRID_SIZE;
    // console.log(gridItemRow, gridItemCol);
    let cellValue = grid[gridItemRow][gridItemCol];
    gridItemSpan.innerText =
        cellValue == -1 ? BOMB_EMOJI : cellValue == 0 ? "0" : cellValue;
    gridItemSpan.style.color = colors[cellValue];
    gridItemDiv.dataset.cellType =
        cellValue == -1 ? "mine" : cellValue == 0 ? "empty" : "normal";

    return gridItemDiv;
}

export default function renderGrid(grid) {
    resetGenerator();
    gridContainer.innerHTML = "";
    let numItems = grid.length * grid.length;
    while (numItems--) {
        let newGridItem = createGridItem(grid);
        gridContainer.appendChild(newGridItem);
    }
}
