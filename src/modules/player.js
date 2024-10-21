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

        const randomAttack = (opponentGameBoard) => {
            let x, y, successfulAttack = false;

            // Ensure the computer doesn't attack a previously hit spot
            while (!successfulAttack) {
                [x, y] = pickRandomCoordinate();
                if (!opponentGameBoard.isAlreadyAttacked(x, y)) {
                    successfulAttack = true;
                }
            }

            console.log(`Computer attacking at (${x}, ${y})`);
            return { x, y }; // Return the coordinates for the attack
        };

        return {
            gameBoard,
            attack,
            randomAttack,
        };
    }
}
