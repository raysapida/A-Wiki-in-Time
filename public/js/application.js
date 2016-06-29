var konami = false;

var map;
var styleArray = [];
var myLatLng = {lat: 32.866756, lng: -83.469486};
var mostRecentInfoWindow;
var markers = [];
var styleArray = [
{
  "featureType": "administrative",
  "elementType": "all",
  "stylers": [
  {
    "visibility": "off"
  }
  ]
},
{
  "featureType": "poi",
  "elementType": "all",
  "stylers": [
  {
    "visibility": "simplified"
  }
  ]
},
{
  "featureType": "road",
  "elementType": "labels",
  "stylers": [
  {
    "visibility": "simplified"
  }
  ]
},
{
  "featureType": "water",
  "elementType": "all",
  "stylers": [
  {
    "visibility": "simplified"
  }
  ]
},
{
  "featureType": "transit",
  "elementType": "all",
  "stylers": [
  {
    "visibility": "simplified"
  }
  ]
},
{
  "featureType": "landscape",
  "elementType": "all",
  "stylers": [
  {
    "visibility": "simplified"
  }
  ]
},
{
  "featureType": "road.highway",
  "elementType": "all",
  "stylers": [
  {
    "visibility": "off"
  }
  ]
},
{
  "featureType": "road.local",
  "elementType": "all",
  "stylers": [
  {
    "visibility": "on"
  }
  ]
},
{
  "featureType": "road.highway",
  "elementType": "geometry",
  "stylers": [
  {
    "visibility": "on"
  }
  ]
},
{
  "featureType": "water",
  "elementType": "all",
  "stylers": [
  {
    "color": "#84afa3"
  },
  {
    "lightness": 52
  }
  ]
},
{
  "featureType": "all",
  "elementType": "all",
  "stylers": [
  {
    "saturation": -17
  },
  {
    "gamma": 0.36
  }
  ]
},
{
  "featureType": "transit.line",
  "elementType": "geometry",
  "stylers": [
  {
    "color": "#3f518c"
  }
  ]
}
]

var updateTextInput = function (val) {
  $('#textInput').empty();
  if (val >= 0) {
    $('#textInput').append('<strong>' + val + ' AD</strong>');
  } else {
    $('#textInput').append('<strong>' + val*-1 + ' BC</strong>');
  }
}
function initMap() {
  var markerSpot;
  map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 4,
    styles: styleArray
  });

  var infoWindow = new google.maps.InfoWindow({map: map});

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      markerSpot = pos;

      infoWindow.setPosition(pos);
      infoWindow.setContent('Drag and Drop to print lat/lng to console and to infoWindow.');
      mostRecentInfoWindow = infoWindow;
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
    myLatLng = {lat: 37.784580, lng: -122.397437};
  }



  var image_path = '/../front-end/public/images/google_maps_markers/blue_MarkerA.png'
  marker = new google.maps.Marker({
    // position: map.getCenter(),
    position: myLatLng,
    map: map,
    draggable: true,
    icon: image_path


  });
  $('#lat-input').val(myLatLng.lat);
  $('#long-input').val(myLatLng.lng);

  google.maps.event.addListener(marker, 'dragend', function (event) {
    var lat = event.latLng.lat();
    var long = event.latLng.lng();
    var latlng = {lat: lat, lng: long};
    updateWindow(map, marker, latlng);
    $('#lat-input').val(lat);
    $('#long-input').val(long);
    console.log(latlng);

  });

  map.addListener('mouseover', function() {
    if (!!mostRecentInfoWindow) {
      mostRecentInfoWindow.close();
    }
  })
}

var updateWindow = function (map, marker, latlng) {
  mostRecentInfoWindow.close();
  var infoWindow = new google.maps.InfoWindow({
    content: "Latitude: " + latlng.lat + "<br>Longitude: " + latlng.lng
  })
  // mostRecentInfoWindow = infoWindow;
  marker.addListener('click', function() {
    infoWindow.open(map, marker);
    window.setTimeout(function () {
      infoWindow.close();
    }, 2000)
  })
  infoWindow.open(map, marker);
  window.setTimeout(function () {
    infoWindow.close();
  }, 2000)
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geoloction.');
}

