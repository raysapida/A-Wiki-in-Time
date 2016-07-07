import React from 'react';
var PropTypes = React.PropTypes;
var reactNativeBootstrapSliderObj = require('react-bootstrap-native-slider');
var ReactNativeBootstrapSlider = reactNativeBootstrapSliderObj.ReactNativeBootstrapSlider;
// var reactBootstrapSliderObj = require("react-bootstrap-slider");
// var ReactBootstrapSlider = reactBootstrapSliderObj.ReactBootstrapSlider;
var SliderStartYr = React.createClass({
  getInitialState(){
    var today = new Date();
    var year = today.getFullYear();
    return {
      currentValue: 100,
      step: 1,
      max: year,
      min: -2000,
      range: true
    }
  },
  handleUpdateValue(e) {
    this.setState({ currentValue: e.target.value });
  },

  componentDidMount: function(){
    // componentDidMount is called by react when the component
    // has been rendered on the page. We can set the interval here:
  },

  componentWillUnmount: function(){
    // This method is called immediately before the component is removed
    // from the page and destroyed. We can clear the interval here:
    // clearInterval(this);
  },

  render(){
    var newValue = this.state.currentValue;
    var startYear = function(){
      if (newValue < 0) {
      return "Start Year: " + Math.abs(newValue) + " BC"
      } else {
      return "Start Year: " + Math.abs(newValue) + " AD"
      }
    }; 

    return(
      <div id="slider-details" >
        <ReactNativeBootstrapSlider
        value={this.state.currentValue}
        handleChange={this.handleUpdateValue}
        step={this.state.step}
        max={this.state.max}
        min={this.state.min} />
      <b style={{float: 'left'}}>{Math.abs(this.state.min)} BC</b>
      <b style={{float: 'right'}}>{this.state.max} AD</b>
        <div style={{fontSize: '1.5em', fontFamily: 'Raleway', marginLeft: '2%', marginTop: '10px', marginBottom: '15px'}}>
          {startYear()}
        </div>
       <input ref="sliderStart" type="hidden" value={newValue} name="start_year"/>
      </div>
    )
  }
})

module.exports = SliderStartYr;
