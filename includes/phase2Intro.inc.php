<?php
include_once "global.inc.php";

  $content6 = fileGetAdmin('/pagecontent/phase2_1');
  $content7 = fileGetAdmin('/pagecontent/phase2_2');

 if( !isset($contentOnly) ) { ?>
<div class="inner-border-left"></div>
<div class="inner-border-right"></div>
<div id="filter-wrapper"><a href="#" class='introClose' data-ref='phase1Intro'><span class="close"></span></a></div>
<?php } ?>

<div id="slide6" class="introSlide">

  <?php echo $content6; ?>

  <div class="intro-buttons">
    <input type="button" id="btnSlide6" data-ref="slide6" value="Next" class="nextSlide">
  </div>
</div><!-- End slide1 -->

<div id="slide7" class="introSlide" style="display:none">

  <?php echo $content7; ?>

  <div class="intro-buttons">
    <input type="button" data-ref="slide7" value="Previous" class="prevSlide">
    <input type="button" id="continueBtn" value="Continue to Map">
  </div>

</div><!-- End slide2 -->
