// index.js
import './css/reset.css';
import './css/style.css';
import domModule from './modules/dom.js';

window.addEventListener('DOMContentLoaded', () => {
    domModule.setupUI();
});