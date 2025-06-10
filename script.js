// Игровые данные
const gameData = {
    credits: 0,
    creditsPerSecond: 0,
    upgrades: [
        { id: 1, count: 0, baseCost: 10, cost: 10, power: 1 },
        { id: 2, count: 0, baseCost: 50, cost: 50, power: 5 },
        { id: 3, count: 0, baseCost: 200, cost: 200, power: 15 }
    ],
    version: 1
};

// DOM элементы
const elements = {
    credits: document.getElementById('credits'),
    clickBtn: document.getElementById('click-btn'),
    jediLevel: document.getElementById('jedi-level'),
    upgrades: {
        1: {
            element: document.getElementById('upgrade1'),
            count: document.getElementById('upgrade1-count'),
            power: document.getElementById('upgrade1-power'),
            cost: document.getElementById('upgrade1-cost')
        },
        2: {
            element: document.getElementById('upgrade2'),
            count: document.getElementById('upgrade2-count'),
            power: document.getElementById('upgrade2-power'),
            cost: document.getElementById('upgrade2-cost')
        },
        3: {
            element: document.getElementById('upgrade3'),
            count: document.getElementById('upgrade3-count'),
            power: document.getElementById('upgrade3-power'),
            cost: document.getElementById('upgrade3-cost')
        }
    }
};

// Инициализация игры
function initGame() {
    loadGame();
    setupEventListeners();
    updateUI();
    startGameLoop();
    
    // Проверяем наличие сохранения каждые 5 секунд
    setInterval(saveGame, 5000);
}

// Загрузка сохранения
function loadGame() {
    const savedData = localStorage.getItem('swClickerSave');
    if (savedData) {
        try {
            const parsedData = JSON.parse(savedData);
            if (parsedData.version === gameData.version) {
                Object.assign(gameData, parsedData);
                recalculateStats();
            }
        } catch (e) {
            console.error('Ошибка загрузки сохранения', e);
        }
    }
}

// Сохранение игры
function saveGame() {
    localStorage.setItem('swClickerSave', JSON.stringify(gameData));
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Основной клик
    elements.clickBtn.addEventListener('click', () => {
        gameData.credits++;
        updateUI();
        animateClick();
    });
    
    // Улучшения
    for (let i = 1; i <= 3; i++) {
        elements.upgrades[i].element.addEventListener('click', () => buyUpgrade(i));
    }
}

// Покупка улучшения
function buyUpgrade(upgradeId) {
    const upgrade = gameData.upgrades[upgradeId - 1];
    
    if (gameData.credits >= upgrade.cost) {
        gameData.credits -= upgrade.cost;
        upgrade.count++;
        upgrade.cost = Math.floor(upgrade.baseCost * Math.pow(1.15, upgrade.count));
        
        recalculateStats();
        updateUI();
        animateUpgrade(upgradeId);
    }
}

// Пересчет статистики
function recalculateStats() {
    gameData.creditsPerSecond = gameData.upgrades.reduce((total, upgrade) => {
        return total + (upgrade.count * upgrade.power);
    }, 0);
}

// Игровой цикл
function startGameLoop() {
    setInterval(() => {
        if (gameData.creditsPerSecond > 0) {
            gameData.credits += gameData.creditsPerSecond / 10;
            updateUI();
        }
    }, 100);
}

// Обновление интерфейса
function updateUI() {
    // Обновляем счетчик силы
    elements.credits.textContent = Math.floor(gameData.credits);
    
    // Обновляем уровень
    const totalUpgrades = gameData.upgrades.reduce((sum, u) => sum + u.count, 0);
    elements.jediLevel.textContent = `(Уровень ${Math.floor(totalUpgrades / 5) + 1})`;
    
    // Обновляем информацию об улучшениях
    gameData.upgrades.forEach(upgrade => {
        const ui = elements.upgrades[upgrade.id];
        ui.count.textContent = upgrade.count;
        ui.cost.textContent = upgrade.cost;
        
        // Подсвечиваем доступные улучшения
        ui.element.style.borderColor = gameData.credits >= upgrade.cost ? '#4bd5ff' : '#ffe81f';
    });
}

// Анимация клика
function animateClick() {
    const img = document.querySelector('.lightsaber-img');
    img.style.transform = 'rotate(30deg) scale(1.1)';
    setTimeout(() => {
        img.style.transform = 'rotate(0) scale(1)';
    }, 100);
}

// Анимация улучшения
function animateUpgrade(upgradeId) {
    const element = elements.upgrades[upgradeId].element;
    element.style.transform = 'scale(1.05)';
    element.style.boxShadow = '0 0 15px #4bd5ff';
    
    setTimeout(() => {
        element.style.transform = 'scale(1)';
        element.style.boxShadow = 'none';
    }, 200);
}

// Запуск игры при загрузке
window.addEventListener('load', initGame);
