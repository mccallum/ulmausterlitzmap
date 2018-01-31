#! /usr/local/bin/php5
<?php
include_once "global.inc.php";

$content = fileGetAdmin('/pagecontent/intro_1');

if( !isset($contentOnly) ) { ?>
<div class="inner-border-left"></div>
<div class="inner-border-right"></div>
<div id="filter-wrapper"><a href="#" class='introClose' data-ref='intro'><span class="close"></span></a></div>
<?php } ?>
<div id="slide1">
<!--
  <h1>Welcome to the Animated Map of Napoleon's 1805 Ulm to Austerlitz Campaign</h1>
  <p>The 1805 German Campaign Map is an interactive map designed to illustrate the operational realities of warfare in the Napoleonic era. The map charts the movement of the larger French, Austrian, and Russian units on a daily basis and contains a wealth of images, documents and other information relating to the campaign.</p>
  <p>A central aim of the project is to provide a visual representation of the problems entailed in moving large forces across substantial distances in this period. These problems raise a number of questions:</p>
  <ul>
    <li>How were such forces organized?</li>
    <li>How did they travel?</li>
    <li>How were they supplied?</li>
    <li>How did they coordinate their movements?</li>
    <li>And how did they maintain their organizational cohesion while on the move?</li>
  </ul>
  <p>In addition, the project seeks to help users understand the connection between military operations and larger strategic objectives. The 1805 campaign was typical in that little that happened was actually planned in advance. When hostilities began in September, nobody could have predicted that the campaign would end with a final battle in December, let alone that this battle would be contested at a place called Austerlitz. How did commanders and their subordinates understand the situation they faced and how did they respond to it? The hope is that by allowing the viewer to watch the campaign unfold on a day-to-day basis, the maps will be able to give a sense of what things looked like to those with the power to make and implement decisions regarding the course of events but who naturally remained ignorant of where their decisions would lead.</p>
  -->
  <?php echo $content; ?>

  <div class="intro-buttons-left">
    <input type="button" id="btnSkipIntro" data-ref="skip" value="Skip Intro">
    <input type="button" data-ref="slide1" value="Next" class="nextSlide">
  </div>
</div><!-- End slide1 -->
<div id="slide2" style="display:none">
  <h1>How to Navigate the Site (1 of 2)</h1>
  <div class="instructions">
    <div id="instructionsimage1"></div><!--img src="images/ui_instructions1.jpg"-->
    <div class="text1">
      <div class="arrow-right"></div>
      <h3>Troop Data and Events</h3>
      <p>French, Austrian and other troop movements are marked by lines and arrowheads. Towns or villages where troops rest are labeled and marked with a circle. Click on battle, image, information and document icons to explore the times further.<br> <div id="instructionsIcons"><img src="images/ui_battleicon.png" width="25" height="25"> Battle<img src="images/ui_docicon.png" width="25" height="25"> Document <img src="images/ui_facticon.png" width="25" height="25"> Information <img src="images/ui_picicon.png" width="25" height="25"> Image</div></p>
    </div>
    <div class="text2">
      <div class="arrow-right" style="float: right;"></div>
      <h3>Site Navigation</h3>
      <p>The map and its timeline are the purpose of this site. Use Documents and Images to see the media that is spread across the map gathered in two galleries. Read the story of the marches across Europe under the Narrative tab. Further reference materials are under Bibliography and information about this site is under About.</p>
    </div>
    <div class="text3">
      <div class="arrow-right"></div>
      <h3>Zoom, Map Options and Key</h3>
      <p>Use the Zoom button to get closer to the action. You can expand and collapse the Map Options and Key menus by clicking on the arrows or title. Under Map Options, each map contains additional layers that show political boundaries, road systems or alternate views of the campaigns. The key explains the symbols seen on the map.</p>
    </div>
  </div>
  <div class="intro-buttons-left">
    <input type="button" data-ref="slide2" value="Previous" class="prevSlide">
    <input type="button" data-ref="slide2" value="Next" class="nextSlide">
  </div>
