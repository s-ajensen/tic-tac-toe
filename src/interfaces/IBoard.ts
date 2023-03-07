import { SquareValues } from "../constants";
import { WeightedCell } from "../WeightedCell";

interface IBoard {
    set (row: number, col: number, val: SquareValues): void;
    at (row: number, col: number): SquareValues;
    isFull(): boolean;
    getGrid(): SquareValues[][];
    getWinnableLines(): WeightedCell[][];
}

export { IBoard }