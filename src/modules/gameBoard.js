import createShip from "./ship.js";

export default function createGameBoard() {
    const fleet = [];
    
    const placeShip = (lengthOfShip, coordinatesOfShip) => {
        // This will place the ships on the game board
        const ship = createShip(lengthOfShip);
        fleet.push({ ship, coordinatesOfShip });
    };

    const receiveAttack = (x, y) => {
        // Determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.
        // On hold!
    };
}