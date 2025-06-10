// Игровые переменные
let credits = 0;
let creditsPerSecond = 0;

// Элементы интерфейса
const clickBtn = document.getElementById("click-btn");
const creditsDisplay = document.getElementById("credits");
const upgrade1 = document.getElementById("upgrade1");
const upgrade2 = document.getElementById("upgrade2");

// Звуки
const clickSound = new Audio('assets/lightsaber-swing.mp3');
const upgradeSound = new Audio('assets/upgrade-sound.mp3');

// Основной клик
clickBtn.addEventListener("click", () => {
    credits++;
    updateDisplay();
    clickSound.currentTime = 0;
    clickSound.play();
    
    // Анимация
    clickBtn.style.transform = "scale(0.95)";
    setTimeout(() => {
        clickBtn.style.transform = "scale(1)";
    }, 100);
});

// Улучшения
upgrade1.addEventListener("click", () => {
    if (credits >= 10) {
        credits -= 10;
        creditsPerSecond += 1;
        updateDisplay();
        upgradeSound.play();
        upgrade1.textContent = `Нанять джедая (+${creditsPerSecond}/сек)`;
    }
});

upgrade2.addEventListener("click", () => {
    if (credits >= 50) {
        credits -= 50;
        creditsPerSecond += 5;
        updateDisplay();
        upgradeSound.play();
        upgrade2.textContent = `Нанять ситха (+${creditsPerSecond}/сек)`;
    }
});

// Пассивный доход
setInterval(() => {
    if (creditsPerSecond > 0) {
        credits += creditsPerSecond;
        updateDisplay();
    }
}, 1000);

// Обновление интерфейса
function updateDisplay() {
    creditsDisplay.textContent = credits;
    
    // Динамическое изменение цвета при большом количестве силы
    if (credits > 1000) {
        creditsDisplay.style.color = "#ff0000";
        creditsDisplay.style.textShadow = "0 0 10px #ff0000";
    } else if (credits > 500) {
        creditsDisplay.style.color = "#9400D3";
        creditsDisplay.style.textShadow = "0 0 10px #9400D3";
    }
}

// Инициализация VK (если нужно)
VK.init({
    apiId: YOUR_APP_ID
});
