export default function createShip(length, hitCount, sinkStatus) {
 const hit = () => {
    hitCount++;
 };
 
 const isSunk = () => {
    if (hitCount === length) {
        return true;
    } else {
        return false;
    }
 };
}