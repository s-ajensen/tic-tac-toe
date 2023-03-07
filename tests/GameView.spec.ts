import { describe, expect, it } from "@jest/globals";
import { SquareValues } from "../src/constants";
import { Game } from "../src/Game";
import { GameView } from "../src/GameView"

const playAs = (playerType: SquareValues) => {
    const returnVal = playerType === SquareValues.X ? 0.1 : 0.9;
    jest.spyOn(global.Math, 'random').mockReturnValue(returnVal);
}

describe("GameView", () => {
    it("Should display a blank board to the user if the computer rolls 'O'", () => {
        playAs(SquareValues.O);
        const game = new Game();
        const gameView = new GameView(game);

        const expected =
            "   A   B   C  \n" +
            "1    |   |    \n" +
            "  ----------- \n" +
            "2    |   |    \n" +
            "  ----------- \n" +
            "3    |   |    \n";
        expect(gameView.renderBoard()).toEqual(expected);
    });

    it("Should play a move and display it to the user if the computer rolls 'X'", () => {
        playAs(SquareValues.X);
        const game = new Game();
        const gameView = new GameView(game);

        const expected =
            "   A   B   C  \n" +
            "1  X |   |    \n" +
            "  ----------- \n" +
            "2    |   |    \n" +
            "  ----------- \n" +
            "3    |   |    \n";
        expect(gameView.renderBoard()).toEqual(expected);
    });

    it("Should render the move of the player on the board.", () => {
        playAs(SquareValues.X);

        const game = new Game();
        const gameView = new GameView(game);
        game.playMove("B2");

        const expected =
            "   A   B   C  \n" +
            "1  X |   |    \n" +
            "  ----------- \n" +
            "2    | O |    \n" +
            "  ----------- \n" +
            "3    |   |    \n";

        expect(gameView.renderBoard()).toEqual(expected);
    })

    it("Should read a valid move from the player and save state", () => {
        playAs(SquareValues.O);
        const game = new Game();
        const gameView = new GameView(game);

        gameView.readMove("A1", () => {});

        expect(game.getCoord(0, 0)).toEqual("X");
    })

    it("Should prompt the user to enter another move if it is malformed", () => {
        playAs(SquareValues.O);
        const game = new Game();
        const gameView = new GameView(game);

        let wasCalled = false;
        gameView.readMove("AA 1", () => wasCalled = true);
        expect(wasCalled).toBeTruthy();

        wasCalled = false;
        gameView.readMove("A -20", () => wasCalled = true);
        
        expect(wasCalled).toBeTruthy();
    });
})