// Игровые данные
const game = {
    credits: 0,
    forcePoints: 0,
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    cps: 0,
    clickPower: 1,
    upgrades: [
        { id: 1, name: "Дроид-уборщик", description: "Автоматически собирает кредиты", baseCost: 50, owned: 0, cps: 1 },
        { id: 2, name: "Торговый корабль", description: "Межгалактическая торговля", baseCost: 200, owned: 0, cps: 5 },
        { id: 3, name: "Дроид-астромеханик", description: "Ремонтирует технику за кредиты", baseCost: 500, owned: 0, cps: 10 },
        { id: 4, name: "Шахта спайса", description: "Добыча ценного ресурса", baseCost: 1000, owned: 0, cps: 20 },
        { id: 5, name: "Звездолет", description: "Перевозка грузов между системами", baseCost: 5000, owned: 0, cps: 50 },
        { id: 6, name: "Космическая станция", description: "Торговый хаб", baseCost: 10000, owned: 0, cps: 100 },
        { id: 7, name: "Планетарная колония", description: "Добыча ресурсов с планеты", baseCost: 50000, owned: 0, cps: 500 },
        { id: 8, name: "Звездный разрушитель", description: "Военная мощь Империи", baseCost: 100000, owned: 0, cps: 1000 },
        { id: 9, name: "Смертельная Звезда", description: "Ультимативное оружие", baseCost: 1000000, owned: 0, cps: 10000 }
    ],
    achievements: [
        { id: 1, name: "Первые кредиты", description: "Заработать 100 кредитов", goal: 100, achieved: false, reward: 10 },
        { id: 2, name: "Новичок", description: "Заработать 1,000 кредитов", goal: 1000, achieved: false, reward: 50 },
        { id: 3, name: "Опытный", description: "Заработать 10,000 кредитов", goal: 10000, achieved: false, reward: 100 },
        { id: 4, name: "Профессионал", description: "Заработать 100,000 кредитов", goal: 100000, achieved: false, reward: 500 },
        { id: 5, name: "Магнат", description: "Заработать 1,000,000 кредитов", goal: 1000000, achieved: false, reward: 1000 },
        { id: 6, name: "Первая Сила", description: "Получить 1 Очко Силы", goal: 1, achieved: false, reward: 100 },
        { id: 7, name: "Чувствительный", description: "Получить 10 Очков Силы", goal: 10, achieved: false, reward: 500 },
        { id: 8, name: "Джедай", description: "Получить 50 Очков Силы", goal: 50, achieved: false, reward: 1000 },
        { id: 9, name: "Мастер-джедай", description: "Получить 100 Очков Силы", goal: 100, achieved: false, reward: 5000 },
        { id: 10, name: "Падаван", description: "Достигнуть 5 уровня", goal: 5, achieved: false, reward: 200 },
        { id: 11, name: "Рыцарь-джедай", description: "Достигнуть 10 уровня", goal: 10, achieved: false, reward: 500 },
        { id: 12, name: "Магистр", description: "Достигнуть 20 уровня", goal: 20, achieved: false, reward: 2000 },
        { id: 13, name: "Совет джедаев", description: "Достигнуть 30 уровня", goal: 30, achieved: false, reward: 5000 },
        { id: 14, name: "Первое улучшение", description: "Купить любое улучшение", goal: 1, achieved: false, reward: 50 },
        { id: 15, name: "Коллекционер", description: "Купить 5 улучшений", goal: 5, achieved: false, reward: 200 },
        { id: 16, name: "Инвестор", description: "Купить 10 улучшений", goal: 10, achieved: false, reward: 500 },
        { id: 17, name: "Тайкун", description: "Купить все улучшения", goal: 9, achieved: false, reward: 1000 },
        { id: 18, name: "Охотник за головами", description: "Победить Дарта Вейдера", goal: 1, achieved: false, reward: 500 },
        { id: 19, name: "Ситх", description: "Победить Дарта Мола", goal: 1, achieved: false, reward: 1000 },
        { id: 20, name: "Избранный", description: "Победить Оби-Вана Кеноби", goal: 1, achieved: false, reward: 2000 },
        { id: 21, name: "Клановая система", description: "Создать или вступить в клан", goal: 1, achieved: false, reward: 300 },
        { id: 22, name: "Щедрый", description: "Пожертвовать 10,000 кредитов в клан", goal: 10000, achieved: false, reward: 500 },
        { id: 23, name: "Меценат", description: "Пожертвовать 100,000 кредитов в клан", goal: 100000, achieved: false, reward: 2000 },
        { id: 24, name: "Лидер", description: "Поднять клан до 5 уровня", goal: 5, achieved: false, reward: 1000 },
        { id: 25, name: "Легенда", description: "Поднять клан до 10 уровня", goal: 10, achieved: false, reward: 5000 },
        { id: 26, name: "Ежедневный игрок", description: "Зайти в игру 3 дня подряд", goal: 3, achieved: false, reward: 300 },
        { id: 27, name: "Преданный", description: "Зайти в игру 7 дней подряд", goal: 7, achieved: false, reward: 700 },
        { id: 28, name: "Фанат", description: "Зайти в игру 30 дней подряд", goal: 30, achieved: false, reward: 3000 },
        { id: 29, name: "Мастер кликера", description: "Сделать 1,000 кликов", goal: 1000, achieved: false, reward: 500 },
        { id: 30, name: "Абсолютный мастер", description: "Сделать 10,000 кликов", goal: 10000, achieved: false, reward: 5000 }
    ],
    bosses: [
        { id: 1, name: "Дарт Вейдер", maxHealth: 1000, currentHealth: 1000, reward: 5000, forceCost: 100 },
        { id: 2, name: "Дарт Мол", maxHealth: 2500, currentHealth: 2500, reward: 15000, forceCost: 250 },
        { id: 3, name: "Оби-Ван Кеноби", maxHealth: 5000, currentHealth: 5000, reward: 30000, forceCost: 500 }
    ],
    clan: null,
    clickCount: 0,
    lastPlayDate: null,
    consecutiveDays: 0
};

