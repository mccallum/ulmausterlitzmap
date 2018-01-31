/**
* intro.js document
*
* @see https://uolibwebredesign.basecamphq.com/projects/2946037-work-not-directly-related-to-a-client-project/files
* @see "JS Style Guide.doc" for styling
* @author William Myers
* @author <myersw@example.com>
*/

/**
* Onload
* 
*/
function initIntro() {
  // Load Initial Intro
  if( !$.cookie('skipIntro') ) loadIntro('intro');
  else $('#mapCover').hide();

  // Navigation for Intro
  $('.nextSlide').live("click", function(){
    // Fade out current divs
    var container = $(this).attr("data-ref");
    var currentSlide = parseInt(container.substr(5));
    //console.log(currentSlide);
    $('#'+container).hide();

    // Increment Slide Number
    // if( currentSlide < 6 ) {
      currentSlide++;
      $('#slide'+currentSlide).fadeIn('slow');
    // }else $('#coverWrapper').hide();
  });

  $('.prevSlide').live("click", function(){
    // Fade out current divs
    var container = $(this).attr("data-ref");
    var currentSlide = parseInt(container.substr(5));
    //console.log(currentSlide);
    $('#'+container).hide();

    // Negative Increment Slide Number
    if( currentSlide != 1 ) {
      currentSlide--;
      $('#slide'+currentSlide).fadeIn('slow');
    }
  });

  // Wireup Intro Close Button
  $('#filter-wrapper .introClose').live('click',function(){
    $('#mapCover').hide();
  });

  // Skip Intro & Continue Button Click
  $('#btnSkipIntro, #continueBtn').live('click', function(){
    $('#mapCover').hide();

    // Check if this is the end intro click
    if( !$(this).hasClass('endIntro') ) {
      var introClick = $.cookie('phaseIntro');//this var is new from earlier version, sets to true if user clicked on synopsis?
      
      //move and change the slider box
      if( $.cookie('phaseIntro') ){
        $.cookie('phaseIntro',null);
      } 
      else if($.cookie('intro')==null){//go in here if intro, added if condition --ls
        oldPhase = currentPhase-1;
        moveSliderBox(currentPhase);
        changeSliderBoxContent(currentPhase,oldPhase);
      }
      
       if( currentPhase == 1 && $.cookie("intro") == null  && introClick == null){//changed from skipToDate to intro cookie --ls
         playAnimation();
     }
     
     

      // Clear Cookies
      $.cookie("skipToMap", null);

      // Make sure that tl_sldr_box is adjusted Bug #1382
      $('#tl_slider .tl_sldr_box').css('left', phaseSliderBox[currentPhase]['position'])
      
    }//if !end intro click

  })        
}

/**
* Injects HTML for intro screens in $('#mapCover')
* 
* @param introName (string indicating which intro it is)
* 
* @dependencies showIntro()
*/
function loadIntro(introName, type){
  //console.log(introName);
  // Check to see if there is a cookie set for this phase
  var patternMatch = false,
    cookieMatch = false;
  if( introName.match(/^phase*/) ) patternMatch = true;
  if( $.cookie(introName) === 'true' ) cookieMatch = true;

  // console.log("Pattern Match", patternMatch);
  // console.log("Cookie Match", cookieMatch);

  // AJAX load intro
  var introURL = 'includes/' + introName + '.inc.php';

  // Only show overview by adding ?overview=only
  if( type === 'overview') introURL += '?overview=only';
  //console.log("URL:",introURL);

  $.ajax(introURL)
    .done( function(data){
      $('#mapCover').html(data);
      
      showIntro();
      if( patternMatch ){
        closeBtn = $('#mapCover .introClose').parent();
        if( cookieMatch ) {
          //console.log('cookie true');
          closeBtn.show();
        }else closeBtn.hide();
      }
    });

  // Set Cookie for phase intros
  if( patternMatch && !$.cookie(introName) ) $.cookie(introName, true);
  if($.cookie('phase1Intro')) $.cookie('intro',true);//if we are here and phase1Intro is set, then we've seen the intro --ls

  // Set phase1Intro cookie on intro load because it contains it
  if( introName == 'intro' ) $.cookie('phase1Intro', true);

}

/**
* Determines whether the skip intro button shows base on cookie
* 
*/
function showIntro(){
  // Show container Element
  $('#mapCover').show();

  // Check for cookie
  if( $.cookie("skipIntro") ) {
    $('#btnSkipIntro').show();
  } else {
    $('#btnSkipIntro').hide();
    $('#filter-wrapper').hide();
    // Set Cookie
    $.cookie("skipIntro", true);
  }
}