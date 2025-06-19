// Game State
const gameState = {
    credits: 0,
    forcePoints: 0,
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    cps: 0,
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

// DOM Elements
const creditsDisplay = document.getElementById('credits');
const forcePointsDisplay = document.getElementById('forcePoints');
const playerLevelDisplay = document.getElementById('playerLevel');
const cpsDisplay = document.getElementById('cps');
const lightsaber = document.getElementById('lightsaber');
const clickEffect = document.getElementById('click-effect');
const upgradesList = document.getElementById('upgrades-list');
const achievementsGrid = document.getElementById('achievements-grid');
const notification = document.getElementById('notification');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const createClanBtn = document.getElementById('create-clan-btn');
const clanCreationSection = document.getElementById('clan-creation');
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

// Initialize the game
function initGame() {
    loadGame();
    setupTabs();
    renderUpgrades();
    renderAchievements();
    updateBossesUI();
    setupClanUI();
    setupClicker();
    startPassiveIncome();
    checkDailyReward();
    
    // Update UI
    updateUI();
}

// Setup tab navigation
function setupTabs() {
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Hide all tabs
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Deactivate all buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Show selected tab
            document.getElementById(tabId).classList.add('active');
            button.classList.add('active');
        });
    });
}

// Setup clicker functionality
function setupClicker() {
    lightsaber.addEventListener('click', (e) => {
        // Calculate click position
        const rect = lightsaber.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Position click effect
        clickEffect.style.left = `${x - 25}px`;
        clickEffect.style.top = `${y - 25}px`;
        
        // Animate click effect
        clickEffect.style.opacity = '1';
        clickEffect.style.transform = 'scale(0)';
        setTimeout(() => {
            clickEffect.style.opacity = '0';
            clickEffect.style.transform = 'scale(2)';
        }, 10);
        
        // Add credits
        const creditsEarned = 1 + Math.floor(gameState.level / 5);
        gameState.credits += creditsEarned;
        gameState.clickCount++;
        
        // Chance to get force points (1%)
        if (Math.random() < 0.01) {
            gameState.forcePoints++;
            showNotification(`+1 Очко Силы!`);
        }
        
        // Add XP
        addXP(1);
        
        // Update UI
        updateUI();
        
        // Check achievements
        checkAchievements();
    });
}

// Start passive income
function startPassiveIncome() {
    setInterval(() => {
        if (gameState.cps > 0) {
            gameState.credits += gameState.cps / 10;
            updateUI();
        }
    }, 100);
}

// Update all UI elements
function updateUI() {
    creditsDisplay.textContent = formatNumber(gameState.credits);
    forcePointsDisplay.textContent = formatNumber(gameState.forcePoints);
    cpsDisplay.textContent = formatNumber(gameState.cps);
    
    // Update player level display
    const levelTitles = [
        "Падаван", "Рыцарь-джедай", "Магистр-джедай", "Член Совета", 
        "Мастер-джедай", "Гранд-мастер", "Избранный", "Ситх", 
        "Лорд ситхов", "Темный лорд"
    ];
    const titleIndex = Math.min(Math.floor(gameState.level / 3), levelTitles.length - 1);
    playerLevelDisplay.textContent = `${levelTitles[titleIndex]} (Ур. ${gameState.level})`;
    
    // Update upgrades UI
    renderUpgrades();
    
    // Update clan UI if in clan
    if (gameState.clan) {
        clanNameDisplay.textContent = gameState.clan.name;
        clanLevelDisplay.textContent = gameState.clan.level;
        clanTreasuryDisplay.textContent = formatNumber(gameState.clan.treasury);
    }
}

// Format large numbers
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return Math.floor(num);
}

// Render upgrades
function renderUpgrades() {
    upgradesList.innerHTML = '';
    
    gameState.upgrades.forEach(upgrade => {
        const cost = Math.floor(upgrade.baseCost * Math.pow(1.15, upgrade.owned));
        const canAfford = gameState.credits >= cost;
        
        const upgradeElement = document.createElement('div');
        upgradeElement.className = 'upgrade';
        upgradeElement.innerHTML = `
            <h3>${upgrade.name}</h3>
            <p>${upgrade.description}</p>
            <p>+${upgrade.cps} кредитов/сек</p>
            <p>Куплено: ${upgrade.owned}</p>
            <p>Стоимость: ${formatNumber(cost)} кредитов</p>
            <button ${!canAfford ? 'disabled' : ''}>Купить</button>
        `;
        
        const button = upgradeElement.querySelector('button');
        button.addEventListener('click', () => {
            buyUpgrade(upgrade.id);
        });
        
        upgradesList.appendChild(upgradeElement);
    });
}

