var USDKRW;
var GOOGL = new Object({cnt : 2, done: false});
var META = new Object({cnt : 2, done: false});
var KAKAOGAMES = new Object({cnt : 5, done: false});

const texts = document.querySelectorAll('#stockPrice');
const totalPrice = document.querySelector('#totlaPrice');

function fetchData() {
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
                GOOGL.price = parseInt(parseInt(res.price) * USDKRW);
                GOOGL.done = true;
                stockPrice[0].innerText = addComma(GOOGL.price * GOOGL.cnt) + '원';
                setUpPrice();
            });

        fetch("http://server.go-guma.com/WPProj/META.php")
            .then(res => res.json())
            .then(res => {
                META.price = parseInt(parseInt(res.price) * USDKRW);
                META.done = true;
                stockPrice[1].innerText = addComma(META.price * META.cnt) + '원';
                setUpPrice();
            });

        fetch("http://server.go-guma.com/WPProj/KAKAOGAMES.php")
            .then(res => res.json())
            .then(res => {
                KAKAOGAMES.price = parseInt(parseInt(res.price));
                KAKAOGAMES.done = true;
                stockPrice[2].innerText = addComma(KAKAOGAMES.price * KAKAOGAMES.cnt) + '원';
                setUpPrice();
            });
    });
};

function setUpPrice() {
    if (GOOGL.done && META.done && KAKAOGAMES.done) {
        var price = (GOOGL.price * GOOGL.cnt) + (META.price * META.cnt) + (KAKAOGAMES.price * KAKAOGAMES.cnt) + '';
        totalPrice.innerText = addComma(price) + '원';
        googlePrice();
    }
}

function addComma(plainPriceText) {
    var commatext = '',
        c = 0;
    plainPriceText += '';
    for (var i = plainPriceText.length - 1; i >= 0; i--) {
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

function googlePrice() {
    const googlePriceSpans = document.getElementsByClassName('googlePrice');

    for (var i = 0; i < googlePriceSpans.length; i++) {
        if (googlePriceSpans[i].innerText == '') {
            googlePriceSpans[i].innerText = addComma(GOOGL.price) + '원';
        } else {
            var priceTemp = parseInt(eval(GOOGL.price + googlePriceSpans[i].innerText));
            googlePriceSpans[i].innerText = addComma(priceTemp) + '원';
        }
    }
}

showTime();
fetchData();