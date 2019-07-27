import  React                      from 'react';
import  './Track.css';
import  {styles}                   from "../../Fonts_styles/font_styles"
import  {connect}                  from 'react-redux'
import  {TimelineLite,}            from 'gsap/all';
import  addTrackToPlayList         from "../../Reducers/Actions/addTrackToPlaylist"

const animateAdd = new TimelineLite()


const  SearchTrack = props => {
  let trackCover = React.createRef();
  function onAddTrack(id){
      animateAdd.to(trackCover, .3, {scale:1.02})
                .to(trackCover,.3,{scale:0,rotation: 100})
      animateAdd.eventCallback("onComplete",() => {
                  props.addTrackToPlayList(id) 
  })
}
  return (
    <div ref={div => trackCover = div} className="searchTrack-wrapper" >
         <img  src ="./add.jpg" alt="AddTrack" className="action-addTrack" onClick = {onAddTrack.bind(this,props.id)} />
         <img  className = "searchTrack-image" src = {props.img} alt={props.name} />
         <div className="searchTrack_info-cover" style={{backgroundColor:styles.colors.bg_main,zIndex:2}}>
             <h3 style ={styles.track_name}>{props.name}</h3>
             <p style ={styles.track_description}>{props.artist} | {props.album} </p>
         </div>
    </div>

  );
}

function mapDispatchToProps(dispatch){
  return{
    addTrackToPlayList:(id)=>{
        dispatch(addTrackToPlayList(id))
    }
  }
}


export default connect(null,mapDispatchToProps)(SearchTrack);
