<?php
include_once "global.inc.php";

  $content8 = fileGetAdmin('/pagecontent/phase3_1');
  $content9 = fileGetAdmin('/pagecontent/phase3_2');

 if( !isset($contentOnly) ) { ?>
<div class="inner-border-left"></div>
<div class="inner-border-right"></div>
<div id="filter-wrapper"><a href="#" class='introClose' data-ref='phase1Intro'><span class="close"></span></a></div>
<?php } ?>

<div id="slide8" class="introSlide">

  <?php echo $content8; ?>

  <div class="intro-buttons">
    <input type="button" id="btnSlide8" data-ref="slide8" value="Next" class="nextSlide">
  </div>
</div><!-- End slide1 -->

<div id="slide9" class="introSlide" style="display:none">

  <?php echo $content9; ?>

  <div class="intro-buttons">
    <input type="button" data-ref="slide9" value="Previous" class="prevSlide">
    <input type="button" id="continueBtn" value="Continue to Map">
  </div>

</div><!-- End slide2 -->
