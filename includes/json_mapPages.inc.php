<?php
//echo $mapPages["json"];
function init_mapPages($base = "root"){
  // Get JSON Data
  if( $base === "root" ) $json = file_get_contents(getcwd()."/includes/json_phaseDates.inc.php");
  else if( $base === "includes") $json = file_get_contents(getcwd()."/json_phaseDates.inc.php");
  // Turn Data into Associative Array
  $data = json_decode($json, true);
  //echo $json;
  // print_r($data);
  foreach($data as $key => $daysArr){
    // echo "<hr />";
    // print_r($daysArr);
    // echo "<hr/>";
    $i = 0;
    foreach($daysArr as $subkey => $date){
      $i++;
      // echo $date . "<br />";
      $mapPagesArr[$date]["phase"] = $key;
      if( $i == count($daysArr)) $mapPagesArr[$date]["lastMove"] = true;
    }
  }

  // Turn array back into json
  $mapPages = json_encode($mapPagesArr);

  // Output for Returned w/ both formats json & array
  $output["json"] = $mapPages;
  $output["array"] = $mapPagesArr;

  // echo "<pre>";
  // echo $mapPages;
  // echo $mapPagesArr;
  // echo "</pre>";

  // echo "<pre>";
  // print_r($mapPagesArr);
  // echo "</pre>";
  return $output;
}
?>
