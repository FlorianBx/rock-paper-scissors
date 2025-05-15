const emojiMap = {
  rock: "🪨",
  paper: "📄",
  scissors: "✂️"
};
const possibleChoices = ["rock", "paper", "scissors"];
let playerScore = 0;
let computerScore = 0;

const resultDiv = document.getElementById("result");
const scoreDiv = document.getElementById("score");
const resetBtn = document.getElementById("reset");
const buttons = document.querySelectorAll(".choices button");
const playerEmoji = document.getElementById("player-emoji");
const computerEmoji = document.getElementById("computer-emoji");

function getRandomChoice() {
  const idx = Math.floor(Math.random() * 3);
  return possibleChoices[idx];
}

function decideWinner(player, computer) {
  if (player === computer) return 0; // tie
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "scissors" && computer === "paper") ||
    (player === "paper" && computer === "rock")
  ) {
    return 1;
  }
  return 2;
}

function updateScore() {
  scoreDiv.textContent = `You: ${playerScore} | Computer: ${computerScore}`;
}

function updateEmojis(playerChoice, computerChoice) {
  playerEmoji.textContent = emojiMap[playerChoice] || "❔";
  computerEmoji.textContent = emojiMap[computerChoice] || "❔";
}

buttons.forEach(btn => {
  btn.addEventListener("click", function () {
    const playerChoice = this.getAttribute("data-choice");
    const computerChoice = getRandomChoice();

    updateEmojis(playerChoice, computerChoice);

    let message = '';
    const winner = decideWinner(playerChoice, computerChoice);
    if (winner === 0) message = "It's a tie!";
    if (winner === 1) {
      message = "You win!";
      playerScore++;
    }
    if (winner === 2) {
      message += "Computer wins!";
      computerScore++;
    }
    resultDiv.textContent = message;
    updateScore();
  });
});

// Reset button event
resetBtn.addEventListener("click", function () {
  playerScore = 0;
  computerScore = 0;
  updateScore();
  resultDiv.textContent = "Choose your move!";
  updateEmojis(null, null);
});

// Initialisation
updateScore();
resultDiv.textContent = "Choose your move!";
updateEmojis(null, null);
