/**
	* The map header feature.
	*
	* @author      Jon Bellona <bellona@uoregon.edu>
	* @version     Release 1.0
	*/

var tabsLoaded = false;
//initialize boolean for ajax load functions
var loadHeader = {'images':true, 'documents':true, 'narrative':true, 'bibliography':true, 'about':true};

var optionTabs = {'options':false, 'key':true};

var scale =  window.devicePixelRatio;

/**
* On document load, fire up the header
*/
function initHeader() {
  var mapOptions = $('#map_options .map_options_items');
  var mapKey = $('#map_key .map_key_items');

	//hide the map options feature first before creating content
	//$('#map_options_wrapper').hide();

	mapOptions.hide();

	//Open by default
	if ( $.cookie('keyOpen') === 'false' ) {
  	$(function(){ toggleKey(mapKey); });
  }

	$('#map_key .transBackground').animate({height:'370px'}, 370, function(){
      mapKey.show();
  });

	$('#cover2-wrapper').hide();
	$('#nav_wrapper .nav-map').addClass('nav-active');

	//add functionality, must come after creation of elements
	retractable_map_options();
	initHeaderTabs();

  $(function() {
    $('.hdr_context').click(
      function() {
        displayContextMap();
      }
    );
  });

	// Switch Maps on click of link
  $('#map_options .mapLinks').live("click", function(e){
    mapName = $(this).attr("data-ref");
    switchMap( mapName );
    $('#map_options .mapLinks').removeClass('activeMap');
    $(this).addClass('activeMap');
  });

  // Toggle Layer Visibility on click
  $('#map_options input[type="checkbox"]').live("click", function(){
  	var thisLayer = $(this).val();
    toggleLayerVis( thisLayer );
    if( $(this).prop('checked') ) {
      // Add layer name to visOptLayers array
      if ( visOptLayers.indexOf(thisLayer) === -1 ) {
      	visOptLayers.push(thisLayer);
      	$.cookie('visOptLayers', visOptLayers.toString() );
      }
    } else {
      // Find reference of layer in visOptLayers and remove reference
      var idx = visOptLayers.indexOf(thisLayer);
      if( idx != -1 ) visOptLayers.splice(idx, 1);
      // Set cookie to reflect layers
      $.cookie('visOptLayers', visOptLayers.toString() );
    }
  });

  // Toggle Map Options Layer
  $('#map_options h4').click(function(){
    if( optionTabs['options'] === false){
      optionTabs['options'] = true;
      // Animate and Show Content after animations
      // Two Sizes for Additional Map Phases
      if (mapType[currentPhase]['additional1'] != undefined) {
        $('#map_options .transBackground').stop().animate({height:'210px'}, 400, function(){
          mapOptions.show();
        });
      } else {
        $('#map_options .transBackground').stop().animate({height:'150px'}, 400, function(){
          mapOptions.show();
        });
      }

      $('#map_options_contents').css('height', '150px');

      // Change Arrow Direction
      $('#mo_triangle').removeClass('triangle-right').addClass('triangle-down');
    }else{
      // Hide Content Right away
      mapOptions.hide();
      optionTabs['options'] = false;
      // Animate Closing
      $('#map_options .transBackground').stop().animate({height:'36px'});
      $('#map_options_contents').css('height', '0px');
      // Change Arrow Direction
      $('#mo_triangle').removeClass('triangle-down').addClass('triangle-right');
    }
  });

  // Toggle Map Key Layer
  $('#map_key h4').click(function(){
  	toggleKey(mapKey);
  });

  // Close all covers on click of logo
  $('#logo_link').click(function(e){
  	redirectToDay(currentDay, visibleMap);
  	// Hide Tab Page Cover
  	$('#cover2-wrapper').hide();
  	// Hide Tabs
  	$('#cover2-wrapper > div').hide();
		// Hide intros
   	$('#mapCover').hide();
   	window.location.hash = '';
   	e.preventDefault();
  });

  // Change Highlight for Menus
  $('#narrMenu li a').live('click', function(){
  	filterHighlight($(this), $('#narrMenu'));
  });

  //Add resizing for narrative page when user toggles between synopses and facts
  $('#nar_facts_').live('click',function(){
     $('#narrative-intros').css('display','none');
     $('#narrative-facts').css('display','block');
     resizeCover2('narrative-facts');
  });

  $('#nar_intros_').live('click',function(){
    $('#narrative-intros').css('display','block');
    $('#narrative-facts').css('display','none');
     resizeCover2('narrative');
  });
}

