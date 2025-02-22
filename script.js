// set the players object
let playerOne, playerTwo;

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

// to check if the game is a draw
function checkDraw() {
    for(let i of game.gameBoardInstance.board) {
        if(i == "") {
            return false;
        }
    }
    return true;
}

// to check if we have a result or to continue the game
function drawOrWin() {
    let result = document.querySelector(".result");
    let winner = checkWinningCombinations();
    if (winner === playerOne.getSymbol()) {
        result.textContent = playerOne.name + " wins!";
        removeEventListeners();
    } else if (winner === playerTwo.getSymbol()) {
        result.innerHTML = playerTwo.name + " wins!";
        removeEventListeners();
    }else if(checkDraw()) {
        result.textContent ="It is a draw";
        removeEventListeners();
    }
}

// the "engine" of the game
function playGame(index) {
    if(game.gameBoardInstance.board[index] != "") {
        let result = document.querySelector(".result");
        result.textContent = "Already filled, try again";
    } else if(playerOne.flag == 0) {
        game.gameBoardInstance.board[index] = playerOne.getSymbol();
        document.getElementById(index).textContent = playerOne.getSymbol();
        playerOne.flag = 1;
        playerTwo.flag = 0;
        drawOrWin();
    } else {
        game.gameBoardInstance.board[index] = playerTwo.getSymbol();
        playerTwo.flag = 1;
        playerOne.flag = 0;
        document.getElementById(index).textContent = playerTwo.getSymbol();
        drawOrWin();
    }
}

// setting up event listeners for the form
function initializeGame() {
    let name1, name2;
    let form = document.querySelector("form");
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        name1 = document.getElementById("NamePlayerOne").value;
        name2 = document.getElementById("NamePlayerTwo").value;

        playerOne = game.playerFactory(name1, "X");
        playerTwo = game.playerFactory(name2, "O");

        initializeGridEvents();
    });
}

// creates and initializes the event listeners for the grid cells
function initializeGridEvents() {
    let cells = document.querySelectorAll(".cells");
    cells.forEach((cell, index) => {
        cell.addEventListener('click', gridClick);
    });
}

function gridClick(event) {
    playGame(event.target.id);
}

function removeEventListeners() {
    let cells = document.querySelectorAll(".cells");
    cells.forEach((cell, index) => {
        cell.removeEventListener("click", gridClick);
    })
}

// resetting the board
let reset = document.getElementById("reset");
reset.addEventListener("click", resetBoard);
function resetBoard() {
    let cells = document.querySelectorAll(".cells");
    cells.forEach(cell => {
        cell.textContent = "";
    });
    game.gameBoardInstance.board.fill("");
    document.querySelector(".result").textContent = "";
    document.getElementById("NamePlayerOne").value = "";
    document.getElementById("NamePlayerTwo").value = "";
}

initializeGame();
