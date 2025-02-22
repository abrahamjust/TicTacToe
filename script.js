const game = (function() {

    // factory function to create players
    function playerFactory(name, symbol) {
        // encapsulating so that the symbol isn't modified
        let flag = 0;
        function getSymbol() {
            return symbol;
        }
        return {name, getSymbol, flag};
    }

    // factory to create the game board
    function gameBoard() {
        let board = [
            "", "", "",
            "", "", "",
            "", "", ""
        ];
        return {board};
    }

    // to get the winning combinations
    function getWinningCombinations() {
        const winningCombinations = [
            [0, 1, 2],  // Row 1
            [3, 4, 5],  // Row 2
            [6, 7, 8],  // Row 3
            [0, 3, 6],  // Column 1
            [1, 4, 7],  // Column 2
            [2, 5, 8],  // Column 3
            [0, 4, 8],  // Diagonal 1
            [2, 4, 6]   // Diagonal 2
        ];
        return winningCombinations;
    }
      
    // return only the instance of the gameBoard function as we dont want to create new boards. Also we return the instance because only then can we manipulate the board.
    return {playerFactory, gameBoardInstance: gameBoard(), getWinningCombinations};
})();

// to check the winning combinations
function checkWinningCombinations() {
    for(let i of game.getWinningCombinations()) {
        if(i.every(index => game.gameBoardInstance.board[index] === "X")) {
            return "X";
        } else if(i.every(index => game.gameBoardInstance.board[index] === "O")) {
            return "O";
        }
    }
    return "";
}

function checkDraw() {
    for(let i of game.gameBoardInstance.board) {
        if(i == "") {
            return false;
        }
    }
    return true;
}

function drawOrWin() {
    let winner = checkWinningCombinations();
    if (winner === player1.getSymbol()) {
        console.log(player1.name + " wins");
    } else if (winner === player2.getSymbol()) {
        console.log(player2.name + " wins");
    }else if(checkDraw()) {
        console.log("Draw");
    }
}

const player1 = game.playerFactory("Player1", "X");
const player2 = game.playerFactory("Player2", "O");

function playGame(index) {
    if(game.gameBoardInstance.board[index] != "") {
        console.log("Aready filled, try again");
    } else if(player1.flag == 0) {
        game.gameBoardInstance.board[index] = player1.getSymbol();
        player1.flag = 1;
        player2.flag = 0;
        drawOrWin();
    } else {
        game.gameBoardInstance.board[index] = player2.getSymbol();
        player2.flag = 1;
        player1.flag = 0;
        drawOrWin();
    }
}