/**
* Create the map options content
*/
function init_map_options() {

	//inside map.js
	createMapLinks();

	//inside map.js
	createLayerLinks();

	//draw army lines
/*  canvas = document.getElementById("key_na_line");
  cna = canvas.getContext("2d");
  cna.lineWidth = 3;
  cna.lineCap = "round";
  cna.strokeStyle = "#8200ad";
  cna.beginPath();
  cna.moveTo(1, 14);
  cna.bezierCurveTo(14, 6, 34, 6, 39, 14); //40px width
  //cfr.bezierCurveTo(18, 6, 36, 6, 48, 15);  //50px width
  cna.stroke();
*/

	canvas = document.getElementById("key_fr_line");
	cfr = canvas.getContext("2d");
	cfr.strokeStyle = "#0072bb"; //blue
	cfr.beginPath();
	cfr.moveTo(0, 15);
  if (scale == 1) {
    cfr.lineWidth = 3;

	  cfr.bezierCurveTo(14, 6, 34, 6, 40, 15); //40px width
	//cfr.bezierCurveTo(18, 6, 36, 6, 48, 15);  //50px width
  } else {
    cfr.lineWidth = 6;

    cfr.bezierCurveTo(14, 6, 34, 6, 40, 15); //40px width
  }
  cfr.stroke();

	canvas = document.getElementById("key_as_line");
	cas = canvas.getContext("2d");
	cas.lineWidth = 3;
	cas.strokeStyle = "#ed2939"; //red
	cas.beginPath();
	cas.moveTo(0, 15);
  if (scale == 1) {
    cas.lineWidth = 3;

  	cas.bezierCurveTo(14, 6, 34, 6, 40, 15); //40px width
  	//cau.bezierCurveTo(18, 6, 36, 6, 48, 15);  //50px width
  } else {
    cas.lineWidth = 6;

    cas.bezierCurveTo(14, 6, 34, 6, 40, 15); //40px width
  }

  cas.stroke();
	//
	//canvas = document.getElementById("key_rs_line");
	//crs = canvas.getContext("2d");
	//crs.lineWidth = 3;
	//crs.strokeStyle = "black";
	//crs.beginPath();
	//crs.moveTo(0, 15);
	//crs.bezierCurveTo(14, 6, 34, 6, 40, 15); //40px width
	//crs.bezierCurveTo(18, 6, 36, 6, 48, 15);  //50px width
	//crs.stroke();

	//draw army unit boxes
	canvas = document.getElementById("key_army");
	corps = canvas.getContext("2d");
	corps.lineWidth = 2;
	corps.strokeStyle = '#0072bb'; // blue
	corps.strokeRect(1, 10, 29, 10);
	corps.font = '9px sans-serif';
	corps.fillStyle = '#0072bb';
	corps.textBaseline = 'top';
	corps.fillText('XXXX', 3, 0);

    //draw army unit boxes
  canvas = document.getElementById("key_corps");
  corps = canvas.getContext("2d");
  corps.lineWidth = 2;
  corps.strokeStyle = '#0072bb'; // blue
  corps.strokeRect(1, 10, 29, 10);
  corps.font = '9px sans-serif';
  corps.fillStyle = '#0072bb';
  corps.textBaseline = 'top';
  corps.fillText('XXX', 6, 0);

	canvas = document.getElementById("key_division");
	corps = canvas.getContext("2d");
	corps.lineWidth = 2;
	corps.strokeStyle = '#0072bb'; // blue
	corps.strokeRect(1, 10, 29, 10);
	corps.font = '9px sans-serif';
	corps.fillStyle = '#0072bb';
	corps.textBaseline = 'top';
	corps.fillText('XX', 9, 0);

	canvas = document.getElementById("key_brigade");
	corps = canvas.getContext("2d");
	corps.lineWidth = 2;
	corps.strokeStyle = '#0072bb'; // blue
	corps.strokeRect(1, 10, 29, 10);
	corps.font = '9px sans-serif';
	corps.fillStyle = '#0072bb';
	corps.textBaseline = 'top';
	corps.fillText('X', 12, 0);

  canvas = document.getElementById("key_cavalry");
  corps = canvas.getContext("2d");
  corps.lineWidth = 2;
  corps.strokeStyle = '#0072bb'; // blue
  corps.strokeRect(1, 10, 29, 10);
  corps.beginPath();
  corps.moveTo(1, 20);
  corps.lineTo(29, 10);
  corps.stroke();

//  corps.font = '9px sans-serif';
//  corps.fillStyle = '#0036a1';


//  corps.textBaseline = 'top';
//  corps.fillText('X', 12, 0);

} //end init_map_options

