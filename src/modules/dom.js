import createGameBoard from "./gameBoard.js";

const dom = (function () {
    const modal = document.getElementById('ship-placement-modal');
    const modalGrid = document.getElementById('modal-grid');
    const randomButton = document.getElementById('random-placement');
    const startButton = document.getElementById('start-game');
    const playerBoard = document.getElementById('player-board');
    const computerBoard = document.getElementById('computer-board');
    const gameOverModal = document.getElementById('game-over-modal');
    const winnerAnnouncement = document.getElementById('winner-announcement');
    const restartButton = document.getElementById('restart-game');

    const ships = [
        { length: 5 },
        { length: 4 },
        { length: 3 },
        { length: 3 },
        { length: 2 },
    ];

    const playerGameBoard = createGameBoard(); 
    const computerGameBoard = createGameBoard(); 

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

    const clearBoard = (boardElement) => {
        boardElement.querySelectorAll('div').forEach(cell => {
            cell.classList.remove('ship');
        });
    };

    const randomlyPlaceShips = (boardElement, storePositions, gameBoard) => {
        clearBoard(boardElement);
        gameBoard.resetBoard();

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

                    // Place ship on game board using `gameBoard.placeShip()`
                    const shipCoordinates = available.map(cell => [cell.x, cell.y]);
                    gameBoard.placeShip(ship.length, shipCoordinates);
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
        //placeShipsOnBoard(playerBoard, playerShipPositions);
        // randomlyPlaceShips(computerBoard, false, computerGameBoard);
    };

/*    const setupAttackListeners = (attackHandler) => {
        computerBoard.querySelectorAll('.cell').forEach(cell => {
            cell.addEventListener('click', () => {
                const x = parseInt(cell.dataset.x, 10);
                const y = parseInt(cell.dataset.y, 10);
                attackHandler(x, y);
            });
        });
    };*/
    const setupAttackListeners = (attackHandler) => {
        computerBoard.querySelectorAll('.cell').forEach(cell => {
            const handleClick = () => {
                const x = parseInt(cell.dataset.x, 10);
                const y = parseInt(cell.dataset.y, 10);
    
                // Call the attackHandler to process the attack
                attackHandler(x, y);
    
                // Remove the event listener after the first click
                cell.removeEventListener('click', handleClick);
            };
    
            // Attach the click event listener
            cell.addEventListener('click', handleClick);
        });
    };
    

    // New setupUI function
    const setupUI = () => {
        generateGrid(playerBoard);
        generateGrid(computerBoard);
        generateGrid(modalGrid);
        modal.showModal();
        randomButton.addEventListener('click', () => {
            playerShipPositions.length = 0; 
            //randomlyPlaceShips(playerBoard, true, playerGameBoard); // Pass playerGameBoard for ship placement
            //placeShipsOnBoard(modalGrid, playerShipPositions);

            startButton.classList.remove('hidden');
        });
        startButton.addEventListener('click', () => {
            startGame();
        });
        restartButton.addEventListener('click', () => {
            location.reload();
        });
    };

    const updateCellColor = (boardElement, x, y, success) => {
        const cell = boardElement.querySelector(`div[data-x="${x}"][data-y="${y}"]`);
        if (cell) {
            cell.style.backgroundColor = success ? 'red' : 'green';
        }
    };

    const showGameOverModal = (winner) => {
        winnerAnnouncement.textContent = `${winner} Wins!`;
        gameOverModal.showModal();
    };

    

    return {
        setupUI,
        setupAttackListeners,
        onRandomPlaceShips: (callback) => {
            randomButton.addEventListener('click', callback);
        },
        onStartGame: (callback) => {
            startButton.addEventListener('click', callback);
        },
        randomlyPlaceShips,
        playerShipPositions,
        placeShipsOnBoard,
        updateCellColor,
        showGameOverModal,
        
    };
})();

export default dom;