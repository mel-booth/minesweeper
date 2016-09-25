document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = new Object()
  board.cells = [
    //{row: 0, col: 0, isMine:true, hidden: true},
    //{row: 0, col: 1, isMine:false, hidden: true},
    //{row: 0, col: 2, isMine:false, hidden: true},
    //{row: 0, col: 3, isMine:false, hidden: true},
    //{row: 0, col: 4, isMine:false, hidden: true},
    //{row: 1, col: 0, isMine:false, hidden: true},
    //{row: 1, col: 1, isMine:false, hidden: true},
    //{row: 1, col: 2, isMine:false, hidden: true},
    //{row: 1, col: 3, isMine:true, hidden: true},
    //{row: 1, col: 4, isMine:true, hidden: true},
    //{row: 2, col: 0, isMine:false, hidden: true},
    //{row: 2, col: 1, isMine:false, hidden: true},
    //{row: 2, col: 2, isMine:true, hidden: true},
    //{row: 2, col: 3, isMine:false, hidden: true},
    //{row: 2, col: 4, isMine:false, hidden: true},
    //{row: 3, col: 0, isMine:true, hidden: true},
    //{row: 3, col: 1, isMine:false, hidden: true},
    //{row: 3, col: 2, isMine:false, hidden: true},
    //{row: 3, col: 3, isMine:true, hidden: true},
    //{row: 3, col: 4, isMine:false, hidden: true},
    //{row: 4, col: 0, isMine:false, hidden: true},
    //{row: 4, col: 1, isMine:false, hidden: true},
    //{row: 4, col: 2, isMine:true, hidden: true},
    //{row: 4, col: 3, isMine:false, hidden: true},
    //{row: 4, col: 4, isMine:false, hidden: true},

  ];

function startGame () {

  var row = boardSize ()
  var col = row

  createBoard (row, col);

  for (var i = 0; i < board.cells.length; i++){
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }

  document.addEventListener("click", checkForWin);
  document.addEventListener("contextmenu", checkForWin);

  // Don't remove this function call: it makes the game work!
  lib.initBoard()

  var reset = document.getElementById('reset');
   reset.addEventListener('click', function(evt) { location.reload() })
}




//AUTOMATICALLY GENERATE THE GAME BOARD...

function createBoard (row, col) {
  for (var a = 0; a < row; a++) {
    for (var b = 0; b < col; b++) {
      board.cells.push({
        row: a,
        col: b,
        isMine: Boolean(Math.floor(Math.random()*1.3)),
        isMarked: false,
        hidden: true
      })
      console.log(board.cells)
    }
  }
}

//PROMPT FOR USER TO CHOOSE BOARD SIZE

var boardSize = function() {

  var askSize = prompt("Pick a lucky number between 3 and 6!");

    if (askSize < 3 || askSize > 6) {
        alert("I SAID choose a number BETWEEN 3 and 6, silly! Try again...");
        location.reload();
      }

  else {
    return askSize;
  }
}


// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  for (var i = 0; i < board.cells.length; i++){
    if (board.cells[i].isMine === true && board.cells[i].isMarked !== true){
      return;
    }
    if (board.cells[i].isMine === false && board.cells[i].hidden === true){
      return;
    }
  }

    lib.displayMessage('You win!')

    var audioWin = document.getElementById("win");
    audioWin.play();

  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)

}


// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  count = 0;
var surroundingCells = getSurroundingCells(cell.row, cell.col);
for(var i = 0; i < surroundingCells.length; i++){
  if (surroundingCells[i].isMine === true){
    count++;
  }
}
return count;
}