// DOM элементы
const creditsDisplay = document.getElementById('credits');
const forcePointsDisplay = document.getElementById('force-points');
const levelDisplay = document.getElementById('level');
const cpsDisplay = document.getElementById('cps');
const clicker = document.getElementById('clicker');
const upgradesGrid = document.getElementById('upgrades-grid');
const achievementsGrid = document.getElementById('achievements-grid');
const notification = document.getElementById('notification');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const createClanBtn = document.getElementById('create-clan-btn');
const clanCreationForm = document.getElementById('clan-creation-form');
const confirmClanBtn = document.getElementById('confirm-clan-btn');
const clanNameInput = document.getElementById('clan-name');
const noClanSection = document.getElementById('no-clan');
const hasClanSection = document.getElementById('has-clan');
const clanNameDisplay = document.getElementById('clan-name-display');
const clanLevelDisplay = document.getElementById('clan-level');
const clanTreasuryDisplay = document.getElementById('clan-treasury');
const clanMembersList = document.getElementById('clan-members-list');
const donateBtn = document.getElementById('donate-btn');
const donationAmountInput = document.getElementById('donation-amount');
const attackButtons = document.querySelectorAll('.attack-btn');

// Инициализация игры
function initGame() {
    loadGame();
    setupTabs();
    setupClicker();
    renderUpgrades();
    renderAchievements();
    updateBossesUI();
    setupClanUI();
    startPassiveIncome();
    checkDailyReward();
    updateUI();
}

// Настройка вкладок
function setupTabs() {
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;
            
            // Скрыть все вкладки
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Убрать активный класс у всех кнопок
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Показать выбранную вкладку
            document.getElementById(tabId).classList.add('active');
            button.classList.add('active');
        });
    });
}

