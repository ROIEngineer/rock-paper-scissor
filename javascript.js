

// Input: Rock, Paper, Scissor 
// Comp: Pusedocode 
// Output: 3x3 combo for inputs


// Original Version
function getComputerChoice1() {
  const randomNum = Math.random() * 10;
  if (randomNum <= 3) {
    return console.log("Rock");
  } else if (randomNum >=4 && randomNum <=6) {
    return console.log("Paper");
  } else {
    return console.log("Scissor");
  }
}

// Revised If/Else Version
function getComputerChoice2() {
  const randomNum = Math.random();
  if (randomNum <= 0.33) {
    return "Rock";
  } else if (randomNum <= 0.66) {
    return "Paper";
  } else {
    return "Scissor";
  }
}

// Switch Version
function getComputerScience3() {
  const randomNum = Math.floor(Math.random() * 3);
  switch (randomNum) {
    case 0: return "Rock";
    case 1: return "Paper";
    case 2: return "Scissor"; 
  }
}


console.log(getComputerScience3());
