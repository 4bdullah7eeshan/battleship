// index.js
import './css/reset.css';
import './css/style.css';
import gameDriver from './modules/gameDriver.js';
import dom from './modules/dom.js';

document.addEventListener('DOMContentLoaded', () => {
    dom.setupUI(); // Set up the UI elements, grids, and event listeners
    gameDriver.initializeGame(); // Initialize the game logic
});