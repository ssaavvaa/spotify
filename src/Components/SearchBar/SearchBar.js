import React, {Fragment}         from 'react';
import './SearchBar.css';
import {styles}                  from "../../Fonts_styles/font_styles"
import setActivePage             from "../../Reducers/Actions/setActivePage"
import search_tracks             from "../../Reducers/Actions/search_tracks"
import {connect}                 from 'react-redux'
import $                         from 'jquery'; 


class SearchBar extends React.Component{
   constructor(props){
      super(props)
      this.onMouseSearch = this.onMouseSearch.bind(this)
      this.onEnterSearch = this.onEnterSearch.bind(this)
      this.inputValue = React.createRef();
   }

componentDidMount(){
  this.inputValue.current.value = localStorage.getItem("search_value")
}

onMouseSearch(){
   const query = this.inputValue.current.value
   if(query !== "" && query !== null){
      $("#loading_animation").show()
   localStorage.setItem("search_value",query)
   this.props.search_tracks(query,this.props.playListTracks)
   }else return false
}
onEnterSearch(event){
   if(event.keyCode === 13){
      this.onMouseSearch()
   }
}

render(){

  const counter = this.props.playListTracks.length

  return (
  <Fragment>
     <div className = "search_wrapper">
         <input ref={this.inputValue} placeholder="Enter A Song, Album, or Artist"  onKeyUp={this.onEnterSearch} />
         <span className="material-icons search_icon" onClick = {this.onMouseSearch}>
            search
        </span>
     </div>

     <div className ="option_buttons">
        <button className="option_button" style ={styles.searchButton}   
                onClick ={this.props.setActivePage.bind(this,"search")}>
                Results
        </button>
        <button className="option_button"  style ={styles.searchButton}  
                onClick ={this.props.setActivePage.bind(this,"playlist")}>
                Playlist
         {counter  > 0 && <span id="searchBar_counter">{counter}</span>}
        </button>
     </div>
     </Fragment>
  );
}
}

function mapStateToProps(state){
   return {
       playListTracks:state.tracks.playListTracks
   }
 }

function mapDispatchToProps(dispatch){
   return{
      setActivePage:(page)=>{
           dispatch(setActivePage(page))
       }, 
       search_tracks:(value,playListTracks)=>{
         dispatch(search_tracks(value,playListTracks))
     },

}
 }

export default connect(mapStateToProps,mapDispatchToProps)(SearchBar);

