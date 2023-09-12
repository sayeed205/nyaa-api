export interface Torrent {
    id: number;
    name: string;
    magnet: string;
    size: string;
    category: string;
    date: Date;
    seeders: number;
    leechers: number;
    downloads: number;
}

export interface SearchOptions {
    page?: number;
    category?:
        | 'all'
        | 'anime'
        | 'audio'
        | 'literature'
        | 'live-action'
        | 'pictures'
        | 'software'
        | 'games';
    filter?: 'no filter' | 'trusted only' | 'no remakes';
    sort?:
        | 'comments'
        | 'size'
        | 'date'
        | 'seeders'
        | 'leechers'
        | 'downloads'
        | '';
    order?: 'asc' | 'desc' | '';
}

export interface SearchByUserOptions extends SearchOptions {
    query?: string;
}

export interface NyaaOptions {
    baseUrl: string;
    mode: 'rss' | 'html';
}
