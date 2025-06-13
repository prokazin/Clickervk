// Игровые переменные
let points = 0;
let clickPower = 1;
let autoPower = 0;
let criticalChance = 0;

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
        const baseCost = getBaseCost(type);
        const cost = Math.floor(baseCost * Math.pow(PRICE_INCREASE_RATE, level - 1));
        
        if (points >= cost) {
            upgrade.classList.add('active');
            setTimeout(() => {
                buyUpgrade(upgrade, type, level, baseCost);
            }, 300);
        } else {
            upgrade.classList.remove('active');
        }
    });
}

// Покупка улучшения
function buyUpgrade(upgrade, type, level, baseCost) {
    const cost = Math.floor(baseCost * Math.pow(PRICE_INCREASE_RATE, level - 1));
    
    if (points >= cost) {
        points -= cost;
        
        // Улучшение характеристик
        if (type === 'click') {
            clickPower += 1;
        } else if (type === 'auto') {
            autoPower += 1;
        } else if (type === 'critical') {
            criticalChance += 5;
        }
        
        // Увеличение уровня
        const newLevel = level + 1;
        upgrade.querySelector('.upgrade-level span').textContent = newLevel;
        
        // Обновление цены
        const newCost = Math.floor(baseCost * Math.pow(PRICE_INCREASE_RATE, newLevel - 1));
        upgrade.querySelector('.upgrade-cost span').textContent = newCost;
        
        updateUI();
        saveGame();
    }
}

// Базовая стоимость улучшений
function getBaseCost(type) {
    switch(type) {
        case 'click': return 50;
        case 'auto': return 100;
        case 'critical': return 200;
        default: return 0;
    }
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
    floatText.style.top = `${y - 30}px`;
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
    
    localStorage.setItem('swAutoClickerSave', JSON.stringify(gameData));
}

function loadGame() {
    const savedData = localStorage.getItem('swAutoClickerSave');
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
                }
            });
        }
    }
}
