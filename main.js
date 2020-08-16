// We'll want to be able to print the board horizontally. 
// You MUST utilize a map function at least once to accomplish this part of the assignment.
let boardState = [   // a basic 3x3 board
  ['3', '2', '1'],
  [],
  []
];
let freshBoard = boardState;  // to reset a new game 
let startingPeg = 1;  // peg we start on (1 in human-readable form, 0 in index)

var BoardController = function () {
  var startRound = function () {
    console.log('startRound() called');
    if (!moves){
      console.log('Welcome. Here is the game start configuration.');
      let winSum = 0;
      
      for (let i = 0; i < boardState.length; i++) {
        winSum = (boardState[i].reduce(function(sum, element){return sum + parseInt(element)}, 0));
        if (winSum > 0) {
          console.log('winSum = ' + winSum);
          return winSum;
        }
      }
    }
    //console.log(boardState);
    console.log(outputBoard(boardState));    
  }
  var outputBoard = function(boardArray) {    // REQs = use MAP at least once **achieved**
    console.log('outputBoard() called');
    let output = '';
    for (let i = 0; i < boardArray.length; i++) {  //common loop through elements in array - could be double .map I think
      //console.log('i loop ' + i); 
      if (!boardArray[i].length){   // too clever? length is the only param that works
        output += '---\n';
      } else {
        output += '--- ';  // start with the post
        output += boardArray[i].map(function(disc){  // add bits of (hopefully formatted) results to post
          //console.log('disc ', disc);
          //disc = disc.replace(/,/g , '');
          return (disc += ' ') //.replace(/,/g , '');
        });
        output = output.replace(/,/g , '');  // clean out the commas before returning. But where do they come from?
        output += '\n';
      }
      
      }
      return output;
  }
  var moveDisc = function(start, dest) {
    console.log('moveDisc() called');
    console.log('calling testMove with start peg ('+start+') returns-->' + testMove(start));
    console.log('and now does it include dest? '+ testMove(start).includes(dest));
    if (testMove(start).includes(dest)) {   // should be a valid test, expecting array of valid moves returned
    board.incrementMoves();
      /* NOTE reduce input val's by 1 to equal array index
      test if ok to make move, else bounce with error - call testMove()
      increment moves (regardless of allowed move, we'll say) - send bad message
      if ok, update array - send good message
      call startRound - for now startRound renders board */
      // console.log('---- the arrays we are look at. start, dest')
      // console.log(boardState[start - 1]);
      // console.log(boardState[dest - 1]);
    let movingDisc = boardState[start - 1].pop();  // store disc from start peg in var
    boardState[dest - 1].push(movingDisc);  // push disc onto board
    console.log('boardState by itself after moves');
    console.table(boardState);
    console.log(outputBoard(boardState));
    checkWinner(boardState);
    }else{
      console.log('Sorry, that move is not allowed. Rules is rules.');
      console.log('I don\'t know if this counts as a move, so for now, it doesn\'t');
      // board.incrementMoves();
    }
  }

  var testMove = function(start) {  // REQs: use FILTER
    let currentDiscSize = boardState[start-1][(boardState[start-1].length)-1];
    console.log(currentDiscSize + ' : currentDiscSize detected');
    let response = [];  // test each row one at a time, if it's valid, add to valid array
    let validMoves = [];  // ultimately return this, where it gets tested by .includes()
    for (let boardIndex = 0; boardIndex < boardState.length; boardIndex++) {
    console.log('aye aye is ' + boardIndex);
      if ( start-1 === boardIndex) { // moving to current peg not valid
        validMoves.push(0);  // could be '' or anything not a peg number
      } else if (boardState[boardIndex][boardState[boardIndex].length-1] > currentDiscSize || !boardState[boardIndex][boardState[boardIndex].length-1]) {
        validMoves.push(boardIndex+1); // +1 because human readable peg number
      } else {
        validMoves.push(0);
      }
      return validMoves;
    }
  }
  var incrementMoves = function() {
    console.log('incrementMoves() called');
    console.log('moves made : ' + moves + 1);
    return moves++; // easy enough, it seems
  }
  var checkWinner = function(boardArray) {
    console.log('checkWinner() called');  // REQ's = use REDUCE at least once **achieved**
    for (let i = 0; i < boardArray.length; i++) {  //common loop through elements in array - could be double .map I think
      //console.log('reducing to ' + boardArray[i].reduce(function(sum, element){return sum + element}, 0));
      if (boardArray[i].reduce(function(sum, element){return sum + parseInt(element)}, 0) === winSum) {
        if (startingPeg-1 != i) {
          console.log('WINNER IN ROW ' + [i+1]);
          resetGame(); //TODO
        }  else {
          console.log('Sorry, no win yet.');
        }
      }
        
      
    // legal moves should already be accounted for, so...
    // I think we can check just for total number of discs
    // and see that they are all on one index
    // AND that index is not the same as the starting peg
    // for now, we'll cheat with defining the starting peg rather than detecting it
    // NOTE subtract 1 from peg to equal index of array
  }
}
  var resetGame = function() {
    console.log('need to resetGame()');  // just testing reachability of functions
  }
  return {
    startRound : startRound,
    outputBoard : outputBoard,
    moveDisc : moveDisc,
    incrementMoves : incrementMoves,
    checkWinner : checkWinner,
    resetGame : resetGame
  }      
}

 


    
var board = BoardController();
let moves = 0;
let winSum = board.startRound();  // pull winSum into global scope. Use to test all discs on a peg.
board.incrementMoves();
board.moveDisc(1,2); // put test here
board.moveDisc(1,3);
board.moveDisc(2,3);
board.moveDisc(1,2);
board.moveDisc(3,1);
board.moveDisc(3,2);
board.moveDisc(1,2); // put test here
console.log(board.outputBoard(boardState));
board.checkWinner(boardState);  // this is going to need to be called by moveDisc()
 
// now we should be ready for console commands

// console.log(moves);


/* winning moves on a 3x3 board
board.moveDisc(1,2);
board.moveDisc(1,3);
board.moveDisc(2,3);
board.moveDisc(1,2);
board.moveDisc(3,1);
board.moveDisc(3,2);
board.moveDisc(1,2);
*/

/* actions to perform when calling moveDisc
 1 - call function to FILTER what pegs are compatible
 2 - move there
 3 - print board
 4 - count moves++
 5 - check if win REDUCE
*/
// There should be an object responsible for maintaining the state of the board and it should control the way to manipulate the inner state of the board

// The board should maintain the number of moves that the player has done and output this value when the game completes.
//There should be a way to move discs from one peg to another.  board.moveDisc()
// There should be a function that given a certain peg, determines which other pegs the top disc from that peg can be moved to. In order to complete this function, you MUST use a filter function at least once (filter HINT: If the user says they want to move a certain disc to another peg, wouldn't it be nice if you had a function that could take that disc size and look at all the pegs on the board and only return the ones that the disc you want to move would fit on?).
// There should be a function checkWinner that checks to see if the player has won the game. As a part of this function, you MUST use the reduce function at least once. 
// Once a player wins, the game should automatically end by announcing the winner (through a console log) and reset for a new game.