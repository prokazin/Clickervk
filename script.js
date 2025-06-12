// Игровые переменные
let points = 0;
let upgrades = {
    click: { level: 0, power: 0 },
    auto: { level: 0, power: 0 },
    critical: { level: 0, power: 0 }
};
let comboActive = false;
let comboCooldown = false;

// Инициализация
loadGame();
updateUI();

// Клик по мечу
document.getElementById('lightsaber').addEventListener('click', handleClick);

// Автокликер
setInterval(autoClick, 1000);

// Обработка клика
function handleClick() {
    let earned = 1 + upgrades.click.power;
    
    if (Math.random() * 100 < upgrades.critical.power) {
        earned *= 3;
        showFloatingText("КРИТ! +" + earned, this);
    }
    
    if (comboActive) earned *= 2;
    
    points += earned;
    updateUI();
    animateClick(this);
    saveGame();
}

// Автоклик
function autoClick() {
    if (upgrades.auto.power > 0) {
        points += upgrades.auto.power;
        updateUI();
        saveGame();
    }
}

// Покупка улучшений
document.querySelectorAll('.upgrade-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const type = this.dataset.type;
        const cost = parseInt(this.querySelector('.cost').textContent);
        
        if (points >= cost) {
            points -= cost;
            
            if (type === 'click' || type === 'auto') {
                const level = parseInt(this.dataset.level);
                upgrades[type].level = level;
                upgrades[type].power = parseInt(this.dataset.power);
                this.disabled = true;
            } 
            else if (type === 'combo' && !comboCooldown) {
                activateCombo();
                startCooldown(this);
            }
            else if (type === 'critical') {
                upgrades.critical.power += parseInt(this.dataset.power);
                this.querySelector('.power').textContent = upgrades.critical.power;
                if (upgrades.critical.power >= 50) this.disabled = true;
            }
            
            updateUI();
            saveGame();
        }
    });
});

// Активация комбо
function activateCombo() {
    comboActive = true;
    setTimeout(() => {
        comboActive = false;
    }, 10000);
}

// КД для комбо
function startCooldown(btn) {
    comboCooldown = true;
    let timeLeft = 30;
    const cooldownBar = btn.parentElement.querySelector('.cooldown');
    
    const interval = setInterval(() => {
        timeLeft--;
        cooldownBar.style.width = (timeLeft/30)*100 + '%';
        
        if (timeLeft <= 0) {
            clearInterval(interval);
            comboCooldown = false;
            btn.disabled = false;
            cooldownBar.style.width = '0%';
        }
    }, 1000);
}

// Обновление интерфейса
function updateUI() {
    document.getElementById('points').textContent = points;
    
    document.querySelectorAll('.upgrade-btn').forEach(btn => {
        const type = btn.dataset.type;
        const cost = btn.querySelector('.cost');
        
        if (cost) {
            const baseCost = parseInt(btn.dataset.baseCost);
            cost.textContent = baseCost + (upgrades[type]?.level || 0) * 50;
        }
        
        btn.disabled = points < parseInt(btn.querySelector('.cost')?.textContent || '999999');
    });
}

// Анимации
function animateClick(element) {
    element.classList.add('pulse');
    setTimeout(() => {
        element.classList.remove('pulse');
    }, 300);
}

function showFloatingText(text, parent) {
    const floatText = document.createElement('div');
    floatText.className = 'floating-text';
    floatText.textContent = text;
    parent.appendChild(floatText);
    
    setTimeout(() => {
        floatText.remove();
    }, 1000);
}

// Сохранение/загрузка
function saveGame() {
    localStorage.setItem('swClickerSave', JSON.stringify({
        points,
        upgrades
    }));
}

function loadGame() {
    const saved = localStorage.getItem('swClickerSave');
    if (saved) {
        const data = JSON.parse(saved);
        points = data.points || 0;
        upgrades = data.upgrades || {
            click: { level: 0, power: 0 },
            auto: { level: 0, power: 0 },
            critical: { level: 0, power: 0 }
        };
    }
}

// Переключение табов
document.querySelectorAll('.tab-button').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab-button').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
    });
});
