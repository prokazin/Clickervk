// Extended Game State
const gameState = {
    credits: 0,
    forcePoints: 0,
    clickPower: 1,
    creditsPerSecond: 0,
    level: 1,
    levelNames: ['Padawan', 'Jedi Knight', 'Jedi Master', 'Council Member', 'Grand Master'],
    upgrades: [
        { id: 1, name: 'Droid Helper', description: 'R2 unit helps gather credits', baseCost: 15, power: 0.1, owned: 0 },
        { id: 2, name: 'Credit Generator', description: 'Passive income generator', baseCost: 100, power: 1, owned: 0 },
        { id: 3, name: 'Lightsaber Upgrade', description: 'Increases click power', baseCost: 50, power: 1, owned: 0 },
        { id: 4, name: 'X-Wing Fleet', description: 'Earn credits from missions', baseCost: 500, power: 5, owned: 0 },
        { id: 5, name: 'Force Training', description: 'Increases all income', baseCost: 1000, power: 2, owned: 0, multiplier: true },
        { id: 6, name: 'Death Star Plans', description: 'Secret Imperial data', baseCost: 5000, power: 10, owned: 0 },
        { id: 7, name: 'Kyber Crystal', description: 'Enhances all abilities', baseCost: 10000, power: 5, owned: 0, multiplier: true }
    ],
    bosses: [
        { id: 1, name: 'Darth Maul', health: 1000, reward: 5000, forcePointReward: 5, defeated: false },
        { id: 2, name: 'Darth Vader', health: 5000, reward: 25000, forcePointReward: 25, defeated: false },
        { id: 3, name: 'Emperor Palpatine', health: 25000, reward: 100000, forcePointReward: 100, defeated: false },
        { id: 4, name: 'Kylo Ren', health: 15000, reward: 75000, forcePointReward: 50, defeated: false }
    ],
    currentBoss: null,
    bossHealth: 0,
    clan: null,
    clans: [
        { id: 1, name: 'Rebel Alliance', level: 5, members: ['Player1', 'Player2'], treasury: 15000, created: Date.now() },
        { id: 2, name: 'Jedi Order', level: 3, members: ['Player3'], treasury: 5000, created: Date.now() }
    ],
    dailyReward: {
        lastClaimed: null,
        streak: 0,
        nextReward: 100
    },
    achievements: [
        { id: 1, name: 'First Steps', description: 'Earn 100 credits', reward: 10, target: 100, progress: 0, unlocked: false, icon: 'fa-jedi' },
        { id: 2, name: 'Padawan', description: 'Reach level 2', reward: 20, target: 1, progress: 0, unlocked: false, icon: 'fa-star' },
        { id: 3, name: 'Droid Collector', description: 'Buy 10 droids', reward: 50, target: 10, progress: 0, unlocked: false, icon: 'fa-robot' },
        { id: 4, name: 'Maul Defeated', description: 'Defeat Darth Maul', reward: 100, target: 1, progress: 0, unlocked: false, icon: 'fa-swords' },
        { id: 5, name: 'Veteran', description: 'Reach level 5', reward: 200, target: 5, progress: 0, unlocked: false, icon: 'fa-medal' },
        { id: 6, name: 'Millionaire', description: 'Earn 1,000,000 credits', reward: 500, target: 1000000, progress: 0, unlocked: false, icon: 'fa-coins' },
        { id: 7, name: 'Master Builder', description: 'Own 50 upgrades', reward: 300, target: 50, progress: 0, unlocked: false, icon: 'fa-tools' },
        { id: 8, name: 'Vader\'s Downfall', description: 'Defeat Darth Vader', reward: 400, target: 1, progress: 0, unlocked: false, icon: 'fa-helmet-battle' },
        { id: 9, name: 'Legendary', description: 'Reach level 10', reward: 1000, target: 10, progress: 0, unlocked: false, icon: 'fa-crown' },
        { id: 10, name: 'Clan Leader', description: 'Create or join a clan', reward: 150, target: 1, progress: 0, unlocked: false, icon: 'fa-users' },
        { id: 11, name: 'Generous', description: 'Donate 10,000 credits to clan', reward: 200, target: 10000, progress: 0, unlocked: false, icon: 'fa-hand-holding-heart' },
        { id: 12, name: 'Daily Warrior', description: 'Claim 7 daily rewards', reward: 250, target: 7, progress: 0, unlocked: false, icon: 'fa-calendar-check' },
        { id: 13, name: 'Emperor\'s End', description: 'Defeat Emperor Palpatine', reward: 800, target: 1, progress: 0, unlocked: false, icon: 'fa-skull' },
        { id: 14, name: 'Galactic Hero', description: 'Complete 10 achievements', reward: 500, target: 10, progress: 0, unlocked: false, icon: 'fa-trophy' },
        { id: 15, name: 'The Force is Strong', description: 'Collect 100 Force Points', reward: 1000, target: 100, progress: 0, unlocked: false, icon: 'fa-bolt' }
    ],
    event: {
        active: false,
        name: '',
        effect: '',
        endTime: null
    }
};

