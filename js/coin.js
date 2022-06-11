var KLAYTN = new Object({
    cnt: 1021,
    done: false,
    name: 'Klaytn',
    bought: 1359
});

var YOOSHI = new Object({
    cnt: 1234516137,
    done: false,
    name: 'Yooshi',
    bought: 0.0004784
});

var NFT = new Object({
    cnt: 191548354,
    done: false,
    name: 'NFT',
    bought: 0.0062192
});

const coins = [KLAYTN, YOOSHI, NFT];
var coinDivs = [];

const texts = document.querySelectorAll('#stockPrice');
const totalPrice = document.querySelector('#totlaPrice');

function fetchCoinData() {
    fetch("https://api.bithumb.com/public/ticker/KLAY_KRW")
        .then(res => res.json())
        .then(res => {
            KLAYTN.price = parseFloat(res.data.closing_price);
            KLAYTN.done = true;
            stockPrice[0].innerText = addComma(parseInt(KLAYTN.price * KLAYTN.cnt)) + '원';
            setUpPrice();
        });

    fetch("https://api.coingecko.com/api/v3/coins/yooshi?localization=false")
        .then(res => res.json())
        .then(res => {  
            YOOSHI.price = res.market_data.current_price.krw;
            YOOSHI.done = true;
            stockPrice[1].innerText = addComma(parseInt(YOOSHI.price * YOOSHI.cnt)) + '원';
            setUpPrice();
        });

    fetch("https://api.coingecko.com/api/v3/coins/apenft?localization=false")
        .then(res => res.json())
        .then(res => {  
            NFT.price = res.market_data.current_price.krw;
            NFT.done = true;
            stockPrice[2].innerText = addComma(parseInt(NFT.price * NFT.cnt)) + '원';
            setUpPrice();
        });
}

function setUpPrice() {
    if (KLAYTN.done && YOOSHI.done && NFT.done) {
        var price = (KLAYTN.price * KLAYTN.cnt) + (YOOSHI.price * YOOSHI.cnt) + (NFT.price * NFT.cnt) + '';
        totalPrice.innerText = addComma(parseInt(price)) + '원';
        setUpBoard(coins);
    }
}

function setUpBoard(coinIn) {
    for (i = 0; i < coinIn.length; i++) {
        var CBDiv = document.createElement('div');
        CBDiv.setAttribute('class', 'stock');
        CBDiv.setAttribute('id', i);

        CBDiv.innerHTML = '<a id="stockName">' + coinIn[i].name + '</a>';
        CBDiv.innerHTML += '<a id="stockCount" class="fontLight" style="margin-left: 10px">' + addComma(coinIn[i].cnt) + '개    </a><br>';

        CBInner = document.createElement('div');
        CBInner.setAttribute('class','priceInner');

        CBInner.innerHTML += '<a id="stockBoardTitle">현재 가격</a>';
        CBInner.innerHTML += '<a id="stockBoardPrice">' + addComma(coinIn[i].price) + '원</a>';
        CBInner.innerHTML += '<a id="stockBoardTitle">매수 가격</a>';
        CBInner.innerHTML += '<a id="stockBoardPrice">' + addComma(coinIn[i].bought) + '원</a>';
        CBInner.innerHTML += '<a id="stockBoardTitle">수익률</a>';
        CBInner.innerHTML += '<a id="stockBoardPrice">' + calcPM(coinIn[i].price, coinIn[i].bought) + '%</a>';
        
        CBDiv.appendChild(CBInner);
        coinDivs.push(CBDiv)
    }

    const stockBoard = document.getElementsByClassName('stockBoard')[0];
    stockBoard.insertBefore(coinDivs[0], stockBoard.getElementsByClassName('stockBoardBottom')[0]);
}

document.getElementById('boardBefore').addEventListener('click', handleBoardBefore);
document.getElementById('boardNext').addEventListener('click', handleBoardNext);

function handleBoardBefore() {
    const stockBoard = document.getElementsByClassName('stockBoard')[0];
    const stock = stockBoard.getElementsByClassName('stock')[0];
    var moveTo;

    if(stock.id == 0) {
        moveTo = coinDivs[coinDivs.length - 1];
    } else {
        moveTo = coinDivs[stock.id - 1]
    }

    stockBoard.removeChild(stock);
    stockBoard.insertBefore(moveTo, stockBoard.getElementsByClassName('stockBoardBottom')[0]);
}

function handleBoardNext() {
    const stockBoard = document.getElementsByClassName('stockBoard')[0];
    const stock = stockBoard.getElementsByClassName('stock')[0];
    var moveTo;

    if(stock.id == (coinDivs.length - 1)) {
        moveTo = coinDivs[0];
    } else {
        moveTo = coinDivs[parseInt(stock.id) + 1];
    }

    stockBoard.removeChild(stock);
    stockBoard.insertBefore(moveTo, stockBoard.getElementsByClassName('stockBoardBottom')[0]);
}

fetchCoinData();
showTime()