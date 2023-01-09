'use strict';
const player0 = document.querySelector('.player-0');
const player1 = document.querySelector('.player-1');
const player1Score = document.getElementById('score-0');
const player2Score = document.getElementById('score-1');
const player1Current = document.querySelector('.current-box__score0');
const player2Current = document.querySelector('.current-box__score1');
const diceEl = document.querySelector('.dice-img');
const rollingBtn = document.getElementById('rolling');
const holdingBtn = document.getElementById('holding');
const newGameBtn = document.getElementById('new-game');

player1Score.textContent = 0;
player2Score.textContent = 0;
player1Current.textContent = 0;
player2Current.textContent = 0;
diceEl.classList.add('hidden');

let totlaScores, activePlayer, currentScore, continuePlaying;

const resetGame = function () {
    totlaScores = [0, 0];
    activePlayer = 0;
    currentScore = 0;
    continuePlaying = true;
    player1Score.textContent = 0;
    player2Score.textContent = 0;
    player1Current.textContent = 0;
    player2Current.textContent = 0;
    diceEl.classList.add('hidden');
    player0.classList.remove('player-winner');
    player1.classList.remove('player-winner');
    document.querySelector('.player-0').classList.add('player-active');
    document.querySelector('.player-1').classList.remove('player-active');
};
resetGame();
const switchingPlayer = function () {
    document.querySelector(
        `.current-box__score${activePlayer}`,
    ).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player-active');
    player1.classList.toggle('player-active');
};
rollingBtn.addEventListener('click', function () {
    if (continuePlaying) {
        // this part for generating random dice number
        let diceNumber = Math.trunc(Math.random() * 6) + 1;
        // this part for displaying random dice number
        diceEl.classList.remove('hidden');
        diceEl.src = `images/dice-${diceNumber}.png`;
        if (diceNumber !== 1) {
            currentScore += diceNumber;
            document.querySelector(
                `.current-box__score${activePlayer}`,
            ).textContent = currentScore;
        } else {
            // this part will switch from player to another player
            switchingPlayer();
        }
    }
});
holdingBtn.addEventListener('click', function () {
    if (continuePlaying) {
        totlaScores[activePlayer] += currentScore;
        document.getElementById(`score-${activePlayer}`).textContent =
            totlaScores[activePlayer];
        if (totlaScores[activePlayer] >= 100) {
            continuePlaying = false;
            document
                .querySelector(`.player-${activePlayer}`)
                .classList.add('player-winner');
            document
                .querySelector(`.player-${activePlayer}`)
                .classList.remove('player-active');
            diceEl.classList.add('hidden');
        } else {
            switchingPlayer();
        }
    }
});
newGameBtn.addEventListener('click', resetGame);
