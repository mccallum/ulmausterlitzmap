<?php
include_once 'vars.php';

function formatDate($unFormatDate){
  $months = array(
    "8" => "August",
    "9" => "September",
    "10" => "October",
    "11" => "November",
    "12" => "December"
  );
  $date = explode("_", $unFormatDate);
  $monthNum = $date[0];
  $month = $months[$monthNum];
  $day = $date[1];

  return $month . " " . $day . ", 1805";
}

function fileGetAdmin($url){
  global $datasource;
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_RETURNTRANSFER,true);
  curl_setopt($ch, CURLOPT_URL, $datasource . $url);
  $fileContents = curl_exec($ch);
  curl_close($ch);

  return $fileContents;
}
?>
