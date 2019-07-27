import React     from 'react';
import {styles}  from "../../Fonts_styles/font_styles"


const CounterAndAnimation = props => {
    return (
        <React.Fragment>
          <span id="bottomPageFixedTracksCounter">{props.counter}</span>
          <div id="loading_animation">
             <div id="loading-text" style = {{fontFamily:styles.fonts.main}}>LOADING</div>
             <div id="loading-content"></div>
          </div>
        </React.Fragment>
    )
}

export default CounterAndAnimation