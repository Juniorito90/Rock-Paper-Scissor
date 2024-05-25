const btnPlay = document.querySelectorAll('.btnplay');
const myChoiceSpan = document.querySelector('.mychoice');
const computerChoiceSpan = document.querySelector('.computerchoice');
const whoWonText = document.querySelector('.whowon');
const meScoreSpan = document.querySelector('.me');
const computerScoreSpan = document.querySelector('.computer');
const replayBtn = document.querySelector('.replay');

const choices = {
    rock: 'Pierre',
    paper: 'Feuille',
    scissors: 'Ciseaux'
};
let meScore = 0;
let computerScore = 0;

btnPlay.forEach(button => {
    button.addEventListener('click', () => {
        disableButtons();
        const myChoice = button.classList[1];
        const computerChoice = getComputerChoice();
        const result = determineWinner(myChoice, computerChoice);

        updateChoices(myChoice, computerChoice, result);
        updateResult(result);
        updateScores(result);
        setTimeout(() => {
            resetButtonStyles();
            enableButtons();
        }, 1000);
    });
});

replayBtn.addEventListener('click', resetGame);

function getComputerChoice() {
    const keys = Object.keys(choices);
    const randomIndex = Math.floor(Math.random() * keys.length);
    return keys[randomIndex];
}

function determineWinner(myChoice, computerChoice) {
    if (myChoice === computerChoice) {
        return 'draw';
    }
    if (
        (myChoice === 'rock' && computerChoice === 'scissors') ||
        (myChoice === 'scissors' && computerChoice === 'paper') ||
        (myChoice === 'paper' && computerChoice === 'rock')
    ) {
        return 'win';
    }
    return 'lose';
}

function updateChoices(myChoice, computerChoice, result) {
    myChoiceSpan.textContent = choices[myChoice];
    computerChoiceSpan.textContent = choices[computerChoice];

    const myButton = document.querySelector(`.${myChoice}`);
    const computerButton = document.querySelector(`.${computerChoice}`);

    if (result === 'win') {
        myButton.style.backgroundColor = 'green';
        computerButton.style.backgroundColor = 'red';
    } else if (result === 'lose') {
        myButton.style.backgroundColor = 'red';
        computerButton.style.backgroundColor = 'green';
    } else {
        myButton.style.backgroundColor = 'yellow';
        computerButton.style.backgroundColor = 'yellow';
    }
}

function updateResult(result) {
    if (result === 'win') {
        whoWonText.textContent = 'Tu as gagné!';
    } else if (result === 'lose') {
        whoWonText.textContent = 'Tu as perdu!';
    } else {
        whoWonText.textContent = 'Égalité!';
    }
}

function updateScores(result) {
    if (result === 'win') {
        meScore++;
    } else if (result === 'lose') {
        computerScore++;
    }
    meScoreSpan.textContent = meScore;
    computerScoreSpan.textContent = computerScore;
}

function resetButtonStyles() {
    btnPlay.forEach(button => {
        button.style.backgroundColor = '';
    });
}

function disableButtons() {
    btnPlay.forEach(button => {
        button.classList.add('disabled');
    });
}

function enableButtons() {
    btnPlay.forEach(button => {
        button.classList.remove('disabled');
    });
}

function resetGame() {
    meScore = 0;
    computerScore = 0;
    meScoreSpan.textContent = meScore;
    computerScoreSpan.textContent = computerScore;
    myChoiceSpan.textContent = '';
    computerChoiceSpan.textContent = '';
    resetButtonStyles();
    whoWonText.textContent = '';
}