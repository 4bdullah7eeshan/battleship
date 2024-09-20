import createGameBoard from "./gameBoard.js";

export default function createPlayer(playerType) {
   const gameBoard = createGameBoard();

   if (playerType === "real") {
    // for real player
    const realPlayerAttack = (opponentGameBoard, x, y) => {
        return opponentGameBoard.receiveAttack(x, y);
    };

    return {
        gameBoard,
        realPlayerAttack,
    };

   } else {
    // for computer
    const pickRandomCoordinate = () => {
        return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    };
   }

}