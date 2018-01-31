#! /usr/local/bin/php5
<?php
include_once "global.inc.php";
include_once "gallery.inc.php";
// Create array with html
$galleryHTML = gatherGalleryHTML("doc");
?>

<!--<script type="text/javascript" src="js/libs/jquery.easing.1.3.js"></script>
<script type="text/javascript" src="packages/fancybox-2.0.6/jquery.fancybox.pack.js"></script>-->
<link href="packages/adipoli/adipoli.css" rel="stylesheet" type="text/css"/>
<link rel="stylesheet" type="text/css" href="packages/fancybox-2.0.6/jquery.fancybox.css" media="screen" />
<script type="text/javascript" src="js/libs/jquery.quicksand.js"></script>
<!--<script type="text/javascript" src="packages/adipoli/jquery.adipoli.min.js" ></script>-->
<script>
  var gallery = "doc";
</script>
<script type="text/javascript" src="js/gallery.js" ></script>

  <div class="inner-border-left"></div>
  <div class="inner-border-right"></div>
  <div class="topPadding">&nbsp;</div>

  <div id="docGallery">

  <div id="filter-wrapper"><a href="#"><span class="close"></span></a>
    <div id="filter-title"><h1>Documents</h1></div>
    <form id="filter">
      <ul class="splitter">
        <div id="filter-list_wrapper">
        <li>
          <ul>
              <li class="segment-1 selected-1">
                <a href="#" data-value="all">
                  <div class="filter-list filter-border filter-active"><h5>All</h5> </div>
                </a>
              </li>
              <li class="segment-2">
                <a href="#" data-value="1">
                  <div class="filter-list filter-border"><h5>Bolougne to Rhine</h5><h6>Aug. 27–Sept. 26</h6></div>
                </a>
              </li>
              <li class="segment-3">
                <a href="#" data-value="2">
                  <div class="filter-list filter-border"><h5>The Danube</h5><h6>Sept. 27–Oct. 6</h6></div>
                </a>
              </li>
              <li class="segment-4">
                <a href="#" data-value="3">
                  <div class="filter-list filter-border"><h5>Ulm</h5><h6>Oct. 7–20</h6></div>
                </a>
              </li>
              <li class="segment-5">
                <a href="#" data-value="4">
                  <div class="filter-list filter-border"><h5>Ulm to Vienna</h5><h6>Oct. 21–Nov. 11</h6></div>
                </a>
              </li>
              <li class="segment-6">
                <a href="#" data-value="5">
                  <div class="filter-list filter-border"><h5>On to Moravia</h5><h6>Nov. 12–29</h6></div>
                </a>
              </li>
              <li class="segment-7">
                <a href="#" data-value="6">
                  <div class="filter-list"><h5>Austerlitz</h5><h6>Nov. 30–Dec. 3</h6></div>
                </a>
              </li>
         </ul>
        </li>
        </div>

        <div id="filter-sort">
        <li>
          <ul>
            <li><div class="filter-sort_list">Sort by:</div></li>
            <li class="segment-1 selected-1">
              <a href="#" data-value="date">
                  <div class="filter-sort_list filter-sort_list-item filter-border filter-active">Date</div>
                </a>
            </li>
            <li class="segment-2">
              <a href="#" data-value="name">
                <div class="filter-sort_list filter-sort_list-item">Title</div>
              </a>
            </li>
          </ul>
        </li>
        </div>
      </ul>
    </form>


  </div><!-- filter-wrapper -->

  <!--div style="margin-top: 100px; text-align: center; font-size: 18px;"> Coming Soon </div -->

  <div id="galleryStyle">
    <ul id="list" class="doc-grid" >
      <?php echo $galleryHTML["items"]; ?>
    </ul>
  </div>
  <div style="display:none">
    <div id="contentBox">
    <!-- Content for expanded inividual document view -->
      <?php echo $galleryHTML["details"]; ?>
    </div>
  </div>
</div>
