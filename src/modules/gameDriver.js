// to drive the game
import dom from "./dom.js";
import createPlayer from './player.js';

const gameDriver = (() => {
    let player, computer;
    const initializeGame = () => {
        player = createPlayer('real');
        computer = createPlayer('computer');

        dom.onRandomPlaceShips(() => {
            player.gameBoard.randomlyPlaceShips();
            dom.closeModal();
        });

        dom.onStartGame(() => {
            startGame();
        });
    };

    const startGame = () => {
        dom.setupAttackListeners((x, y) => {
            const success = player.attack(computer.gameBoard, x, y);
        });
    };

    return {
        initializeGame,
    };

})();