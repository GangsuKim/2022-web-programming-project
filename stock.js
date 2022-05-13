var USDKRW, GOOGL, META, GOOGL_DONE, META_DONE;
const GOOGL_CNT = 2, META_CNT = 2;

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com',
        'X-RapidAPI-Key': '6e1e98fe82msh9b0b06f7a98c2d2p1c8126jsn776f8ccf5839'
    }
};

const texts = document.querySelectorAll('#stockPrice');
const totalPrice = document.querySelector('#totlaPrice');

fetch('https://api.currencyfreaks.com/latest?apikey=239c9b6b6e9645ec91dc09654fa9f24d').then(res => res.json()).then(res => {
    USDKRW = res.rates.KRW

    fetch('https://yh-finance.p.rapidapi.com/stock/v3/get-chart?interval=1m&symbol=GOOGL&range=1d&region=HK&includePrePost=false&useYfid=true&includeAdjustedClose=true&events=capitalGain%2Cdiv%2Csplit', options)
        .then(response => response.json())
        .then(response => {
            GOOGL = parseInt(response['chart']['result'][0]['meta']['regularMarketPrice'] * USDKRW);
            texts[0].innerText = (GOOGL * GOOGL_CNT).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원';
            GOOGL_DONE = true;
            setUpPrice();
        });

    fetch('https://yh-finance.p.rapidapi.com/stock/v3/get-chart?interval=1m&symbol=FB&range=1d&region=HK&includePrePost=false&useYfid=true&includeAdjustedClose=true&events=capitalGain%2Cdiv%2Csplit', options)
        .then(response => response.json())
        .then(response => {
            META = parseInt(response['chart']['result'][0]['meta']['regularMarketPrice'] * USDKRW);
            alert(addComma(META + ''));
            texts[1].innerText = (META * META_CNT).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원';
            META_DONE = true;
            setUpPrice();
        });
});

function setUpPrice() {
    if(GOOGL_DONE && META_DONE) {
        var price = (parseInt(GOOGL) * 2) + (parseInt(META) * 2) + '';
        totalPrice.innerText = price.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원';
    }
}

function addComma(plainPriceText) {
    var commatext, c = 0;
    for (var i = plainPriceText.length - 1; i >= 0; i--) {
        c++;
        if(c == 3) {
            commatext = ',' + plainPriceText[i] + commatext;
        } else {
            commatext = plainPriceText[i] + commatext;
        }
    }
    return commatext;
}