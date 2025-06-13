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
setupTabs();

// Автокликер
setInterval(() => {
    points += autoPower;
    updatePoints();
    checkUpgrades();
    saveGame();
}, 1000);

// Настройка вкладок
function setupTabs() {
    document.querySelectorAll('.tab-button').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.tab-button').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            const tabId = this.dataset.tab;
            document.getElementById(tabId).classList.add('active');
        });
    });
}

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
        const baseCost = parseInt(upgrade.dataset.baseCost);
        const cost = Math.floor(baseCost * Math.pow(PRICE_INCREASE_RATE, level - 1));
        
        if (points >= cost) {
            upgrade.classList.add('active');
        } else {
            upgrade.classList.remove('active');
        }
    });
}

// Покупка улучшения (при клике)
document.querySelectorAll('.upgrade').forEach(upgrade => {
    upgrade.addEventListener('click', function() {
        if (!this.classList.contains('active')) return;
        
        const type = this.dataset.type;
        const level = parseInt(this.querySelector('.upgrade-level span').textContent);
        const baseCost = parseInt(this.dataset.baseCost);
        const power = parseInt(this.dataset.power);
        const cost = Math.floor(baseCost * Math.pow(PRICE_INCREASE_RATE, level - 1));
        
        if (points >= cost) {
            points -= cost;
            
            // Улучшение характеристик
            if (type === 'click') {
                clickPower += power;
            } else if (type === 'auto') {
                autoPower += power;
            } else if (type === 'critical') {
                criticalChance += power;
            }
            
            // Увеличение уровня
            const newLevel = level + 1;
            this.querySelector('.upgrade-level span').textContent = newLevel;
            
            // Обновление цены
            const newCost = Math.floor(baseCost * Math.pow(PRICE_INCREASE_RATE, newLevel - 1));
            this.querySelector('.upgrade-cost span').textContent = newCost;
            
            // Сброс анимации
            this.classList.remove('active');
            
            updateUI();
            saveGame();
        }
    });
});

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
            level: parseInt(upgrade.querySelector('.upgrade-level span').textContent),
            baseCost: parseInt(upgrade.dataset.baseCost)
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
                    const newCost = Math.floor(upgrade.baseCost * Math.pow(PRICE_INCREASE_RATE, (upgrade.level || 1) - 1));
                    element.querySelector('.upgrade-cost span').textContent = newCost;
                }
            });
        }
    }
}
