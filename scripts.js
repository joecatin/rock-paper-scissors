// Randomly return either ‘Rock’, ‘Paper’ or ‘Scissors’

computerPlay = () => {

    // Draw a random number between 1 and 3.
    // Draw a random number between 0 and one.
    // Multiply that number by 3.
    // Round to the nearest lower integer.
    // Add one.
    let randomInteger = Math.floor(Math.random() * 3) + 1;

    // Map integers 1 to 3 to ‘Rock’, ‘Paper’ and ‘Scissors’.
    // Assign to a variable the word corresponding to the integer
    // returned by the random number generating routine above.
    let hand;
    switch(randomInteger) {
        case 1: 
          hand = "Rock";
          break;
        case 2:
          hand = "Paper";
          break;
        default:
          hand = "Scissors";
      }

    // Return the assigned variable
    return hand
}


// Compare player's to computer's hand and determine who won
playRound = (playerSelection, computerSelection) => {

  
  // Make the arguments case insensitive
  // Transform argument strings to lower case and assign to new variables
  let player = playerSelection.toLowerCase();
  let computer = computerSelection.toLowerCase();

  // For each possible player hand, compare to each possible 
  // computer hand and determine the winning hand
  let outcome;
  switch(player) {
    case "rock": 
      switch(computer) {
        case "rock": 
          console.log("It's a draw: rock vs rock.");
          outcome = "draw";
          break;
        case "paper": 
        console.log("You lose! Paper beats rock.");
          outcome = "lose";
          break;
        default:
          console.log("You win! Rock beats scissors.");
          outcome = "win";
      }
      break;
    case "paper":
      switch(computer) {
        case "rock": 
          console.log("You win! Paper beats rock.");
          outcome = "win";
          break;
        case "paper": 
          console.log("It's a draw: paper vs paper.");
          outcome = "draw";
          break;
        default:
          console.log("You lose! Paper beats scissors.");
          outcome = "lose";
      }
      break;
    default:
      switch(computer) {
        case "rock": 
          console.log("You lose! Rock beats Scissors.");
          outcome = "lose";
          break;
        case "paper": 
          console.log("You win! Scissors beat paper.");
          outcome = "win";
          break;
        default:
          console.log("It's a draw: scissors vs scissors.");
          outcome = "draw";
      }
  }

  return outcome;
}

// Check if player input is rock, paper or scissors regardless
// of case.
// Declare array with possible hands as global variables
let hands = ["rock", "paper", "scissors"];
checkPlayerInput = (input) => {
  return hands.includes(input);  
}

// Count number of occurrences of a value in an array
const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

// Determine who won the game: player or computer
determineWinner = (results) => {

  // Count the number of win and lose in the results array
  // If number of win > number of lose player wins
  // else computer wins.
  
  let wins = countOccurrences(results, "win");
  let loses = countOccurrences(results, "lose");
  let draws = countOccurrences(results, "draw");

  let outcome;
  if (wins > loses) {
    outcome = ["Player", wins, loses, draws];
  } else if (wins < loses) {
    outcome = ["Computer", loses, wins, draws];
  } else {
    outcome = ["draw", wins, loses, draws];
  }

  return outcome
}


// Plays a five round game with result logged out to the console for 
// each round and winner logged out to the console at the end.
game = () => {
  
  let results = [];
  let playerHand;

  for(i = 0; i < 5; i++) {

    let keepGoing = true;
    while (keepGoing){
      playerHand = prompt("Please pick a hand: 'rock', 'paper' or 'scissors'", "rock").toLowerCase();
      keepGoing = !checkPlayerInput(playerHand);
    }
    
    results.push(playRound(playerHand, computerPlay()));
 }

 let winner = determineWinner(results);


 let outcome = ((winner[0] == "draw")? ("It's a draw, both player and computer won " + winner[1] + " round" + ((winner[1] > 0)? "s" : "")) :
 (winner[0] + " wins with " + winner[1] + " round" + ((winner[1] > 1)? "s" : "") + " won vs. " + winner[2])) + 
 ((winner[3] > 0)? ("; " + winner[3] + " draw" + ((winner[3] > 1)? "s" : "") + ".") : ".");
 
 console.log(outcome);
}

game();
