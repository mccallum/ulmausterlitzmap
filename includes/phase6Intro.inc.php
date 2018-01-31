<?php
include_once "global.inc.php";

  $content14 = fileGetAdmin('/pagecontent/phase6_1');
  $content15 = fileGetAdmin('/pagecontent/phase6_2');

 if( !isset($contentOnly) ) { ?>
<div class="inner-border-left"></div>
<div class="inner-border-right"></div>
<div id="filter-wrapper"><a href="#" class='introClose' data-ref='phase1Intro'><span class="close"></span></a></div>
<?php } ?>

<div id="slide14"  class="introSlide">

  <?php echo $content14; ?>

  <div class="intro-buttons">
    <input type="button" id="btnSlide12" data-ref="slide14" value="Next" class="nextSlide">
  </div>
</div><!-- End slide14 -->

<div id="slide15"  style="display:none">

  <?php echo $content15; ?>

  <div class="intro-buttons">
    <input type="button" data-ref="slide15" value="Previous" class="prevSlide">
    <input type="button" id="continueBtn" value="Continue to Map">
  </div>

</div><!-- End slide15 -->
