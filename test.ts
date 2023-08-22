import Nyaa from './bin';

const nyaa = new Nyaa();

nyaa.search('one', {
    category: 'all',
    order: '',
    page: 1,
    sort: '',
}).then(console.log);

// nyaa.searchByUser('HorribleSubs', {}).then(console.log);
