export function matrix(m, n, val) {
    return Array.from(new Array(m), () => new Array(n).fill(val));
}

export function getPositionFromIndices(i, j, grid) {
    let GRID_SIZE = grid.length;
    return GRID_SIZE * i + j;
}
export function indicesFromCellId(cellId, grid) {
    let GRID_SIZE = grid.length;
    let i = Math.floor(cellId / GRID_SIZE);
    let j = cellId % GRID_SIZE;
    return [i, j];
}
export function getNumberOfClickedTiles() {
    let numClickedTiles = Array.from(document.querySelectorAll("[clicked]"));
    numClickedTiles = numClickedTiles.length;
    return numClickedTiles;
}

export function hasWon(GRID_SIZE, marksRemaining) {
    let numTotal = GRID_SIZE * GRID_SIZE;
    let numUnclicked = numTotal - getNumberOfClickedTiles();
    if (marksRemaining == 0 && numUnclicked == numMines) {
        return true;
    }
    return false;
}

// turn an island of 0s into clicked
export function clickEmptyIslands(startRow, startCol, grid) {
    let visited = matrix(grid.length, grid.length, 0);
    let GRID_SIZE = grid.length;
    // console.log(visited);
    dfs(startRow, startCol);

    function getNeighbors(i, j) {
        let neighbors = [
            [i + 1, j],
            [i - 1, j],
            [i, j + 1],
            [i, j - 1],
        ];
        return neighbors;
    }
    function outOfBounds(neighbor) {
        if (
            neighbor[0] < 0 ||
            neighbor[0] >= GRID_SIZE ||
            neighbor[1] < 0 ||
            neighbor[1] >= GRID_SIZE
        ) {
            return true;
        }
        return false;
    }

    function dfs(i, j) {
        if (outOfBounds([i, j])) {
            return;
        }
        let neighbors = getNeighbors(i, j);

        // visit
        visited[i][j] = 1;
        let pos = getPositionFromIndices(i, j, grid);
        let gridItemDiv = document.querySelector(`[data-cell-id="${pos}"]`);
        gridItemDiv.setAttribute("clicked", "");
        // visit end

        for (let neigh of neighbors) {
            if (outOfBounds(neigh)) continue;
            if (visited[neigh[0]][neigh[1]]) continue;
            if (grid[neigh[0]][neigh[1]] != 0) continue;
            dfs(neigh[0], neigh[1]);
        }
    }
}
