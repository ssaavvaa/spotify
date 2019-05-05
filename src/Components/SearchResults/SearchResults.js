import React from 'react';
import './SearchResults.css';
import TrackList from "../TrackList/TrackList"



class SearchResults extends React.Component {
  render(){

  return (

     <div className = "wrapper_search">
     <div className="SearchContainer">
    {!this.props.searchResults === false?
     <TrackList  onAdd = {this.props.onAdd} btnAdd = {true}  tracks={this.props.searchResults}  />:
     <div className={"no_results-message"}>Nothing has been found with your Search request</div>}
     </div>
    </div>

  );
}
}




  export default SearchResults ;
