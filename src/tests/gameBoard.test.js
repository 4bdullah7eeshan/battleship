import createShip from "../modules/ship.js";
import createGameBoard from "../modules/gameBoard.js";

describe('Game board', () => {
    let gameBoard;

    beforeEach(() => {
      gameBoard = createGameBoard();
    });

    test('places ships accurately', () => {
        gameBoard.placeShip(2, [[1, 0], [1, 1]]);

        const fleet = gameBoard.getFleet();

        expect(fleet).toEqual([
            {
                ship: {
                    length: 2,
                    hit: expect.any(Function),
                    isSunk: expect.any(Function)
                },
                coordinatesOfShip: [[1, 0], [1, 1]],
            }
        ]);
    });

    test('report if ship receives attacks correctly', () => {
        gameBoard.placeShip(3, [[0, 0], [0, 1], [0, 2]]);
        expect(gameBoard.receiveAttack(0, 0)).toBe(true); 
    });
});