</div><!-- End slide2 -->
<div id="slide3" style="display:none">
    <h1>How to Navigate the Site (2 of 2)</h1>
  <div class="instructions">
    <div id="instructionsimage2"></div><!--img src="images/ui_instructions2.jpg"-->
    <div class="text4">
      <div class="arrow-right"></div>
      <h3>Navigating the Full Timeline</h3>
      <p>Move between phases of the campaign at the bottom of the timeline. Days with battles or other information are highlighted in orange.</p>
    </div>
    <div class="text5">
      <div class="arrow-right"></div>
      <h3>Viewing Maps within a Timeline Phase</h3>
      <p>Within each phase, move between days by clicking a specific date or dragging the horizontal scroll bar to move across days and manually animate the map.</p>
    </div>
    <div class="text6">
      <h3>Playing &amp; Pausing the Map</h3>
      <p>Use the "Play/Pause" toggle button to control the progress of the map.</p>
      <div class="arrow-down"></div>
    </div>
    <div class="text7">
      <h3>Opening &amp; Closing the Timeline</h3>
      <p>Click the "Timeline" arrow or link at the bottom of the map to open and close the full timeline.</p>
      <div class="arrow-down" style="margin-left: 100px;"></div>
    </div>
  </div>
  <div class="intro-buttons-left">
    <input type="button" data-ref="slide3" value="Previous" class="prevSlide">

<?php
  // Show correct button based on overview query string parameter
  if( !isset($_GET['overview']) && $_GET['overview'] !== 'only' ) { ?>
    <input type="button" data-ref="slide3" value="Next" class="nextSlide">
<?php } else { ?>
    <input type="button" id="continueBtn" value="Continue to Map">
<?php } ?>

  </div>
</div><!-- End slide3 -->
<?php
  $contentOnly = true;
  // Show Phase 1 Intro except if query string param of overview=only is present
  if( !isset($_GET['overview']) && $_GET['overview'] !== 'only' ) {
    include 'phase1Intro.inc.php';

    // Hide until button click reveals content
    echo "<script>$('#slide4').hide()</script>";

  }

?>
<!--
<div id="slide4" style="display:none">
  <h1>Boulogne to Rhine Synopsis</h1>
  <img src="images/intro1.jpg" width="360" height="228">
  <p>When France and Great Britain signed the Treaty of Amiens in 1802 Europe was at peace for the first time in a decade. Relations between these two states deteriorated quickly, however, as a result of the aggressive policies of Napoleon Bonaparte, now ruler of France. Napoleon strengthened French control of the Batavian and Helvetic Republics (Holland and Switzerland); took steps to extend French control of northern Italy; oversaw the dismantling of the Holy Roman Empire (Germany) to the benefit of French clients in western Germany; continued to discriminate against British trade; began building a navy; and sought to establish a French presence in the eastern Mediterranean. In May 1803, less than fourteen months after the Treaty of Amiens had been signed, Great Britain declared war on France, beginning what would become the War of the Third Coalition.</p>
  <p>To begin with neither country had any means of attacking the other directly. Great Britain primarily targeted French shipping, while Napoleon occupied Hanover and began preparations for an invasion of Britain from a military camp established at the French port at Boulogne. Further French provocations served to transform a Franco-British war into a European conflict. In 1804 Napoleon shocked Europe with the extra-territorial arrest and execution of the Duc d’Enghien on trumped up charges of conspiracy. A couple of months later Napoleon announced that France was now a hereditary empire and on December 2, 1804, he crowned himself emperor. The following spring he crowned himself King of Italy, annexed Genoa, Parma and Piacenza, transferred Lucca to his younger sister Elise, and partially occupied the kingdom of Naples.</p>
  <p>These actions finally brought Russia, Sweden and Austria into an alliance with Britain. In early August 1805 Austria formally joined the Third Coalition and a month later Austrian forces crossed the Bavarian border. Napoleon now turned his attention to Austria. &ldquo;I am marching on Vienna,&rdquo; Napoleon wrote to his foreign minister Talleyrand on August 23. Two days later, his army had orders to prepare for a fall campaign in Germany. As Napoleon wrote to his chief of staff, "The decisive moment has arrived."</p>
  <p>For the quotations, see letters 10645 (Talleyrand, 23 aout) and 10658 (Berthier, 25 aout), in Napol&#233;on, Correspondance g&#233;n&#233;rale, vol. 5, 607 and 618.</p>
  <div class="intro-buttons-left">
    <input type="button" data-ref="slide4" value="Previous" class="prevSlide">
    <input type="button" id="continueBtn" data-ref="slide4" value="Go to Map">
  </div>
-->
<!--/div><!-- End slide4 -->
