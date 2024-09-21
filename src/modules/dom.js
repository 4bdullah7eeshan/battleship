const dom = (function () {
    // This should do the following things:
    // 1. Render app
    // 2. Add event listeners
    // Maintain another module for controlling the game. This should do pure DOM stuff
    const playerBoard = document.getElementById('player-board');
    const computerBoard = document.getElementById('computer-board');
    const modal = document.querySelector('dialog');
    const randomButton = document.getElementById('random-placement');
    const startButton = document.getElementById('start-game');

    const generateGrid = (boardElement) => {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                // O(n^2) is fine for now! Will refactor this later.
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.x = i;
                cell.dataset.y = j;
                boardElement.appendChild(cell);
            }
        }
    };

    const setupUI = () => {
        generateGrid(playerBoard);
        generateGrid(computerBoard);

        modal.showModal();
    };

    const onRandomPlaceShips = (callback) => {
        randomButton.addEventListener('click', callback);
    };

    const closeModal = () => {
        modal.close();
    };

    const onStartGame = (callback) => {
        startButton.addEventListener('click', callback);
    };

    return {
        setupUI,
        onRandomPlaceShips,
        closeModal,
        onStartGame,
    };
})();

export default dom;