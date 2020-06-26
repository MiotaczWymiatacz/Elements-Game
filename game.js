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

function elementSelection() {
    game.playerElement = this.dataset.option;
    console.log(game.playerElement);
    elements.forEach((element) => (element.style.boxShadow = ""));
    elements.forEach((element) => (element.style.backgroundColor = ""));
    this.style.boxShadow = "0px 0px 126px 5px rgba(194, 134, 24, 1)";
    this.style.backgroundColor = "rgba(194, 134, 24, .33)";
}

function aiSelection() {
    return elements[Math.floor(Math.random() * 5)].dataset.option;

}

function checkResult(player, ai) {
    if (player === ai) {
        return "draw";
    } else if (
        (player === "fire" && ai === "metal") ||
        (player === "fire" && ai === "earth") ||
        (player === "metal" && ai === "earth") ||
        (player === "metal" && ai === "water") ||
        (player === "earth" && ai === "water") ||
        (player === "earth" && ai === "wind") ||
        (player === "water" && ai === "wind") ||
        (player === "water" && ai === "fire") ||
        (player === "wind" && ai === "fire") ||
        (player === "wind" && ai === "metal")
    ) {
        return "win";
    } else {
        return "loss";
    }
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
    document.querySelector(`[data-option="${game.playerElement}"]`).style.boxShadow =
        "";
    document.querySelector(`[data-option="${game.playerElement}"]`).style.backgroundColor =
        "";
    game.playerElement = "";
    game.aiElement = "";
}

function startGame() {
    if (!game.playerElement) {
        return alert("Choose your element!");
    }
    game.aiElement = aiSelection();
    const gameResult = checkResult(game.playerElement, game.aiElement);
    publishResult(game.playerElement, game.aiElement, gameResult);
    console.log(gameResult);
    endGame();
}
const arrow = document.querySelector('.arrow');
const nav = document.querySelector('nav');

arrow.addEventListener('click', function () {
    arrow.classList.toggle('on')
    nav.classList.toggle('on')
})


elements.forEach((element) => element.addEventListener("click", elementSelection));
document.querySelector(".start").addEventListener("click", startGame);