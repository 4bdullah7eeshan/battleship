export default function createShip(length) {
 let hitCount, sinkStatus;
 hitCount = 0;
 sinkStatus = false;

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