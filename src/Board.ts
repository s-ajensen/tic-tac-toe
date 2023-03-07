import { SquareValues } from "./constants";
import { Coordinate } from "./Coordinate";
import { WeightedCell } from "./WeightedCell";

class Board {
    private grid: SquareValues[][];

    constructor() {
        this.grid = new Array(3)
            .fill(SquareValues[" "])
            .map(() => new Array(3)
                .fill(SquareValues[" "]));
    }

    getGrid(): SquareValues[][] {
        return this.grid;
    }

    set (row: number, col: number, val: SquareValues) {
        this.validateCoordinate(row, col);

        if (this.grid[row][col] !== SquareValues[" "]) {
            throw new Error(`Cell already occupied! (${row}, ${col})`);
        }

        this.grid[row][col] = val;
    }

    at (row: number, col: number): SquareValues {
        this.validateCoordinate(row, col);

        return this.grid[col][row];
    }

    isFull(): boolean {
        return this.grid.every(
            row => row.every(
                cell => cell != SquareValues[" "]
            )
        );
    }

    getWinnableLines(): WeightedCell[][] {
        const rows = this.getGrid()
            .map((row, i) => row.map((cell, j) => {
                return new WeightedCell(
                    cell, 
                    new Coordinate(i, j), 
                    cell !== SquareValues[" "] ? -1 : 0) 
            }));

        const diagonals = [
            rows.map((row, i) => rows[i][i]),
            rows.map((row, i) => rows[rows.length - i - 1][i])
        ];

        const columns = rows.map((row, i) => row.map((cell, j) => rows[j][i]));

        return rows.concat(diagonals).concat(columns);
    }

    private validateCoordinate(row: number, col: number) {
        this.validateIndex(row, 'row');
        this.validateIndex(col, 'column');
    }

    private validateIndex(index: number, descriptor: string) {
        if (!Number.isInteger(index) || !Number.isInteger(index))
            throw new RangeError(`${descriptor} index must be integer value.`);

        if (index > 2 || index < 0)
            throw new RangeError(`${descriptor} must be between a value from 0 - 2 (inclusive).`);
    }
}

export { Board }