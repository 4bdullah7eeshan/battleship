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
        test('Check if ship is not sunk until all hits received', () => {
            const ship = createShip(3);

            ship.hit();    
            expect(ship.isSunk()).toBe(false);

            ship.hit();
            expect(ship.isSunk()).toBe(false);
            
            ship.hit();
            expect(ship.isSunk()).toBe(true);
        });
    });
});