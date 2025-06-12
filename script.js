// Игровые переменные
let points = 0;
let clickPower = 1;
let autoPower = 0;
let comboActive = false;
let criticalChance = 0;

// Элементы UI
const pointsElement = document.getElementById('points');
const lightsaber = document.getElementById('lightsaber');

// Инициализация сохранения
loadGame();

// Табы
const tabs = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
    });
});

// Клик по мечу
lightsaber.addEventListener('click', () => {
    let earned = clickPower;
    
    // Критический удар
    if (Math.random() * 100 < criticalChance) {
        earned *= 3;
        showFloatingText("КРИТ! +" + earned, lightsaber);
    } else {
        showFloatingText("+" + earned, lightsaber);
    }
    
    // Комбо
    if (comboActive) earned *= 2;
    
    points += earned;
    updatePoints();
    animateLightsaber();
    saveGame();
});

// Автокликер
setInterval(() => {
    if (autoPower > 0) {
        points += autoPower;
        updatePoints();
        saveGame();
    }
}, 1000);

// Покупка улучшений
document.querySelectorAll('.upgrade-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const cost = parseInt(btn.dataset.cost);
        
        if (points >= cost) {
            points -= cost;
            updatePoints();
            
            if (btn.dataset.power) {
                clickPower += parseInt(btn.dataset.power);
                btn.textContent = `Улучшено! (+${btn.dataset.power}/клик)`;
            } else if (btn.dataset.type === 'auto') {
                autoPower += parseInt(btn.dataset.type === 'auto' ? 1 : 5);
                btn.textContent = `Активно! (+${btn.dataset.type === 'auto' ? 1 : 5}/сек)`;
            } else if (btn.dataset.type === 'combo') {
                activateCombo();
                btn.textContent = "Активно! (10 сек)";
                setTimeout(() => {
                    btn.textContent = `Комбо x2 (10 сек)`;
                }, 10000);
            } else if (btn.dataset.type === 'critical') {
                criticalChance += 20;
                btn.textContent = `Улучшено! (${criticalChance}% шанс)`;
            }
            
            btn.disabled = true;
            saveGame();
        }
    });
});

// Анимации и вспомогательные функции
function animateLightsaber() {
    lightsaber.style.transform = 'rotate(30deg)';
    setTimeout(() => {
        lightsaber.style.transform = 'rotate(0)';
    }, 100);
}

function showFloatingText(text, parent) {
    const floatingText = document.createElement('div');
    floatingText.textContent = text;
    floatingText.className = 'floating-text';
    parent.appendChild(floatingText);
    
    setTimeout(() => {
        floatingText.remove();
    }, 1000);
}

function activateCombo() {
    comboActive = true;
    setTimeout(() => {
        comboActive = false;
    }, 10000);
}

function updatePoints() {
    pointsElement.textContent = points;
}

// Сохранение игры
function saveGame() {
    const gameData = {
        points,
        clickPower,
        autoPower,
        criticalChance
    };
    localStorage.setItem('starWarsClickerSave', JSON.stringify(gameData));
}

// Загрузка игры
function loadGame() {
    const savedData = localStorage.getItem('starWarsClickerSave');
    if (savedData) {
        const gameData = JSON.parse(savedData);
        points = gameData.points || 0;
        clickPower = gameData.clickPower || 1;
        autoPower = gameData.autoPower || 0;
        criticalChance = gameData.criticalChance || 0;
        updatePoints();
        
        // Обновляем кнопки улучшений
        document.querySelectorAll('.upgrade-btn').forEach(btn => {
            if (btn.dataset.power && clickPower > 1) {
                btn.disabled = true;
                btn.textContent = `Улучшено! (+${btn.dataset.power}/клик)`;
            } else if (btn.dataset.type === 'auto' && autoPower > 0) {
                btn.disabled = true;
                btn.textContent = `Активно! (+${autoPower}/сек)`;
            } else if (btn.dataset.type === 'critical' && criticalChance >= 20) {
                btn.disabled = true;
                btn.textContent = `Улучшено! (${criticalChance}% шанс)`;
            }
        });
    }
}

// Включить сохранение каждые 5 секунд на всякий случай
setInterval(saveGame, 5000);
