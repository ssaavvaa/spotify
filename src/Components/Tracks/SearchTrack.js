import React from 'react';
import './Track.css';
import {styles} from "../../Fonts_styles/font_styles"
import $ from 'jquery'; 


let switchToListen = event => {
  $(event.currentTarget).siblings(".frameTrack").slideToggle()
}


const SearchTrack = props => {

  let extractUri = props.uri.match(/track:([^&]*)/)[1]
  return (
  <div className="Track">
      <div className="frameTrack">
         <iframe title="listenTrack" src={`https://open.spotify.com/embed/track/${extractUri}`}   frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
     </div>

    <div className="Track_info-cover">

             <h3 style ={{
                     fontFamily:styles.fonts.main}}>
                     {props.name}
             </h3>
             <p style ={{color:styles.colors.font_main,
                     fontFamily:styles.fonts.main}}>
                     {props.artist} | {props.album}
             </p>
    
    </div>
          <img  className = "track_image" src = {props.img} alt={props.id} />
          <img src ="./add.svg" alt="addButton" className="button_AddTrack" onClick = {props.onAdd.bind(this,props.id)} />
          <img src ="./ddd.png" alt = "playButton" className="button_Listen" onClick = {switchToListen} />
          <div className = "success">
             <img className="success_image" alt={props.img} src = "./img_319605.png"/>
          </div>

 </div>
 
  );
  

}


  export  default SearchTrack ;