// Игровые переменные
let points = 0;
let clickPower = 1;
let autoPower = 0;
let criticalChance = 0;

// Инициализация игры
function initGame() {
    loadGame();
    setupEventListeners();
    startAutoClicker();
    updateUI();
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Клик по мечу
    document.getElementById('clicker-area').addEventListener('click', function(e) {
        handleClick(e);
    });
    
    // Переключение вкладок
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', function() {
            switchTab(this.dataset.tab);
        });
    });
    
    // Покупка улучшений
    document.querySelectorAll('.upgrade').forEach(upgrade => {
        upgrade.addEventListener('click', function() {
            buyUpgrade(this);
        });
    });
}

// Обработка клика
function handleClick(event) {
    const clicker = document.querySelector('#clicker-area img');
    clicker.classList.add('click-animation');
    setTimeout(() => clicker.classList.remove('click-animation'), 200);
    
    let earned = clickPower;
    const isCritical = Math.random() * 100 < criticalChance;
    
    if (isCritical) {
        earned *= 3;
        showFloatingText(`КРИТ! +${earned}`, event.clientX, event.clientY);
    } else {
        showFloatingText(`+${earned}`, event.clientX, event.clientY);
    }
    
    points += earned;
    updateUI();
    saveGame();
}

// Автокликер
function startAutoClicker() {
    setInterval(() => {
        if (autoPower > 0) {
            points += autoPower;
            updateUI();
            saveGame();
        }
    }, 1000);
}

// Покупка улучшения
function buyUpgrade(element) {
    const type = element.dataset.type;
    const level = parseInt(element.dataset.level);
    const baseCost = parseInt(element.dataset.baseCost);
    const power = parseInt(element.dataset.power);
    const cost = Math.floor(baseCost * Math.pow(1.3, level - 1));
    
    if (points >= cost) {
        points -= cost;
        element.dataset.level = level + 1;
        
        switch(type) {
            case 'click': clickPower += power; break;
            case 'auto': autoPower += power; break;
            case 'critical': criticalChance += power; break;
        }
        
        updateUI();
        saveGame();
    }
}

// Переключение вкладок
function switchTab(tabId) {
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    document.querySelector(`.tab-button[data-tab="${tabId}"]`).classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

// Обновление интерфейса
function updateUI() {
    document.getElementById('points').textContent = Math.floor(points);
    document.getElementById('click-power').textContent = clickPower;
    document.getElementById('auto-power').textContent = autoPower;
    
    document.querySelectorAll('.upgrade').forEach(upgrade => {
        const type = upgrade.dataset.type;
        const level = parseInt(upgrade.dataset.level);
        const baseCost = parseInt(upgrade.dataset.baseCost);
        const cost = Math.floor(baseCost * Math.pow(1.3, level - 1));
        
        upgrade.querySelector('.upgrade-cost span').textContent = cost;
        upgrade.classList.toggle('active', points >= cost);
    });
}

// Всплывающий текст
function showFloatingText(text, x, y) {
    const floatText = document.createElement('div');
    floatText.className = 'float-text';
    floatText.textContent = text;
    floatText.style.left = `${x}px`;
    floatText.style.top = `${y}px`;
    document.body.appendChild(floatText);
    
    setTimeout(() => floatText.remove(), 1000);
}

// Сохранение игры
function saveGame() {
    const gameData = {
        points,
        clickPower,
        autoPower,
        criticalChance,
        upgrades: Array.from(document.querySelectorAll('.upgrade')).map(upgrade => ({
            type: upgrade.dataset.type,
            level: parseInt(upgrade.dataset.level),
            baseCost: parseInt(upgrade.dataset.baseCost)
        }))
    };
    localStorage.setItem('swClickerSave', JSON.stringify(gameData));
}

// Загрузка игры
function loadGame() {
    const savedData = localStorage.getItem('swClickerSave');
    if (savedData) {
        const data = JSON.parse(savedData);
        points = data.points || 0;
        clickPower = data.clickPower || 1;
        autoPower = data.autoPower || 0;
        criticalChance = data.criticalChance || 0;
        
        data.upgrades?.forEach(upgradeData => {
            const upgrade = document.querySelector(`.upgrade[data-type="${upgradeData.type}"]`);
            if (upgrade) {
                upgrade.dataset.level = upgradeData.level || 1;
            }
        });
    }
}

// Запуск игры
initGame();
