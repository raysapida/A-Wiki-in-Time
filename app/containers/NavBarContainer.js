'use strict';

import React from 'react';
import styles from '../styles';
let { Component } = React;

export default class NavBarContainer extends Component{
  render(){
    return(
      <nav className="navbar">
          <div id='header'>
            {React.cloneElement(this.props.children)}
            <div id="title">
            <span className='header-div'><a href='/'>A </a></span>
            <span className='header-div' id='wiki-header'><a href='/'>Wiki</a></span>
            <span className='header-div'><a href='/'>in </a></span>
            <span className='header-div'><a href='/'>Time</a></span>
            </div>
        </div>
      </nav>
    )
  }
}
