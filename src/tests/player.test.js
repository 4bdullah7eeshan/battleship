import createPlayer from "../modules/player.js";
import createGameBoard from "../modules/gameBoard.js";

describe('Player factory', () => {
    let realPlayer, computerPlayer, opponent;

    beforeEach(() => {
        realPlayer = createPlayer("real");
        computerPlayer = createPlayer("computer");
        opponent = createPlayer("real");
    });

    describe('Real Player', () => {

    });

    describe('Computer Player', () => {

    });
});