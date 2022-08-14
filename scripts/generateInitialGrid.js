export const MINE = -1;
const EMPTY = 0;

export default function initialiseGrid(GRID_SIZE) {
    const grid = Array.from(new Array(GRID_SIZE), () =>
        new Array(GRID_SIZE).fill(EMPTY)
    );

    // To help with generating 1 mine pos
    function getRandomCellPos() {
        let ans = [
            Math.floor(Math.random() * grid.length),
            Math.floor(Math.random() * grid.length),
        ];
        return ans;
    }
    // Get a new mine pos if prev generated one already used
    function getNewMinePos() {
        let pos = null;
        do {
            pos = getRandomCellPos();
        } while (grid[pos[0]][pos[1]] != EMPTY);

        return pos;
    }

    function generateMines() {
        for (let mineNum = 0; mineNum != GRID_SIZE; mineNum++) {
            let minePos = getNewMinePos();
            grid[minePos[0]][minePos[1]] = MINE;
        }
    }

    generateMines();

    function increaseSurroundingEmptyValues(i, j) {
        let surroundingPosns = [];
        for (let row = i - 1; row <= i + 1; row++) {
            for (let col = j - 1; col <= j + 1; col++) {
                surroundingPosns.push([row, col]);
            }
        }

        surroundingPosns.forEach((pos) => {
            if (
                pos[0] >= 0 &&
                pos[0] < grid.length &&
                pos[1] >= 0 &&
                pos[1] < grid.length &&
                grid[pos[0]][pos[1]] !== MINE
            ) {
                grid[pos[0]][pos[1]]++;
            }
        });
    }

    function generateEmptyCellValues() {
        for (let i = 0; i != grid.length; i++) {
            for (let j = 0; j != grid.length; j++) {
                if (grid[i][j] === MINE) {
                    increaseSurroundingEmptyValues(i, j);
                }
            }
        }
    }
    generateEmptyCellValues();

    return grid;
}
