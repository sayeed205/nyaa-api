import * as cheerio from 'cheerio';
import { Torrent } from '../types';

export const getTorrents = (html: string, url: string) => {
    const $ = cheerio.load(html);
    const torrents: Torrent[] = [];

    $('tr').each((i, elem) => {
        const id = $(elem)
            .find('td:nth-child(2) > a')
            .attr('href')
            ?.replace('/view/', '');
        const name = $(elem).find('td:nth-child(2) > a').text().trim();
        const link = $(elem).find('td:nth-child(3) > a').attr('href');
        const magnet = $(elem)
            .find('td:nth-child(3)')
            .find('a:nth-child(2)')
            .attr('href');
        const hash = magnet?.match(/btih:(.*?)&/)?.[1];
        const size = $(elem).find('td:nth-child(4)').text().trim();
        const category = $(elem).find('td:nth-child(1) > a').attr('title')!;
        const date = new Date(
            parseInt($(elem).find('td:nth-child(5)').attr('data-timestamp')!) *
                1000
        );
        const seeders = parseInt($(elem).find('td:nth-child(6)').text().trim());
        const leechers = parseInt(
            $(elem).find('td:nth-child(7)').text().trim()
        );
        const downloads = parseInt(
            $(elem).find('td:nth-child(8)').text().trim()
        );
        const status = $(elem).attr('class')!;

        if (id && hash) {
            torrents.push({
                id: parseInt(id),
                name,
                link: url + '/view/' + id,
                magnet,
                hash,
                size,
                category,
                date,
                seeders,
                leechers,
                downloads,
                status,
            });
        }
    });
    return torrents;
};

// const res = axios.get('https://nyaa.land').then(async res => {
//     const data = getTorrent(res.data);
//     console.log(data);
// });
