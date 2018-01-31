#! /usr/local/bin/php5
<?php

// Get Data
$path =  str_replace("includes", "", dirname(__FILE__));
$path = dirname(__FILE__);
$pathData = $path . "/json_data.inc.php";
//echo $path;
//echo file_get_contents($path);

include_once "global.inc.php";
include 'vars.php';
//$data = json_decode(file_get_contents($pathData), true);
$data = json_decode(fileGetAdmin('/data/json'),true);
//print_r($data);

//$pathDate = $path . "/json_mapPages.inc.php";
//$mapPages = json_decode(file_get_contents($pathDate), true);
include_once 'json_mapPages.inc.php';
$mapPagesArray = init_mapPages("includes");
$mapPages = $mapPagesArray["array"];

$docArray = array();
$factArray = array();

// Iterate through data
foreach($data as $k => $v){
  // echo $k . " - " . $v . "<br />";

  foreach($v as $evtKey => $evt){
    //echo $evtKey . " - " . $evt . "<br />";
    if( $evt["type"] == "doc") {
      //echo "Doc: " . $evtKey . "<br />";
      $docArray[$evtKey] = $evt;
      $docArray[$evtKey]["date"] = $k;
    }
     if( $evt["type"] == "fact") {
      //echo "Fact: " . $evtKey . "<br />";
      $factArray[$evtKey] = $evt;
      $factArray[$evtKey]["date"] = $k;
    }
  }
}

function displayFacts($dataArray, $mapPages){
  $allHtml = "";
  $lastPhase = 0;

  foreach($dataArray as $evtKey => $evt){
    // print_r($evt);
    // echo "<hr />";
    $currDate = $evt["date"];
    $currPhase = $mapPages[$currDate]["phase"];

    // Create Titles
    //$lastPhase = createTitle($currPhase, $lastPhase);

    // Turn Date into Formatted Date

    // Create HTML
    $html = "<h3>" .formatDate($currDate) . " - " . $evt["title"] . ":</h3> " . $evt["fact"];
    $html = "<div>" . $html . "</div><hr>";
    $allHtml = $allHtml . $html;
  }

  return $allHtml;
}

function displayDocs($dataArray, $mapPages){
  $allHtml = "";
  $lastPhase = 0;
  foreach($dataArray as $evtKey => $evt){
    $currDate = $evt["date"];
    $currPhase = $mapPages[$currDate]["phase"];

    // Create Titles
    //$lastPhase = createTitle($currPhase, $lastPhase);

    // Turn Date into Formatted Date

    // Create HTML
    $html = "<h3>" .formatDate($currDate) . " - " . $evt["title"] . ":</h3> " . $evt["desc"];
    $html = "<div>" . $html . "</div><hr>";
    $allHtml = $allHtml . $html;
  }

  return $allHtml;
}

function createTitle($currPhase, $lastPhase){
  // echo "current phase: " . $currPhase;
  // echo "last phase: " . $lastPhase . "<br />";
  if( $currPhase !== $lastPhase){
    switch ($currPhase){
      case (1):
        echo "<div>Aug. 27 - Sept. 25: Boulogne to Rhine</div>";
        $lastPhase = 1;
        break;
      case (2):
        echo "<div>Sept. 26 - Oct. 6: Rhine to Danube</div>";
        $lastPhase = 2;
        break;
      case (3):
        echo "<div>Oct. 7 - Oct. 20: Ulm</div>";
        $lastPhase = 3;
        break;
      case (4):
        echo "<div>Oct. 21 - Nov. 11: Ulm to Vienna</div>";
        $lastPhase = 4;
        break;
      case (5):
        echo "<div>Nov. 12 - Nov. 29: On to Moravia</div>";
        $lastPhase = 5;
        break;
      case (6):
        echo "<div>Nov. 30 - Dec. 3: Austerlitz</div>";
        $lastPhase = 6;
        break;
    }
  } else $lastPhase = $currPhase;
  return $lastPhase;
}

?>

<div class="inner-border-left"></div>
<div class="inner-border-right"></div>
<div class="topPadding">&nbsp;</div>

<div id="filter-wrapper"><a href="#"><span class="close"></span></a>
<div id="filter-title"><h1>Narrative</h1></div>

  <div id="filter-list_wrapper">
    <ul id="narrMenu">
      <li><a id="nar_intros_" href="#narrative-intros"><div class="filter-list filter-border filter-narrative filter-active"><h5>Introduction and Synopses</h5></div></a></li>
      <li><a id="nar_facts_" href="#narrative-facts"><div class="filter-list filter-narrative" style="width: 180px;"><h5>Event Information</h5><img src="images/ui_facticon.png"></div></a></li>
      <!--<li><a href="#narrative-docs"><div class="filter-list filter-narrative"><h5>Documents</h5></div></a></li>-->
    </ul>
  </div>
</div>

<div id="narrative-content">
  <div style="font-size:10px"><?php //print_r($factArray) ?></div>
  <div id="narrative-intros" class="narrative-display" >
    <p class="pTitle">
      <?php
        $contentOnly = true;
        include_once("intro.inc.php");
        include_once("phase2Intro.inc.php");
        include_once("phase3Intro.inc.php");
        include_once("phase4Intro.inc.php");
        include_once("phase5Intro.inc.php");
        include_once("phase6Intro.inc.php");
      ?>
    </p>
  </div>
  <div id="narrative-facts" class="narrative-display">
    <?php echo displayFacts($factArray, $mapPages); ?>
  </div>
  <div id="narrative-docs" class="narrative-display">
    <?php echo displayDocs($docArray, $mapPages); ?>
  </div>
</div>


<script>
(function($){
  $(function(){
    var lastClick = "narrative-intros";

    // Hide All
    $("#narrative-content .narrative-display").hide();
    $("#narrative-facts, #narrative-docs").hide();

    // Show and Hide For Content Divs
    $(document).on('click', '#narrMenu li a', function(e){
      //console.log('click');

      elemID = $(this).prop("href").split("#");
      if( elemID[1] !== lastClick ){
        $("#narrative-content .narrative-display").hide();
        $("#"+elemID[1]).fadeIn("slow");
        lastClick = elemID[1];
      }

      // Highlight Clicked Element
      filterHighlight($(this).find('.filter-list'), $('#narrMenu'));

      // Stop all other action
      e.preventDefault();

    });

    // Show all intros
    $('#narrative-content .introSlide').show();
    // Clear Inputs for Intros
    $('#narrative-content input').hide();
    // Hide Intro Instructions
    $('#slide2, #slide3').hide();

    // Show Default Content
    $('#narrative-intros').show();

    // // Route for existing hash
    // if( location.hash ) {
    //   // Determine all possible hashes and check against url hash
    //   $('#narrMenu li a').each(function(k, v){
    //     var elemHref = v.href.split("#")[1];
    //     var elemHash = "#" + elemHref;
    //     if( location.hash === elemHash){
    //       $("#narrative-content .narrative-display").not("[id='" + elemHref + "']").hide();
    //       $(location.hash).fadeIn();
    //       lastClick = location.hash;
    //     }else $("#" + lastClick).fadeIn();
    //   });
    // }
  });
})(jQuery);

</script>
