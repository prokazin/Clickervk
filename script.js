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
    saveGame();
}, 1000);

// Обработчики событий
document.querySelectorAll('.tab-button').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab-button').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
    });
});

document.querySelectorAll('.upgrade-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const type = this.dataset.type;
        const level = parseInt(this.dataset.level);
        const baseCost = parseInt(this.dataset.baseCost);
        const power = parseInt(this.dataset.power);
        
        // Расчет цены с учетом уровня
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
            this.dataset.level = level + 1;
            
            // Обновление текста кнопки
            const newCost = Math.floor(baseCost * Math.pow(PRICE_INCREASE_RATE, level));
            this.querySelector('.cost').textContent = newCost;
            this.querySelector('.level').textContent = level;
            this.querySelector('.power-value').textContent = power;
            
            updateUI();
            saveGame();
        }
    });
});

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
    saveGame();
});

// Функции обновления интерфейса
function updatePoints() {
    document.getElementById('points').textContent = Math.floor(points);
}

function updateUI() {
    updatePoints();
    
    document.querySelectorAll('.upgrade-btn').forEach(btn => {
        const type = btn.dataset.type;
        const level = parseInt(btn.dataset.level);
        const baseCost = parseInt(btn.dataset.baseCost);
        const cost = Math.floor(baseCost * Math.pow(PRICE_INCREASE_RATE, level - 1));
        
        btn.querySelector('.cost').textContent = cost;
        btn.disabled = points < cost;
    });
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
        upgrades: {}
    };
    
    document.querySelectorAll('.upgrade-btn').forEach(btn => {
        gameData.upgrades[btn.dataset.type] = {
            level: parseInt(btn.dataset.level)
        };
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
            Object.keys(data.upgrades).forEach(type => {
                const btn = document.querySelector(`.upgrade-btn[data-type="${type}"]`);
                if (btn) {
                    btn.dataset.level = data.upgrades[type].level || 1;
                }
            });
        }
    }
}