// Настройка кликера
function setupClicker() {
    clicker.addEventListener('click', (e) => {
        // Создаем эффект клика
        const clickEffect = document.createElement('div');
        clickEffect.className = 'click-effect';
        clickEffect.style.left = `${e.offsetX - 25}px`;
        clickEffect.style.top = `${e.offsetY - 25}px`;
        clicker.appendChild(clickEffect);
        
        // Удаляем эффект после анимации
        setTimeout(() => {
            clickEffect.remove();
        }, 500);
        
        // Добавляем кредиты
        game.credits += game.clickPower;
        game.clickCount++;
        
        // Шанс получить Очко Силы (1%)
        if (Math.random() < 0.01) {
            game.forcePoints++;
            showNotification('+1 Очко Силы!');
        }
        
        // Добавляем опыт
        addXP(1);
        
        // Обновляем UI
        updateUI();
        
        // Проверяем достижения
        checkAchievements();
    });
}

// Пассивный доход
function startPassiveIncome() {
    setInterval(() => {
        if (game.cps > 0) {
            game.credits += game.cps / 10;
            updateUI();
        }
    }, 100);
}

// Обновление UI
function updateUI() {
    creditsDisplay.textContent = formatNumber(game.credits);
    forcePointsDisplay.textContent = formatNumber(game.forcePoints);
    cpsDisplay.textContent = formatNumber(game.cps);
    
    // Обновляем уровень игрока
    const levelTitles = [
        "Падаван", "Рыцарь-джедай", "Магистр-джедай", "Член Совета", 
        "Мастер-джедай", "Гранд-мастер", "Избранный", "Ситх", 
        "Лорд ситхов", "Темный лорд"
    ];
    const titleIndex = Math.min(Math.floor(game.level / 3), levelTitles.length - 1);
    levelDisplay.textContent = `${levelTitles[titleIndex]} (${game.level})`;
}

// Форматирование чисел
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return Math.floor(num);
}

// Рендер улучшений
function renderUpgrades() {
    upgradesGrid.innerHTML = '';
    
    game.upgrades.forEach(upgrade => {
        const cost = Math.floor(upgrade.baseCost * Math.pow(1.15, upgrade.owned));
        const canAfford = game.credits >= cost;
        
        const upgradeCard = document.createElement('div');
        upgradeCard.className = 'upgrade-card';
        upgradeCard.innerHTML = `
            <h3>${upgrade.name}</h3>
            <p>${upgrade.description}</p>
            <p>+${upgrade.cps} кредитов/сек</p>
            <p>Куплено: ${upgrade.owned}</p>
            <p>Стоимость: ${formatNumber(cost)} кредитов</p>
            <button ${!canAfford ? 'disabled' : ''}>Купить</button>
        `;
        
        const button = upgradeCard.querySelector('button');
        button.addEventListener('click', () => {
            buyUpgrade(upgrade.id);
        });
        
        upgradesGrid.appendChild(upgradeCard);
    });
}

// Покупка улучшения
function buyUpgrade(upgradeId) {
    const upgrade = game.upgrades.find(u => u.id === upgradeId);
    const cost = Math.floor(upgrade.baseCost * Math.pow(1.15, upgrade.owned));
    
    if (game.credits >= cost) {
        game.credits -= cost;
        upgrade.owned++;
        
        // Пересчитываем CPS
        game.cps = game.upgrades.reduce((total, u) => total + (u.owned * u.cps), 0);
        
        // Добавляем опыт
        addXP(5);
        
        // Обновляем UI
        updateUI();
        showNotification(`Куплено: ${upgrade.name}`);
        
        // Проверяем достижения
        checkAchievements();
    }
}

// Рендер достижений
function renderAchievements() {
    achievementsGrid.innerHTML = '';
    
    game.achievements.forEach(achievement => {
        const achieved = achievement.achieved;
        const progress = getAchievementProgress(achievement);
        
        const achievementCard = document.createElement('div');
        achievementCard.className = `achievement-card ${achieved ? '' : 'locked'}`;
        achievementCard.innerHTML = `
            <img src="achievement_${achievement.id}.png" alt="${achievement.name}">
            <h4>${achievement.name}</h4>
            <p>${achievement.description}</p>
            ${!achieved ? `<p>Прогресс: ${progress}/${achievement.goal}</p>` : ''}
        `;
        
        achievementsGrid.appendChild(achievementCard);
    });
}

