// Состояние игры
const gameState = {
    credits: 0,
    forcePoints: 0,
    clickPower: 1,
    creditsPerSecond: 0,
    level: 1,
    totalClicks: 0,
    levelNames: ['Падаван', 'Рыцарь-Джедай', 'Магистр-Джедай', 'Член Совета', 'Верховный Магистр'],
    upgrades: [
        { id: 1, name: 'Дроид-помощник', description: 'Дроид R2 помогает собирать кредиты', baseCost: 15, power: 0.1, owned: 0, icon: 'fa-robot' },
        { id: 2, name: 'Генератор кредитов', description: 'Пассивный доход', baseCost: 100, power: 1, owned: 0, icon: 'fa-coins' },
        { id: 3, name: 'Улучшение меча', description: 'Увеличивает силу клика', baseCost: 50, power: 1, owned: 0, icon: 'fa-sword' },
        { id: 4, name: 'Флот X-Wing', description: 'Зарабатывайте на миссиях', baseCost: 500, power: 5, owned: 0, icon: 'fa-space-shuttle' },
        { id: 5, name: 'Тренировка Силы', description: 'Увеличивает весь доход', baseCost: 1000, power: 2, owned: 0, multiplier: true, icon: 'fa-jedi' },
        { id: 6, name: 'Планы Звезды Смерти', description: 'Секретные данные Империи', baseCost: 5000, power: 10, owned: 0, icon: 'fa-space-station' },
        { id: 7, name: 'Кристалл Кайбера', description: 'Усиливает все способности', baseCost: 10000, power: 5, owned: 0, multiplier: true, icon: 'fa-gem' }
    ],
    bosses: [
        { id: 1, name: 'Дарт Мол', health: 1000, reward: 5000, forcePointReward: 5, defeated: false, icon: 'fa-user-injured' },
        { id: 2, name: 'Дарт Вейдер', health: 5000, reward: 25000, forcePointReward: 25, defeated: false, icon: 'fa-mask' },
        { id: 3, name: 'Император Палпатин', health: 25000, reward: 100000, forcePointReward: 100, defeated: false, icon: 'fa-crown' },
        { id: 4, name: 'Кайло Рен', health: 15000, reward: 75000, forcePointReward: 50, defeated: false, icon: 'fa-helmet-battle' }
    ],
    currentBoss: null,
    bossHealth: 0,
    clan: null,
    clans: [
        { id: 1, name: 'Альянс Повстанцев', level: 5, members: ['Игрок1', 'Игрок2'], treasury: 15000, created: Date.now() },
        { id: 2, name: 'Орден Джедаев', level: 3, members: ['Игрок3'], treasury: 5000, created: Date.now() }
    ],
    dailyReward: {
        lastClaimed: null,
        streak: 0,
        nextReward: 100
    },
    achievements: [
        { id: 1, name: 'Первые шаги', description: 'Заработайте 100 кредитов', reward: 10, target: 100, progress: 0, unlocked: false, icon: 'fa-footsteps' },
        { id: 2, name: 'Падаван', description: 'Достигните 2 уровня', reward: 20, target: 1, progress: 0, unlocked: false, icon: 'fa-jedi' },
        { id: 3, name: 'Коллекционер дроидов', description: 'Купите 10 дроидов', reward: 50, target: 10, progress: 0, unlocked: false, icon: 'fa-robot' },
        { id: 4, name: 'Победа над Молом', description: 'Победите Дарт Мола', reward: 100, target: 1, progress: 0, unlocked: false, icon: 'fa-trophy' },
        { id: 5, name: 'Ветеран', description: 'Достигните 5 уровня', reward: 200, target: 5, progress: 0, unlocked: false, icon: 'fa-medal' },
        { id: 6, name: 'Миллионер', description: 'Заработайте 1,000,000 кредитов', reward: 500, target: 1000000, progress: 0, unlocked: false, icon: 'fa-money-bill-wave' },
        { id: 7, name: 'Мастер строительства', description: 'Приобретите 50 улучшений', reward: 300, target: 50, progress: 0, unlocked: false, icon: 'fa-tools' },
        { id: 8, name: 'Крах Вейдера', description: 'Победите Дарт Вейдера', reward: 400, target: 1, progress: 0, unlocked: false, icon: 'fa-helmet-battle' },
        { id: 9, name: 'Легендарный', description: 'Достигните 10 уровня', reward: 1000, target: 10, progress: 0, unlocked: false, icon: 'fa-crown' },
        { id: 10, name: 'Лидер клана', description: 'Создайте или вступите в клан', reward: 150, target: 1, progress: 0, unlocked: false, icon: 'fa-users' },
        { id: 11, name: 'Щедрость', description: 'Пожертвуйте 10,000 кредитов клану', reward: 200, target: 10000, progress: 0, unlocked: false, icon: 'fa-hand-holding-heart' },
        { id: 12, name: 'Ежедневный воин', description: 'Получите 7 ежедневных наград', reward: 250, target: 7, progress: 0, unlocked: false, icon: 'fa-calendar-check' },
        { id: 13, name: 'Конец Императора', description: 'Победите Императора Палпатина', reward: 800, target: 1, progress: 0, unlocked: false, icon: 'fa-skull' },
        { id: 14, name: 'Галактический герой', description: 'Выполните 10 достижений', reward: 500, target: 10, progress: 0, unlocked: false, icon: 'fa-trophy' },
        { id: 15, name: 'Сила сильна', description: 'Соберите 100 Очков Силы', reward: 1000, target: 100, progress: 0, unlocked: false, icon: 'fa-bolt' }
    ],
    event: {
        active: false,
        name: '',
        effect: '',
        endTime: null
    }
};

