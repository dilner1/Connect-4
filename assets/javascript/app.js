document.addEventListener("DOMContentLoaded", function() {
    var tableRow = document.getElementsByTagName('tr');
    var tableData = document.getElementsByTagName('td')
    var playerPiece = document.querySelector('.chip');
    var playerGo = document.querySelector('.player-go');
    const reset = document.querySelector('.reset');

     for (let i = 0; i < tableData.length; i++){
        tableData[i].addEventListener('click', (e) => {
            console.log(`${e.target.parentElement.rowIndex}, ${e.target.cellIndex}`);
        })
     }

    // Choose player name
     while(!player1) {
         var player1 = prompt('Player One, Enter your name. You will be red')
     }
     player1Color = 'rgb(230,57,70)';

     while(!player2) {
        var player2 = prompt('Player Two, Enter your name. You will be blue')
    }
    player2Color = 'rgb(29,53,87)';

    let currentPlayer = 1;
    playerGo.textContent = `${player1}'s turn!`

    // Check table cells
    Array.prototype.forEach.call(tableData, (d) =>{
        d.addEventListener('click', changeColor);
        d.style.backgroundColor = 'white';
    })

    // check rows and columns starting from the bottom
    function changeColor(event) {
        let column = event.target.cellIndex;
        let row = [];

        for(let i = 5; i > -1; i--){
            if(tableRow[i].children[column].style.backgroundColor == 'white'){
                row.push(tableRow[i].children[column]);
                if(currentPlayer === 1){
                    row[0].style.backgroundColor = player1Color;
                    playerGo.textContent = `${player2}'s turn!`
                    return currentPlayer = 2
                } else {
                    row[0].style.backgroundColor = player2Color;
                    playerGo.textContent = `${player1}'s turn!`
                    return currentPlayer = 1
                }
            }
        }
    }

    // check for win condition
    function colorMatchCheck(pos1, pos2, pos3, pos4){
        if (pos1 === pos2 && pos2 === pos3 && pos3 === pos4 && pos1 !== 'white');
    };

    function horizontalWinCheck() {
        for(let slot = 0; slot < tableRow.length; slot++){
            for(let color = 0; color < 4; color++)
            if(colorMatchCheck(tableRow[slot].children[color].style.backgroundColor,
                tableRow[slot].children[color+1].style.backgroundColor,
                    tableRow[slot].children[color+2].style.backgroundColor,
                        tableRow[slot].children[color+3].style.backgroundColor)){
                            return true;
                        }
        }
    };

  });