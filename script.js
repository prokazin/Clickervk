let credits = 0;
let creditsPerSecond = 0;

const clickBtn = document.getElementById("click-btn");
const creditsDisplay = document.getElementById("credits");
const upgrade1 = document.getElementById("upgrade1");
const upgrade2 = document.getElementById("upgrade2");

// Клик по кнопке
clickBtn.addEventListener("click", () => {
    credits++;
    updateDisplay();
});

// Улучшение 1 (дроид)
upgrade1.addEventListener("click", () => {
    if (credits >= 10) {
        credits -= 10;
        creditsPerSecond += 1;
        updateDisplay();
    }
});

// Улучшение 2 (джедай)
upgrade2.addEventListener("click", () => {
    if (credits >= 50) {
        credits -= 50;
        creditsPerSecond += 5;
        updateDisplay();
    }
});

// Пассивный доход
setInterval(() => {
    credits += creditsPerSecond;
    updateDisplay();
}, 1000);

// Обновление интерфейса
function updateDisplay() {
    creditsDisplay.textContent = credits;
}
