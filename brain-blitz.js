// ==================== ACCOUNT SYSTEM ====================
// Global error logging for debug
window.addEventListener('error', function(event) {
    console.error('Global JS Error:', event.message, 'at', event.filename + ':' + event.lineno + ':' + event.colno);
    const errorBox = document.getElementById('parseError');
    if (errorBox) {
        errorBox.style.color = 'red';
        errorBox.textContent = `JavaScript error: ${event.message} (see console)`;
    }
});

// Cheat codes for exclusive access
const CHEAT_CODES = {
    '1267': { // Original creator code - UNLOCKS EVERYTHING
        name: 'Creator Access - FULL UNLOCK',
        exclusiveSkins: ['default', 'gold', 'fire', 'forest', 'ocean', 'royal', 'neon', 'sunset', 'glacier', 'shadow', 'creator_gold', 'creator_rainbow', 'creator_diamond', 'god_gold', 'god_rainbow', 'diamond_skin', 'victory_crown', 'legendary_dragon', 'legendary_phoenix', 'cosmic_nebula', 'arctic_ice', 'volcanic_lava', 'galaxy_spiral', 'electric_storm', 'ocean_depths', 'forest_spirit', 'cyber_matrix', 'sunset_horizon', 'midnight_moon', 'desert_sand', 'rainbow_unicorn', 'steampunk_gear'],
        exclusivePerks: ['double_points', 'shield', 'speed_boost', 'lucky', 'god_mode', 'infinite_coins', 'instant_win', 'time_freeze', 'auto_answer', 'score_multiplier'],
        bonusCurrency: 999999,
        bonusPoints: 999999
    },
    'GODMODE': {
        name: 'God Mode',
        exclusiveSkins: ['god_gold', 'god_rainbow'],
        exclusivePerks: ['god_mode', 'infinite_coins'],
        bonusCurrency: 5000,
        bonusPoints: 25000
    },
    'RICH': {
        name: 'Infinite Wealth',
        exclusiveSkins: ['diamond_skin'],
        exclusivePerks: ['infinite_coins'],
        bonusCurrency: 100000,
        bonusPoints: 10000
    },
    'WINNER': {
        name: 'Instant Victory',
        exclusiveSkins: ['victory_crown'],
        exclusivePerks: ['instant_win'],
        bonusCurrency: 2000,
        bonusPoints: 15000
    },
    'LEGEND': {
        name: 'Legendary',
        exclusiveSkins: ['legendary_dragon', 'legendary_phoenix'],
        exclusivePerks: ['god_mode', 'infinite_coins', 'instant_win'],
        bonusCurrency: 25000,
        bonusPoints: 75000
    }
};

// Function to generate skin preview styles
function getSkinPreviewStyle(skin) {
    let style = `width: 60px; height: 60px; margin: 10px auto; position: relative; overflow: hidden;`;

    // Base background
    if (skin.color.includes('gradient') || skin.color.includes('radial')) {
        style += `background: ${skin.color};`;
    } else {
        style += `background-color: ${skin.color};`;
    }

    // Add pattern overlays
    if (skin.pattern) {
        switch (skin.pattern) {
            case 'stripes':
                style += `background-image: repeating-linear-gradient(45deg, transparent, transparent 5px, ${skin.patternColor} 5px, ${skin.patternColor} 10px);`;
                break;
            case 'checkers':
                style += `background-image: linear-gradient(45deg, ${skin.patternColor} 25%, transparent 25%), linear-gradient(-45deg, ${skin.patternColor} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${skin.patternColor} 75%), linear-gradient(-45deg, transparent 75%, ${skin.patternColor} 75%); background-size: 10px 10px; background-position: 0 0, 0 5px, 5px -5px, -5px 0px;`;
                break;
            case 'dots':
                style += `background-image: radial-gradient(circle, ${skin.patternColor} 2px, transparent 2px); background-size: 8px 8px;`;
                break;
            case 'zigzag':
                style += `background-image: repeating-linear-gradient(45deg, ${skin.patternColor}, ${skin.patternColor} 2px, transparent 2px, transparent 4px);`;
                break;
        }
    }

    // Add shape masks
    if (skin.shape) {
        switch (skin.shape) {
            case 'star':
                style += `clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);`;
                break;
            case 'heart':
                style += `clip-path: polygon(50% 0%, 100% 35%, 100% 100%, 50% 100%, 0% 100%, 0% 35%); border-radius: 50% 50% 0 0;`;
                break;
            case 'diamond':
                style += `clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);`;
                break;
            case 'circle':
                style += `border-radius: 50%;`;
                break;
            case 'hexagon':
                style += `clip-path: polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%);`;
                break;
        }
    } else {
        style += `border-radius: 5px;`;
    }

    // Add animations
    if (skin.animation) {
        switch (skin.animation) {
            case 'pulse':
                style += `animation: pulse 2s infinite;`;
                break;
            case 'rotate':
                style += `animation: rotate 3s linear infinite;`;
                break;
            case 'shimmer':
                style += `animation: shimmer 2s ease-in-out infinite alternate;`;
                break;
            case 'glow':
                style += `animation: glow 2s ease-in-out infinite alternate; box-shadow: 0 0 10px ${skin.color};`;
                break;
        }
    }

    return style;
}
const SKINS = {
    // Regular skins
    'default': { name: 'Blue Square', color: '#667eea', price: 0, unlocked: true, category: 'regular' },
    'gold': { name: 'Gold Star', color: '#FFD700', price: 500, category: 'regular' },
    'fire': { name: 'Flame', color: '#FF4500', price: 750, category: 'regular' },
    'forest': { name: 'Forest Green', color: '#228B22', price: 600, category: 'regular' },
    'ocean': { name: 'Ocean Blue', color: '#0077BE', price: 700, category: 'regular' },
    'royal': { name: 'Royal Purple', color: '#7851A9', price: 550, category: 'regular' },
    'neon': { name: 'Neon Pink', color: '#FF006E', price: 800, category: 'regular' },
    'sunset': { name: 'Sunset Orange', color: '#FF6B35', price: 650, category: 'regular' },
    'glacier': { name: 'Glacier White', color: '#E0E0E0', price: 500, category: 'regular' },
    'shadow': { name: 'Shadow Black', color: '#2A2A2A', price: 400, category: 'regular' },

    // Exclusive skins (creator code only)
    'creator_gold': { name: 'Creator Gold ✨', color: 'linear-gradient(45deg, #FFD700, #FFA500)', price: 0, category: 'exclusive', exclusive: true },
    'creator_rainbow': { name: 'Creator Rainbow 🌈', color: 'linear-gradient(45deg, #FF0000, #FF7F00, #FFFF00, #00FF00, #0000FF, #4B0082, #9400D3)', price: 0, category: 'exclusive', exclusive: true },
    'creator_diamond': { name: 'Creator Diamond 💎', color: 'linear-gradient(45deg, #B9F2FF, #4A90E2, #7B68EE)', price: 0, category: 'exclusive', exclusive: true },
    'god_gold': { name: 'God Gold 👑', color: 'linear-gradient(45deg, #FFD700, #FFFFFF, #FFD700)', price: 0, category: 'exclusive', exclusive: true },
    'god_rainbow': { name: 'God Rainbow ⚡', color: 'linear-gradient(45deg, #FF0000, #FF7F00, #FFFF00, #00FF00, #0000FF, #8A2BE2)', price: 0, category: 'exclusive', exclusive: true },
    'diamond_skin': { name: 'Diamond Skin 💎', color: 'linear-gradient(45deg, #E0FFFF, #87CEEB, #4682B4)', price: 0, category: 'exclusive', exclusive: true },
    'victory_crown': { name: 'Victory Crown 🏆', color: 'linear-gradient(45deg, #FFD700, #FF6347, #FFD700)', price: 0, category: 'exclusive', exclusive: true },
    'legendary_dragon': { name: 'Legendary Dragon 🐉', color: 'linear-gradient(45deg, #8B0000, #FF4500, #FFD700)', price: 0, category: 'exclusive', exclusive: true },
    'legendary_phoenix': { name: 'Legendary Phoenix 🔥', color: 'linear-gradient(45deg, #FF4500, #FFFF00, #FF69B4)', price: 0, category: 'exclusive', exclusive: true },
    'cosmic_nebula': { name: 'Cosmic Nebula 🌌', color: 'linear-gradient(45deg, #4B0082, #8A2BE2, #DA70D6, #FF69B4)', price: 0, category: 'exclusive', exclusive: true },
    'arctic_ice': { name: 'Arctic Ice ❄️', color: 'linear-gradient(45deg, #E0FFFF, #B0E0E6, #87CEEB, #4682B4)', price: 0, category: 'exclusive', exclusive: true },
    'volcanic_lava': { name: 'Volcanic Lava 🌋', color: 'linear-gradient(45deg, #8B0000, #FF4500, #FFD700, #FFA500)', price: 0, category: 'exclusive', exclusive: true },
    'galaxy_spiral': { name: 'Galaxy Spiral 🌀', color: 'linear-gradient(45deg, #000000, #4B0082, #8A2BE2, #FF69B4, #FFFF00)', price: 0, category: 'exclusive', exclusive: true },
    'electric_storm': { name: 'Electric Storm ⚡', color: 'linear-gradient(45deg, #FFFF00, #FFA500, #FF6347, #DC143C)', price: 0, category: 'exclusive', exclusive: true },
    'ocean_depths': { name: 'Ocean Depths 🌊', color: 'linear-gradient(45deg, #000080, #0000FF, #4169E1, #00BFFF)', price: 0, category: 'exclusive', exclusive: true },
    'forest_spirit': { name: 'Forest Spirit 🌿', color: 'linear-gradient(45deg, #006400, #228B22, #32CD32, #90EE90)', price: 0, category: 'exclusive', exclusive: true },
    'cyber_matrix': { name: 'Cyber Matrix 🔮', color: 'linear-gradient(45deg, #00FF00, #000000, #00FF00, #FFFFFF)', price: 0, category: 'exclusive', exclusive: true },
    'sunset_horizon': { name: 'Sunset Horizon 🌅', color: 'linear-gradient(45deg, #FF6347, #FF4500, #FFD700, #FFA500)', price: 0, category: 'exclusive', exclusive: true },
    'midnight_moon': { name: 'Midnight Moon 🌙', color: 'linear-gradient(45deg, #191970, #4169E1, #E6E6FA, #F8F8FF)', price: 0, category: 'exclusive', exclusive: true },
    'desert_sand': { name: 'Desert Sand 🏜️', color: 'linear-gradient(45deg, #F4A460, #DEB887, #D2B48C, #BC8F8F)', price: 0, category: 'exclusive', exclusive: true },
    'rainbow_unicorn': { name: 'Rainbow Unicorn 🦄', color: 'linear-gradient(45deg, #FF0000, #FF7F00, #FFFF00, #00FF00, #0000FF, #4B0082, #9400D3, #FF69B4)', price: 0, category: 'exclusive', exclusive: true },
    'steampunk_gear': { name: 'Steampunk Gear ⚙️', color: 'linear-gradient(45deg, #8B4513, #A0522D, #CD853F, #DAA520)', price: 0, category: 'exclusive', exclusive: true },

    // Enhanced customization skins with patterns and effects
    'striped_blue': { name: 'Striped Blue', color: '#667eea', pattern: 'stripes', patternColor: '#4a5fc1', price: 300, category: 'pattern' },
    'striped_red': { name: 'Striped Red', color: '#FF4500', pattern: 'stripes', patternColor: '#cc3300', price: 300, category: 'pattern' },
    'checkered_gold': { name: 'Checkered Gold', color: '#FFD700', pattern: 'checkers', patternColor: '#b8860b', price: 400, category: 'pattern' },
    'dotted_pink': { name: 'Dotted Pink', color: '#FF006E', pattern: 'dots', patternColor: '#cc0055', price: 350, category: 'pattern' },
    'zigzag_green': { name: 'Zigzag Green', color: '#228B22', pattern: 'zigzag', patternColor: '#006400', price: 375, category: 'pattern' },

    // Animated skins
    'pulsing_neon': { name: 'Pulsing Neon', color: '#FF006E', animation: 'pulse', price: 500, category: 'animated' },
    'rotating_rainbow': { name: 'Rotating Rainbow 🌈', color: 'linear-gradient(45deg, #FF0000, #FF7F00, #FFFF00, #00FF00, #0000FF, #4B0082, #9400D3)', animation: 'rotate', price: 600, category: 'animated' },
    'shimmering_gold': { name: 'Shimmering Gold ✨', color: '#FFD700', animation: 'shimmer', price: 550, category: 'animated' },
    'glowing_cyan': { name: 'Glowing Cyan', color: '#00FFFF', animation: 'glow', price: 450, category: 'animated' },

    // Shape-based skins
    'star_shape': { name: 'Star Shape ⭐', color: '#FFD700', shape: 'star', price: 425, category: 'shaped' },
    'heart_shape': { name: 'Heart Shape ❤️', color: '#FF006E', shape: 'heart', price: 425, category: 'shaped' },
    'diamond_shape': { name: 'Diamond Shape 💎', color: '#B9F2FF', shape: 'diamond', price: 425, category: 'shaped' },
    'circle_gradient': { name: 'Circle Gradient', color: 'radial-gradient(circle, #667eea, #764ba2)', shape: 'circle', price: 400, category: 'shaped' },
    'hexagon_pattern': { name: 'Hexagon Pattern', color: '#228B22', shape: 'hexagon', price: 475, category: 'shaped' },
};

// Enhanced Perks database with exclusive items
const PERKS = {
    // Regular perks
    'double_points': { name: 'Double Points', description: '+100% points earned', price: 2000, category: 'regular' },
    'shield': { name: 'Shield', description: 'Reduce damage by 20%', price: 1500, category: 'regular' },
    'speed_boost': { name: 'Speed Boost', description: '+30% movement speed', price: 1200, category: 'regular' },
    'lucky': { name: 'Lucky Streak', description: '+50 bonus points for 5 correct answers', price: 1800, category: 'regular' },

    // Exclusive perks (cheat code only)
    'god_mode': { name: 'God Mode 👑', description: 'Invincible + unlimited time + auto-correct answers', price: 0, category: 'exclusive', exclusive: true },
    'infinite_coins': { name: 'Infinite Coins 💰', description: 'Earn unlimited coins from all games', price: 0, category: 'exclusive', exclusive: true },
    'instant_win': { name: 'Instant Win ⚡', description: 'Automatically win any game instantly', price: 0, category: 'exclusive', exclusive: true },
    'time_freeze': { name: 'Time Freeze ⏰', description: 'Stop time during questions', price: 0, category: 'exclusive', exclusive: true },
    'auto_answer': { name: 'Auto Answer 🤖', description: 'Automatically select correct answers', price: 0, category: 'exclusive', exclusive: true },
    'score_multiplier': { name: 'Score Multiplier ×10', description: 'Multiply all scores by 10', price: 0, category: 'exclusive', exclusive: true },
};