// Получение прогресса достижения
function getAchievementProgress(achievement) {
    switch(achievement.id) {
        case 1: case 2: case 3: case 4: case 5:
            return Math.min(game.credits, achievement.goal);
        case 6: case 7: case 8: case 9:
            return Math.min(game.forcePoints, achievement.goal);
        case 10: case 11: case 12: case 13:
            return Math.min(game.level, achievement.goal);
        case 14: case 15: case 16: case 17:
            const ownedUpgrades = game.upgrades.reduce((total, u) => total + u.owned, 0);
            return Math.min(ownedUpgrades, achievement.goal);
        case 18:
            return game.bosses[0].currentHealth <= 0 ? 1 : 0;
        case 19:
            return game.bosses[1].currentHealth <= 0 ? 1 : 0;
        case 20:
            return game.bosses[2].currentHealth <= 0 ? 1 : 0;
        case 21:
            return game.clan ? 1 : 0;
        case 22: case 23:
            return game.clan ? Math.min(game.clan.totalDonations, achievement.goal) : 0;
        case 24: case 25:
            return game.clan ? Math.min(game.clan.level, achievement.goal) : 0;
        case 26: case 27: case 28:
            return Math.min(game.consecutiveDays, achievement.goal);
        case 29: case 30:
            return Math.min(game.clickCount, achievement.goal);
        default:
            return 0;
    }
}

// Проверка достижений
function checkAchievements() {
    let newAchievements = 0;
    
    game.achievements.forEach(achievement => {
        if (!achievement.achieved) {
            const progress = getAchievementProgress(achievement);
            if (progress >= achievement.goal) {
                achievement.achieved = true;
                game.credits += achievement.reward;
                newAchievements++;
                showNotification(`Достижение: ${achievement.name}! +${achievement.reward} кредитов`);
            }
        }
    });
    
    if (newAchievements > 0) {
        renderAchievements();
        updateUI();
    }
}

// Добавление опыта
function addXP(amount) {
    game.xp += amount;
    
    // Проверка повышения уровня
    while (game.xp >= game.xpToNextLevel) {
        game.xp -= game.xpToNextLevel;
        game.level++;
        game.xpToNextLevel = Math.floor(game.xpToNextLevel * 1.2);
        showNotification(`Уровень повышен! Теперь вы ${levelDisplay.textContent}`);
    }
}

// Обновление UI боссов
function updateBossesUI() {
    game.bosses.forEach(boss => {
        const bossElement = document.getElementById(`${boss.name.toLowerCase().replace(' ', '-')}-boss`);
        if (bossElement) {
            const healthBar = bossElement.querySelector('.health');
            const healthPercent = (boss.currentHealth / boss.maxHealth) * 100;
            healthBar.style.width = `${healthPercent}%`;
            
            const attackBtn = bossElement.querySelector('.attack-btn');
            attackBtn.textContent = `Атаковать (${boss.forceCost} ОС)`;
            attackBtn.disabled = game.forcePoints < boss.forceCost || boss.currentHealth <= 0;
        }
    });
}

// Атака босса
function attackBoss(bossId) {
    const boss = game.bosses.find(b => b.id === bossId);
    
    if (game.forcePoints >= boss.forceCost && boss.currentHealth > 0) {
        game.forcePoints -= boss.forceCost;
        
        // Расчет урона в зависимости от уровня игрока
        const damage = 50 + (game.level * 5);
        boss.currentHealth = Math.max(0, boss.currentHealth - damage);
        
        // Проверка победы над боссом
        if (boss.currentHealth <= 0) {
            game.credits += boss.reward;
            showNotification(`Босс побежден! +${boss.reward} кредитов`);
            
            // Добавляем опыт
            addXP(20);
        }
        
        // Обновляем UI
        updateUI();
        updateBossesUI();
        checkAchievements();
    }
}

