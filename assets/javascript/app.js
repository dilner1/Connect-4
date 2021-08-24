document.addEventListener("DOMContentLoaded", function() {
    const tableRow = document.getElementsByTagName('tr');
    const tableData = document.getElementsByTagName('td')
    const playerPiece = document.querySelector('.chip');
    const playerGo = document.querySelector('.player-go');
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
     player1Color = 'red';

     while(!player2) {
        var player2 = prompt('Player Two, Enter your name. You will be blue')
    }
    player2Color = 'blue';

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

        for(let i = 5; i>-1; i--){
            if(tableRow[i].children[column].style.backgroundColor == '#A8DADC'){
                row.push(tableRow[i].children[column]);
            }
        }
    }

  });