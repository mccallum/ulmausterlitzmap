/**
	* The map timeline feature.
	*
	* @author      Jon Bellona <bellona@uoregon.edu>
	* @version     Release 1.0
	*/

var slideToDate;

/**
* On document ready, fire up the footer.
*/
function initFooter() {
	
	//hide the timeline feature first before creating content
	$('.inner').hide();
	$('#playNext').hide();

	//create elements of the timeline
	initPhaseLabels();
	initDayList();
	initSliderBoxContent();
	initPlayBtn();

	//add functionality, must come after creation of elements
	moveSliderBox_onClick();
	retractableTimeline();
	highlightPhase();

}
	
/**
* Create the phase labels as divs (div class="tl_phase_labels")
*/
function initPhaseLabels() {

	//var list = $('<div class="tl_phase_label_wrapper">');
	var output = '',
			labels = '';
	
	$.each(phaseLabels, function(index, value) {
			labels += '<div class="tl_phase_label tl_phase_' + index + '"><h5>' + value[0] + '</h5><h6>' + value[1] + '</h6></div>';
	});
	output = '<div class="tl_phase_label_wrapper">' + labels + '</div>';
	
	$('.tl_phases').append( output );
}


/**
* Create the days as a list (inside div class="tl_phase_label")
*/
function initDayList() {
	
	//uses JSON vars phaseDates, data
	var daylist = ''; //ul list
	
	$.each(phaseDates, function(index_phase, dayNum) {
		
		daylist = '<ul class="tl_phase' + index_phase + ' ">';
		//Known bug IF ul contains css "display:inline"
		//If this css is required, then uncomment below for bug fix.
		// daylist += '<li class="tl_day dummy_day"></li>';
		
		//create days in each phase as a list
		$.each(dayNum, function(index_day, date_label) {
			
			//check the days against event information.
			//assign class 'tl_event' to elements that contain event information.
			//
			if( data[date_label] ) {
				//if date_label exists; date_label is name the day of the phase
				daylist += '<li class="tl_day ' + date_label + ' tl_event"><div class="tl_event_label_circle"></div></li>';
			} else {
				daylist += '<li class="tl_day ' + date_label + '"></li>'; 
			}
			
		}); //end days list
		
		daylist += '</ul>';
		
		//determine div to nest inside
		//index_phase
		$('#tl_phases_wrapper .tl_phase_label').eq(index_phase).append(daylist);
		
	}); //end phase loop
	
}



/**
* Initialize the slider box content upon page load (always Intro)
*
* Content (div class="tl_sldr_box")
*/
function initSliderBoxContent() {
	
	//position of where content should be.  and width for jquery slider
	var position = $('#tl_slider .tl_sldr_box').position();
	position = position.left;
	var width = $('#tl_slider .tl_sldr_box').width();
	
	//grab ul class="tl_phase_0", the intro and place inside tl_sldr_box
	var slider_content = $('#tl_phases_wrapper .tl_phase0').clone();
	$('#tl_slider .tl_sldr_box').append(slider_content);

}