// DOM элементы
const elements = {
    credits: document.getElementById('credits'),
    forcePoints: document.getElementById('force-points'),
    level: document.getElementById('level'),
    clanInfo: document.getElementById('clan-info'),
    cps: document.getElementById('cps'),
    clicks: document.getElementById('clicks'),
    clickPower: document.getElementById('click-power-display'),
    lightsaber: document.getElementById('lightsaber'),
    clickEffect: document.getElementById('click-effect'),
    upgradesContainer: document.getElementById('upgrades-container'),
    bossesContainer: document.getElementById('bosses-container'),
    achievementsContainer: document.getElementById('achievements-container'),
    dailyRewardButton: document.getElementById('daily-reward-button'),
    dailyStreak: document.getElementById('daily-streak'),
    clanNameInput: document.getElementById('clan-name-input'),
    createClanBtn: document.getElementById('create-clan-btn'),
    joinClanBtn: document.getElementById('join-clan-btn'),
    leaveClanBtn: document.getElementById('leave-clan-btn'),
    currentClanName: document.getElementById('current-clan-name'),
    clanMembers: document.getElementById('clan-members'),
    clanTreasury: document.getElementById('clan-treasury'),
    donateBtn: document.getElementById('donate-btn'),
    clanLeaderboard: document.getElementById('clan-leaderboard-body'),
    achievementsCompleted: document.getElementById('achievements-completed'),
    achievementsProgress: document.getElementById('achievements-progress'),
    eventBanner: document.getElementById('event-banner'),
    notificationContainer: document.getElementById('notification-container')
};

// Переменные для двойного нажатия
let lastClickTime = 0;
const doubleClickDelay = 300;

// Инициализация игры
function initGame() {
    loadGame();
    setupEventListeners();
    renderAll();
    startGameLoop();
    checkDailyReward();
    checkEvent();
}

// Игровой цикл
function startGameLoop() {
    setInterval(() => {
        let income = gameState.creditsPerSecond / 10;
        if (gameState.event.active && gameState.event.effect === 'double_credits') {
            income *= 2;
        }
        
        gameState.credits += income;
        updateDisplays();
        saveGame();
    }, 100);
}

