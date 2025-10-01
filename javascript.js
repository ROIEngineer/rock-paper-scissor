document.addEventListener('DOMContentLoaded', () => {
  // Toggle for debug logging (set to false in production)
  const DEV = true;
  const dbg = (...args) => { if (DEV) console.log(...args); };

  // --- Game State ---
  let humanScore = 0;
  let computerScore = 0;
  const WINNING_SCORE = 5;

  // --- DOM refs (queried after DOM loaded) ---
  const rockBtn = document.getElementById('rock');
  const paperBtn = document.getElementById('paper');
  const scissorsBtn = document.getElementById('scissors');
  const resultsDiv = document.getElementById('results');
  const roundMessage = document.getElementById('roundMessage');
  const lastRound = document.getElementById('lastRound');
  const scoreDiv = document.getElementById('score');
  const restartBtn = document.getElementById('restart');

  // Parent container for delegation (falls back to individual buttons if missing)
  const controls = document.querySelector('.controls');

  // --- Helpers ---
  function getComputerChoice() {
    const randomNum = Math.floor(Math.random() * 3);
    switch (randomNum) {
      case 0: return 'rock';
      case 1: return 'paper';
      default: return 'scissors';
    }
  }

  function updateScoreDisplay() {
    if (scoreDiv) scoreDiv.textContent = `You: ${humanScore} — Computer: ${computerScore}`;
  }

  function setRoundMessage(text = '') {
    if (roundMessage) roundMessage.textContent = text;
  }

  function appendLastRound(text = '') {
    if (lastRound) lastRound.textContent = text;
  }

  function disableChoiceButtons(disabled) {
    [rockBtn, paperBtn, scissorsBtn].forEach(btn => {
      if (!btn) return;
      btn.disabled = disabled;
      btn.style.opacity = disabled ? '0.6' : '1';
    });
  }

  // --- Core round logic ---
  function playRound(humanChoice) {
    if (!humanChoice) return;
    humanChoice = humanChoice.toLowerCase();
    const computerChoice = getComputerChoice();

    dbg('playRound', { humanChoice, computerChoice, beforeScores: { humanScore, computerScore } });

    if (humanChoice === computerChoice) {
      setRoundMessage(`Tie — both chose ${humanChoice}.`);
      appendLastRound(`Tie this round.`);
      return 'tie';
    }

    const humanWins = (
      (humanChoice === 'rock' && computerChoice === 'scissors') ||
      (humanChoice === 'paper' && computerChoice === 'rock') ||
      (humanChoice === 'scissors' && computerChoice === 'paper')
    );

    if (humanWins) {
      humanScore++;
      setRoundMessage(`You win this round — ${humanChoice} beats ${computerChoice}.`);
      appendLastRound(`You: ${humanChoice} | Computer: ${computerChoice}`);
      updateScoreDisplay();
      checkForMatchWinner();
      dbg('round result', 'human', { humanScore, computerScore });
      return 'human';
    } else {
      computerScore++;
      setRoundMessage(`Computer wins this round — ${computerChoice} beats ${humanChoice}.`);
      appendLastRound(`You: ${humanChoice} | Computer: ${computerChoice}`);
      updateScoreDisplay();
      checkForMatchWinner();
      dbg('round result', 'computer', { humanScore, computerScore });
      return 'computer';
    }
  }

  function checkForMatchWinner() {
    if (humanScore >= WINNING_SCORE || computerScore >= WINNING_SCORE) {
      if (humanScore > computerScore) {
        setRoundMessage(`🎉 YOU WIN THE GAME! Final: ${humanScore} — ${computerScore}`);
      } else if (computerScore > humanScore) {
        setRoundMessage(`💻 COMPUTER WINS THE GAME! Final: ${computerScore} — ${humanScore}`);
      } else {
        setRoundMessage(`It's a tie at ${humanScore} — ${computerScore}`);
      }

      disableChoiceButtons(true);
      if (restartBtn) restartBtn.style.display = 'inline-block';
    }
  }

  function handlePlayerChoice(choice) {
    if (!choice) {
      dbg('handlePlayerChoice called without a choice argument');
      return;
    }
    if (humanScore >= WINNING_SCORE || computerScore >= WINNING_SCORE) return;
    playRound(choice);
  }

  // --- Event wiring (delegation with fallback) ---
  if (controls) {
    controls.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      // allow either data-choice attribute or the button id (keeps your current HTML unchanged)
      const choice = btn.dataset && btn.dataset.choice ? btn.dataset.choice : btn.id;
      if (!choice) return;
      handlePlayerChoice(choice);
    });
  } else {
    // fallback for older markup — attach individually if present
    if (rockBtn) rockBtn.addEventListener('click', () => handlePlayerChoice('rock'));
    if (paperBtn) paperBtn.addEventListener('click', () => handlePlayerChoice('paper'));
    if (scissorsBtn) scissorsBtn.addEventListener('click', () => handlePlayerChoice('scissors'));
  }

  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      humanScore = 0;
      computerScore = 0;
      updateScoreDisplay();
      setRoundMessage('Click a button to begin. First to 5 wins.');
      appendLastRound('');
      restartBtn.style.display = 'none';
      disableChoiceButtons(false);
      dbg('game restarted');
    });
  }

  // initial UI state
  updateScoreDisplay();
  setRoundMessage('Click a button to begin. First to 5 wins.');
});
