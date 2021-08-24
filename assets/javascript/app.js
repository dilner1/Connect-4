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

    // Player name and color
     while(!player1) {
         let player1 = promt('Player One, Enter your name. You will be red')
     }
     player1Color = 'red';

     while(!player2) {
        let player2 = promt('Player Two, Enter your name. You will be blue')
    }
    player2Color = 'blue';

    let currentPlayer = 1;
    playerGo.textContent = `${player1}'s turn!`

  });