/**
* Retractable map options feature
*
* Hide/show the map options upon mouse click.
*/
function retractable_map_options() {

	var flip = 0;

	$("#map_options_closed_wrapper .map_options_toggle").click(function(){

		flip++;

		if( flip == 1 ) {
			$('#map_options_closed').slideToggle();
			$('#map_options_wrapper').slideToggle();
		} else {
			$('#map_options_closed').slideToggle();
			$('#map_options_wrapper').slideToggle();
			flip = 0;
		}

	});
} // end retractable_map_options


/**
* Initialize the header tabs
*
* hide with .slideUp(), not with .css('display', 'none');
*/
function initHeaderTabs() {

	//initialize boolean for ajax load functions
  // Move to Global
	//var loadHeader = {'images':true, 'documents':true, 'narrative':true, 'bibliography':true, 'about':true};

  // Click Functionality for Map
	$("#nav_wrapper .nav-map").click(function(){
    $('#nav_wrapper .nav').removeClass('nav-active');
		$.each(loadHeader, function(index, value) {
			$('#cover2-wrapper .inner-' + index).slideUp();
			$('#cover2-wrapper .slide-' + index).slideUp();
		});
		$(this).addClass('nav-active');
		$('#cover2-wrapper').slideUp();
    location.hash = "";
	});


	//dynamically build out the click functions of header navigation
	$.each(loadHeader, function(index, value) {
		$('#nav_wrapper .nav-' + index).click(function(){
			$('#nav_wrapper .nav-map').removeClass('nav-active');
			//load ajax
			if(loadHeader[index]){
				link = $('#cover2-wrapper .inner-' + index + ' a').prop('href');
				//$('#cover2-wrapper .inner-' + index).load(link, function(){//adding function here --ls
          $.ajax({url:link,success:function(result){
            $('#cover2-wrapper .inner-' + index).html(result);
           var height = 0;
           $('.inner-' + index).css('min-height',$('#wrap').height()+10);
           resizeCover2(index);
          }
       });
				loadHeader[index] = false;
			}
      location.hash = "#" + index;

			//hide/show elements
			$('#cover2-wrapper').show();
			//$('#cover2-wrapper .inner-border').show();
			$('#nav_wrapper .nav-' + index).addClass('nav-active');
			$('#cover2-wrapper .slide-' + index).show();

			if( index === "images" ){
				// alert($('.image1'));
				// if($.adipoli) console.log('Adipoli Loaded');
				// else console.log('No plugin');
				// initializeAdipoli();
			}
		});
	});

} // end init_headerImagesTab

/**
* Add Highlight class to Header menus
*/

function filterHighlight(elem, grouping){
  // console.log(elem);
  // console.log(grouping);

  // Remove Active Class
  grouping.find('.filter-active').removeClass('filter-active');

  // Add Active Class to Element
  elem.addClass('filter-active');
}

/**
 * Toggle Map Key
 */
function toggleKey(mapKey){
  if( optionTabs['key'] === false){
	  optionTabs['key'] = true;
	  // Animate and Show Content after animations
	  $('#map_key .transBackground').stop().animate({height:'370px'}, 370, function(){
	    mapKey.show();
	  });
	  $('#map_key_contents').css('height', '355px');
	  // Change Arrow Direction
	  $('#mk_triangle').removeClass('triangle-right').addClass('triangle-down');
	  $.cookie('keyOpen', true);
	}else{
	  // Hide Content Right away
	  mapKey.hide();
	  optionTabs['key'] = false;
	  // Animate Closing
	  $('#map_key .transBackground').stop().animate({height:'36px'});
	  $('#map_key_contents').css('height', '0px');
	  // Change Arrow Direction
	  $('#mk_triangle').removeClass('triangle-down').addClass('triangle-right');
	  $.cookie('keyOpen', false);
	}
}

