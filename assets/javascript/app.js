// Global Constants
const USERNAME_1 = document.getElementById('player-one-input');
const USERNAME_2 = document.getElementById('player-two-input');
const PLAYER_ONE_COLOR = 'rgb(230,57,70)';
const PLAYER_TWO_COLOR = 'rgb(29,53,87)';
const EMPTY_SPACE_COLOR = 'white';
const RESULT_OUTPUT1 = document.getElementById('page-one-output');
const RESULT_OUTPUT2 = document.getElementById('page-two-output');
const LOAD_BTTN = document.getElementById('loadbttn');
const FORM = document.getElementById('form');

// Global Variables   
var nameValue1 = [];
var nameValue2 = [];
let playerOne = sessionStorage.getItem('playerOne');
let playerTwo = sessionStorage.getItem('playerTwo');
let playerTurnText = document.getElementById('player-go');
let playerName = '';
let tableRow = document.getElementsByTagName('tr');
let tableData = document.getElementsByTagName('td');
let resetButton = document.getElementById('reset-game');
let playerOneScore = [];
let playerTwoScore = [];

let currentPlayerCount = 1;
let playerChip = document.querySelectorAll('.chip');

/** Load pages */
window.addEventListener('DOMContentLoaded', loadPage());

function loadPage() {
    let page = document.body.id;
    switch (page) {
        case 'home-page':
            console.log('This is the Home Page');
            FORM.addEventListener('submit', getUserNames);
            break;
        case 'game-page':
            console.log('This is the Game Page');
            currentPlayerCount = 1;
            changePlayerName();
            resultsPage();
            playerOneScore = parseInt(document.getElementById('player-1-score').innerHTML);
            playerTwoScore = parseInt(document.getElementById('player-2-score').innerHTML);
            playerTurnText.textContent = `${playerName} starts.`;
            break;
    }
}

/** Submits form with players chosen usernames */
function getUserNames(event) {
    event.preventDefault();
    if (validateNames()) {
        nameValue1 = USERNAME_1.value
        nameValue2 = USERNAME_2.value
        sessionStorage.setItem('playerOne', nameValue1);
        sessionStorage.setItem('playerTwo', nameValue2);
        window.location.assign("game.html");
    }

};

/** Validates if usernames have been submitted */
function validateNames() {
    if (USERNAME_1.value === null || USERNAME_1.value === '' || USERNAME_2.value === null || USERNAME_2.value === '') {
        swal.fire({
            text: 'Please enter a name for both players.',
            confirmButtonColor: "#2778C4"
        });
        return false;
    } else {
        return true;
    }
}

/** Pulls player name values*/
function resultsPage() {
    playerOne = sessionStorage.getItem('playerOne');
    playerTwo = sessionStorage.getItem('playerTwo');
}

/** Changes Names */
document.addEventListener('click', changePlayerName)

function changePlayerName() {
    if (currentPlayerCount === 1) {
        playerName = playerOne
        checkUserhasName();
    } else {
        playerName = playerTwo
        checkUserhasName();
    };
}

/** If session data is deleted this will generate placeholder names */
function checkUserhasName() {
    if (playerOne === null && playerTwo === null) {
        playerOne = 'Player 1';
        playerTwo = 'Player 2';
    } else if (playerOne === null) {
        playerOne = 'Player 1';
    } else if (playerTwo === null) {
        playerTwo = 'Player 2';
    }
}

/** Check table cells for click and calls fuction to change color - taken from tutorial video */
Array.prototype.forEach.call(tableData, (event) => {
    event.style.backgroundColor = EMPTY_SPACE_COLOR;
    event.addEventListener('click', playerCellCheck);
});

/** Check rows and columns starting from the bottom */
function playerCellCheck(event) {

    let row = event.target.cellIndex;
    let cell = [];
    for (let i = 5; i > -1; i--) {
        if (tableRow[i].children[row].style.backgroundColor === EMPTY_SPACE_COLOR) {
            cell.push(tableRow[i].children[row]);
            if (currentPlayerCount === 1) {
                cell[0].style.backgroundColor = PLAYER_ONE_COLOR;
                /** Check player 1 win condition */
                if (checkWinConditions()) {
                    return playerWinNotice();
                } else if (checkCanvasSpace()) {
                    return playerDraw();
                } else {
                    currentPlayerCount = 2;
                    playerTurnText.style.color = PLAYER_TWO_COLOR
                    playerTurnText.textContent = `${playerTwo}'s turn.`;
                    return
                }
            } else {
                /** Check player 2 win condition    */
                cell[0].style.backgroundColor = PLAYER_TWO_COLOR;
                if (checkWinConditions()) {
                    return playerWinNotice();
                } else if (checkCanvasSpace()) {
                    return playerDraw();
                } else {
                    currentPlayerCount = 1;
                    playerTurnText.style.color = PLAYER_ONE_COLOR
                    playerTurnText.textContent = `${playerOne}'s turn.`;
                    return
                }
            }
        }
    }
};

