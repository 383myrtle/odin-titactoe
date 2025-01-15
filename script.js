const gameBoard = (function() {
    let board = [[null, null, null], [null, null, null], [null, null, null]];
    const setCell = (row, col, value) => {
        board[row][col] = value;
    }
    const getCell = (row, col) => board[row][col];
    return { board, setCell, getCell };
})();