// Account data structure
function createNewAccount(username) {
    return {
        username: username,
        level: 1,
        points: 0,
        currency: 0,
        skin: 'default',
        ownedSkins: ['default'],
        perks: [],
        ownedPerks: [],
        totalScore: 0,
        gamesPlayed: 0,
        unlockedCheats: [], // Track which cheat codes have been used
        createdAt: new Date().toISOString(),
    };
}

// Apply cheat code rewards
function applyCheatCode(username, cheatCode) {
    if (!CHEAT_CODES[cheatCode]) {
        return { success: false, message: 'Invalid cheat code!' };
    }

    if (!accounts[username]) {
        return { success: false, message: 'Account not found!' };
    }

    const account = accounts[username];
    const cheatData = CHEAT_CODES[cheatCode];

    // Check if cheat code already used
    if (account.unlockedCheats.includes(cheatCode)) {
        return { success: false, message: 'Cheat code already used!' };
    }

    // Apply rewards
    account.currency += cheatData.bonusCurrency;
    account.points += cheatData.bonusPoints;
    account.level = Math.floor(account.points / 10000) + 1;

    // Unlock exclusive skins
    if (cheatData.exclusiveSkins) {
        cheatData.exclusiveSkins.forEach(skinId => {
            if (!account.ownedSkins.includes(skinId)) {
                account.ownedSkins.push(skinId);
            }
        });
    }

    // Unlock exclusive perks
    if (cheatData.exclusivePerks) {
        cheatData.exclusivePerks.forEach(perkId => {
            if (!account.ownedPerks.includes(perkId)) {
                account.ownedPerks.push(perkId);
            }
        });
    }

    // Mark cheat as used
    account.unlockedCheats.push(cheatCode);

    saveAccounts();
    return {
        success: true,
        message: `🎉 ${cheatData.name} activated!\n+${cheatData.bonusCurrency} coins\n+${cheatData.bonusPoints} points\nUnlocked exclusive skins and perks!`
    };
}

// Load accounts from localStorage
function loadAccounts() {
    const saved = localStorage.getItem('blooketAccounts');
    if (saved) {
        accounts = JSON.parse(saved);
    }
}

// Save accounts to localStorage
function saveAccounts() {
    localStorage.setItem('blooketAccounts', JSON.stringify(accounts));
}

// Load current account
function loadCurrentAccount() {
    const saved = localStorage.getItem('currentAccount');
    if (saved) {
        currentAccount = JSON.parse(saved);
    }
}

// Save current account
function saveCurrentAccount() {
    if (currentAccount) {
        localStorage.setItem('currentAccount', JSON.stringify(currentAccount));
        accounts[currentAccount.username] = currentAccount;
        saveAccounts();
    }
}

// Register new account
function registerAccount(username, password) {
    if (accounts[username]) {
        return { success: false, message: 'Username already exists!' };
    }
    if (username.length < 3) {
        return { success: false, message: 'Username must be at least 3 characters!' };
    }
    accounts[username] = createNewAccount(username);
    accounts[username].password = password; // Simple storage (in real app, use hashing)
    saveAccounts();
    return { success: true, message: 'Account created! Please log in.' };
}

// Login account
function loginAccount(username, password) {
    if (!accounts[username]) {
        return { success: false, message: 'Account not found!' };
    }
    if (accounts[username].password !== password) {
        return { success: false, message: 'Incorrect password!' };
    }
    currentAccount = accounts[username];
    saveCurrentAccount();
    return { success: true };
}

// Redeem cheat code
function redeemCheatCode(cheatCode) {
    if (!currentAccount) {
        return { success: false, message: 'Not logged in!' };
    }

    const result = applyCheatCode(currentAccount.username, cheatCode.toUpperCase());
    if (result.success) {
        // Reload current account data
        currentAccount = accounts[currentAccount.username];
        saveCurrentAccount();
    }
    return result;
}

// Add currency to account
function addCurrency(amount) {
    if (currentAccount) {
        currentAccount.currency += amount;
        saveCurrentAccount();
    }
}

// Add points to account
function addPoints(points) {
    if (currentAccount) {
        currentAccount.points += points;
        currentAccount.totalScore += points;
        // Level up every 10,000 points
        currentAccount.level = Math.floor(currentAccount.points / 10000) + 1;
        saveCurrentAccount();
    }
}

// Purchase skin
function purchaseSkin(skinId) {
    if (!currentAccount) return { success: false, message: 'Not logged in!' };
    if (currentAccount.ownedSkins.includes(skinId)) {
        return { success: false, message: 'Already owned!' };
    }
    const cost = SKINS[skinId].price;
    if (currentAccount.currency < cost) {
        return { success: false, message: `Need ${cost - currentAccount.currency} more coins!` };
    }
    currentAccount.currency -= cost;
    currentAccount.ownedSkins.push(skinId);
    saveCurrentAccount();
    return { success: true, message: 'Skin purchased!' };
}

// Equip skin
function equipSkin(skinId) {
    if (!currentAccount) return false;
    if (!currentAccount.ownedSkins.includes(skinId)) return false;
    currentAccount.skin = skinId;
    saveCurrentAccount();
    return true;
}

// Purchase perk
function purchasePerk(perkId) {
    if (!currentAccount) return { success: false, message: 'Not logged in!' };
    if (currentAccount.ownedPerks.includes(perkId)) {
        return { success: false, message: 'Already owned!' };
    }
    const cost = PERKS[perkId].price;
    if (currentAccount.currency < cost) {
        return { success: false, message: `Need ${cost - currentAccount.currency} more coins!` };
    }
    currentAccount.currency -= cost;
    currentAccount.ownedPerks.push(perkId);
    saveCurrentAccount();
    return { success: true, message: 'Perk purchased!' };
}

// ==================== GAME STATE ====================
let quizzes = [];
let currentQuiz = null;
let currentGameMode = null; // 'tower', 'quiz', 'speedrun', 'survivor', 'memory', 'flashcard', 'onlyup'
let currentGameType = null; // 'solo' or 'public'
let formQuestions = []; // For form builder mode
let publicGames = {}; // Store active public games
let currentGameId = null; // Current multiplayer game ID

let gameState = {
    currentQuestion: 0,
    score: 0,
    health: 100,
    correctAnswers: 0,
    totalAnswered: 0,
    gameActive: false,
    answered: false,
    selectedAnswer: null,
    timeRemaining: 0,
    maxTime: 0,
    enemies: [],
    wrongAnswers: 0, // For survivor mode
    mode: null
};

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 900;
canvas.height = 500;

// ==================== SCREEN MANAGEMENT ====================
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

function goToQuizCreator() {
    showScreen('quizCreator');
    document.getElementById('parseError').textContent = '';
}

function returnToQuizSelector() {
    displayQuizzes();
    showScreen('quizSelector');
}

// ==================== CREATOR TAB SWITCHING ====================
function switchCreatorTab(tab) {
    // Hide all tabs
    document.querySelectorAll('.creator-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

    // Show selected tab
    document.getElementById(tab + 'Tab').classList.add('active');
    event.target.classList.add('active');

    // Initialize form if needed
    if (tab === 'form' && formQuestions.length === 0) {
        addQuestion();
    }
}

// ==================== FORM BUILDER ====================
function addQuestion() {
    const questionNum = formQuestions.length + 1;
    formQuestions.push({
        text: '',
        answers: ['', '', '', ''],
        correctAnswer: 0,
        timeLimit: 20
    });

    renderQuestions();
}

function renderQuestions() {
    const container = document.getElementById('questionsContainer');
    container.innerHTML = '';

    formQuestions.forEach((q, index) => {
        const card = document.createElement('div');
        card.className = 'question-card';
        card.innerHTML = `
            <h4>Question ${index + 1}</h4>
            <div class="form-group">
                <label>Question Text</label>
                <textarea placeholder="Enter question here" rows="2" onchange="updateQuestion(${index}, 'text', this.value)">${q.text}</textarea>
            </div>
            
            <div class="form-group">
                <label>Answers</label>
                <div class="answers-form">
                    <div class="answer-row">
                        <input type="text" placeholder="Answer 1" value="${q.answers[0]}" onchange="updateQuestion(${index}, 'answer0', this.value)">
                    </div>
                    <div class="answer-row">
                        <input type="text" placeholder="Answer 2" value="${q.answers[1]}" onchange="updateQuestion(${index}, 'answer1', this.value)">
                    </div>
                    <div class="answer-row">
                        <input type="text" placeholder="Answer 3" value="${q.answers[2]}" onchange="updateQuestion(${index}, 'answer2', this.value)">
                    </div>
                    <div class="answer-row">
                        <input type="text" placeholder="Answer 4" value="${q.answers[3]}" onchange="updateQuestion(${index}, 'answer3', this.value)">
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label>Correct Answer</label>
                <div class="radio-group">
                    <label><input type="radio" name="correct${index}" ${q.correctAnswer === 0 ? 'checked' : ''} onchange="updateQuestion(${index}, 'correct', 0)"> Answer 1</label>
                    <label><input type="radio" name="correct${index}" ${q.correctAnswer === 1 ? 'checked' : ''} onchange="updateQuestion(${index}, 'correct', 1)"> Answer 2</label>
                    <label><input type="radio" name="correct${index}" ${q.correctAnswer === 2 ? 'checked' : ''} onchange="updateQuestion(${index}, 'correct', 2)"> Answer 3</label>
                    <label><input type="radio" name="correct${index}" ${q.correctAnswer === 3 ? 'checked' : ''} onchange="updateQuestion(${index}, 'correct', 3)"> Answer 4</label>
                </div>
            </div>

            <div class="form-group">
                <label>Time Limit (seconds)</label>
                <input type="number" min="5" max="60" value="${q.timeLimit}" onchange="updateQuestion(${index}, 'timeLimit', this.value)">
            </div>

            <button type="button" class="remove-btn" onclick="removeQuestion(${index})">Remove Question</button>
        `;
        container.appendChild(card);
    });
}

function updateQuestion(index, field, value) {
    if (field === 'text') {
        formQuestions[index].text = value;
    } else if (field.startsWith('answer')) {
        const answerIdx = parseInt(field.replace('answer', ''));
        formQuestions[index].answers[answerIdx] = value;
    } else if (field === 'correct') {
        formQuestions[index].correctAnswer = parseInt(value);
    } else if (field === 'timeLimit') {
        formQuestions[index].timeLimit = parseInt(value) || 20;
    }
}

function removeQuestion(index) {
    formQuestions.splice(index, 1);
    renderQuestions();
}

function createQuizFromForm() {
    const quizName = document.getElementById('formQuizName').value.trim();
    const errorDiv = document.getElementById('parseError');
    errorDiv.textContent = '';

    if (!quizName) {
        errorDiv.textContent = 'Please enter a quiz name.';
        return;
    }

    if (formQuestions.length === 0) {
        errorDiv.textContent = 'Please add at least one question.';
        return;
    }

    // Validate all questions
    for (let q of formQuestions) {
        if (!q.text.trim()) {
            errorDiv.textContent = 'All questions must have text.';
            return;
        }
        if (q.answers.some(a => !a.trim())) {
            errorDiv.textContent = 'All answers must be filled in.';
            return;
        }
    }

    quizzes.push({
        name: quizName,
        questions: formQuestions.map(q => ({
            text: q.text,
            answers: q.answers,
            correctAnswer: q.correctAnswer,
            timeLimit: q.timeLimit
        }))
    });

    errorDiv.style.color = 'green';
    errorDiv.textContent = `✓ Quiz "${quizName}" created successfully!`;

    // Reset form
    document.getElementById('formQuizName').value = '';
    formQuestions = [];
    renderQuestions();

    setTimeout(() => {
        displayQuizzes();
        showScreen('quizSelector');
    }, 1000);
}

// ==================== QUIZ MANAGEMENT ====================
function parseQuizData(data) {
    const lines = data.trim().split('\n');
    const questions = [];

    for (let line of lines) {
        if (!line.trim()) continue;

        const parts = line.split('\t');
        if (parts.length < 7) {
            throw new Error('Invalid line format. Expected 7 tab-separated values.');
        }

        const question = {
            text: parts[0].trim(),
            answers: [
                parts[1].trim(),
                parts[2].trim(),
                parts[3].trim(),
                parts[4].trim()
            ],
            correctAnswer: parseInt(parts[5].trim()) - 1, // Convert to 0-indexed
            timeLimit: parseInt(parts[6].trim())
        };

        if (question.correctAnswer < 0 || question.correctAnswer > 3) {
            throw new Error('Correct answer must be between 1 and 4.');
        }

        questions.push(question);
    }

    return questions;
}

function createQuizFromInput() {
    const input = document.getElementById('quizInput').value;
    const errorDiv = document.getElementById('parseError');
    errorDiv.textContent = '';

    if (!input.trim()) {
        errorDiv.textContent = 'Please paste quiz data.';
        return;
    }

    try {
        const questions = parseQuizData(input);
        const quizName = `Quiz ${quizzes.length + 1}`;
        quizzes.push({
            name: quizName,
            questions: questions
        });
        errorDiv.style.color = 'green';
        errorDiv.textContent = `✓ Quiz created successfully with ${questions.length} questions!`;
        setTimeout(() => {
            displayQuizzes();
            showScreen('quizSelector');
        }, 1000);
    } catch (error) {
        errorDiv.textContent = `Error: ${error.message}`;
    }
}

function loadSampleQuiz() {
    const sampleData = `What unit is charge measured in?	Volts	Watts	Coulombs	Amps	3	20
How many types of charge are there?	One	Two	Three	Four	2	20
What are the two types of charge?	Hot and cold	North and south	Positive and negative	Light and dark	3	20
What happens when two positive charges are brought together?	Attract	Do nothing	Repel	Explode	3	20
What happens when a positive and a negative charge are brought together?	Repel	Attract	Cancel instantly	Do nothing	2	20
What is an object called if it has equal positive and negative charges?	Charged	Magnetic	Neutral	Static	3	20
What charge does an object have if it has more electrons than protons?	Positive	Neutral	Negative	No charge	3	20
What charge does an object have if it has fewer electrons than protons?	Negative	Neutral	Positive	No charge	3	20
Which particle moves when objects become charged?	Proton	Neutron	Nucleus	Electron	4	20
What happens when materials are rubbed together?	Protons move	Neutrons move	Electrons transfer between materials	Nothing happens	3	20
If a material gains electrons, what charge does it become?	Positive	Neutral	Negative	Magnetic	3	20
If a material loses electrons, what charge does it become?	Negative	Neutral	Positive	Magnetic	3	20
Which statement is TRUE?	Positive charges move	Negative charges don't move	Electrons move to transfer charge	Neutrons move between objects	3	20
What does "like charges repel" mean?	Positive and negative repel	Same charges push away from each other	Charges disappear	Charges stick together	2	20
What does "unlike charges attract" mean?	Same charges attract	Charges don't interact	Different charges pull together	Charges cancel out instantly	3	20
Why do objects become charged when rubbed?	Heat is created	Protons move	Electrons are transferred between materials	Energy is destroyed	3	20`;

    document.getElementById('quizInput').value = sampleData;
    createQuizFromInput();
}

// ==================== BLOOKET API INTEGRATION ====================
async function searchBlooketQuizzes() {
    const query = document.getElementById('blooketSearch').value.trim();
    const resultsDiv = document.getElementById('blooketResults');
    const errorDiv = document.getElementById('parseError');

    if (!query) {
        errorDiv.textContent = 'Please enter a search term.';
        return;
    }

    resultsDiv.innerHTML = '<p style="text-align: center; color: #667eea;">Searching Blooket quizzes...</p>';
    errorDiv.textContent = '';

    try {
        // Try multiple Blooket API endpoints (they may have changed)
        let response;
        let data;

        // First try the current endpoint
        try {
            response = await fetch(`https://api.blooket.com/api/games?search=${encodeURIComponent(query)}&limit=10`);
            if (response.ok) {
                data = await response.json();
            }
        } catch (e) {
            console.log('Primary API failed, trying alternative...');
        }

        // If primary failed, try alternative endpoints
        if (!data) {
            try {
                response = await fetch(`https://www.blooket.com/api/games/search?query=${encodeURIComponent(query)}&take=10`);
                if (response.ok) {
                    data = await response.json();
                }
            } catch (e) {
                console.log('Alternative API also failed');
            }
        }

        // If still no data, try another format
        if (!data) {
            try {
                response = await fetch(`https://api.blooket.com/api/games/search`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: query,
                        limit: 10
                    })
                });
                if (response.ok) {
                    data = await response.json();
                }
            } catch (e) {
                console.log('POST API also failed');
            }
        }

        if (!data) {
            throw new Error('Could not connect to Blooket API - all endpoints failed');
        }

        // Handle different response formats
        const games = data.games || data.data || data.results || data || [];
        displayBlooketResults(Array.isArray(games) ? games : []);
    } catch (error) {
        console.error('Blooket API Error:', error);
        resultsDiv.innerHTML = '';
        errorDiv.textContent = `Error: ${error.message}. You can still create quizzes manually using the other tabs.`;
    }
}

