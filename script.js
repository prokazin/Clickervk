// Оптимизированная игровая логика для Telegram
class StarWarsClicker {
    constructor() {
        this.state = {
            credits: 0,
            forcePoints: 0,
            level: 1,
            xp: 0,
            xpToNextLevel: 100,
            cps: 0,
            clickPower: 1,
            clickCount: 0,
            upgrades: [
                { id: 1, name: "Дроид-уборщик", description: "+1 кредит/сек", baseCost: 50, owned: 0, cps: 1 },
                { id: 2, name: "Торговый корабль", description: "+5 кредитов/сек", baseCost: 200, owned: 0, cps: 5 },
                { id: 3, name: "Дроид-астромеханик", description: "+10 кредитов/сек", baseCost: 500, owned: 0, cps: 10 },
                { id: 4, name: "Шахта спайса", description: "+20 кредитов/сек", baseCost: 1000, owned: 0, cps: 20 },
                { id: 5, name: "Звездолет", description: "+50 кредитов/сек", baseCost: 5000, owned: 0, cps: 50 }
            ],
            achievements: [
                { id: 1, name: "Первые кредиты", goal: 100, reward: 10, achieved: false },
                { id: 2, name: "Новичок", goal: 1000, reward: 50, achieved: false },
                { id: 3, name: "Опытный", goal: 5000, reward: 100, achieved: false },
                { id: 4, name: "Первая Сила", goal: 1, reward: 50, achieved: false },
                { id: 5, name: "Чувствительный", goal: 5, reward: 100, achieved: false },
                { id: 6, name: "Падаван", goal: 5, reward: 100, achieved: false },
                { id: 7, name: "Рыцарь", goal: 10, reward: 200, achieved: false },
                { id: 8, name: "Первое улучшение", goal: 1, reward: 50, achieved: false }
            ],
            bosses: [
                { id: 1, name: "Дарт Вейдер", maxHealth: 1000, currentHealth: 1000, reward: 5000, forceCost: 100 },
                { id: 2, name: "Дарт Мол", maxHealth: 2500, currentHealth: 2500, reward: 10000, forceCost: 250 },
                { id: 3, name: "Оби-Ван", maxHealth: 5000, currentHealth: 5000, reward: 20000, forceCost: 500 }
            ],
            clan: null,
            lastPlayDate: null,
            consecutiveDays: 0
        };

        this.cacheElements();
        this.init();
    }

    cacheElements() {
        this.el = {
            credits: document.getElementById('credits'),
            forcePoints: document.getElementById('force-points'),
            level: document.getElementById('level'),
            cps: document.getElementById('cps'),
            clickCount: document.getElementById('click-count'),
            clicker: document.getElementById('clicker'),
            upgradesGrid: document.getElementById('upgrades-grid'),
            achievementsGrid: document.getElementById('achievements-grid'),
            bossesGrid: document.getElementById('bosses-grid'),
            clanContainer: document.getElementById('clan-container'),
            notification: document.getElementById('notification'),
            tabButtons: document.querySelectorAll('.tab-btn'),
            tabContents: document.querySelectorAll('.tab-content')
        };
    }

    init() {
        this.loadGame();
        this.setupTabs();
        this.setupClicker();
        this.renderAll();
        this.startPassiveIncome();
        this.checkDailyReward();
        
        // Оптимизация для Telegram WebView
        if (window.Telegram && window.Telegram.WebApp) {
            this.setupTelegramWebApp();
        }
    }

    setupTelegramWebApp() {
        Telegram.WebApp.expand();
        Telegram.WebApp.enableClosingConfirmation();
        Telegram.WebApp.setHeaderColor('#0a1a2f');
        Telegram.WebApp.setBackgroundColor('#0a1a2f');
        
        // Отправка данных в Telegram при необходимости
        this.setupTelegramData();
    }

    setupTelegramData() {
        // Здесь можно добавить логику взаимодействия с Telegram API
        // Например, сохранение прогресса в облако Telegram
    }

