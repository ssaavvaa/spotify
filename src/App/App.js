import React from 'react';
import './App.css';
import {connect} from 'react-redux'
import Playlist from "../Components/Playlist/Playlist"
import SearchResults from "../Components/SearchResults/SearchResults"
import SearchBar from "../Components/SearchBar/SearchBar"
import Spotify from "../util/spotify"
import addTrack from "../Components/Track/ClickEvents/addTrack"
import $ from 'jquery'; 
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";




class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults:[],
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.addTrack = this.addTrack.bind(this)
  }

 handleSearch(){
    let value = document.getElementById("searchValue").value
    if(value !== null || value !== ""){
      Spotify.search(value).then(res =>
        res == null || res == ""?this.setState({searchResults:false}):
                                this.setState({searchResults:res}))
  }
 }

 addTrack(id){
    const track = this.state.searchResults.find(track => track.id === id)
    this.props.addTrack(track)
  }

componentDidMount(){
    Spotify.getAccessToken()
}

render(){

  return (

  <div className="App">
  <ScrollUpButton />
    <h1>Ja<span className="highlight">mmm</span>ing</h1>
    <SearchBar onSearch = {this.handleSearch} />
    <div className="App-playlist">
      <SearchResults searchResults = {this.state.searchResults} onAdd = {this.addTrack} />
      <Playlist playlistName = {this.state.playlistName}  playlistTracks={this.props.playlistTracks} />
    </div>
  </div>

  );
}
}

function mapStateToProps(state){
  return {
    playlistTracks:state.Tracks.playlistTracks
  }
}

function mapDispatchToProps(dispatch){
  return{ addTrack: id => { dispatch(addTrack(id)) } }
}



export default connect(mapStateToProps,mapDispatchToProps)(App) ;

