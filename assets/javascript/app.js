document.addEventListener("DOMContentLoaded", function() {
    var tableRow = document.getElementsByTagName('tr');
    var tableData = document.getElementsByTagName('td');
    var playerGo = document.querySelector('.player-go');
    var reset = document.querySelector('.reset');

     for (let i = 0; i < tableData.length; i++){
        tableData[i].addEventListener('click', (event) => {
            console.log(`${event.target.parentElement.rowIndex}, ${event.target.cellIndex}`);
        })
     };

    // Choose player name
     while(!player1) {
         var player1 = prompt('Player One, Enter your name. You will be red')
     };
     player1Color = 'rgb(230,57,70)';

     while(!player2) {
        var player2 = prompt('Player Two, Enter your name. You will be blue')
    };
    player2Color = 'rgb(29,53,87)';

    let currentPlayer = 1;
    playerGo.textContent = `${player1}'s turn!`

    // Check table cells
    Array.prototype.forEach.call(tableData, (e) =>{
        e.addEventListener('click', changeColor);
        e.style.backgroundColor = 'white';
    });

    // check rows and columns starting from the bottom
    function changeColor(event) {
        let column = event.target.cellIndex;
        let row = [];

        for(let i = 5; i > -1; i--){
            if(tableRow[i].children[column].style.backgroundColor == 'white'){
                row.push(tableRow[i].children[column]);
                if(currentPlayer === 1){
                    row[0].style.backgroundColor = player1Color;
                    
                    // check player 1 win condition
                    if(horizontalWinCheck() || verticalWinCheck() || diagonalWinCheckDown() || diagonalWinCheckUp()){
                        playerGo.textContent = `${player1} is the winner!`
                        playerGo.style.color = player1Color
                        return(alert(`${player1} wins!`));
                    } else if(canvasSpaceCheck()) {
                        playerGo.textContent = `It's a draw!`
                        return alert(`Draw`);
                    } else {
                        playerGo.textContent = `${player2}'s turn.`;
                        return currentPlayer = 2;
                    }

                } else {
                    //check player 2 win condition
                    row[0].style.backgroundColor = player2Color;

                    if(horizontalWinCheck() || verticalWinCheck() || diagonalWinCheckDown() || diagonalWinCheckUp()){
                        playerGo.textContent = `${player2} is the winner!`
                        playerGo.style.color = player2Color
                        return(alert(`${player2} wins!`));
                    } else if(canvasSpaceCheck()) {
                        playerGo.textContent = `It's a draw!`
                        return alert(`Draw`);
                    } else {
                        playerGo.textContent = `${player1}'s turn.`;
                        return currentPlayer = 1;
                    }
                }
            }
        }
    };

    // check if colors match
    function colorMatchCheck(pos1, pos2, pos3, pos4){
        return (pos1 == pos2 && pos1 === pos3 && pos1 === pos4 && pos1 !== 'white');
    };

    // check if horizontal win condition is met
    function horizontalWinCheck() {
        for(let row = 0; row < tableRow.length; row++){
            for(let color = 0; color < 4; color++){
                if(colorMatchCheck(tableRow[row].children[color].style.backgroundColor,
                    tableRow[row].children[color+1].style.backgroundColor,
                        tableRow[row].children[color+2].style.backgroundColor,
                            tableRow[row].children[color+3].style.backgroundColor)){
                                return true;
                            };
            };
        };
    };

    // check if vertical win condition is met
    function verticalWinCheck() {
        for(let color = 0; color < 7; color++){
            for(let row = 0; row < 3; row++){
                if(colorMatchCheck(tableRow[row].children[color].style.backgroundColor,
                    tableRow[row+1].children[color].style.backgroundColor,
                        tableRow[row+2].children[color].style.backgroundColor,
                            tableRow[row+3].children[color].style.backgroundColor)){
                                return true;
                            };
            }
        }
    }

    // check if diagonal win condition is met going up
    function diagonalWinCheckDown() {
        for(let color = 0; color < 4; color++){
            for(let row = 0; row < 3; row++){
                if(colorMatchCheck(tableRow[row].children[color].style.backgroundColor,
                    tableRow[row+1].children[color+1].style.backgroundColor,
                        tableRow[row+2].children[color+2].style.backgroundColor,
                            tableRow[row+3].children[color+3].style.backgroundColor)){
                                return true;
                            };
            }
        }
    }

    // check if diagonal win condition is met going down
    function diagonalWinCheckUp() {
        for(let color = 0; color < 4; color++){
            for(let row = 5; row > 2; row--){
                if(colorMatchCheck(tableRow[row].children[color].style.backgroundColor,
                    tableRow[row-1].children[color+1].style.backgroundColor,
                        tableRow[row-2].children[color+2].style.backgroundColor,
                            tableRow[row-3].children[color+3].style.backgroundColor)){
                                return true;
                            };
            }
        }
    }

    // Check if all slots have been taken by players
    function canvasSpaceCheck(){
        let slot = []
        for (i = 0; i < tableData.length; i++){
            if (tableData[i].style.backgroundColor !== 'white'){
                slot.push(tableData[i]);
            }
        }
        if (slot.length === tableData.length){
            return true;
        }
    }

    // Reset canvas colors 
    reset.addEventListener('click', () => {
        let playerChip = document.querySelector('.chip');
        playerChip.style.backgroundColor = 'white';
        alert('New game')
    });
  });