// DOM Elements
const creditsDisplay = document.getElementById('credits');
const forcePointsDisplay = document.getElementById('force-points');
const levelDisplay = document.getElementById('level');
const clanInfoDisplay = document.getElementById('clan-info');
const cpsDisplay = document.getElementById('cps');
const clickPowerDisplay = document.getElementById('click-power');
const lightsaber = document.getElementById('lightsaber');
const clickEffect = document.getElementById('click-effect');
const upgradesContainer = document.getElementById('upgrades-container');
const bossesContainer = document.getElementById('bosses-container');
const achievementsContainer = document.getElementById('achievements-container');
const dailyRewardButton = document.getElementById('daily-reward-button');
const dailyStreakDisplay = document.getElementById('daily-streak');
const clanNameInput = document.getElementById('clan-name-input');
const createClanBtn = document.getElementById('create-clan-btn');
const joinClanBtn = document.getElementById('join-clan-btn');
const leaveClanBtn = document.getElementById('leave-clan-btn');
const currentClanName = document.getElementById('current-clan-name');
const clanMembersList = document.getElementById('clan-members');
const clanTreasuryDisplay = document.getElementById('clan-treasury');
const donateBtn = document.getElementById('donate-btn');
const clanLeaderboardBody = document.getElementById('clan-leaderboard-body');
const achievementsCompleted = document.getElementById('achievements-completed');
const achievementsProgress = document.getElementById('achievements-progress');
const eventBanner = document.getElementById('event-banner');

// Tab System
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabName = button.dataset.tab;
        
        // Hide all tabs
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // Deactivate all buttons
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Show selected tab
        document.getElementById(`${tabName}-tab`).classList.add('active');
        button.classList.add('active');
    });
});

// Initialize Game
function initGame() {
    loadGame();
    setupEventListeners();
    renderAll();
    startGameLoop();
    checkDailyReward();
    checkEvent();
}

// Game Loop
function startGameLoop() {
    setInterval(() => {
        // Calculate passive income (with potential event bonus)
        let income = gameState.creditsPerSecond / 10;
        if (gameState.event.active && gameState.event.effect === 'double_credits') {
            income *= 2;
        }
        
        gameState.credits += income;
        updateDisplays();
        saveGame();
    }, 100);
}

