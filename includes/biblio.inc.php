#! /usr/local/bin/php5
<?php
include_once "global.inc.php";

$content = fileGetAdmin('/pagecontent/bib');

?>

<div class="inner-border-left"></div>
<div class="inner-border-right"></div>
<div class="topPadding">&nbsp;</div>

<div id="filter-wrapper"><a href="#"><span class="close"></span></a>
<div id="filter-title"><h1>Bibliography</h1></div>

<div id="bibliography-content">

<?php
  echo $content;

?>
</div>

</div>
