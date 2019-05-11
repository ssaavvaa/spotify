import React from 'react';
import './Playlist.css';
import {styles} from "../../Fonts_styles/font_styles"
import PlayListTrack from "../Tracks/PlayListTrack"


const Playlist = props =>  {

  return (
    <div className="Playlist">
        <input placeholder={"New Playlist"} id="playListName" 
               style= {{fontFamily:styles.fonts.main}}
        />

        {props.playlistTracks.map(track => <PlayListTrack onRemove={props.onRemove} uri = {track.uri} id={track.id} album = {track.album} 
                                  key={track.id}  artist={track.artist} name ={track.name}/>)
        }
        {props.playlistTracks.length?
                 <div className="playlist_buttons">
                    <button className="Playlist-save" onClick={props.onSave} 
                         style ={{color:styles.colors.font_main,
                         fontFamily:styles.fonts.main,
                         backgroundColor:styles.colors.scnd_main}} >
                         SAVE TO SPOTIFY
                    </button>
                   <button className="Playlist-save" onClick={props.onDelete} 
                         style ={{color:styles.colors.font_main,
                         fontFamily:styles.fonts.main,
                         backgroundColor:styles.colors.scnd_main}}>
                         DELETE ALL
                    </button>
                 </div>:
        false}
  </div>
  );

}



export default Playlist ;


