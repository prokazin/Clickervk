// Состояние игры
const gameState = {
    credits: 0,
    forcePoints: 0,
    clickPower: 1,
    creditsPerSecond: 0,
    level: 1,
    totalClicks: 0,
    upgrades: [
        { id: 1, name: 'Дроид', cost: 15, power: 0.1, owned: 0, icon: 'fa-robot' },
        { id: 2, name: 'Генератор', cost: 100, power: 1, owned: 0, icon: 'fa-bolt' },
        { id: 3, name: 'Меч', cost: 50, power: 1, owned: 0, icon: 'fa-sword' },
        { id: 4, name: 'Флот', cost: 500, power: 5, owned: 0, icon: 'fa-space-shuttle' },
        { id: 5, name: 'Сила', cost: 1000, power: 2, owned: 0, icon: 'fa-jedi', multiplier: true }
    ],
    bosses: [
        { id: 1, name: 'Дарт Мол', health: 1000, reward: 5000, forceReward: 5, defeated: false, icon: 'fa-user-injured' },
        { id: 2, name: 'Дарт Вейдер', health: 5000, reward: 25000, forceReward: 25, defeated: false, icon: 'fa-mask' }
    ],
    clan: null,
    clans: [],
    dailyReward: {
        lastClaimed: null,
        streak: 0,
        nextReward: 100
    },
    achievements: [
        { id: 1, name: 'Начало', desc: 'Заработать 100 кредитов', target: 100, reward: 10, progress: 0, unlocked: false, icon: 'fa-star' },
        { id: 2, name: 'Улучшения', desc: 'Купить 5 улучшений', target: 5, reward: 20, progress: 0, unlocked: false, icon: 'fa-cogs' },
        { id: 3, name: 'Победитель', desc: 'Победить босса', target: 1, reward: 50, progress: 0, unlocked: false, icon: 'fa-trophy' }
    ]
};

// DOM элементы
const elements = {
    credits: document.querySelector('#credits span'),
    forcePoints: document.querySelector('#force-points span'),
    level: document.querySelector('#level span'),
    lightsaber: document.getElementById('lightsaber'),
    clickEffect: document.getElementById('click-effect'),
    clickPower: document.getElementById('click-power'),
    cps: document.querySelector('#cps span'),
    upgradesContainer: document.getElementById('upgrades-container'),
    bossesContainer: document.getElementById('bosses-container'),
    clanName: document.getElementById('clan-name'),
    clanNameDisplay: document.getElementById('clan-name-display'),
    clanMembers: document.getElementById('clan-members'),
    clanTreasury: document.querySelector('#clan-treasury span'),
    leaderboard: document.getElementById('leaderboard'),
    achieved: document.getElementById('achieved'),
    progress: document.getElementById('progress'),
    achievementsContainer: document.getElementById('achievements-container'),
    notifications: document.getElementById('notifications')
};

// Инициализация игры
function init() {
    loadGame();
    setupEventListeners();
    renderAll();
    startGameLoop();
    checkDailyReward();
}

// Загрузка сохранения
function loadGame() {
    const save = localStorage.getItem('swClickerSave');
    if (save) {
        Object.assign(gameState, JSON.parse(save));
    }
}

// Сохранение игры
function saveGame() {
    localStorage.setItem('swClickerSave', JSON.stringify(gameState));
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Клик по мечу
    elements.lightsaber.addEventListener('click', handleClick);
    
    // Кнопка ежедневной награды
    document.getElementById('daily-reward-btn').addEventListener('click', claimDailyReward);
    
    // Кнопки клана
    document.getElementById('create-clan').addEventListener('click', createClan);
    document.getElementById('join-clan').addEventListener('click', joinClan);
    document.getElementById('donate-btn').addEventListener('click', donateToClan);
    
    // Переключение вкладок
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.dataset.tab;
            switchTab(tab);
        });
    });
    
    // Динамические обработчики
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('buy-upgrade') || e.target.closest('.buy-upgrade')) {
            const button = e.target.classList.contains('buy-upgrade') ? e.target : e.target.closest('.buy-upgrade');
            const id = parseInt(button.dataset.id);
            buyUpgrade(id);
        }
        
        if (e.target.classList.contains('fight-boss') || e.target.closest('.fight-boss')) {
            const button = e.target.classList.contains('fight-boss') ? e.target : e.target.closest('.fight-boss');
            const id = parseInt(button.dataset.id);
            fightBoss(id);
        }
    });
}

// Игровой цикл
function startGameLoop() {
    setInterval(() => {
        gameState.credits += gameState.creditsPerSecond / 10;
        updateDisplays();
        saveGame();
    }, 100);
}

