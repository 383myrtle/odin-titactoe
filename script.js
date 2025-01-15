const gameBoard = (function() {
    let board = [[null, null, null], [null, null, null], [null, null, null]];
    const setCell = (row, col, value) => {
        board[row][col] = value;
    }
    const getCell = (row, col) => board[row][col];
    return { board, setCell, getCell };
})();

const player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    return { getName, getSymbol };
}

const game = (function() {
    const player1 = player('Player 1', 'X');
    const player2 = player('Player 2', 'O');
    let currentPlayer = player1;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    const placeSymbol = (row, col) => {
        if (gameBoard.getCell(row, col) === null) {
            gameBoard.setCell(row, col, currentPlayer.getSymbol());
            switchPlayer();

            // check if a player won
            const winningSymbol = checkWin()
            if (winningSymbol){
                console.log(`Congratulations, ${winningSymbol === player1.getSymbol() ? player1.getName() : player2.getName()} won the game!`)
            }
        }
    }

    const checkWin = function () {
        const board = gameBoard.board;
        // check rows
        for (let i = 0; i < 3; i++) {
            if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== null) {
                return board[i][0];
            }
        }
        // check columns
        for (let i = 0; i < 3; i++) {
            if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== null) {
                return board[0][i];
            }
        }
        // check diagonals
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== null) {
            return board[0][0];
        }
        if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== null) {
            return board[0][2];
        }

        return null;
    }

    return { player1, player2, currentPlayer, placeSymbol };
})();
