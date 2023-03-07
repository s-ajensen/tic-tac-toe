import { IBoard } from "./interfaces/IBoard";
import { IMoveMaker } from "./interfaces/IMoveMaker";
import { WeightedCell } from "./WeightedCell";
import { SquareValues } from "./constants";

const WIN_WEIGHT = 5;
const BLOCK_WEIGHT = 2;

// This AI is a bad sport and will take overcautiously set up a draw over a risky win.
class MoveMaker implements IMoveMaker {
    private board: IBoard;
    private playerToken: SquareValues;
    private opponentToken: SquareValues;

    constructor(board: IBoard, playerToken: SquareValues) {
        this.board = board;
        this.playerToken = playerToken;
        this.opponentToken = playerToken === SquareValues.O ? SquareValues.X: SquareValues.O;
    }

    nextMove(): [number, number] {
        const sequences = this.board.getWinnableLines();
        const possibleMoves = this.getPossibleMoves(sequences);

        // Move next to the player if they go first
        if (possibleMoves.length === 8) {
            this.makeAdjacentMove(sequences);
        }

        for (const sequence of sequences) {
            // Weigh taking the win highest
            this.completeSequence(sequence, this.playerToken, WIN_WEIGHT);

            // Weigh blocking a win from the player next highest
            this.completeSequence(sequence, this.opponentToken, BLOCK_WEIGHT);
        }

        // Look ahead and weigh moves that don't create multiple win opportunities for player
        for (const possibleMove of possibleMoves) {
            if (!this.leadsToSplit(possibleMove)) {
                possibleMove.weight++;
            }
        }
        
        return sequences.flat().sort((a, b) => a.weight - b.weight).pop()!.pos.pt;
    }

    private makeAdjacentMove(sequences: WeightedCell[][]) {
        const filledSequences = sequences.filter(seq => seq.find(cell => cell.val !== SquareValues[" "]));
        const validSequence = filledSequences.find(seq => !seq.find(cell => cell.pos.pt[0] === 1 && cell.pos.pt[1] === 1))!;
        validSequence.find(cell => cell.isEmpty())!.weight++
    }

    private completeSequence(sequence: WeightedCell[], token: SquareValues, weight: number) {
        if (sequence.filter(cell => cell.val === token).length === 2) {
            const emptySquare = sequence.find(cell => cell.isEmpty())
            if (emptySquare)
                emptySquare.weight += weight;
        }
    }

    private testMove(coord: WeightedCell, token: SquareValues, callback: () => void) {
        const grid = this.board.getGrid();
        const row = coord.pos.pt[0];
        const col = coord.pos.pt[1];
        grid[row][col] = token;
        callback();
        grid[row][col] = SquareValues[" "];
    }

    public leadsToSplit(cell: WeightedCell): boolean {
        let possibleOpponentWins = 0;
        this.testMove(cell, this.playerToken, () => {
            const sequences = this.board.getWinnableLines();
            const possibleResponses = this.getPossibleMoves(sequences);

            for (const response of possibleResponses) {
                this.testMove(response, this.opponentToken, () => {
                    const newSequences = this.board.getWinnableLines();
                    for (const newSequence of newSequences) {
                        if (newSequence.find(cell => cell.val === this.playerToken))
                            continue;
        
                        if (newSequence.filter(cell => cell.val === this.opponentToken).length === 2)
                            possibleOpponentWins++;
                    }
                });

                if (possibleOpponentWins > 1)
                    break;
                possibleOpponentWins = 0;
            }
        })
        return possibleOpponentWins > 1;
    }

    private getPossibleMoves(sequences: WeightedCell[][]): WeightedCell[] {
        return Array.from(new Set(sequences.flat().filter(cell => cell.isEmpty())));
    }
}

export { MoveMaker }