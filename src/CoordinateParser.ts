import { ICoordinateParser } from "./interfaces/ICoordinateParser";

class CoordinateParser implements ICoordinateParser {
    parse(str: string): [number, number] {
        const CHAR_OFFSET = 65;

        if (!this.isValid(str))
            throw new Error("Invalid coordinate string!");

        let col = (str.match(/[a-cA-C]/)?.[0])?.toUpperCase().charCodeAt(0)! - CHAR_OFFSET;
        let row = parseInt((str.match(/[1-3]/)?.[0])!) - 1;

        return [col, row];
    }

    private isValid(str: string): boolean {
        return str.match(/^\s*[a-cA-C]\s*[1-3]\s*$|\s*[1-3]\s*[a-cA-C]\s*$/) !== null;
    }
}

export { CoordinateParser }