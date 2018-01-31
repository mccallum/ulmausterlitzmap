#! /usr/local/bin/php5
<?php

function gatherGalleryHTML($type){
  include_once "global.inc.php";

  $phaseDates = json_decode(file_get_contents(dirname(__FILE__) .'/json_phaseDates.inc.php'), true);
  //$data = json_decode( file_get_contents( dirname(__FILE__) .'/json_data.inc.php'), true );
  $data = json_decode(fileGetAdmin('/data/json'),true);
  //echo getcwd();
  //$path = dirname(__FILE__) . '/json_phaseDates.inc.php' . '<br />';

  // echo "<pre>";
  // var_dump($data);
  // echo "</pre>";
  // echo "<hr />";

  // Grab all the Phases in phaseDates and iterate over them
  foreach ($phaseDates as $index => $value) {
    //identify a specific date
    foreach ($value as $dateIndex => $dateValue) {
      // echo $dateValue . "<br />";
      //if( array_key_exists($dateValue, $data) ) echo "Not Empty: " . $dateValue  . "<br />";
      //else echo "Empty: " . $dateValue . "<br />";
      // Determine if data exists
      if( array_key_exists($dateValue, $data) ){
        $date = formatDate($dateValue);
        //echo $date;
        foreach ($data[$dateValue] as $dataIndex => $dataValue) {
          if( $dataValue["type"] == $type) {
            //create html for the gallery item
            $galleryHTML["items"] .= '<li data-id="' . $dataIndex . '" data-value="' . $index . '" class="filterElement"><a href="#expand-' . $dataIndex . '" class="fancy"><img  class="image1" src="'. $dataValue["tnImgURL"] .'" alt="" /><div class="desc"><p class="imgTitle">'. $dataValue["title"] .'</p><p data-type="date" data-value="' . $dateValue . '">' . $date .'</p></a></div></li>';
            //create html for the document view
            if( $type === "doc" ) $galleryHTML["details"] .= '<div id="expand-' . $dataIndex . '" class="popDoc"><div class="popInner"><h1>'. $dataValue["title"] .'</h1><h2>'. $date .'</h2><div id="popScroll"><div class="popText"><p>'. $dataValue["docTrans"] .'</p></div><img id="largeImage" src="'. $dataValue["imgURL"] .'" alt="'. $dataValue["title"] .'" class="largeImage" /> </div></div></div>';
            else if( $type === "img" ) $galleryHTML["details"] .= '<div id="expand-' . $dataIndex . '" class="popImage"><div class="popInner"><img id="largeImage" src="'. $dataValue["imgURL"] .'" alt="'. $dataValue["title"] .'" /> <div id="popText"><h1>'. $dataValue["title"] .'</h1><h2>'. $date .'</h2><p>'. $dataValue["imgDesc"] .'</p></div></div></div>';
          }
        }
      }
    }
  }

  // Return HTML Array
  return $galleryHTML;

}

?>
