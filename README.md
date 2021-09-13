# Features

## Design Stage: 

This version of connect four gave me inspiration on creaitng my game, although with parts that are certainly too complex for me at this stage.

https://codethislab.com/html5-game-connect-4/

What MUST be include:
- Changes between player one and player two after each go
- Cannot place chips anywhere on the board, they must stack ontop of each other
- Placing 4 of the same colour chips in a row, colum or diagnally gives a win
- detect which player won

What should be included
- Player turn indicator
- Reset button

Non-essential elements to add
- start menu
- AI player option
- timer

The classic game of connect 4 is 7 counters wide and 6 counters high so i will follow this design.

## Colour Palette

https://coolors.co/palettes/trending

- Player red E63946
- Canvas blue A8DADC
- Player blue 1D3557
- background F1FAEE
- Alternative B1E1A3


# Testing

## Validator Testing

## Changes to base code

Following the tutorial the following code was added to log mouse clicks to the console. After realising it doesn't actually benefit the game in any way I removed it completely without consequence.
![Event listener removed](assets/Images/event_listener_removed.png)

When coding the reset button I used a querySelector however forgot to put the '.' before class name so I kept returning the error app.js:153 Uncaught TypeError: Cannot read property 'addEventListener' of null
    at HTMLDocument.<anonymous>

## Submit Button

Created a function that allowed submit button to also redirect to the game
![Submit error message](assets/Images/post_error_message.png)

## Unfixed Bugs

# Deployment

# Credits

## Content

## Media