// Buy upgrade
function buyUpgrade(upgradeId) {
    const upgrade = gameState.upgrades.find(u => u.id === upgradeId);
    const cost = Math.floor(upgrade.baseCost * Math.pow(1.15, upgrade.owned));
    
    if (gameState.credits >= cost) {
        gameState.credits -= cost;
        upgrade.owned++;
        
        // Recalculate CPS
        gameState.cps = gameState.upgrades.reduce((total, u) => total + (u.owned * u.cps), 0);
        
        // Add XP
        addXP(5);
        
        // Update UI
        updateUI();
        showNotification(`Куплено: ${upgrade.name}`);
        
        // Check achievements
        checkAchievements();
    }
}

// Render achievements
function renderAchievements() {
    achievementsGrid.innerHTML = '';
    
    gameState.achievements.forEach(achievement => {
        const achieved = achievement.achieved;
        const progress = getAchievementProgress(achievement);
        
        const achievementElement = document.createElement('div');
        achievementElement.className = `achievement ${achieved ? '' : 'locked'}`;
        achievementElement.innerHTML = `
            <img src="achievement_${achievement.id}.png" alt="${achievement.name}">
            <h4>${achievement.name}</h4>
            <p>${achievement.description}</p>
            ${!achieved ? `<p>Прогресс: ${progress}/${achievement.goal}</p>` : ''}
        `;
        
        achievementsGrid.appendChild(achievementElement);
    });
}

// Get achievement progress
function getAchievementProgress(achievement) {
    switch(achievement.id) {
        case 1: case 2: case 3: case 4: case 5:
            return Math.min(gameState.credits, achievement.goal);
        case 6: case 7: case 8: case 9:
            return Math.min(gameState.forcePoints, achievement.goal);
        case 10: case 11: case 12: case 13:
            return Math.min(gameState.level, achievement.goal);
        case 14: case 15: case 16: case 17:
            const ownedUpgrades = gameState.upgrades.reduce((total, u) => total + u.owned, 0);
            return Math.min(ownedUpgrades, achievement.goal);
        case 18:
            return gameState.bosses[0].currentHealth <= 0 ? 1 : 0;
        case 19:
            return gameState.bosses[1].currentHealth <= 0 ? 1 : 0;
        case 20:
            return gameState.bosses[2].currentHealth <= 0 ? 1 : 0;
        case 21:
            return gameState.clan ? 1 : 0;
        case 22: case 23:
            return gameState.clan ? Math.min(gameState.clan.totalDonations, achievement.goal) : 0;
        case 24: case 25:
            return gameState.clan ? Math.min(gameState.clan.level, achievement.goal) : 0;
        case 26: case 27: case 28:
            return Math.min(gameState.consecutiveDays, achievement.goal);
        case 29: case 30:
            return Math.min(gameState.clickCount, achievement.goal);
        default:
            return 0;
    }
}

