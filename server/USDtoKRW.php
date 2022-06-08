<?php
    // header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: *");
    header("Content-Type:application/json; charset=EUC-KR");
    require './lib/Snoopy.class.php';

    $snoopy = new Snoopy;
    $snoopy->fetch('http://fx.kebhana.com/FER1101M.web');

    $priceOne = explode("\":\"",$snoopy->results);
    $priceOne = explode("\"",$priceOne[5]);
    echo "{\"price\": \"" . $priceOne[0] . "\"}";
?>