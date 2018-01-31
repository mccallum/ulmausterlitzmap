
 // Custom sorting plugin
(function($) {
  
  //quicksand sort
  $.fn.sorted = function(customOptions) {
      var options = {
        reversed: false,
        by: function(a) { return a.text(); }
      };
    $.extend(options, customOptions);
    $data = $(this);
    arr = $data.get();
    arr.sort(function(a, b) {
      var valA = options.by($(a));
      var valB = options.by($(b));
        if (options.reversed) {
          return (valA < valB) ? 1 : (valA > valB) ? -1 : 0;        
        } else {    
          return (valA < valB) ? -1 : (valA > valB) ? 1 : 0;  
        }
    });
  return $(arr);
  };

})(jQuery);

// DOMContentLoaded
$(function() {
  // Read Button Number
  var read_button = function(class_names) {
    var r = {
      selected: false,
      type: 0
    };
    for (var i=0; i < class_names.length; i++) {
      if (class_names[i].indexOf('selected-') == 0) {
        r.selected = true;
      }
      if (class_names[i].indexOf('segment-') == 0) {
        r.segment = class_names[i].split('-')[1];
      }
    };
    return r;
  };

  var determine_sort = function($buttons) {
    var $selected = $buttons.parent().filter('[class*="selected-"]');
    return $selected.find('a').attr('data-value');
  };
  
  var determine_kind = function($buttons) {
    var $selected = $buttons.parent().filter('[class*="selected-"]');
    return $selected.find('a').attr('data-value');
  };

  if( gallery == "img") var $list = $('#imgGallery .image-grid');
  else if( gallery == "doc") var $list = $('#docGallery .doc-grid');
  var $data = $list.clone();
  
  if( gallery == "img") var $controls = $('#imgGallery ul.splitter ul');
  else if( gallery == "doc") var $controls = $('#docGallery ul.splitter ul');
  
  $controls.each(function(i) {
    //console.log($(this));
    var $control = $(this);
    var $buttons = $control.find('a');
    
    $buttons.bind('click', function(e) {
      var $button = $(this);
      var $button_container = $button.parent();
      var button_properties = read_button($button_container.attr('class').split(' '));      
      var selected = button_properties.selected;
      var button_segment = button_properties.segment;
      
      // console.log("This:");
      // console.log($(this));
      // console.log("Container:");
      // console.log($button_container);

      if (!selected) {

        $buttons.parent().removeClass('selected-0').removeClass('selected-1').removeClass('selected-2').removeClass('selected-3').removeClass('selected-4').removeClass('selected-5').removeClass('selected-6').removeClass('selected-7');
        $button_container.addClass('selected-' + button_segment);
        
        var sorting_type = determine_sort($controls.eq(1).find('a'));
        var sorting_kind = determine_kind($controls.eq(0).find('a'));
        
        if (sorting_kind == 'all') {
          var $filtered_data = $data.find('li');
        } else {
          var $filtered_data = $data.find('li[data-value="'+sorting_kind+'"]');
          //console.log($filtered_data);
        }
        
        // if sorted by size
        if (sorting_type == "date") {
          var $sortedData = $filtered_data.sorted({
            by: function(v) {
              return parseFloat($(v).find('p[data-type="date"]').attr("data-value"));
            }
          });
        } else {
          // if sorted by name
          var $sortedData = $filtered_data.sorted({
            by: function(v) {
              return $(v).find('.imgTitle').text().toLowerCase();
            }
          });
        } 
        
        $list.quicksand($sortedData, {
          duration: 800,
          easing: 'easeInOutQuad'
          }, 
          //callbacks for other plugins to work with quicksand
          function() {
            initializeFancy();
            //initializeAdipoli();
          }
        ); 

        //Highlight Filter
        if( $(this).find('div').hasClass('filter-list') ) filterHighlight($(this).find('.filter-list'), $(this).closest('ul'));
        else filterHighlight($(this).find('.filter-sort_list'), $(this).closest('ul'));         
      }
      
      e.preventDefault();
    });
    
  }); 

  //fancybox
  initializeFancy();

  //adipoli image hover effect
  //initializeAdipoli();

  //Correct Pic Size for Bug
  setTimeout(function(){
    $('.adipoli-wrapper').css('width', '85px').css('height','85px');
  }, 100)
  
}); 

function initializeFancy(){
  $("a.fancy").fancybox({
    'width'       : '100%',
    'height'      : '100%',
    'autoScale'     : false,
    'transitionIn'    : 'none',
    'transitionOut'   : 'none'
  });
}

function initializeAdipoli(){
  $('.image1').adipoli({
    'startEffect' : 'normal',
    'hoverEffect' : 'popout',
    'popOutShadow' : '0'
  });  
}


