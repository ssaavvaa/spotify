import React,{Fragment}                 from 'react';
import './SearchResults.css';
import Recommendations       from "./Recommendations"
import SearchTrack           from "../Tracks/SearchTrack"
import {connect}             from 'react-redux'
import $                     from 'jquery'; 





class SearchResults extends React.Component {

 componentDidUpdate(){
     $("#loading_animation").hide()
 }

 componentDidMount(){
     $("#loading_animation").hide()
}

 render(){
    return (
       <Fragment>
       {this.props.searchResults
       ?<section className="searchResults-wrapper">
         <h2 className="hidden">Section - searching  artists</h2>
               {this.props.searchResults.map(track => <SearchTrack  uri = {track.uri} key ={track.id} 
                                                  name={track.name} album = {track.album} artist={track.artist} id={track.id}
                                                  img ={track.img}  />)}
        </section>
      :<div className={"no_results-message"}>Nothing has been found with your Search request</div>}

       {this.props.recommendations.length > 0 && <Recommendations/>}
       </Fragment>
     )
  }
}

  function mapStateToProps(state){
    return {
        searchResults:state.tracks.searchResults,
        recommendations:state.tracks.recommendations
    }
  }

 export default connect(mapStateToProps)(SearchResults );