// Обработчики событий
function setupEventListeners() {
    // Двойное нажатие на меч
    elements.lightsaber.addEventListener('click', (e) => {
        const currentTime = new Date().getTime();
        if (currentTime - lastClickTime < doubleClickDelay) {
            handleClick();
            lastClickTime = 0;
        } else {
            lastClickTime = currentTime;
        }
    });
    
    // Обычные клики для других элементов
    elements.dailyRewardButton.addEventListener('click', claimDailyReward);
    elements.createClanBtn.addEventListener('click', createClan);
    elements.joinClanBtn.addEventListener('click', joinClan);
    elements.leaveClanBtn.addEventListener('click', leaveClan);
    elements.donateBtn.addEventListener('click', donateToClan);
    
    // Переключение вкладок
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            
            document.getElementById(`${tabName}-tab`).classList.add('active');
            this.classList.add('active');
        });
    });
    
    // Динамические обработчики
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('fight-boss')) {
            const bossId = parseInt(e.target.dataset.bossId);
            fightBoss(bossId);
        }
        
        if (e.target.classList.contains('buy-upgrade')) {
            const upgradeId = parseInt(e.target.dataset.upgradeId);
            buyUpgrade(upgradeId);
        }
    });
}

// Обработчик клика
function handleClick() {
    let power = gameState.clickPower;
    if (gameState.event.active && gameState.event.effect === 'double_click') {
        power *= 2;
    }
    
    gameState.credits += power;
    gameState.totalClicks++;
    
    // Показываем силу клика
    elements.clickPower.textContent = `+${power}`;
    elements.clickPower.style.opacity = '1';
    setTimeout(() => {
        elements.clickPower.style.opacity = '0';
    }, 50);
    
    // Эффект клика
    elements.clickEffect.style.animation = 'none';
    void elements.clickEffect.offsetWidth;
    elements.clickEffect.style.animation = 'saberGlow 0.5s forwards';
    
    // Шанс получить Очко Силы
    if (Math.random() < 0.01) {
        gameState.forcePoints += 1;
        checkAchievementProgress(15);
    }
    
    // Проверка достижений
    if (gameState.credits >= 100 && !gameState.achievements[0].unlocked) {
        checkAchievementProgress(1);
    }
    
    updateDisplays();
    saveGame();
}

// Покупка улучшений
function buyUpgrade(upgradeId) {
    const upgrade = gameState.upgrades.find(u => u.id === upgradeId);
    const cost = upgrade.baseCost * Math.pow(1.15, upgrade.owned);
    
    if (gameState.credits >= cost) {
        gameState.credits -= cost;
        upgrade.owned += 1;
        
        if (upgrade.multiplier) {
            gameState.upgrades.forEach(u => {
                if (u.id !== upgradeId) {
                    u.power *= 1.5;
                }
            });
        } else if (upgrade.id === 3) {
            gameState.clickPower += upgrade.power;
        } else {
            gameState.creditsPerSecond += upgrade.power;
        }
        
        if (upgrade.id === 1) checkAchievementProgress(3);
        checkAchievementProgress(7);
        
        checkLevelUp();
        updateDisplays();
        renderUpgrades();
        saveGame();
    }
}

// Битвы с боссами
function startBossBattle(bossId) {
    const boss = gameState.bosses.find(b => b.id === bossId);
    if (boss && !boss.defeated) {
        gameState.currentBoss = boss;
        gameState.bossHealth = boss.health;
        updateDisplays();
    }
}

function fightBoss(bossId) {
    const boss = gameState.bosses.find(b => b.id === bossId);
    if (!boss || boss.defeated) return;
    
    const damage = gameState.clickPower * (0.8 + Math.random() * 0.4);
    gameState.bossHealth -= damage;
    
    if (gameState.bossHealth <= 0) {
        boss.defeated = true;
        gameState.credits += boss.reward;
        gameState.forcePoints += boss.forcePointReward;
        gameState.currentBoss = null;
        
        if (boss.id === 1) checkAchievementProgress(4);
        if (boss.id === 2) checkAchievementProgress(8);
        if (boss.id === 3) checkAchievementProgress(13);
        
        checkLevelUp();
        showNotification(`Вы победили ${boss.name}!`, `Награда: ${boss.reward} кредитов и ${boss.forcePointReward} Очков Силы`);
    }
    
    updateDisplays();
    renderBosses();
    saveGame();
}

