import React             from 'react';
import './App.css';
import {styles}          from "../Fonts_styles/font_styles"
import SearchBar         from "../Components/SearchBar/SearchBar"
import SearchResults     from "../Components/SearchResults/SearchResults"
import Playlist          from "../Components/Playlist/Playlist"
import CounterAndAnimation  from "../Components/CounterAnimation/CounterAnimation"
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";
import  {CSSPlugin, AttrPlugin}        from 'gsap/all';
import $                               from 'jquery'; 
import {connect}                       from 'react-redux'


const plugins = [ CSSPlugin, AttrPlugin ];


class App extends React.Component {

componentDidMount(){
    let counter = $("#bottomPageFixedTracksCounter")
    window.addEventListener('scroll',function() {
        if ($(this).scrollTop() > 150) {
            $(counter).fadeIn(1000)
        }else {
            $(counter).fadeOut(1000);
      }
    });
}

render(){
 return (
  <div className="App">
      <h1 style ={styles.main_heading}>Ja<span className="highlight">mmm</span>ing</h1>
      <SearchBar/>
       <div style={styles.main_wrapper}>
           {this.props.activePage === "search" &&  <SearchResults/>}
           {this.props.activePage === "playlist" && <Playlist/>}
       </div>

       <ScrollUpButton style={{zIndex:"10"}} />
       <CounterAndAnimation counter = {this.props.playListTracks.length} />
  </div>
  );
}
}


function mapStateToProps(state){
  return {
      playListTracks:state.tracks.playListTracks,
      activePage:state.tracks.activePage
  }
}


export default connect(mapStateToProps)(App);


