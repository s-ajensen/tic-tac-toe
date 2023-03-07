import { SquareValues } from "../constants";

interface IGame {
    getCoord(row: number, col: number): SquareValues;
    playMove(move: string): void;
}

export { IGame }