// Event Listeners
function setupEventListeners() {
    lightsaber.addEventListener('click', handleClick);
    dailyRewardButton.addEventListener('click', claimDailyReward);
    createClanBtn.addEventListener('click', createClan);
    joinClanBtn.addEventListener('click', joinClan);
    leaveClanBtn.addEventListener('click', leaveClan);
    donateBtn.addEventListener('click', donateToClan);
    
    // Add event listeners for boss buttons dynamically
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

// Click Handler
function handleClick() {
    // Calculate click power (with potential event bonus)
    let power = gameState.clickPower;
    if (gameState.event.active && gameState.event.effect === 'double_click') {
        power *= 2;
    }
    
    // Add credits
    gameState.credits += power;
    
    // Show click effect
    clickEffect.style.animation = 'none';
    void clickEffect.offsetWidth; // Trigger reflow
    clickEffect.style.animation = 'saberGlow 0.5s forwards';
    
    // Random chance for force point
    if (Math.random() < 0.01) {
        gameState.forcePoints += 1;
        checkAchievementProgress(15); // Check "The Force is Strong" achievement
    }
    
    // Check "First Steps" achievement
    if (gameState.credits >= 100 && !gameState.achievements[0].unlocked) {
        checkAchievementProgress(1);
    }
    
    updateDisplays();
    saveGame();
}

// Upgrade System
function buyUpgrade(upgradeId) {
    const upgrade = gameState.upgrades.find(u => u.id === upgradeId);
    const cost = upgrade.baseCost * Math.pow(1.15, upgrade.owned);
    
    if (gameState.credits >= cost) {
        gameState.credits -= cost;
        upgrade.owned += 1;
        
        if (upgrade.multiplier) {
            // This upgrade multiplies other upgrades
            gameState.upgrades.forEach(u => {
                if (u.id !== upgradeId) {
                    u.power *= 1.5;
                }
            });
        } else if (upgrade.id === 3) {
            // Lightsaber upgrade increases click power
            gameState.clickPower += upgrade.power;
        } else {
            // Normal upgrade increases CPS
            gameState.creditsPerSecond += upgrade.power;
        }
        
        // Check achievements
        if (upgrade.id === 1) checkAchievementProgress(3); // Droid Collector
        checkAchievementProgress(7); // Master Builder
        
        // Check for level up
        checkLevelUp();
        updateDisplays();
        renderUpgrades();
        saveGame();
    }
}

// Boss Battles
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
    
    // Damage based on click power and some randomness
    const damage = gameState.clickPower * (0.8 + Math.random() * 0.4);
    gameState.bossHealth -= damage;
    
    if (gameState.bossHealth <= 0) {
        // Boss defeated
        boss.defeated = true;
        gameState.credits += boss.reward;
        gameState.forcePoints += boss.forcePointReward;
        gameState.currentBoss = null;
        
        // Check achievements based on boss defeated
        if (boss.id === 1) checkAchievementProgress(4); // Maul Defeated
        if (boss.id === 2) checkAchievementProgress(8); // Vader's Downfall
        if (boss.id === 3) checkAchievementProgress(13); // Emperor's End
        
        checkLevelUp();
        showNotification(`You defeated ${boss.name}!`, `Reward: ${boss.reward} credits and ${boss.forcePointReward} Force Points`);
    }
    
    updateDisplays();
    renderBosses();
    saveGame();
}

// Clan System
function createClan() {
    const clanName = clanNameInput.value.trim();
    if (!clanName) {
        showNotification('Error', 'Please enter a clan name');
        return;
    }
    
    if (gameState.credits < 5000) {
        showNotification('Error', 'You need 5000 credits to create a clan');
        return;
    }
    
    if (gameState.clan) {
        showNotification('Error', 'You are already in a clan');
        return;
    }
    
    const newClan = {
        id: gameState.clans.length + 1,
        name: clanName,
        level: 1,
        members: ['Player'], // In a real app, this would be the player's name
        treasury: 0,
        created: Date.now()
    };
    
    gameState.clans.push(newClan);
    gameState.clan = newClan.id;
    gameState.credits -= 5000;
    
    // Check clan-related achievements
    checkAchievementProgress(10); // Clan Leader
    
    showNotification('Clan Created', `Welcome to ${clanName}!`);
    updateDisplays();
    renderClanTab();
    saveGame();
}

