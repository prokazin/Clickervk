let points = 0;
let autoClickerPower = 0;
let autoClickerCost = 50;

// Клик по мечу
document.getElementById('lightsaber').addEventListener('click', () => {
    points++;
    updatePoints();
    animateLightsaber();
});

// Автокликер
function autoClick() {
    points += autoClickerPower;
    updatePoints();
}

setInterval(autoClick, 1000); // Каждую секунду

// Покупка улучшений
document.getElementById('auto-clicker').addEventListener('click', () => {
    if (points >= autoClickerCost) {
        points -= autoClickerCost;
        autoClickerPower++;
        autoClickerCost += 20;
        updatePoints();
        document.getElementById('auto-clicker').textContent = 
            `Купить дроида-кликера (${autoClickerCost} очков)`;
    }
});

// Обновление счёта
function updatePoints() {
    document.getElementById('points').textContent = points;
}

// Анимация меча
function animateLightsaber() {
    const saber = document.getElementById('lightsaber');
    saber.style.transform = 'rotate(30deg)';
    setTimeout(() => {
        saber.style.transform = 'rotate(0deg)';
    }, 100);
}
