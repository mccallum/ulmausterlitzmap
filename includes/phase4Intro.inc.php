<?php
include_once "global.inc.php";

  $content10 = fileGetAdmin('pagecontent/phase4_1');
  $content11 = fileGetAdmin('/pagecontent/phase4_2');

 if( !isset($contentOnly) ) { ?>
<div class="inner-border-left"></div>
<div class="inner-border-right"></div>
<div id="filter-wrapper"><a href="#" class='introClose' data-ref='phase1Intro'><span class="close"></span></a></div>
<?php } ?>

<div id="slide10"  class="introSlide">

  <?php echo $content10; ?>

  <div class="intro-buttons">
    <input type="button" id="btnSlide10" data-ref="slide10" value="Next" class="nextSlide">
  </div>
</div><!-- End slide1 -->

<div id="slide11" class="introSlide"  style="display:none">

  <?php echo $content11; ?>

  <div class="intro-buttons">
    <input type="button" data-ref="slide11" value="Previous" class="prevSlide">
    <input type="button" id="continueBtn" value="Continue to Map">
  </div>

</div><!-- End slide2 -->