function joinClan() {
    // In a real implementation, this would show a list of clans to join
    // For simplicity, we'll just join the first available clan
    if (gameState.clan) {
        showNotification('Error', 'You are already in a clan');
        return;
    }
    
    if (gameState.clans.length === 0) {
        showNotification('Error', 'No clans available to join');
        return;
    }
    
    const clanToJoin = gameState.clans[0];
    clanToJoin.members.push('Player'); // Again, would be player's name
    gameState.clan = clanToJoin.id;
    
    // Check clan-related achievements
    checkAchievementProgress(10); // Clan Leader
    
    showNotification('Clan Joined', `Welcome to ${clanToJoin.name}!`);
    updateDisplays();
    renderClanTab();
    saveGame();
}

function leaveClan() {
    if (!gameState.clan) {
        showNotification('Error', 'You are not in a clan');
        return;
    }
    
    const clan = gameState.clans.find(c => c.id === gameState.clan);
    if (clan) {
        clan.members = clan.members.filter(m => m !== 'Player');
        if (clan.members.length === 0) {
            // Remove clan if empty
            gameState.clans = gameState.clans.filter(c => c.id !== gameState.clan);
        }
    }
    
    gameState.clan = null;
    showNotification('Clan Left', 'You have left your clan');
    updateDisplays();
    renderClanTab();
    saveGame();
}

function donateToClan() {
    if (!gameState.clan) {
        showNotification('Error', 'You are not in a clan');
        return;
    }
    
    if (gameState.credits < 1000) {
        showNotification('Error', 'You need at least 1000 credits to donate');
        return;
    }
    
    const clan = gameState.clans.find(c => c.id === gameState.clan);
    if (clan) {
        gameState.credits -= 1000;
        clan.treasury += 1000;
        
        // Check donation achievement
        checkAchievementProgress(11); // Generous
        
        // Clan level up based on treasury
        const newLevel = Math.floor(Math.log10(clan.treasury + 1)) + 1;
        if (newLevel > clan.level) {
            clan.level = newLevel;
            showNotification('Clan Level Up!', `${clan.name} is now level ${newLevel}`);
        }
        
        showNotification('Donation Successful', 'Thank you for your contribution!');
        updateDisplays();
        renderClanTab();
        saveGame();
    }
}

// Daily Reward System
function checkDailyReward() {
    const now = new Date();
    const lastClaimed = gameState.dailyReward.lastClaimed ? new Date(gameState.dailyReward.lastClaimed) : null;
    
    // Reset streak if more than 2 days have passed
    if (lastClaimed) {
        const daysPassed = Math.floor((now - lastClaimed) / (1000 * 60 * 60 * 24));
        if (daysPassed > 1) {
            gameState.dailyReward.streak = 0;
        }
    }
    
    // Check if reward can be claimed today
    if (lastClaimed) {
        const sameDay = now.getDate() === lastClaimed.getDate() && 
                       now.getMonth() === lastClaimed.getMonth() && 
                       now.getFullYear() === lastClaimed.getFullYear();
        
        if (sameDay) {
            dailyRewardButton.disabled = true;
        }
    }
    
    dailyStreakDisplay.textContent = `Streak: ${gameState.dailyReward.streak} days`;
}

