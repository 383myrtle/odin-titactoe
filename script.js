const displayController = (function(){
    const gameGrid = document.querySelector(".game-grid");
    const gridCells = gameGrid.querySelectorAll(".cell");
    const gameStatus = document.querySelector(".game-status");

    const player = (name, symbol) => {
        const getName = () => name;
        const getSymbol = () => symbol;
        const setName = (newName) => {
            name = newName;
        }
        return { getName, setName, getSymbol };
    }

    const gameBoard = (function() {
        let board = [[null, null, null], [null, null, null], [null, null, null]];
        
        const setCell = (row, col, value) => {
            board[row][col] = value;
        }
        const getCell = (row, col) => board[row][col];
        
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
        return { board, setCell, getCell, checkWin };
    })();

    const game = (function() {
        const player1 = player('Player 1', 'X');
        const player2 = player('Player 2', 'O');
        let currentPlayer = player1;
    
        const switchPlayer = () => {
            currentPlayer = currentPlayer === player1 ? player2 : player1;
        }

        const getCurrentPlayer = () => currentPlayer;
    
        const play = (row, col) => {
            if (gameBoard.getCell(row, col) === null) {
                gameBoard.setCell(row, col, currentPlayer.getSymbol());
                console.log(`Before: ${currentPlayer.getName()}`);
                switchPlayer();
                console.log(`After: ${currentPlayer.getName()}`);
    
                // check if a player won
                const winningSymbol = gameBoard.checkWin()
                if (winningSymbol){
                    if (winningSymbol === "draw"){
                        return {
                            gameOver: true,
                            isDraw: true
                        };
                    }
                    else {
                        return {
                            gameOver: true,
                            isDraw: false,
                            winner: winningSymbol === player1.getSymbol() ? player1.getName() : player2.getName()
                        };
                    }
                }
                else {
                    return {gameOver: false};
                }
            }
        }
        return { getCurrentPlayer, play};
    })();

    const pauseGame = () =>{
        gameGrid.removeEventListener("click", placeSymbol);
    }
    const startGame = () =>{
        gameGrid.addEventListener("click", placeSymbol);
    }
    const placeSymbol = (e) => {
        const cell = e.target;
        const row = cell.dataset.row;
        const col = cell.dataset.column;

        const result = game.play(row, col);
        render(result);
    }
    const render = (result) => {
        gridCells.forEach((cell) => {
            const row = cell.dataset.row;
            const col = cell.dataset.column;
            cell.textContent = gameBoard.board[row][col];
        });
        if (result.gameOver){
            pauseGame();
            if (result.isDraw){
                gameStatus.textContent = `Game Over. It's a draw, no one wins!`;
            }
            else {
                gameStatus.textContent = `Game Over. ${result.winner} wins!`
            }
        }
        else {
            gameStatus.textContent = `${game.getCurrentPlayer().getName()}'s turn`;
        }
    }

    startGame();
    return {gameBoard,game}
})();