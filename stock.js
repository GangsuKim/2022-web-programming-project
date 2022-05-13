var USDKRW, GOOGL, META, KAKAOGAMES;
var GOOGL_DONE, META_DONE, KAKAOGAMES_DONE;
const GOOGL_CNT = 2, META_CNT = 2, KAKAOGAMES_CNT = 5;

const texts = document.querySelectorAll('#stockPrice');
const totalPrice = document.querySelector('#totlaPrice');

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com',
        'X-RapidAPI-Key': '6e1e98fe82msh9b0b06f7a98c2d2p1c8126jsn776f8ccf5839'
    }
};

fetch('https://api.currencyfreaks.com/latest?apikey=239c9b6b6e9645ec91dc09654fa9f24d').then(res => res.json()).then(res => {
    USDKRW = res.rates.KRW
    fetch("http://server.go-guma.com/WPProj/GOOGL.php")
        .then(res => res.json())
        .then(res => {
            GOOGL = parseInt(parseInt(res.price) * USDKRW);
            GOOGL_DONE = true;
            stockPrice[0].innerText = addComma(GOOGL*2) + '원';
            setUpPrice();
        });

    fetch("http://server.go-guma.com/WPProj/META.php")
        .then(res => res.json())
        .then(res => {
            META = parseInt(parseInt(res.price) * USDKRW);
            META_DONE = true;
            stockPrice[1].innerText = addComma(META*2) + '원';
            setUpPrice();
        });

    fetch("http://server.go-guma.com/WPProj/KAKAOGAMES.php")
        .then(res => res.json())
        .then(res => {
            KAKAOGAMES = parseInt(parseInt(res.price));
            KAKAOGAMES_DONE = true;
            stockPrice[2].innerText = addComma(KAKAOGAMES*5) + '원';
            setUpPrice();
        });
});

showTime();

function setUpPrice() {
    if (GOOGL_DONE && META_DONE && KAKAOGAMES_DONE) {
        var price = (GOOGL * 2) + (META * 2) + (KAKAOGAMES * 5) + '';
        totalPrice.innerText = addComma(price) + '원';
    }
}

function addComma(plainPriceText) {
    var commatext = '', c = 0;
    plainPriceText += '';
    for (var i = plainPriceText.length-1; i >= 0; i--) {
        c++;
        if (c == 3 && i != 0) {
            commatext = ',' + plainPriceText[i] + commatext;
            c = 0;
        } else {
            commatext = plainPriceText[i] + commatext;
        }
    }
    return commatext
}

function showTime() {
    let today = new Date();
    const timeA = document.getElementById('timeA');

    let year = today.getFullYear();
    let month = toFullword(today.getMonth() + 1);
    let date = toFullword(today.getDate());
    let day = toFullword(today.getDay());
    let hour = toFullword(today.getHours());
    let min = toFullword(today.getMinutes());
    let sec = toFullword(today.getSeconds());

    var timeStamp = year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + sec;
    timeA.innerText = timeStamp;
}

function toFullword(string) {
    if (string < 10) {
        string = '0' + string;
    }
    return string
}