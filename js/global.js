/**
* The Globla JS document
*
* @see https://uolibwebredesign.basecamphq.com/projects/2946037-work-not-directly-related-to-a-client-project/files
* @see "JS Style Guide.doc" for styling
* @author William Myers
* @author <myersw@example.com>
*/
var mapDimensions = {};

/**
* Init Load of Content Functionality
* 
*/
(function($){
  $(document).ready(function() {
    // load major contents
    initMap();
    initHeader();
    initFooter();
    initIntro();
    //alert('Break 1');
    $("#tl_controls .tl_ctrls_tl").click();

    // Redirects content based on hash
    route();

    // Redirect due to resize
    if( null !== $.cookie("skipToDate") ) {
      //console.log('skipDate');
      skipToDate = $.cookie("skipToDate");
      skipToMap = $.cookie("skipToMap");

      // Hide Cover
      setTimeout(function(){$('#mapCover').hide();}, 50);
           
      // Change Map to Specifc Day
      redirectToDay(skipToDate, skipToMap);

      // Clear Cookies
      $.cookie("skipToMap", null);
      $.cookie("skipToDate", null);
    }

    mapDimensions["height"] = $('#main').css("height");
    mapDimensions["width"] = $('#main').css("width");

    preloadIcons();
    //console.log(mapDimensions);

  }); //end document ready  

  // $('body').click(function(e){
  //   console.log(event.target);
  // })
})(jQuery);

// Reload window if resized to keep svg aligned with background.
var resizeTimeoutId;
window.onresize = function(event) {
  window.clearTimeout(resizeTimeoutId); 
  var currDimensions = {};
  currDimensions["height"] = $('#main').css("height");
  currDimensions["width"] = $('#main').css("width");  
  if( currDimensions["height"] != mapDimensions["height"] 
    || currDimensions["width"] != mapDimensions["width"])
    resizeTimeoutId = window.setTimeout('windowResize();', 300); 
}

// Reload Code sets cookies, stops animation, and refreshes page
function windowResize(){
  // Stop Animation
  stopAnimation();

  // Set Session Cookie of Date
  $.cookie("skipToDate", currentDay);
  $.cookie("skipToMap", visibleMap);

  // Reload Browser to adjust images
  location.reload();  
}

/**
* Creates environment for moving to a specific day
* 
* @param skipToDate (string of date to skip to)
* @param skipToMap (string of map to skip to)
*
*/
function redirectToDay(skipToDate, skipToMap){
  // Set Up Map
  displayDate( skipToDate );
  switchMap( skipToMap );

  // Change Active Map Link
  $('#map_options_contents .activeMap').removeClass('activeMap');
  $('#map_options_contents .mapLinks').each(function(){
    if( $(this).attr('data-ref') == skipToMap ) $(this).addClass('activeMap');
  });
 
  // Create Timeline
  var oldPhase = currentPhase-1;
  moveSliderBox(currentPhase);
  changeSliderBoxContent(currentPhase,oldPhase);

  // Move Slider Bar & Highlight
  var dateTlIndex = $('#panel .tl_sldr_box li').index($('#panel .' + skipToDate)) + 1;
  moveSliderBoxDay(dateTlIndex);

  /**
   * Shouldn't have to due the below functions because they are in displayDate() ???
   */
    // Create Event Icon on Map 
    createEvtMarkers( skipToMap );
    // Display Next Phase button if last troop movement
    if( mapPages[currentDay]["lastMove"] != undefined ) $('#playNext').show();
    else $('#playNext').hide();

  // Display Map Layer if in cookie
  if( $.cookie("visOptLayers") ) {
    var cookieLayers = $.cookie("visOptLayers");

    cookieLayers = cookieLayers.split(',');

    for (var i = cookieLayers.length - 1; i >= 0; i--) {
      var thisLayer = cookieLayers[i]
      $(function(){
        toggleLayerVis(thisLayer);
      });
    };
  }

}

/**
* Parses and Find Query Sting Options
* 
* @param strURI (string of url to be check for parameter)
* @param key (string of parameter key)
*
* @return parameter value
*/
function qs(strURI, key) {
  key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
  var match = strURI.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
  return match && decodeURIComponent(match[1]);
}

