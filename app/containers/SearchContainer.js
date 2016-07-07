import React from 'react';
import SubmitForm from '../components/SubmitForm';
import axios from 'axios';
var PropTypes = React.PropTypes;

var SearchContainer = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var that = this;
    var data = $('form').serialize();
    axios({
      method: 'post',
      url: 'https://a-wiki-in-time-backend.herokuapp.com/query',
      data: data
    }).then(function(response){
      if (!!response.error) {
        console.log('err', response);
      } else {
        console.log('success', response);
        if (response.data.polygon == true) {
          var events = []
          var events_array = response.data.events
          for (i = 0; i < events_array.length; i++) {
            var event = events_array[i]
            var coordinates = {lat: event.latitude, lng: event.longitude}

            var g_coordinates = new google.maps.LatLng(event.latitude, event.longitude)
            if (google.maps.geometry.poly.containsLocation(g_coordinates, bermudaTriangle) == true) {
              events.push(event);
            }
          }
        } else {
          var events = [];
          var events_array = response.data.events;
          for (var i = 0; i < response.data.events.length; i++) {
            var event = events_array[i]
            var coordinates = {lat: event.latitude, lng: event.longitude};
              events.push(event);
          }
        }
        that.props.onUpdate(events)
      }
    }).catch(function(err) {
      console.log('fail', err)
    })
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentDidUpdate() {

  },

  queryAgain() {
    this.setState({hasQueried: false})
  },


  render(){
    return (
      <SubmitForm
        onFormSubmit={this.handleSubmit} />
    )
  }
});

SearchContainer.propTypes = {
  onUpdate: PropTypes.func.isRequired
}

module.exports = SearchContainer;
