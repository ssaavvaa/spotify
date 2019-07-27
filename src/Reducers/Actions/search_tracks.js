import Spotify from "../../util/spotify"


export default function search_tracks(value, playListTracks) {
  return function (dispatch) {
    if (value !== "" && value !== null) {
      Spotify.search(value).then(response => {
        if (!response.length) {
          dispatch({
            type: "SEARCH_TRACKS",
            search_tracks: false,
            recommendations: []
          })
        } else if (playListTracks.length) {
          const filteredResponse = [...response].reduce((acc, currValue) => {
            const ifInPlaylist = playListTracks.some(track => track.id === currValue.id)
            if (!ifInPlaylist) {
              acc = [...acc, currValue]
            }
            return acc
          }, [])
          Spotify.recommendArtists(response[0].artist)
            .then(responseRec => {
              dispatch({
                type: "SEARCH_TRACKS",
                search_tracks: filteredResponse,
                recommendations: responseRec
              })
            })

        } else {
          Spotify.recommendArtists(response[0].artist)
            .then(responseRec => {
              dispatch({
                type: "SEARCH_TRACKS",
                search_tracks: response,
                recommendations: responseRec
              })
            })
        }
      })
    }
  }
}