// Клан система
function createClan() {
    const clanName = elements.clanNameInput.value.trim();
    if (!clanName) {
        showNotification('Ошибка', 'Введите название клана');
        return;
    }
    
    if (gameState.credits < 5000) {
        showNotification('Ошибка', 'Необходимо 5000 кредитов для создания клана');
        return;
    }
    
    if (gameState.clan) {
        showNotification('Ошибка', 'Вы уже состоите в клане');
        return;
    }
    
    const newClan = {
        id: gameState.clans.length + 1,
        name: clanName,
        level: 1,
        members: ['Игрок'],
        treasury: 0,
        created: Date.now()
    };
    
    gameState.clans.push(newClan);
    gameState.clan = newClan.id;
    gameState.credits -= 5000;
    
    checkAchievementProgress(10);
    
    showNotification('Клан создан', `Добро пожаловать в ${clanName}!`);
    updateDisplays();
    renderClanTab();
    saveGame();
}

function joinClan() {
    if (gameState.clan) {
        showNotification('Ошибка', 'Вы уже состоите в клане');
        return;
    }
    
    if (gameState.clans.length === 0) {
        showNotification('Ошибка', 'Нет доступных кланов');
        return;
    }
    
    const clanToJoin = gameState.clans[0];
    clanToJoin.members.push('Игрок');
    gameState.clan = clanToJoin.id;
    
    checkAchievementProgress(10);
    
    showNotification('Вы в клане', `Добро пожаловать в ${clanToJoin.name}!`);
    updateDisplays();
    renderClanTab();
    saveGame();
}

function leaveClan() {
    if (!gameState.clan) {
        showNotification('Ошибка', 'Вы не состоите в клане');
        return;
    }
    
    const clan = gameState.clans.find(c => c.id === gameState.clan);
    if (clan) {
        clan.members = clan.members.filter(m => m !== 'Игрок');
        if (clan.members.length === 0) {
            gameState.clans = gameState.clans.filter(c => c.id !== gameState.clan);
        }
    }
    
    gameState.clan = null;
    showNotification('Вы вышли', 'Вы покинули клан');
    updateDisplays();
    renderClanTab();
    saveGame();
}

function donateToClan() {
    if (!gameState.clan) {
        showNotification('Ошибка', 'Вы не состоите в клане');
        return;
    }
    
    if (gameState.credits < 1000) {
        showNotification('Ошибка', 'Необходимо минимум 1000 кредитов');
        return;
    }
    
    const clan = gameState.clans.find(c => c.id === gameState.clan);
    if (clan) {
        gameState.credits -= 1000;
        clan.treasury += 1000;
        
        checkAchievementProgress(11);
        
        const newLevel = Math.floor(Math.log10(clan.treasury + 1)) + 1;
        if (newLevel > clan.level) {
            clan.level = newLevel;
            showNotification('Уровень клана', `${clan.name} теперь ${newLevel} уровня!`);
        }
        
        showNotification('Успешно', 'Спасибо за пожертвование!');
        updateDisplays();
        renderClanTab();
        saveGame();
    }
}

// Ежедневные награды
function checkDailyReward() {
    const now = new Date();
    const lastClaimed = gameState.dailyReward.lastClaimed ? new Date(gameState.dailyReward.lastClaimed) : null;
    
    if (lastClaimed) {
        const daysPassed = Math.floor((now - lastClaimed) / (1000 * 60 * 60 * 24));
        if (daysPassed > 1) {
            gameState.dailyReward.streak = 0;
        }
    }
    
    if (lastClaimed) {
        const sameDay = now.getDate() === lastClaimed.getDate() && 
                       now.getMonth() === lastClaimed.getMonth() && 
                       now.getFullYear() === lastClaimed.getFullYear();
        
        if (sameDay) {
            elements.dailyRewardButton.disabled = true;
        }
    }
    
    elements.dailyStreak.textContent = `Серия: ${gameState.dailyReward.streak} дней`;
}

