import * as cheerio from 'cheerio';
import { Torrent } from '../types';

export const getTorrentsFromHTML = (html: string) => {
    const $ = cheerio.load(html);
    const torrents: Torrent[] = [];

    $('tr').each((_, elem) => {
        const id = $(elem)
            .find('td:nth-child(2) > a')
            .attr('href')
            ?.replace('/view/', '');
        const name = $(elem).find('td:nth-child(2) > a').text().trim();
        const magnet = $(elem)
            .find('td:nth-child(3)')
            .find('a:nth-child(2)')
            .attr('href');
        const size = $(elem).find('td:nth-child(4)').text().trim();
        const category = $(elem).find('td:nth-child(1) > a').attr('title')!;
        const date = new Date(
            parseInt($(elem).find('td:nth-child(5)').attr('data-timestamp')!) *
                1000,
        );
        const seeders = parseInt($(elem).find('td:nth-child(6)').text().trim());
        const leechers = parseInt(
            $(elem).find('td:nth-child(7)').text().trim(),
        );
        const downloads = parseInt(
            $(elem).find('td:nth-child(8)').text().trim(),
        );

        if (id) {
            torrents.push({
                id: parseInt(id),
                name,
                date,
                seeders,
                leechers,
                downloads,
                magnet: magnet ? magnet : '',
                category,
                size,
            });
        }
    });
    return torrents;
};

export const getTorrentsFromRSS = (html: string) => {
    const $ = cheerio.load(html, { xmlMode: true });
    const torrents: Torrent[] = [];

    $('item').map((_, elem) => {
        const id = $(elem)
            .find('guid')
            .text()
            .replace('https://nyaa.land/view/', '');

        const name = $(elem).find('title').text().trim();
        const date = new Date($(elem).find('pubDate').text().trim());
        const seeders = parseInt($(elem).find('nyaa\\:seeders').text().trim());
        const leechers = parseInt(
            $(elem).find('nyaa\\:leechers').text().trim(),
        );
        const downloads = parseInt(
            $(elem).find('nyaa\\:downloads').text().trim(),
        );
        const hash = $(elem).find('nyaa\\:infoHash').text().trim();
        const magnet = `magnet:?xt=urn:btih:${hash}&dn=${name}`;
        const category = $(elem).find('nyaa\\:category').text().trim();
        const size = $(elem).find('nyaa\\:size').text().trim();

        torrents.push({
            id: parseInt(id),
            name,
            date,
            seeders,
            leechers,
            downloads,
            magnet,
            category,
            size,
        });
    });

    return torrents;
};

export const getPageCountFromHTML = (html: string) => {
    const $ = cheerio.load(html);
    const total = $('.pagination > li:nth-last-child(2)')
        .text()
        .trim()
        .replace(',', '');

    return parseInt(total);
};

export const getTotalCountFromHTML = (html: string) => {
    const $ = cheerio.load(html);
    const total = $('.pagination-page-info')
        .text()
        .trim()
        .split('results')[1]
        .trim()
        .split('of')[1]
        .trim();
    return parseInt(total);
};

export const getRangeFromHTML = (html: string) => {
    const $ = cheerio.load(html);
    const range = $('.pagination-page-info')
        .text()
        .trim()
        .split('results')[1]
        .trim()
        .split('out')[0]
        .trim();
    return range;
};

export const isNextPageAvailable = (html: string) => {
    const $ = cheerio.load(html);
    const next = $('.pagination > li:last-child > a').attr('href');

    return next !== undefined;
};
