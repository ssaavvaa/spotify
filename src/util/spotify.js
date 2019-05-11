
import swal from 'sweetalert';
import $ from 'jquery'; 
const clientId = 'b2c5900815984920b0af23be399fbd54'; // Insert client ID here.
const redirectUri = 'http://ssaavvaa_spotify.surge.sh/'; // Have to add this to your accepted Spotify redirect URIs on the Spotify API.
const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

 let accessToken;


 const Spotify = {

    getAccessToken(term) {
    if (accessToken) {
      return accessToken;
    }
    else if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.history.pushState('Access Token', null, '/');
      window.setTimeout(() => accessToken = '', expiresIn * 1000);

      return accessToken
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl

        localStorage.setItem("value",term)

    }
  },

   search(term) {
    const accessToken = this.getAccessToken(term);
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
        img:track.album.images[1].url
      }));
    });

  },

   savePlaylist(name, trackUris) {
    const accessToken = this.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    if (!name ) {
      $("#loading-wrapper").hide()
      swal("Saving failure!", "Please specify the playlist name!", "error");

     return false
    } else if (!trackUris.length ) {
        $("#loading-wrapper").hide()
      swal("Saving failure!", "Playlist must have at least one track!", "error");
        return false
    } else fetch('https://api.spotify.com/v1/me', {headers: headers}
    ).then(response => response.json()
    ).then(jsonResponse => {
      userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
      }).then(response => response.json()
      ).then(jsonResponse => {
        $("#loading-wrapper").hide()
        $("#playListName").val("New Playlist");
        swal(`Playlist "${name}" was added to Spotify`, {
          title: "Done!",
          buttons: false,
          timer: 1500,
        });
        const playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackUris})
        });
      });
    });
  } 
};


export default Spotify ;