/**
* Give the slider box dynamic moving/resizing capability (div class="tl_sldr_box")
*/
function moveSliderBox_onClick() {
	
	//get JSON object that has all CSS phase information
	//phaseSliderBoxCSS = phaseSliderBox;
	
	//load panels for intro and end
	$( '#tl_phases_wrapper .tl_phase_0,#tl_phases_wrapper .tl_phase_7' ).click( function() {
    stopAnimation();
		loadIntroEndPanels($(this).index());
	});
		
	//resize slider for all phases
	$( '#tl_phases_wrapper .tl_phase_1, #tl_phases_wrapper .tl_phase_2, #tl_phases_wrapper .tl_phase_3, #tl_phases_wrapper .tl_phase_4, #tl_phases_wrapper .tl_phase_5, #tl_phases_wrapper .tl_phase_6' ).click( function() {
    	// console.log($(this));

		//add and remove CSS class to highlight current phase
		$('#tl_phases_wrapper .tl_phase_label' ).removeClass('current-phase').removeClass('rollover-phase');
		$(this).addClass('current-phase');
		
		//in order to animate you need to know what the current class is,
		//and what the previous pixel values were
		var old_position = $('#tl_slider .tl_sldr_box').position();
		old_position = old_position.left;
		var old_width = $('#tl_slider .tl_sldr_box').width();
		
		$('#tl_slider .tl_sldr_box').css('left', old_position); //bug fix for first run-through left offset
		$('#tl_slider .tl_sldr_box').css('width', old_width);
		
		//(first time retrieved from css, subsequent times received from attr('style'))
		var old_class = $('#tl_slider .tl_sldr_box').attr('class');
		
		//get the index number of clicked phase and switch classes based upon our CSS array
		$( '#tl_slider .tl_sldr_box' ).removeClass( 'phase0 phase1 phase2 phase3 phase4 phase5 phase6 phase7 tl_sldr_box_border' );
		$( '#tl_slider .tl_sldr_box' ).addClass( phaseSliderBox[ $(this).index() ]['class'] );
		
		//add border if a valid phase
		if ( $(this).index() != 0 && $(this).index() != 7 ) {
			$('#tl_slider .tl_sldr_box').addClass('tl_sldr_box_border');
		}
		
		//get new class to check against
		var new_class = $('#tl_slider .tl_sldr_box').attr('class');
		
		//animate only if a new class was clicked
		if (new_class != old_class) {
			
			var new_position = phaseSliderBox[ $(this).index() ]['position'];
			var new_width = phaseSliderBox[ $(this).index() ]['width'];
			//animate slider box using new width and position, uses default easing: 'swing'
			$('#tl_slider .tl_sldr_box').animate({
			  width: "+=" + (new_width - old_width),
			  left: "+=" + (new_position - old_position)
			}, 500);
			
			//moved slider box, now change content
			//create class list to pass into changeSliderBoxContent(newPhase, oldPhase)
			old_class = old_class.split(' ');
			new_class = new_class.split(' ');
					// class is an array of CSS classes, i.e. ["tl_sldr_box", "phase6"]
					// our phase class is always in array position 1.
			var newPhase = $(this).index();
			var oldPhase = old_class[1].substr(5);
			
			changeSliderBoxContent( newPhase, oldPhase );

      // Create Map Links
      createMapLinks(); 
      // Create Layer Links
      createLayerLinks();
		}
	});
	
}

function moveSliderBox( phase_num ) {
	//JSON object with CSS info.: phaseSliderBox;
	
	//resize slider to the phases
	
		//add and remove CSS class to highlight current phase
		$('#tl_phases_wrapper .tl_phase_label' ).removeClass('current-phase');
		$('.tl_phase_phase'+ phase_num).addClass('current-phase');
		
		//in order to animate you need to know what the current class is,
		//and what the previous pixel values were
		var old_position = $('#tl_slider .tl_sldr_box').position();
		old_position = old_position.left;
		var old_width = $('#tl_slider .tl_sldr_box').width();
		
		$('#tl_slider .tl_sldr_box').css('left', old_position); //bug fix for first run-through left offset
		$('#tl_slider .tl_sldr_box').css('width', old_width);
		
		//(first time retrieved from css, subsequent times received from attr('style'))
		var old_class = $('#tl_slider .tl_sldr_box').attr('class');
		
		//get the index number of clicked phase and switch classes based upon our CSS array
		$( '#tl_slider .tl_sldr_box' ).removeClass( 'phase0 phase1 phase2 phase3 phase4 phase5 phase6 phase7 tl_sldr_box_border' );
		$( '#tl_slider .tl_sldr_box' ).addClass( phaseSliderBox[ phase_num ]['class'] );
		
		//add border if a valid phase
		if ( phase_num != 0 && phase_num != 7 ) {
			$('#tl_slider .tl_sldr_box').addClass('tl_sldr_box_border');
		}
		
		//get new class to check against
		var new_class = $('#tl_slider .tl_sldr_box').attr('class');
		
		//animate only if a new class was clicked
		if (new_class != old_class) {
			
			var new_position = phaseSliderBox[ phase_num ]['position'];
			var new_width = phaseSliderBox[ phase_num ]['width'];
			//animate slider box using new width and position, uses default easing: 'swing'
			$('#tl_slider .tl_sldr_box').animate({
				width: "+=" + (new_width - old_width),
			  left: "+=" + (new_position - old_position)
			}, 500);
			
			//moved slider box, now change content
			//create class list to pass into changeSliderBoxContent(newPhase, oldPhase)
			old_class = old_class.split(' ');
			new_class = new_class.split(' ');
					// class is an array of CSS classes, i.e. ["tl_sldr_box", "phase6"]
					// our phase class is always in array position 1.
			var oldPhase = old_class[1].substr(5);
			
			//changeSliderBoxContent( phase_num, oldPhase );
		}

		//Highlight 1st Phase
    $('#tl_phases_wrapper .tl_phase_' + currentPhase).addClass('current-phase');

}

