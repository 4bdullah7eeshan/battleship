// to drive the game
import dom from "./dom.js";

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

})();