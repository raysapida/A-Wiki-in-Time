import React from 'react';
import SliderStartYr from '../components/SliderStartYr';
import SliderEndYr from '../components/SliderEndYr';
import SliderRadius from '../components/SliderRadius';
import styles from '../styles';
import ReactDOM from 'react-dom';

var PropTypes = React.PropTypes;

var easter_egg = new Konami(function() { alert('Konami Code!')});

function SubmitForm(props){
    return(

        <div className="col-sm-6 col-sm-offset-3 text-center" >
          <form onSubmit={props.onFormSubmit}>
            <div className="form-group">
              <select className="form-control" name="type">
                <optgroup>
                <option value="battles">Battles</option>
                <option value='archaeological_sites'>Archaeological Sites</option>
                <option value='assassinations'>Assassinations</option>
                <option value='natural_disasters'>Natural Disasters</option>
                <option value='explorers'>Explorers</option>
                <option value='other'>All Types</option>
                </optgroup>
              </select>
              <br /><br />
              <SliderStartYr />
              <SliderEndYr />
              <SliderRadius />
              <input id='polygon-input' type='hidden' name='polygon' value={googlePoly} />
              <input id='lat-input' type='hidden' name='lat' value={googleLat} />
              <input id='long-input' type='hidden' name='long' value={googleLng} />
                <div id='polygon-group' className="row">
                 <button id='polygon-mode' className="btn">Polygon Mode</button>
                 <button id='reset-button' className="btn">Reset</button>
                 <input id='submit-button'
                   className="btn btn-block btn-success btn-lg"
                   type="submit" value="Submit" />
              </div>
            </div>
            <div className="form-group row">
            </div>
          </form>
        </div>

    )
}


SubmitForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired
}

module.exports = SubmitForm;