function displayBlooketResults(games) {
    const resultsDiv = document.getElementById('blooketResults');
    
    if (games.length === 0) {
        resultsDiv.innerHTML = '<p style="text-align: center; color: #999;">No quizzes found. Try a different search term.</p>';
        return;
    }

    resultsDiv.innerHTML = '';

    games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'blooket-quiz-card';
        card.innerHTML = `
            <h4>${game.name || 'Untitled Quiz'}</h4>
            <p><strong>Questions:</strong> ${game.questions ? game.questions.length : '?'}</p>
            <p><strong>Subject:</strong> ${game.subject || 'General'}</p>
            <button class="btn btn-primary" onclick="importBlooketQuiz('${game.id}', '${(game.name || 'Quiz').replace(/'/g, "\\'")}')">Import Quiz</button>
        `;
        resultsDiv.appendChild(card);
    });
}

async function importBlooketQuiz(gameId, gameName) {
    const errorDiv = document.getElementById('parseError');
    errorDiv.textContent = 'Fetching quiz details...';

    try {
        // Try multiple endpoints to get quiz details
        let response;
        let gameData;

        // Try primary endpoint
        try {
            response = await fetch(`https://api.blooket.com/api/games/${gameId}`);
            if (response.ok) {
                gameData = await response.json();
            }
        } catch (e) {
            console.log('Primary quiz fetch failed, trying alternative...');
        }

        // Try alternative endpoint
        if (!gameData) {
            try {
                response = await fetch(`https://www.blooket.com/api/games/${gameId}`);
                if (response.ok) {
                    gameData = await response.json();
                }
            } catch (e) {
                console.log('Alternative quiz fetch also failed');
            }
        }

        if (!gameData) {
            throw new Error('Could not fetch quiz details from any endpoint');
        }

        // Handle different question formats
        let questions = gameData.questions || gameData.data?.questions || gameData.game?.questions || [];

        // If questions is nested differently, try to find it
        if (!Array.isArray(questions) && typeof questions === 'object') {
            questions = Object.values(questions);
        }

        if (!Array.isArray(questions) || questions.length === 0) {
            errorDiv.textContent = 'Error: Quiz has no questions or unsupported format.';
            return;
        }

        // Convert various Blooket formats to our format
        const convertedQuestions = questions.map(q => {
            // Handle different answer formats
            let answers = [];
            let correctAnswer = q.correctAnswer || q.correct || q.answer;

            // Try different answer field formats
            if (q.answers && Array.isArray(q.answers)) {
                answers = q.answers;
            } else if (q.options && Array.isArray(q.options)) {
                answers = q.options;
            } else if (q.choices && Array.isArray(q.choices)) {
                answers = q.choices;
            } else {
                // Fallback to numbered answer fields
                answers = [q.answer1, q.answer2, q.answer3, q.answer4].filter(a => a);
            }

            // Find correct answer index
            let correctIndex = 0;
            if (typeof correctAnswer === 'number') {
                correctIndex = correctAnswer;
            } else if (typeof correctAnswer === 'string') {
                correctIndex = answers.indexOf(correctAnswer);
                if (correctIndex === -1) correctIndex = 0;
            }

            return {
                text: q.question || q.text || q.prompt || 'Question',
                answers: answers.length > 0 ? answers : ['A', 'B', 'C', 'D'],
                correctAnswer: Math.min(correctIndex, answers.length - 1),
                timeLimit: q.timeLimit || q.timer || 20
            };
        }).filter(q => q.text && q.answers.length >= 2); // Filter out invalid questions

        if (convertedQuestions.length === 0) {
            errorDiv.textContent = 'Error: No valid questions found in this quiz.';
            return;
        }

        // Add as new quiz
        quizzes.push({
            name: `${gameName} (from Blooket)`,
            questions: convertedQuestions
        });

        errorDiv.style.color = 'green';
        errorDiv.textContent = `✓ Quiz imported successfully! (${convertedQuestions.length} questions)`;

        setTimeout(() => {
            displayQuizzes();
            showScreen('quizSelector');
        }, 1000);
    } catch (error) {
        console.error('Import Error:', error);
        errorDiv.textContent = `Error: ${error.message}. The quiz format may not be compatible.`;
    }
}

function displayQuizzes() {
    updateAccountDisplay();
    const quizList = document.getElementById('quizList');
    quizList.innerHTML = '';

    if (quizzes.length === 0) {
        quizList.innerHTML = '<p>No quizzes created yet. Create one first!</p>';
        return;
    }

    quizzes.forEach((quiz, index) => {
        const quizCard = document.createElement('div');
        quizCard.className = 'quiz-card';
        quizCard.innerHTML = `
            <strong>${quiz.name}</strong>
            <p>${quiz.questions.length} Questions</p>
            <button onclick="selectQuizMode(${index})" class="btn btn-primary">Play</button>
        `;
        quizList.appendChild(quizCard);
    });
}

function selectQuizMode(quizIndex) {
    currentQuiz = quizzes[quizIndex];
    showScreen('gameModeSelector');
}

function startGameMode(mode) {
    currentGameMode = mode;
    if (mode === 'tower') {
        startGame();
    } else if (mode === 'quiz') {
        startRegularQuiz();
    }
}

// ==================== GAME TYPE SELECTION ====================
function selectGameType(gameType) {
    currentGameType = gameType;
    if (gameType === 'solo') {
        showScreen('soloModeSelector');
    } else if (gameType === 'public') {
        showScreen('publicGameLobby');
        displayActiveGames();
    }
}

function goBackToGameType() {
    showScreen('gameModeSelector');
}

let selectedGameMode = null;
let gameSettings = {
    difficulty: 'normal',
    timeLimit: 20,
    showTimer: true,
    randomOrder: true,
    showProgress: true,
    allowSkips: false,
    maxQuestions: 50,
    pointMultiplier: 1,
    bonusStreaks: true,
    timeBonuses: false
};

function startSoloGame(mode) {
    selectedGameMode = mode;
    document.getElementById('customizationTitle').textContent = `🎮 Customize ${mode.charAt(0).toUpperCase() + mode.slice(1)} Mode`;
    showScreen('gameCustomization');
    
    // Set default values based on mode
    setModeDefaults(mode);
    updateCustomizationUI();
}

function setModeDefaults(mode) {
    switch(mode) {
        case 'speedrun':
            gameSettings.timeLimit = 60;
            gameSettings.maxQuestions = 100;
            gameSettings.showTimer = true;
            gameSettings.allowSkips = false;
            break;
        case 'survivor':
            gameSettings.timeLimit = 15;
            gameSettings.maxQuestions = 200;
            gameSettings.allowSkips = false;
            break;
        case 'timeattack':
            gameSettings.timeLimit = 10;
            gameSettings.maxQuestions = 50;
            gameSettings.showTimer = true;
            break;
        case 'marathon':
            gameSettings.timeLimit = 25;
            gameSettings.maxQuestions = 100;
            gameSettings.showProgress = true;
            break;
        case 'quiz':
            gameSettings.timeLimit = 30;
            gameSettings.maxQuestions = 20;
            gameSettings.showTimer = true;
            break;
        default:
            gameSettings.timeLimit = 20;
            gameSettings.maxQuestions = 50;
    }
}

function updateCustomizationUI() {
    // Update radio buttons
    document.querySelectorAll('input[name="difficulty"]').forEach(radio => {
        radio.checked = radio.value === gameSettings.difficulty;
    });
    
    // Update range inputs
    document.getElementById('timeLimit').value = gameSettings.timeLimit;
    document.getElementById('timeLimitValue').textContent = gameSettings.timeLimit;
    
    document.getElementById('pointMultiplier').value = gameSettings.pointMultiplier;
    document.getElementById('pointMultiplierValue').textContent = gameSettings.pointMultiplier + 'x';
    
    // Update checkboxes
    document.getElementById('showTimer').checked = gameSettings.showTimer;
    document.getElementById('randomOrder').checked = gameSettings.randomOrder;
    document.getElementById('showProgress').checked = gameSettings.showProgress;
    document.getElementById('allowSkips').checked = gameSettings.allowSkips;
    document.getElementById('bonusStreaks').checked = gameSettings.bonusStreaks;
    document.getElementById('timeBonuses').checked = gameSettings.timeBonuses;
    
    // Update number input
    document.getElementById('maxQuestions').value = gameSettings.maxQuestions;
}

function startGameWithSettings() {
    // Collect settings from UI
    gameSettings.difficulty = document.querySelector('input[name="difficulty"]:checked').value;
    gameSettings.timeLimit = parseInt(document.getElementById('timeLimit').value);
    gameSettings.showTimer = document.getElementById('showTimer').checked;
    gameSettings.randomOrder = document.getElementById('randomOrder').checked;
    gameSettings.showProgress = document.getElementById('showProgress').checked;
    gameSettings.allowSkips = document.getElementById('allowSkips').checked;
    gameSettings.maxQuestions = parseInt(document.getElementById('maxQuestions').value);
    gameSettings.pointMultiplier = parseFloat(document.getElementById('pointMultiplier').value);
    gameSettings.bonusStreaks = document.getElementById('bonusStreaks').checked;
    gameSettings.timeBonuses = document.getElementById('timeBonuses').checked;
    
    // Apply difficulty modifiers
    applyDifficultySettings();
    
    // Start the actual game
    switch(selectedGameMode) {
        case 'tower':
            startGame();
            break;
        case 'quiz':
            startRegularQuiz();
            break;
        case 'speedrun':
            startSpeedRunGame();
            break;
        case 'survivor':
            startSurvivorGame();
            break;
        case 'memory':
            startMemoryGame();
            break;
        case 'flashcard':
            startFlashcardGame();
            break;
        case 'onlyup':
            startOnlyUp();
            break;
        case 'timeattack':
            startTimeAttackGame();
            break;
        case 'category':
            startCategoryChallenge();
            break;
        case 'boss':
            startBossBattle();
            break;
        case 'puzzle':
            startPuzzleMode();
            break;
        case 'marathon':
            startMarathonMode();
            break;
    }
}

function applyDifficultySettings() {
    switch(gameSettings.difficulty) {
        case 'easy':
            gameSettings.timeLimit = Math.max(gameSettings.timeLimit * 1.5, gameSettings.timeLimit + 5);
            gameSettings.pointMultiplier *= 0.8;
            break;
        case 'hard':
            gameSettings.timeLimit = Math.max(gameSettings.timeLimit * 0.7, 5);
            gameSettings.pointMultiplier *= 1.3;
            break;
        case 'expert':
            gameSettings.timeLimit = Math.max(gameSettings.timeLimit * 0.5, 3);
            gameSettings.pointMultiplier *= 1.5;
            gameSettings.allowSkips = false;
            break;
    }
}

function goBackToModeSelector() {
    showScreen('soloModeSelector');
}

// Add event listeners for range inputs
document.addEventListener('DOMContentLoaded', function() {
    // Time limit slider
    const timeLimitSlider = document.getElementById('timeLimit');
    if (timeLimitSlider) {
        timeLimitSlider.addEventListener('input', function() {
            document.getElementById('timeLimitValue').textContent = this.value;
        });
    }
    
    // Point multiplier slider
    const pointMultiplierSlider = document.getElementById('pointMultiplier');
    if (pointMultiplierSlider) {
        pointMultiplierSlider.addEventListener('input', function() {
            document.getElementById('pointMultiplierValue').textContent = this.value + 'x';
        });
    }
});

// ==================== PUBLIC GAME MANAGEMENT ====================
function generateGameCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function createPublicGame() {
    const mode = document.getElementById('publicGameMode').value;
    currentGameMode = mode;
    const gameCode = generateGameCode();
    currentGameId = gameCode;

    publicGames[gameCode] = {
        code: gameCode,
        mode: mode,
        creator: 'You',
        players: ['You'],
        maxPlayers: 4,
        createdAt: new Date(),
        quiz: currentQuiz
    };

    document.getElementById('lobbyGameCode').textContent = gameCode;
    updatePlayerList();
    showScreen('multiplayerLobby');
}

function joinPublicGame() {
    const gameCode = document.getElementById('gameCode').value.trim().toUpperCase();
    const errorDiv = document.getElementById('parseError');

    if (!gameCode) {
        errorDiv.textContent = 'Please enter a game code.';
        return;
    }

    if (!publicGames[gameCode]) {
        errorDiv.textContent = `Game "${gameCode}" not found.`;
        return;
    }

    const game = publicGames[gameCode];
    if (game.players.length >= game.maxPlayers) {
        errorDiv.textContent = 'Game is full.';
        return;
    }

    currentGameId = gameCode;
    currentGameMode = game.mode;
    currentQuiz = game.quiz;
    game.players.push('Player ' + (game.players.length + 1));

    document.getElementById('lobbyGameCode').textContent = gameCode;
    updatePlayerList();
    showScreen('multiplayerLobby');
}

function leaveLobby() {
    if (currentGameId && publicGames[currentGameId]) {
        if (publicGames[currentGameId].creator === 'You') {
            delete publicGames[currentGameId];
        } else {
            publicGames[currentGameId].players = publicGames[currentGameId].players.filter(p => p !== 'You');
        }
    }
    currentGameId = null;
    showScreen('publicGameLobby');
    displayActiveGames();
}

