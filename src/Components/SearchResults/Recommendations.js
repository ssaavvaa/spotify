import React           from 'react';
import './recommendations.css';
import search_tracks   from "../../Reducers/Actions/search_tracks"
import {connect}       from 'react-redux'
import $               from 'jquery'; 



const Recommendations = props => {

  function recommendSearch(name){
    $("#loading_animation").show()
      window.scrollTo({top: 0,behavior: 'smooth'});
       setTimeout(() => {
          props.search_tracks(name,props.playListTracks)
        }, 300);
  }

    return ( <section className="rec_wrapper">
                        <h2 className="rec_heading">Other Artists you might like</h2>
                        <div className ="rec_artists-wrapper">
                             {props.recommendations.map(track => (
                             <div key = {track.name} onClick={recommendSearch.bind(this,track.name)} className="rec_artist">
                                 <p className="rec_artist-name">{track.name}</p>
                                 <img className="rec_artist-img" alt ={track.name} src = {track.img}/>
                             </div>)
                             )}
                         </div>
             </section>)
}



function mapStateToProps(state){
    return {
        playListTracks:state.tracks.playListTracks,
        recommendations:state.tracks.recommendations
    }
  }

function mapDispatchToProps(dispatch){
    return{
        search_tracks:(value,playListTracks)=>{
          dispatch(search_tracks(value,playListTracks))
      },
 }
}

  export default connect(mapStateToProps,mapDispatchToProps)(Recommendations);