/**
* Call back for loading contextWrapper for intro and end phases.
*
* @param int arg1		Phase number of object that was clicked.
*/
function loadIntroEndPanels( phase_num ) {
	
	//intro is 0, end is 7
  if( phase_num == 0){
    loadIntro('intro','overview');
  }else if( phase_num == 7){
    loadIntro('end');
  }

}


/**
* Change the slider box content based upon the phase clicked
*
* Content (div class="tl_sldr_box")
* Clickable phase (div class="tl_phase_label")
*
* @param int			arg1	The new phase number
* @param int 			arg2	The previous phase number (for content removal)
*/
function changeSliderBoxContent( phase_num, old_phase_num ) {

	// Open Intro if it has not already
	var phaseIntroName = 'phase' + phase_num + 'Intro';
	if( !$.cookie( phaseIntroName ) ) loadIntro(phaseIntroName);
	
	var slider_content, slider_scroll; //html content
	var slider_padding = 44;

    // Change the map if it is a different phase selected
    if( phase_num != currentPhase ){
      // Set Global Variable to Current Phase
      currentPhase = phase_num;

      // Set Global Variable to Current Map
      //visibleMap = mapType[phase_num]['default'];

      // Display Map for 1st Day of valid phase
			if ( phase_num != 0 && phase_num != 7 ) {
				var clickDate = phaseDates[phase_num]["1"];
				var clickMap = mapType[phase_num]['default'];
        redirectToDay(clickDate, clickMap);
			}
    }
		
		//use JSON phaseDates to dynamically get dayCount
		var dayCount = 0, key;
		for (key in phaseDates[phase_num]) {
			if (phaseDates[phase_num].hasOwnProperty(key)) dayCount++;
		}
		
		//remove slider box content
		$('#tl_slider .tl_sldr_box ul').remove();

		//clone and append new slider box content
		slider_content = $('.tl_phase' + phase_num).clone(); 
		$('#tl_slider .tl_sldr_box').append(slider_content);
		
		//remove and append new slider navigation
		$('#tl_sldr_nav_wrapper').slider( 'destroy' );
		$('#tl_sldr_nav_wrapper').remove();
		
		//only add slider if a valid phase
		if ( phase_num != 0 && phase_num != 7 ) {
			slider_scroll = $("<div id='tl_sldr_nav_wrapper'><div id='tl_sldr_nav'></div></div>");
			$('#tl_slider .tl_sldr_box').append(slider_scroll);
			$('#tl_slider .tl_sldr_box').addClass('tl_sldr_box_border');

      // Dynamically Calculate Width
      numOfDays = Object.keys(phaseDates[currentPhase]).length
      var dynamicWidth = numOfDays * 24 + 21; //24 is width of each <li>, 21 is padding
      //console.log(dynamicWidth);

			//alter nav CSS to fit new 'tl_sldr_box'
      //width = phaseSliderBoxCSS[ phase_num ]['width'];
			$( "#tl_sldr_nav" ).css('width', dynamicWidth - slider_padding);
			$( "#tl_sldr_nav" ).css('left', slider_padding / 2);
			
			//add day number to center of each <li> element
			$('#tl_slider .tl_sldr_box ul li').each(function() {
				var li_class = $(this).attr('class');
				li_class = li_class.split(' ');
				var li_day = li_class[1].split('_');
				$(this).html(li_day[1]);
				
				if ( li_class[2] ) {
					$(this).append('<div class="tl_event_circle"></div>');
				}
			});
			$('#tl_slider .tl_sldr_box ul li:first').addClass('tl_left current-day');
			//hide tl_event if first day
			if($('.tl_left').has('.tl_event_circle')) {
				$('.tl_left').find('.tl_event_circle').css('display','none');
			}
			
			//initialize UI .slider
			$( "#tl_sldr_nav" ).slider({
				min: 1,
				max: dayCount,
				value: 1,
				slide: function ( event, ui ) {
          // Clear Timer if slider is moving too fast for the browser
          if( slideToDate != null ) {
            clearTimeout(slideToDate);
            slideToDate = null;
            //console.log("cleared");
          }

					//initialize slider box method
					moveSliderBoxDay(ui.value);

          // Change Map Information on a Timer of 25ms so UI doesn't crash
					slideToDate = setTimeout(function(){
            displayDate(phaseDates[currentPhase][ui.value]);
            //console.log("fired event");
          }, 50);
				}
			});
			
			//initialize slider box methods
			$('#tl_slider .tl_sldr_box ul li').click(function() {
				//move slider
				var li_index = $(this).index();
				moveSliderBoxDay(li_index+1); //li_index is zero-indexed already so add 1 to match

				//display date, change map, and stop the animation
				var days_classes = $(this).attr('class').split(' ');
				displayDate(days_classes[1]);
			});
			
		} //end add slider

		// changes "Summary" link the new phase to allow review of each phase intoduction
    $('#phase_intro').attr('data-ref', 'phase'+currentPhase+'Intro');
	
}