function startMultiplayerGame() {
    if (!currentGameId || !publicGames[currentGameId]) return;

    const game = publicGames[currentGameId];
    if (game.players.length < 2) {
        alert('Need at least 2 players to start.');
        return;
    }

    // Start the selected game mode
    switch(currentGameMode) {
        case 'tower':
            startGame();
            break;
        case 'quiz':
            startRegularQuiz();
            break;
        case 'speedrun':
            startSpeedRunGame();
            break;
        case 'survivor':
            startSurvivorGame();
            break;
    }
}

function updatePlayerList() {
    const game = publicGames[currentGameId];
    if (!game) return;

    document.getElementById('playerCount').textContent = game.players.length;
    const playerList = document.getElementById('playerList');
    playerList.innerHTML = game.players.map(p => `<div class="player-item">👤 ${p}</div>`).join('');
}

function displayActiveGames() {
    const gamesList = document.getElementById('activeGames');
    const games = Object.values(publicGames);

    if (games.length === 0) {
        gamesList.innerHTML = '<p style="text-align: center; color: #999;">No active games. Create one to get started!</p>';
        return;
    }

    gamesList.innerHTML = games.map(game => `
        <div class="game-item">
            <h4>${game.mode.toUpperCase()} Mode</h4>
            <div class="game-item-info">Code: <strong>${game.code}</strong></div>
            <div class="game-item-info">Players: ${game.players.length}/${game.maxPlayers}</div>
            <div class="game-item-info">Creator: ${game.creator}</div>
            <button class="btn btn-primary" onclick="joinPublicGame(); document.getElementById('gameCode').value='${game.code}'">Join</button>
        </div>
    `).join('');
}

// ==================== GAME INITIALIZATION ====================
function startGame() {
    gameState = {
        currentQuestion: 0,
        score: 0,
        health: 100,
        correctAnswers: 0,
        totalAnswered: 0,
        gameActive: true,
        answered: false,
        selectedAnswer: null,
        timeRemaining: 0,
        maxTime: 0,
        enemies: []
    };

    document.getElementById('quizTitle').textContent = currentQuiz.name;
    showScreen('gameScreen');
    loadQuestion();
    gameLoop();
}

function loadQuestion() {
    if (gameState.currentQuestion >= currentQuiz.questions.length) {
        endGame();
        return;
    }

    const question = currentQuiz.questions[gameState.currentQuestion];
    document.getElementById('questionText').textContent = question.text;
    gameState.maxTime = question.timeLimit;
    gameState.timeRemaining = question.timeLimit;
    gameState.answered = false;
    gameState.selectedAnswer = null;

    const container = document.getElementById('answersContainer');
    container.innerHTML = '';

    question.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = answer;
        btn.onclick = () => answerQuestion(index);
        container.appendChild(btn);
    });

    // Add enemy when new question loads
    gameState.enemies.push({
        x: canvas.width,
        y: Math.random() * (canvas.height - 60),
        health: 1,
        width: 40,
        height: 40
    });
}

function answerQuestion(answerIndex) {
    if (gameState.answered) return;

    gameState.answered = true;
    gameState.totalAnswered++;

    const question = currentQuiz.questions[gameState.currentQuestion];
    const buttons = document.querySelectorAll('.answer-btn');

    buttons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === question.correctAnswer) {
            btn.classList.add('correct');
        } else if (idx === answerIndex) {
            btn.classList.add('incorrect');
        }
    });

    if (answerIndex === question.correctAnswer) {
        gameState.score += 10;
        gameState.correctAnswers++;
        // Remove first enemy on correct answer
        if (gameState.enemies.length > 0) {
            gameState.enemies.shift();
        }
    } else {
        gameState.health -= 10;
        if (gameState.health < 0) gameState.health = 0;
    }

    updateDisplay();

    if (gameState.health <= 0) {
        setTimeout(endGame, 1000);
    } else {
        gameState.currentQuestion++;
        setTimeout(loadQuestion, 1500);
    }
}

function updateDisplay() {
    document.getElementById('score').textContent = gameState.score;
    document.getElementById('health').textContent = gameState.health;
}

function endGame() {
    gameState.gameActive = false;
    document.getElementById('finalScore').textContent = gameState.score;
    document.getElementById('questionsAnswered').textContent = gameState.totalAnswered;
    document.getElementById('correctAnswers').textContent = gameState.correctAnswers;
    document.getElementById('accuracyText').style.display = 'none';
    
    const title = gameState.health > 0 ? '🎉 Quiz Complete!' : '💀 Game Over!';
    document.getElementById('gameOverTitle').textContent = title;
    
    onGameEnd(gameState.score);
    showScreen('gameOverScreen');
}

// ==================== REGULAR QUIZ MODE ====================
function startRegularQuiz() {
    gameState = {
        currentQuestion: 0,
        score: 0,
        health: 100,
        correctAnswers: 0,
        totalAnswered: 0,
        gameActive: true,
        answered: false,
        selectedAnswer: null,
        timeRemaining: 0,
        maxTime: 0,
        enemies: []
    };

    showScreen('regularQuizScreen');
    loadRegularQuestion();
    regularQuizLoop();
}

function loadRegularQuestion() {
    if (gameState.currentQuestion >= currentQuiz.questions.length) {
        endRegularQuiz();
        return;
    }

    const question = currentQuiz.questions[gameState.currentQuestion];
    document.getElementById('regularQuestionText').textContent = question.text;
    gameState.maxTime = question.timeLimit;
    gameState.timeRemaining = question.timeLimit;
    gameState.answered = false;
    gameState.selectedAnswer = null;

    const container = document.getElementById('regularAnswersContainer');
    container.innerHTML = '';

    question.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-answer-btn';
        btn.textContent = answer;
        btn.onclick = () => answerRegularQuestion(index);
        container.appendChild(btn);
    });

    updateRegularQuizDisplay();
}

function answerRegularQuestion(answerIndex) {
    if (gameState.answered) return;

    gameState.answered = true;
    gameState.totalAnswered++;

    const question = currentQuiz.questions[gameState.currentQuestion];
    const buttons = document.querySelectorAll('.quiz-answer-btn');

    buttons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === question.correctAnswer) {
            btn.classList.add('quiz-correct');
        } else if (idx === answerIndex) {
            btn.classList.add('quiz-incorrect');
        }
    });

    if (answerIndex === question.correctAnswer) {
        gameState.score += 10;
        gameState.correctAnswers++;
    }

    updateRegularQuizDisplay();

    gameState.currentQuestion++;
    setTimeout(() => {
        if (gameState.currentQuestion < currentQuiz.questions.length) {
            loadRegularQuestion();
        } else {
            endRegularQuiz();
        }
    }, 1500);
}

function endRegularQuiz() {
    gameState.gameActive = false;
    document.getElementById('finalScore').textContent = gameState.score;
    document.getElementById('questionsAnswered').textContent = gameState.totalAnswered;
    document.getElementById('correctAnswers').textContent = gameState.correctAnswers;
    
    const accuracy = Math.round((gameState.correctAnswers / gameState.totalAnswered) * 100);
    document.getElementById('accuracy').textContent = accuracy;
    document.getElementById('accuracyText').style.display = 'block';
    
    document.getElementById('gameOverTitle').textContent = '📊 Quiz Complete!';
    
    onGameEnd(gameState.score);
    showScreen('gameOverScreen');
}

function updateRegularQuizDisplay() {
    document.getElementById('quizScore').textContent = `Score: ${gameState.score}`;
    document.getElementById('questionNumber').textContent = `${gameState.currentQuestion + 1} of ${currentQuiz.questions.length}`;
    
    const progress = ((gameState.currentQuestion + 1) / currentQuiz.questions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
}

function regularQuizLoop() {
    if (!gameState.gameActive) return;

    if (!gameState.answered && gameState.currentQuestion < currentQuiz.questions.length) {
        gameState.timeRemaining--;
        document.getElementById('seconds').textContent = gameState.timeRemaining;
    }

    requestAnimationFrame(regularQuizLoop);
}

// ==================== SPEED RUN MODE ====================
function startSpeedRunGame() {
    gameState = {
        currentQuestion: 0,
        score: 0,
        health: 100,
        correctAnswers: 0,
        totalAnswered: 0,
        gameActive: true,
        answered: false,
        selectedAnswer: null,
        timeRemaining: 60, // 60 second time limit total
        maxTime: 60,
        enemies: [],
        mode: 'speedrun'
    };

    showScreen('regularQuizScreen');
    document.getElementById('regularQuestionText').style.fontSize = '1.1em';
    loadSpeedRunQuestion();
    speedRunLoop();
}

function loadSpeedRunQuestion() {
    if (gameState.currentQuestion >= currentQuiz.questions.length || gameState.timeRemaining <= 0) {
        endSpeedRunGame();
        return;
    }

    const question = currentQuiz.questions[gameState.currentQuestion];
    document.getElementById('regularQuestionText').textContent = question.text;
    gameState.answered = false;

    const container = document.getElementById('regularAnswersContainer');
    container.innerHTML = '';

    question.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-answer-btn';
        btn.textContent = answer;
        btn.onclick = () => answerSpeedRunQuestion(index);
        container.appendChild(btn);
    });

    updateSpeedRunDisplay();
}

function answerSpeedRunQuestion(answerIndex) {
    if (gameState.answered) return;

    gameState.answered = true;
    const question = currentQuiz.questions[gameState.currentQuestion];
    const buttons = document.querySelectorAll('.quiz-answer-btn');

    buttons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === question.correctAnswer) {
            btn.classList.add('quiz-correct');
        } else if (idx === answerIndex) {
            btn.classList.add('quiz-incorrect');
        }
    });

    gameState.totalAnswered++;
    if (answerIndex === question.correctAnswer) {
        gameState.score += 15;
        gameState.correctAnswers++;
    }

    updateSpeedRunDisplay();
    gameState.currentQuestion++;
    setTimeout(loadSpeedRunQuestion, 500);
}

function updateSpeedRunDisplay() {
    document.getElementById('quizScore').textContent = `Score: ${gameState.score}`;
    document.getElementById('questionNumber').textContent = `Q${gameState.currentQuestion + 1}`;
}

function endSpeedRunGame() {
    gameState.gameActive = false;
    document.getElementById('finalScore').textContent = gameState.score;
    document.getElementById('questionsAnswered').textContent = gameState.totalAnswered;
    document.getElementById('correctAnswers').textContent = gameState.correctAnswers;

    const accuracy = gameState.totalAnswered > 0 ? Math.round((gameState.correctAnswers / gameState.totalAnswered) * 100) : 0;
    document.getElementById('accuracy').textContent = accuracy;
    document.getElementById('accuracyText').style.display = 'block';

    document.getElementById('gameOverTitle').textContent = '⚡ Speed Run Complete!';
    showScreen('gameOverScreen');
}

function speedRunLoop() {
    if (!gameState.gameActive) return;

    gameState.timeRemaining--;
    document.getElementById('seconds').textContent = gameState.timeRemaining;

    if (gameState.timeRemaining <= 0) {
        endSpeedRunGame();
        return;
    }

    requestAnimationFrame(speedRunLoop);
}

// ==================== SURVIVOR MODE ====================
function startSurvivorGame() {
    gameState = {
        currentQuestion: 0,
        score: 0,
        health: 100,
        correctAnswers: 0,
        totalAnswered: 0,
        gameActive: true,
        answered: false,
        selectedAnswer: null,
        timeRemaining: 0,
        maxTime: 0,
        enemies: [],
        wrongAnswers: 0,
        mode: 'survivor'
    };

    showScreen('regularQuizScreen');
    document.querySelector('.quiz-header').innerHTML = `
        <div class="progress-bar">
            <div id="survivalBar" class="progress-fill" style="width: 100%"></div>
        </div>
        <div class="quiz-info">
            <span id="livesLeft">❤️❤️❤️ (3 lives)</span>
            <span id="quizScore">Score: 0</span>
        </div>
    `;
    loadSurvivorQuestion();
    regularQuizLoop();
}

function loadSurvivorQuestion() {
    if (gameState.currentQuestion >= currentQuiz.questions.length || gameState.wrongAnswers >= 3) {
        endSurvivorGame();
        return;
    }

    const question = currentQuiz.questions[gameState.currentQuestion];
    document.getElementById('regularQuestionText').textContent = question.text;
    gameState.answered = false;

    const container = document.getElementById('regularAnswersContainer');
    container.innerHTML = '';

    question.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-answer-btn';
        btn.textContent = answer;
        btn.onclick = () => answerSurvivorQuestion(index);
        container.appendChild(btn);
    });

    updateSurvivorDisplay();
}

function answerSurvivorQuestion(answerIndex) {
    if (gameState.answered) return;

    gameState.answered = true;
    const question = currentQuiz.questions[gameState.currentQuestion];
    const buttons = document.querySelectorAll('.quiz-answer-btn');

    buttons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === question.correctAnswer) {
            btn.classList.add('quiz-correct');
        } else if (idx === answerIndex) {
            btn.classList.add('quiz-incorrect');
        }
    });

    gameState.totalAnswered++;
    if (answerIndex === question.correctAnswer) {
        gameState.score += 10;
        gameState.correctAnswers++;
    } else {
        gameState.wrongAnswers++;
    }

    updateSurvivorDisplay();

    if (gameState.wrongAnswers >= 3) {
        setTimeout(endSurvivorGame, 1000);
    } else {
        gameState.currentQuestion++;
        setTimeout(() => {
            if (gameState.currentQuestion < currentQuiz.questions.length) {
                loadSurvivorQuestion();
            } else {
                endSurvivorGame();
            }
        }, 1500);
    }
}

function updateSurvivorDisplay() {
    document.getElementById('quizScore').textContent = `Score: ${gameState.score}`;
    const lives = 3 - gameState.wrongAnswers;
    document.getElementById('livesLeft').textContent = '❤️'.repeat(lives) + ' (' + lives + ' lives)';
    const survivalPercent = (lives / 3) * 100;
    document.getElementById('survivalBar').style.width = survivalPercent + '%';
}

function endSurvivorGame() {
    gameState.gameActive = false;
    document.getElementById('finalScore').textContent = gameState.score;
    document.getElementById('questionsAnswered').textContent = gameState.totalAnswered;
    document.getElementById('correctAnswers').textContent = gameState.correctAnswers;
    document.getElementById('accuracyText').style.display = 'none';

    if (gameState.wrongAnswers >= 3) {
        document.getElementById('gameOverTitle').textContent = '💀 Game Over! ' + gameState.wrongAnswers + ' wrong answers';
    } else {
        document.getElementById('gameOverTitle').textContent = '🎉 Survivor Mode Complete!';
    }

    showScreen('gameOverScreen');
}