function addMarkerWithTimeout(position, timeout, battle) {
  window.setTimeout(function() {
    var marker = new google.maps.Marker({
      position: position,
      map: map,
      animation: google.maps.Animation.DROP
    })
    markers.push(marker);

    var infoWindow = new google.maps.InfoWindow({
      content: "<strong>Title:</strong> " + battle.title + "<br><strong>Description: </strong>" + battle.description + "<br><strong>Date:</strong> " + battle.end_time + "<br><strong>Wiki URL:</strong> <a href=" + battle.link + " target='_blank'> " + battle.link + "</a>"
    })
    mostRecentInfoWindow = infoWindow;
    marker.addListener('click', function() {
      mostRecentInfoWindow.close();
      infoWindow.open(map, marker);

      // mostRecentInfoWindow = infoWindow;
    })

  }, timeout);
}
function newAddMarkerWithTimeout(position, timeout, battle) {
  var colors = ['blue', 'brown', 'darkgreen', 'green', 'orange', 'paleblue', 'pink', 'purple', 'red', 'yellow']
  var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

  var iconString = colors[Math.floor ( Math.random() * colors.length )] + '_Marker' + letters[Math.floor ( Math.random() * letters.length )] + '.png'
  var randomIconPath = '/../front-end/public/images/google_maps_markers/' + iconString
  var yoshiIconPath = '/../front-end/public/images/small_yoshis.png'
  var iconPath;

  if (battle.event_type == 'battle') {
    iconPath = yoshiIconPath;
  } else {
    iconPath = randomIconPath;
  }

  if (konami == false) {
    iconPath = randomIconPath
  }

  window.setTimeout(function() {
    var marker = new google.maps.Marker({
      position: position,
      map: map,
      animation: google.maps.Animation.DROP,
      icon: iconPath
    })


    markers.push(marker);
    var adjusted_scraped_date
    if (battle.scraped_date < 0) {
      adjusted_scraped_date = (battle.scraped_date*-1).toString() + ' BC'
    } else {
      adjusted_scraped_date = battle.scraped_date
    }
    var infoWindowContent;
    if (battle.scraped_date) {
      infoWindowContent = "<strong>Title:</strong> " + battle.title + "<br><strong>Description: </strong>" + battle.description + "<br><strong>Date:</strong> " + adjusted_scraped_date + "<br><strong>Wiki URL:</strong> <a href=" + battle.event_url + " target='_blank'> " + battle.event_url + "</a>"
    } else {
      infoWindowContent = "<strong>Title:</strong> " + battle.title + "<br><strong>Description: </strong>" + battle.description + "<br><strong>Wiki URL:</strong> <a href=" + battle.event_url + " target='_blank'> " + battle.event_url + "</a>"
    }
    var infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    })
    mostRecentInfoWindow = infoWindow;
    marker.addListener('click', function() {
      mostRecentInfoWindow.close();
      infoWindow.open(map, marker);
      mostRecentInfoWindow = infoWindow;
    })

  }, timeout);
}
function addArchaeologyMarkerWithTimeout(position, timeout, site) {
  window.setTimeout(function() {
    var marker = new google.maps.Marker({
      position: position,
      map: map,
      animation: google.maps.Animation.DROP
    })
    markers.push(marker);

    var infoWindow = new google.maps.InfoWindow({
      content: "<strong>Title:</strong> " + site.title + "<br><strong>Wiki URL:</strong> <a href=" + site.link + " target='_blank'> " + site.link + "</a>"
    })
    mostRecentInfoWindow = infoWindow;
    marker.addListener('click', function() {
      mostRecentInfoWindow.close();
      infoWindow.open(map, marker);
      mostRecentInfoWindow = infoWindow;
    })

  }, timeout);
}

function clearMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

$(document).ready(function() {


  $('#wiki-header').hover(function() {
    $(this).addClass('magictime perspectiveUpRetourn')
    // setTimeout(function(){
    //   $(this).removeClass('magictime perspectiveUpRetourn');
    // }, 3000)
  });

  $('#map-container').hover(function() {
    $('#wiki-header').removeClass('magictime perspectiveUpRetourn')
  })

 //
  var easter_egg = new Konami();
  easter_egg.code = function() {
    alert('Konami Code!');
    konami = true;
  }
  easter_egg.load();

  $('#submit-button').on('click', function(event) {

    event.preventDefault();
    var data = $('#input-data').serialize();
    console.log(data);
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/query',
      data: data

    }).done(function(response) {
      if (!!response.error) {
        console.log(response);
      } else {
        clearMarkers();
        events_array = response.events
        for (i = 0; i < events_array.length; i++) {
          var event = events_array[i]
          var coordinates = {lat: event.latitude, lng: event.longitude}
          newAddMarkerWithTimeout(coordinates, i*(4000/events_array.length), event)

        }
        // var qids = response[0].qids
        // var type = response[0].type
        // clearMarkers();
        // for (i = 1; i < response.length; i++) {
        //   var event = response[i][qids[i-1]];
        //   var coordinates = {lat: event.latitude, lng: event.longitude};

        //   if (type == 'battles') {
        //     addMarkerWithTimeout(coordinates, i*400, event);
        //   } else {
        //     addArchaeologyMarkerWithTimeout(coordinates, i*400, event);
        //   }
        // }
      }
    })
  })
})




