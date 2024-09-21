const dom = (function () {
    // This should do the following things:
    // 1. Render app
    // 2. Add event listeners
    // Maintain another module for controlling the game. This should do pure DOM stuff
    const modal = document.querySelector('dialog');
    const modalGrid = document.getElementById('modal-grid');
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

    const randomlyPlaceShips = () => {
        modalGrid.querySelectorAll('div').forEach(cell => {
            cell.classList.remove('ship');
        });
    
        const ships = [
            { length: 5 },
            { length: 4 },
            { length: 3 },
            { length: 3 },
            { length: 2 },
        ];
    
        ships.forEach(ship => {
            let placed = false;
    
            while (!placed) {
                const isHorizontal = Math.random() > 0.5;
                const x = Math.floor(Math.random() * (isHorizontal ? 10 - ship.length : 10));
                const y = Math.floor(Math.random() * (isHorizontal ? 10 : 10 - ship.length));
    
                const available = [];
                for (let i = 0; i < ship.length; i++) {
                    const targetCell = isHorizontal
                        ? modalGrid.querySelector(`div[data-x="${x}"][data-y="${y + i}"]`)
                        : modalGrid.querySelector(`div[data-x="${x + i}"][data-y="${y}"]`);
    
                    if (targetCell && !targetCell.classList.contains('ship')) {
                        available.push(targetCell);
                    } else {
                        break;
                    }
                }
    
                if (available.length === ship.length) {
                    available.forEach(cell => {
                        cell.classList.add('ship');
                        console.log(`Placing ship at (${cell.dataset.x}, ${cell.dataset.y})`);
                    });
                    placed = true;
                }
            }
        });
        startButton.classList.remove('hidden');
    };

    const startGame = () => {
        modal.close();
    };
    

    const setupUI = () => {
        generateGrid(modalGrid);
        modal.showModal();
        randomButton.addEventListener('click', randomlyPlaceShips);
    };

    return {
        setupUI,
    };
})();

export default dom;