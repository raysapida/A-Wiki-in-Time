jest.unmock('../Gmap');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Gmap from '../Gmap';

describe('Gmap', () => {
  it('renders the component', () => {
    let initialCenter = {lat: 37.784580, lng: -122.397437};

    window.$ = function() {
      return {
        on: function(){}
      }
    }
    window.google = {
      maps: {
        Geocoder: function() {},
        GeocoderLocationType: {},
        GeocoderStatus: {},
        InfoWindow: function() {},
        LatLng: function() {},
        LatLngBounds: function() {},
        Map: function () {
          return {
            setTilt: function () { },
            mapTypes: {
              set: function () { }
            },
            overlayMapTypes: {
              insertAt: function () { },
              removeAt: function () { }
            }
          };
        },
        Marker: function() {},
        MarkerImage: function() {},
        Point: function() {},
        Polygon: function() {
          return {
            setMap: function() {}
          }
        },
        event: {
          addListener: function () { }
        }
      }
    };

    const gmap = TestUtils.renderIntoDocument(
      <Gmap initialCenter={initialCenter} onUpdate={() => {}}/>
    );

    const gmapNode = ReactDOM.findDOMNode(gmap);

    expect(gmapNode.textContent).toEqual('Loading map ...');

  });
});
