import createShip from "../modules/ship.js";

describe("Ship factory", () => {
    describe('Initialization', () => {
        test("Initialize ship with correct length and hitCount", () => {
            const ship = createShip(5);
            expect(ship.length).toBe(5);
            expect(ship.isSunk()).toBe(false);
        });
    });

    describe('Ship sunk status', () => {
        let ship;
        beforeEach(() => {
            ship = createShip(3);
        });
        test('Check if ship is not sunk until all hits received', () => {
            ship.hit();    
            expect(ship.isSunk()).toBe(false);            
        });
        test('Check if ship is sunk when it receives all hits', () => {
            ship.hit();
            ship.hit();
            ship.hit();
            expect(ship.isSunk()).toBe(true);
        });
    });
});