import React,{Fragment}          from 'react';
import './Playlist.css';
import {styles}                  from "../../Fonts_styles/font_styles"
import PlayListTrack             from "../Tracks/PlayListTrack"
import delete_playlist           from "../../Reducers/Actions/delete_playlist"
import Spotify                   from "../../util/spotify"
import {connect}                 from 'react-redux'
import swal                      from 'sweetalert';





const Playlist = props =>  {

  let playListName = React.createRef()

  function handleDeletePlaylist(){
        swal({
            title: "Are you sure?",
            text: "This action gonna delete all tracks in current playlist...",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
         if (willDelete) {
          swal("Success!Playlist is cleared out...", {
          title: "Deleted!",
          buttons: false,
          timer: 1000,
        });
        props.delete_playlist()
      }
    });
   }

 function handleSaveToSpotify(){
        const name = playListName.current.value
        const uris = props.playListTracks.map(track => track.uri)
          if(Spotify.savePlaylist(name,uris)!== false){
             return props.delete_playlist()
           }
  }

    return (
     <Fragment>
        {props.playListTracks.length > 0  &&
           <div className="playlist_Wrapper">
                    <input placeholder={"New Playlist"} ref={playListName}
                     style= {{fontFamily:styles.fonts.main}}
                     className="playlist_input"/>

                    {props.playListTracks.map(track => <PlayListTrack 
                                                   uri = {track.uri} id={track.id} album = {track.album} 
                                             key={track.id}  artist={track.artist} name ={track.name}/>)}

                    <button className="Playlist-save" onClick={handleSaveToSpotify} style ={styles.playListButton}>
                            SAVE TO SPOTIFY
                    </button>
                    <button className="Playlist-Delete" onClick={handleDeletePlaylist} style ={styles.playListButton}>
                            DELETE ALL
                    </button>
            </div>}

         {!props.playListTracks.length && <div className={"no_results-message"}>Your playlist is empty.</div>}
    </Fragment>
  );
}

function mapStateToProps(state){
        return {
            playListTracks:state.tracks.playListTracks
        }
 }

 function mapDispatchToProps(dispatch){
        return{
        delete_playlist:()=>{
            dispatch(delete_playlist())
          }
        }
 }

export default connect(mapStateToProps,mapDispatchToProps)(Playlist);




