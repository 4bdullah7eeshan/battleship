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
   }

}