/**
* map.js document
*
* @see https://uolibwebredesign.basecamphq.com/projects/2943037-work-not-directly-related-to-a-client-project/files
* @see "JS Style Guide.doc" for styling
* @author William Myers
* @author <myersw@example.com>
*/

/**
* Set variables
* 
*/
var extent = new OpenLayers.Bounds(-180, -114, 180, 114);
var layerSize = new OpenLayers.Size(1440, 910);
var layerOverlayOptions = {numZoomLevels: 2, transparent: true, format: 'image/xml+svg', isBaseLayer: false};
var layerBgOptions = {numZoomLevels: 2, format: 'image/jpg'};
var currentPhase = 1;
var currentDay = "8_27";
var visibleMap = "";
var maps = new Array();
var extendedMaps = new Array();
var allLayers = new Array();
var animation = new Array();
var mapPages, phaseDates, mapType, data;
var troopLayers = new Array();
var firstLoad = false;
var visOptLayers = [];

// Event Markers Initial Variables
var size = new OpenLayers.Size(40,40);
var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
var iconObj = ""; 
// var battleIconURL = "images/ui_battleicon.png";
// var docIconURL = "images/ui_docicon.png";
// var factIconURL = "images/ui_facticon.png";
// var imgIconURL = "images/ui_picicon.png";

//var battleIconURL = "images/ui_mapIcons.png";
//var docIconURL = "images/ui_mapIcons.png";
//var factIconURL = "images/ui_mapIcons.png";
//var imgIconURL = "images/ui_mapIcons.png";
var iconFlash = new Array();

/**
* Document Load
*/
function initMap() { 

  //set cookie values
  if( $.cookie('visOptLayers') ) visOptLayers = $.cookie('visOptLayers').split(",");

  // Determine Map to Create Initial Map 
  getMapsByPhase(currentPhase);

  // Hide inactive Maps
  $('.mapWrapper').not('#' + visibleMap).hide();
  $('#' + visibleMap).show();

  if( $.cookie('skipIntro') ) {
    $(function(){ 
      $('#playNext').hide();
      redirectToDay(currentDay, visibleMap); 
      playAnimation();
    });
  }

  // Create play functionality
  $('#playBtn').click(function(){
    playAnimation();
  });

  // Create Play Next Phase Functionality
   $('#playNext').click(function(){
    playNextPhase();
  }); 

  // Stop autoplay on click of Map Layers
  $('#main').on('click touchmove', '.olLayerDiv', function(){
    stopAnimation();
  })

  // Hover effect for icons
  $('#main .icon').live('mouseover', function(){
    flashIcon($(this), "on");
  }).live('mouseout', function(){
    flashIcon($(this), "off");
  })

}

/**
* Creates Map Object
* 
* @param phase (int of phase number)
* 
* @dependencies defineMap(), defineLayers()
*/
function getMapsByPhase(phase){
  //console.log(mapType[phase]);
  if( currentPhase != phase ) currentPhase = phase;

  // Create Maps and Layer Objects
  $.each( mapType[phase], function(index, value) {
    // Set Default visibleMap
    if( index === "default") visibleMap = value;

    // Only create a new map if doesn't exist
    if( maps[value] == undefined ) defineMap(value);

    // Create layers for map
    defineLayers(value);
  });

  // Create Map & Layer links in header.js
	init_map_options();

  //Hide zoom buttons for mobile device
  //if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
    //$('#main .olControlZoom').hide();
  //}
}

/**
* Creates Map Object
*
* @param mapDiv - string of id for element map placeholder
*/
function defineMap(mapDiv){
  // console.log(mapDiv);
  //var mapObjName = mapDiv + "map";

  // Only create map object if it has not already been defined
  if (maps.indexOf(mapDiv) == -1) {
    var mapObj = new OpenLayers.Map({
      div: mapDiv,
      controls: [
        new OpenLayers.Control.TouchNavigation({
          dragPanOptions: {
            enableKinetic: true            
          }
          // panMapStart: function(){
          //   alert('Hi');
          // }
        }),
        new OpenLayers.Control.Zoom({
        //   onZoomClick: zoomClick
        }),       
        new OpenLayers.Control.PinchZoom({
          pinchStart: function(){
            return false;
          }
        })    
      ],
      restrictedExtent: extent,
      maxExtent: extent
    })
    // Collect Map Objects into an array 
    maps[mapDiv] = mapObj;
    if (troopLayers.indexOf(mapDiv) == -1) troopLayers[mapDiv] = new Array();

    //console.log(mapObj)
    //mapObj.Handler.Drag["dragstart"] = stopAnimation();

    // Overrides Zoom Out Functionality to reset map
    $('a').on('click touchstart',function(){
      if( $(this).hasClass('olControlZoomOut') ) windowResize();
    })
  }

}

