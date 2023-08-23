import Nyaa from './bin';

// nyaa html

const nyaaHTML = new Nyaa({ baseUrl: 'https://nyaa.land/', mode: 'html' });

// nyaa rss
const nyaaRSS = new Nyaa({ baseUrl: 'https://nyaa.land/', mode: 'rss' });

// checking performance of nyaa html
const start = performance.now();

nyaaHTML
    .search('one piece', {
        page: 1,
        category: 'all',
        filter: 'no filter',
        sort: '',
        order: '',
    })
    .then(res => {
        const end = performance.now();
        const elapsed = end - start;
        console.log(`Time elapsed: ${elapsed}ms for nyaa html`);
    });

// checking performance of nyaa rss
const start2 = performance.now();

nyaaRSS
    .search('one piece', {
        page: 1,
        category: 'all',
        filter: 'no filter',
        sort: '',
        order: '',
    })
    .then(res => {
        const end = performance.now();
        const elapsed = end - start2;
        console.log(`Time elapsed: ${elapsed}ms for nyaa rss`);
    });