function claimDailyReward() {
    const now = new Date();
    const lastClaimed = gameState.dailyReward.lastClaimed ? new Date(gameState.dailyReward.lastClaimed) : null;
    
    // Check if already claimed today
    if (lastClaimed) {
        const sameDay = now.getDate() === lastClaimed.getDate() && 
                       now.getMonth() === lastClaimed.getMonth() && 
                       now.getFullYear() === lastClaimed.getFullYear();
        
        if (sameDay) {
            showNotification('Already Claimed', 'Come back tomorrow!');
            return;
        }
        
        // Check if consecutive day
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
    
    // Calculate reward (increases with streak)
    const reward = gameState.dailyReward.nextReward * (1 + gameState.dailyReward.streak * 0.2);
    gameState.credits += reward;
    gameState.dailyReward.lastClaimed = now.toISOString();
    gameState.dailyReward.nextReward = Math.floor(reward * 1.1);
    
    // Check daily reward achievement
    checkAchievementProgress(12); // Daily Warrior
    
    showNotification('Daily Reward Claimed!', `You received ${Math.floor(reward)} credits! Streak: ${gameState.dailyReward.streak}`);
    dailyRewardButton.disabled = true;
    dailyStreakDisplay.textContent = `Streak: ${gameState.dailyReward.streak} days`;
    saveGame();
}

// Event System
function checkEvent() {
    // 20% chance of an event being active when checking
    if (!gameState.event.active && Math.random() < 0.2) {
        const events = [
            { name: 'Clone Wars', effect: 'double_credits', duration: 24 * 60 * 60 * 1000 }, // 24 hours
            { name: 'Jedi Training', effect: 'double_click', duration: 12 * 60 * 60 * 1000 } // 12 hours
        ];
        
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        gameState.event = {
            active: true,
            name: randomEvent.name,
            effect: randomEvent.effect,
            endTime: Date.now() + randomEvent.duration
        };
        
        showNotification('Special Event!', `${randomEvent.name} has started!`);
    } else if (gameState.event.active && Date.now() > gameState.event.endTime) {
        showNotification('Event Ended', `${gameState.event.name} has concluded.`);
        gameState.event.active = false;
    }
    
    // Show/hide event banner
    if (gameState.event.active) {
        eventBanner.style.display = 'block';
        eventBanner.querySelector('h3').textContent = `Special Event: ${gameState.event.name}`;
        
        let effectText = '';
        if (gameState.event.effect === 'double_credits') {
            effectText = 'Earn double credits!';
        } else if (gameState.event.effect === 'double_click') {
            effectText = 'Double click power!';
        }
        
        eventBanner.querySelector('p').textContent = effectText;
    } else {
        eventBanner.style.display = 'none';
    }
}

// Achievement System
function checkAchievementProgress(achievementId) {
    const achievement = gameState.achievements.find(a => a.id === achievementId);
    if (!achievement || achievement.unlocked) return;
    
    // Update progress based on achievement type
    switch(achievementId) {
        case 1: // First Steps
            achievement.progress = Math.min(gameState.credits, achievement.target);
            break;
        case 2: // Padawan
            achievement.progress = gameState.level >= achievement.target ? 1 : 0;
            break;
        case 3: // Droid Collector
            const droidUpgrade = gameState.upgrades.find(u => u.id === 1);
            achievement.progress = Math.min(droidUpgrade.owned, achievement.target);
            break;
        case 4: // Maul Defeated
            achievement.progress = gameState.bosses[0].defeated ? 1 : 0;
            break;
        case 5: // Veteran
            achievement.progress = gameState.level >= achievement.target ? 1 : 0;
            break;
        case 6: // Millionaire
            achievement.progress = Math.min(gameState.credits, achievement.target);
            break;
        case 7: // Master Builder
            const totalUpgrades = gameState.upgrades.reduce((sum, u) => sum + u.owned, 0);
            achievement.progress = Math.min(totalUpgrades, achievement.target);
            break;
        case 8: // Vader's Downfall
            achievement.progress = gameState.bosses[1].defeated ? 1 : 0;
            break;
        case 9: // Legendary
            achievement.progress = gameState.level >= achievement.target ? 1 : 0;
            break;
        case 10: // Clan Leader
            achievement.progress = gameState.clan ? 1 : 0;
            break;
        case 11: // Generous
            // This would track total donations, simplified for example
            achievement.progress = Math.min(1000, achievement.target); // Simplified
            break;
        case 12: // Daily Warrior
            achievement.progress = Math.min(gameState.dailyReward.streak, achievement.target);
            break;
        case 13: // Emperor's End
            achievement.progress = gameState.bosses[2].defeated ? 1 : 0;
            break;
        case 14: // Galactic Hero
            const completed = gameState.achievements.filter(a => a.unlocked).length;
            achievement.progress = Math.min(completed, achievement.target);
            break;
        case 15: // The Force is Strong
            achievement.progress = Math.min(gameState.forcePoints, achievement.target);
            break;
    }
    
    // Check if achievement is completed
    if (achievement.progress >= achievement.target) {
        achievement.unlocked = true;
        gameState.credits += achievement.reward;
        
        // Special case for Galactic Hero achievement
        if (achievementId === 14) {
            checkAchievementProgress(14); // This will update its own progress
        }
        
        showNotification('Achievement Unlocked!', `${achievement.name}: ${achievement.reward} credits!`);
        renderAchievements();
    }
    
    saveGame();
}

// Level System
function checkLevelUp() {
    const newLevel = Math.floor(Math.log10(gameState.credits + 1)) + 1;
    if (newLevel > gameState.level) {
        gameState.level = newLevel;
        // Reward for leveling up
        gameState.forcePoints += 2;
        
        // Check level-based achievements
        if (newLevel >= 2) checkAchievementProgress(2); // Padawan
        if (newLevel >= 5) checkAchievementProgress(5); // Veteran
        if (newLevel >= 10) checkAchievementProgress(9); // Legendary
        
        showNotification('Level Up!', `You are now ${gameState.levelNames[Math.min(gameState.level - 1, gameState.levelNames.length - 1)] || 'Jedi Master'}!`);
    }
}

// Rendering Functions
function renderAll() {
    renderUpgrades();
    renderBosses();
    renderClanTab();
    renderAchievements();
    updateDisplays();
}

function renderUpgrades() {
    upgradesContainer.innerHTML = '';
    gameState.upgrades.forEach(upgrade => {
        const cost = upgrade.baseCost * Math.pow(1.15, upgrade.owned);
        const upgradeElement = document.createElement('div');
        upgradeElement.className = 'upgrade';
        upgradeElement.innerHTML = `
            <h3>${upgrade.name}</h3>
            <p>${upgrade.description}</p>
            <p>Owned: ${upgrade.owned}</p>
            <p>Power: +${upgrade.power.toFixed(1)}</p>
            <p>Cost: ${Math.floor(cost)} credits</p>
            <button class="buy-upgrade" data-upgrade-id="${upgrade.id}" 
                    ${gameState.credits < cost ? 'disabled' : ''}>
                Buy
            </button>
        `;
        upgradesContainer.appendChild(upgradeElement);
    });
}

function renderBosses() {
    bossesContainer.innerHTML = '';
    gameState.bosses.forEach(boss => {
        const bossElement = document.createElement('div');
        bossElement.className = 'boss';
        
        if (boss.defeated) {
            bossElement.innerHTML = `
                <h3>${boss.name}</h3>
                <p>DEFEATED</p>
                <p>Reward: ${boss.reward} credits</p>
                <button disabled>Victory!</button>
            `;
        } else {
            const inProgress = gameState.currentBoss && gameState.currentBoss.id === boss.id;
            
            bossElement.innerHTML = `
                <h3>${boss.name}</h3>
                <p>Health: ${inProgress ? Math.max(0, gameState.bossHealth) : boss.health}</p>
                <p>Reward: ${boss.reward} credits</p>
                <p>Force Points: ${boss.forcePointReward}</p>
                <button class="fight-boss" data-boss-id="${boss.id}">
                    ${inProgress ? 'ATTACK!' : 'Start Battle'}
                </button>
                ${inProgress ? `<progress value="${gameState.bossHealth}" max="${boss.health}"></progress>` : ''}
            `;
        }
        
        bossesContainer.appendChild(bossElement);
    });
}

function renderClanTab() {
    // Current clan info
    if (gameState.clan) {
        const clan = gameState.clans.find(c => c.id === gameState.clan);
        if (clan) {
            currentClanName.textContent = clan.name;
            clanInfoDisplay.textContent = `Clan: ${clan.name} (Lvl ${clan.level})`;
            
            // Clan members
            clanMembersList.innerHTML = '';
            clan.members.forEach(member => {
                const memberElement = document.createElement('div');
                memberElement.className = 'clan-member';
                memberElement.textContent = member;
                clanMembersList.appendChild(memberElement);
            });
            
            clanTreasuryDisplay.textContent = `Treasury: ${clan.treasury} credits`;
            
            // Show leave button, hide join/create
            leaveClanBtn.style.display = 'inline-block';
            joinClanBtn.style.display = 'none';
            createClanBtn.style.display = 'none';
            clanNameInput.style.display = 'none';
        }
    } else {
        currentClanName.textContent = 'None';
        clanInfoDisplay.textContent = 'Clan: None';
        clanMembersList.innerHTML = '<p>Join a clan to see members</p>';
        clanTreasuryDisplay.textContent = 'Treasury: 0 credits';
        
        // Show join/create buttons, hide leave
        leaveClanBtn.style.display = 'none';
        joinClanBtn.style.display = 'inline-block';
        createClanBtn.style.display = 'inline-block';
        clanNameInput.style.display = 'inline-block';
    }
    
    // Clan leaderboard
    clanLeaderboardBody.innerHTML = '';
    // Sort clans by level, then treasury
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
        clanLeaderboardBody.appendChild(row);
    });
}

