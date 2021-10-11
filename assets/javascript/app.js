const PLAYER_ONE = 'Player 1' //document.getElementById('player-one-input');
const PLAYER_TWO = 'Player 2' //document.getElementById('player-two-input');
const PLAYER_ONE_COLOR = 'rgb(230,57,70)'; 
const PLAYER_TWO_COLOR = 'rgb(29,53,87)';

let playerTurnText = document.getElementById('player-go');
    playerTurnText.textContent = `${PLAYER_ONE} starts`
let currentPlayerCount = 1;

let playerOneScore = parseInt(document.getElementById('player-1-score').innerHTML);
let playerTwoScore = parseInt(document.getElementById('player-2-score').innerHTML);

let tableRow = document.getElementsByTagName('tr');
let tableData = document.getElementsByTagName('td');

let reset = document.querySelector('.reset');

/** changes player name */
let playerName = '';
document.addEventListener('click',changePlayerName)

function changePlayerName() {
    if (currentPlayerCount === 1) {
        playerName = PLAYER_ONE
    } else {
        playerName = PLAYER_TWO
    };
    console.log(playerName)
}

function changePlayerTurn() {
    if (currentPlayerCount === 1) {
        row[0].style.backgroundColor = PLAYER_TWO_COLOR;
        currentPlayerCount = 2;
        playerTurnText.textContent = `${PLAYER_TWO}'s turn.`;
        playerTurnText.style.color = 'rgb(24, 26, 153)';
    } else if (currentPlayerCount === 2) {
        
            row[0].style.backgroundColor = PLAYER_ONE_COLOR;
            currentPlayerCount = 1;
            playerTurnText.textContent = `${PLAYER_ONE}'s turn.`;
            playerTurnText.style.color = 'rgb(230,57,70)';
        
    }
}

/** check table cells for click and calls fuction to change color */
Array.prototype.forEach.call(tableData, (event) => {
    event.addEventListener('click', changeColor);
    event.style.backgroundColor = 'snow'; 
});

/**
 * check rows and columns starting from the bottom
 * function should be split up
 */
function changeColor(event) {
    let column = event.target.cellIndex;
    let row = [];
    
    for (let i = 5; i > 0; i--) {
        if (tableRow[i].children[column].style.backgroundColor === 'snow') {
            row.push(tableRow[i].children[column]);
            if (currentPlayerCount === 1 ) {
                row[0].style.backgroundColor = PLAYER_ONE_COLOR;

                if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheckDown() || diagonalWinCheckUp()) {
                    checkWinningMoves();
                    playerWinNotice();
                    return
                    
                } else if (checkCanvasSpace()) {
                    playerTurnText.textContent = `It's a draw!`
                    return swal.fire(`It's a draw`);
                } else {
                    document.addEventListener('click', changePlayerTurn)
                    return
                }
            } 
        }
    }
};

/** reset game on win */
function playerWinNotice(){
    swal.fire(`${playerName} wins!`);
    //document.addEventListener('click', resetGame());
    return
}

/** check if colors match */
function checkColorsMatch(pos1, pos2, pos3, pos4) {
    return (pos1 === pos2 &&
            pos1 === pos3 &&
            pos1 === pos4 &&
            pos1 !== 'snow');
};

/** Checks all winning functions - not yet implemented */
function checkWinningMoves() {
    if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheckDown() || diagonalWinCheckUp()) {
        if (currentPlayerCount === 1){
            playerTurnText.textContent = `${playerName} is the winner!`
            playerTurnText.style.color = PLAYER_ONE_COLOR
            return document.getElementById("player-1-score").innerText = ++playerOneScore;
        } else {
            playerTurnText.textContent = `${playerName} is the winner!`
            playerTurnText.style.color = PLAYER_TWO_COLOR
            return document.getElementById("player-2-score").innerText = ++playerTwoScore;
        }
    }
}

/**
 * check if horizontal win condition is met
 */
function horizontalWinCheck() {
    for (let row = 0; row < tableRow.length; row++) {
        for (let color = 0; color < 4; color++) {
            if (checkColorsMatch(tableRow[row].children[color].style.backgroundColor,
                    tableRow[row].children[color + 1].style.backgroundColor,
                    tableRow[row].children[color + 2].style.backgroundColor,
                    tableRow[row].children[color + 3].style.backgroundColor)) {
                return true;
            };
        };
    };
};

/** check if vertical win condition is met */
function verticalWinCheck() {
    for (let color = 0; color < 7; color++) {
        for (let row = 0; row < 3; row++) {
            if (checkColorsMatch(tableRow[row].children[color].style.backgroundColor,
                    tableRow[row + 1].children[color].style.backgroundColor,
                    tableRow[row + 2].children[color].style.backgroundColor,
                    tableRow[row + 3].children[color].style.backgroundColor)) {
                return true;
            };
        }
    }
}

/**
 * check if diagonal win condition is met going down
 */
function diagonalWinCheckDown() {
    for (let color = 0; color < 4; color++) {
        for (let row = 0; row < 3; row++) {
            if (checkColorsMatch(tableRow[row].children[color].style.backgroundColor,
                    tableRow[row + 1].children[color + 1].style.backgroundColor,
                    tableRow[row + 2].children[color + 2].style.backgroundColor,
                    tableRow[row + 3].children[color + 3].style.backgroundColor)) {
                return true;
            };
        }
    }
}

/** check if diagonal win condition is met going up */
function diagonalWinCheckUp() {
    for (let color = 0; color < 4; color++) {
        for (let row = 5; row > 2; row--) {
            if (checkColorsMatch(tableRow[row].children[color].style.backgroundColor,
                    tableRow[row - 1].children[color + 1].style.backgroundColor,
                    tableRow[row - 2].children[color + 2].style.backgroundColor,
                    tableRow[row - 3].children[color + 3].style.backgroundColor)) {
                return true;
            };
        }
    }
}

/**
 * Check if all slots have been taken by players
 */
function checkCanvasSpace() {
    let slot = []
    for (i = 0; i < tableData.length; i++) {
        if (tableData[i].style.backgroundColor !== 'snow') {
            slot.push(tableData[i]);
        }
    }
    if (slot.length === tableData.length) {
        return true;
    }
}

/** Resets canvas */
reset.addEventListener('click', resetGame);

function resetGame () {
    let playerChip = document.querySelectorAll('.chip');
    playerChip.forEach(chip => {
        chip.style.backgroundColor = 'snow'
    })
};