<h1 align="center">Nyaa-si</h1>

This is an unofficial API for nyaa - https://nyaa.si or https://nyaa.land or whatever domain you want to use. This allows you to search for torrents by name, category, or even user. Use at your own risk.

<div align="center">

[![npm](https://img.shields.io/npm/v/nyaa-si?style=flat-square)](https://www.npmjs.com/package/nyaa-si)
[![npm](https://img.shields.io/npm/dt/nyaa-si?style=flat-square)](https://www.npmjs.com/package/nyaa-si)
![NPM](https://img.shields.io/npm/l/nyaa-si)

</div>

## Install

```bash
npm install --save nyaa-si
yarn add nyaa-si
pnpm add nyaa-si
```

## Usage

```js
const Nyaa = require('nyaa-si'); // or import Nyaa from 'nyaa-si'

const options = {
    baseUrl: 'https://nyaa.si', // or https://nyaa.land or whatever domain you want to use
    mode: 'html', // or "rss"
}; // this is optional

const nyaa = new Nyaa(options);

const queryOptions = {
    page: 1,
    category: 'all', // all, anime, audio, literature, live-action, pictures, software, games
    filter: 'no filter', // no filter, trusted only, no remakes
    sort: 'date', // date, downloads, size, seeders, leechers, comments
    order: 'desc', // desc, asc
};

// Search for torrents
const result = await nyaa.search('One Piece', queryOptions);
/**
 * {
 *      data:[
 *          {
 *          id: 000000,
 *          name: 'One Piece by Oda',
 *          date: 2023-08-13T04:20:50.000Z,
 *          seeders: 69,
 *          leechers: 69420,
 *          downloads: 6969,
 *          magnet: 'magnet:?xt=urn:btih:a5fe...',
 *          size: '507.6 MiB',
 *          category: 'Anime - English-translated',
 *          }, ...
 *     ],
 *     total: 100,
 *     page: 1,
 *     totalPage: 10,
 *     perPage: 75
 *     totalPage: 2,
 *     range: 1-75
 *     nextPage: true,
 *     timeTaken: 0.69
 * }
 */
```

## API

### `search(query, options)`

Search for torrents.

#### `query`

Type: `string`

The search query.

#### `options`

Type: `object`

The search options.

```jsonc
{
    "page": 1,
    "category": "all", // all, anime, audio, literature, live-action, pictures, software, games
    "filter": "no filter", // no filter, trusted only, no remakes
    "sort": "date", // date, downloads, size, seeders, leechers, comments
    "order": "desc" // desc, asc
}
```

### `searchByUser(username, options)`

Search for torrents by user.

#### `username`

Type: `string`

The username.

#### `options`

Type: `object`

The search options.

```jsonc
{
    "page": 1,
    "category": "all", // all, anime, audio, literature, live-action, pictures, software, games
    "filter": "no filter", // no filter, trusted only, no remakes
    "sort": "date", // date, downloads, size, seeders, leechers, comments
    "order": "desc", // desc, asc
    "query": "One Piece" // The search query
}
```

## TODO

-   [x] Add support for sorting by various fields
-   [x] Add support for searching by category
-   [x] Add support for searching by user
-   [ ] Add pagination support - still partial support (only for html and normal query)
-   [ ] Add sukebei support
-   [ ] Write tests for apis - Added partial tests

## License

[MIT ©](/LICENSE)

## Disclaimer

This is an unofficial API for nyaa. I am not affiliated with nyaa in any way. Use at your own risk.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
