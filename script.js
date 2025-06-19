// Полная игровая логика
class StarWarsClickerGame {
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
                { id: 1, name: "Дроид-уборщик", description: "Автоматически собирает кредиты", baseCost: 50, owned: 0, cps: 1, icon: "droid" },
                { id: 2, name: "Торговый корабль", description: "Межгалактическая торговля", baseCost: 200, owned: 0, cps: 5, icon: "ship" },
                { id: 3, name: "Дроид-астромеханик", description: "Ремонтирует технику за кредиты", baseCost: 500, owned: 0, cps: 10, icon: "astromech" },
                { id: 4, name: "Шахта спайса", description: "Добыча ценного ресурса", baseCost: 1000, owned: 0, cps: 20, icon: "mine" },
                { id: 5, name: "Звездолет", description: "Перевозка грузов между системами", baseCost: 5000, owned: 0, cps: 50, icon: "starship" },
                { id: 6, name: "Космическая станция", description: "Торговый хаб", baseCost: 10000, owned: 0, cps: 100, icon: "station" },
                { id: 7, name: "Планетарная колония", description: "Добыча ресурсов с планеты", baseCost: 50000, owned: 0, cps: 500, icon: "colony" },
                { id: 8, name: "Звездный разрушитель", description: "Военная мощь Империи", baseCost: 100000, owned: 0, cps: 1000, icon: "destroyer" },
                { id: 9, name: "Смертельная Звезда", description: "Ультимативное оружие", baseCost: 1000000, owned: 0, cps: 10000, icon: "deathstar" }
            ],
            achievements: [
                { id: 1, name: "Первые кредиты", description: "Заработать 100 кредитов", goal: 100, achieved: false, reward: 10, icon: "credits1" },
                { id: 2, name: "Новичок", description: "Заработать 1,000 кредитов", goal: 1000, achieved: false, reward: 50, icon: "credits2" },
                { id: 3, name: "Опытный", description: "Заработать 10,000 кредитов", goal: 10000, achieved: false, reward: 100, icon: "credits3" },
                { id: 4, name: "Профессионал", description: "Заработать 100,000 кредитов", goal: 100000, achieved: false, reward: 500, icon: "credits4" },
                { id: 5, name: "Магнат", description: "Заработать 1,000,000 кредитов", goal: 1000000, achieved: false, reward: 1000, icon: "credits5" },
                { id: 6, name: "Первая Сила", description: "Получить 1 Очко Силы", goal: 1, achieved: false, reward: 100, icon: "force1" },
                { id: 7, name: "Чувствительный", description: "Получить 10 Очков Силы", goal: 10, achieved: false, reward: 500, icon: "force2" },
                { id: 8, name: "Джедай", description: "Получить 50 Очков Силы", goal: 50, achieved: false, reward: 1000, icon: "force3" },
                { id: 9, name: "Мастер-джедай", description: "Получить 100 Очков Силы", goal: 100, achieved: false, reward: 5000, icon: "force4" },
                { id: 10, name: "Падаван", description: "Достигнуть 5 уровня", goal: 5, achieved: false, reward: 200, icon: "level1" },
                { id: 11, name: "Рыцарь-джедай", description: "Достигнуть 10 уровня", goal: 10, achieved: false, reward: 500, icon: "level2" },
                { id: 12, name: "Магистр", description: "Достигнуть 20 уровня", goal: 20, achieved: false, reward: 2000, icon: "level3" },
                { id: 13, name: "Совет джедаев", description: "Достигнуть 30 уровня", goal: 30, achieved: false, reward: 5000, icon: "level4" },
                { id: 14, name: "Первое улучшение", description: "Купить любое улучшение", goal: 1, achieved: false, reward: 50, icon: "upgrade1" },
                { id: 15, name: "Коллекционер", description: "Купить 5 улучшений", goal: 5, achieved: false, reward: 200, icon: "upgrade2" },
                { id: 16, name: "Инвестор", description: "Купить 10 улучшений", goal: 10, achieved: false, reward: 500, icon: "upgrade3" },
                { id: 17, name: "Тайкун", description: "Купить все улучшения", goal: 9, achieved: false, reward: 1000, icon: "upgrade4" },
                { id: 18, name: "Охотник за головами", description: "Победить Дарта Вейдера", goal: 1, achieved: false, reward: 500, icon: "boss1" },
                { id: 19, name: "Ситх", description: "Победить Дарта Мола", goal: 1, achieved: false, reward: 1000, icon: "boss2" },
                { id: 20, name: "Избранный", description: "Победить Оби-Вана Кеноби", goal: 1, achieved: false, reward: 2000, icon: "boss3" },
                { id: 21, name: "Клановая система", description: "Создать или вступить в клан", goal: 1, achieved: false, reward: 300, icon: "clan1" },
                { id: 22, name: "Щедрый", description: "Пожертвовать 10,000 кредитов в клан", goal: 10000, achieved: false, reward: 500, icon: "clan2" },
                { id: 23, name: "Меценат", description: "Пожертвовать 100,000 кредитов в клан", goal: 100000, achieved: false, reward: 2000, icon: "clan3" },
                { id: 24, name: "Лидер", description: "Поднять клан до 5 уровня", goal: 5, achieved: false, reward: 1000, icon: "clan4" },
                { id: 25, name: "Легенда", description: "Поднять клан до 10 уровня", goal: 10, achieved: false, reward: 5000, icon: "clan5" },
                { id: 26, name: "Ежедневный игрок", description: "Зайти в игру 3 дня подряд", goal: 3, achieved: false, reward: 300, icon: "daily1" },
                { id: 27, name: "Преданный", description: "Зайти в игру 7 дней подряд", goal: 7, achieved: false, reward: 700, icon: "daily2" },
                { id: 28, name: "Фанат", description: "Зайти в игру 30 дней подряд", goal: 30, achieved: false, reward: 3000, icon: "daily3" },
                { id: 29, name: "Мастер кликера", description: "Сделать 1,000 кликов", goal: 1000, achieved: false, reward: 500, icon: "click1" },
                { id: 30, name: "Абсолютный мастер", description: "Сделать 10,000 кликов", goal: 10000, achieved: false, reward: 5000, icon: "click2" }
            ],
            bosses: [
                { id: 1, name: "Дарт Вейдер", maxHealth: 1000, currentHealth: 1000, reward: 5000, forceCost: 100, image: "vader" },
                { id: 2, name: "Дарт Мол", maxHealth: 2500, currentHealth: 2500, reward: 15000, forceCost: 250, image: "maul" },
                { id: 3, name: "Оби-Ван Кеноби", maxHealth: 5000, currentHealth: 5000, reward: 30000, forceCost: 500, image: "obiwan" }
            ],
            clan: null,
            lastPlayDate: null,
            consecutiveDays: 0,
            totalPlayTime: 0
        };

        this.domElements = {
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

        this.init();
    }

    init() {
        this.loadGame();
        this.setupTabs();
        this.setupClicker();
        this.renderUpgrades();
        this.renderBosses();
        this.renderAchievements();
        this.setupClanUI();
        this.startPassiveIncome();
        this.checkDailyReward();
        this.updateUI();
        this.startPlayTimeCounter();
    }

    setupTabs() {
        this.domElements.tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.dataset.tab;
                
                // Скрыть все вкладки
                this.domElements.tabContents.forEach(content => {
                    content.classList.remove('active');
                });
                
                // Убрать активный класс у всех кнопок
                this.domElements.tabButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Показать выбранную вкладку
                document.getElementById(tabId).classList.add('active');
                button.classList.add('active');
            });
        });
    }

    setupClicker() {
        this.domElements.clicker.addEventListener('click', (e) => {
            // Создаем эффект клика
            const clickEffect = document.createElement('div');
            clickEffect.className = 'click-effect';
            
            const rect = this.domElements.clicker.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            clickEffect.style.left = `${x - 30}px`;
            clickEffect.style.top = `${y - 30}px`;
            
            this.domElements.clicker.appendChild(clickEffect);
            
            // Удаляем эффект после анимации
            setTimeout(() => {
                clickEffect.remove();
            }, 500);
            
            // Добавляем кредиты
            this.state.credits += this.state.clickPower;
            this.state.clickCount++;
            this.domElements.clickCount.textContent = this.formatNumber(this.state.clickCount);
            
            // Шанс получить Очко Силы (1%)
            if (Math.random() < 0.01) {
                this.state.forcePoints++;
                this.showNotification('⚡ +1 Очко Силы!');
            }
            
            // Добавляем опыт
            this.addXP(1);
            
            // Обновляем UI
            this.updateUI();
            
            // Проверяем достижения
            this.checkAchievements();
        });
    }

    startPassiveIncome() {
        setInterval(() => {
            if (this.state.cps > 0) {
                this.state.credits += this.state.cps / 10;
                this.updateUI();
            }
        }, 100);
    }

    startPlayTimeCounter() {
        setInterval(() => {
            this.state.totalPlayTime++;
            this.saveGame();
        }, 1000);
    }

    updateUI() {
        this.domElements.credits.textContent = this.formatNumber(this.state.credits);
        this.domElements.forcePoints.textContent = this.formatNumber(this.state.forcePoints);
        this.domElements.cps.textContent = this.formatNumber(this.state.cps);
        
        // Обновляем уровень игрока
        const levelTitles = [
            "Падаван", "Рыцарь-джедай", "Магистр-джедай", "Член Совета", 
            "Мастер-джедай", "Гранд-мастер", "Избранный", "Ситх", 
            "Лорд ситхов", "Темный лорд"
        ];
        const titleIndex = Math.min(Math.floor(this.state.level / 3), levelTitles.length - 1);
        this.domElements.level.textContent = `${levelTitles[titleIndex]} (${this.state.level})`;
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return Math.floor(num);
    }

    renderUpgrades() {
        this.domElements.upgradesGrid.innerHTML = '';
        
        this.state.upgrades.forEach(upgrade => {
            const cost = Math.floor(upgrade.baseCost * Math.pow(1.15, upgrade.owned));
            const canAfford = this.state.credits >= cost;
            
            const upgradeCard = document.createElement('div');
            upgradeCard.className = 'upgrade-card';
            upgradeCard.innerHTML = `
                <h3>${upgrade.name}</h3>
                <p>${upgrade.description}</p>
                <div class="upgrade-stats">
                    <p>+${upgrade.cps} кредитов/сек</p>
                    <p>Куплено: ${upgrade.owned}</p>
                </div>
                <p>Стоимость: ${this.formatNumber(cost)} кредитов</p>
                <button ${!canAfford ? 'disabled' : ''}>Купить</button>
            `;
            
            const button = upgradeCard.querySelector('button');
            button.addEventListener('click', () => {
                this.buyUpgrade(upgrade.id);
            });
            
            this.domElements.upgradesGrid.appendChild(upgradeCard);
        });
    }

    buyUpgrade(upgradeId) {
        const upgrade = this.state.upgrades.find(u => u.id === upgradeId);
        const cost = Math.floor(upgrade.baseCost * Math.pow(1.15, upgrade.owned));
        
        if (this.state.credits >= cost) {
            this.state.credits -= cost;
            upgrade.owned++;
            
            // Пересчитываем CPS
            this.state.cps = this.state.upgrades.reduce((total, u) => total + (u.owned * u.cps), 0);
            
            // Добавляем опыт
            this.addXP(5);
            
            // Обновляем UI
            this.updateUI();
            this.showNotification(`🛠️ Куплено: ${upgrade.name}`);
            
            // Проверяем достижения
            this.checkAchievements();
        }
    }

    renderBosses() {
        this.domElements.bossesGrid.innerHTML = '';
        
        this.state.bosses.forEach(boss => {
            const healthPercent = (boss.currentHealth / boss.maxHealth) * 100;
            const isDefeated = boss.currentHealth <= 0;
            const canAttack = this.state.forcePoints >= boss.forceCost && !isDefeated;
            
            const bossCard = document.createElement('div');
            bossCard.className = 'boss-card';
            bossCard.id = `boss-${boss.id}`;
            bossCard.innerHTML = `
                <img src="img/${boss.image}.png" alt="${boss.name}">
                <h3>${boss.name}</h3>
                <div class="health-container">
                    <div class="health-label">
                        <span>${isDefeated ? 'ПОБЕЖДЕН' : 'ЗДОРОВЬЕ'}</span>
                        <span>${isDefeated ? '0' : Math.floor(boss.currentHealth)}/${boss.maxHealth}</span>
                    </div>
                    <div class="health-bar">
                        <div class="health" style="width: ${healthPercent}%"></div>
                    </div>
                </div>
                <button class="attack-btn" ${!canAttack ? 'disabled' : ''} data-boss-id="${boss.id}">
                    ${isDefeated ? 'ПОБЕЖДЕН' : `Атаковать (${boss.forceCost} ОС)`}
                </button>
                ${isDefeated ? `<p class="reward">Награда: +${this.formatNumber(boss.reward)} кредитов</p>` : ''}
            `;
            
            const attackBtn = bossCard.querySelector('.attack-btn');
            attackBtn.addEventListener('click', () => {
                this.attackBoss(boss.id);
            });
            
            this.domElements.bossesGrid.appendChild(bossCard);
        });
    }

    attackBoss(bossId) {
        const boss = this.state.bosses.find(b => b.id === bossId);
        
        if (this.state.forcePoints >= boss.forceCost && boss.currentHealth > 0) {
            this.state.forcePoints -= boss.forceCost;
            
            // Расчет урона в зависимости от уровня игрока
            const damage = 50 + (this.state.level * 5);
            boss.currentHealth = Math.max(0, boss.currentHealth - damage);
            
            // Проверка победы над боссом
            if (boss.currentHealth <= 0) {
                this.state.credits += boss.reward;
                this.showNotification(`🎉 ${boss.name} побежден! +${this.formatNumber(boss.reward)} кредитов`);
                
                // Добавляем опыт
                this.addXP(20);
            }
            
            // Обновляем UI
            this.updateUI();
            this.renderBosses();
            this.checkAchievements();
        }
    }

    renderAchievements() {
        this.domElements.achievementsGrid.innerHTML = '';
        
        this.state.achievements.forEach(achievement => {
            const achieved = achievement.achieved;
            const progress = this.getAchievementProgress(achievement);
            const progressPercent = (progress / achievement.goal) * 100;
            
            const achievementCard = document.createElement('div');
            achievementCard.className = `achievement-card ${achieved ? 'unlocked' : 'locked'}`;
            achievementCard.innerHTML = `
                <img src="img/achievement_${achievement.icon}.png" alt="${achievement.name}">
                <h4>${achievement.name}</h4>
                <p>${achievement.description}</p>
                ${!achieved ? `
                    <div class="progress">Прогресс: ${progress}/${achievement.goal}</div>
                    <div class="progress-bar">
                        <div style="width: ${progressPercent}%"></div>
                    </div>
                ` : `
                    <p class="reward">Награда: +${achievement.reward} кредитов</p>
                `}
            `;
            
            this.domElements.achievementsGrid.appendChild(achievementCard);
        });
    }

    getAchievementProgress(achievement) {
        switch(achievement.id) {
            case 1: case 2: case 3: case 4: case 5:
                return Math.min(this.state.credits, achievement.goal);
            case 6: case 7: case 8: case 9:
                return Math.min(this.state.forcePoints, achievement.goal);
            case 10: case 11: case 12: case 13:
                return Math.min(this.state.level, achievement.goal);
            case 14: case 15: case 16: case 17:
                const ownedUpgrades = this.state.upgrades.reduce((total, u) => total + u.owned, 0);
                return Math.min(ownedUpgrades, achievement.goal);
            case 18:
                return this.state.bosses[0].currentHealth <= 0 ? 1 : 0;
            case 19:
                return this.state.bosses[1].currentHealth <= 0 ? 1 : 0;
            case 20:
                return this.state.bosses[2].currentHealth <= 0 ? 1 : 0;
            case 21:
                return this.state.clan ? 1 : 0;
            case 22: case 23:
                return this.state.clan ? Math.min(this.state.clan.totalDonations, achievement.goal) : 0;
            case 24: case 25:
                return this.state.clan ? Math.min(this.state.clan.level, achievement.goal) : 0;
            case 26: case 27: case 28:
                return Math.min(this.state.consecutiveDays, achievement.goal);
            case 29: case 30:
                return Math.min(this.state.clickCount, achievement.goal);
            default:
                return 0;
        }
    }

    checkAchievements() {
        let newAchievements = 0;
        
        this.state.achievements.forEach(achievement => {
            if (!achievement.achieved) {
                const progress = this.getAchievementProgress(achievement);
                if (progress >= achievement.goal) {
                    achievement.achieved = true;
                    this.state.credits += achievement.reward;
                    newAchievements++;
                    this.showNotification(`🏆 Достижение: ${achievement.name}! +${achievement.reward} кредитов`);
                }
            }
        });
        
        if (newAchievements > 0) {
            this.renderAchievements();
            this.updateUI();
        }
    }

    addXP(amount) {
        this.state.xp += amount;
        
        // Проверка повышения уровня
        while (this.state.xp >= this.state.xpToNextLevel) {
            this.state.xp -= this.state.xpToNextLevel;
            this.state.level++;
            this.state.xpToNextLevel = Math.floor(this.state.xpToNextLevel * 1.2);
            this.showNotification(`🎇 Уровень повышен! Теперь вы ${this.domElements.level.textContent}`);
        }
    }

    setupClanUI() {
        if (this.state.clan) {
            this.renderClanInfo();
        } else {
            this.renderNoClan();
        }
    }

    renderNoClan() {
        this.domElements.clanContainer.innerHTML = `
            <div id="no-clan">
                <p>Вы не состоите в клане</p>
                <button id="create-clan-btn" ${this.state.credits < 5000 ? 'disabled' : ''}>
                    Создать клан (5,000 кредитов)
                </button>
                <div id="clan-creation-form" style="display: none;">
                    <input type="text" id="clan-name" placeholder="Название клана" maxlength="20">
                    <button id="confirm-clan-btn">Создать</button>
                </div>
            </div>
        `;
        
        const createClanBtn = document.getElementById('create-clan-btn');
        const clanCreationForm = document.getElementById('clan-creation-form');
        const confirmClanBtn = document.getElementById('confirm-clan-btn');
        const clanNameInput = document.getElementById('clan-name');
        
        createClanBtn.addEventListener('click', () => {
            if (this.state.credits >= 5000) {
                clanCreationForm.style.display = 'block';
            } else {
                this.showNotification('Недостаточно кредитов (нужно 5,000)');
            }
        });
        
        confirmClanBtn.addEventListener('click', () => {
            const clanName = clanNameInput.value.trim();
            if (clanName.length >= 3 && clanName.length <= 20) {
                this.state.credits -= 5000;
                this.state.clan = {
                    name: clanName,
                    level: 1,
                    treasury: 0,
                    totalDonations: 0,
                    members: ['Вы']
                };
                
                this.showNotification(`⚔️ Клан "${clanName}" создан!`);
                
                // Добавляем опыт
                this.addXP(10);
                
                // Обновляем UI
                this.updateUI();
                this.setupClanUI();
                this.checkAchievements();
                this.saveGame();
            } else {
                this.showNotification('Название клана должно быть от 3 до 20 символов');
            }
        });
    }

    renderClanInfo() {
        this.domElements.clanContainer.innerHTML = `
            <div id="has-clan">
                <div class="clan-header">
                    <h3>${this.state.clan.name}</h3>
                </div>
                <div class="clan-stats">
                    <div class="clan-stat">
                        <p>Уровень</p>
                        <p>${this.state.clan.level}</p>
                    </div>
                    <div class="clan-stat">
                        <p>Казна</p>
                        <p>${this.formatNumber(this.state.clan.treasury)}</p>
                    </div>
                    <div class="clan-stat">
                        <p>Пожертвовано</p>
                        <p>${this.formatNumber(this.state.clan.totalDonations)}</p>
                    </div>
                </div>
                <div class="clan-members">
                    <h4>Участники (${this.state.clan.members.length})</h4>
                    <ul id="clan-members-list">
                        ${this.state.clan.members.map(member => `<li>${member}</li>`).join('')}
                    </ul>
                </div>
                <div class="donate-section">
                    <h4>Пожертвовать в казну</h4>
                    <div class="donate-controls">
                        <input type="number" id="donation-amount" min="1000" value="1000" step="1000">
                        <button id="donate-btn">Внести</button>
                    </div>
                </div>
            </div>
        `;
        
        const donateBtn = document.getElementById('donate-btn');
        const donationAmountInput = document.getElementById('donation-amount');
        
        donateBtn.addEventListener('click', () => {
            const amount = parseInt(donationAmountInput.value);
            if (amount >= 1000 && this.state.credits >= amount) {
                this.state.credits -= amount;
                this.state.clan.treasury += amount;
                this.state.clan.totalDonations += amount;
                
                // Проверка повышения уровня клана (10,000 кредитов за уровень)
                const levelsGained = Math.floor(this.state.clan.treasury / 10000) - (this.state.clan.level - 1);
                if (levelsGained > 0) {
                    this.state.clan.level += levelsGained;
                    this.showNotification(`⚡ Клан повышен до уровня ${this.state.clan.level}!`);
                }
                
                this.updateUI();
                this.showNotification(`💎 Пожертвовано ${this.formatNumber(amount)} кредитов в клан`);
                this.renderClanInfo();
                
                // Добавляем опыт
                this.addXP(2);
                
                // Проверяем достижения
                this.checkAchievements();
                this.saveGame();
            } else {
                this.showNotification('Минимальное пожертвование - 1,000 кредитов');
            }
        });
    }

    checkDailyReward() {
        const today = new Date().toDateString();
        
        if (this.state.lastPlayDate !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (this.state.lastPlayDate === yesterday.toDateString()) {
                this.state.consecutiveDays++;
            } else if (this.state.lastPlayDate !== today) {
                this.state.consecutiveDays = 1;
            }
            
            this.state.lastPlayDate = today;
            
            // Расчет награды (100 * 1.1^consecutiveDays)
            const reward = Math.floor(100 * Math.pow(1.1, this.state.consecutiveDays - 1));
            this.state.credits += reward;
            
            this.showNotification(`🎁 Ежедневная награда: ${this.formatNumber(reward)} кредитов (День ${this.state.consecutiveDays})`);
            this.updateUI();
            this.checkAchievements();
            this.saveGame();
        }
    }

    showNotification(message) {
        this.domElements.notification.textContent = message;
        this.domElements.notification.style.opacity = '1';
        
        setTimeout(() => {
            this.domElements.notification.style.opacity = '0';
        }, 3000);
    }

    saveGame() {
        localStorage.setItem('starWarsClicker', JSON.stringify(this.state));
    }

    loadGame() {
        const savedGame = localStorage.getItem('starWarsClicker');
        if (savedGame) {
            const parsed = JSON.parse(savedGame);
            this.state = parsed;
            
            // Пересчет CPS на случай изменения формулы
            this.state.cps = this.state.upgrades.reduce((total, u) => total + (u.owned * u.cps), 0);
        }
    }
}

// Инициализация игры при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const game = new StarWarsClickerGame();
    
    // Автосохранение каждые 30 секунд
    setInterval(() => {
        game.saveGame();
    }, 30000);
    
    // Сохранение при закрытии страницы
    window.addEventListener('beforeunload', () => {
        game.saveGame();
    });
});
