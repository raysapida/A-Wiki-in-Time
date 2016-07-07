// jest.unmock('../app/components/Gmap');
//
// import React from 'react';
// import ReactDOM from 'react-dom';
// import TestUtils from 'react-addons-test-utils';
// import Gmap from '../app/components/Gmap';
//
// describe('Gmap', () => {
//   it('renders the component', () => {
//     let initialCenter = {lat: 37.784580, lng: -122.397437};
//     let google = {};
//     // <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCj9yUP6BgnHAX-qFkkEQDmgce9hB_vpuo"></script>
//     const gmap = TestUtils.renderIntoDocument(
//       <Gmap initialCenter={initialCenter} ref="map" onUpdate={() => {}}/>
//     );
//
//     const gmapNode = ReactDOM.findDOMNode(gmap);
//
//     expect(gmapNode.textContent).toEqual('Off');
//
//   });
// });
