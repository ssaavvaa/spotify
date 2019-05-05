import React from 'react';
import {connect} from 'react-redux'
import './Track.css';
import removeTrack from "./ClickEvents/removeTrack"



class Track extends React.PureComponent {


onRemove(id){
    return this.props.removeTrack(id)
}


  render(){
  return (
       <div className="Track">
            <div className="Track-information">
            <h3>{this.props.name}</h3>
            <p>{this.props.preview}</p>
            <p>{this.props.artist} | {this.props.album}</p>
       </div>
       <p>{this.props.song}</p>
       <img className = "image" src = {this.props.img} />
       <div className = "playlist_add">
       <p >Add to play list</p>
       {this.props.btnAdd === true?<button className="Track-action" onClick = {this.props.onAdd.bind(this,this.props.id)}>+</button>:
       <button className="Track-action" onClick = {this.onRemove.bind(this,this.props.id)}>-</button>}
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
    return{ removeTrack: id => { dispatch(removeTrack(id)) } }
  }

  export default connect(mapStateToProps,mapDispatchToProps)(Track) ;
