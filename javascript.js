
// Step 2: Computer Hand
function getComputerChoice() {
  const randomNum = Math.floor(Math.random() * 3);
  switch (randomNum) {
    case 0: return "Rock";
    case 1: return "Paper";
    case 2: return "Scissor"; 
  }
}

// Step 3: Human Hand
function getHumanChoice() {
  let choice = prompt("Rock, Paper, or Scissors?").toLowerCase();

  while (!['rock', 'paper', 'scissors'].includes(choice)) {
    choice = prompt("Invalid choice. Please enter Rock, Paper, or Scissors:").toLowerCase();
  }
  return choice;
}

// Step 4: Initialize Scores to keep track
let humanScore = 0;
let computerScore = 0;

// Step 5: Single round function

// Step 6: Entire Game
function playGame() {
  let humanScore = 0;
  let computerScore = 0;

  function playRound(humanChoice, computerChoice) {
    humanChoice = humanChoice.toLowerCase();
    
    if (humanChoice === computerChoice) {
      console.log(`Tie! Both chose ${humanChoice}`);
      return;
    }

    const humanWins = (
      (humanChoice === 'rock' && computerChoice === 'scissors') ||
      (humanChoice === 'paper' && computerChoice === 'rock') ||
      (humanChoice === 'scissors' && computerChoice === 'paper')
    );

    if (humanWins) {
      humanScore++;
      console.log(`You win! ${humanChoice} beats ${computerChoice}`);
    } else {
        computerScore++;
        console.log(`You lose! ${computerChoice} beats ${humanChoice}`);
      }
    }
  }

  for (let round = 1; round <= 5; round++) {
    const humanSelection = getHumanChoice();
    const computerSelection = getComputerChoice();
        
    console.log(`\nRound ${round}:`);
    console.log(`You: ${humanSelection} | Computer: ${computerSelection}`);
        
    console.log(`Score: ${humanScore}-${computerScore}`);
  }

  console.log("\nGAME OVER - Final Results:");
  console.log(`Your Score: ${humanScore} | Computer Score: ${computerScore}`);
    
  if (humanScore > computerScore) console.log("YOU WIN THE GAME!");
  else if (computerScore > humanScore) console.log("COMPUTER WINS THE GAME!");
  else console.log("IT'S A TIE!");
 

// Start the game
playGame();


// Put the return of the functions into variables for later use
const humanSelection = getHumanChoice();
const computerSelection = getComputerChoice();

