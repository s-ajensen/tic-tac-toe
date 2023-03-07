import { describe, expect, it } from "@jest/globals";
import { CoordinateParser } from "../src/CoordinateParser";

describe("CoordinateParser", () => {
    let coordParser: CoordinateParser;

    beforeEach(() => {
        coordParser = new CoordinateParser();
    });

    it("Should return a tuple of coordinates based off of letter - number coords", () => {
        expect(coordParser.parse("A1")).toEqual([0, 0]);
        expect(coordParser.parse("B2")).toEqual([1, 1]);
        expect(coordParser.parse("C3")).toEqual([2, 2]);
        expect(coordParser.parse("A3")).toEqual([0, 2]);
        expect(coordParser.parse("C1")).toEqual([2, 0]);
        expect(coordParser.parse("A1")).toEqual([0, 0]);
        expect(coordParser.parse("A 1")).toEqual([0, 0]);
        expect(coordParser.parse("1A")).toEqual([0, 0]);
        expect(coordParser.parse("1 A")).toEqual([0, 0]);
        expect(coordParser.parse(" A    1 ")).toEqual([0, 0]);
        expect(coordParser.parse(" 1    A ")).toEqual([0, 0]);
    });

    it("Should allow lower case letter coordinates", () => {
        expect(coordParser.parse("a1")).toEqual([0, 0]);
        expect(coordParser.parse("b2")).toEqual([1, 1]);
        expect(coordParser.parse("c3")).toEqual([2, 2]);
        expect(coordParser.parse("a3")).toEqual([0, 2]);
        expect(coordParser.parse("c1")).toEqual([2, 0]);
        expect(coordParser.parse("a1")).toEqual([0, 0]);
        expect(coordParser.parse("a 1")).toEqual([0, 0]);
        expect(coordParser.parse("1a")).toEqual([0, 0]);
        expect(coordParser.parse("1 a")).toEqual([0, 0]);
        expect(coordParser.parse(" a    1 ")).toEqual([0, 0]);
        expect(coordParser.parse(" 1    a ")).toEqual([0, 0]);
    });

    it("Should throw error if a letter or a number between 1-3 is not given", () => {
        expect(() => { coordParser.parse("$ 1") }).toThrow("Invalid coordinate string!");
        expect(() => { coordParser.parse("_ 1") }).toThrow("Invalid coordinate string!");
        expect(() => { coordParser.parse("A 10") }).toThrow("Invalid coordinate string!");
        expect(() => { coordParser.parse("A -20") }).toThrow("Invalid coordinate string!");

    })

    it("Should throw error if there is more than one letter or number", () => {
        expect(() => { coordParser.parse("AA 1") }).toThrow("Invalid coordinate string!");
        expect(() => { coordParser.parse("A A 1") }).toThrow("Invalid coordinate string!");
        expect(() => { coordParser.parse("AA 11") }).toThrow("Invalid coordinate string!");
        expect(() => { coordParser.parse("A A 1 1") }).toThrow("Invalid coordinate string!");
    })

    it("Should throw error if input string is empty", () => {
        expect(() => { coordParser.parse("") }).toThrow("Invalid coordinate string!");
    })
});