/**
* Creates Map Layers
*
* @param mapName - string of name of map
*/
function defineLayers(mapName){
  //console.log(mapType[mapName]);
  var loadedLayers = new Array();

  // Create Layers Object for bg, political boundaries, and roads/rivers
  // If map is not already loaded create overlay layers & background layers
  if( extendedMaps.indexOf(mapName) == -1 ) {
    $.each( mapType[mapName], function(index, value){
      //console.log(value);
      var layerName = value;

      // Check to see if layer is already loaded
      if( allLayers[layerName] == undefined ){
        // Create allLayers other than base with isBaseLayer false
        var layerURL = "";
        if (index === "bg") {
          currentLayerOption = layerBgOptions;
          layerURL = 'images/' + layerName + '.jpg';

          // define Layer
          var layerObj = new OpenLayers.Layer.Image(
            layerName,
            layerURL,
            extent,
            layerSize,
            currentLayerOption
          );  

        } else if (index === "Commanders") {
          currentLayerOption = layerOverlayOptions;
          layerURL = 'images/' + layerName + '.svg';

/*          var point = new OpenLayers.Geometry.Point(-110, 45);

          // create a polygon feature from a linear ring of points
          var pointList = [];
          for(var p=0; p<6; ++p) {
            var a = p * (2 * Math.PI) / 7;
            var r = Math.random(1) + 1;
            var newPoint = new OpenLayers.Geometry.Point(point.x + (r * Math.cos(a)), point.y + (r * Math.sin(a)));
            pointList.push(newPoint);
          }
          pointList.push(pointList[0]);
            
          var linearRing = new OpenLayers.Geometry.LinearRing(pointList);
          var polygonFeature = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Polygon([linearRing]));

          var styleMap = new OpenLayers.StyleMap(OpenLayers.Util.applyDefaults({
            externalGraphic: 'images/europe_commanders.svg'
          },OpenLayers.Feature.Vector.style["default"]));

          var sublayerObj1 = new OpenLayers.Layer.Vector('Basic1',{styleMap: styleMap});
          var sublayerObj2 = new OpenLayers.Layer.Vector('Basic2');
         
          sublayerObj2.addFeatures([polygonFeature]);

          var myArray = new Array(sublayerObj1,sublayerObj2);

          var layerObj = new OpenLayers.Layer.Vector.RootContainer('Vectors1',{layers: myArray});
*/
          // define Layer
         var layerObj = new OpenLayers.Layer.Image(
            layerName,
            layerURL,
            extent,
            layerSize,
            currentLayerOption
          );

        } else {

          //roads, political layers
          currentLayerOption = layerOverlayOptions;
          layerURL = 'images/' + layerName + '.svg';

          // define Layer
          var layerObj = new OpenLayers.Layer.Image(
            layerName,
            layerURL,
            extent,
            layerSize,
            currentLayerOption
          );  
        }

        // define Layer
/*        var layerObj = new OpenLayers.Layer.Image(
          layerName,
          layerURL,
          extent,
          layerSize,
          currentLayerOption
        );    
*/
        if (allLayers.indexOf(layerName) == -1) allLayers[layerName] = layerObj;
        loadedLayers.push(layerObj);
      }
    })
  }

  // Determine Troop Movement Layers in Current Phase
  var daysInPhase = new Array();
  relativePhase = mapPages[currentDay]["phase"];
  daysInPhase = phaseDates[relativePhase];

  // Add those Layers to the map
  //console.log(daysInPhase);
  $.each(daysInPhase, function(index, value){
    var layerName = mapName + "_" + value;
    
    //console.log(layerName);
    //console.log( allLayers[layerName] == undefined);
    if( allLayers[layerName] == undefined ){
      // define Layer
      var layerObj = new OpenLayers.Layer.Image(
          layerName,
          'images/' + layerName + '.svg',
          extent,
          layerSize,
          layerOverlayOptions
      );    
      if (allLayers.indexOf(layerName) == -1) allLayers[layerName] = layerObj;
      troopLayers[mapName].push(layerObj);
      loadedLayers.push(layerObj);

      // layerObj.events.register('touch', layerObj, function(){
      //   alert('touch');
      // });
    }
  });

  // Create Marker Layer
  var markerName = mapName + "Markers";
  if (allLayers[markerName] == undefined) {
    var markerObj = new OpenLayers.Layer.Markers( markerName );
    allLayers[markerName] = markerObj;
    loadedLayers.push(markerObj);
  }

  // Add Layers to map
  //console.log(loadedLayers);
  maps[mapName].addLayers(loadedLayers);

  //Show Layer so that it is accessible by OpenLayers
  //$('#'+mapName).show();

  // // Extend the Map to the available size, this is what draws the map
  if( extendedMaps.indexOf(mapName) == -1 ) {
    maps[mapName].zoomToMaxExtent();
    extendedMaps.push(mapName);
  }

  // Turn off visibility to other troop allLayers;
  // Also allows image to be pulled by the browser
  //troopLayerVis(mapName);
  setTimeout(function(){
    // for(var j = 1; j < troopLayers[mapName].length; j++){
    //   troopLayers[mapName][j].setVisibility(false);
    //   if (j > 110){ break;}
    // }
    if(mapName == visibleMap)
      troopLayerVis(mapName);
  }, 50);

  // // Make Sure that Marker Layer is at the top
  // layerNum = Object.keys(maps[mapName].layers).length
  // maps[mapName].setLayerIndex(allLayers[markerName], layerNum)

  // // Add Event Markers
  // createEvtMarkers(mapName);

  // // Check Variables
  // console.log("------------ Map.js defineLayers ::",mapName, " -----------");
  // console.log(allLayers);
  // console.log(maps[mapName]);
  // console.log(loadedLayers);
  // console.log(troopLayers);

}

