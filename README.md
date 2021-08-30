

## Design Stage: 

This gave me inspiration on creaitng the game, although with parts that are probably too complex for me.

https://codethislab.com/html5-game-connect-4/

What MUST be include:
- Changes between player one and player two after each go
- Player go indicator
- Chips must stack ontop of each other
- Placing 4 of the same colour chips in a row, colum or diagnally provides a win
- detect which player won

The classic game of connect 4 is 7 counters wide and 6 counters high.

Non-essential elements to add
- start menu
- AI player option
- timer

having a coloured button to show who's go it is - it look good and combined with text would be good for visually impared users.

## Colour Palette

https://coolors.co/palettes/trending

- Player red E63946
- Canvas blue A8DADC
- Player blue 1D3557
- background F1FAEE
- Alternative B1E1A3

# Issues

When coding the reset button I used a querySelector however forgot to put the '.' before class name so I kept returning the error app.js:153 Uncaught TypeError: Cannot read property 'addEventListener' of null
    at HTMLDocument.<anonymous>