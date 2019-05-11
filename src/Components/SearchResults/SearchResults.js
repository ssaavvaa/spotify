import React from 'react';
import './SearchResults.css';
import SearchTrack from "../Tracks/SearchTrack"







const SearchResults = props => {

  return (
     <div className="search_Wrapper">
      {props.searchResults?props.searchResults.map(track => 
       <SearchTrack  uri = {track.uri} key ={track.id} tracks={props.searchResults}
       name={track.name} album = {track.album} artist={track.artist} id={track.id}
       img ={track.img} onAdd = {props.onAdd}    />):
     <div className={"no_results-message"}>Nothing has been found with your Search request</div>}
     </div>
     )
}




  export default SearchResults ;
