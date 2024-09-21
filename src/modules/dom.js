const dom = (function () {
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

    const playerShipPositions = [];

    const placeShipsOnBoard = (boardElement, positions) => {
        boardElement.querySelectorAll('div').forEach(cell => {
            cell.classList.remove('ship');
        });

        positions.forEach(position => {
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
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.x = i;
                cell.dataset.y = j;
                boardElement.appendChild(cell);
            }
        }
    };

    const randomlyPlaceShips = (boardElement, storePositions) => {
        const positions = [];
        
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

                const canPlace = available.every(cell => {
                    const targetCell = boardElement.querySelector(`div[data-x="${cell.x}"][data-y="${cell.y}"]`);
                    return targetCell && !targetCell.classList.contains('ship');
                });

                if (canPlace) {
                    positions.push(available);
                    placed = true;

                    available.forEach(cell => {
                        const targetCell = boardElement.querySelector(`div[data-x="${cell.x}"][data-y="${cell.y}"]`);
                        if (targetCell) {
                            targetCell.classList.add('ship');
                        }
                    });
                }
            }
        });

        if (storePositions) {
            playerShipPositions.push(...positions);
        }

        return positions; 
    };

    const startGame = () => {
        modal.close();
        placeShipsOnBoard(playerBoard, playerShipPositions);
        randomlyPlaceShips(computerBoard, false); 
    };

    const setupUI = () => {
        generateGrid(playerBoard);
        generateGrid(computerBoard);
        generateGrid(modalGrid);
        modal.showModal();
        randomButton.addEventListener('click', () => {
            playerShipPositions.length = 0; 
            randomlyPlaceShips(modalGrid, true);
            startButton.classList.remove('hidden');
        });
        startButton.addEventListener('click', startGame);
    };

    return {
        setupUI,
    };
})();

export default dom;
