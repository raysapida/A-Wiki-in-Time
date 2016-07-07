import React from 'react';
import searchMarker from '../images/search-marker.png';
import battleMarker from '../images/event-marker-1.png';
import assassinationMarker from '../images/event-marker-2.png';
import siegeMarker from '../images/event-marker-3.png';
import explorerMarker from '../images/event-marker-4.png';
import disasterMarker from '../images/event-marker-5.png';
import archMarker from '../images/event-marker-6.png';

window.bermudaTriangle = {};
window.googleLat = 37.784580;
window.googleLng = -122.397437;
window.googlePoly = '';

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


// var state = { zoom: 4, styles: styleArray};

var Gmap = React.createClass({
  getInitialState: function(){
    return {
      zoom: 4,
      styles: styleArray,
      mostRecentInfoWindow: { close: function(){} },
      mostRecentMarkerWindow: { close: function(){} },
      eventMarkers: [],
      minZoom: 4,
      map: {}
    };
  },

  render: function() {
    var gMapStyles = {
      height: '70%',
      width: '99%',
      margin: '0px auto'
    }

    var gMapCanvasStyles = {
      height: '100%',
      width: '100%',
      margin: '0px auto',
      background: 'transparent'
    }
    return (
      <div className="GMap" style={gMapStyles}>
        <div className='GMap-canvas' ref="mapCanvas" style={gMapCanvasStyles}>
          Loading map ...
        </div>
      </div>
    )},

    componentDidMount: function() {
      this.map = this.createMap()
      this.marker = this.createDraggableMarker();
      // this.infoWindow = this.createInfoWindow();
      var that = this;

      google.maps.event.addListener(this.map, 'zoom_changed', function(){
        that.handleZoomChange()
      });

      google.maps.event.addListener(this.marker, 'dragend', function (event) {
        var lat = event.latLng.lat();
        var long = event.latLng.lng();
        var latlng = {lat: lat, lng: long};
        googleLat = lat;
        googleLng = long;
        that.clearEventMarkers(that.state.eventMarkers);
        that.props.onUpdate();
        this.infoWindow = that.createInfoWindow(latlng);
      });

      var quadCoords = [
        {lat: 25.774, lng: -80.190},
        {lat: 18.466, lng: -66.118},
        {lat: 32.321, lng: -64.757},
        {lat: 25.774, lng: -80.190}
      ]

      bermudaTriangle = new google.maps.Polygon({
        paths: quadCoords,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        draggable: true,
        geodesic: true,
        editable: true
      });
      bermudaTriangle.setMap(null);

      $('#reset-button').on('click', function(event) {
        event.preventDefault();
        bermudaTriangle.setMap(null);
        $('#polygon-mode').removeClass('red')
        that.clearEventMarkers(that.state.eventMarkers);
        bermudaTriangle = new google.maps.Polygon({
          paths: quadCoords,
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          draggable: true,
          geodesic: true,
          editable: true
        });
        if (googlePoly === 'true') {
          bermudaTriangle.setMap(that.state.map);
        }
        that.props.onUpdate();
      })

      $('#polygon-mode').on('click', function(event) {
        event.preventDefault();
        that.clearEventMarkers(that.state.eventMarkers);
        if (googlePoly === ''){
          googlePoly = 'true';
          bermudaTriangle.setMap(that.state.map);
          $('#polygon-mode').addClass('btn-warning')
        } else {
          googlePoly = ''
          bermudaTriangle.setMap(null);
          $('#polygon-mode').removeClass('btn-warning')
        }
        that.props.onUpdate();
      })

    },

    componentDidUnMount: function() {
      google.maps.event.clearListeners(map, 'zoom_changed')
    },

    createMarkersArray: function(events) {
      this.clearEventMarkers(this.state.eventMarkers);
      var that = this;
      var eventMarkers = [];
      events.forEach(function(event) {
        var marker = that.newAddMarkerWithTimeout({lat: event.latitude, lng: event.longitude}, 1000, event)
        eventMarkers.push(marker);
      })
      this.setState({eventMarkers: eventMarkers});
    },

    clearEventMarkers: function(eventMarkers) {
      eventMarkers.forEach(function(marker) {
        marker.setMap(null);
        marker.visible = false;
      })
      this.setState({eventMarkers: []});
    },

    newAddMarkerWithTimeout: function(position, timeout, battle) {
      var that = this;
      var icon;

      switch (battle.event_type) {
        case "battle":
          icon = battleMarker;
          break;
        case "archaeological site":
          icon = archMarker;
          break;
        case "explorer":
          icon = explorerMarker;
          break;
        case "earthquake":
        case "tornado":
        case "volcano":
          icon = disasterMarker;
          break;
        case "assassination":
          icon = assassinationMarker;
          break;
        case "siege":
          icon = siegeMarker;
          break;
        default:
          icon = searchMarker;
      }


      this.state.mostRecentInfoWindow.close();
      // var mark;
      var marker = new google.maps.Marker({
        position: position,
        map: that.state.map,
        animation: google.maps.Animation.DROP,
        icon: icon
      })
      window.setTimeout(function() {
        var adjusted_scraped_date;
        if (battle.scraped_date < 0) {
          adjusted_scraped_date = (battle.scraped_date*-1).toString() + ' BC'
        } else {
          adjusted_scraped_date = battle.scraped_date
        }

        if (adjusted_scraped_date === null) {
          var infoWindow = new google.maps.InfoWindow({
            content: "<strong>Title:</strong> " + battle.title + "<br><strong>Description: </strong>" + battle.description + "<br><strong>Wiki URL:</strong> <a href=" + battle.event_url + " target='_blank'> " + battle.event_url + "</a>"
        })
        } else {
        var infoWindow = new google.maps.InfoWindow({
          content: "<strong>Title:</strong> " + battle.title + "<br><strong>Description: </strong>" + battle.description + "<br><strong>Date:</strong> " + adjusted_scraped_date + "<br><strong>Wiki URL:</strong> <a href=" + battle.event_url + " target='_blank'> " + battle.event_url + "</a>"
        })
        }
        marker.addListener('click', function() {
          that.state.mostRecentMarkerWindow.close();
          infoWindow.open(that.map, marker);
          that.setState({mostRecentMarkerWindow: infoWindow});
        })

      }, timeout);
      return marker;
    },

    createMap: function() {
      var mapOptions = {
        zoom: this.state.zoom,
        center: this.mapCenter(),
        styles: this.state.styles
      }
      var map = new google.maps.Map(this.refs.mapCanvas, mapOptions)
      this.setState({map: map})
      return map
    },

    mapCenter: function() {
      return new google.maps.LatLng(
        this.props.initialCenter.lat,
        this.props.initialCenter.lng
      )
    },

    createMarker: function(coordinates) {
      var marker = new google.maps.Marker({
        position: coordinates,
        map: this.map
      })

      return marker
    },

    createDraggableMarker: function() {
      return new google.maps.Marker({
        position: this.mapCenter(),
        map: this.map,
        draggable: true,
        icon: searchMarker
      })
    },

    fakeRequest: function() {

    },

    createInfoWindow: function(latlng) {
      this.state.mostRecentInfoWindow.close()
      var contentString = "Latitude: " + latlng.lat + "<br>Longitude: " + latlng.lng
      var infoWindow = new google.maps.InfoWindow({
        map: this.map,
        anchor: this.marker,
        content: contentString
      })
      this.setState({ mostRecentInfoWindow: infoWindow });
      return infoWindow;
    },

    handleZoomChange: function() {
      this.setState({
        zoom: this.map.getZoom()
      })
    },

});

module.exports = Gmap;
