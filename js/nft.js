// NFT Object Array
var NFTs = [
    Object({
        type: 'Person',
        bought: 232,
        now: 125,
        imgName: 'ma.gif',
        number: 8347,
        collection: 'MA'
    }), Object({
        type: 'Land',
        bought: 232,
        now: 125,
        imgName: 'SF_Land',
        number: 42134,
        collection: 'sheepFarm'
    }), Object({
        type: 'Sheep',
        bought: 120,
        now: 330,
        imgName: 'SF_2513',
        number: 237425,
        collection: 'sheepFarm'
    }), Object({
        type: 'Sheep',
        bought: 120,
        now: 50,
        imgName: 'SF_200',
        number: 237973,
        collection: 'sheepFarm'
    }), Object({
        type: 'Sheep',
        bought: 120,
        now: 50,
        imgName: 'SF_130',
        number: 237783,
        collection: 'sheepFarm'
    })
];

$(document).ready(function() {
    $('.NFTBarTop').each(function(i,collect) {
        $(collect).children('.collection').text(NFTs[i].collection);
        $(collect).children('#detail').text('#' + NFTs[i].number);
    })
});