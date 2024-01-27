import { beforeEach, describe, expect, it } from "vitest";

import Nyaa from "../src";

describe("Nyaa RSS parsing", () => {
    let nyaa: Nyaa;

    beforeEach(() => {
        nyaa = new Nyaa({ mode: "rss", baseUrl: "https://nyaa.land" });
    });

    it("Nyaa instance", () => {
        expect(nyaa).toBeInstanceOf(Nyaa);
    });

    it("Nyaa empty search", async () => {
        const result = await nyaa.search();

        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBeGreaterThan(0);
    });

    it("Nyaa search with query", async () => {
        const result = await nyaa.search("One piece");

        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBeGreaterThan(0);
    });

    it("Nyaa search with query and category", async () => {
        const result = await nyaa.search("One piece", {
            category: "anime",
        });

        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBeGreaterThan(0);
    });

    it("Nyaa search by username", async () => {
        const result = await nyaa.searchByUser("Fan-Kai");

        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBeGreaterThan(0);
    });

    it("Nyaa search by username with query", async () => {
        const result = await nyaa.searchByUser("Fan-Kai", {
            query: "One piece",
        });

        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBeGreaterThan(0);
    });
});
