import  React               from 'react';
import  './Track.css';
import  removePlaylistTrack from "../../Reducers/Actions/removePlaylistTrack"
import  {styles}            from "../../Fonts_styles/font_styles"
import  {connect}           from 'react-redux'
import  {TimelineLite}      from 'gsap/all';

const animateDelete = new TimelineLite()



const PlayListTrack = props => {

  let playlist_info = React.createRef();

  function handleRemoveTrack(id){
      animateDelete.to(playlist_info, .3, { transformOrigin:"left top",scale:1.02})
                   .to(playlist_info, .3,{scale:0,rotation: 3})
      animateDelete.eventCallback("onComplete",function(){
          props.removePlaylistTrack(id)
      })
  }
return (
  <div className="PL_track-wrapper">
      <div ref ={div => playlist_info = div}>
          <h3 style ={styles.playlist_heading}>{props.name}</h3>
          <p style ={{fontFamily:styles.fonts.main}}>{props.artist} | {props.album}</p>
      </div>
      <div css={{textAlign:"right"}}>
          <i className="material-icons  action_deleteTrack" onClick = {handleRemoveTrack.bind(this,props.id)}>delete</i>
      </div>
  </div >)

}


function mapDispatchToProps(dispatch){
  return{
    removePlaylistTrack:(id)=>{
        dispatch(removePlaylistTrack(id))
    }
  }
}
export default connect(null,mapDispatchToProps)(PlayListTrack);
