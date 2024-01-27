import {
    NyaaOptions,
    SearchByUserOptions,
    SearchOptions,
    SearchResult,
    Torrent,
} from '../types';
import {
    getPageCountFromHTML,
    getRangeFromHTML,
    getTorrentsFromHTML,
    getTorrentsFromRSS,
    getTotalCountFromHTML,
    isNextPageAvailable,
} from './nyaa.scrapper';

/**
 * Nyaa Instance - You can pass options to the constructor but it's not required
 * @example
 * import Nyaa from 'nyaa-api';
 *
 * const options = {
 *     baseUrl: 'https://nyaa.land/',
 *     mode: 'html',
 * }
 * const nyaa = new Nyaa(options);
 */
export class Nyaa {
    constructor(
        private readonly options: NyaaOptions = {
            baseUrl: 'https://nyaa.land/',
            mode: 'html',
        },
    ) {
        this.options = options;
    }

    /**
     * @param query Search query
     * @param options Search options
     * @returns Torrents
     *
     * @example
     * const options = {
     *    page: 1,
     *    category: 'all', // all, anime, audio, literature, live-action, pictures, software, games
     *    filter: 'no filter', // no filter, trusted only, no remakes
     *    sort: '', // comments, size, date, seeders, leechers, downloads
     *    order: '', // asc, desc
     *}
     *
     * @example
     * const torrents = await nyaa.search('one piece', options);
     * console.log(torrents);
     *
     * [
     *  {
     *      id: 000000,
     *      name: 'One Piece by Oda',
     *      date: 2023-08-13T04:20:50.000Z,
     *      seeders: 69,
     *      leechers: 69420,
     *      downloads: 6969,
     *      magnet: 'magnet:?xt=urn:btih:a5fe...',
     *      size: '507.6 MiB',
     *      category: 'Anime - English-translated',
     *  }, ...
     * ]
     */
    async search(
        query: string = '',
        options: SearchOptions = {
            page: 1,
            category: 'all',
            filter: 'no filter',
            sort: '',
            order: '',
        },
    ): Promise<SearchResult> {
        const startTime = Date.now();
        const { page, category, filter, sort, order } = options;
        const p = page! < 1 ? 1 : page;
        let c = '0_0';
        switch (category) {
            case 'anime':
                c = '1_0';
                break;
            case 'audio':
                c = '2_0';
                break;
            case 'literature':
                c = '3_0';
                break;
            case 'live-action':
                c = '4_0';
                break;
            case 'pictures':
                c = '5_0';
                break;
            case 'software':
                c = '6_0';
                break;
            case 'games':
                c = '6_2';
                break;
            default:
                c = '0_0';
                break;
        }

        let f = '0';
        switch (filter) {
            case 'trusted only':
                f = '2';
                break;
            case 'no remakes':
                f = '3';
                break;
            default:
                f = '0';
                break;
        }

        const s = sort === 'date' ? 'id' : sort ? sort : '';

        const o = order ? order : '';

        if (this.options.mode === 'rss') {
            const url = `${this.options.baseUrl}?page=rss&q=${query}&c=${c}&f=${f}&p=${p}&s=${s}&o=${o}`;
            const res = await fetch(url).then(res => res.text());
            const torrents = getTorrentsFromRSS(res);
            const endTime = Date.now();
            return {
                data: torrents,
                total: 0,
                page: 0,
                totalPage: 0,
                perPage: 0,
                range: '',
                nextPage: false,
                timeTaken: endTime - startTime,
            };
        }
        const url = `${this.options.baseUrl}?&q=${query}&c=${c}&f=${f}&p=${p}&s=${s}&o=${o}`;
        const res = await fetch(url).then(res => res.text());
        const torrents = getTorrentsFromHTML(res);
        const totalPage = query ? getPageCountFromHTML(res) : null;
        const total = query ? getTotalCountFromHTML(res) : null;
        const range = query ? getRangeFromHTML(res) : null;
        const nextPage = isNextPageAvailable(res);
        const endTime = Date.now();
        return {
            data: torrents,
            total,
            // if page is not provided then its 1 if page is greater than totalPage then its totalPage
            page: page! <= 1 ? 1 : page! > totalPage! ? totalPage! : page!,
            totalPage,
            perPage: torrents.length,
            range,
            nextPage,
            timeTaken: (endTime - startTime) / 1000,
        };
    }

    /**
     * Search torrents by user
     * @param username string - username
     * @param options Search options
     * @returns Torrents
     */
    async searchByUser(
        username: string,
        options: SearchByUserOptions = {
            page: 1,
            category: 'all',
            filter: 'no filter',
            sort: '',
            order: '',
            query: '',
        },
    ): Promise<Torrent[]> {
        const { page, category, filter, sort, order, query } = options;
        const p = page ? page : 1;
        let c = '0_0';
        switch (category) {
            case 'anime':
                c = '1_0';
                break;
            case 'audio':
                c = '2_0';
                break;
            case 'literature':
                c = '3_0';
                break;
            case 'live-action':
                c = '4_0';
                break;
            case 'pictures':
                c = '5_0';
                break;
            case 'software':
                c = '6_0';
                break;
            case 'games':
                c = '6_2';
                break;
            default:
                c = '0_0';
                break;
        }

        let f = '0';
        switch (filter) {
            case 'trusted only':
                f = '2';
                break;
            case 'no remakes':
                f = '1';
                break;
            default:
                f = '0';
                break;
        }

        const s = sort === 'date' ? 'id' : sort ? sort : '';

        const o = order ? order : '';
        const q = query ? query : '';

        if (this.options.mode === 'rss') {
            const url = `${this.options.baseUrl}?page=rss&u=${username}&q=${q}&c=${c}&f=${f}&p=${p}&s=${s}&o=${o}`;
            const res = await fetch(url).then(res => res.text());
            const torrents = getTorrentsFromRSS(res);
            return torrents;
        }

        const url = `${this.options.baseUrl}?&u=${username}&q=${q}&c=${c}&f=${f}&p=${p}&s=${s}&o=${o}`;
        const res = await fetch(url).then(res => res.text());
        const torrents = getTorrentsFromHTML(res);
        return torrents;
    }
}
