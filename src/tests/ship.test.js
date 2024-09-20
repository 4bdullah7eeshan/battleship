import createShip from "../modules/ship.js";

test("Initialize ship with correct length and hitCount", () => {
    const ship = createShip(5);
    expect(ship.length).toBe(5);
    expect(ship.isSunk()).toBe(false);
});