function claimDailyReward() {
    const now = new Date();
    const lastClaimed = gameState.dailyReward.lastClaimed ? new Date(gameState.dailyReward.lastClaimed) : null;
    
    if (lastClaimed) {
        const sameDay = now.getDate() === lastClaimed.getDate() && 
                       now.getMonth() === lastClaimed.getMonth() && 
                       now.getFullYear() === lastClaimed.getFullYear();
        
        if (sameDay) {
            showNotification('Уже получено', 'Возвращайтесь завтра!');
            return;
        }
        
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        
        const consecutive = yesterday.getDate() === lastClaimed.getDate() && 
                           yesterday.getMonth() === lastClaimed.getMonth() && 
                           yesterday.getFullYear() === lastClaimed.getFullYear();
        
        if (consecutive) {
            gameState.dailyReward.streak += 1;
        } else {
            gameState.dailyReward.streak = 1;
        }
    } else {
        gameState.dailyReward.streak = 1;
    }
    
    const reward = gameState.dailyReward.nextReward * (1 + gameState.dailyReward.streak * 0.2);
    gameState.credits += reward;
    gameState.dailyReward.lastClaimed = now.toISOString();
    gameState.dailyReward.nextReward = Math.floor(reward * 1.1);
    
    checkAchievementProgress(12);
    
    showNotification('Награда получена!', `Вы получили ${Math.floor(reward)} кредитов! Серия: ${gameState.dailyReward.streak}`);
    elements.dailyRewardButton.disabled = true;
    elements.dailyStreak.textContent = `Серия: ${gameState.dailyReward.streak} дней`;
    saveGame();
}

// События
function checkEvent() {
    if (!gameState.event.active && Math.random() < 0.2) {
        const events = [
            { name: 'Войны Клонов', effect: 'double_credits', duration: 24 * 60 * 60 * 1000 },
            { name: 'Тренировка Джедаев', effect: 'double_click', duration: 12 * 60 * 60 * 1000 }
        ];
        
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        gameState.event = {
            active: true,
            name: randomEvent.name,
            effect: randomEvent.effect,
            endTime: Date.now() + randomEvent.duration
        };
        
        showNotification('Событие!', `Началось событие "${randomEvent.name}"!`);
    } else if (gameState.event.active && Date.now() > gameState.event.endTime) {
        showNotification('Событие завершено', `"${gameState.event.name}" закончилось.`);
        gameState.event.active = false;
    }
    
    if (gameState.event.active) {
        elements.eventBanner.style.display = 'block';
        elements.eventBanner.querySelector('h3').textContent = `Событие: ${gameState.event.name}`;
        
        let effectText = '';
        if (gameState.event.effect === 'double_credits') {
            effectText = 'Двойные кредиты!';
        } else if (gameState.event.effect === 'double_click') {
            effectText = 'Двойная сила клика!';
        }
        
        elements.eventBanner.querySelector('p').textContent = effectText;
    } else {
        elements.eventBanner.style.display = 'none';
    }
}

// Достижения
function checkAchievementProgress(achievementId) {
    const achievement = gameState.achievements.find(a => a.id === achievementId);
    if (!achievement || achievement.unlocked) return;
    
    switch(achievementId) {
        case 1: achievement.progress = Math.min(gameState.credits, achievement.target); break;
        case 2: achievement.progress = gameState.level >= achievement.target ? 1 : 0; break;
        case 3: 
            const droidUpgrade = gameState.upgrades.find(u => u.id === 1);
            achievement.progress = Math.min(droidUpgrade.owned, achievement.target);
            break;
        case 4: achievement.progress = gameState.bosses[0].defeated ? 1 : 0; break;
        case 5: achievement.progress = gameState.level >= achievement.target ? 1 : 0; break;
        case 6: achievement.progress = Math.min(gameState.credits, achievement.target); break;
        case 7: 
            const totalUpgrades = gameState.upgrades.reduce((sum, u) => sum + u.owned, 0);
            achievement.progress = Math.min(totalUpgrades, achievement.target);
            break;
        case 8: achievement.progress = gameState.bosses[1].defeated ? 1 : 0; break;
        case 9: achievement.progress = gameState.level >= achievement.target ? 1 : 0; break;
        case 10: achievement.progress = gameState.clan ? 1 : 0; break;
        case 11: achievement.progress = Math.min(1000, achievement.target); break;
        case 12: achievement.progress = Math.min(gameState.dailyReward.streak, achievement.target); break;
        case 13: achievement.progress = gameState.bosses[2].defeated ? 1 : 0; break;
        case 14: 
            const completed = gameState.achievements.filter(a => a.unlocked).length;
            achievement.progress = Math.min(completed, achievement.target);
            break;
        case 15: achievement.progress = Math.min(gameState.forcePoints, achievement.target); break;
    }
    
    if (achievement.progress >= achievement.target) {
        achievement.unlocked = true;
        gameState.credits += achievement.reward;
        
        if (achievementId === 14) {
            checkAchievementProgress(14);
        }
        
        showNotification('Достижение!', `${achievement.name}: ${achievement.reward} кредитов!`);
        renderAchievements();
    }
    
    saveGame();
}

