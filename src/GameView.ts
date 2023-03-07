import { IGame } from "./interfaces/IGame";

class GameView {
    private game: IGame;

    constructor(game: IGame) {
        this.game = game;
    }

    renderBoard(): string {
        return `` +
        `   A   B   C  \n` +
        `1  ${this.game.getCoord(0, 0)} | ${this.game.getCoord(0, 1)} | ${this.game.getCoord(0, 2)}  \n` +
        `  ----------- \n` + 
        `2  ${this.game.getCoord(1, 0)} | ${this.game.getCoord(1, 1)} | ${this.game.getCoord(1, 2)}  \n` +
        `  ----------- \n` + 
        `3  ${this.game.getCoord(2, 0)} | ${this.game.getCoord(2, 1)} | ${this.game.getCoord(2, 2)}  \n`;
    }

    readMove(move: string, prompt: () => void): void {
        try {
            this.game.playMove(move);
        } catch (e) {
            console.log("Invalid move, try again.")
            prompt();
        }
    }
}

export { GameView }