// ==================== MEMORY MATCH MODE ====================
function startMemoryGame() {
    gameState = {
        currentQuestion: 0,
        score: 0,
        health: 100,
        correctAnswers: 0,
        totalAnswered: 0,
        gameActive: true,
        answered: false,
        selectedAnswer: null,
        timeRemaining: 0,
        maxTime: 0,
        enemies: [],
        mode: 'memory'
    };

    showScreen('regularQuizScreen');
    document.querySelector('.quiz-header').innerHTML = `
        <div style="text-align: center; font-size: 1.2em; color: #667eea; font-weight: 600;">
            🧠 Memory Match - Match Questions with Answers
        </div>
    `;
    document.getElementById('regularQuestionText').textContent = '⏳ Preparing game...';
    
    setTimeout(() => {
        loadMemoryGame();
    }, 500);
}

function loadMemoryGame() {
    // For now, simplified version - show question and shuffle answers
    if (gameState.currentQuestion >= currentQuiz.questions.length) {
        endMemoryGame();
        return;
    }

    const question = currentQuiz.questions[gameState.currentQuestion];
    document.getElementById('regularQuestionText').textContent = question.text;
    gameState.answered = false;

    const shuffled = [...question.answers].sort(() => Math.random() - 0.5);
    const container = document.getElementById('regularAnswersContainer');
    container.innerHTML = '';

    shuffled.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-answer-btn';
        btn.textContent = answer;
        const originalIndex = question.answers.indexOf(answer);
        btn.onclick = () => answerMemoryQuestion(originalIndex);
        container.appendChild(btn);
    });
}

function answerMemoryQuestion(answerIndex) {
    if (gameState.answered) return;

    gameState.answered = true;
    const question = currentQuiz.questions[gameState.currentQuestion];

    gameState.totalAnswered++;
    if (answerIndex === question.correctAnswer) {
        gameState.score += 20;
        gameState.correctAnswers++;
    } else {
        gameState.score = Math.max(0, gameState.score - 5);
    }

    gameState.currentQuestion++;
    setTimeout(() => {
        if (gameState.currentQuestion < currentQuiz.questions.length) {
            loadMemoryGame();
        } else {
            endMemoryGame();
        }
    }, 1000);
}

function endMemoryGame() {
    gameState.gameActive = false;
    document.getElementById('finalScore').textContent = gameState.score;
    document.getElementById('questionsAnswered').textContent = gameState.totalAnswered;
    document.getElementById('correctAnswers').textContent = gameState.correctAnswers;

    const accuracy = gameState.totalAnswered > 0 ? Math.round((gameState.correctAnswers / gameState.totalAnswered) * 100) : 0;
    document.getElementById('accuracy').textContent = accuracy;
    document.getElementById('accuracyText').style.display = 'block';

    document.getElementById('gameOverTitle').textContent = '🧠 Memory Match Complete!';
    showScreen('gameOverScreen');
}

// ==================== FLASHCARD MODE ====================
function startFlashcardGame() {
    gameState = {
        currentQuestion: 0,
        score: 0,
        health: 100,
        correctAnswers: 0,
        totalAnswered: 0,
        gameActive: true,
        answered: false,
        selectedAnswer: null,
        timeRemaining: 0,
        maxTime: 0,
        enemies: [],
        mode: 'flashcard'
    };

    showScreen('regularQuizScreen');
    document.querySelector('.quiz-header').innerHTML = `
        <div class="quiz-info">
            <span id="cardNumber">Card 1 of 10</span>
            <span id="cardButtons" style="display: flex; gap: 10px;">
                <button class="btn btn-secondary" onclick="markFlashcardKnown()">✓ Got it</button>
                <button class="btn btn-secondary" onclick="markFlashcardUnknown()">✗ Review</button>
            </span>
        </div>
    `;
    loadFlashcard();
}

function loadFlashcard() {
    if (gameState.currentQuestion >= currentQuiz.questions.length) {
        endFlashcardGame();
        return;
    }

    const question = currentQuiz.questions[gameState.currentQuestion];
    document.getElementById('regularQuestionText').innerHTML = `
        <div style="margin: 20px 0;">
            <p style="color: #999; font-size: 0.9em; margin-bottom: 10px;">Question:</p>
            <p style="font-size: 1.3em; font-weight: 600;">${question.text}</p>
        </div>
    `;

    document.getElementById('regularAnswersContainer').innerHTML = `
        <div style="text-align: center; padding: 30px; background: #f0f0f0; border-radius: 10px;">
            <p style="color: #999; margin-bottom: 15px;">Correct Answer:</p>
            <p style="font-size: 1.2em; font-weight: 600; color: #667eea;">${question.answers[question.correctAnswer]}</p>
        </div>
    `;

    document.getElementById('cardNumber').textContent = `Card ${gameState.currentQuestion + 1} of ${currentQuiz.questions.length}`;
}

function markFlashcardKnown() {
    gameState.totalAnswered++;
    gameState.correctAnswers++;
    gameState.score += 10;
    gameState.currentQuestion++;
    setTimeout(loadFlashcard, 500);
}

function markFlashcardUnknown() {
    gameState.totalAnswered++;
    gameState.currentQuestion++;
    setTimeout(loadFlashcard, 500);
}

function endFlashcardGame() {
    gameState.gameActive = false;
    document.getElementById('finalScore').textContent = gameState.score;
    document.getElementById('questionsAnswered').textContent = gameState.totalAnswered;
    document.getElementById('correctAnswers').textContent = gameState.correctAnswers;

    const accuracy = gameState.totalAnswered > 0 ? Math.round((gameState.correctAnswers / gameState.totalAnswered) * 100) : 0;
    document.getElementById('accuracy').textContent = accuracy;
    document.getElementById('accuracyText').style.display = 'block';

    document.getElementById('gameOverTitle').textContent = '📇 Flashcard Study Complete!';
    showScreen('gameOverScreen');
}

// ==================== TOWER DEFENSE RENDERING ====================
function drawGameArea() {
    // Background
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Ground
    ctx.fillStyle = '#90EE90';
    ctx.fillRect(0, canvas.height - 60, canvas.width, 60);

    // Tower on left
    drawTower();

    // Enemies
    gameState.enemies.forEach(enemy => {
        drawEnemy(enemy);
    });

    // Projectiles (visual feedback for correct answers)
    if (gameState.selectedAnswer !== null && gameState.answered) {
        drawProjectile();
    }
}

function drawTower() {
    const towerX = 50;
    const towerY = canvas.height - 120;
    const towerWidth = 50;
    const towerHeight = 60;

    // Tower base
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(towerX - towerWidth / 2, towerY, towerWidth, towerHeight);

    // Tower top
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(towerX - 15, towerY - 20, 30, 20);

    // Add health bar above tower
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(towerX - 30, towerY - 35, 60, 8);
    ctx.fillStyle = '#00FF00';
    ctx.fillRect(towerX - 30, towerY - 35, (gameState.health / 100) * 60, 8);
}

function drawEnemy(enemy) {
    // Enemy body
    ctx.fillStyle = '#FF6B6B';
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

    // Enemy eyes
    ctx.fillStyle = '#000000';
    ctx.fillRect(enemy.x + 8, enemy.y + 8, 6, 6);
    ctx.fillRect(enemy.x + 26, enemy.y + 8, 6, 6);

    // Move enemy towards tower
    enemy.x -= 2;

    // Check if enemy reached tower
    if (enemy.x < 60) {
        gameState.health -= 5;
        gameState.enemies = gameState.enemies.filter(e => e !== enemy);
    }
}

function drawProjectile() {
    // Draw a projectile going from tower to first enemy
    if (gameState.enemies.length > 0) {
        const tower = { x: 50, y: canvas.height - 90 };
        const target = gameState.enemies[0];
        const targetX = target.x + target.width / 2;
        const targetY = target.y + target.height / 2;

        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(tower.x, tower.y);
        ctx.lineTo(targetX, targetY);
        ctx.stroke();

        // Projectile circle
        ctx.fillStyle = '#FFA500';
        ctx.beginPath();
        ctx.arc(targetX, targetY, 5, 0, Math.PI * 2);
        ctx.fill();
    }
}

// ==================== GAME LOOP ====================
function gameLoop() {
    if (!gameState.gameActive) return;

    drawGameArea();

    if (!gameState.answered && currentQuiz && gameState.currentQuestion < currentQuiz.questions.length) {
        gameState.timeRemaining--;
        
        // Update timer bar
        const timerBar = document.getElementById('timerBar');
        const percentage = (gameState.timeRemaining / gameState.maxTime) * 100;
        timerBar.style.width = percentage + '%';

        if (gameState.timeRemaining <= 0) {
            gameState.answered = true;
            gameState.health -= 20;
            if (gameState.health < 0) gameState.health = 0;
            updateDisplay();
            gameState.currentQuestion++;
            setTimeout(() => {
                if (gameState.health > 0 && gameState.currentQuestion < currentQuiz.questions.length) {
                    loadQuestion();
                } else {
                    endGame();
                }
            }, 1000);
        }
    }

    updateDisplay();
    requestAnimationFrame(gameLoop);
}

// ==================== ACCOUNT UI FUNCTIONS ====================
function handleLogin() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    if (!username || !password) {
        document.getElementById('loginError').textContent = 'Please enter username and password!';
        return;
    }
    
    const result = loginAccount(username, password);
    if (result.success) {
        document.getElementById('loginError').textContent = '';
        document.getElementById('loginUsername').value = '';
        document.getElementById('loginPassword').value = '';
        showScreen('quizSelector');
        updateAccountDisplay();
    } else {
        document.getElementById('loginError').textContent = result.message;
    }
}

function handleRegister() {
    const username = document.getElementById('registerUsername').value.trim();
    const password = document.getElementById('registerPassword').value;
    
    if (!username || !password) {
        document.getElementById('registerError').textContent = 'Username and password required!';
        return;
    }
    
    const result = registerAccount(username, password);
    if (result.success) {
        document.getElementById('registerError').textContent = result.message;
        document.getElementById('registerUsername').value = '';
        document.getElementById('registerPassword').value = '';
        setTimeout(() => {
            switchLoginTab('login');
        }, 2000);
    } else {
        document.getElementById('registerError').textContent = result.message;
    }
}

function switchLoginTab(evt, tab) {
    document.querySelectorAll('.login-tab').forEach(t => t.classList.remove('active'));
    document.getElementById(tab + 'Tab').classList.add('active');
    document.querySelectorAll('.login-tab-btn').forEach(b => b.classList.remove('active'));
    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add('active');
    }
}

function updateAccountDisplay() {
    if (!currentAccount) return;
    
    const accountDisplay = document.getElementById('accountDisplay');
    if (accountDisplay) {
        const displayName = currentAccount.isAdmin ? 'Admin' : currentAccount.username;
        accountDisplay.innerHTML = `
            <div class="account-info">
                <div class="account-header">
                    <h3>${displayName}</h3>
                    <button onclick="logout()" class="btn btn-small">Logout</button>
                </div>
                <div class="account-stats">
                    <div class="stat">Level: <strong>${currentAccount.level}</strong></div>
                    <div class="stat">Points: <strong>${currentAccount.points.toLocaleString()}</strong></div>
                    <div class="stat">Coins: <strong>💰 ${currentAccount.currency.toLocaleString()}</strong></div>
                </div>
            </div>
        `;
    }
}

function logout() {
    localStorage.removeItem('currentAccount');
    currentAccount = null;
    showScreen('loginScreen');
    document.getElementById('loginUsername').value = '';
    document.getElementById('loginPassword').value = '';
}

// Debug function to reset all data
function resetAllData() {
    localStorage.clear();
    accounts = {};
    currentAccount = null;
    location.reload();
}

function openShop() {
    showScreen('shopScreen');
    displayShop();
}

