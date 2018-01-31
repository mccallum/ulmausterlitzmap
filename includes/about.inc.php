#! /usr/local/bin/php5
<?php
include_once "global.inc.php";

$content = fileGetAdmin('/pagecontent/about');

?>

<div class="inner-border-left"></div>
<div class="inner-border-right"></div>
<div class="topPadding">&nbsp;</div>

<div id="filter-wrapper"><a href="#"><span class="close"></span></a>
<div id="filter-title"><h1>About</h1></div>
<div id="about-content">
<!--
<p>This project began with the idea of developing an interactive map that I could use in a class I teach every fall at the University of Oregon, HIST 240, War in the Modern World I. I pitched the idea to the folks at the <a href="http://library.uoregon.edu/cmet/web.html" target="_blank">UO Libraries' Interactive Media Group</a> and they were kind enough to agree to provide technical support for the project. Like most projects, this one has taken on a life of its own and it could not have come as far as it has without the help of many people. First and foremost, the Interactive Media Group team including David McCallum (Design Lead), Will Myers (Technical Lead), Jon Bellona, Joseph DePauw, Trevor Till, Azle Malinao-Alvarez and Kirstin Hierholzer (Director). Interactive Media enlisted a graduate student in the Department of Geography, Josef Gordon, to build the maps, a task of much greater technical complexity than I could have ever imagined. They have done all of the work on the design and technical implementation of this project and it could not have gotten anywhere without their vital participation.</p>

<p>I have also enjoyed the assistance of several undergraduate researchers. Peter Gilson Hodel compiled some of the first data for the project. Jessica Jones and Ryan Perkins worked on some of the Russian language material: where Russian language sources have been employed, they were the ones who did the work. Noelle Jones helped locate some of the visual materials.</p>
<p>Finally, I have benefitted from the advice of several colleagues, most notably Professor David Leubke, who has shared his deep knowledge of the Holy Roman Empire with me, and Professor Julie Hessler, who was kind enough to edit some of my rough drafts. All errors remain my own responsibility: I have compiled much of the data, I have written all the texts, and have made all decisions regarding the historical content.</p>

<p>Alex Dracobly<br>
Senior Instructor<br>
<a href="http://history.uoregon.edu" target="_blank">Department of History</a><br>
<a href="http://www.uoregon.edu" target="_blank">University of Oregon</a>
</p>
-->
<?php
  echo $content;

?>
</div>
</div>