/**
* Change the tl_sldr_nav position based upon the day(<li>) clicked
* Content (div class="tl_sldr_box")
*
* @param cnt (integer of index for day in current phase)
*/
function moveSliderBoxDay(index) {

  // index needs to be zero-indexed
  zeroIndex = index - 1;
  //highlightIndex = index - 1;
  
  //add and remove the day CSS class highlight
  $('#tl_slider .tl_sldr_box ul li').removeClass('current-day');
  //console.log($('.tl_sldr_box ul').find('li[' + highlightIndex + ']'));
  $('#tl_slider .tl_sldr_box ul li.' + phaseDates[currentPhase][index]).addClass('current-day');
  
  //hide/show event circle if highlighted day contains an event. (per Dave 2012-05-12)
  $('#tl_slider .tl_sldr_box ul li').find('.tl_event_circle').css('display','block');
  if($('#tl_slider .tl_sldr_box ul').find('li.' + phaseDates[currentPhase][index]).has('.tl_event_circle')) {
    $('#tl_slider .tl_sldr_box ul li.' + phaseDates[currentPhase][index]).find('.tl_event_circle').css('display','none');
  }

  // lastly, move the slider
  //console.log($.slider());
  $('#tl_sldr_nav').slider( 'option', 'value', index );
  
}


/**
* Highlight phases as mouse rolls over (div class="tl_phase_label")
*/
function highlightPhase() {
	$('#tl_phases_wrapper .tl_phase_label').mouseenter(function () {
			$(this).addClass('rollover-phase');
		}).mouseleave(function(){
			$(this).removeClass('rollover-phase');
	});
}


/**
* Retractable timeline feature
*
* Hide/show the timeline upon mouse click.
*/
function retractableTimeline() {
	
	var flip = 0
		, panelContainer = $('#panel').parent();
	
	$("#tl_controls .tl-triangle-down, #tl_controls .tl-triangle-right, #tl_controls .tl_ctrls_tl").click(function(){
				
		flip++;

		panelContainer.css('position', 'relative').slideToggle();
		
		if( flip == 1 ) {
			// Move controls up
			//$('#tl_controls').animate({ top:'-80px'}); //Is not needed when panelContainer is set to relative
			$('#tl_controls .tl_triangle').removeClass('tl-triangle-right');
			$('#tl_controls .tl_triangle').addClass('tl-triangle-down');
			
		} else {
			// Move controls down
			//$('#tl_controls').animate({ top:'0px'}); //Is not needed when panelContainer is set to relative
			$('#tl_controls .tl_triangle').removeClass('tl-triangle-down');
			$('#tl_controls .tl_triangle').addClass('tl-triangle-right');

			flip = 0;
		}
		
	}); // end .tl_ctr_bar function (retractable timeline)
}


/**
* Initialize the play button controls.
*/
function initPlayBtn() {
	var phase_intro = '<a href="#" id="phase_intro" class="border-radius">Synopsis</a>';
	
	$('.tl_ctrl_bar').append(phase_intro);
	
	$('#phase_intro').click(function() {
		stopAnimation();
		loadIntro($(this).attr('data-ref'));
		$.cookie('phaseIntro',true);
	});
	
	//play button image
	$('#tl_controls .play_btn, #tl_controls .tl_ctrls_play').live('click', function() {
		playAnimation();
	});
	
	$('#tl_controls .pause_btn, #tl_controls .tl_ctrls_pause').live('click', function() {
		stopAnimation();
	});
}

/**
* Initialize the play button controls.
*/
function playControlsShow(type) {
  if( type === "play"){
 
    $('#tl_controls .tl_ctrls_play').hide();
    $('#tl_controls .tl_ctrls_pause').show();
    $('#tl_controls .play_btn').addClass('pause_btn');
    $('#tl_controls .play_btn').removeClass('play_btn');

  }else if( type === "pause"){

    $('#tl_controls .pause_btn').addClass('play_btn');
    $('#tl_controls .pause_btn').removeClass('pause_btn');
    $('#tl_controls .tl_ctrls_pause').hide();
    $('#tl_controls .tl_ctrls_play').show();

  }
}
