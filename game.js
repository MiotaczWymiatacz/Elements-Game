const gameSummary = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0,
};

const game = {
    playerElement: "",
    aiElement: "",
};

const elements = [...document.querySelectorAll(".select .col img")];
const arrow = document.querySelector('.arrow');
const nav = document.querySelector('nav');
const winRules = {};

setWinRules();

function setWinRules() {
    winRules["fire"] = ["metal", "earth"];
    winRules["metal"] = ["earth", "water"];
    winRules["earth"] = ["water", "wind"];
    winRules["water"] = ["wind", "fire"];
    winRules["wind"] = ["fire", "metal"];
}

elements.forEach((element) => element.addEventListener("click", elementSelection));
arrow.addEventListener('click', toggleNav);
document.querySelector(".start").addEventListener("click", startGame);


function toggleNav() {
    arrow.classList.toggle('on');
    nav.classList.toggle('on');
}

function elementSelection() {
    clearShadow();
    game.playerElement = this.dataset.option;
    this.style.boxShadow = "0px 0px 126px 5px rgba(194, 134, 24, 1)";
    this.style.backgroundColor = "rgba(194, 134, 24, .33)";
}

function aiSelection() {
    return elements[Math.floor(Math.random() * 5)].dataset.option;
}

function checkResult(playerChoice, aiChoice) {
    if (playerChoice === aiChoice) {
        return "draw";
    }

    const isPlayerWinning = winRules[playerChoice].find(elem => elem === aiChoice);

    if (isPlayerWinning !== undefined) {
        return "win";
    }

    return "loss";
}

function publishResult(player, ai, result) {
    document.querySelector('[data-summary="your-choice"]').textContent = player;

    document.querySelector('[data-summary="ai-choice"]').textContent = ai;

    document.querySelector("p.numbers span").textContent = ++gameSummary.numbers;

    if (result === "win") {
        document.querySelector("p.wins span").textContent = ++gameSummary.wins;
        document.querySelector('[data-summary="who-win"]').textContent =
            "The mage has been defeated";
        document.querySelector('[data-summary="who-win"]').style.color = "green";
    } else if (result === "loss") {
        document.querySelector("p.losses span").textContent = ++gameSummary.losses;
        document.querySelector('[data-summary="who-win"]').textContent =
            "You have been defeated";
        document.querySelector('[data-summary="who-win"]').style.color = "red";
    } else {
        document.querySelector("p.draws span").textContent = ++gameSummary.draws;
        document.querySelector('[data-summary="who-win"]').textContent =
            "Draw";
        document.querySelector('[data-summary="who-win"]').style.color = "gray";
    }
}

function endGame() {
    clearShadow();
    game.playerElement = "";
    game.aiElement = "";
}

function clearShadow() {
    const elemToClear = document.querySelector(`[data-option="${game.playerElement}"]`);

    if(elemToClear){
        elemToClear.style.boxShadow = "";
        elemToClear.style.backgroundColor = "";
    }
}

function startGame() {
    if (!game.playerElement) {
        return alert("Choose your element!");
    }
    game.aiElement = aiSelection();
    const gameResult = checkResult(game.playerElement, game.aiElement);
    publishResult(game.playerElement, game.aiElement, gameResult);
    endGame();
}