/**
* Creates Map Markers
*
* @param mapName - string of name of map to create markers on
*/
function createEvtMarkers(mapName){
  //console.log(mapName);

  // Determine Marker Layers in a phase
  var markerLayerName = mapName + "Markers";
  //console.log(markerLayerName);
  //console.log(allLayers[markerLayerName]);

  // Clear old markers
  allLayers[markerLayerName].clearMarkers();

  // Get Event Data from JSON
  var evtInDay = new Array();
  evtInDay = data[currentDay];
  //console.log(evtInDay);
 
  // Iterate over data
  if( evtInDay != null ){
    $.each(evtInDay, function(indexEvt, valueEvt){
      // Determine Event Type
      var type = valueEvt["type"];
      var iconClass = "";
      switch(type){
        case "battle":
          iconClass = "battleIcon";
          break;
        case "doc":
          iconClass = "docIcon";
          break;
        case "fact":
          iconClass = "factIcon";
          break;
        case "img":
          iconClass = "imgIcon";
          break;
        default:
          iconURL = "http://www.openlayers.org/dev/img/marker.png";
      }

      iconURL = "images/blank.gif";
      iconURL += '?id=' + indexEvt + '&title=' + encodeURIComponent(valueEvt["title"]);

      // Preload Images
      if(document.images) {
        var imgIcon = new Image();
        imgIcon.src = iconURL;
      }
      // Specific Marker Info
      icon = new OpenLayers.Icon(
        iconURL, 
        size, 
        offset
      );
      if( valueEvt[mapName] != undefined){
        if( valueEvt[mapName]["x"] != undefined ) var evtLon = valueEvt[mapName]["x"];
        else return false;
        if( valueEvt[mapName]["y"] != undefined ) var evtLat = valueEvt[mapName]["y"];
        else return false;
      } else return false;

      // Define Marker
      var markerObj = new OpenLayers.Marker(
        new OpenLayers.LonLat(evtLon,evtLat), 
        icon
      );
      
      // Register Click event for Marker
      markerObj.events.register(
        "mousedown", 
        markerObj, 
        function() {
          displayEvtInfo(indexEvt);
      });
      markerObj.events.register(
        "touchstart", 
        markerObj, 
        function() {
          displayEvtInfo(indexEvt);
      });

      // Put Marker on map
      allLayers[markerLayerName].addMarker(markerObj);

      // Add Title Property & Special Class to Icon
      var src = markerObj["icon"]["url"];
      //var title = qs(src, "title");
      var iconElem = $('#main img.olAlphaImg[src*="' + src + '"]');
      iconElem.prop("title", encodeURIComponent(valueEvt["title"]));

      // Add special icon class;
      iconElem.parent().addClass(iconClass).addClass("icon");

      // Flash Icon
      iconFlash[indexEvt + "off"] = setTimeout(function(){
        flashIcon( iconElem.parent(),"off") }
        ,1500)
      
      iconFlash[indexEvt + "on"] = setTimeout(function(){
        flashIcon( iconElem.parent(),"on") }
        ,1000)

      iconFlash[indexEvt + "off"] = setTimeout(function(){
        flashIcon( iconElem.parent(),"off") }
        ,500)

      iconFlash[indexEvt + "on"] = setTimeout(function(){
        flashIcon( iconElem.parent(),"on") }
        ,1)

      // Check Marker
      //console.log(markerObj);

    });
  }
}

/**
 * Make icon change state to flash it
 */
