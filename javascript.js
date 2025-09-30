// --- Game Stat ---
let humanScore = 0;
let computerScore = 0;
const WINNING_SCORE = 5;

// --- DOM refs ---
const rockBtn = document.getElementById('rock');
const paperBtn = document.getElementById('paper');
const scissorsBtn = document.getElementById('scissors');
const resultsDiv = document.getElementById('results');
const roundMessage = document.getElementById('roundMessage');
const lastRound = document.getElementById('lastRound');
const scoreDiv = document.getElementById('score');
const restartBtn = document.getElementById('restart');


// Computer Selection - Generate and match random number between 0-3
function getComputerChoice() {
  const randomNum = Math.floor(Math.random() * 3);
  switch (randomNum) {
    case 0: return "rock";
    case 1: return "paper";
    case 2: return "scissor";
  }
}

// Update the Score Display
function updateScoreDisplay() {
  scoreDiv.textContent = `Your Score: ${humanScore} - Computer: ${computerScore}`;
}

// Round Message
function setRoundMessage() {
  roundMessage.textContent = text;
}

// Append Last Round
function appendLastRound() {
  lastRound.textContent = text;
}

// Player Selection (with null safety)
function getHumanChoice() {
  let input = prompt("Rock, Paper, or Scissors?");

  // Handle cancel button
  if (input === null) {
    return null; // or you could throw an error or return a special value
  }

  let choice = input.toLowerCase().trim();

  while (!['rock', 'paper', 'scissors'].includes(choice)) {
    input = prompt("Invalid choice. Please enter Rock, Paper, or Scissors:");
    if (input === null) {
      return null; // Handle cancel in retry prompt too
    }
    choice = input.toLowerCase().trim();
  }
  return choice;
}

// Entire Game
function playRound(humanChoice) {
  // Normalize
  humanChoice = humanChoice.toLowerCase();
  const computerChoice = computerChoice();

  // Handle tie events
  if (humanChoice === computerChoice) {
    setRoundMessage(`Tie - both chose ${humanChoice}.`);
    appendLastRound(`Tie this round.`);
    console.log(`Tie! Both chose ${humanChoice}`);
    return 'tie';
  }

  const humanWins = (
    (humanChoice === 'rock' && computerChoice === 'scissors') ||
    (humanChoice === 'paper' && computerChoice === 'rock') ||
    (humanChoice === 'scissors' && computerChoice === 'paper')
  );

  if (humanWins) {
    humanScore++;
    setRoundMessage(`You win this round - ${humanChoice} beats ${computerChoice}`);
    appendLastRound(`You: ${humanChoice} | Computer: ${computerChoice}`);
    console.log(`You win! ${humanChoice} beats ${computerChoice}`);
    updateScoreDisplay();
    checkForMatchWinner();
    return 'human';
  } else {
    computerScore++;
    setRoundMessage(`Computer wins this round - ${computerChoice} beats ${humanChoice}.`);
    appendLastRound(`You: ${humanChoice} | Computer: ${computerChoice}`);
    console.log(`You lose! ${computerChoice} beats ${humanChoice}`);
    updateScoreDisplay();
    checkForMatchWinner();
    return 'computer';
  }
}

function playGame() {
  for (let round = 1; round <= 5; round++) {
    console.log(`\n=== Round ${round} ===`);

    const humanSelection = getHumanChoice();

    // Check if user cancelled the game
    if (humanSelection === null) {
      console.log("Game cancelled by user.");
      return;
    }

    const computerSelection = getComputerChoice();

    console.log(`You: ${humanSelection} | Computer: ${computerSelection}`);

    const result = playRound(humanSelection, computerSelection);

    // Update scores based on result
    if (result === 'human') {
      humanScore++;
    } else if (result === 'computer') {
      computerScore++;
    }
    console.log(`Current Score: You ${humanScore} - ${computerScore} Computer`);
  }

  // Final results
  console.log("\n GAME OVER - Final Results:");
  console.log(`Your Score: ${humanScore} | Computer Score: ${computerScore}`);

  if (humanScore > computerScore) {
    console.log("YOU WIN THE GAME!");
  } else if (computerScore > humanScore) {
    console.log("COMPUTER WINS THE GAME!");
  } else {
    console.log("IT'S A TIE!");
  }
}

playGame();










