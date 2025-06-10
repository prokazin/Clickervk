// Game State
const game = {
    credits: 0,
    creditsPerSecond: 0,
    upgrades: [
        { id: 1, count: 0, cost: 10, power: 1 },
        { id: 2, count: 0, cost: 50, power: 5 }
    ],
    lastUpdate: Date.now()
};

// DOM Elements
const elements = {
    credits: document.getElementById('credits'),
    clickBtn: document.getElementById('click-btn'),
    jediLevel: document.getElementById('jedi-level')
};

// Initialize
function init() {
    loadGame();
    setupEventListeners();
    requestAnimationFrame(gameLoop);
    
    // Auto-save every 30 seconds
    setInterval(saveGame, 30000);
}

// Event Listeners
function setupEventListeners() {
    elements.clickBtn.addEventListener('click', handleClick);
    
    document.getElementById('upgrade1').addEventListener('click', () => buyUpgrade(0));
    document.getElementById('upgrade2').addEventListener('click', () => buyUpgrade(1));
}

// Game Logic
function handleClick() {
    game.credits++;
    updateUI();
}

function buyUpgrade(index) {
    const upgrade = game.upgrades[index];
    
    if (game.credits >= upgrade.cost) {
        game.credits -= upgrade.cost;
        upgrade.count++;
        upgrade.cost = Math.floor(upgrade.cost * 1.15);
        
        game.creditsPerSecond = game.upgrades.reduce((sum, u) => sum + (u.count * u.power), 0);
        updateUI();
    }
}

// Game Loop
function gameLoop() {
    const now = Date.now();
    const delta = (now - game.lastUpdate) / 1000;
    
    if (delta >= 0.1) {
        game.credits += game.creditsPerSecond * delta;
        game.lastUpdate = now;
        updateUI();
    }
    
    requestAnimationFrame(gameLoop);
}

// UI Update
function updateUI() {
    elements.credits.textContent = Math.floor(game.credits);
    
    // Update upgrades info
    game.upgrades.forEach((upgrade, i) => {
        document.getElementById(`upgrade${i+1}-count`).textContent = upgrade.count;
        document.getElementById(`upgrade${i+1}-cost`).textContent = upgrade.cost;
    });
    
    // Update level
    const totalUpgrades = game.upgrades.reduce((sum, u) => sum + u.count, 0);
    elements.jediLevel.textContent = `(Уровень ${Math.floor(totalUpgrades / 3) + 1})`;
}

// Save/Load
function saveGame() {
    localStorage.setItem('swClickerSave', JSON.stringify(game));
}

function loadGame() {
    const saved = localStorage.getItem('swClickerSave');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            Object.assign(game, data);
            game.creditsPerSecond = game.upgrades.reduce((sum, u) => sum + (u.count * u.power), 0);
        } catch (e) {
            console.error('Failed to load save', e);
        }
    }
}

// Start Game
window.addEventListener('DOMContentLoaded', init);
