const dom = (function () {
    // This should do the following things:
    // 1. Render app
    // 2. Add event listeners
    // Maintain another module for controlling the game. This should do pure DOM stuff
    const modal = document.querySelector('dialog');
    const modalGrid = document.getElementById('modal-grid');
    const randomButton = document.getElementById('random-placement');
    const startButton = document.getElementById('start-game');
    const playerBoard = document.getElementById('player-board');
    const computerBoard = document.getElementById('computer-board');

    const ships = [
        { length: 5 },
        { length: 4 },
        { length: 3 },
        { length: 3 },
        { length: 2 },
    ];

    const shipPositions = [];

    const placeShipsOnBoard = (boardElement) => {
        // Clear previous ships from the board
        boardElement.querySelectorAll('div').forEach(cell => {
            cell.classList.remove('ship');
        });

        // Place ships based on stored positions
        shipPositions.forEach(position => {
            position.forEach(cell => {
                const targetCell = boardElement.querySelector(`div[data-x="${cell.x}"][data-y="${cell.y}"]`);
                if (targetCell) {
                    targetCell.classList.add('ship');
                }
            });
        });
    };



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

    const randomlyPlaceShips = () => {
        modalGrid.querySelectorAll('div').forEach(cell => {
            cell.classList.remove('ship');
        });
        shipPositions.length = 0; // Clear previous ship positions

        ships.forEach(ship => {
            let placed = false;

            while (!placed) {
                const isHorizontal = Math.random() > 0.5;
                const x = Math.floor(Math.random() * (isHorizontal ? 10 - ship.length : 10));
                const y = Math.floor(Math.random() * (isHorizontal ? 10 : 10 - ship.length));

                const available = [];
                for (let i = 0; i < ship.length; i++) {
                    const cell = {
                        x: isHorizontal ? x : x + i,
                        y: isHorizontal ? y + i : y
                    };
                    available.push(cell);
                }

                // Check if the cells are available
                const canPlace = available.every(cell => {
                    const targetCell = modalGrid.querySelector(`div[data-x="${cell.x}"][data-y="${cell.y}"]`);
                    return targetCell && !targetCell.classList.contains('ship');
                });

                if (canPlace) {
                    // Store the positions of this ship
                    shipPositions.push(available);
                    placed = true;

                    // Place ships on the modal grid
                    available.forEach(cell => {
                        const targetCell = modalGrid.querySelector(`div[data-x="${cell.x}"][data-y="${cell.y}"]`);
                        if (targetCell) {
                            targetCell.classList.add('ship');
                        }
                    });
                }
            }
        });
        startButton.classList.remove('hidden');
    };

    const startGame = () => {
        console.log("cc")
        modal.close();
        placeShipsOnBoard(playerBoard);
    };
    

    const setupUI = () => {
        generateGrid(playerBoard);
        generateGrid(computerBoard);
        generateGrid(modalGrid);
        modal.showModal();
        randomButton.addEventListener('click', randomlyPlaceShips);
        startButton.addEventListener('click', startGame);
    };

    return {
        setupUI,
    };
})();

export default dom;