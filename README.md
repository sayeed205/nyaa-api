<h1 align="center">Nyaa-si</h1>

This is an unofficial API for nyaa - https://nyaa.si or https://nyaa.land or whatever domain you want to use. This allows you to search for torrents by name, category, or even user.

## Install

```bash
npm install --save nyaa-si
yarn add nyaa-si
pnpm add nyaa-si
```

## Usage

```js
const Nyaa = require('nyaa-si'); // or import Nyaa from 'nyaa-si'

const nyaa = new Nyaa();

const options = {
    page: 1,
    category: 'all', // all, anime, audio, literature, live-action, pictures, software, games
    filter: 'no filter', // no filter, trusted only, no remakes
    sort: 'date' // date, downloads, size, seeders, leechers, comments
    order: 'desc' // desc, asc
};

// Search for torrents
const torrents = await nyaa.search('One Piece', options);
/**
 * [
 *  {
 *      id: 1703892,
 *      name: '2[Judas] One Piece - 1072 [1080p [HEVC x265 10bit][Multi-Subs] (Weekly)',
 *      link: 'https://nyaa.land/view 1703892#comments',
 *      magnet: 'magnet: xt=urn:btih:a5feee8bf15144c7c241a52d6047fc9955f62 c3...',
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
    "filter": "no filter" // no filter, trusted only, no remakes
    "sort": "date", // date, downloads, size, seeders, leechers, comments
    "order": "desc", // desc, asc
    "query": "One Piece" // The search query
}
```

## License

[MIT ©](/LICENSE)

## Disclaimer

This is an unofficial API for nyaa. I am not affiliated with nyaa in any way. Use at your own risk.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
