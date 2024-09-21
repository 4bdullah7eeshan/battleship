// index.js
import './css/reset.css';
import domModule from './modules/dom.js';
import gameDriver from './modules/gameDriver.js';

window.addEventListener('DOMContentLoaded', () => {
    domModule.setupUI();
    gameDriver.initializeGame();
});