// Обработка клика
function handleClick() {
    gameState.credits += gameState.clickPower;
    gameState.totalClicks++;
    
    // Эффект клика
    elements.clickEffect.style.animation = 'none';
    void elements.clickEffect.offsetWidth;
    elements.clickEffect.style.animation = 'clickEffect 0.5s';
    
    // Показать силу клика
    elements.clickPower.textContent = `+${gameState.clickPower}`;
    elements.clickPower.style.opacity = '1';
    elements.clickPower.style.animation = 'floatUp 0.5s forwards';
    
    // Шанс получить Очко Силы
    if (Math.random() < 0.01) {
        gameState.forcePoints += 1;
    }
    
    // Проверка достижений
    checkAchievements();
    
    updateDisplays();
    saveGame();
}

// Покупка улучшения
function buyUpgrade(id) {
    const upgrade = gameState.upgrades.find(u => u.id === id);
    const cost = upgrade.cost * Math.pow(1.15, upgrade.owned);
    
    if (gameState.credits >= cost) {
        gameState.credits -= cost;
        upgrade.owned++;
        
        if (upgrade.multiplier) {
            gameState.upgrades.forEach(u => {
                if (u.id !== id) u.power *= 1.5;
            });
        } else {
            gameState.creditsPerSecond += upgrade.power;
        }
        
        renderUpgrades();
        updateDisplays();
        saveGame();
    }
}

// Битва с боссом
function fightBoss(id) {
    const boss = gameState.bosses.find(b => b.id === id);
    if (!boss || boss.defeated) return;
    
    const damage = gameState.clickPower * (0.8 + Math.random() * 0.4);
    boss.health -= damage;
    
    if (boss.health <= 0) {
        boss.defeated = true;
        gameState.credits += boss.reward;
        gameState.forcePoints += boss.forceReward;
        showNotification(`Победа!`, `Вы победили ${boss.name} и получили ${boss.reward} кредитов`);
    }
    
    renderBosses();
    updateDisplays();
    saveGame();
}

// Создание клана
function createClan() {
    const name = elements.clanName.value.trim();
    if (!name) return;
    
    if (gameState.credits < 5000) {
        showNotification('Ошибка', 'Нужно 5000 кредитов');
        return;
    }
    
    gameState.clan = {
        name,
        members: ['Вы'],
        treasury: 0,
        level: 1
    };
    
    gameState.credits -= 5000;
    renderClanTab();
    updateDisplays();
    saveGame();
}

// Вступление в клан
function joinClan() {
    if (gameState.clans.length === 0) {
        showNotification('Ошибка', 'Нет доступных кланов');
        return;
    }
    
    gameState.clan = gameState.clans[0];
    gameState.clan.members.push('Вы');
    renderClanTab();
    saveGame();
}

// Пожертвование в клан
function donateToClan() {
    if (gameState.credits < 1000) return;
    
    gameState.credits -= 1000;
    gameState.clan.treasury += 1000;
    
    // Повышение уровня клана
    const newLevel = Math.floor(Math.log10(gameState.clan.treasury + 1)) + 1;
    if (newLevel > gameState.clan.level) {
        gameState.clan.level = newLevel;
    }
    
    renderClanTab();
    updateDisplays();
    saveGame();
}

// Ежедневная награда
function claimDailyReward() {
    const now = new Date();
    const lastClaimed = gameState.dailyReward.lastClaimed ? new Date(gameState.dailyReward.lastClaimed) : null;
    
    // Проверка, можно ли получить награду
    if (lastClaimed) {
        const sameDay = now.toDateString() === lastClaimed.toDateString();
        if (sameDay) return;
    }
    
    // Расчет награды
    const reward = gameState.dailyReward.nextReward;
    gameState.credits += reward;
    gameState.dailyReward.streak++;
    gameState.dailyReward.nextReward = Math.floor(reward * 1.1);
    gameState.dailyReward.lastClaimed = now.toISOString();
    
    showNotification('Ежедневная награда', `Вы получили ${reward} кредитов!`);
    updateDisplays();
    saveGame();
}

// Проверка ежедневной награды
function checkDailyReward() {
    const now = new Date();
    const lastClaimed = gameState.dailyReward.lastClaimed ? new Date(gameState.dailyReward.lastClaimed) : null;
    
    if (lastClaimed) {
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (now.toDateString() === lastClaimed.toDateString()) {
            document.getElementById('daily-reward-btn').disabled = true;
        } else if (yesterday.toDateString() !== lastClaimed.toDateString()) {
            gameState.dailyReward.streak = 0;
        }
    }
}

// Проверка достижений
function checkAchievements() {
    gameState.achievements.forEach(ach => {
        if (ach.unlocked) return;
        
        switch(ach.id) {
            case 1: ach.progress = Math.min(gameState.credits, ach.target); break;
            case 2: ach.progress = gameState.upgrades.reduce((sum, u) => sum + u.owned, 0); break;
            case 3: ach.progress = gameState.bosses.filter(b => b.defeated).length; break;
        }
        
        if (ach.progress >= ach.target) {
            ach.unlocked = true;
            gameState.credits += ach.reward;
            showNotification('Достижение', `${ach.name} - ${ach.reward} кредитов`);
        }
    });
    
    renderAchievements();
}

