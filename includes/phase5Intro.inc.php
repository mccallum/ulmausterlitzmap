<?php
include_once "global.inc.php";

  $content12 = fileGetAdmin('/pagecontent/phase5_1');
  $content13 = fileGetAdmin('/pagecontent/phase5_2');

 if( !isset($contentOnly) ) { ?>
<div class="inner-border-left"></div>
<div class="inner-border-right"></div>
<div id="filter-wrapper"><a href="#" class='introClose' data-ref='phase1Intro'><span class="close"></span></a></div>
<?php } ?>

<div id="slide12"  class="introSlide">

  <?php echo $content12; ?>

  <div class="intro-buttons">
    <input type="button" id="btnSlide12" data-ref="slide12" value="Next" class="nextSlide">
  </div>
</div><!-- End slide12 -->

<div id="slide13"  style="display:none">

  <?php echo $content13; ?>

  <div class="intro-buttons">
    <input type="button" data-ref="slide13" value="Previous" class="prevSlide">
    <input type="button" id="continueBtn" value="Continue to Map">
  </div>

</div><!-- End slide13 -->
