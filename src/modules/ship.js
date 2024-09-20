export default function createShip(length) {
 let hitCount;
 hitCount = 0;

 const hit = () => {
    hitCount++;
 };
 
 const isSunk = () => {
    return hitCount === length;
 };

 return {
    length,
    hitCount,
 }
}