// Настройка UI клана
function setupClanUI() {
    if (game.clan) {
        noClanSection.style.display = 'none';
        hasClanSection.style.display = 'block';
        
        // Обновляем информацию о клане
        clanNameDisplay.textContent = game.clan.name;
        clanLevelDisplay.textContent = game.clan.level;
        clanTreasuryDisplay.textContent = formatNumber(game.clan.treasury);
        
        // Обновляем список участников
        clanMembersList.innerHTML = '';
        game.clan.members.forEach(member => {
            const li = document.createElement('li');
            li.textContent = member;
            clanMembersList.appendChild(li);
        });
    } else {
        noClanSection.style.display = 'block';
        hasClanSection.style.display = 'none';
    }
    
    // Создание клана
    createClanBtn.addEventListener('click', () => {
        if (game.credits >= 5000) {
            clanCreationForm.style.display = 'block';
        } else {
            showNotification('Недостаточно кредитов (нужно 5,000)');
        }
    });
    
    confirmClanBtn.addEventListener('click', () => {
        const clanName = clanNameInput.value.trim();
        if (clanName.length >= 3 && clanName.length <= 20) {
            game.credits -= 5000;
            game.clan = {
                name: clanName,
                level: 1,
                treasury: 0,
                totalDonations: 0,
                members: ['Вы']
            };
            
            clanCreationForm.style.display = 'none';
            clanNameInput.value = '';
            setupClanUI();
            updateUI();
            showNotification(`Клан "${clanName}" создан!`);
            
            // Добавляем опыт
            addXP(10);
            
            // Проверяем достижения
            checkAchievements();
        } else {
            showNotification('Название клана должно быть от 3 до 20 символов');
        }
    });
    
    // Пожертвования в клан
    donateBtn.addEventListener('click', () => {
        const amount = parseInt(donationAmountInput.value);
        if (amount >= 1000 && game.credits >= amount) {
            game.credits -= amount;
            game.clan.treasury += amount;
            game.clan.totalDonations += amount;
            
            // Проверка повышения уровня клана (10,000 кредитов за уровень)
            const levelsGained = Math.floor(game.clan.treasury / 10000) - (game.clan.level - 1);
            if (levelsGained > 0) {
                game.clan.level += levelsGained;
                showNotification(`Клан повышен до уровня ${game.clan.level}!`);
            }
            
            updateUI();
            showNotification(`Пожертвовано ${amount} кредитов в клан`);
            
            // Добавляем опыт
            addXP(2);
            
            // Проверяем достижения
            checkAchievements();
        } else {
            showNotification('Минимальное пожертвование - 1,000 кредитов');
        }
    });
}

// Показать уведомление
function showNotification(message) {
    notification.textContent = message;
    notification.style.opacity = '1';
    
    setTimeout(() => {
        notification.style.opacity = '0';
    }, 3000);
}

// Проверка ежедневной награды
function checkDailyReward() {
    const today = new Date().toDateString();
    
    if (game.lastPlayDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (game.lastPlayDate === yesterday.toDateString()) {
            game.consecutiveDays++;
        } else if (game.lastPlayDate !== today) {
            game.consecutiveDays = 1;
        }
        
        game.lastPlayDate = today;
        
        // Расчет награды (100 * 1.1^consecutiveDays)
        const reward = Math.floor(100 * Math.pow(1.1, game.consecutiveDays - 1));
        game.credits += reward;
        
        showNotification(`Ежедневная награда: ${reward} кредитов (День ${game.consecutiveDays})`);
        updateUI();
        checkAchievements();
    }
}

// Сохранение игры
function saveGame() {
    localStorage.setItem('starWarsClicker', JSON.stringify(game));
}

// Загрузка игры
function loadGame() {
    const savedGame = localStorage.getItem('starWarsClicker');
    if (savedGame) {
        const parsed = JSON.parse(savedGame);
        Object.assign(game, parsed);
        
        // Пересчет CPS на случай изменения формулы
        game.cps = game.upgrades.reduce((total, u) => total + (u.owned * u.cps), 0);
    }
}

// Автосохранение каждые 30 секунд
setInterval(saveGame, 30000);

// Сохранение при закрытии страницы
window.addEventListener('beforeunload', saveGame);

// Назначение обработчиков атаки боссов
document.querySelectorAll('.attack-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const bossId = parseInt(this.parentElement.id.split('-')[1]);
        attackBoss(bossId);
    });
});

// Инициализация игры при загрузке страницы
document.addEventListener('DOMContentLoaded', initGame);