// Уровни
function checkLevelUp() {
    const newLevel = Math.floor(Math.log10(gameState.credits + 1)) + 1;
    if (newLevel > gameState.level) {
        gameState.level = newLevel;
        gameState.forcePoints += 2;
        
        if (newLevel >= 2) checkAchievementProgress(2);
        if (newLevel >= 5) checkAchievementProgress(5);
        if (newLevel >= 10) checkAchievementProgress(9);
        
        showNotification('Новый уровень!', `Теперь вы ${gameState.levelNames[Math.min(gameState.level - 1, gameState.levelNames.length - 1)] || 'Магистр-Джедай'}!`);
    }
}

// Отрисовка интерфейса
function renderAll() {
    renderUpgrades();
    renderBosses();
    renderClanTab();
    renderAchievements();
    updateDisplays();
}

function renderUpgrades() {
    elements.upgradesContainer.innerHTML = '';
    gameState.upgrades.forEach(upgrade => {
        const cost = upgrade.baseCost * Math.pow(1.15, upgrade.owned);
        const upgradeElement = document.createElement('div');
        upgradeElement.className = 'upgrade';
        upgradeElement.innerHTML = `
            <h3><i class="fas ${upgrade.icon}"></i> ${upgrade.name}</h3>
            <p>${upgrade.description}</p>
            <p>Куплено: ${upgrade.owned}</p>
            <p>Эффект: +${upgrade.power.toFixed(1)}</p>
            <p class="upgrade-cost">Цена: ${Math.floor(cost)} кредитов</p>
            <button class="buy-upgrade" data-upgrade-id="${upgrade.id}" 
                    ${gameState.credits < cost ? 'disabled' : ''}>
                Купить
            </button>
        `;
        elements.upgradesContainer.appendChild(upgradeElement);
    });
}

function renderBosses() {
    elements.bossesContainer.innerHTML = '';
    gameState.bosses.forEach(boss => {
        const bossElement = document.createElement('div');
        bossElement.className = `boss ${boss.defeated ? 'defeated' : ''}`;
        
        bossElement.innerHTML = `
            <h3><i class="fas ${boss.icon}"></i> ${boss.name}</h3>
            <div class="boss-health">Здоровье: ${gameState.currentBoss && gameState.currentBoss.id === boss.id ? 
                Math.max(0, gameState.bossHealth) : boss.health}</div>
            <div class="boss-reward">Награда: ${boss.reward} кредитов + ${boss.forcePointReward} Очков Силы</div>
            ${gameState.currentBoss && gameState.currentBoss.id === boss.id ? 
                `<progress value="${gameState.bossHealth}" max="${boss.health}"></progress>` : ''}
            <button class="fight-boss" data-boss-id="${boss.id}" 
                    ${boss.defeated ? 'disabled' : ''}>
                ${gameState.currentBoss && gameState.currentBoss.id === boss.id ? 'АТАКА!' : 'Начать бой'}
            </button>
        `;
        elements.bossesContainer.appendChild(bossElement);
    });
}

