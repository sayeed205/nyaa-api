import Nyaa from './dist';

const nyaa = new Nyaa();

(async () => {
    const res = await nyaa.search('HorribleSubs');
    console.log(res);
})();
