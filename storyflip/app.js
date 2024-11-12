import { GameData } from './game-data.js';
import { StoryFlipGame } from './story-flip-game.js';

document.addEventListener('DOMContentLoaded', () => {
    new StoryFlipGame(new GameData());
});