function flashIcon(iconDiv, state){
  // console.log(iconDiv);
  // console.log(state);
  if( iconDiv.length ) {
    // Image Icons
    if( iconDiv.hasClass("imgIcon") && state === "on") iconDiv.css('background-position', '80px -40px');
    else if( iconDiv.hasClass("imgIcon") && state === "off") iconDiv.css('background-position', '80px 1px');
    
    // Fact Icons
    if( iconDiv.hasClass("factIcon") && state === "on") iconDiv.css('background-position', '40px -40px'); //was 40,-40
    else if( iconDiv.hasClass("factIcon") && state === "off") iconDiv.css('background-position', '40px 0px');

    // Doc Icons
    if( iconDiv.hasClass("docIcon") && state === "on") iconDiv.css('background-position', '120px -40px');
    else if( iconDiv.hasClass("docIcon") && state === "off") iconDiv.css('background-position', '120px 0px');
    // Battle Icons
    if( iconDiv.hasClass("battleIcon") && state === "on") iconDiv.css('background-position', '0px -40px');
    else if( iconDiv.hasClass("battleIcon") && state === "off") iconDiv.css('background-position', '0px 0px');
  }
}
/**
* Play Troop Animation
*/
function playAnimation(){
  var dayIndex = 0;
  animation = new Array();

  // Switch Controls in footer.js
  playControlsShow("play");

  // Find Day to show
  daysInPhase = phaseDates[currentPhase];
  dayNum = Object.keys(daysInPhase).length;
  $.each(daysInPhase, function(index, valueDay){
    if( valueDay == currentDay) dayIndex = parseInt(index);
  })
  strDayIndex = String(dayIndex);
  //console.log( phaseDates[currentPhase][strDayIndex] );

  var cnt = 1;
  for (var j = dayIndex; j < dayNum; j++){
    makeTroopsVisAnimation(daysInPhase, j, cnt, dayNum);
    cnt++;
  };

}

/**
* Play Next Phase of Animation
*/
function playNextPhase(){
  // Check to see if this is the last available phase
  // then open conclusion screen
  if( currentPhase == 6 ){
    loadIntro("end");
  }else{
    // Set Variable to Next Phase
    oldPhase = currentPhase
    currentPhase = currentPhase + 1;
    currentDay = phaseDates[currentPhase]["1"];
    //console.log(currentPhase + " - " + currentDay);

    // Determine Map to Create
    $('.mapWrapper').show();
    getMapsByPhase(currentPhase);
    
    // Hide inactive Maps
    $('.mapWrapper').not('#' + visibleMap).hide();

    // Open Map Cover with Intro Info
    var phaseName = 'phase' + currentPhase + 'Intro';
    if( !$.cookie( phaseName ) ) loadIntro( phaseName );

    // Change Slider Box 
    moveSliderBox(currentPhase);
    changeSliderBoxContent(currentPhase, oldPhase);

    // Hide Button
    $('#playNext').hide();

    // Change Button back to Play
    stopAnimation();
  }

}

/**
* Stop Troop Animation
*/
function stopAnimation(){
  //change the play btn controls
  playControlsShow("pause");

  //stop the animation 
  for (var i = 1; i < animation.length; i++) {
    clearTimeout(animation[i]);
  };
}

/**
* Show/Hide Troop Layers
*
* @param daysInPhase - array with all the days in a certain phase
* @param index - int referencing index of day to make visible
* @param cnt - offset of index by 1. Used to determine timeout 
* @param numOfDays - Number of days in phase
*/
function makeTroopsVisAnimation(daysInPhase, index, cnt, numOfDays){
  // Calculate Seconds
  time = cnt * 3000;
  animation[cnt] = setTimeout(function(){
    // console.log(daysInPhase)
    // console.log(" - index: " + index + " - cnt: " + cnt + " - numOfDays: " + numOfDays); 
    // Turn off active layer
    var prevActiveLayer = visibleMap + "_" + currentDay;
    allLayers[prevActiveLayer].setVisibility(false);


    // Determine New Active Layer
    index++;
    nextDay = daysInPhase[index.toString()];
    var activeLayer = visibleMap + "_" + nextDay;
    allLayers[activeLayer].setVisibility(true);

    // Set Global variables
    currentDay = nextDay;

    // Show Event Icons
    createEvtMarkers(visibleMap);

    // Change Map Label
    displayMapTitle();

    // Move Slider
    moveSliderBoxDay(index);

    // Switch Controls Back
    if( index == numOfDays ){
      $('#pause').hide(); 
      $('#playDiv').show();
      $('#playNext').show();
      animation = [];
      sliderPosition = $('#tl_sldr_nav').slider("option", "value");
    }
  }, time);
}

/**
* Show/Hide Troop Layers
*
* @param date - string of active day
*/
function displayDate(date){
  // Stop Animation
  stopAnimation();

  if( date != currentDay){
    //console.log(date);

    // Change to Map if Necessary
    switchMap(visibleMap);

    // Get Date Layer Info
    var activeLayer = visibleMap + "_" + date;
    var prevLayer = visibleMap + "_" + currentDay;

    // Hide Current Layer
    toggleLayerVis(prevLayer);

    // Check for specific date layer in allLayers Array
    if( allLayers[activeLayer] != undefined ){

      // Set Global variables
      currentDay = date;  

      // Show Event Icons
      createEvtMarkers(visibleMap);
        
    } else {
      // Set the currentDay
      currentDay = date;

      // Determine Phase of Date
      phase = mapPages[date]["phase"];
      currentPhase = phase;
      //console.log(phase);

      // Bring current map to front
      $('.mapWrapper').show(); 

      // Create & Load Maps for that date's phase
      getMapsByPhase(phase);
   
      $('.mapWrapper').not('#'+visibleMap).hide();
    
    }

    // Make Layer visible
    //troopLayerVis(visibleMap);
    toggleLayerVis(activeLayer);

    // Display Next Phase button if last troop movement
    if( mapPages[currentDay]["lastMove"] != undefined ) $('#playNext').show();
    else $('#playNext').hide();
  }
}

