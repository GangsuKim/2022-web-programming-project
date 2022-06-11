<?php
    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: *");
    require './lib/Snoopy.class.php';

    $snoopy = new Snoopy;
    $snoopy->fetch('https://api.stock.naver.com/chart/foreign/item/META.O?periodType=dayCandle&stockExchangeType=NASDAQ');

    $prices = explode("localDate\"",$snoopy->results);
    $lastDayPriceOne = explode("closePrice\":",$prices[count($prices) - 1]);
    $lastDayPrice = explode(",\"",$lastDayPriceOne[1]);
    echo "{\"price\": \"" . $lastDayPrice[0] . "\"}";
?>