function renderClanTab() {
    if (gameState.clan) {
        const clan = gameState.clans.find(c => c.id === gameState.clan);
        if (clan) {
            elements.currentClanName.textContent = clan.name;
            
            elements.clanMembers.innerHTML = '';
            clan.members.forEach(member => {
                const memberElement = document.createElement('div');
                memberElement.className = 'clan-member';
                memberElement.textContent = member;
                elements.clanMembers.appendChild(memberElement);
            });
            
            elements.clanTreasury.innerHTML = `<i class="fas fa-coins"></i> Казна: <span>${clan.treasury}</span> кредитов`;
            
            elements.leaveClanBtn.style.display = 'inline-block';
            elements.joinClanBtn.style.display = 'none';
            elements.createClanBtn.style.display = 'none';
            elements.clanNameInput.style.display = 'none';
        }
    } else {
        elements.currentClanName.textContent = 'Нет';
        elements.clanMembers.innerHTML = '<div class="clan-member">Вступите в клан чтобы увидеть участников</div>';
        elements.clanTreasury.innerHTML = '<i class="fas fa-coins"></i> Казна: <span>0</span> кредитов';
        
        elements.leaveClanBtn.style.display = 'none';
        elements.joinClanBtn.style.display = 'inline-block';
        elements.createClanBtn.style.display = 'inline-block';
        elements.clanNameInput.style.display = 'inline-block';
    }
    
    elements.clanLeaderboard.innerHTML = '';
    const sortedClans = [...gameState.clans].sort((a, b) => {
        if (a.level !== b.level) return b.level - a.level;
        return b.treasury - a.treasury;
    });
    
    sortedClans.forEach((clan, index) => {
        const row = document.createElement('tr');
        if (clan.id === gameState.clan) {
            row.classList.add('your-clan');
        }
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${clan.name}</td>
            <td>${clan.level}</td>
            <td>${clan.members.length}</td>
            <td>${clan.treasury}</td>
        `;
        elements.clanLeaderboard.appendChild(row);
    });
}

function renderAchievements() {
    elements.achievementsContainer.innerHTML = '';
    let completedCount = 0;
    
    gameState.achievements.forEach(achievement => {
        const achievementElement = document.createElement('div');
        achievementElement.className = `achievement ${achievement.unlocked ? 'unlocked' : ''}`;
        
        const progressPercent = (achievement.progress / achievement.target) * 100;
        
        achievementElement.innerHTML = `
            <div class="achievement-icon">
                <i class="fas ${achievement.icon}"></i>
            </div>
            <div class="achievement-info">
                <h4>${achievement.name}</h4>
                <p>${achievement.description}</p>
                <p class="achievement-reward">Награда: ${achievement.reward} кредитов</p>
                ${!achievement.unlocked ? `
                    <div class="achievement-progress">
                        <div class="achievement-progress-bar" style="width: ${progressPercent}%"></div>
                    </div>
                    <small>${Math.min(achievement.progress, achievement.target)}/${achievement.target}</small>
                ` : ''}
            </div>
        `;
        
        elements.achievementsContainer.appendChild(achievementElement);
        if (achievement.unlocked) completedCount++;
    });
    
    elements.achievementsCompleted.textContent = completedCount;
    elements.achievementsProgress.style.width = `${(completedCount / gameState.achievements.length) * 100}%`;
}

function updateDisplays() {
    elements.credits.innerHTML = `<i class="fas fa-coins"></i> Кредиты: <span>${Math.floor(gameState.credits)}</span>`;
    elements.forcePoints.innerHTML = `<i class="fas fa-bolt"></i> Очки Силы: <span>${gameState.forcePoints}</span>`;
    elements.cps.innerHTML = `<i class="fas fa-tachometer-alt"></i> Кредитов/сек: <span>${gameState.creditsPerSecond.toFixed(1)}</span>`;
    elements.clicks.innerHTML = `<i class="fas fa-mouse-pointer"></i> Всего кликов: <span>${gameState.totalClicks}</span>`;
    
    const levelName = gameState.levelNames[Math.min(gameState.level - 1, gameState.levelNames.length - 1)] || 'Магистр-Джедай';
    elements.level.innerHTML = `<i class="fas fa-level-up-alt"></i> Уровень: <span>${levelName} (${gameState.level})</span>`;
    
    if (gameState.clan) {
        const clan = gameState.clans.find(c => c.id === gameState.clan);
        if (clan) {
            elements.clanInfo.textContent = `Клан: ${clan.name} (Ур. ${clan.level})`;
        }
    } else {
        elements.clanInfo.textContent = 'Клан: Нет';
    }
}

// Уведомления
function showNotification(title, message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <strong>${title}</strong>
        <p>${message}</p>
    `;
    
    elements.notificationContainer.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3500);
}

// Сохранение/загрузка
function saveGame() {
    localStorage.setItem('swClickerSave', JSON.stringify(gameState));
}

function loadGame() {
    const save = localStorage.getItem('swClickerSave');
    if (save) {
        const savedData = JSON.parse(save);
        Object.assign(gameState, savedData);
    }
}

// Запуск игры
window.onload = initGame;
