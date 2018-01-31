#! /usr/local/bin/php5
<?php
include_once "global.inc.php";

$content = fileGetAdmin('/pagecontent/end_1');
if( !isset($contentOnly) ) { ?>
<div class="inner-border-left"></div>
<div class="inner-border-right"></div>
<div id="filter-wrapper"><a href="#" class='introClose' data-ref='intro'><span class="close"></span></a></div>
<?php } ?>

<div id="slide1">


  <!--<h1>Summary</h1>
  <p>After the capitulation at Ulm Napoleon hesitated before sending his army in pursuit of the approaching Russian army. Realizing the danger the Russian General Kutusov withdrew toward the northwest, where another Russian army under General Buxh&#246;wden was approaching. The French failed, however, to prevent Kutusov’s retreat and they found themselves drawn farther and farther into Moravia. By late November Napoleon and his exhausted army were deep in enemy territory and substantially outnumbered by the Russian and Austrian armies. Napoleon was determined to give battle, however; the Austrian and Russian leadership were equally eager to destroy Napoleon’s outnumbered force; and on December 2, the anniversary of the date of Napoleon’s coronation as Emperor, Napoleon’s army inflicted a decisive defeat on the Austrian and Russian forces in the presence of their respective rulers, Francis and Alexander.</p>
  <p>The Battle of Austerlitz was Napoleon’s first major military victory in over five years and the first since he had been crowned emperor. The victory consolidated his political power in France. He also used the victory to expand French control over northern Italy and to reward his German allies. Venice was added to the Kingdom of Italy and Istria, Croatia and Dalmatia ceded to France. Swabia was given to W&#252;rttemburg, whose duke was now recognized as a king. Bavaria obtained the Tyrol, Vorarlberg, and other miscellaneous territories. The victory, however, was not sufficient to establish a general peace. The following year France would once again be at war as it would remain through rest of Napoleon’s reign.</p>

  -->
  <?php echo $content; ?>
  <input type="button" id="continueBtn" class="endIntro" value="Back to Map">
</div><!-- End slide1 -->
