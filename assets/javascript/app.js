document.addEventListener("DOMContentLoaded", function() {
    var tableRow = document.getElementsByTagName('tr');
    var tableData = document.getElementsByTagName('td');
    var playerPiece = document.querySelector('.chip');
    var playerGo = document.querySelector('.player-go');
    const reset = document.querySelector('.reset');

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
    Array.prototype.forEach.call(tableData, (d) =>{
        d.addEventListener('click', changeColor);
        d.style.backgroundColor = 'white';
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
                        return(alert(`${player1} wins!`));
                    }
                    playerGo.textContent = `${player2}'s turn.`;
                    return currentPlayer = 2;

                } else {
                    //check player 2 win condition
                    row[0].style.backgroundColor = player2Color;

                    if(horizontalWinCheck() || verticalWinCheck() || diagonalWinCheckDown() || diagonalWinCheckUp()){
                        return(alert(`${player2} wins!`));
                    } 
                    playerGo.textContent = `${player1}'s turn.`;
                    return currentPlayer = 1;
                };
            };
        };
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
    function CanvasSlotCheck() {
        let canvasSlots = [];
        for(let i = 0; i < tableData.length; i++){
            if(tableData[i].style.backgroundColor !== 'white'){
                canvasSlots.push(tableData[i]);
            }
        }
        if(canvasSlots.length == tableData.length){
            return true;
        }
    }

  });