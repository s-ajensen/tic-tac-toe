import { Board } from "./Board";
import { SquareValues } from "./constants";
import { CoordinateParser } from "./CoordinateParser";
import { ICoordinateParser } from "./interfaces/ICoordinateParser";
import { IGame } from "./interfaces/IGame";
import { IMoveMaker } from "./interfaces/IMoveMaker";
import { MoveMaker } from "./MoveMaker";

class Game implements IGame {
    private gameToken: SquareValues;
    private board: Board;
    private parser: ICoordinateParser;
    private moveMaker: IMoveMaker;

    constructor() {
        const playerRoll = Math.round(Math.random());
        this.gameToken = playerRoll < 0.5 ? SquareValues.X : SquareValues.O;
        this.board = new Board();
        this.parser = new CoordinateParser();
        this.moveMaker = new MoveMaker(this.board, this.gameToken);

        if (this.gameToken === SquareValues.X)
            this.board.set(0, 0, SquareValues.X);
    }

    playMove(move: string): void {
        const coord = this.parser.parse(move);
        this.board.set(coord[0], coord[1], this.gameToken === SquareValues.X ? SquareValues.O : SquareValues.X);
    }

    nextMove(): void {
        const nextMove = this.moveMaker.nextMove();
        this.board.set(nextMove[0], nextMove[1], this.gameToken);
    }

    getCoord(row: number, col: number): SquareValues {
        return this.board.at(row, col);
    }

    isFinished(): boolean {
        return this.board.isFull();
    }

    getWinner(): string {
        const winnableLines = this.board.getWinnableLines();
        const winningLine = winnableLines.find(line => {
            return line.every(cell => cell.val === SquareValues.X) ||
                line.every(cell => cell.val === SquareValues.O)
        });

        if (!winningLine && !this.isFinished())
            return "None";

        if (!winningLine)
            return "Tie!"

        return `${winningLine[0].val} wins!`;
    }

    getGameToken(): SquareValues {
        return this.gameToken;
    }
}

export { Game }