// Checks all winning moves
function checkWinConditions() {
    if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheckDown() || diagonalWinCheckUp()) {
        if (currentPlayerCount === 1) {
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

/** Reset game on win */
function playerWinNotice() {
    if (currentPlayerCount === 1) {
        Swal.fire({
            icon: 'success',
            text: `${playerName} wins!`,
            confirmButtonColor: '#E63946'
        })
    } else {
        Swal.fire({
            icon: 'success',
            text: `${playerName} wins!`,
            confirmButtonColor: "#181A99"
        })
    }
    setTimeout(resetGame, 2000);
    return
};

/** Shows draw result message */
function playerDraw() {
    playerTurnText.textContent = `It's a draw!`
    swal.fire({
        icon: 'warning',
        text: `Draw`,
        confirmButtonColor: "#2778C4"
    });
    return setTimeout(resetGame, 2000)
};

/** Check if horizontal win condition is met */
function horizontalWinCheck() {
    for (let i = 0; i < tableRow.length; i++) {
        for (let playerColor = 0; playerColor < 4; playerColor++) {
            if (checkChipsMatch(tableRow[i].children[playerColor].style.backgroundColor,
                    tableRow[i].children[playerColor + 1].style.backgroundColor,
                    tableRow[i].children[playerColor + 2].style.backgroundColor,
                    tableRow[i].children[playerColor + 3].style.backgroundColor
                )) {
                return true;
            };
        };
    };
};

/** Check if vertical win condition is met */
function verticalWinCheck() {
    for (let playerColor = 0; playerColor < 7; playerColor++) {
        for (let i = 0; i < 3; i++) {
            if (checkChipsMatch(tableRow[i].children[playerColor].style.backgroundColor,
                    tableRow[i + 1].children[playerColor].style.backgroundColor,
                    tableRow[i + 2].children[playerColor].style.backgroundColor,
                    tableRow[i + 3].children[playerColor].style.backgroundColor)) {
                return true;
            };
        }
    }
};

/** Check if diagonal win condition is met going down */
function diagonalWinCheckDown() {
    for (let playerColor = 0; playerColor < 4; playerColor++) {
        for (let i = 0; i < 3; i++) {
            if (checkChipsMatch(tableRow[i].children[playerColor].style.backgroundColor,
                    tableRow[i + 1].children[playerColor + 1].style.backgroundColor,
                    tableRow[i + 2].children[playerColor + 2].style.backgroundColor,
                    tableRow[i + 3].children[playerColor + 3].style.backgroundColor)) {
                return true;
            };
        }
    }
};

/** Check if diagonal win condition is met going up */
function diagonalWinCheckUp() {
    for (let playerColor = 0; playerColor < 4; playerColor++) {
        for (let i = 5; i > 2; i--) {
            if (checkChipsMatch(tableRow[i].children[playerColor].style.backgroundColor,
                    tableRow[i - 1].children[playerColor + 1].style.backgroundColor,
                    tableRow[i - 2].children[playerColor + 2].style.backgroundColor,
                    tableRow[i - 3].children[playerColor + 3].style.backgroundColor)) {
                return true;
            };
        }
    }
};

/** Check if colors match */
function checkChipsMatch(chip1, chip2, chip3, chip4) {
    if (chip1 !== EMPTY_SPACE_COLOR) {
        let c = chip1
        return (c === chip2 && c === chip3 && c === chip4)
    }
};

/** Check if all slots have been taken by players */
// function checkCanvasSpace() {
//     let canvasSpace = []
//     for (let i = 0; i < tableData.length; i++) {
//         if (tableData[i].style.backgroundColor !== EMPTY_SPACE_COLOR) {
//             canvasSpace.push(tableData[i]);
//         }
//     }
//     if (canvasSpace.length === tableData.length) {
//         return true;
//     }
// }

function checkCanvasSpace() {
    let canvasSpace = 0

    for (let i = 0; i < tableData.length; i++) {
        let tableColor = tableData[i].style.backgroundColor
        if (tableColor !== EMPTY_SPACE_COLOR) {
            canvasSpace + 1
        }
        if (canvasSpace === tableData.length) {
            return playerDraw();
        }
    }
};

/** Resets canvas */
resetButton.addEventListener('click', resetGame);

function resetGame() {
    playerChip.forEach(chip => {
        chip.style.backgroundColor = EMPTY_SPACE_COLOR
        playerTurnText.textContent = `${playerName} starts.`;
    })
};