function displayShop() {
    // Update coins display
    document.getElementById('coinsDisplay').textContent = currentAccount.currency;

    // Skins section
    let skinsHTML = '<h2>🎨 Skins</h2>';

    // Regular skins
    skinsHTML += '<h3>Regular Skins</h3><div class="shop-grid">';
    for (let skinId in SKINS) {
        const skin = SKINS[skinId];
        if (skin.category !== 'regular') continue;

        const owned = currentAccount.ownedSkins.includes(skinId);
        const equipped = currentAccount.skin === skinId;
        skinsHTML += `
            <div class="shop-item ${equipped ? 'equipped' : ''}">
                <div class="skin-preview" style="${getSkinPreviewStyle(skin)}"></div>
                <h4>${skin.name}</h4>
                <p class="price">${owned ? '✓ Owned' : `💰 ${skin.price}`}</p>
                ${owned && !equipped ? `<button onclick="equipSkin('${skinId}')" class="btn btn-small">Equip</button>` : ''}
                ${!owned ? `<button onclick="buySkin('${skinId}')" class="btn btn-small">Buy</button>` : ''}
                ${equipped ? `<p style="color: gold; font-weight: bold;">⭐ Equipped</p>` : ''}
            </div>
        `;
    }
    skinsHTML += '</div>';

    // Exclusive skins
    const exclusiveSkins = Object.keys(SKINS).filter(id => SKINS[id].category === 'exclusive');
    if (exclusiveSkins.length > 0) {
        skinsHTML += '<h3>Exclusive Skins ✨</h3><div class="shop-grid exclusive-grid">';
        for (let skinId of exclusiveSkins) {
            const skin = SKINS[skinId];
            const owned = currentAccount.ownedSkins.includes(skinId);
            const equipped = currentAccount.skin === skinId;
            skinsHTML += `
                <div class="shop-item exclusive-item ${equipped ? 'equipped' : ''}">
                    <div class="skin-preview exclusive-preview" style="${getSkinPreviewStyle(skin)}"></div>
                    <h4>${skin.name}</h4>
                    <p class="price">${owned ? '✓ Unlocked' : '🔒 Exclusive'}</p>
                    ${owned && !equipped ? `<button onclick="equipSkin('${skinId}')" class="btn btn-small">Equip</button>` : ''}
                    ${equipped ? `<p style="color: gold; font-weight: bold;">⭐ Equipped</p>` : ''}
                </div>
            `;
        }
        skinsHTML += '</div>';
    }

    // Pattern skins
    const patternSkins = Object.keys(SKINS).filter(id => SKINS[id].category === 'pattern');
    if (patternSkins.length > 0) {
        skinsHTML += '<h3>Pattern Skins 🎨</h3><div class="shop-grid">';
        for (let skinId of patternSkins) {
            const skin = SKINS[skinId];
            const owned = currentAccount.ownedSkins.includes(skinId);
            const equipped = currentAccount.skin === skinId;
            skinsHTML += `
                <div class="shop-item ${equipped ? 'equipped' : ''}">
                    <div class="skin-preview" style="${getSkinPreviewStyle(skin)}"></div>
                    <h4>${skin.name}</h4>
                    <p class="price">${owned ? '✓ Owned' : `💰 ${skin.price}`}</p>
                    ${owned && !equipped ? `<button onclick="equipSkin('${skinId}')" class="btn btn-small">Equip</button>` : ''}
                    ${!owned ? `<button onclick="buySkin('${skinId}')" class="btn btn-small">Buy</button>` : ''}
                    ${equipped ? `<p style="color: gold; font-weight: bold;">⭐ Equipped</p>` : ''}
                </div>
            `;
        }
        skinsHTML += '</div>';
    }

    // Animated skins
    const animatedSkins = Object.keys(SKINS).filter(id => SKINS[id].category === 'animated');
    if (animatedSkins.length > 0) {
        skinsHTML += '<h3>Animated Skins ✨</h3><div class="shop-grid">';
        for (let skinId of animatedSkins) {
            const skin = SKINS[skinId];
            const owned = currentAccount.ownedSkins.includes(skinId);
            const equipped = currentAccount.skin === skinId;
            skinsHTML += `
                <div class="shop-item ${equipped ? 'equipped' : ''}">
                    <div class="skin-preview" style="${getSkinPreviewStyle(skin)}"></div>
                    <h4>${skin.name}</h4>
                    <p class="price">${owned ? '✓ Owned' : `💰 ${skin.price}`}</p>
                    ${owned && !equipped ? `<button onclick="equipSkin('${skinId}')" class="btn btn-small">Equip</button>` : ''}
                    ${!owned ? `<button onclick="buySkin('${skinId}')" class="btn btn-small">Buy</button>` : ''}
                    ${equipped ? `<p style="color: gold; font-weight: bold;">⭐ Equipped</p>` : ''}
                </div>
            `;
        }
        skinsHTML += '</div>';
    }

    // Shaped skins
    const shapedSkins = Object.keys(SKINS).filter(id => SKINS[id].category === 'shaped');
    if (shapedSkins.length > 0) {
        skinsHTML += '<h3>Shaped Skins 🔷</h3><div class="shop-grid">';
        for (let skinId of shapedSkins) {
            const skin = SKINS[skinId];
            const owned = currentAccount.ownedSkins.includes(skinId);
            const equipped = currentAccount.skin === skinId;
            skinsHTML += `
                <div class="shop-item ${equipped ? 'equipped' : ''}">
                    <div class="skin-preview" style="${getSkinPreviewStyle(skin)}"></div>
                    <h4>${skin.name}</h4>
                    <p class="price">${owned ? '✓ Owned' : `💰 ${skin.price}`}</p>
                    ${owned && !equipped ? `<button onclick="equipSkin('${skinId}')" class="btn btn-small">Equip</button>` : ''}
                    ${!owned ? `<button onclick="buySkin('${skinId}')" class="btn btn-small">Buy</button>` : ''}
                    ${equipped ? `<p style="color: gold; font-weight: bold;">⭐ Equipped</p>` : ''}
                </div>
            `;
        }
        skinsHTML += '</div>';
    }

    // Perks section
    let perksHTML = '<h2>⚡ Perks</h2>';

    // Regular perks
    perksHTML += '<h3>Regular Perks</h3><div class="shop-grid">';
    for (let perkId in PERKS) {
        const perk = PERKS[perkId];
        if (perk.category !== 'regular') continue;

        const owned = currentAccount.ownedPerks.includes(perkId);
        perksHTML += `
            <div class="shop-item">
                <h4>${perk.name}</h4>
                <p>${perk.description}</p>
                <p class="price">${owned ? '✓ Owned' : `💰 ${perk.price}`}</p>
                ${!owned ? `<button onclick="buyPerk('${perkId}')" class="btn btn-small">Buy</button>` : ''}
            </div>
        `;
    }
    perksHTML += '</div>';

    // Exclusive perks
    const exclusivePerks = Object.keys(PERKS).filter(id => PERKS[id].category === 'exclusive');
    if (exclusivePerks.length > 0) {
        perksHTML += '<h3>Exclusive Perks ✨</h3><div class="shop-grid exclusive-grid">';
        for (let perkId of exclusivePerks) {
            const perk = PERKS[perkId];
            const owned = currentAccount.ownedPerks.includes(perkId);
            perksHTML += `
                <div class="shop-item exclusive-item">
                    <h4>${perk.name}</h4>
                    <p>${perk.description}</p>
                    <p class="price">${owned ? '✓ Unlocked' : '🔒 Exclusive'}</p>
                </div>
            `;
        }
        perksHTML += '</div>';
    }

    // Cheat code section (Admin only)
    let cheatHTML = '';
    if (currentAccount.isAdmin) {
        cheatHTML = `
            <h2>🎯 Admin Access</h2>
            <div class="admin-notice">
                <p style="color: #666; font-size: 14px;">Admin users can access cheat codes and admin panel from the Profile screen.</p>
                <button onclick="openProfile()" class="btn btn-secondary">Go to Profile</button>
            </div>
        `;
    }

    document.getElementById('shopContent').innerHTML = skinsHTML + perksHTML + cheatHTML;
}

function buySkin(skinId) {
    const result = purchaseSkin(skinId);
    if (result.success) {
        alert(result.message);
        displayShop();
        updateAccountDisplay();
    } else {
        alert(result.message);
    }
}

function redeemAdminCheat() {
    const cheatCode = document.getElementById('adminCheatCodeInput').value.trim();
    if (!cheatCode) {
        document.getElementById('adminCheatMessage').innerHTML = '<p style="color: red;">Please enter a cheat code!</p>';
        return;
    }

    const result = redeemCheatCode(cheatCode);
    if (result.success) {
        document.getElementById('adminCheatMessage').innerHTML = `<p style="color: green;">${result.message.replace('\n', '<br>')}</p>`;
        document.getElementById('adminCheatCodeInput').value = '';
        updateAccountDisplay();
        openProfile(); // Refresh profile
    } else {
        document.getElementById('adminCheatMessage').innerHTML = `<p style="color: red;">${result.message}</p>`;
    }
}

function redeemCheat() {
    const cheatCode = document.getElementById('cheatCodeInput').value.trim();
    if (!cheatCode) {
        document.getElementById('cheatMessage').innerHTML = '<p style="color: red;">Please enter a cheat code!</p>';
        return;
    }

    const result = redeemCheatCode(cheatCode);
    if (result.success) {
        document.getElementById('cheatMessage').innerHTML = `<p style="color: green;">${result.message.replace('\n', '<br>')}</p>`;
        document.getElementById('cheatCodeInput').value = '';
        updateAccountDisplay();
        // Stay on cheat screen
    } else {
        document.getElementById('cheatMessage').innerHTML = `<p style="color: red;">${result.message}</p>`;
    }
}

function updateAvailableCheatsDisplay() {
    const container = document.getElementById('availableCheatsContainer');
    if (!container) return;

    if (!currentAccount || !currentAccount.isAdmin) {
        container.innerHTML = `
            <h3>Cheat Codes (Admin-only)</h3>
            <p style="color: #666;">Cheat codes are hidden for normal users. Login as an admin to view and redeem codes.</p>
        `;
        return;
    }

    const visibleCheats = Object.entries(CHEAT_CODES);
    if (visibleCheats.length === 0) {
        container.innerHTML = `<p style="color: #666;">No cheat codes currently available.</p>`;
        return;
    }

    container.innerHTML = `
        <h3>Available Cheat Codes:</h3>
        <div class="cheat-codes-grid">
            ${visibleCheats.map(([code, cheat]) => `
                <div class="cheat-code-item">
                    <code>${code}</code>
                    <p>${cheat.name} (+${cheat.bonusCurrency} coins, +${cheat.bonusPoints} points)</p>
                </div>
            `).join('')}
        </div>
    `;
}

function openCheatScreen() {
    updateAvailableCheatsDisplay();
    showScreen('cheatScreen');
}

function openAdminPanel() {
    if (!currentAccount || !currentAccount.isAdmin) {
        alert('Access denied! Admin privileges required.');
        return;
    }
    showScreen('adminPanel');
    loadAdminContent();
}

function switchAdminTab(evt, tab) {
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    document.getElementById(tab + 'Tab').classList.add('active');
    document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add('active');
    }
}

function addNewSkin() {
    const name = document.getElementById('newSkinName').value.trim();
    const color = document.getElementById('newSkinColor').value.trim();
    const price = parseInt(document.getElementById('newSkinPrice').value);
    const category = document.getElementById('newSkinCategory').value;

    if (!name || !color || isNaN(price)) {
        document.getElementById('skinAddMessage').innerHTML = '<p style="color: red;">Please fill in all fields!</p>';
        return;
    }

    // Generate skin ID from name
    const skinId = name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');

    if (SKINS[skinId]) {
        document.getElementById('skinAddMessage').innerHTML = '<p style="color: red;">Skin with this ID already exists!</p>';
        return;
    }

    SKINS[skinId] = {
        name: name,
        color: color,
        price: price,
        category: category,
        unlocked: category === 'regular'
    };

    // Save to localStorage
    localStorage.setItem('customSkins', JSON.stringify(SKINS));

    document.getElementById('skinAddMessage').innerHTML = '<p style="color: green;">Skin added successfully!</p>';
    document.getElementById('newSkinName').value = '';
    document.getElementById('newSkinColor').value = '';
    document.getElementById('newSkinPrice').value = '';
    loadAdminContent();
}

function addNewCheatCode() {
    const code = document.getElementById('newCheatCode').value.trim().toUpperCase();
    const name = document.getElementById('newCheatName').value.trim();
    const coins = parseInt(document.getElementById('newCheatCoins').value) || 0;
    const points = parseInt(document.getElementById('newCheatPoints').value) || 0;
    const skins = document.getElementById('newCheatSkins').value.trim().split(',').map(s => s.trim()).filter(s => s);
    const perks = document.getElementById('newCheatPerks').value.trim().split(',').map(p => p.trim()).filter(p => p);

    if (!code || !name) {
        document.getElementById('cheatAddMessage').innerHTML = '<p style="color: red;">Please fill in code and name!</p>';
        return;
    }

    if (CHEAT_CODES[code]) {
        document.getElementById('cheatAddMessage').innerHTML = '<p style="color: red;">Cheat code already exists!</p>';
        return;
    }

    CHEAT_CODES[code] = {
        name: name,
        bonusCurrency: coins,
        bonusPoints: points,
        exclusiveSkins: skins,
        exclusivePerks: perks
    };

    // Save to localStorage
    localStorage.setItem('customCheatCodes', JSON.stringify(CHEAT_CODES));

    document.getElementById('cheatAddMessage').innerHTML = '<p style="color: green;">Cheat code added successfully!</p>';
    document.getElementById('newCheatCode').value = '';
    document.getElementById('newCheatName').value = '';
    document.getElementById('newCheatCoins').value = '';
    document.getElementById('newCheatPoints').value = '';
    document.getElementById('newCheatSkins').value = '';
    document.getElementById('newCheatPerks').value = '';
    loadAdminContent();
}

function loadAdminContent() {
    // Load custom skins and cheat codes from localStorage
    const savedSkins = localStorage.getItem('customSkins');
    if (savedSkins) {
        const customSkins = JSON.parse(savedSkins);
        Object.assign(SKINS, customSkins);
    }

    const savedCheats = localStorage.getItem('customCheatCodes');
    if (savedCheats) {
        const customCheats = JSON.parse(savedCheats);
        Object.assign(CHEAT_CODES, customCheats);
    }

    // Update skins list
    let skinsHTML = '';
    for (const [skinId, skin] of Object.entries(SKINS)) {
        skinsHTML += `
            <div class="manage-item">
                <div class="item-info">
                    <strong>${skin.name}</strong> (${skinId}) - ${skin.price} coins
                    <div style="background-color: ${skin.color}; width: 30px; height: 30px; display: inline-block; margin-left: 10px; border-radius: 3px;"></div>
                </div>
                <button onclick="deleteSkin('${skinId}')" class="btn btn-small btn-danger">Delete</button>
            </div>
        `;
    }
    document.getElementById('skinsList').innerHTML = skinsHTML;

    // Update cheats list
    let cheatsHTML = '';
    for (const [code, cheat] of Object.entries(CHEAT_CODES)) {
        cheatsHTML += `
            <div class="manage-item">
                <div class="item-info">
                    <strong>${code}</strong> - ${cheat.name}<br>
                    <small>+${cheat.bonusCurrency} coins, +${cheat.bonusPoints} points</small>
                </div>
                <button onclick="deleteCheatCode('${code}')" class="btn btn-small btn-danger">Delete</button>
            </div>
        `;
    }
    document.getElementById('cheatsList').innerHTML = cheatsHTML;
}

function deleteSkin(skinId) {
    if (confirm(`Are you sure you want to delete the skin "${SKINS[skinId].name}"?`)) {
        delete SKINS[skinId];
        localStorage.setItem('customSkins', JSON.stringify(SKINS));
        loadAdminContent();
    }
}

function deleteCheatCode(code) {
    if (confirm(`Are you sure you want to delete the cheat code "${code}"?`)) {
        delete CHEAT_CODES[code];
        localStorage.setItem('customCheatCodes', JSON.stringify(CHEAT_CODES));
        loadAdminContent();
    }
}

function openProfile() {
    let html = `
        <div class="profile-container">
            <h2>👤 ${currentAccount.username}</h2>
            <div class="profile-stats">
                <div class="profile-stat">
                    <p class="label">Level</p>
                    <p class="value">${currentAccount.level}</p>
                </div>
                <div class="profile-stat">
                    <p class="label">Total Points</p>
                    <p class="value">${currentAccount.totalScore.toLocaleString()}</p>
                </div>
                <div class="profile-stat">
                    <p class="label">Games Played</p>
                    <p class="value">${currentAccount.gamesPlayed}</p>
                </div>
                <div class="profile-stat">
                    <p class="label">Coins</p>
                    <p class="value">💰 ${currentAccount.currency.toLocaleString()}</p>
                </div>
            </div>
            
            <div class="profile-actions">
                <button onclick="openCheatScreen()" class="btn btn-primary">🎯 Cheat Codes</button>
                ${currentAccount.isAdmin ? '<button onclick="openAdminPanel()" class="btn btn-danger">⚙️ Admin Panel</button>' : ''}
            </div>
            
            <h3>Current Skin</h3>
            <div style="background-color: ${SKINS[currentAccount.skin].color}; width: 100px; height: 100px; margin: 10px auto; border-radius: 5px;"></div>
            <p>${SKINS[currentAccount.skin].name}</p>
            
            <h3>Owned Skins (${currentAccount.ownedSkins.length})</h3>
            <div class="skins-list">
                ${currentAccount.ownedSkins.map(s => `<span>${SKINS[s].name}</span>`).join('')}
            </div>
            
            <h3>Owned Perks (${currentAccount.ownedPerks.length})</h3>
            <div class="perks-list">
                ${currentAccount.ownedPerks.map(p => `<span>${PERKS[p].name}</span>`).join('')}
            </div>
    `;

    // Admin controls section
    if (currentAccount.isAdmin) {
        html += `
            <h2>🎯 Admin Controls</h2>
            <div class="admin-section">
                <p style="color: #666; font-size: 14px;">As an admin, you have access to cheat codes and special features!</p>
                <div class="form-group">
                    <input type="text" id="adminCheatCodeInput" placeholder="Enter cheat code..." class="form-control" style="text-transform: uppercase;">
                    <button onclick="redeemAdminCheat()" class="btn btn-primary">Redeem Cheat</button>
                </div>
                <div id="adminCheatMessage" class="cheat-message"></div>
                <div class="available-cheats">
                    <p><strong>Available Cheat Codes:</strong></p>
                    <ul>
                        <li><code>1267</code> - Creator Access - FULL UNLOCK (Everything + 999k coins)</li>
                        <li><code>GODMODE</code> - God Mode (Invincibility + unlimited coins)</li>
                        <li><code>RICH</code> - Infinite Wealth (100k coins)</li>
                        <li><code>WINNER</code> - Instant Victory (Auto-win games)</li>
                        <li><code>LEGEND</code> - Legendary (Dragon & Phoenix skins + all perks)</li>
                    </ul>
                </div>
            </div>
        `;
    }

    html += `</div>`;
    document.getElementById('profileContent').innerHTML = html;
    showScreen('profileScreen');
}

