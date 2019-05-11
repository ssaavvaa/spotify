import React from 'react';
import './Track.css';
import {styles} from "../../Fonts_styles/font_styles"



const PlayListTrack = props => {

  return (

<div className="Track_PL_Wrapper">
    <div>
       <h3 style ={{
                     fontFamily:styles.fonts.main}}>
                     {props.name}
       </h3>
       <p style ={{  fontFamily:styles.fonts.main}}>
                     {props.artist} | {props.album}
        </p>
    </div>
   <i className="material-icons remove_item" onClick = {props.onRemove.bind(this,props.id)}>
      maximize
   </i>
</div>)
}




  export default PlayListTrack ;