    setupTabs() {
        this.el.tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.dataset.tab;
                this.switchTab(tabId);
            });
        });
    }

    switchTab(tabId) {
        this.el.tabContents.forEach(tab => tab.classList.remove('active'));
        this.el.tabButtons.forEach(btn => btn.classList.remove('active'));
        
        document.getElementById(tabId).classList.add('active');
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    }

    setupClicker() {
        let lastClickTime = 0;
        const clickDelay = 100; // 100ms между кликами
        
        this.el.clicker.addEventListener('click', (e) => {
            const now = Date.now();
            if (now - lastClickTime < clickDelay) return;
            lastClickTime = now;
            
            this.handleClick(e);
        });
    }

    handleClick(e) {
        // Эффект клика
        const clickEffect = document.createElement('div');
        clickEffect.className = 'click-effect';
        clickEffect.style.left = `${e.offsetX - 15}px`;
        clickEffect.style.top = `${e.offsetY - 15}px`;
        this.el.clicker.appendChild(clickEffect);
        setTimeout(() => clickEffect.remove(), 500);
        
        // Игровая логика
        this.state.credits += this.state.clickPower;
        this.state.clickCount++;
        
        // Шанс 1% получить Очко Силы
        if (Math.random() < 0.01) {
            this.state.forcePoints++;
            this.showNotification('⚡ +1 Очко Силы!');
        }
        
        // Опыт
        this.addXP(1);
        
        // Обновление UI
        this.updateUI();
        this.checkAchievements();
    }

    startPassiveIncome() {
        this.passiveIncomeInterval = setInterval(() => {
            if (this.state.cps > 0) {
                this.state.credits += this.state.cps / 10;
                this.updateUI();
            }
        }, 100);
    }

    updateUI() {
        this.el.credits.textContent = this.formatNumber(this.state.credits);
        this.el.forcePoints.textContent = this.formatNumber(this.state.forcePoints);
        this.el.cps.textContent = this.formatNumber(this.state.cps);
        
        const titles = ["Падаван", "Рыцарь", "Магистр", "Совет", "Мастер"];
        const titleIndex = Math.min(Math.floor(this.state.level / 5), titles.length - 1);
        this.el.level.textContent = `${titles[titleIndex]} (${this.state.level})`;
    }

    formatNumber(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return Math.floor(num);
    }

    renderAll() {
        this.renderUpgrades();
        this.renderBosses();
        this.renderAchievements();
        this.renderClan();
    }

    renderUpgrades() {
        this.el.upgradesGrid.innerHTML = this.state.upgrades.map(upgrade => {
            const cost = Math.floor(upgrade.baseCost * Math.pow(1.15, upgrade.owned));
            const canAfford = this.state.credits >= cost;
            
            return `
                <div class="upgrade-card">
                    <h3>${upgrade.name}</h3>
                    <p>${upgrade.description}</p>
                    <p>Куплено: ${upgrade.owned}</p>
                    <p>Цена: ${this.formatNumber(cost)}</p>
                    <button ${!canAfford ? 'disabled' : ''} 
                            data-upgrade-id="${upgrade.id}">
                        Купить
                    </button>
                </div>
            `;
        }).join('');
        
        // Назначение обработчиков
        document.querySelectorAll('[data-upgrade-id]').forEach(btn => {
            btn.addEventListener('click', () => {
                const upgradeId = parseInt(btn.dataset.upgradeId);
                this.buyUpgrade(upgradeId);
            });
        });
    }

    buyUpgrade(upgradeId) {
        const upgrade = this.state.upgrades.find(u => u.id === upgradeId);
        const cost = Math.floor(upgrade.baseCost * Math.pow(1.15, upgrade.owned));
        
        if (this.state.credits >= cost) {
            this.state.credits -= cost;
            upgrade.owned++;
            this.state.cps = this.state.upgrades.reduce((sum, u) => sum + (u.owned * u.cps), 0);
            
            this.addXP(5);
            this.updateUI();
            this.renderUpgrades();
            this.showNotification(`🛠 ${upgrade.name} куплено!`);
            this.checkAchievements();
            this.saveGame();
        }
    }

    renderBosses() {
        this.el.bossesGrid.innerHTML = this.state.bosses.map(boss => {
            const healthPercent = (boss.currentHealth / boss.maxHealth) * 100;
            const isDefeated = boss.currentHealth <= 0;
            const canAttack = this.state.forcePoints >= boss.forceCost && !isDefeated;
            
            return `
                <div class="boss-card">
                    <img src="img/${boss.name.replace(' ', '').toLowerCase()}.webp" alt="${boss.name}" loading="lazy">
                    <h3>${boss.name}</h3>
                    <div class="health-bar">
                        <div class="health" style="width: ${healthPercent}%"></div>
                    </div>
                    <button class="attack-btn" ${!canAttack ? 'disabled' : ''} 
                            data-boss-id="${boss.id}">
                        ${isDefeated ? 'ПОБЕЖДЕН' : `Атаковать (${boss.forceCost} ОС)`}
                    </button>
                </div>
            `;
        }).join('');
        
        // Назначение обработчиков
        document.querySelectorAll('[data-boss-id]').forEach(btn => {
            btn.addEventListener('click', () => {
                const bossId = parseInt(btn.dataset.bossId);
                this.attackBoss(bossId);
            });
        });
    }

    attackBoss(bossId) {
        const boss = this.state.bosses.find(b => b.id === bossId);
        
        if (this.state.forcePoints >= boss.forceCost && boss.currentHealth > 0) {
            this.state.forcePoints -= boss.forceCost;
            const damage = 50 + (this.state.level * 5);
            boss.currentHealth = Math.max(0, boss.currentHealth - damage);
            
            if (boss.currentHealth <= 0) {
                this.state.credits += boss.reward;
                this.showNotification(`🎉 ${boss.name} побежден! +${this.formatNumber(boss.reward)}`);
                this.addXP(20);
            }
            
            this.updateUI();
            this.renderBosses();
            this.checkAchievements();
            this.saveGame();
        }
    }

    renderAchievements() {
        this.el.achievementsGrid.innerHTML = this.state.achievements.map(ach => {
            const progress = this.getAchievementProgress(ach);
            const achieved = progress >= ach.goal;
            
            return `
                <div class="achievement-card ${achieved ? '' : 'locked'}">
                    <h4>${ach.name}</h4>
                    <p>${ach.goal} ${ach.name.includes('кредит') ? 'кредитов' : ach.name.includes('Сила') ? 'ОС' : 'уровень'}</p>
                    <p>Награда: +${ach.reward}</p>
                    ${!achieved ? `<p>Прогресс: ${progress}/${ach.goal}</p>` : ''}
                </div>
            `;
        }).join('');
    }

    getAchievementProgress(achievement) {
        switch(achievement.id) {
            case 1: case 2: case 3: return Math.min(this.state.credits, achievement.goal);
            case 4: case 5: return Math.min(this.state.forcePoints, achievement.goal);
            case 6: case 7: return Math.min(this.state.level, achievement.goal);
            case 8: return this.state.upgrades.reduce((sum, u) => sum + u.owned, 0);
            default: return 0;
        }
    }

    checkAchievements() {
        this.state.achievements.forEach(ach => {
            if (!ach.achieved) {
                const progress = this.getAchievementProgress(ach);
                if (progress >= ach.goal) {
                    ach.achieved = true;
                    this.state.credits += ach.reward;
                    this.showNotification(`🏆 ${ach.name}! +${ach.reward} кредитов`);
                }
            }
        });
        
        this.renderAchievements();
        this.updateUI();
    }

    renderClan() {
        if (this.state.clan) {
            this.el.clanContainer.innerHTML = `
                <div class="clan-header">
                    <h3>${this.state.clan.name}</h3>
                    <p>Уровень: ${this.state.clan.level}</p>
                    <p>Казна: ${this.formatNumber(this.state.clan.treasury)}</p>
                </div>
                <div class="donate-section">
                    <input type="number" id="donation-amount" min="1000" value="1000" step="1000">
                    <button id="donate-btn">Пожертвовать</button>
                </div>
            `;
            
            document.getElementById('donate-btn').addEventListener('click', () => {
                const amount = parseInt(document.getElementById('donation-amount').value);
                this.donateToClan(amount);
            });
        } else {
            this.el.clanContainer.innerHTML = `
                <button id="create-clan-btn">Создать клан (5,000)</button>
                <div id="clan-creation" style="display:none;">
                    <input type="text" id="clan-name" placeholder="Название клана">
                    <button id="confirm-clan-btn">Создать</button>
                </div>
            `;
            
            document.getElementById('create-clan-btn').addEventListener('click', () => {
                if (this.state.credits >= 5000) {
                    document.getElementById('clan-creation').style.display = 'block';
                } else {
                    this.showNotification('Нужно 5,000 кредитов');
                }
            });
            
            document.getElementById('confirm-clan-btn').addEventListener('click', () => {
                const name = document.getElementById('clan-name').value.trim();
                if (name.length >= 3) {
                    this.state.credits -= 5000;
                    this.state.clan = {
                        name,
                        level: 1,
                        treasury: 0,
                        members: ['Вы']
                    };
                    this.showNotification(`Клан "${name}" создан!`);
                    this.renderClan();
                    this.saveGame();
                }
            });
        }
    }

    donateToClan(amount) {
        if (amount >= 1000 && this.state.credits >= amount) {
            this.state.credits -= amount;
            this.state.clan.treasury += amount;
            
            const levelsGained = Math.floor(this.state.clan.treasury / 10000) - (this.state.clan.level - 1);
            if (levelsGained > 0) {
                this.state.clan.level += levelsGained;
                this.showNotification(`Клан повышен до уровня ${this.state.clan.level}!`);
            }
            
            this.updateUI();
            this.renderClan();
            this.saveGame();
        }
    }

    addXP(amount) {
        this.state.xp += amount;
        while (this.state.xp >= this.state.xpToNextLevel) {
            this.state.xp -= this.state.xpToNextLevel;
            this.state.level++;
            this.state.xpToNextLevel = Math.floor(this.state.xpToNextLevel * 1.2);
            this.showNotification(`🎇 Уровень ${this.state.level}!`);
        }
    }

    checkDailyReward() {
        const today = new Date().toDateString();
        if (this.state.lastPlayDate !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (this.state.lastPlayDate === yesterday.toDateString()) {
                this.state.consecutiveDays++;
            } else {
                this.state.consecutiveDays = 1;
            }
            
            this.state.lastPlayDate = today;
            const reward = Math.floor(100 * Math.pow(1.1, this.state.consecutiveDays - 1));
            this.state.credits += reward;
            this.showNotification(`🎁 Ежедневная награда: ${reward} (День ${this.state.consecutiveDays})`);
            this.saveGame();
        }
    }

    showNotification(message) {
        this.el.notification.textContent = message;
        this.el.notification.style.opacity = '1';
        setTimeout(() => {
            this.el.notification.style.opacity = '0';
        }, 2000);
    }

    saveGame() {
        localStorage.setItem('swClicker', JSON.stringify(this.state));
        // Для Telegram можно добавить сохранение через Telegram WebApp
        if (window.Telegram && window.Telegram.WebApp) {
            Telegram.WebApp.sendData(JSON.stringify(this.state));
        }
    }

    loadGame() {
        const saved = localStorage.getItem('swClicker');
        if (saved) {
            this.state = JSON.parse(saved);
            this.state.cps = this.state.upgrades.reduce((sum, u) => sum + (u.owned * u.cps), 0);
        }
        
        // Для Telegram можно добавить загрузку из облака
    }
}

// Инициализация игры
document.addEventListener('DOMContentLoaded', () => {
    const game = new StarWarsClicker();
    
    // Автосохранение каждые 30 секунд
    setInterval(() => game.saveGame(), 30000);
    
    // Сохранение при закрытии
    window.addEventListener('beforeunload', () => game.saveGame());
    
    // Для Telegram WebApp
    if (window.Telegram && window.Telegram.WebApp) {
        Telegram.WebApp.ready();
    }
});
