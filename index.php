#! /usr/local/bin/php5
<?php

header('X-UA-Compatible: IE=edge');
include_once "includes/vars.php";
include_once "includes/global.inc.php";

function loadJSON(){
  global $datasource;
  // Get JSON Data
  $phaseDates = file_get_contents(getcwd().'/includes/json_phaseDates.inc.php');
  $phasesSliderBox = file_get_contents(getcwd().'/includes/json_phaseSliderBox.inc.php');
  $mapType = file_get_contents(getcwd().'/includes/json_mapType.inc.php');
  //$data = file_get_contents(getcwd().'/includes/json_data.inc.php');
  
  $data = fileGetAdmin('/data/json');
  $phaseLabels = file_get_contents(getcwd().'/includes/json_phaseLabels.inc.php');

  // Run Function to parse JSON
  include getcwd() . '/includes/json_mapPages.inc.php';
  // Creates an array w/ formatting in json & associative array
  $mapPages = init_mapPages();
  $mapPagesJSON = $mapPages["json"];

  // Echo out js script
echo <<<JSON
<script>
  var phaseDates = $phaseDates;
  var phaseSliderBox = $phasesSliderBox;
  var mapType = $mapType;
  var mapPages = $mapPagesJSON;
  var data = $data;
  var phaseLabels = $phaseLabels;
</script>
JSON;
}
?>
<!doctype html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
  <meta charset="utf-8">
  <!--[if IE]> <meta http-equiv="X-UA-Compatible" content="IE=edge">  <![endif]-->
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
  <meta name="apple-mobile-web-app-capable" content="yes">

  <title>Napoleon's 1805 Ulm-Austerlitz Campaign</title>
  <meta name="description" content="">
  <link rel="shortcut icon" type="image/x-icon" href="favicon.ico">

  <!-- Initial CSS to load -->
  <link href='http://fonts.googleapis.com/css?family=Droid+Sans:400,700' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="css/print.css" type="text/css" media="print">
    <!-- Minify and Combine CSS -->
  <link rel="stylesheet" href="min/?f=packages/OpenLayers-2.12/style.css,packages/OpenLayers-2.12/style.mobile.css,packages/jquery-ui-1.8.20.custom/css/smoothness/jquery-ui-1.8.20.custom.css,packages/fancybox-2.1/jquery.fancybox.css,css/main.css" type="text/css">




  <!--
  <link rel="stylesheet" href="packages/OpenLayers-2.12/style.css" type="text/css">
  <link rel="stylesheet" href="packages/OpenLayers-2.12/style.mobile.css" type="text/css" />
  <link type="text/css" href="packages/jquery-ui-1.8.20.custom/css/smoothness/jquery-ui-1.8.20.custom.css" rel="Stylesheet" />  
  <link rel="stylesheet" type="text/css" href="packages/fancybox-2.0.6/jquery.fancybox.css?v=2.0.6" media="screen" />
  <link rel="stylesheet" type="text/css" href="packages/fancybox-2.0.6/helpers/jquery.fancybox-buttons.css?v=1.0.2" />
  <link rel="stylesheet" href="css/main.css">
  -->

  <!-- Initial JS to load -->
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
  <script>window.jQuery || document.write('<script src="js/libs/jquery-1.7.1.min.js"><\/script>')</script>
  <script src="packages/OpenLayers-2.12/OpenLayers.js"></script>
  <!-- <script type="text/javascript" src="packages/OpenLayers-2.12/mobile-navigation.js"></script>-->
</head>

<body>
  <div id="mobilemessage"><p>The interactive map of Napoleon's 1805 Ulm-Austerlitz Campaign requires a screen the size of a tablet or larger.</p></div>
  <div id="coverWrapper">

    <div id="mapCover">&nbsp;</div>
    <!--div id="mapLabel"></div-->
  </div><!-- end coverWrapper -->

	<div id="wrapper">
  <!--[if lt IE 7]><p class=chromeframe>Your browser is <em>not compliant with this site!</em> Please upgrade to a different browser.<![endif]-->

	  <div id="wrap"> <!-- allows sticky footer --> 
	
      <?php include_once 'includes/header.inc.php'; ?>
      <?php include_once 'includes/header_tabs.inc.php'; ?>
    	
  		<div id="main" role="main" class="clearfix">
  			<div id="europe" class="mapWrapper"></div>
  			<div id="french" class="mapWrapper"></div>
  			<div id="theater" class="mapWrapper"></div>
  			<div id="ulm" class="mapWrapper"></div>
  			<div id="vienna" class="mapWrapper"></div>
        <div id="moravia" class="mapWrapper"></div>
  			<div id="auster" class="mapWrapper"></div>
  		</div>

    </div><!-- end wrap -->
    
    <div id="overlayContent"></div>

    <?php include_once 'includes/footer.inc.php'; ?>

	</div><!-- end wrapper -->
	
  <!-- Load php variable JSON into JS -->
  <?php loadJSON(); ?>

  <!-- Combine and minify JS Global Libraries -->
  <!--script src="min/?b=js&amp;f=global.js,map.js,intro.js,header.js,footer.js"></script-->
  <!-- -->
  <script src="js/global.js"></script>
  <script src="js/map.js"></script>
  <script src="js/intro.js"></script>
  <script src="js/header.js"></script>
  <script src="js/footer.js"></script>
 <!-- -->
  
  <!-- Combine and minify JS Ancillary Libraries -->
  <script src="min/?f=packages/jquery-ui-1.8.20.custom/js/jquery-ui-1.8.20.custom.min.js,js/libs/jquery.ui.touch-punch.min.js,packages/fancybox-2.1/jquery.fancybox.pack.js,packages/fancybox-2.1/helpers/jquery.fancybox-buttons.js,js/libs/jquery.cookie.js"></script>
	<!-- 
	<script type="text/javascript" src="packages/jquery-ui-1.8.20.custom/js/jquery-ui-1.8.20.custom.min.js"></script>
  <script type="text/javascript" src="js/libs/jquery.ui.touch-punch.min.js"></script>
  <script type="text/javascript" src="packages/fancybox-2.0.6/jquery.fancybox.pack.js?v=2.0.6"></script>
  <script type="text/javascript" src="packages/fancybox-2.0.6/helpers/jquery.fancybox-buttons.js?v=1.0.2"></script>
  <script type="text/javascript" src="js/libs/jquery.cookie.js"></script>
  -->

  <!-- Google Analytics -->
  <!-- <script src="js/google_analytics.js"></script> -->

</body>
</html>
