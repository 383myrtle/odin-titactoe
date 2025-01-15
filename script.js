const gameBoard = (function() {
    let board = [[null, null, null], [null, null, null], [null, null, null]];
    const gridCells = document.querySelectorAll(".cell");
    const gameGrid = document.querySelector(".game-grid");
    const cellClick = (e) => {
        const cell = e.target;
        const row = cell.dataset.row;
        const col = cell.dataset.column;

        game.play(row, col);
        gameBoard.render();
    }

    gameGrid.addEventListener("click", cellClick);

    const pauseGame = () =>{
        gameGrid.removeEventListener("click", cellClick);
    }
    const startGame = () =>{
        gameGrid.addEventListener("click", cellClick);
    }
    const setCell = (row, col, value) => {
        board[row][col] = value;
    }
    const getCell = (row, col) => board[row][col];
    const render = () => {
        gridCells.forEach((cell) => {
            const row = cell.dataset.row;
            const col = cell.dataset.column;
            cell.textContent = board[row][col];
        });
    }
    const checkWin = function () {
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
        // check draw
        for (let i=0; i<3; i++){
            for (let j=0; j<3; j++){
                if (board[i][j]===null){
                    return null;
                }
            }
        }

        return "draw";
    }
    return { board, setCell, getCell, render, checkWin, startGame, pauseGame };
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

    const play = (row, col) => {
        if (gameBoard.getCell(row, col) === null) {
            gameBoard.setCell(row, col, currentPlayer.getSymbol());
            switchPlayer();

            // check if a player won
            const winningSymbol = gameBoard.checkWin()
            if (winningSymbol){
                gameBoard.pauseGame();
                if (winningSymbol === "draw"){
                    console.log("It's a draw! No one wins.");
                }

                else {
                    console.log(`Congratulations, ${winningSymbol === player1.getSymbol() ? player1.getName() : player2.getName()} won the game!`)
                }
            }
        }
    }
    return { player1, player2, currentPlayer, play };
})();