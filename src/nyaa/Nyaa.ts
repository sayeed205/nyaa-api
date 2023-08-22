import { SearchByUserOptions, SearchOptions, Torrent } from '../types';
import { getTorrents } from './nyaa.scrapper';

/**
 * @example
 * import Nyaa from 'nyaa-api';
 * const nyaa = new Nyaa('https://nyaa.si/'); // default url is https://nyaa.land/
 */
export class Nyaa {
    constructor(private readonly url: string = 'https://nyaa.land') {
        this.url = url;
    }

    /**
     * @param query Search query
     * @param options Search options
     * @returns Torrents
     *
     * @example
     * const options = {
     *                      page: 1,
     *                      category: 'all', // all, anime, audio, literature, live-action, pictures, software, games
     *                      filter: 'no filter', // no filter, trusted only, no remakes
     *                     sort: '', // comments, size, date, seeders, leechers, downloads
     *                    order: '', // asc, desc
     *                  }
     *
     * @example
     * const torrents = await nyaa.search('one piece', options);
     * console.log(torrents);
     *
     * [
     *  {
     *      id: 1703892,
     *      name: '2[Judas] One Piece - 1072 [1080p][HEVC x265 10bit][Multi-Subs] (Weekly)',
     *      link: 'https://nyaa.land/view/1703892#comments',
     *      magnet: 'magnet:?xt=urn:btih:a5feee8bf15144c7c241a52d6047fc9955f629c3...',
     *      hash: 'a5feee8bf15144c7c241a52d6047fc9955f629c3',
     *      size: '507.6 MiB',
     *      category: 'Anime - English-translated',
     *      date: 2023-08-13T04:20:50.000Z,
     *      seeders: 196,
     *      leechers: 0,
     *      downloads: 4799,
     *      status: 'danger'
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
        }
    ): Promise<Torrent[]> {
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

        const url = `${this.url}?f=${f}&c=${c}&q=${query}&p=${p}&s=${s}&o=${o}`;
        console.log(url);
        const res = await fetch(url);
        const data = await res.text();

        const torrents = getTorrents(data, this.url);

        return torrents;
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
        }
    ): Promise<Torrent[]> {
        const { page, category, filter, sort, order } = options;
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

        const url = `${this.url}/user/${username}?f=${f}&c=${c}&q=&p=${p}&s=${s}&o=${o}`;
        console.log(url);
        const res = await fetch(url);
        const data = await res.text();

        const torrents = getTorrents(data, this.url);

        return torrents;
    }
}