function renderAchievements() {
    achievementsContainer.innerHTML = '';
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
                <h4>${achievement.name} ${achievement.unlocked ? '✓' : ''}</h4>
                <p>${achievement.description}</p>
                <p>Reward: ${achievement.reward} credits</p>
                ${!achievement.unlocked ? `
                    <div class="achievement-progress">
                        <div class="achievement-progress-bar" style="width: ${progressPercent}%"></div>
                    </div>
                    <small>${Math.min(achievement.progress, achievement.target)}/${achievement.target}</small>
                ` : ''}
            </div>
        `;
        
        achievementsContainer.appendChild(achievementElement);
        if (achievement.unlocked) completedCount++;
    });
    
    // Update achievements progress
    achievementsCompleted.textContent = completedCount;
    achievementsProgress.style.width = `${(completedCount / gameState.achievements.length) * 100}%`;
}

function updateDisplays() {
    creditsDisplay.textContent = `Credits: ${Math.floor(gameState.credits)}`;
    forcePointsDisplay.textContent = `Force Points: ${gameState.forcePoints}`;
    cpsDisplay.textContent = `Credits per second: ${gameState.creditsPerSecond.toFixed(1)}`;
    clickPowerDisplay.textContent = `Click power: ${gameState.clickPower.toFixed(1)}`;
    
    const levelName = gameState.levelNames[Math.min(gameState.level - 1, gameState.levelNames.length - 1)] || 'Jedi Master';
    levelDisplay.textContent = `Level: ${levelName} (${gameState.level})`;
    
    // Update clan info if in clan
    if (gameState.clan) {
        const clan = gameState.clans.find(c => c.id === gameState.clan);
        if (clan) {
            clanInfoDisplay.textContent = `Clan: ${clan.name} (Lvl ${clan.level})`;
        }
    }
}

// Notification System
function showNotification(title, message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <strong>${title}</strong>
        <p>${message}</p>
    `;
    
    const container = document.getElementById('notification-container');
    container.appendChild(notification);
    
    // Remove notification after animation
    setTimeout(() => {
        notification.remove();
    }, 3500);
}

// Save/Load System
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

// Start the game
window.onload = initGame;
