import createPlayer from "../modules/player.js";
import createGameBoard from "../modules/gameBoard.js";

describe('Player factory', () => {
    let realPlayer, computerPlayer, opponent;

    beforeEach(() => {
        realPlayer = createPlayer("real");
        computerPlayer = createPlayer("computer");
        opponent = createPlayer("real");

        opponent.gameBoard.placeShip(2, [[0, 0], [0, 1]]);
    });

    describe('Real Player', () => {
        test('should contain its own game board', () => {
            expect(realPlayer.gameBoard).toBeDefined();
        });

        describe('attacking opponent game board', () => {
            test('returns true when attacking a ship', () => {
                const result = realPlayer.attack(opponent.gameBoard, 0, 0);
                expect(result).toBe(true);
            });

            test('does not register attack as missed', () => {
                realPlayer.attack(opponent.gameBoard, 0, 0);
                expect(opponent.gameBoard.getMissedAttacks()).not.toContain('0,0');
            });

        });

        describe('missing attacks on opponent game board', () => {
            test('returns false when missing an attack on ship', () => {
                const result = realPlayer.attack(opponent.gameBoard, 5, 5);
                expect(result).toBe(false);
            });

        });

    });

    describe('Computer Player', () => {
        test('should contain its own game board', () => {
            expect(computerPlayer.gameBoard).toBeDefined();
        });

    });
});