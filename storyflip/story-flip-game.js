export class StoryFlipGame {
    constructor(gameData) {
        this.gameData = gameData;
        this.initializeElements();
        this.initializeState();
        this.setupEventListeners();
    }

    initializeElements() {
        this.container = document.getElementById('game-container');
        this.card = document.getElementById('game-card');
        this.content = document.getElementById('card-content');
        this.timerBar = document.getElementById('timer-bar');
        this.pauseOverlay = document.getElementById('pause-overlay');
    }

    initializeState() {
        this.state = {
            cardState: 'resting',
            isPaused: false,
            instructionIndex: 0,
            turnCount: 0,
            tryAgainCount: 0,
            lastCategories: [],
            timerInterval: null,
            storyRhythmTurn: Math.floor(Math.random() * 5) + 8, // Random turn between 8-12
            storyRhythmUsed: false
        };
    }

    setupEventListeners() {
        // Add event listeners here
    }

    expandCard() {
        this.container.classList.remove('resting');
        this.card.classList.remove('resting');
        this.card.classList.add('active');
        this.content.style.fontSize = '';
        this.content.style.color = '#333';
    }

    minimizeCard() {
        this.container.classList.add('resting');
        this.card.classList.add('resting');
        this.state.cardState = 'resting';
        this.content.innerHTML = 'S';
        this.content.style.color = 'var(--color-primary)';
        this.clearGameState();
    }

    clearGameState() {
        this.timerBar.style.width = '0%';
        clearInterval(this.state.timerInterval);
        this.state.tryAgainCount = 0;
        this.state.turnCount = 0;
        this.state.lastCategories = [];
        this.state.instructionIndex = 0;
        this.state.storyRhythmUsed = false;
        this.state.storyRhythmTurn = Math.floor(Math.random() * 5) + 8;
        if (this.state.isPaused) this.togglePause();
    }

    showInstructions() {
        this.state.cardState = 'instructions';
        this.card.classList.add('instructions');
        this.displayInstructions();
        this.setCardColor('instructions');
    }

    displayInstructions() {
        const instructions = this.gameData.instructions[this.state.instructionIndex];
        this.content.innerHTML = instructions.join('<br>');
    }

    handleTimerEnd() {
        this.state.tryAgainCount++;
        const message = this.state.tryAgainCount > 1 
            ? "Time's up!<br>Take a deep breath and try again.<br>Try pressing 'W' for Wildcards!"
            : "Time's up!<br>Take a deep breath and try again.";
        this.content.innerHTML = `<i>${message}</i>`;
        this.setCardColor('instructions');
        this.state.cardState = 'active';
        this.state.lastCategories = [];
        this.minimizeCard();
    }

    getRandomCardType() {
        if (this.state.turnCount === this.state.storyRhythmTurn && !this.state.storyRhythmUsed) {
            this.state.storyRhythmUsed = true;
            return 'storyRhythm';
        }

        const types = ['storyElements', 'wildcard', 'numberCard', 'gameMaster'];
        let selectedType;
        let attempts = 0;
        do {
            selectedType = types[Math.floor(Math.random() * types.length)];
            attempts++;
            const occurrence = this.state.lastCategories.filter(cat => cat === selectedType).length;
            if (occurrence < 2) break;
        } while (attempts < 10);
        return selectedType;
    }

    setCardColor(type) {
        switch (type) {
            case 'instructions':
                this.card.style.backgroundColor = 'var(--color-instructions)';
                this.content.style.color = '#333';
                break;
            case 'storyElements':
                this.card.style.backgroundColor = 'var(--color-story)';
                this.content.style.color = '#333';
                break;
            case 'wildcard':
                this.card.style.backgroundColor = 'var(--color-wildcard)';
                this.content.style.color = '#333';
                break;
            case 'numberCard':
                this.card.style.backgroundColor = 'var(--color-number)';
                this.content.style.color = '#333';
                break;
            case 'storyRhythm':
                this.card.style.backgroundColor = 'var(--color-rhythm)';
                this.content.style.color = '#333';
                break;
            case 'openStoryDriver':
                this.card.style.backgroundColor = 'var(--color-driver)';
                this.content.style.color = '#333';
                break;
            case 'gameMaster':
                this.card.style.backgroundColor = 'var(--color-gamemaster)';
                this.content.style.color = '#333';
                break;
            default:
                this.card.style.backgroundColor = 'var(--color-primary)';
                this.content.style.color = '#333';
        }
    }

    // Add other methods here
}
