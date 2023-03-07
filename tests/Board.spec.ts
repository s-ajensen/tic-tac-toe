import { describe, expect, it } from "@jest/globals";
import { Board } from "../src/Board";
import { SquareValues } from "../src/constants";

describe("Board", () => {
    
    it("Should return the value at a given square on the board", () => {
        const zeroBoard = new Board();
        const populatedBoard = new Board();

        populatedBoard.set(0, 0, SquareValues.X);
        populatedBoard.set(1, 1, SquareValues.O);

        expect(zeroBoard.at(0, 0)).toEqual(SquareValues[" "]);
        expect(populatedBoard.at(0, 0)).toEqual(SquareValues.X);
        expect(populatedBoard.at(1, 1)).toEqual(SquareValues.O);        
    });

    it("Should throw error when modifying a cell out of range or passing non integer value", () => {
        const board = new Board();

        expect(() => { board.at(0, -1) }).toThrow(RangeError);
        expect(() => { board.at(-1.5, -1.5) }).toThrow(RangeError);
        expect(() => { board.set(0, -1, SquareValues.X) }).toThrow(RangeError);
        expect(() => { board.set(0.5, -1.5, SquareValues.X) }).toThrow(RangeError);
    });

    it("Should return not full for new board", () => {
        const board = new Board();

        expect(board.isFull()).toBeFalsy();
    });

    it("Should return not full for somewhat filled boards", () => {
        const oneMoveBoard = new Board();
        oneMoveBoard.set(0, 0, SquareValues.X);

        const someMovesBoard = new Board();
        someMovesBoard.set(0, 0, SquareValues.X);
        someMovesBoard.set(1, 1, SquareValues.O);
        someMovesBoard.set(2, 2, SquareValues.X);

        const almostFilledBoard = new Board();
        almostFilledBoard.set(0, 0, SquareValues.X);
        almostFilledBoard.set(0, 1, SquareValues.O);
        almostFilledBoard.set(0, 2, SquareValues.X);
        almostFilledBoard.set(1, 0, SquareValues.O);
        almostFilledBoard.set(1, 1, SquareValues.X);
        almostFilledBoard.set(1, 2, SquareValues.O);
        almostFilledBoard.set(2, 0, SquareValues.X);
        almostFilledBoard.set(2, 1, SquareValues.O);

        expect(oneMoveBoard.isFull()).toBeFalsy();
        expect(someMovesBoard.isFull()).toBeFalsy();
        expect(almostFilledBoard.isFull()).toBeFalsy();
    })

    it("Should return full for full board", () => {
        const board = new Board();
        board.set(0, 0, SquareValues.X);
        board.set(0, 1, SquareValues.O);
        board.set(0, 2, SquareValues.X);
        board.set(1, 0, SquareValues.O);
        board.set(1, 1, SquareValues.X);
        board.set(1, 2, SquareValues.O);
        board.set(2, 0, SquareValues.X);
        board.set(2, 1, SquareValues.O);
        board.set(2, 2, SquareValues.O);

        expect(board.isFull()).toBeTruthy();
    })

    it("Should throw error if cell on board is taken", () => {
        const board = new Board();
        board.set(0, 0, SquareValues.X);
        board.set(1, 2, SquareValues.O);

        expect(() => { board.set(0, 0, SquareValues.X) }).toThrow("Cell already occupied!");
        expect(() => { board.set(1, 2, SquareValues.X) }).toThrow("Cell already occupied!");
    });
});