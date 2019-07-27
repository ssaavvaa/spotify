

const tracks_state = {
    active_page:"search",
    searchResults:[],
    playListTracks:[],
    recommendations:[],
    activePage:"search"
}


export default function tracks(state = tracks_state, action){
     switch(action.type){
       case "SEARCH_TRACKS":
           return{...state,searchResults:action.search_tracks,
                           recommendations:action.recommendations,
                           activePage:"search"}

       case "ADD_TRACK_TO_PLAYLIST":
           const trackToAdd = state.searchResults.find(track => track.id === action.id)
           const updatedSearchResults = state.searchResults.filter(track => track.id !== action.id)
           return{...state,searchResults:updatedSearchResults,
                           playListTracks:[...state.playListTracks,trackToAdd]}

       case "REMOVE_PLAYLIST_TRACK":
           const track = state.playListTracks.find(track => track.id === action.id)
           const filteredPlaylist = state.playListTracks.filter(x => x.id !== action.id)
           return{...state,searchResults:[...state.searchResults,track],
                     playListTracks:filteredPlaylist}

       case "DELETE_PLAYLIST":
           return {...state,searchResults:[...state.playListTracks,...state.searchResults],playListTracks:[],}

       case "ACTIVE_PAGE":
           return {...state,activePage:action.page}

       default: return state
    }
}