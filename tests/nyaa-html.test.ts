import { beforeEach, describe, expect, it } from 'vitest';

import Nyaa from '../src';
import { SearchResult } from '../src/types';

describe('Nyaa HTML parsing', () => {
    let nyaa: Nyaa;

    beforeEach(() => {
        nyaa = new Nyaa();
    });

    it('Nyaa instance', () => {
        expect(nyaa).toBeInstanceOf(Nyaa);
    });

    it('Nyaa empty search', async () => {
        const result = await nyaa.search();

        expect(result).toMatchObject<SearchResult>(result);
        expect(result.data.length).toBeGreaterThan(0);
    });

    it('Nyaa search with query', async () => {
        const result = await nyaa.search('One piece');

        expect(result).toMatchObject<SearchResult>(result);
        expect(result.data.length).toBeGreaterThan(0);
    });

    it("Nyaa search with query and category 'anime'", async () => {
        const result = await nyaa.search('One piece', {
            category: 'anime',
        });

        expect(result).toMatchObject<SearchResult>(result);
        expect(result.data.length).toBeGreaterThan(0);
    });

    it("Nyaa search with query and category 'audio'", async () => {
        const result = await nyaa.search('One piece', {
            category: 'audio',
        });

        expect(result).toMatchObject<SearchResult>(result);
        expect(result.data.length).toBeGreaterThan(0);
    });

    it("Nyaa search with query and category 'literature'", async () => {
        const result = await nyaa.search('One piece', {
            category: 'literature',
        });

        expect(result).toMatchObject<SearchResult>(result);
        expect(result.data.length).toBeGreaterThan(0);
    });

    it("Nyaa search with query and category 'live-action'", async () => {
        const result = await nyaa.search('One piece', {
            category: 'live-action',
        });

        expect(result).toMatchObject<SearchResult>(result);
        expect(result.data.length).toBeGreaterThan(0);
    });

    it("Nyaa search with query and category 'pictures'", async () => {
        const result = await nyaa.search('One piece', {
            category: 'pictures',
        });

        expect(result).toMatchObject<SearchResult>(result);
        expect(result.data.length).toBeGreaterThan(0);
    });

    it("Nyaa search with query and category 'software'", async () => {
        const result = await nyaa.search('One piece', {
            category: 'software',
        });

        expect(result).toMatchObject<SearchResult>(result);
        expect(result.data.length).toBeGreaterThan(0);
    });

    it("Nyaa search with query and category 'games'", async () => {
        const result = await nyaa.search('One piece', {
            category: 'games',
        });

        expect(result).toMatchObject<SearchResult>(result);
        expect(result.data.length).toBeGreaterThan(0);
    });

    it('Nyaa search with query and filter "trusted only"', async () => {
        const result = await nyaa.search('One piece', {
            filter: 'trusted only',
        });

        expect(result).toMatchObject<SearchResult>(result);
        expect(result.data.length).toBeGreaterThan(0);
    });

    it('Nyaa search with query and filter "no remakes"', async () => {
        const result = await nyaa.search('One piece', {
            filter: 'no remakes',
        });

        expect(result).toMatchObject<SearchResult>(result);
        expect(result.data.length).toBeGreaterThan(0);
    });

    it('Nyaa search by username', async () => {
        const result = await nyaa.searchByUser('Fan-Kai');

        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBeGreaterThan(0);
    });

    it('Nyaa search by username with query', async () => {
        const result = await nyaa.searchByUser('Fan-Kai', {
            query: 'One piece',
        });

        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBeGreaterThan(0);
    });

    it("Nyaa search with query and sort 'comments'", async () => {
        const result = await nyaa.search('One piece', {
            sort: 'comments',
        });

        expect(result).toMatchObject<SearchResult>(result);
        expect(result.data.length).toBeGreaterThan(0);
    });

    it("Nyaa search with query and sort 'size'", async () => {
        const result = await nyaa.search('One piece', {
            sort: 'size',
        });

        expect(result).toMatchObject<SearchResult>(result);
        expect(result.data.length).toBeGreaterThan(0);
    });

    it("Nyaa search with query and sort 'date'", async () => {
        const result = await nyaa.search('One piece', {
            sort: 'date',
        });

        expect(result).toMatchObject<SearchResult>(result);
        expect(result.data.length).toBeGreaterThan(0);
    });

    it("Nyaa search with query and sort 'seeders'", async () => {
        const result = await nyaa.search('One piece', {
            sort: 'seeders',
        });

        expect(result).toMatchObject<SearchResult>(result);
        expect(result.data.length).toBeGreaterThan(0);
    });

    it("Nyaa search with query and sort 'leechers'", async () => {
        const result = await nyaa.search('One piece', {
            sort: 'leechers',
        });

        expect(result).toMatchObject<SearchResult>(result);
        expect(result.data.length).toBeGreaterThan(0);
    });

    it("Nyaa search with query and sort 'downloads'", async () => {
        const result = await nyaa.search('One piece', {
            sort: 'downloads',
        });

        expect(result).toMatchObject<SearchResult>(result);
        expect(result.data.length).toBeGreaterThan(0);
    });

    it("Nyaa search with query and order 'asc'", async () => {
        const result = await nyaa.search('One piece', {
            order: 'asc',
        });

        expect(result).toMatchObject<SearchResult>(result);
        expect(result.data.length).toBeGreaterThan(0);
    });

    it("Nyaa search with query and order 'desc'", async () => {
        const result = await nyaa.search('One piece', {
            order: 'desc',
        });

        expect(result).toMatchObject<SearchResult>(result);
        expect(result.data.length).toBeGreaterThan(0);
    });

    it('Nyaa search for page 2', async () => {
        const result = await nyaa.search('', {
            page: 2,
        });

        expect(result).toMatchObject<SearchResult>(result);
        expect(result.data.length).toBeGreaterThan(0);
    });
});
