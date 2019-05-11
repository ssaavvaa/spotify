import React from 'react';
import './App.css';
import {styles} from "../Fonts_styles/font_styles"
import Playlist from "../Components/Playlist/Playlist"
import SearchResults from "../Components/SearchResults/SearchResults"
import SearchBar from "../Components/SearchBar/SearchBar"
import Spotify from "../util/spotify"
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";
import $ from 'jquery'; 
import swal from 'sweetalert';



class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults:[],
      playListTracks:[],
      toggleList:"search",
      searchValue:""
    }
    this.handleToggleList = this.handleToggleList.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleAddTrack = this.handleAddTrack.bind(this)
    this.handleRemoveTrack = this.handleRemoveTrack.bind(this)
    this.handleDeleteAll = this.handleDeleteAll.bind(this)
    this.handleSaveAll = this.handleSaveAll.bind(this)
    this.onKeySearch = this.onKeySearch.bind(this)
 
  }

  componentDidMount(){
    let value = sessionStorage.getItem("value")
    if(value == null || value == "" ){
      return false
    }else $("#searchValue").val(value)
     return this.handleSearch()
  }

  handleToggleList(value){
    this.setState({toggleList:value})
  }

  handleSearch(){
   this.setState({toggleList:"search"})
   $("#loading-wrapper").show()
   let value = $("#searchValue").val()
   sessionStorage.setItem("value",value)

   Spotify.search(value).then(res => {
     if(this.state.playListTracks.length){
        let filteredTracks = Object.entries(res).reduce((acc,currValue) => {
        let ifIndex =  this.state.playListTracks.findIndex(x => x.id === currValue[1].id)
         if(ifIndex === -1){
           acc.push(currValue[1])
         }
         return acc
        },[])
       return !res.length?this.setState({searchResults:false}):
        this.setState({searchResults:filteredTracks })
      }else return !res.length?this.setState({searchResults:false}):
      this.setState({searchResults:res })
    }).then(() => $("#loading-wrapper").hide())

  }

  onKeySearch(e){
  if(e.keyCode === 13){
    return this.handleSearch()
  }else return false
  }

  handleAddTrack(id,event){
  const track = this.state.searchResults.find(track => track.id === id)
  const filterSearchList = this.state.searchResults.filter(x => x.id !== id)
    $(event.currentTarget).siblings(".success").fadeIn().css({display:"flex"})
  setTimeout(() => {
    this.setState({searchResults:filterSearchList})
    this.setState({playListTracks:[...this.state.playListTracks,track]})  
  },600);


  }

  handleRemoveTrack(id){
    const track = this.state.playListTracks.find(track => track.id === id)
    const filterSearchList = this.state.playListTracks.filter(x => x.id !== id)
    this.setState({searchResults:[track,...this.state.searchResults]})
    this.setState({playListTracks:filterSearchList}) 
  }

  handleSaveAll(){
  const name = document.getElementById("playListName").value
  const uris = this.state.playListTracks.map(track => track.uri)
   $("#loading-wrapper").show()
   setTimeout(() => {
    if(Spotify.savePlaylist(name,uris) !== false){
      this.setState({playListTracks:[]}) 
     }
  }, 1300);

  }

  handleDeleteAll(){
  const deletedTracks = this.state.playListTracks
  swal({
    title: "Are you sure?",
    text: "This action gonna delete all tracks in current playlist...",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      this.setState({searchResults:[...deletedTracks,...this.state.searchResults]})
      this.setState({playListTracks:[]})
      $("#playListName").val("")
      swal("Success!Playlist is cleared out...", {
        title: "Deleted!",
        buttons: false,
        timer: 1000,
      });

    }
  });
 
  }

  componentWillUnmount(){
    window.location.href.match(/access_token=([^&]*)/)[1] = "";
    window.location.href.match(/expires_in=([^&]*)/)[1] = 300;
}

render(){


  return (
  <div className="App" >
    <h1 style ={{ backgroundColor:styles.colors.bg_main,
                  fontFamily:styles.fonts.main}}>
                  Ja<span className="highlight">mmm</span>ing
    </h1>

    <SearchBar counter={this.state.playListTracks.length} onKeySearch = {this.onKeySearch} 
                onSearch = {this.handleSearch} onToggleList = {this.handleToggleList} />

    <div className="App-playlist">
         {this.state.toggleList === "search"?
         <SearchResults  onAdd={this.handleAddTrack} searchResults = {this.state.searchResults}  />:
         <Playlist onDelete={this.handleDeleteAll} playlistTracks= {this.state.playListTracks}
          onSave ={this.handleSaveAll} onRemove={this.handleRemoveTrack} />}
    </div>

     {/* Button that appear when window is scrolled down*/}
    <ScrollUpButton style={{zIndex:"1000"}} />

    {/* playlist tracks counter that appear when window is scrolled down*/}
    <span id="mainCounter">{this.state.playListTracks.length}</span>

     {/* loading screen animation*/}
    <div id="loading-wrapper">
         <div id="loading-text" style = {{fontFamily:styles.fonts.main}}>LOADING</div>
         <div id="loading-content"></div>
    </div>
  </div>

  );
}
}




$(window).scroll(function() {
  var topPos = $(this).scrollTop();
  if (topPos > 150) {
    $("#mainCounter").fadeIn(1000)

  } else {
    $("#mainCounter").fadeOut(1000);
  }
})



export default App ;