// Check achievements
function checkAchievements() {
    let newAchievements = 0;
    
    gameState.achievements.forEach(achievement => {
        if (!achievement.achieved) {
            const progress = getAchievementProgress(achievement);
            if (progress >= achievement.goal) {
                achievement.achieved = true;
                gameState.credits += achievement.reward;
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

// Add XP
function addXP(amount) {
    gameState.xp += amount;
    
    // Check for level up
    while (gameState.xp >= gameState.xpToNextLevel) {
        gameState.xp -= gameState.xpToNextLevel;
        gameState.level++;
        gameState.xpToNextLevel = Math.floor(gameState.xpToNextLevel * 1.2);
        showNotification(`Уровень повышен! Теперь вы ${playerLevelDisplay.textContent}`);
    }
}

// Update bosses UI
function updateBossesUI() {
    gameState.bosses.forEach(boss => {
        const bossElement = document.getElementById(`boss-${boss.id}`);
        if (bossElement) {
            const healthBar = bossElement.querySelector('.health-bar');
            const healthPercent = (boss.currentHealth / boss.maxHealth) * 100;
            healthBar.style.width = `${healthPercent}%`;
            
            const attackBtn = bossElement.querySelector('.attack-btn');
            attackBtn.textContent = `Атаковать (${boss.forceCost} ОС)`;
            attackBtn.disabled = gameState.forcePoints < boss.forceCost || boss.currentHealth <= 0;
            
            attackBtn.onclick = () => attackBoss(boss.id);
        }
    });
}

// Attack boss
function attackBoss(bossId) {
    const boss = gameState.bosses.find(b => b.id === bossId);
    
    if (gameState.forcePoints >= boss.forceCost && boss.currentHealth > 0) {
        gameState.forcePoints -= boss.forceCost;
        
        // Damage calculation based on player level
        const damage = 50 + (gameState.level * 5);
        boss.currentHealth = Math.max(0, boss.currentHealth - damage);
        
        // Check if boss defeated
        if (boss.currentHealth <= 0) {
            gameState.credits += boss.reward;
            showNotification(`Босс побежден! +${boss.reward} кредитов`);
            
            // Add XP
            addXP(20);
        }
        
        // Update UI
        updateUI();
        updateBossesUI();
        checkAchievements();
    }
}

// Setup clan UI
function setupClanUI() {
    if (gameState.clan) {
        noClanSection.style.display = 'none';
        hasClanSection.style.display = 'block';
        
        // Update clan members list
        clanMembersList.innerHTML = '';
        gameState.clan.members.forEach(member => {
            const li = document.createElement('li');
            li.textContent = member;
            clanMembersList.appendChild(li);
        });
    } else {
        noClanSection.style.display = 'block';
        hasClanSection.style.display = 'none';
    }
    
    // Clan creation
    createClanBtn.addEventListener('click', () => {
        if (gameState.credits >= 5000) {
            clanCreationSection.style.display = 'block';
        } else {
            showNotification('Недостаточно кредитов (нужно 5,000)');
        }
    });
    
    confirmClanBtn.addEventListener('click', () => {
        const clanName = clanNameInput.value.trim();
        if (clanName.length >= 3 && clanName.length <= 20) {
            gameState.credits -= 5000;
            gameState.clan = {
                name: clanName,
                level: 1,
                treasury: 0,
                totalDonations: 0,
                members: ['Вы']
            };
            
            clanCreationSection.style.display = 'none';
            clanNameInput.value = '';
            setupClanUI();
            updateUI();
            showNotification(`Клан "${clanName}" создан!`);
            
            // Add XP
            addXP(10);
            
            // Check achievements
            checkAchievements();
        } else {
            showNotification('Название клана должно быть от 3 до 20 символов');
        }
    });
    
    // Donations
    donateBtn.addEventListener('click', () => {
        const amount = parseInt(donationAmountInput.value);
        if (amount >= 1000 && gameState.credits >= amount) {
            gameState.credits -= amount;
            gameState.clan.treasury += amount;
            gameState.clan.totalDonations += amount;
            
            // Check for clan level up (10,000 credits per level)
            const levelsGained = Math.floor(gameState.clan.treasury / 10000) - (gameState.clan.level - 1);
            if (levelsGained > 0) {
                gameState.clan.level += levelsGained;
                showNotification(`Клан повышен до уровня ${gameState.clan.level}!`);
            }
            
            updateUI();
            showNotification(`Пожертвовано ${amount} кредитов в клан`);
            
            // Add XP
            addXP(2);
            
            // Check achievements
            checkAchievements();
        } else {
            showNotification('Минимальное пожертвование - 1,000 кредитов');
        }
    });
}

// Show notification
function showNotification(message) {
    notification.textContent = message;
    notification.style.opacity = '1';
    
    setTimeout(() => {
        notification.style.opacity = '0';
    }, 3000);
}

// Check daily reward
function checkDailyReward() {
    const today = new Date().toDateString();
    
    if (gameState.lastPlayDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (gameState.lastPlayDate === yesterday.toDateString()) {
            gameState.consecutiveDays++;
        } else if (gameState.lastPlayDate !== today) {
            gameState.consecutiveDays = 1;
        }
        
        gameState.lastPlayDate = today;
        
        // Calculate reward (100 * 1.1^consecutiveDays)
        const reward = Math.floor(100 * Math.pow(1.1, gameState.consecutiveDays - 1));
        gameState.credits += reward;
        
        showNotification(`Ежедневная награда: ${reward} кредитов (День ${gameState.consecutiveDays})`);
        updateUI();
        checkAchievements();
    }
}

// Save game
function saveGame() {
    localStorage.setItem('starWarsClicker', JSON.stringify(gameState));
}

// Load game
function loadGame() {
    const savedGame = localStorage.getItem('starWarsClicker');
    if (savedGame) {
        const parsed = JSON.parse(savedGame);
        Object.assign(gameState, parsed);
        
        // Recalculate CPS in case the formula changed
        gameState.cps = gameState.upgrades.reduce((total, u) => total + (u.owned * u.cps), 0);
    }
}

// Auto-save every 30 seconds
setInterval(saveGame, 30000);

// Save on page unload
window.addEventListener('beforeunload', saveGame);

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', initGame);
