import { Game } from "./Game";
import { GameView } from "./GameView";
import { createInterface } from "readline";
import promptSync from "prompt-sync";

const game = new Game();
const view = new GameView(game);
const prompt = promptSync({sigint: true});

const takeMove = () => {
    const move = prompt("Enter move coordinates: ");
    view.readMove(move, takeMove);
}

console.clear();

while (game.getWinner() === "None") {
    console.log(view.renderBoard());
    takeMove();

    if (game.getWinner() !== "None")
        break;

    game.nextMove();
    console.clear();
}

console.log(view.renderBoard());
console.log(game.getWinner());