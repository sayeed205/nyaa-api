export interface Torrent {
    /**
     * Torrent ID (Nyaa)
     */
    id: number;

    /**
     * Torrent name
     */
    name: string;

    /**
     * Torrent magnet link
     */
    magnet: string;

    /**
     * Torrent size (ex: 507.6 MiB)
     */
    size: string;

    /**
     * Torrent category (ex: Anime - English-translated)
     */
    category: string;

    /**
     * Torrent publish date
     */
    date: Date;

    /**
     * Torrent seeders count
     */
    seeders: number;

    /**
     * Torrent leechers count
     */
    leechers: number;

    /**
     * Torrent download count
     */
    downloads: number;
}

export interface SearchResult {
    /**
     * Array of torrents
     */
    data: Torrent[];

    /**
     * Total number of torrents, if null then query is invalid or not provided
     */
    total: number | null;

    /**
     * Current page number
     */
    page: number;

    /**
     * Total number of pages, if null then query is invalid or not provided
     */
    totalPage: number | null;

    /**
     * Number of torrents per page
     */
    perPage: number;

    /**
     * Is there a next page
     */
    nextPage: boolean;

    /**
     * Search result range
     */
    range: string | null;

    /**
     * Time taken to fetch the data
     */
    timeTaken: number;
}

export interface SearchOptions {
    /**
     * Which page to fetch (default: 1)
     */
    page?: number;

    /**
     * Torrent category (default: all)
     */
    category?:
        | 'all'
        | 'anime'
        | 'audio'
        | 'literature'
        | 'live-action'
        | 'pictures'
        | 'software'
        | 'games';

    /**
     * Filter torrents (default: no filter)
     */
    filter?: 'no filter' | 'trusted only' | 'no remakes';

    /**
     * Sort torrents (default: "")
     */
    sort?:
        | 'comments'
        | 'size'
        | 'date'
        | 'seeders'
        | 'leechers'
        | 'downloads'
        | '';

    /**
     * Sort order (default: "")
     */
    order?: 'asc' | 'desc' | '';
}

export interface SearchByUserOptions extends SearchOptions {
    query?: string;
}

export interface NyaaOptions {
    baseUrl: string;
    mode: 'rss' | 'html';
}