/**
* Format Date for Display
* 
* @param unFormatDate (string of date ex: 9_24)
*
* @return formatedDate (sting of date ex: Sept. 24)
*/
function formatDate(unFormatDate, style){
  if( style == undefined) {
    mths = {"8":"Aug.", "9":"Sept.", "10":"Oct.", "11":"Nov.", "12":"Dec."};
  }else if( style == 'long'){
    mths = {"8":"August", "9":"September", "10":"October", "11":"November", "12":"December"};    
  }

  // Convert date to readable string
  date = unFormatDate.split("_");
  day = date[1];
  month = mths[date[0]];

  formatedDate = month + " " + day;
  if( style == 'long') formatedDate = formatedDate + ", 1805";
  return formatedDate;
}

function route(){
   // Possible Available Hashes
  possibleHashes = ["images","documents","narrative","bibliography","about","narrative-intros","narrative-facts","narrative-docs"];
  //console.log(location.hash);
  // Route for existing hash
  if( location.hash ) {
    // Determine all possible hashes and check against url hash
    $.each(possibleHashes, function(index, value){
      if( location.hash == "#" + value) {
        openHeaderTab(value);
      }
    });
    // $('#narrMenu li a').each(function(k, v){
    //   var elemHref = v.href.split("#")[1];
    //   var elemHash = "#" + elemHref;
    //   if( location.hash === elemHash){
    //     $(".display").not("[id='" + elemHref + "']").hide();
    //     $(location.hash).show();
    //     lastClick = location.hash;
    //   }
    // });
  } 
}

// Change open cover div
if ("onhashchange" in window) {
  window.onhashchange = function () {
      value = location.hash.replace("#", "");
      openHeaderTab(value);
  }
}

function openHeaderTab(value){
  //loadHeader[value] = false;
  delayLoad = null;

  // Stop Animations
  stopAnimation();

  // Reroute for submenu of narrative page
  if( value.split("-")[0] === "narrative") value = "narrative";

  // Check to see if content is loaded

  if(loadHeader[value]){
    link = $('#cover2-wrapper .inner-' + value + ' a').prop('href');
    //console.log(link);
    //$('#cover2-wrapper .inner-' + value).load(link);
    $.ajax({
      url: link,
      success: function(data){
        //Stop Animation
        stopAnimation();
        $('#cover2-wrapper .inner-' + value).html(data);
        loadHeader[value] = false;
        resizeCover2(value);
      }
    })
    
  }

  // Close Overlay
  if( typeof($.fancybox) == 'function' && $.fancybox) $.fancybox.close();


  // Delay load until other scripts have run
  delayLoad = setTimeout(function(){
    $('#cover2-wrapper').show();
    $('#nav_wrapper .nav').removeClass('nav-active');
    $('#nav_wrapper .nav-' + value).addClass('nav-active');
    $('#cover2-wrapper .inner-' + value).slideDown();
    $('#cover2-wrapper .slide-' + value).slideDown();
    //$('#cover2-wrapper .inner-' + value).slideToggle(function() {
      // if ( $('#cover2-wrapper .inner-' + value + ' a').css('display') == 'none' ) { //rehides wrapper if toggle is off
      //   $('#cover2-wrapper').hide();
      //   $('#nav_wrapper .nav-' + value).removeClass('nav-active');
      // }
    //});

    //hide all other tabs
    $.each(loadHeader, function(indexInner, valueInner) {
      if (indexInner != value) {
        $('#cover2-wrapper .inner-' + indexInner).slideUp();
        $('#cover2-wrapper .slide-' + indexInner).slideUp();
        $('#nav_wrapper .nav-' + indexInner).removeClass('nav-active');
      }
    });

  }, 100);
}

function preloadIcons(){
  $.each(data, function(date, evtInfos){
    $.each(evtInfos, function(evtID, evtArray){
      new Image().src = "images/blank.gif" + '?id=' + evtID + '&title=' + encodeURIComponent(evtArray["title"])
    })
  })
}