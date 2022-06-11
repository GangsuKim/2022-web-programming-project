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
    }), Object({
        type: 'Rare',
        bought: 280,
        now: 50,
        imgName: 'MFB_6741',
        number: 6741,
        collection: 'My Fat Babiz'
    }), Object({
        type: 'Uncommon',
        bought: 250,
        now: 50,
        imgName: 'MFB_7211',
        number: 7211,
        collection: 'My Fat Babiz'
    }), Object({
        type: 'Uncommon',
        bought: 140,
        now: 200,
        imgName: 'DKR_8394',
        number: 8394,
        collection: 'DKR'
    }), Object({
        type: 'Mongz',
        bought: 75,
        now: 35,
        imgName: 'BM_1649',
        number: 1649,
        collection: 'Baby Mongz'
    }), Object({
        type: 'Mongz',
        bought: 75,
        now: 35,
        imgName: 'BM_8851',
        number: 8851,
        collection: 'Baby Mongz'
    })
];

let KLAYTN_price = 0;
let totalPrice = 0;
let basePos = 0;

fetch("https://api.bithumb.com/public/ticker/KLAY_KRW")
.then(res => res.json())
.then(res => {
    KLAYTN_price = parseFloat(res.data.closing_price);
}).then(() => {
    NFTs.forEach(nft => {
        totalPrice += nft.now;
    })
    $('#totlaPrice').text(addComma(totalPrice * totalPrice) + ' 원');
})

$(document).ready(function () {
    $('.NFTBarTop').each(function (i, barTop) {
        $(barTop).children('.collection').text(NFTs[i].collection);
        $(barTop).children('#detail').text('#' + NFTs[i].number);
    })

    $('.nftSliderDiv > div').each(function (i, NFTBar) {
        var imgStr = NFTs[i].imgName;

        $(NFTBar).children('img').attr('alt', imgStr);


        if (imgStr.indexOf('.') == -1) {
            imgStr += '.png';
        }

        $(NFTBar).children('img').attr('src', 'images/' + imgStr);

        const objectStr = ['bought', 'now', 'percent'];
        $(NFTBar).children('div').children('div').children('#boughtPrice').each(function (j, eachPrice) {
            if (j < 2) {
                $(eachPrice).text(NFTs[i][objectStr[j]]);
            } else {
                $(eachPrice).text(((NFTs[i][objectStr[1]] / NFTs[i][objectStr[0]] - 1) * 100).toFixed(0) + '%');
            }
        })
    })

    showTime();
});

function moveTo(dir) {
    basePos += dir;

    $('.NFTBarTop').each(function (k, barTop) {
        i = (Math.abs(k+basePos)) % NFTs.length;
        $(barTop).children('.collection').text(NFTs[i].collection);
        $(barTop).children('#detail').text('#' + NFTs[i].number);
    })

    $('.nftSliderDiv > div').each(function (k, NFTBar) {
        i = (Math.abs(k+basePos)) % NFTs.length;

        var imgStr = NFTs[i].imgName;

        $(NFTBar).children('img').attr('alt', imgStr);


        if (imgStr.indexOf('.') == -1) {
            imgStr += '.png';
        }

        $(NFTBar).children('img').attr('src', 'images/' + imgStr);

        const objectStr = ['bought', 'now', 'percent'];
        totalPrice += NFTs[i].now;
        $(NFTBar).children('div').children('div').children('#boughtPrice').each(function (j, eachPrice) {
            if (j < 2) {
                $(eachPrice).text(NFTs[i][objectStr[j]]);
            } else {
                $(eachPrice).text(((NFTs[i][objectStr[1]] / NFTs[i][objectStr[0]] - 1) * 100).toFixed(0) + '%');
            }
        })
    })
}