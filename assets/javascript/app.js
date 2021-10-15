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
}

/** check table cells for click and calls fuction to change color */
Array.prototype.forEach.call(tableData, (event) => {
    event.style.backgroundColor = 'snow'; 
    event.addEventListener('click', playerCellCheck);
});

/**
 * check rows and columns starting from the bottom
 * function should be split up
 */
function playerCellCheck(event) {

    let row = event.target.cellIndex;
    let cell = [];
    for (let i = 5; i > -1; i--) {
        if (tableRow[i].children[row].style.backgroundColor === 'snow') {
            cell.push(tableRow[i].children[row]);
            if (currentPlayerCount === 1) {
                cell[0].style.backgroundColor = PLAYER_ONE_COLOR;

                /**
                 * check player 1 win condition
                 * player 1 check and 2 check are almost identical - looking to combine both
                 */
                if (checkWinConditions()) {
                    return playerWinNotice();
                } else if (checkCanvasSpace()) {

                    return playerDraw();

                } else {
                    currentPlayerCount = 2;
                    playerTurnText.textContent = `${PLAYER_TWO}'s turn.`;
                    playerTurnText.style.color = 'rgb(24, 26, 153)'
                    return
                }

            } else {
                /** check player 2 win condition */
                cell[0].style.backgroundColor = PLAYER_TWO_COLOR;

                if (checkWinConditions()) {
                    return playerWinNotice();

                } else if (checkCanvasSpace()) {
                    
                    return playerDraw();

                } else {
                    currentPlayerCount = 1;
                    playerTurnText.textContent = `${PLAYER_ONE}'s turn.`;
                    playerTurnText.style.color = 'rgb(230,57,70)'
                    return 
                }
            }
        }
    }
};

function checkWinConditions() {
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

/** reset game on win */
function playerWinNotice(){
    swal.fire(`${playerName} wins!`);
    //document.addEventListener('click', resetGame());
    return
}

function playerDraw() {
    playerTurnText.textContent = `It's a draw!`
    return swal.fire(`Draw`);
};

/**
 * check if horizontal win condition is met
 */
function horizontalWinCheck() {
    for (let row = 0; row < tableRow.length; row++) {
        for (let playerColor = 0; playerColor < 4; playerColor++) {
            if (checkChipsMatch(tableRow[row].children[playerColor].style.backgroundColor,
                    tableRow[row].children[playerColor + 1].style.backgroundColor,
                    tableRow[row].children[playerColor + 2].style.backgroundColor,
                    tableRow[row].children[playerColor + 3].style.backgroundColor)) {
                return true;
            };
        };
    };
};



/** check if vertical win condition is met */
function verticalWinCheck() {
    for (let playerColor = 0; playerColor < 7; playerColor++) {
        for (let row = 0; row < 3; row++) {
            if (checkChipsMatch(tableRow[row].children[playerColor].style.backgroundColor,
                    tableRow[row + 1].children[playerColor].style.backgroundColor,
                    tableRow[row + 2].children[playerColor].style.backgroundColor,
                    tableRow[row + 3].children[playerColor].style.backgroundColor)) {
                return true;
            };
        }
    }
}

/**
 * check if diagonal win condition is met going down
 */
function diagonalWinCheckDown() {
    for (let playerColor = 0; playerColor < 4; playerColor++) {
        for (let row = 0; row < 3; row++) {
            if (checkChipsMatch(tableRow[row].children[playerColor].style.backgroundColor,
                    tableRow[row + 1].children[playerColor + 1].style.backgroundColor,
                    tableRow[row + 2].children[playerColor + 2].style.backgroundColor,
                    tableRow[row + 3].children[playerColor + 3].style.backgroundColor)) {
                return true;
            };
        }
    }
}

/** check if diagonal win condition is met going up */
function diagonalWinCheckUp() {
    for (let playerColor = 0; playerColor < 4; playerColor++) {
        for (let row = 5; row > 2; row--) {
            if (checkChipsMatch(tableRow[row].children[playerColor].style.backgroundColor,
                    tableRow[row - 1].children[playerColor + 1].style.backgroundColor,
                    tableRow[row - 2].children[playerColor + 2].style.backgroundColor,
                    tableRow[row - 3].children[playerColor + 3].style.backgroundColor)) {
                return true;
            };
        }
    }
}

/** check if colors match */
function checkChipsMatch(chip1, chip2, chip3, chip4) {
    if (chip1 !== 'snow'){
        let c = chip1
        return (c === chip2 && c === chip3 && c === chip4)
    } 
};

/**
 * Check if all slots have been taken by players - rewrite? 
 */

function checkCanvasSpace() {
    let canvasSlot = []
    for (let i = 0; i < tableData.length; i++) {
        if (tableData[i].style.backgroundColor !== 'snow') {
            canvasSlot.push(tableData[i]);
        }
    }
    if (canvasSlot.length === tableData.length) {
        return true;
    }
    //Array.prototype.forEach.call(tableData, (event) => {
        // possibly use this instead of for loop
    //});
}

/** Resets canvas */
reset.addEventListener('click', resetGame);

function resetGame () {
    let playerChip = document.querySelectorAll('.chip');
    playerChip.forEach(chip => {
        chip.style.backgroundColor = 'snow'
    })
};