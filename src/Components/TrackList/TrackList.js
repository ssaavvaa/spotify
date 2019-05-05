import React from 'react';
import './TrackList.css';
import Track from "../Track/Track"

class TrackList extends React.Component {

  render(){
  return (

<div className = "resultSearch">
   {this.props.tracks.map(track =>  <Track onAdd={this.props.onAdd}  key = {track.id}  id= {track.id}
     btnAdd={this.props.btnAdd} song = {track.song} img={track.img}  name = {track.name} artist = {track.artist} album = {track.album}/>)}
</div>

  );
}
}

export default TrackList;