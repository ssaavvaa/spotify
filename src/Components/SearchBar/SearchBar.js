import React from 'react';
import './SearchBar.css';
import {styles} from "../../Fonts_styles/font_styles"


const SearchBar = props => {
  return (
  <div className="SearchBar">
     <div className = "input_search">
         <input  placeholder="Enter A Song, Album, or Artist" id="searchValue" onKeyUp={props.onKeySearch} />
         <span className="material-icons search_icon" onClick = {props.onSearch} >search</span>
     </div>

     <div className ="option_buttons">
        <button className="option_button" style ={{color:styles.colors.font_main,
                                                   backgroundColor:styles.colors.bg_main,
                                                   fontFamily:styles.fonts.main}}   
                onClick ={props.onToggleList.bind(this,"search")}>
                Results
        </button>
        <button className="option_button"  style ={{color:styles.colors.font_main,
                                                    backgroundColor:styles.colors.bg_main,
                                                    fontFamily:styles.fonts.main}}  
                onClick ={props.onToggleList.bind(this,"playlist")}>
                Playlist
                {props.counter > 0?
                <p className="tracks_Counter">{props.counter}</p>:
                false}
        </button>
     </div>
  </div>
  );
}



export default SearchBar;