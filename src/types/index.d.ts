export interface torrent {
    id: number;
    name: string;
    magnet: string;
    hash: string;
    size: string;
    category: string;
    date: Date;
    seeders: number;
    leechers: number;
    downloads: number;
    status: string;
}