// Переключение вкладок
function switchTab(tab) {
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.toggle('active', content.id === `${tab}-tab`);
    });
}

// Показать уведомление
function showNotification(title, message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `<strong>${title}</strong><p>${message}</p>`;
    
    elements.notifications.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Обновление отображения
function updateDisplays() {
    elements.credits.textContent = Math.floor(gameState.credits);
    elements.forcePoints.textContent = gameState.forcePoints;
    elements.cps.textContent = gameState.creditsPerSecond.toFixed(1);
    
    const levelNames = ['Падаван', 'Рыцарь', 'Магистр', 'Совет', 'Верховный'];
    elements.level.textContent = levelNames[Math.min(gameState.level - 1, levelNames.length - 1)];
}

// Отрисовка улучшений
function renderUpgrades() {
    elements.upgradesContainer.innerHTML = '';
    
    gameState.upgrades.forEach(upgrade => {
        const cost = upgrade.cost * Math.pow(1.15, upgrade.owned);
        const upgradeEl = document.createElement('div');
        upgradeEl.className = 'upgrade';
        upgradeEl.innerHTML = `
            <h3><i class="fas ${upgrade.icon}"></i> ${upgrade.name}</h3>
            <p>Уровень: ${upgrade.owned}</p>
            <p>+${upgrade.power.toFixed(1)} ${upgrade.multiplier ? 'множитель' : 'кредитов/сек'}</p>
            <button class="buy-upgrade" data-id="${upgrade.id}" ${gameState.credits < cost ? 'disabled' : ''}>
                Купить (${Math.floor(cost)})
            </button>
        `;
        elements.upgradesContainer.appendChild(upgradeEl);
    });
}

// Отрисовка боссов
function renderBosses() {
    elements.bossesContainer.innerHTML = '';
    
    gameState.bosses.forEach(boss => {
        const bossEl = document.createElement('div');
        bossEl.className = `boss ${boss.defeated ? 'defeated' : ''}`;
        bossEl.innerHTML = `
            <h3><i class="fas ${boss.icon}"></i> ${boss.name}</h3>
            <p>Здоровье: ${boss.defeated ? '0' : boss.health}</p>
            <p>Награда: ${boss.reward} кредитов</p>
            <button class="fight-boss" data-id="${boss.id}" ${boss.defeated ? 'disabled' : ''}>
                ${boss.defeated ? 'Победа' : 'Атаковать'}
            </button>
        `;
        elements.bossesContainer.appendChild(bossEl);
    });
}

// Отрисовка клана
function renderClanTab() {
    if (gameState.clan) {
        elements.clanNameDisplay.textContent = gameState.clan.name;
        elements.clanTreasury.textContent = gameState.clan.treasury;
        
        elements.clanMembers.innerHTML = '';
        gameState.clan.members.forEach(member => {
            const memberEl = document.createElement('div');
            memberEl.className = 'clan-member';
            memberEl.textContent = member;
            elements.clanMembers.appendChild(memberEl);
        });
        
        document.getElementById('clan-info').style.display = 'block';
    } else {
        document.getElementById('clan-info').style.display = 'none';
    }
    
    // Отрисовка рейтинга кланов
    elements.leaderboard.innerHTML = '';
    const sortedClans = [...gameState.clans, ...(gameState.clan ? [gameState.clan] : [])]
        .sort((a, b) => b.treasury - a.treasury);
    
    sortedClans.forEach((clan, index) => {
        const row = document.createElement('div');
        row.className = 'leaderboard-row';
        row.innerHTML = `
            <span>${index + 1}. ${clan.name}</span>
            <span>${clan.treasury}</span>
        `;
        elements.leaderboard.appendChild(row);
    });
}

// Отрисовка достижений
function renderAchievements() {
    const unlocked = gameState.achievements.filter(a => a.unlocked).length;
    elements.achieved.textContent = unlocked;
    elements.progress.style.width = `${(unlocked / gameState.achievements.length) * 100}%`;
    
    elements.achievementsContainer.innerHTML = '';
    gameState.achievements.forEach(ach => {
        const achEl = document.createElement('div');
        achEl.className = `achievement ${ach.unlocked ? 'unlocked' : ''}`;
        achEl.innerHTML = `
            <h4><i class="fas ${ach.icon}"></i> ${ach.name}</h4>
            <p>${ach.desc}</p>
            <p>Награда: ${ach.reward} кредитов</p>
            ${!ach.unlocked ? `
                <div class="achievement-progress">
                    <div class="achievement-progress-bar" style="width: ${(ach.progress / ach.target) * 100}%"></div>
                </div>
                <small>${ach.progress}/${ach.target}</small>
            ` : ''}
        `;
        elements.achievementsContainer.appendChild(achEl);
    });
}

// Отрисовка всего
function renderAll() {
    updateDisplays();
    renderUpgrades();
    renderBosses();
    renderClanTab();
    renderAchievements();
}

// Запуск игры
window.addEventListener('DOMContentLoaded', init);
