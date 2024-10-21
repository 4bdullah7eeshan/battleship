import dom from "./dom.js";
import createPlayer from './player.js';

const gameDriver = (() => {
    let player, computer;

    const initializeGame = () => {
        player = createPlayer('real');
        computer = createPlayer('computer');


        dom.onRandomPlaceShips(() => {
            // Player's ships are already placed in the UI
            console.log("Ships randomly placed on the player's board.");
            const playerShipPositions = dom.randomlyPlaceShips(
                document.getElementById('player-board'),
                true,
                player.gameBoard
            );

            dom.placeShipsOnBoard(
                document.getElementById('modal-grid'),
                dom.playerShipPositions
            )

            console.log("Player's ships placed at:");
            console.log(playerShipPositions);


        });


        dom.onStartGame(() => {
            // Log player ships if needed
            
            // Randomly place computer's ships and log their positions
            const computerShipPositions = dom.randomlyPlaceShips(
                document.getElementById('computer-board'), 
                false, 
                computer.gameBoard
            );

            console.log("Computer's ship positions:");
            console.log(computerShipPositions);

            // Start the game
            startGame();
        });
    };

    const startGame = () => {
        console.log("Game has started!");

        // Set up the attack listeners to allow player to attack the computer
        dom.setupAttackListeners((x, y) => {
            const attackSuccessful = player.attack(computer.gameBoard, x, y);

            dom.updateCellColor(document.getElementById('computer-board'), x, y, attackSuccessful);

            
            // Optional: Add logic to check if the computer's ships are all sunk
            if (attackSuccessful) {
                console.log(`Player attacked at (${x}, ${y}) and it was a hit!`);
            } else {
                console.log(`Player attacked at (${x}, ${y}) and it was a miss.`);
            }

            if (computer.gameBoard.checkIfAllShipsAreSunk()) {
                dom.showGameOverModal('Player');
            }

            if (player.gameBoard.checkIfAllShipsAreSunk()) {
                dom.showGameOverModal('Computer');
            }

            // Handle computer's response attack (simple random attack for now)
            const { x: computerX, y: computerY } = computer.randomAttack(player.gameBoard);
            const computerHit = computer.attack(player.gameBoard, computerX, computerY);

            if (computerHit) {
                console.log(`Computer attacked at (${computerX}, ${computerY}) and it was a hit!`);
            } else {
                console.log(`Computer attacked at (${computerX}, ${computerY}) and it was a miss.`);
            }

            dom.updateCellColor(document.getElementById('player-board'), computerX, computerY, computerHit);

        });
    };

    const restartGame = () => {
        console.log("Restarting the game...");
        document.getElementById('player-board').innerHTML = '';
        document.getElementById('computer-board').innerHTML = '';
        dom.setupUI();
        initializeGame();
    };

    return {
        initializeGame,
    };

})();

export default gameDriver;