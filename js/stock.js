var USDKRW;

var GOOGL = new Object({cnt : 2, done: false, name: 'Alphabet', bought: 3369411});
var META = new Object({cnt : 2, done: false, name: 'META', bought: 276691});
var KAKAOGAMES = new Object({cnt : 5, done: false, name: '카카오 게임즈', bought: 90600});

const stocks = [GOOGL, META, KAKAOGAMES];
var stockDivs = [];

const texts = document.querySelectorAll('#stockPrice');
const totalPrice = document.querySelector('#totlaPrice');

function fetchData() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com',
            'X-RapidAPI-Key': 'YOUR API KEY'
        }
    };

    fetch('http://server.go-guma.com/WPProj/USDtoKRW.php').then(res => res.json()).then(res => {
        USDKRW = res.price
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

function setUpBoard(stockIn) {
    for (i = 0; i < stockIn.length; i++) {
        var SBDiv = document.createElement('div');
        SBDiv.setAttribute('class', 'stock');
        SBDiv.setAttribute('id', i);

        SBDiv.innerHTML = '<a id="stockName">' + stockIn[i].name + '</a>';
        SBDiv.innerHTML += '<a id="stockCount" class="fontLight">' + stockIn[i].cnt + '주</a><br>';

        SBInner = document.createElement('div');
        SBInner.setAttribute('class','priceInner');

        SBInner.innerHTML += '<a id="stockBoardTitle">현재 가격</a>';
        SBInner.innerHTML += '<a id="stockBoardPrice">' + addComma(stockIn[i].price) + '원</a>';
        SBInner.innerHTML += '<a id="stockBoardTitle">매수 가격</a>';
        SBInner.innerHTML += '<a id="stockBoardPrice">' + addComma(stockIn[i].bought) + '원</a>';
        SBInner.innerHTML += '<a id="stockBoardTitle">수익률</a>';
        SBInner.innerHTML += '<a id="stockBoardPrice">' + calcPM(stockIn[i].price, stockIn[i].bought) + '%</a>';
        
        SBDiv.appendChild(SBInner);
        stockDivs.push(SBDiv)
    }

    const stockBoard = document.getElementsByClassName('stockBoard')[0];
    stockBoard.insertBefore(stockDivs[0], stockBoard.getElementsByClassName('stockBoardBottom')[0]);
}

function setUpPrice() {
    if (GOOGL.done && META.done && KAKAOGAMES.done) {
        var price = (GOOGL.price * GOOGL.cnt) + (META.price * META.cnt) + (KAKAOGAMES.price * KAKAOGAMES.cnt) + '';
        totalPrice.innerText = addComma(price) + '원';
        googlePrice();
        setUpBoard(stocks);
    }
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

document.getElementById('boardBefore').addEventListener('click', handleBoardBefore);
document.getElementById('boardNext').addEventListener('click', handleBoardNext);

function handleBoardBefore() {
    const stockBoard = document.getElementsByClassName('stockBoard')[0];
    const stock = stockBoard.getElementsByClassName('stock')[0];
    var moveTo;

    if(stock.id == 0) {
        moveTo = stockDivs[stockDivs.length - 1];
    } else {
        moveTo = stockDivs[stock.id - 1]
    }

    stockBoard.removeChild(stock);
    stockBoard.insertBefore(moveTo, stockBoard.getElementsByClassName('stockBoardBottom')[0]);
}

function handleBoardNext() {
    const stockBoard = document.getElementsByClassName('stockBoard')[0];
    const stock = stockBoard.getElementsByClassName('stock')[0];
    var moveTo;

    if(stock.id == (stockDivs.length - 1)) {
        moveTo = stockDivs[0];
    } else {
        moveTo = stockDivs[parseInt(stock.id) + 1];
    }

    stockBoard.removeChild(stock);
    stockBoard.insertBefore(moveTo, stockBoard.getElementsByClassName('stockBoardBottom')[0]);
}

showTime();
fetchData();
