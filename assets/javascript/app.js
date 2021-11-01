const PLAYER_ONE = localStorage.getItem('playerOne');
const PLAYER_TWO = localStorage.getItem('playerTwo');
const PLAYER_ONE_COLOR = 'rgb(230,57,70)'; 
const PLAYER_TWO_COLOR = 'rgb(29,53,87)';
const EMPTY_SPACE_COLOR =  'snow';

// link to player 1
const USERNAME_1 =  document.getElementById('player-one-input');
const USERNAME_2 =  document.getElementById('player-two-input');
// link to player-one-display-text
const P_1_DISPLAY_TEXT = document.getElementById('player-one-display-text');
const P_2_DISPLAY_TEXT = document.getElementById('player-two-display-text');
// link player-name-text 
const RESULT_OUTPUT1 = document.getElementById('page-one-output');
const RESULT_OUTPUT2 = document.getElementById('page-two-output');
// link to display-text-button
const LOAD_BTTN = document.getElementById('loadbttn')
//change to player1NameValue    
var nameValue1 = [];
var nameValue2 = [];

const form = document.getElementById('form');

/** Check if game has started and show which player turn it is */

let playerTurnText = document.getElementById('player-go');
    document.addEventListener('load', ()=>{
        if (playerTurnText === null){
            pass
        } else{
            playerTurnText.textContent = `${playerName} starts`;
        }
        
    })    
let currentPlayerCount = 1;
let playerChip = document.querySelectorAll('.chip');

/** Add to player score on win */

function updatePlayerScores(){
    if (  playerOneScore && playerTwoScore === null ){
        pass
    } else {
        var playerOneScore = parseInt(document.getElementById('player-1-score').innerHTML);
        var playerTwoScore = parseInt(document.getElementById('player-2-score').innerHTML);
    }
}

document.addEventListener('load', updatePlayerScores);

/** grid elements */
let tableRow = document.getElementsByTagName('tr');
let tableData = document.getElementsByTagName('td');

let resetButton = document.querySelector('.reset-game');



function getUserNames(event){
    event.preventDefault();
    
    nameValue1 = USERNAME_1.value
    nameValue2 = USERNAME_2.value
    localStorage.setItem('playerOne', nameValue1);
    localStorage.setItem('playerTwo', nameValue2);


    P_1_DISPLAY_TEXT.innerHTML = PLAYER_ONE;
    P_2_DISPLAY_TEXT.innerHTML = PLAYER_TWO;
};

function resultsPage() {

    PLAYER_ONE = localStorage.getItem('playerOne');
    PLAYER_TWO = localStorage.getItem('playerTwo');
    
}

form.addEventListener('submit', getUserNames);
document.addEventListener('click', resultsPage);


/** rest of the code */

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
    event.style.backgroundColor = EMPTY_SPACE_COLOR; 
    event.addEventListener('click', playerCellCheck);
});

/** check rows and columns starting from the bottom */
function playerCellCheck(event) {

    let row = event.target.cellIndex;
    let cell = [];
    for (let i = 5; i > -1; i--) {
        if (tableRow[i].children[row].style.backgroundColor === EMPTY_SPACE_COLOR) {
            cell.push(tableRow[i].children[row]);
            if (currentPlayerCount === 1) {
                cell[0].style.backgroundColor = PLAYER_ONE_COLOR;
                // create a function that changes between currentPlayerCount? then executes only one of the following

                /** check player 1 win condition    */
                if (checkWinConditions()) {
                    return playerWinNotice();
                } else if (checkCanvasSpace()) {

                    return playerDraw();

                } else {
                    //currentPlayerCount = 1;
                    playerTurnText.textContent = `${playerName}'s turn.`;
                    playerTurnText.style.color = PLAYER_TWO_COLOR
                    return currentPlayerCount = 2;
                }

            } else {
                /** check player 2 win condition    */
                cell[0].style.backgroundColor = PLAYER_TWO_COLOR;

                if (checkWinConditions()) {
                    return playerWinNotice();

                } else if (checkCanvasSpace()) {
                    
                    return playerDraw();

                } else {
                    //currentPlayerCount = 2;
                    playerTurnText.textContent = `${playerName}'s turn.`;
                    playerTurnText.style.color = PLAYER_ONE_COLOR
                    return currentPlayerCount = 1;
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
}/** reset game on win */
function playerWinNotice(){
    swal.fire(`${playerName} wins!`);
    return setTimeout(resetGame, 2000)
}

function playerDraw() {
    playerTurnText.textContent = `It's a draw!`
    swal.fire(`Draw`);
    return setTimeout(resetGame, 2000)
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
    if (chip1 !== EMPTY_SPACE_COLOR){
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
    }}
    //let i = 0
    /** not working yet - testing 
    
    
    Array.prototype.forEach.call.tableData, (event) => {
        event.style.backgroundColor = EMPTY_SPACE_COLOR;
            console.log(tableData[i])
        }
    };*/
    //const ages = [32, 33, 16, 40];
    
    /** tableData[i].every(checkCell)    // Returns false

    function checkCell(cell) {
        cell.style.backgroundColor !== EMPTY_SPACE_COLOR;
        console.log(tableData[i])
        return true
} */

/** Resets canvas */
resetButton.addEventListener('click', resetGame);

function resetGame () {
    playerChip.forEach(chip => {
        chip.style.backgroundColor = EMPTY_SPACE_COLOR
    })
};