// ==================== ONLY UP GAME MODE ====================
let onlyUpState = {
    playerX: 50,
    playerY: 450,
    playerWidth: 30,
    playerHeight: 30,
    playerVelocityY: 0,
    playerVelocityX: 0,
    gravity: 0.5,
    jumpPower: -12,
    platforms: [],
    enemies: [],
    score: 0,
    gameActive: true,
    currentQuestion: 0,
    answered: false,
    selectedAnswer: null,
    maxHeight: 0,
};

function startOnlyUp() {
    currentGameMode = 'onlyup';
    gameState.currentQuestion = 0;
    gameState.score = 0;
    onlyUpState.playerX = 50;
    onlyUpState.playerY = 450;
    onlyUpState.playerVelocityY = 0;
    onlyUpState.playerVelocityX = 0;
    onlyUpState.platforms = [];
    onlyUpState.score = 0;
    onlyUpState.gameActive = true;
    onlyUpState.maxHeight = 0;
    
    // Generate platforms
    for (let i = 0; i < 15; i++) {
        onlyUpState.platforms.push({
            x: Math.random() * (900 - 80),
            y: 500 - (i * 50),
            width: 80,
            height: 15,
            hasQuestion: i % 3 === 0,
            questionIndex: Math.floor(Math.random() * currentQuiz.questions.length),
        });
    }
    
    showScreen('onlyUpGame');
    loadOnlyUpQuestion();
    onlyUpGameLoop();
}

function loadOnlyUpQuestion() {
    if (gameState.currentQuestion >= currentQuiz.questions.length) {
        endOnlyUpGame();
        return;
    }
    
    const question = currentQuiz.questions[gameState.currentQuestion];
    document.getElementById('onlyUpQuestion').textContent = question.question;
    
    let answersHTML = '';
    const answers = [question.answer1, question.answer2, question.answer3, question.answer4];
    for (let i = 0; i < 4; i++) {
        answersHTML += `<button class="answer-btn" onclick="selectOnlyUpAnswer(${i})">${answers[i]}</button>`;
    }
    document.getElementById('onlyUpAnswers').innerHTML = answersHTML;
    onlyUpState.answered = false;
    onlyUpState.selectedAnswer = null;
}

function selectOnlyUpAnswer(index) {
    if (onlyUpState.answered) return;
    onlyUpState.answered = true;
    
    const question = currentQuiz.questions[gameState.currentQuestion];
    if (index === question.correct - 1) {
        onlyUpState.playerVelocityY = onlyUpState.jumpPower;
        gameState.score += 100;
        gameState.correctAnswers++;
    } else {
        onlyUpState.playerVelocityY = 5; // Bounce down
        gameState.score = Math.max(0, gameState.score - 10);
    }
    
    gameState.currentQuestion++;
    setTimeout(loadOnlyUpQuestion, 800);
}

function onlyUpGameLoop() {
    const canvas = document.getElementById('onlyUpCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Update player physics
    onlyUpState.playerVelocityY += onlyUpState.gravity;
    onlyUpState.playerY += onlyUpState.playerVelocityY;
    onlyUpState.playerX += onlyUpState.playerVelocityX * 2;
    
    // Boundaries
    if (onlyUpState.playerX < 0) onlyUpState.playerX = 0;
    if (onlyUpState.playerX + onlyUpState.playerWidth > canvas.width) {
        onlyUpState.playerX = canvas.width - onlyUpState.playerWidth;
    }
    
    // Platform collision
    for (let platform of onlyUpState.platforms) {
        if (onlyUpState.playerVelocityY > 0 &&
            onlyUpState.playerY + onlyUpState.playerHeight >= platform.y &&
            onlyUpState.playerY + onlyUpState.playerHeight <= platform.y + 20 &&
            onlyUpState.playerX + onlyUpState.playerWidth > platform.x &&
            onlyUpState.playerX < platform.x + platform.width) {
            onlyUpState.playerVelocityY = onlyUpState.jumpPower;
        }
    }
    
    // Update max height
    const currentHeight = 500 - onlyUpState.playerY;
    if (currentHeight > onlyUpState.maxHeight) {
        onlyUpState.maxHeight = currentHeight;
    }
    
    // Game over if fell
    if (onlyUpState.playerY > canvas.height) {
        endOnlyUpGame();
        return;
    }
    
    // Move camera & platforms up if player is high
    const cameraY = Math.max(0, onlyUpState.playerY - 200);
    
    onlyUpState.platforms.forEach(p => {
        p.y -= (cameraY - (onlyUpState.playerY - 200)) * 0.1;
    });
    
    // Add new platforms if needed
    if (onlyUpState.platforms[onlyUpState.platforms.length - 1].y > 0) {
        const lastPlatform = onlyUpState.platforms[onlyUpState.platforms.length - 1];
        onlyUpState.platforms.push({
            x: Math.random() * (canvas.width - 80),
            y: lastPlatform.y - 50,
            width: 80,
            height: 15,
            hasQuestion: Math.random() > 0.5,
            questionIndex: Math.floor(Math.random() * (currentQuiz.questions.length - gameState.currentQuestion)),
        });
    }
    
    // Remove off-screen platforms
    onlyUpState.platforms = onlyUpState.platforms.filter(p => p.y < canvas.height + 100);
    
    // Draw
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    ctx.fillStyle = '#70c5ce';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw platforms
    ctx.fillStyle = '#228B22';
    for (let platform of onlyUpState.platforms) {
        ctx.fillRect(platform.x, platform.y - cameraY, platform.width, platform.height);
    }
    
    // Draw player
    const playerScreenY = onlyUpState.playerY - cameraY;
    ctx.fillStyle = SKINS[currentAccount.skin].color || '#667eea';
    ctx.fillRect(onlyUpState.playerX, playerScreenY, onlyUpState.playerWidth, onlyUpState.playerHeight);
    
    // Draw HUD
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    ctx.fillText('Score: ' + gameState.score, 10, 30);
    ctx.fillText('Height: ' + Math.floor(onlyUpState.maxHeight), 10, 60);
    
    // Update displays
    document.getElementById('onlyUpScore').textContent = gameState.score;
    document.getElementById('onlyUpHeight').textContent = Math.floor(onlyUpState.maxHeight);
    
    if (onlyUpState.gameActive) {
        requestAnimationFrame(onlyUpGameLoop);
    }
}

function endOnlyUpGame() {
    onlyUpState.gameActive = false;
    const totalScore = gameState.score + Math.floor(onlyUpState.maxHeight / 10);
    document.getElementById('onlyUpFinalScore').textContent = totalScore;
    document.getElementById('onlyUpMaxHeight').textContent = Math.floor(onlyUpState.maxHeight);
    document.getElementById('onlyUpCorrect').textContent = gameState.correctAnswers;
    onGameEnd(totalScore);
    showScreen('onlyUpGameOver');
}

// ==================== TIME ATTACK MODE ====================
function startTimeAttackGame() {
    gameState = {
        currentQuestion: 0,
        score: 0,
        health: 100,
        correctAnswers: 0,
        totalAnswered: 0,
        gameActive: true,
        answered: false,
        selectedAnswer: null,
        timeRemaining: 120, // 2 minutes
        maxTime: 120,
        targetQuestions: 50,
        mode: 'timeattack'
    };

    showScreen('regularQuizScreen');
    document.querySelector('.quiz-header').innerHTML = `
        <div class="quiz-info">
            <span id="timeAttackProgress">Question 1 of 50</span>
            <span id="timeAttackTimer">Time: 2:00</span>
        </div>
        <div class="progress-bar">
            <div id="timeAttackBar" class="progress-fill" style="width: 0%"></div>
        </div>
    `;
    loadTimeAttackQuestion();
    timeAttackLoop();
}

function loadTimeAttackQuestion() {
    if (gameState.currentQuestion >= gameState.targetQuestions || gameState.timeRemaining <= 0) {
        endTimeAttackGame();
        return;
    }

    const question = currentQuiz.questions[gameState.currentQuestion % currentQuiz.questions.length];
    document.getElementById('regularQuestionText').textContent = question.text;
    gameState.answered = false;

    const container = document.getElementById('regularAnswersContainer');
    container.innerHTML = '';

    question.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-answer-btn';
        btn.textContent = answer;
        btn.onclick = () => answerTimeAttackQuestion(index);
        container.appendChild(btn);
    });

    updateTimeAttackDisplay();
}

function answerTimeAttackQuestion(answerIndex) {
    if (gameState.answered) return;

    gameState.answered = true;
    const question = currentQuiz.questions[gameState.currentQuestion % currentQuiz.questions.length];
    const buttons = document.querySelectorAll('.quiz-answer-btn');

    buttons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === question.correctAnswer) {
            btn.classList.add('quiz-correct');
        } else if (idx === answerIndex) {
            btn.classList.add('quiz-incorrect');
        }
    });

    gameState.totalAnswered++;
    if (answerIndex === question.correctAnswer) {
        gameState.score += 20;
        gameState.correctAnswers++;
    } else {
        gameState.score = Math.max(0, gameState.score - 5);
    }

    updateTimeAttackDisplay();
    gameState.currentQuestion++;
    setTimeout(loadTimeAttackQuestion, 800);
}

function updateTimeAttackDisplay() {
    document.getElementById('timeAttackProgress').textContent = `Question ${gameState.currentQuestion + 1} of ${gameState.targetQuestions}`;
    const progress = (gameState.currentQuestion / gameState.targetQuestions) * 100;
    document.getElementById('timeAttackBar').style.width = progress + '%';
}

function timeAttackLoop() {
    if (!gameState.gameActive) return;

    gameState.timeRemaining--;
    const minutes = Math.floor(gameState.timeRemaining / 60);
    const seconds = gameState.timeRemaining % 60;
    document.getElementById('timeAttackTimer').textContent = `Time: ${minutes}:${seconds.toString().padStart(2, '0')}`;

    if (gameState.timeRemaining <= 0) {
        endTimeAttackGame();
        return;
    }

    requestAnimationFrame(timeAttackLoop);
}

function endTimeAttackGame() {
    gameState.gameActive = false;
    document.getElementById('finalScore').textContent = gameState.score;
    document.getElementById('questionsAnswered').textContent = gameState.totalAnswered;
    document.getElementById('correctAnswers').textContent = gameState.correctAnswers;

    const accuracy = gameState.totalAnswered > 0 ? Math.round((gameState.correctAnswers / gameState.totalAnswered) * 100) : 0;
    document.getElementById('accuracy').textContent = accuracy;
    document.getElementById('accuracyText').style.display = 'block';

    document.getElementById('gameOverTitle').textContent = '⏱️ Time Attack Complete!';
    showScreen('gameOverScreen');
}

// ==================== CATEGORY CHALLENGE MODE ====================
function startCategoryChallenge() {
    gameState = {
        currentQuestion: 0,
        score: 0,
        health: 100,
        correctAnswers: 0,
        totalAnswered: 0,
        gameActive: true,
        answered: false,
        selectedAnswer: null,
        timeRemaining: 0,
        maxTime: 0,
        categories: ['Science', 'Math', 'History', 'Geography', 'Literature'],
        currentCategory: 0,
        questionsPerCategory: 10,
        mode: 'category'
    };

    showScreen('regularQuizScreen');
    document.querySelector('.quiz-header').innerHTML = `
        <div class="quiz-info">
            <span id="categoryName">Category: Science</span>
            <span id="categoryProgress">1 of 10</span>
        </div>
        <div class="progress-bar">
            <div id="categoryBar" class="progress-fill" style="width: 0%"></div>
        </div>
    `;
    loadCategoryQuestion();
    regularQuizLoop();
}

function loadCategoryQuestion() {
    if (gameState.currentQuestion >= gameState.questionsPerCategory) {
        // Move to next category
        gameState.currentCategory++;
        gameState.currentQuestion = 0;
        
        if (gameState.currentCategory >= gameState.categories.length) {
            endCategoryChallenge();
            return;
        }
    }

    // For demo purposes, we'll use all questions. In a real implementation, you'd filter by category
    const questionIndex = (gameState.currentCategory * gameState.questionsPerCategory + gameState.currentQuestion) % currentQuiz.questions.length;
    const question = currentQuiz.questions[questionIndex];
    
    document.getElementById('regularQuestionText').textContent = question.text;
    gameState.answered = false;

    const container = document.getElementById('regularAnswersContainer');
    container.innerHTML = '';

    question.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-answer-btn';
        btn.textContent = answer;
        btn.onclick = () => answerCategoryQuestion(index);
        container.appendChild(btn);
    });

    updateCategoryDisplay();
}

function answerCategoryQuestion(answerIndex) {
    if (gameState.answered) return;

    gameState.answered = true;
    const questionIndex = (gameState.currentCategory * gameState.questionsPerCategory + gameState.currentQuestion) % currentQuiz.questions.length;
    const question = currentQuiz.questions[questionIndex];
    const buttons = document.querySelectorAll('.quiz-answer-btn');

    buttons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === question.correctAnswer) {
            btn.classList.add('quiz-correct');
        } else if (idx === answerIndex) {
            btn.classList.add('quiz-incorrect');
        }
    });

    gameState.totalAnswered++;
    if (answerIndex === question.correctAnswer) {
        gameState.score += 25;
        gameState.correctAnswers++;
    }

    updateCategoryDisplay();
    gameState.currentQuestion++;
    setTimeout(loadCategoryQuestion, 1500);
}

function updateCategoryDisplay() {
    document.getElementById('categoryName').textContent = `Category: ${gameState.categories[gameState.currentCategory]}`;
    document.getElementById('categoryProgress').textContent = `${gameState.currentQuestion + 1} of ${gameState.questionsPerCategory}`;
    const progress = (gameState.currentQuestion / gameState.questionsPerCategory) * 100;
    document.getElementById('categoryBar').style.width = progress + '%';
}

function endCategoryChallenge() {
    gameState.gameActive = false;
    document.getElementById('finalScore').textContent = gameState.score;
    document.getElementById('questionsAnswered').textContent = gameState.totalAnswered;
    document.getElementById('correctAnswers').textContent = gameState.correctAnswers;

    const accuracy = gameState.totalAnswered > 0 ? Math.round((gameState.correctAnswers / gameState.totalAnswered) * 100) : 0;
    document.getElementById('accuracy').textContent = accuracy;
    document.getElementById('accuracyText').style.display = 'block';

    document.getElementById('gameOverTitle').textContent = '📂 Category Challenge Complete!';
    showScreen('gameOverScreen');
}

