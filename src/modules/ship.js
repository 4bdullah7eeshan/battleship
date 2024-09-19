export default function createShip(length, hitCount, sinkStatus) {
 const hit = () => {
    hitCount++;
 };
 
 const isSunk = () => {
    if (hitCount === length) {
        sinkStatus = true;
    } else {
        sinkStatus = false;
    }
    return sinkStatus;
 };

 return {
    length,
    hitCount,
    sinkStatus,
 }
}