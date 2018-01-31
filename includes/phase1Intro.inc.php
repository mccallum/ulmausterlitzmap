<?php
include_once "global.inc.php";

  $content4 = fileGetAdmin('/pagecontent/phase1_1');
  $content5 = fileGetAdmin('/pagecontent/phase1_2');

 if( !isset($contentOnly) ) { ?>
<div class="inner-border-left"></div>
<div class="inner-border-right"></div>
<div id="filter-wrapper"><a href="#" class='introClose' data-ref='phase1Intro'><span class="close"></span></a></div>
<?php } ?>

<div id="slide4" class="introSlide">

  <?php echo $content4; ?>

  <div class="intro-buttons">
    <input type="button" id="btnSlide1" data-ref="slide4" value="Next" class="nextSlide">
  </div>
</div><!-- End slide1 -->

<div id="slide5" class="introSlide" style="display:none">

  <?php echo $content5; ?>

  <div class="intro-buttons">
    <input type="button" data-ref="slide5" value="Previous" class="prevSlide">
    <input type="button" id="continueBtn" value="Continue to Map">
  </div>

</div><!-- End slide2 -->
