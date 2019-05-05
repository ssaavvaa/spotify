

const TracksState = {
    playlistTracks:[{name:"kamukaze",artist:"Eminem",album:"loppo", id:1},
    {name:"Back to Life",artist:"Linda",album:"Past", id:2},
    {name:"Cigarette",artist:"Victor",album:"Tco alife", id:3}],
    btnAdd:true

}


export default function Tracks(state = TracksState, action){
    switch(action.type){
        case "REMOVE_TRACK":
        let index = state.playlistTracks.findIndex(x => x.id === action.id)
        console.log(state.playlistTracks)
        return {...state,playlistTracks:[...state.playlistTracks.slice(0, index),
                                         ...state.playlistTracks.slice(index + 1)
               ]};
        case "ADD_TRACK":
                const update = [...state.playlistTracks,action.id]
        return {...state,playlistTracks:update};

        default: return state
    }
}