// ==================== BOSS BATTLE MODE ====================
function startBossBattle() {
    gameState = {
        currentQuestion: 0,
        score: 0,
        health: 100,
        correctAnswers: 0,
        totalAnswered: 0,
        gameActive: true,
        answered: false,
        selectedAnswer: null,
        timeRemaining: 0,
        maxTime: 0,
        bosses: ['Training Dummy', 'Quiz Master', 'Brain Bender', 'Knowledge King', 'Ultimate Sage'],
        currentBoss: 0,
        bossHealth: 100,
        mode: 'boss'
    };

    showScreen('regularQuizScreen');
    document.querySelector('.quiz-header').innerHTML = `
        <div class="quiz-info">
            <span id="bossName">Boss: Training Dummy</span>
            <span id="bossHealth">Boss HP: 100/100</span>
        </div>
        <div class="progress-bar">
            <div id="bossBar" class="progress-fill" style="width: 100%; background: linear-gradient(90deg, #FF0000, #FF4500);"></div>
        </div>
    `;
    loadBossQuestion();
    regularQuizLoop();
}

function loadBossQuestion() {
    if (gameState.currentBoss >= gameState.bosses.length) {
        endBossBattle();
        return;
    }

    const question = currentQuiz.questions[gameState.currentQuestion % currentQuiz.questions.length];
    document.getElementById('regularQuestionText').textContent = question.text;
    gameState.answered = false;

    const container = document.getElementById('regularAnswersContainer');
    container.innerHTML = '';

    question.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-answer-btn';
        btn.textContent = answer;
        btn.onclick = () => answerBossQuestion(index);
        container.appendChild(btn);
    });

    updateBossDisplay();
}

function answerBossQuestion(answerIndex) {
    if (gameState.answered) return;

    gameState.answered = true;
    const question = currentQuiz.questions[gameState.currentQuestion % currentQuiz.questions.length];
    const buttons = document.querySelectorAll('.quiz-answer-btn');

    buttons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === question.correctAnswer) {
            btn.classList.add('quiz-correct');
        } else if (idx === answerIndex) {
            btn.classList.add('quiz-incorrect');
        }
    });

    gameState.totalAnswered++;
    if (answerIndex === question.correctAnswer) {
        gameState.score += 30;
        gameState.correctAnswers++;
        // Damage boss
        gameState.bossHealth -= 20;
        if (gameState.bossHealth <= 0) {
            // Boss defeated
            gameState.currentBoss++;
            gameState.bossHealth = 100 + (gameState.currentBoss * 25); // Bosses get stronger
        }
    } else {
        // Boss attacks back
        gameState.health -= 15;
        if (gameState.health <= 0) {
            endBossBattle();
            return;
        }
    }

    updateBossDisplay();
    gameState.currentQuestion++;
    setTimeout(loadBossQuestion, 1500);
}

function updateBossDisplay() {
    document.getElementById('bossName').textContent = `Boss: ${gameState.bosses[gameState.currentBoss]}`;
    document.getElementById('bossHealth').textContent = `Boss HP: ${Math.max(0, gameState.bossHealth)}/100`;
    const healthPercent = Math.max(0, (gameState.bossHealth / 100) * 100);
    document.getElementById('bossBar').style.width = healthPercent + '%';
}

function endBossBattle() {
    gameState.gameActive = false;
    document.getElementById('finalScore').textContent = gameState.score;
    document.getElementById('questionsAnswered').textContent = gameState.totalAnswered;
    document.getElementById('correctAnswers').textContent = gameState.correctAnswers;

    const accuracy = gameState.totalAnswered > 0 ? Math.round((gameState.correctAnswers / gameState.totalAnswered) * 100) : 0;
    document.getElementById('accuracy').textContent = accuracy;
    document.getElementById('accuracyText').style.display = 'block';

    const defeatedBosses = gameState.currentBoss;
    document.getElementById('gameOverTitle').textContent = `👹 Boss Battle Complete! Defeated ${defeatedBosses} bosses!`;
    showScreen('gameOverScreen');
}

// ==================== PUZZLE MODE ====================
function startPuzzleMode() {
    gameState = {
        currentQuestion: 0,
        score: 0,
        health: 100,
        correctAnswers: 0,
        totalAnswered: 0,
        gameActive: true,
        answered: false,
        selectedAnswer: null,
        timeRemaining: 0,
        maxTime: 0,
        puzzles: [
            { text: "What has keys but can't open locks?", answers: ["Piano", "Computer", "Music", "Door"], correct: 0 },
            { text: "What comes once in a minute, twice in a moment, but never in a thousand years?", answers: ["M", "O", "E", "T"], correct: 0 },
            { text: "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?", answers: ["Echo", "Wind", "Voice", "Air"], correct: 0 },
            { text: "What has a head, a tail, is brown, and has no legs?", answers: ["Penny", "Snake", "Coin", "Quarter"], correct: 0 },
            { text: "What can you break, even if you never pick it up or touch it?", answers: ["Promise", "Glass", "Rule", "Law"], correct: 0 }
        ],
        mode: 'puzzle'
    };

    showScreen('regularQuizScreen');
    document.querySelector('.quiz-header').innerHTML = `
        <div class="quiz-info">
            <span id="puzzleProgress">Puzzle 1 of 5</span>
            <span id="puzzleScore">Score: 0</span>
        </div>
    `;
    loadPuzzleQuestion();
    regularQuizLoop();
}

function loadPuzzleQuestion() {
    if (gameState.currentQuestion >= gameState.puzzles.length) {
        endPuzzleMode();
        return;
    }

    const puzzle = gameState.puzzles[gameState.currentQuestion];
    document.getElementById('regularQuestionText').textContent = puzzle.text;
    gameState.answered = false;

    const container = document.getElementById('regularAnswersContainer');
    container.innerHTML = '';

    puzzle.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-answer-btn';
        btn.textContent = answer;
        btn.onclick = () => answerPuzzleQuestion(index);
        container.appendChild(btn);
    });

    updatePuzzleDisplay();
}

function answerPuzzleQuestion(answerIndex) {
    if (gameState.answered) return;

    gameState.answered = true;
    const puzzle = gameState.puzzles[gameState.currentQuestion];
    const buttons = document.querySelectorAll('.quiz-answer-btn');

    buttons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === puzzle.correct) {
            btn.classList.add('quiz-correct');
        } else if (idx === answerIndex) {
            btn.classList.add('quiz-incorrect');
        }
    });

    gameState.totalAnswered++;
    if (answerIndex === puzzle.correct) {
        gameState.score += 50;
        gameState.correctAnswers++;
    }

    updatePuzzleDisplay();
    gameState.currentQuestion++;
    setTimeout(loadPuzzleQuestion, 2000);
}

function updatePuzzleDisplay() {
    document.getElementById('puzzleProgress').textContent = `Puzzle ${gameState.currentQuestion + 1} of ${gameState.puzzles.length}`;
    document.getElementById('puzzleScore').textContent = `Score: ${gameState.score}`;
}

function endPuzzleMode() {
    gameState.gameActive = false;
    document.getElementById('finalScore').textContent = gameState.score;
    document.getElementById('questionsAnswered').textContent = gameState.totalAnswered;
    document.getElementById('correctAnswers').textContent = gameState.correctAnswers;

    const accuracy = gameState.totalAnswered > 0 ? Math.round((gameState.correctAnswers / gameState.totalAnswered) * 100) : 0;
    document.getElementById('accuracy').textContent = accuracy;
    document.getElementById('accuracyText').style.display = 'block';

    document.getElementById('gameOverTitle').textContent = '🧩 Puzzle Mode Complete!';
    showScreen('gameOverScreen');
}

// ==================== MARATHON MODE ====================
function startMarathonMode() {
    gameState = {
        currentQuestion: 0,
        score: 0,
        health: 100,
        correctAnswers: 0,
        totalAnswered: 0,
        gameActive: true,
        answered: false,
        selectedAnswer: null,
        timeRemaining: 0,
        maxTime: 0,
        stamina: 100,
        targetQuestions: 100,
        mode: 'marathon'
    };

    showScreen('regularQuizScreen');
    document.querySelector('.quiz-header').innerHTML = `
        <div class="quiz-info">
            <span id="marathonProgress">Question 1 of 100</span>
            <span id="marathonStamina">Stamina: 100/100</span>
        </div>
        <div class="progress-bar">
            <div id="marathonBar" class="progress-fill" style="width: 0%"></div>
        </div>
        <div class="progress-bar" style="margin-top: 5px;">
            <div id="staminaBar" class="progress-fill" style="width: 100%; background: linear-gradient(90deg, #00FF00, #FFFF00, #FF0000);"></div>
        </div>
    `;
    loadMarathonQuestion();
    regularQuizLoop();
}

function loadMarathonQuestion() {
    if (gameState.currentQuestion >= gameState.targetQuestions || gameState.stamina <= 0) {
        endMarathonMode();
        return;
    }

    const question = currentQuiz.questions[gameState.currentQuestion % currentQuiz.questions.length];
    document.getElementById('regularQuestionText').textContent = question.text;
    gameState.answered = false;

    const container = document.getElementById('regularAnswersContainer');
    container.innerHTML = '';

    question.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-answer-btn';
        btn.textContent = answer;
        btn.onclick = () => answerMarathonQuestion(index);
        container.appendChild(btn);
    });

    updateMarathonDisplay();
}

function answerMarathonQuestion(answerIndex) {
    if (gameState.answered) return;

    gameState.answered = true;
    const question = currentQuiz.questions[gameState.currentQuestion % currentQuiz.questions.length];
    const buttons = document.querySelectorAll('.quiz-answer-btn');

    buttons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === question.correctAnswer) {
            btn.classList.add('quiz-correct');
        } else if (idx === answerIndex) {
            btn.classList.add('quiz-incorrect');
        }
    });

    gameState.totalAnswered++;
    if (answerIndex === question.correctAnswer) {
        gameState.score += 15;
        gameState.correctAnswers++;
        // Restore some stamina for correct answers
        gameState.stamina = Math.min(100, gameState.stamina + 5);
    } else {
        // Lose stamina for wrong answers
        gameState.stamina -= 10;
        if (gameState.stamina <= 0) {
            endMarathonMode();
            return;
        }
    }

    updateMarathonDisplay();
    gameState.currentQuestion++;
    setTimeout(loadMarathonQuestion, 1200);
}

function updateMarathonDisplay() {
    document.getElementById('marathonProgress').textContent = `Question ${gameState.currentQuestion + 1} of ${gameState.targetQuestions}`;
    document.getElementById('marathonStamina').textContent = `Stamina: ${Math.max(0, gameState.stamina)}/100`;
    
    const progress = (gameState.currentQuestion / gameState.targetQuestions) * 100;
    document.getElementById('marathonBar').style.width = progress + '%';
    
    const staminaPercent = Math.max(0, (gameState.stamina / 100) * 100);
    document.getElementById('staminaBar').style.width = staminaPercent + '%';
}

function endMarathonMode() {
    gameState.gameActive = false;
    document.getElementById('finalScore').textContent = gameState.score;
    document.getElementById('questionsAnswered').textContent = gameState.totalAnswered;
    document.getElementById('correctAnswers').textContent = gameState.correctAnswers;

    const accuracy = gameState.totalAnswered > 0 ? Math.round((gameState.correctAnswers / gameState.totalAnswered) * 100) : 0;
    document.getElementById('accuracy').textContent = accuracy;
    document.getElementById('accuracyText').style.display = 'block';

    const completed = gameState.stamina <= 0 ? ' (Ran out of stamina!)' : ' (Completed!)';
    document.getElementById('gameOverTitle').textContent = `🏃 Marathon Mode Complete!${completed}`;
    showScreen('gameOverScreen');
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    loadAccounts();
    loadCurrentAccount();
    
    // Load custom skins and cheat codes
    const savedSkins = localStorage.getItem('customSkins');
    if (savedSkins) {
        const customSkins = JSON.parse(savedSkins);
        Object.assign(SKINS, customSkins);
    }

    const savedCheats = localStorage.getItem('customCheatCodes');
    if (savedCheats) {
        const customCheats = JSON.parse(savedCheats);
        Object.assign(CHEAT_CODES, customCheats);
    }
    
    // Create or update admin account
    if (!accounts['ADMIN_OG']) {
        accounts['ADMIN_OG'] = createNewAccount('ADMIN_OG');
    }
    // Always update admin account with latest settings
    accounts['ADMIN_OG'].password = 'Kickers1!';
    accounts['ADMIN_OG'].isAdmin = true;
    accounts['ADMIN_OG'].currency = 999999999; // Infinite coins
    accounts['ADMIN_OG'].points = 999999999; // Max points
    // Admin gets ALL skins and perks automatically
    accounts['ADMIN_OG'].ownedSkins = ['default', 'gold', 'fire', 'forest', 'ocean', 'royal', 'neon', 'sunset', 'glacier', 'shadow', 'creator_gold', 'creator_rainbow', 'creator_diamond', 'god_gold', 'god_rainbow', 'diamond_skin', 'victory_crown', 'legendary_dragon', 'legendary_phoenix', 'cosmic_nebula', 'arctic_ice', 'volcanic_lava', 'galaxy_spiral', 'electric_storm', 'ocean_depths', 'forest_spirit', 'cyber_matrix', 'sunset_horizon', 'midnight_moon', 'desert_sand', 'rainbow_unicorn', 'steampunk_gear'];
    accounts['ADMIN_OG'].ownedPerks = ['double_points', 'shield', 'speed_boost', 'lucky', 'god_mode', 'infinite_coins', 'instant_win', 'time_freeze', 'auto_answer', 'score_multiplier'];
    accounts['ADMIN_OG'].unlockedCheats = ['1267', 'GODMODE', 'RICH', 'WINNER', 'LEGEND']; // All cheats unlocked
    saveAccounts();
    
    if (!currentAccount) {
        showScreen('loginScreen');
    } else {
        showScreen('quizSelector');
        updateAccountDisplay();
    }
    
    // Add keyboard controls for Only Up
    document.addEventListener('keydown', function(e) {
        if (currentGameMode === 'onlyup' && onlyUpState.gameActive) {
            if (e.key === 'ArrowLeft') {
                onlyUpState.playerVelocityX = -1;
            } else if (e.key === 'ArrowRight') {
                onlyUpState.playerVelocityX = 1;
            }
        }
    });
    
    document.addEventListener('keyup', function(e) {
        if (currentGameMode === 'onlyup') {
            onlyUpState.playerVelocityX = 0;
        }
    });
});

// ==================== ON GAME END ====================
function onGameEnd(score) {
    if (currentAccount) {
        const pointsEarned = Math.floor(score / 10);
        addPoints(pointsEarned);
        const currencyEarned = Math.floor(score / 5);
        addCurrency(currencyEarned);
        currentAccount.gamesPlayed++;
        saveCurrentAccount();
    }
}