/**
* Display Event Information
*
* @param id - string of event id in data array
*/
function displayContextMap(){

  var type = "img";
  //alert(evtInfo.title + "\r" + evtInfo.type);

  // Stop Autoplay
  stopAnimation();

  // Create Content
  var content = contextMapHTML();

  // Transfer Content to Hidden Div
  $('#overlayContent').html(content);

  // Open Overlay or Modal
  // Define Global Fancybox Options
  var fbGlobal = {
    href :       '#overlayContent',
    wrapCSS:     'pop',
    fitToView:   true,
    openEffect:  'none',
    closeEffect: 'none',
    padding:     0,
    margin:      0,
    autoSize:    false,
    width:       800,
    height:      500,
    helpers: {
      title : {
        type : 'inside'
      },
      overlay : {
        speedIn : 500,
        opacity : 0.75
      }
    },
    afterShow : function() {
      $('.fancybox-outer').before($(".fancybox-title")).css('height-min', '200px');
      $(".fancybox-title").css("font-size", "18px").css("border-bottom","solid #FFF 1px");
    }
  }

  $.fancybox.open(fbGlobal).reposition();

} //End of Function

/**
* Create HTML for Image Overlay Window
*
* @param imgArray - array in data relating to current event'
*
* @output output - string in html that is displayed in popover for img evt.
*/

function contextMapHTML(){
  //console.log(docArray);
  var title = "<!--<h1>Context Map</h1>-->";
//  var date = "<h2>" + formatDate(currentDay, "long") + "</h2>";
//  var imgDesc = "<p>" + imgArray.imgDesc + "</p>";
//  var fullGalleryLink = "<p id='fullGallery'><a href='#images'><img src='images/ui_galleries.png'>See All Images</a></p>";
  var image = "<div id='context" + currentPhase + "'></div>";

  // Wrap Text Part - .popText
    var popText = "<!--div id='popText'>" + title + "</div-->";

  // Create inner Wrapper - .popInner
  var popInner = "<div class='popInner context'>" + image + popText + "</div>";

  // Create outer Wrapper - .popImage
  var output = "<div class='popImage context'>" + popInner + "</div>";

  return output;
}

function resizeCover2(type){
  var wrapHeight = $('#cover2-wrapper').innerHeight();
  var mapCoverHeight = 0;
  if( $('#mapCover').css('display') != 'none')
    mapCoverHeight = $('#mapCover').height();
  var height = 0;

  switch(type){
    case 'narrative':
      $('#narrative-intros').children().each(function(i, value){
        height += $(this).height();
      });
      break;

    case 'narrative-facts':
      $('#narrative-facts').children().each(function(i, value){
          height += $(this).height() + 10;//add 10 bc hrs are showing up as 0 height
          type = "narrative"; //sub case of narrative
      });
      break;

    case 'images':
      children = $('#imgGallery #galleryStyle li').length;
      height = Math.ceil(children / 3);
      height = (height * 100);
      //$('.inner-images').height(height);
      break;

    case 'documents':
      children = $('#docGallery #galleryStyle li').length;
      height = Math.ceil(children / 3);
      height = (height * 100);
      break;

    case 'bibliography':

      var div = $('#bibliography-content');
      var last = $('#bibliography-content li:last');

      if($(last).height() == 0){
        setHeight(last, div, 0);

      }//if
      else{
        $(div).children().each(function(i){
          height += $(this).height();
          setTimeout(function(){
            $('.inner-bibliography').height(height + 300);
          },500);
        });
      }
      //console.log("last elt height from case bib" + $(last).height());
      // Adjust for missing space at bottom
      //height += 300;
      break;

    case 'about':
      $('#about-content').children('p').each(function(i){
          height += $(this).height();
      });
      break;
  }

  // Adjust for pages that are shorter than the wrapper height;
  wrapHeight = (wrapHeight > mapCoverHeight) ? wrapHeight : mapCoverHeight;
  height = ( wrapHeight > height ) ? wrapHeight : height;

  setTimeout(function(){
    if(type != 'bibliography')//added bc bib case is handled separately
    $('.inner-'+type).height(height);
  },500);
}

function setHeight(last, div, counter){
  var height = 0;
  //console.log("last elt height entering setheight = " + $(last).height());
  if($(last).height() == 0 && counter < 5)
    height = setTimeout(function(){
      setHeight(last, div, counter+1);
    },50);
  else{
    $(div).children().each(function(i){
      height += $(this).height();
      //console.log("height now equals "+height);
    });
    setTimeout(function(){
    $('.inner-bibliography').height(height + 300);
  },500);
  }

}
