import createGameBoard from "./gameBoard.js";

export default function createPlayer(playerType) {
   const gameBoard = createGameBoard();

   // An 'attack' is common for both 'real' player and a 'computer'
   const attack = (opponentGameBoard, x, y) => {
        return opponentGameBoard.receiveAttack(x, y);
   };

   if (playerType === "real") {
    // for real player
    return {
        gameBoard,
        attack,
    };

   } else {
    // for computer
    const pickRandomCoordinate = () => {
        return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    };
    
   }

}