let userScore = 0;
let compScore = 0;
let streak = 0;
let isAnimating = false; // Prevents spam clicking

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const streakPara = document.querySelector("#streak-score");
const msg = document.querySelector("#msg");
const userHand = document.querySelector("#user-hand");
const compHand = document.querySelector("#comp-hand");

// Image paths
const images = {
    rock: "images/image.png",
    paper: "images/image copy 2.png",
    scissors: "images/image copy.png"
};

const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

const updateStreak = (result) => {
    if (result === 'win') {
        streak++;
    } else if (result === 'lose') {
        streak = 0;
    }
    // Draw doesn't reset streak
    streakPara.innerText = streak;
};

const drawGame = () => {
    msg.innerText = "It's a Draw!";
    msg.style.color = "#94a3b8"; // Grey
};

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You Won! ${userChoice} beats ${compChoice}`;
        msg.style.color = "#4ade80"; // Green
        updateStreak('win');
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You Lost! ${compChoice} beats ${userChoice}`;
        msg.style.color = "#f87171"; // Red
        updateStreak('lose');
    }
};

const playGame = (userChoice) => {
    if (isAnimating) return; // Stop if animation is running
    isAnimating = true;

    // 1. Reset hands to Rock
    userHand.src = images['rock'];
    compHand.src = images['rock'];
    msg.innerText = "Wait for it...";
    msg.style.color = "#e2e8f0";

    // 2. Add shaking classes
    userHand.classList.add("shaking");
    compHand.classList.add("shaking-comp");

    // 3. Wait 1.5 seconds, then reveal
    setTimeout(() => {
        // Remove shake
        userHand.classList.remove("shaking");
        compHand.classList.remove("shaking-comp");

        // Logic
        const compChoice = genCompChoice();
        
        // Update Images to actual choice
        userHand.src = images[userChoice];
        compHand.src = images[compChoice];

        if (userChoice === compChoice) {
            drawGame();
        } else {
            let userWin = true;
            if (userChoice === "rock") {
                userWin = compChoice === "paper" ? false : true;
            } else if (userChoice === "paper") {
                userWin = compChoice === "scissors" ? false : true;
            } else {
                userWin = compChoice === "rock" ? false : true;
            }
            showWinner(userWin, userChoice, compChoice);
        }
        
        isAnimating = false; // Unlock game
    }, 1500); // 1.5 second delay
};

const resetGame = () => {
    userScore = 0;
    compScore = 0;
    streak = 0;
    userScorePara.innerText = "0";
    compScorePara.innerText = "0";
    streakPara.innerText = "0";
    msg.innerText = "Play your move";
    msg.style.color = "white";
    userHand.src = images['rock'];
    compHand.src = images['rock'];
};
