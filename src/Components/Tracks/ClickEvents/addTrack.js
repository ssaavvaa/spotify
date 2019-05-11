export default function addTrack(id,event){
    return{
        type:"ADD_TRACK",
        id:id,
        event:event
    }
}