/**
* Display Event Information
*
* @param id - string of event id in data array
*/
function displayEvtInfo(id){
  evtInfo = data[currentDay][id];
  var type = evtInfo.type;
  //alert(evtInfo.title + "\r" + evtInfo.type);

  // Stop Autoplay
  stopAnimation();
  
  // Create Content
  switch(type){
    case "battle":
      content = evtBattleHTML(evtInfo.battleInfo, evtInfo);
      break;
    case "doc":
      content = evtDocHTML(evtInfo);
      break;
    case "fact":
      content = evtFactHTML(evtInfo);
      break;
    case "img":
      content = evtImgHTML(evtInfo);
      break;
    default:
      content = "There is an issue with the system. Content could not be determined.";
      content += "<br /> Error: Content Type - " + type;
  }

  // Transfer Content to Hidden Div
  $('#overlayContent').html(content);

  // Open Overlay or Modal 
  // Define Global Fancybox Options
  var fbGlobal = {
    href : '#overlayContent',
    wrapCSS : 'pop',
    fitToView : false,
    autoHeight : false,
    autoSize: true,
    openEffect  : 'none',
    closeEffect : 'none',
    padding: 1,
    margin: 0,
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

  // Define Fancybox Options for Docs
  var fbDocOptions = {
      autoSize  : false,
      width     : 960
  }
  // Define Fancybox Options for Battle
  var fbBattleOptions = {
      autoHeight: true,
      maxWidth  : 685, //was 485 --make bigger? LS
      minWidth  : 485, //added LS
      minHeight : 300
  }
  // Define Fancybox Options for Images
  var fbImgOptions = {
      maxWidth  : 960,
      maxHeight : 600
  }
  // Define Fancybox Options for Facts
  var fbFactOptions = {
      autosize  : false,
      maxWidth  : 685,
      minWidth  : 685,
      maxHeight : 450,
      minHeight : 300 //added LS

  }
  

  // Merge Objects
  
  switch(type){
    case "battle":
      optArrayName = fbBattleOptions;
      break;
    case "doc":
      optArrayName = fbDocOptions;
      break;
    case "fact":
      optArrayName = fbFactOptions;
      break;
    case "img":
      optArrayName = fbImgOptions;
      break;
    default:
      optArrayName = fbBattleOptions;
  }
  for( var attrname in optArrayName) {
    fbGlobal[attrname] = optArrayName[attrname];
  };

  $.fancybox.open(fbGlobal).reposition(); //was causing an error in console, it's back bc of other havoc --LS

} //End of Function

/**
* Create HTML for Battle Overlay Window
*
* @param battleArray - array in data relating to current event's battleInfo
*
* @output output - string in html that is displayed in popover for battle evt.
*/
function evtBattleHTML(battleArray, evtInfo){
  //console.log(battleArray);
  //var troops = new Array();
  //var maxTroopNum = 5;
  var output = "";

  // Figure out how many troop units there are
  /*
  for (var i = 1; i <= maxTroopNum; i++) {
    valid = battleArray["troops" + i] !== undefined;
    if (valid) {
      troops[i] = battleArray["troops" + i];
    }   
    //console.log(battleArray["troops" + i] !== undefined);
  };
  */
  // Takes out any empty elements
 // troops = troops.filter(function(){return true});

  // Create Title
  title = "<h1>" + evtInfo["title"] + "</h1>";

   // Create Start and End
  //date = "<h2>" + formatDate(battleArray["start"]) + "  to " + formatDate(battleArray["end"]) + "</h2>";
  date = "<h2>" + formatDate(currentDay, "long") + "</h2>";
  
  // Create Desc
  battleDesc = "<p>" + evtInfo["desc"] + "</p>";

  // // Determine Commanders
  // for (var i = 0; i <= troops.length; i++){
  //   var j = i + 1;
  //   commander = "commander" + j;
  //   if ( battleArray[commander] ) output += troops[i] + " Commander: " + battleArray[commander] + "<br />";
  //   if (i == troops.length) output += "<br />";
  // }

  // // Troop Sizes
  // for (var i = 0; i <= troops.length; i++){
  //   var j = i + 1;
  //   size = "size" + j;
  //   if ( battleArray[size] ) output += troops[i] + " Troops: " + battleArray[size] + "<br />";
  //   if (i == troops.length) output += "<br />";
  // }

  // // Troop Losses
  //   for (var i = 0; i <= troops.length; i++){
  //   var j = i + 1;
  //   if( troops[i] != undefined ) {
  //     output += troops[i] + " Losses: "
  //     output += "<ul>";
  //     dead = "dead" + j;
  //     if ( battleArray[dead] ) output += "<li> Dead: " + battleArray[dead] + "</li>";
  //     wound = "wound" + j;
  //     if ( battleArray[wound] ) output += "<li> Wounded: " + battleArray[wound] + "</li>";
  //     captured = "captured" + j;
  //     if ( battleArray[captured] ) output += "<li> Captured: " + battleArray[captured] + "</li>";
  //     troopComment = "troopComment" + j;
  //     if ( battleArray[troopComment] ) output += "<li>" + battleArray[troopComment] + "</li>";
  //     output += "</ul>";
  //   }
  // }

  // for (var i = 0; i <= troops.length; i++){
  //   var j = i + 1;
  //   if( troops[i] != undefined ) {
  //     output += troops[i] + " Losses: "
  //     output += "<ul>";
  //     dead = "dead" + j;
  //     if ( battleArray[dead] ) output += "<li> Dead: " + battleArray[dead] + "</li>";
  //     wound = "wound" + j;
  //     if ( battleArray[wound] ) output += "<li> Wounded: " + battleArray[wound] + "</li>";
  //     captured = "captured" + j;
  //     if ( battleArray[captured] ) output += "<li> Captured: " + battleArray[captured] + "</li>";
  //     troopComment = "troopComment" + j;
  //     if ( battleArray[troopComment] ) output += "<li>" + battleArray[troopComment] + "</li>";
  //     output += "</ul>";
  //   }
  // }
/*
  // Troop Table
  var headHtml = ""
    , deadHtml = ""
    , addDead = false
    , woundHtml = ""
    , addWound = false
    , capturedHtml = ""
    , addCaptured = false
    , tableOutput = "";

  if( troops[0] ){
    for (var i = 0; i < troops.length; i++){
      if( i == 0 ) headHtml = "<td></td>";
      headHtml += "<td>" + troops[i] + "</td>";
    }
    for (var i = 1; i <= troops.length; i++){
      if( i == 1 ) deadHtml = "<td>Dead</td>";
      if ( battleArray["dead"+i] ) {
        deadHtml += "<td>" + battleArray["dead"+i] + "</td>";
        addDead = true;
      } else deadHtml += "<td></td>";
    }
    for (var i = 1; i <= troops.length; i++){
      if( i == 1 ) woundHtml = "<td>Wound</td>";
      if ( battleArray["wound"+i] ) {
        woundHtml += "<td>" + battleArray["wound"+i] + "</td>";
        addWound = true;
      } else woundHtml += "<td></td>";
    }  
    for (var i = 1; i <= troops.length; i++){
      if( i == 1 ) capturedHtml = "<td>Captured</td>";
      if ( battleArray["captured"+i] ) {
        capturedHtml += "<td>" + battleArray["captured"+i] + "</td>";
        addCaptured = true;
      } else capturedHtml += "<td></td>";
    }

    //Create Table Rows
    tableContents = "<thead>" + headHtml + "</thead>";
    if( addDead ) tableContents += "<tr>" + deadHtml + "</tr>";
    if( addWound ) tableContents += "<tr>" + woundHtml + "</tr>";
    if( addCaptured ) tableContents += "<tr>" + capturedHtml + "</tr>";
    // Wrap Table
    tableOutput = "<table class='deaths' rules='none'>" + tableContents + "</table>"
  }

  output = battleArray["start"] + " _ " + battleArray["end"] + "<br /><br />";

  // // Determine Commanders
  // for (var i = 0; i <= troops.length; i++){
  //   var j = i + 1;
  //   commander = "commander" + j;
  //   if ( battleArray[commander] ) output += troops[i] + " Commander: " + battleArray[commander] + "<br />";
  //   if (i == troops.length) output += "<br />";
  //  }
 */
  output = "<div class='popBattle'><div class='popInner'>" + title + date + battleDesc + "</div></div>"; 
  // Removed + tableOutput until data is normalized 

  return output;
}

/**
* Create HTML for Docs Overlay Window
*
* @param docArray - array in data relating to current event
*
* @output output - string in html that is displayed in popover for documents evt.
*/
function evtDocHTML(docArray){
  //console.log(docArray);
  var title = "<h1>" + docArray.title + "</h1>";
  var date = "<h2>" + formatDate(currentDay, "long") + "</h2>";
  var docTrans = "<div class='popText'><p>" + docArray.docTrans + "</p></div>";
  var fullGalleryLink = "<p id='fullGallery'><a href='#documents'><img src='images/ui_galleries.png'>See All Documents</a></p>";

  // Create Image Group
  var images = "<img src=" + docArray.imgURL + " class='largeImage'/>";

  // Wrap Scroll Part - .popScroll
  var popScroll = "<div id='popScroll'>" + docTrans + images + "</div>";

  // Create inner Wrapper - .popInner
  var popInner = "<div class='popInner'>" + title + date + popScroll + fullGalleryLink + "</div>";

  // Create outer Wrapper - .popDoc
  var output = "<div class='popDoc'>" + popInner + "</div>";

  return output;
}

/**
* Create HTML for Image Overlay Window
*
* @param imgArray - array in data relating to current event'
*
* @output output - string in html that is displayed in popover for img evt.
*/
function evtImgHTML(imgArray){
  //console.log(docArray);
  var title = "<h1>" + imgArray.title + "</h1>";
  var date = "<h2>" + formatDate(currentDay, "long") + "</h2>";
  var imgDesc = "<p>" + imgArray.imgDesc + "</p>";
  var fullGalleryLink = "<p id='fullGallery'><a href='#images'><img src='images/ui_galleries.png'>See All Images</a></p>";
  var image = "<img src=" + imgArray.imgURL + " id='largeImage'/>";

  // Wrap Text Part - .popText
  var popText = "<div id='popText'>" + title + date + imgDesc + fullGalleryLink + "</div>";

  // Create inner Wrapper - .popInner
  var popInner = "<div class='popInner'>" + image + popText + "</div>";

  // Create outer Wrapper - .popImage
  var output = "<div class='popImage'>" + popInner + "</div>";

  return output;
}

/**
* Create HTML for Image Overlay Window
*
* @param factArray - array in data relating to current event'
*
* @output output - string in html that is displayed in popover for fact evt.
*/
function evtFactHTML(factArray){
  //console.log(docArray);
  var title = "<h1>" + factArray.title + "</h1>";
  var date = "<h2>" + formatDate(currentDay, "long") + "</h2>";
  var fact = "<p>" + factArray.fact + "</p>";
  //var fullGalleryLink = "<p id='fullGallery'><a href='#'><img src='images/ui_galleries.png'>See All Images</a></p>";
  var image = "<img src=" + factArray.imgURL + " id='largeImage'/>";

  // Create inner Wrapper - .popInner
  var popInner = "<div class='popInner'>" + title + date + fact + "</div>";
 
  // Create outer Wrapper - .popBattle
  var output = "<div class='popBattle'>" + popInner + "</div>";
 
  return output;
}


/**
* Show Different Map
*
* @param mapToDisplay - string of map name to make visible
*/
function switchMap(mapToDisplay){
  if( visibleMap != mapToDisplay ){
    //console.log(mapToDisplay);

    // Hide Current Layer
    prevLayer = visibleMap + "_" + currentDay;
    toggleLayerVis(prevLayer);

    // Set visibleMap variable
    visibleMap = mapToDisplay;

    // Remove Class for Active Map
    $('#mapSelect .mapLinks').removeClass('activeMapLink');

    // Turn on and off visibility of other maps
    $('.mapWrapper').not('#' + visibleMap).hide();
    $('#' + visibleMap).show();

    // Show current Layer
    setTimeout(function(){/*added this--ls*/
    
      troopLayerVis(mapName);
    
    }, 50);
    activeLayer = visibleMap + "_" + currentDay;
    toggleLayerVis(activeLayer);

    // Add Class to Active Map in Related Link
    var relatedLink = $("#mapSelect .mapLinks[data-ref='" + visibleMap + "']");
    relatedLink.addClass('activeMapLink');

    // Create Layer Links
    createLayerLinks();
  }
}

/**
* Creates Available Map Links for Active Phase
*
*/
function createMapLinks(){
  var output = "", 
    links = "",
    activeClass = "";

  $.each( mapType[currentPhase], function(index, value) {
    // Check for mapOverideLabel name
    if (mapType['mapOverideLabels'][value] != undefined) mapDisplayName = mapType['mapOverideLabels'][value];
    else mapDisplayName = value.charAt(0).toUpperCase() + value.slice(1);

    // Determine if this is the active Map
    if( value == visibleMap ) activeClass = " activeMap";
    else activeClass = "";

    // Create HTML
    var a = "<a href='#' class='mapLinks" + activeClass + "' data-ref='" + value + "'>" + mapDisplayName + "</a>";
    links += "<li id='sel" + value + "' class='map_choice'>" + a + "</li>";
  });
  output = "<ul>" + links + "</ul>";

  // clear old links, and then add new links to the options
    // Turn off because we do not have multiple maps
  $('#map_options .hdr_option1').empty();
  
  // Two Sizes for Additional Map Phases
  if (mapType[currentPhase]['additional1'] != undefined) {
    $('#map_options .hdr_option1').append( output );

    if (optionTabs['options'] == true) {
      $('#map_options .transBackground').stop().animate({height:'210px'}, 10, function(){
        mapOptions.show();
      });
    }
  } else if (optionTabs['options'] == true) {
      $('#map_options .transBackground').stop().animate({height:'150px'}, 10, function(){
        mapOptions.show();
      });
  }
}

/**
* Creates Available Layer Links to turn layers on or off
*
*/
function createLayerLinks(){
  var output = "", 
    links = "";

  $.each( mapType[visibleMap], function(index, value) {
    var checked ="";
    // Only get layers that are not the background
    if( index != "bg" && index != "Commanders"){
      // Find OpenLayer Object

      allLayers[value].setVisibility(false);

      var layerVisible = allLayers[value].getVisibility();
      //currentLayer = maps[visibleMap].layers[value];

      // Check to see if layer is on
      if( visOptLayers.length && visOptLayers.indexOf(value) !== -1 ) {
        checked = "checked='checked' ";
        // Change Visibility
        allLayers[value].setVisibility(true);
      }

      // Determine if there is an overide name in data
      if (mapType['layerOverideLabels'][index] != undefined) displayLayerName = mapType['layerOverideLabels'][index];
      
      else displayLayerName = index;
      // HTML of Link
      links += "<li id='sel" + value + "'><input type='checkbox' value='" + value + "' " + checked + "/>" + displayLayerName + "</li>";
    }
  });
  output = "<ul>" + links + "</ul>";

  // clear old links, and then add new links to the options
  $('#map_options .hdr_option2').empty();
	$('#map_options .hdr_option2').append( output );
}

/**
* Show Different Map
*
* @param mapToDisplay - string of map name to make visible
*/
function toggleLayerVis(layerName){
  //console.log('----- Layer ----- : ' + layerName)
  // Check for current visibility
  //var layerID = allLayerNames[layerName];
  // var layerVisible = maps[visibleMap].getLayer(layerName).getVisibility();
  if(allLayers[layerName] !== undefined){
    // Get current visability state
    var layerVisible = allLayers[layerName].getVisibility();

    if( layerVisible ) allLayers[layerName].setVisibility(false);
    else allLayers[layerName].setVisibility(true);
  }

  // Change Map Label
  displayMapTitle();
}

/**
* Make all troop layer invisible
*
* @param mapToDisplay - string of map name to make visible
*/
function troopLayerVis(mapName){
  var layerName = mapName + "_" + currentDay;

  for(var j = 0; j < troopLayers[mapName].length; j++){
    // Break if more than 110
    if (j > 110) break;
    var layerObj = troopLayers[mapName][j]

    // Turn on only the current layer day
    if( layerObj.name != layerName ){
      layerObj.setVisibility(false);
    }else layerObj.setVisibility(true);
  }
  //console.log(j);

  // Change Map Label
  displayMapTitle();
}

/**
* Display Map Date & Name
*
*/
function displayMapTitle(){
  date = formatDate(currentDay, 'long');
  mapDisplayName = visibleMap.charAt(0).toUpperCase() + visibleMap.slice(1);
  $('#mapLabel').html("<h2>" + date + "</h2");
  // with mapLabel subtitle -- $('#mapLabel').html("<h2>" + date + " <br /> <span class='subTitle'>" + mapDisplayName + "</span></h2");

}

/**
 * Any click on Zoom
 * Currently not in use
 */
function zoomClick(elem){
  className = elem.buttonElement.className.split(" ");
  for (var i = className.length - 1; i >= 0; i--) {
    //alert(className[i]);
    if( className[i] === "olControlZoomOut" ) {
      windowResize();
    }
  };
  
  //console.log('-------- Zoom Click --------');
  // console.log(elem);
  // Redraw all layers
  // console.log(visibleMap);
  // console.log(currentDay);
  // console.log(allLayers);
  //console.log(typeof(allLayers));
  var pattern = /\_\d{1,2}\_\d{1,2}$/g;

  // Get Active Layer Position
  // var transLayer = allLayers[visibleMap + '_' + currentDay];
  // console.log(transLayer);
  // var transX = transLayer["tile"]["position"]["x"];
  // console.log('X: ', transX);
  // var transY = transLayer["tile"]["position"]["y"];
  // console.log('Y: ', transY);
  // Iterate through all layers
  for(layer in allLayers){
    // Check if it is a layer in the visible map
    if( layer.indexOf(visibleMap) != -1 ){
      // Adjust layers that associated to dates
      if( pattern.test(layer) ) {
        //console.log('Pass Pattern:', layer);
        //allLayers[layer]["tile"]["position"]["x"] = transX;
        //allLayers[layer]["tile"]["position"]["y"] = transY; 
        //console.log( allLayers[layer]["tile"]["position"]["x"] );       
        //allLayers[layer].moveTo(0,0);
        if( layer != visibleMap + "_" + currentDay) delete allLayers[layer];
      }
      // if( layer != visibleMap + '_background' 
      //   && layer != visibleMap + '_poli'
      //   && layer != visibleMap + '_Markers'  ){
           // console.log(layer);
      //     console.log('------------------');
      //     console.log(allLayers[layer]);
      // }
    }
  }
  //console.log(allLayers);
}