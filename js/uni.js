function addComma(plainPriceText) {
    if(parseInt(plainPriceText) < 1000) {
        return plainPriceText
    }

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

function calcPM(now,bought) {
    var percent = (now / bought) * 1000;
    var PM = Math.round((percent - 1000) / 10);
    return PM
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