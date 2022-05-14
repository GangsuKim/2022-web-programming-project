<?php
    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: *");
    require './lib/Snoopy.class.php';

    $snoopy = new Snoopy;
    $snoopy->fetch('https://pala.world/square/project/a9f07b1260BB9EEBcbABA66700b00Fe08B61e1E6?filter_data=%7B%22groupData%22%3A%5B%7B%22group%22%3A%22Rare%22%2C%22attributes%22%3A%5B%22Normal%22%5D%7D%5D%7D');

    // $prices = explode("localDate\"",$snoopy->results);
    echo $snoopy->results;
?>