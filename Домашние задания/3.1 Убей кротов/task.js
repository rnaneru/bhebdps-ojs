let dead = 0;
let lost = 0;
let gameActive = true;

function getHole(index) {
    return document.getElementById(`hole${index}`);
}

function updateCounters() {
    document.getElementById('dead').textContent = dead;
    document.getElementById('lost').textContent = lost;
}

function checkGameOver() {
    if (dead >= 10) {
        alert('Поздравляем! Вы убили 10 кротов! Победа!');
        resetGame();
        return true;
    } else if (lost >= 5) {
        alert('Игра окончена! Вы проиграли, набрав 5 поражений.');
        resetGame();
        return true;
    }
    return false;
}

function resetGame() {
    dead = 0;
    lost = 0;
    gameActive = true;
    updateCounters();
}

function handleHoleClick(hole, index) {
    return function() {
        if (!gameActive) return;
        
        if (hole.classList.contains('hole_has-mole')) {
            dead++;
            updateCounters();
            
            if (dead >= 10) {
                gameActive = false;
                checkGameOver();
            }
        } else {
            lost++;
            updateCounters();
            
            if (lost >= 5) {
                gameActive = false;
                checkGameOver();
            }
        }
    };
}

for (let i = 1; i <= 9; i++) {
    const hole = getHole(i);
    if (hole) {
        hole.addEventListener('click', handleHoleClick(hole, i));
    }
}

updateCounters();