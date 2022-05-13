<?php
    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: *");
    require './lib/Snoopy.class.php';

    $snoopy = new Snoopy;
    $snoopy->fetch('https://polling.finance.naver.com/api/realtime?query=SERVICE_ITEM:293490');

    $pricesOne = explode("nv\":",$snoopy->results);
    $prices = explode(",", $pricesOne[1]);

    echo "{\"price\": \"" . $prices[0] . "\"}";
?>