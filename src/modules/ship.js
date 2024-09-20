export default function createShip(length) {
 let hitCount;
 hitCount = 0;

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

 return {
    length,
    hitCount,
 }
}