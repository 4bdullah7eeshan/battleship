import createGameBoard from "./gameBoard.js";

export default function createPlayer(playerType) {
   const gameBoard = createGameBoard();

   const attack = (opponentGameBoard, x, y) => {
        return opponentGameBoard.receiveAttack(x, y);
   };

   if (playerType === "real") {
    return {
        gameBoard,
        attack,
    };

   } else {
    const pickRandomCoordinate = () => {
        return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    };

    const computerAttack = (opponentGameBoard) => {
        const [x, y] = pickRandomCoordinate();
        return attack(opponentGameBoard, x, y);
    };

    return {
        gameBoard,
        computerAttack,
    };
   }
}