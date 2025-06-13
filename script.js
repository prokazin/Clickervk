// Игровые переменные
let points = 0;
let clickPower = 1;
let autoPower = 0;
let criticalChance = 0;
let comboActive = false;

// Коэффициент роста цен
const PRICE_INCREASE_RATE = 1.3;

// Инициализация игры
loadGame();
updateUI();

// Автокликер
setInterval(() => {
    points += autoPower;
    updatePoints();
    checkUpgrades();
    saveGame();
}, 1000);

// Клик по мечу
document.getElementById('lightsaber').addEventListener('click', function(e) {
    // Анимация
    this.classList.add('click-animation');
    setTimeout(() => this.classList.remove('click-animation'), 200);
    
    // Расчет полученных очков
    let earned = clickPower;
    
    // Критический удар
    if (Math.random() * 100 < criticalChance) {
        earned *= 3;
        showFloatingText("КРИТ! +" + earned, e.clientX, e.clientY);
    } else {
        showFloatingText("+" + earned, e.clientX, e.clientY);
    }
    
    // Комбо
    if (comboActive) earned *= 2;
    
    points += earned;
    updatePoints();
    checkUpgrades();
    saveGame();
});

// Проверка доступных улучшений
function checkUpgrades() {
    document.querySelectorAll('.upgrade').forEach(upgrade => {
        const type = upgrade.dataset.type;
        const level = parseInt(upgrade.querySelector('.upgrade-level span').textContent);
        const cost = getUpgradeCost(type, level);
        
        if (points >= cost) {
            if (!upgrade.classList.contains('active')) {
                upgrade.classList.add('active');
                setTimeout(() => buyUpgrade(upgrade, type, level), 500);
            }
        } else {
            upgrade.classList.remove('active');
        }
    });
}

// Покупка улучшения
function buyUpgrade(upgrade, type, level) {
    const cost = getUpgradeCost(type, level);
    
    if (points >= cost) {
        points -= cost;
        
        // Улучшение характеристик
        switch(type) {
            case 'click':
                clickPower += 1;
                break;
            case 'auto':
                autoPower += 1;
                break;
            case 'critical':
                criticalChance += 5;
                break;
            case 'combo':
                activateCombo();
                break;
        }
        
        // Увеличение уровня
        const newLevel = level + 1;
        upgrade.querySelector('.upgrade-level span').textContent = newLevel;
        
        // Обновление цены
        upgrade.querySelector('.upgrade-cost span').textContent = getUpgradeCost(type, newLevel);
        
        // Сброс анимации
        upgrade.classList.remove('active');
        
        updateUI();
        saveGame();
    }
}

// Активация комбо
function activateCombo() {
    if (comboActive) return;
    
    comboActive = true;
    setTimeout(() => {
        comboActive = false;
    }, 10000);
}

// Расчет стоимости улучшения
function getUpgradeCost(type, level) {
    const baseCost = {
        'click': 50,
        'auto': 100,
        'critical': 200,
        'combo': 300
    }[type];
    
    return Math.floor(baseCost * Math.pow(PRICE_INCREASE_RATE, level - 1));
}

// Обновление интерфейса
function updatePoints() {
    document.getElementById('points').textContent = Math.floor(points);
    document.getElementById('click-power').textContent = clickPower;
    document.getElementById('auto-power').textContent = autoPower;
}

function updateUI() {
    updatePoints();
    checkUpgrades();
}

// Всплывающий текст
function showFloatingText(text, x, y) {
    const floatText = document.createElement('div');
    floatText.className = 'float-text';
    floatText.textContent = text;
    floatText.style.left = `${x}px`;
    floatText.style.top = `${y}px`;
    document.body.appendChild(floatText);
    
    setTimeout(() => {
        floatText.remove();
    }, 1000);
}

// Сохранение и загрузка
function saveGame() {
    const gameData = {
        points,
        clickPower,
        autoPower,
        criticalChance,
        upgrades: []
    };
    
    document.querySelectorAll('.upgrade').forEach(upgrade => {
        gameData.upgrades.push({
            type: upgrade.dataset.type,
            level: parseInt(upgrade.querySelector('.upgrade-level span').textContent)
        });
    });
    
    localStorage.setItem('swClickerSave', JSON.stringify(gameData));
}

function loadGame() {
    const savedData = localStorage.getItem('swClickerSave');
    if (savedData) {
        const data = JSON.parse(savedData);
        points = data.points || 0;
        clickPower = data.clickPower || 1;
        autoPower = data.autoPower || 0;
        criticalChance = data.criticalChance || 0;
        
        if (data.upgrades) {
            data.upgrades.forEach(upgrade => {
                const element = document.querySelector(`.upgrade[data-type="${upgrade.type}"]`);
                if (element) {
                    element.querySelector('.upgrade-level span').textContent = upgrade.level || 1;
                    element.querySelector('.upgrade-cost span').textContent = 
                        getUpgradeCost(upgrade.type, upgrade.level || 1);
                }
            });
        }
    }
}
