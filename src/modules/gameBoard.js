import createShip from "./ship.js";

export default function createGameBoard() {
    let fleet = [];
    let missedAttacks = new Set(); // Tracks missed attacks
    let successfulAttacks = new Set(); // Tracks successful attacks

    const placeShip = (lengthOfShip, coordinatesOfShip) => {
        // Place the ship on the board with its coordinates
        const ship = createShip(lengthOfShip);
        fleet.push({ ship, coordinatesOfShip });
    };

    const getFleet = () => fleet;

    const receiveAttack = (x, y) => {
        // Check if the attack hits a ship
        for (const { ship, coordinatesOfShip } of fleet) {
            if (coordinatesOfShip.some(coordinate => coordinate[0] === x && coordinate[1] === y)) {
                ship.hit();
                successfulAttacks.add(`${x},${y}`);
                return true;
            }
        }

        // If no ship was hit, mark it as a missed attack
        missedAttacks.add(`${x},${y}`);
        return false;
    };

    const getMissedAttacks = () => Array.from(missedAttacks);

    const isAlreadyAttacked = (x, y) => {
        // Check if the attack has already been made (either hit or miss)
        const key = `${x},${y}`;
        return missedAttacks.has(key) || successfulAttacks.has(key);
    };

    const checkIfAllShipsAreSunk = () => {
        return fleet.every(({ ship }) => ship.isSunk());
    };

    const resetBoard = () => {
        fleet = [];            
        missedAttacks = new Set();
        successfulAttacks = new Set(); // Tracks successful attacks

    };

    return {
        placeShip,
        getFleet,
        receiveAttack,
        getMissedAttacks,
        isAlreadyAttacked, // New method to check if a coordinate was attacked
        checkIfAllShipsAreSunk,
        resetBoard,
    };
}
