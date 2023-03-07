import { describe, expect, it } from "@jest/globals";
import { Board } from "../src/Board";
import { SquareValues } from "../src/constants";
import { Coordinate } from "../src/Coordinate";
import { MoveMaker } from "../src/MoveMaker"
import { WeightedCell } from "../src/WeightedCell";

describe("MoveMaker", () => {

    jest.mock("../src/Board");

    it("Should block a row win from the player when possible", () => {
        const board = new Board();
        const moveMaker = new MoveMaker(board, SquareValues.X);
        let grid = [
            [SquareValues.O, SquareValues.O, SquareValues[" "]],
            [SquareValues[" "], SquareValues[" "], SquareValues[" "]],
            [SquareValues[" "], SquareValues[" "], SquareValues[" "]]
        ];

        jest.spyOn(Board.prototype, 'getGrid')
            .mockImplementation(() => {
                return grid;
            });

        const topRowBlock = moveMaker.nextMove();

        grid = [
            [SquareValues[" "], SquareValues[" "], SquareValues[" "]],
            [SquareValues.O, SquareValues[" "], SquareValues.O,],
            [SquareValues[" "], SquareValues[" "], SquareValues[" "]]
        ];

        const midRowBlock = moveMaker.nextMove();

        expect(topRowBlock).toEqual([0, 2]);
        expect(midRowBlock).toEqual([1, 1]);
    });

    it("Should block a diagonal win from the player when possible", () => {
        const board = new Board();
        const moveMaker = new MoveMaker(board, SquareValues.X);
        let grid = [
            [SquareValues.O, SquareValues[" "], SquareValues[" "]],
            [SquareValues[" "], SquareValues[" "], SquareValues[" "],],
            [SquareValues[" "], SquareValues[" "], SquareValues.O]
        ];

        jest.spyOn(Board.prototype, 'getGrid')
            .mockImplementation(() => {
                return grid;
            });

        const diagonalBlock1 = moveMaker.nextMove();

        grid = [
            [SquareValues[" "], SquareValues[" "], SquareValues[" "]],
            [SquareValues[" "], SquareValues.O, SquareValues[" "],],
            [SquareValues.O, SquareValues[" "], SquareValues[" "]]
        ];

        const diagonalBlock2 = moveMaker.nextMove();

        expect(diagonalBlock1).toEqual([1, 1]);
        expect(diagonalBlock2).toEqual([0, 2]);
    })

    it("Should block a columnar win from the player when possible", () => {
        const board = new Board();
        const moveMaker = new MoveMaker(board, SquareValues.X);
        let grid = [
            [SquareValues.O, SquareValues[" "], SquareValues[" "]],
            [SquareValues.O, SquareValues[" "], SquareValues[" "],],
            [SquareValues[" "], SquareValues[" "], SquareValues[" "]]
        ];

        jest.spyOn(Board.prototype, 'getGrid')
            .mockImplementation(() => {
                return grid;
            });

        const columnBlock1 = moveMaker.nextMove();

        grid = [
            [SquareValues[" "], SquareValues.O, SquareValues[" "]],
            [SquareValues[" "], SquareValues[" "], SquareValues[" "],],
            [SquareValues[" "], SquareValues.O, SquareValues[" "]]
        ];

        const columnBlock2 = moveMaker.nextMove();

        expect(columnBlock1).toEqual([2, 0]);
        expect(columnBlock2).toEqual([1, 1]);
    })

    it("Should play a winning move on a row when possible", () => {
        const board = new Board();
        const moveMaker = new MoveMaker(board, SquareValues.X);
        let grid = [
            [SquareValues.X, SquareValues.X, SquareValues[" "]],
            [SquareValues[" "], SquareValues[" "], SquareValues[" "]],
            [SquareValues[" "], SquareValues[" "], SquareValues[" "]]
        ];

        jest.spyOn(Board.prototype, 'getGrid')
            .mockImplementation(() => {
                return grid;
            });

        const topRowWin = moveMaker.nextMove();

        grid = [
            [SquareValues[" "], SquareValues[" "], SquareValues[" "]],
            [SquareValues.X, SquareValues[" "], SquareValues.X,],
            [SquareValues[" "], SquareValues[" "], SquareValues[" "]]
        ];

        const midRowWin = moveMaker.nextMove();

        expect(topRowWin).toEqual([0, 2]);
        expect(midRowWin).toEqual([1, 1]);
    });

    it("Should play a winning move on a diagonal when possible", () => {
        const board = new Board();
        const moveMaker = new MoveMaker(board, SquareValues.X);
        let grid = [
            [SquareValues.X, SquareValues[" "], SquareValues[" "]],
            [SquareValues[" "], SquareValues[" "], SquareValues[" "],],
            [SquareValues[" "], SquareValues[" "], SquareValues.X]
        ];

        jest.spyOn(Board.prototype, 'getGrid')
            .mockImplementation(() => {
                return grid;
            });

        const diagonalWin1 = moveMaker.nextMove();

        grid = [
            [SquareValues[" "], SquareValues[" "], SquareValues[" "]],
            [SquareValues[" "], SquareValues.X, SquareValues[" "],],
            [SquareValues.X, SquareValues[" "], SquareValues[" "]]
        ];

        const diagonalWin2 = moveMaker.nextMove();

        expect(diagonalWin1).toEqual([1, 1]);
        expect(diagonalWin2).toEqual([0, 2]);
    })

    it("Should play a winning move on a column when possible", () => {
        const board = new Board();
        const moveMaker = new MoveMaker(board, SquareValues.X);
        let grid = [
            [SquareValues.X, SquareValues[" "], SquareValues[" "]],
            [SquareValues.X, SquareValues[" "], SquareValues[" "],],
            [SquareValues[" "], SquareValues[" "], SquareValues[" "]]
        ];

        jest.spyOn(Board.prototype, 'getGrid')
            .mockImplementation(() => {
                return grid;
            });

        const columnWin1 = moveMaker.nextMove();

        grid = [
            [SquareValues[" "], SquareValues.X, SquareValues[" "]],
            [SquareValues[" "], SquareValues[" "], SquareValues[" "],],
            [SquareValues[" "], SquareValues.X, SquareValues[" "]]
        ];

        const columnWin2 = moveMaker.nextMove();

        expect(columnWin1).toEqual([2, 0]);
        expect(columnWin2).toEqual([1, 1]);
    })

    it("Should prefer to win rather than block", () => {
        const board = new Board();
        const moveMaker = new MoveMaker(board, SquareValues.X);
        let grid = [
            [SquareValues.X, SquareValues[" "], SquareValues.X],
            [SquareValues.O, SquareValues[" "], SquareValues.O],
            [SquareValues[" "], SquareValues[" "], SquareValues[" "],],
        ];

        jest.spyOn(Board.prototype, 'getGrid')
            .mockImplementation(() => {
                return grid;
            });

        expect(moveMaker.nextMove()).toEqual([0, 1]);
    })

    it("Should detect when multiple opponent wins are possible", () => {
        const board = new Board();
        const moveMaker = new MoveMaker(board, SquareValues.O);
        let grid = [
            [SquareValues.X, SquareValues[" "], SquareValues[" "]],
            [SquareValues[" "], SquareValues.X, SquareValues[" "]],
            [SquareValues[" "], SquareValues[" "], SquareValues.O]
        ];
        const cell = new WeightedCell(SquareValues.O, new Coordinate(2, 1), 0);

        jest.spyOn(Board.prototype, 'getGrid')
            .mockImplementation(() => {
                return grid;
            });



        expect(moveMaker.leadsToSplit(cell)).toEqual(true);
    });
});