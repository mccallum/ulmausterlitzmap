/**
 * Places Google Analytics onto a webpage.
 *
 * Track visitors to any website, with customizable reports
 * How-to:
 *   Replace UA-XXXXX-X with the site's Google Anayltics API code.
 *   Include this .js file on the webpage that you want to track
 *   (common use is top down, i.e index.html).
 *
 * @link http://www.google.com/analytics/
 */
    var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
    (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
    g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
    s.parentNode.insertBefore(g,s)}(document,'script'));