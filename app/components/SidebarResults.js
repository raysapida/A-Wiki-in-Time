import React from 'react';
import searchMarker from '../images/search-marker.png';
import battleMarker from '../images/event-marker-1.png';
import assassinationMarker from '../images/event-marker-2.png';
import siegeMarker from '../images/event-marker-3.png';
import explorerMarker from '../images/event-marker-4.png';
import disasterMarker from '../images/event-marker-5.png';
import archMarker from '../images/event-marker-6.png';

var SidebarResults = React.createClass({

  getInitialState() {
    return {
      openInstructions: true,
    }
  },

  showQueryResults() {
    this.setState({openInstructions: false})
  },

  showInstructions() {
    this.setState({openInstructions: true})
  },

  render: function(){
    if (this.state.openInstructions){
      return (
            <ul className="list-unstyled">
              {this.props.queryResults.map(function(event) {
                return (
                  <li key={event.qID} className="card-info">
                    <div className="card card-block">
                      <h4 className="card-title">{event.title}</h4>
                      <span> Latitude: {(event.latitude).toFixed(2)} -- Longitude: {(event.longitude).toFixed(2)} </span>
                      <br/>
                      <a href={event.event_url} target="_blank">Read More Here</a>
                      <p className="card-text">{event.description}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
      )
    }
    return (
      <div id="instructions-content">
        <h3>Instructions</h3>
        <ol>
          <li>Drag the initial marker anywhere on the map to start => <img src={searchMarker} /></li>
          <li>Choose a type of event you would like to see</li>
          <li>Choose the start and end years to search within a time period</li>
          <li>Choose a radius in which you would like to see the events</li>
          <li>Click submit button to see your results represented by pins</li>
          <li>Click on pins to get the info and links to Wikipedia article</li>
          <li>Click on search results to get a list of all the events</li>
          <p className="attention"> ***Polygon Mode*** </p>
          <li>Click on a polygon button as an alternative to selecting radius</li>
          <li>Drag anywhere on the map and click submit</li>
        </ol>
        <h3>Legend:</h3>
        <ul>
          <li><img src={battleMarker} /> - Battles Marker</li>
          <li><img src={assassinationMarker} /> - Assassinations Marker</li>
          <li><img src={siegeMarker} /> - Sieges Marker</li>
          <li><img src={explorerMarker} /> - Explorers Marker</li>
          <li><img src={disasterMarker} /> - Natural Disasters Marker</li>
          <li><img src={archMarker} /> - Archaeological Sites Marker</li>
        </ul>
      </div>
    )
  }
})

module.exports = SidebarResults;
