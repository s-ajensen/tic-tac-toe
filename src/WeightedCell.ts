import { SquareValues } from "./constants";
import { Coordinate } from "./Coordinate";

class WeightedCell {
    val: SquareValues;
    pos: Coordinate; 
    weight: number; 

    constructor(val: SquareValues, pos: Coordinate, weight: number) {
        this.val = val;
        this.pos = pos;
        this.weight = weight;
    }

    isEmpty(): boolean {
        return this.val === SquareValues[" "];
    }
}

export { WeightedCell }