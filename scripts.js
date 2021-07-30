
let [rounds, player, computer, draw] = [0, 0, 0 , 0];
let results = [];
let possibleWinner = ["player", "computer", "draw"];


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
          // console.log("It's a draw: rock vs rock.");
          outcome = "draw";
          break;
        case "paper": 
          // console.log("You lose! Paper beats rock.");
          outcome = "computer";
          break;
        default:
          // console.log("You win! Rock beats scissors.");
          outcome = "player";
      }
      break;
    case "paper":
      switch(computer) {
        case "rock": 
          // console.log("You win! Paper beats rock.");
          outcome = "player";
          break;
        case "paper": 
          // console.log("It's a draw: paper vs paper.");
          outcome = "draw";
          break;
        default:
          // console.log("You lose! Paper beats scissors.");
          outcome = "computer";
      }
      break;
    default:
      switch(computer) {
        case "rock": 
          // console.log("You lose! Rock beats Scissors.");
          outcome = "computer";
          break;
        case "paper": 
          // console.log("You win! Scissors beat paper.");
          outcome = "player";
          break;
        default:
          // console.log("It's a draw: scissors vs scissors.");
          outcome = "draw";
      }
  }

  return outcome;
}

// Check if player input is rock, paper or scissors regardless
// of case.
// Declare array with possible hands as global variables
let possibleHands = ["rock", "paper", "scissors"];
checkPlayerInput = (input) => {
  return possibleHands.includes(input);  
}

// Count number of occurrences of a value in an array
const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

// Determine who won the game: player or computer
determineWinner = (results) => {

  // Count the number of win and lose in the results array
  // If number of win > number of lose player wins
  // else computer wins.

  let player = countOccurrences(results, "player");
  let computer = countOccurrences(results, "computer");
  let draws = countOccurrences(results, "draw");

  let outcome;
  if (player > computer) {
    outcome = ["Player", player, computer, draws];
  } else if (player < computer) {
    outcome = ["Computer", computer, player, draws];
  } else {
    outcome = ["draw", player, computer, draws];
  }

  return outcome
}


showHands = (player, computer) => {
  document.querySelector(`div[id='player'] img`).
    setAttribute("src", `assets/images/hand-${player}-player.png`);

  if (Math.random() > 0.5) {
    document.querySelector(`div[id='vs'] img`).
      setAttribute("src", "assets/images/lightening-player-computer.png");
  } else {
    document.querySelector(`div[id='vs'] img`).
      setAttribute("src", "assets/images/lightening-computer-player.png");
  };

  document.querySelector(`div[id='computer'] img`).
    setAttribute("src", `assets/images/hand-${computer}-computer.png`);
}

updateScore = (winner) => {  
  eval(winner + "++;");
  document.querySelector(`div[id='${winner}'] span[id='value']`).
    textContent = eval(winner);
}

showHandWinner = (winner) => {

  if (winner == "draw"){
    document.getElementById("round").
      innerHTML = "<span id='left'>draw</span><span id='right'>...</span>";
  } else {
    document.getElementById("round").style.setProperty("color", `var(--${winner})`);
    document.getElementById("round").
      innerHTML = `<span>${winner} wins!</span>`;
  }
}


showWinner = (winner, outcome) => {

  let target = document.querySelector(".scores");
  let colour, ruoloc;
  
  if (winner == "draw") {
    colour = (Math.random() > 0.5)? "player" : "computer"
  } else {
    colour = winner;    
  }

  ruoloc = possibleWinner.filter(i => ![colour, "draw"].includes(i))[0];
  target.style.setProperty("justify-content", "center");
  target.innerHTML = `<span>${outcome}</span>`;
  target = document.querySelector(".scores span");
  target.style.setProperty("color", `var(--${colour})`);
  target.style.setProperty("border", `.4rem solid var(--${ruoloc})`);
  target.style.setProperty("border-radius", "1rem");  
  target.style.setProperty("margin", "5rem");  
  target.style.setProperty("padding", "1rem .5rem");  
  target.style.setProperty("background-color", "rgba(255, 255, 255, 0.75)");  
  target.classList.add("blink");
}

reset = () => {
  [rounds, player, computer, draw] = [0, 0, 0, 0];
  results = [];

  let target = document.querySelector(".scores");
  target.innerHTML = `
    <div id="set">
      <div id="set-box">
          <div id="computer" class="score">
              <span id="label">computer</span>
              <span id="value">0</span>
          </div>
          <div id="player" class="score">
              <span id="label">player</span>  
              <span id="value">0</span>  
          </div>    
          <div id="draw" class="score">
              <span id="label">draw</span>  
              <span id="value">0</span>  
          </div>
      </div>                         
    </div>

    <div id="round"></div>
  `;

target = document.querySelector("div[id='player'] img");
target.setAttribute("src", "assets/images/hand-start-player.png");

target = document.querySelector("div[id='computer'] img");
target.setAttribute("src", "assets/images/hand-start-computer.png");
}

removeEventListeners = () => {
  let hands = document.querySelectorAll(".hand");
  
  hands.forEach(hand => {
    hand.removeEventListener("click", (e) => {
      playSound(e);
      playGame(e);
    })
  }); 
  
  hands.forEach(hand => {
    hand.removeEventListener("transitionend", function(e){ removeTransition(this) })
  }); 
}

terminateGame = (results) => {

  removeEventListeners();

  let winner = determineWinner(results);

  let outcome = (
      (winner[0] == "draw")? 
      ("It's a draw, both player and computer won " + winner[1] + " round" + 
      ((winner[1] > 1)? "s" : "")) :
      (winner[0] + " wins with " + winner[1] + " round" + 
      ((winner[1] > 1)? "s" : "") + " won vs. " + winner[2])
    ) + 
    (
      (winner[3] > 0)? ("; " + winner[3] + " draw" + 
      ((winner[3] > 1)? "s" : "") + ".") : "."
    );


  showWinner(winner[0].toLowerCase(), outcome);
  setTimeout(reset, 1750);
}

// Plays a five round game with result logged out to the console for 
// each round and winner logged out to the console at the end.
playGame = (e) => {

  let playerHand = e.path[1].id;
  let computerHand = computerPlay();
  let result = playRound(playerHand, computerHand);

  showHands(playerHand, computerHand);

  updateScore(result);
  results.push(result);

  showHandWinner(result) 

  rounds++;

  if (rounds == 5) setTimeout( () => { terminateGame(results) }, 400)  
}


let playSound = (e) => {
                
  const audio = document.querySelector(`audio[id="${e.path[1].attributes["sound-key"].value}"]`);
  const hand = document.querySelector(`div[id="${e.path[1].attributes["id"].value}"]`);
  // console.log(audio);

  if (!audio) return;

  audio.currentTime = 0;
  audio.play();   
  
  hand.classList.add("playing");
}

let removeTransition = (hand) => { hand.classList.remove(("playing")); }

let hands = document.querySelectorAll(".hand");

hands.forEach(hand => {
  hand.addEventListener("click", (e) => {
    playSound(e);
    playGame(e);
  })
}); 

hands.forEach(hand => {
  hand.addEventListener("transitionend", function(e){ removeTransition(this) })
}); 
