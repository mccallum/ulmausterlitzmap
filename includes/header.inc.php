<?php
/**
* Header includes (the header navigation bar)
*
* @version  1.0
* @author   Jon Bellona <jpbellona@yahoo.com>
*/

$mapOptions_iconSize = 25;

?>
<div id="header_wrapper">

	<div id="header" class="shadow">

		<a id="logo_link" href="#"><div class="logo"></div></a>

		<div id="nav_wrapper">
			<ul>
				<!--li class="nav nav-map">Map <div class="nav-highlight"></div></li-->
				<li class="nav nav-images">Images <div class="nav-highlight"></div></li>
				<li class="nav nav-documents">Documents <div class="nav-highlight"></div></li>
				<li class="nav nav-narrative">Narrative <div class="nav-highlight"></div></li>
				<li class="nav nav-bibliography">Bibliography <div class="nav-highlight"></div></li>
				<li class="nav nav-about">About <div class="nav-highlight"></div></li>
			</ul>
		</div>

	</div><!-- end header -->

	<div id="map_options_wrapper">

    <div id="map_key" class="optionsOverlay">
      <div class="transBackground"></div>
      <div id="map_key_contents">
        <h4 class="optionsLabel">
          <div id="mk_triangle" class="triangle-down"></div>
          Key
        </h4>
        <ul class="map_key_items">
          <li class="napoleon"><canvas id="key_na_line" width="40" height="15"></canvas> Napoleon</li>
          <li class="french"><canvas id="key_fr_line" width="40" height="15"></canvas> French</li>
          <li class="austrian"><canvas id="key_as_line" width="40" height="15"></canvas> Austrian</li>
          <!--li class="russian"><canvas id="key_rs_line" width="40" height="15"></canvas> Russian</li-->
        </ul>
        <ul class="map_key_items">
          <li><canvas id="key_army" width="32" height="21"></canvas> Army</li>
          <li><canvas id="key_corps" width="32" height="21"></canvas> Corps</li>
          <li><canvas id="key_division" width="32" height="21"></canvas> Division</li>
          <li><canvas id="key_brigade" width="32" height="21"></canvas> Brigade</li>
          <li><canvas id="key_cavalry" width="32" height="21"></canvas> Cavalry</li>
        </ul>
        <ul class="map_key_items">
          <li><img class="key_left" src="images/ui_battleicon.png" width="<?php echo $mapOptions_iconSize; ?>" height="<?php echo $mapOptions_iconSize; ?>" /> Battle </li>
          <li><img class="key_left" src="images/ui_docicon.png" width="<?php echo $mapOptions_iconSize; ?>" height="<?php echo $mapOptions_iconSize; ?>" /> Document</li>
          <li><img class="key_left" src="images/ui_picicon.png" width="<?php echo $mapOptions_iconSize; ?>" height="<?php echo $mapOptions_iconSize; ?>" /> Image</li>
          <li><img class="key_left" src="images/ui_facticon.png" width="<?php echo $mapOptions_iconSize; ?>" height="<?php echo $mapOptions_iconSize; ?>" /> Information</li>
        </ul>
      </div>
    </div><!-- end map_key -->

    <div id="map_options" class="optionsOverlay">
      <div class="transBackground"></div>
      <div id="map_options_contents">
        <h4 class="optionsLabel">
          <div id="mo_triangle" class="triangle-right"></div>
          Map Options
        </h4>
  			<div id="map_options_bg" class="map_options_items"></div>
  			<div class="map_options_items">
          <div class='hdr_context'>
            <p>Context Map</p>
          </div>
          <hr/>
  				<div class='hdr_option1'></div>
          <!--<hr/>-->
          <h5>Layers</h5>
  				<div class='hdr_option2'></div>
        </div>
      </div><!-- end map_options_contents -->
		</div><!-- end map_key_wrapper -->

  </div><!-- map_options_wrapper -->

</div><!-- header_wrapper -->
