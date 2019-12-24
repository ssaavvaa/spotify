import swal from 'sweetalert';
const clientId = 'b2c5900815984920b0af23be399fbd54'; // Insert client ID here.
const redirectUri = 'https://spotify-music-search.netlify.com/'; // Have to add this to your accepted Spotify redirect URIs on the Spotify API.
const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

let accessToken;


const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;git
    } else if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      window.history.pushState('Access Token', null, '/');
      return accessToken
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl
    }
  },


  recommendArtists(name) {
    return fetch(`https://api.spotify.com/v1/search?type=artist&q=${name}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      }).then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        return fetch(`https://api.spotify.com/v1/artists/${jsonResponse.artists.items[0].id}/related-artists`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        })
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        if (!jsonResponse.artists.length) {
          return [];
        }
        let randomArtists = []
        for (let i = 0; i < 6; i += 1) {
          let randomNumber = Math.floor(Math.random() * jsonResponse.artists.length)
          let artists = jsonResponse.artists
          let name = artists[randomNumber].name?artists[randomNumber].name:"unknown"
          let img = artists[randomNumber].images[2].url?artists[randomNumber].images[2].url:"https://static.thenounproject.com/png/340719-200.png"
          if (!randomArtists.some(x => x.name === name))
            randomArtists = [...randomArtists, {name,img}]
        }
        return randomArtists
      })
  },

  search(term) {
    const accessToken = this.getAccessToken(term);
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}&limit=15`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
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
        img: track.album.images[1] ? track.album.images[1].url : "https://static.thenounproject.com/png/340719-200.png"
      }));
    });

  },

  savePlaylist(name, trackUris) {
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };
    let userId;
    let playlistId;
    if (!name) {
      swal("Saving failure!", "Please specify the playlist name!", "error");
      return false
    } else fetch('https://api.spotify.com/v1/me', {
      headers: headers
    }).then(response => response.json()).then(jsonResponse => {
      userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({
          name: name
        })
      }).then(response => response.json()).then(jsonResponse => {
        playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({
            uris: trackUris
          })
        });
      }, swal("Done!", "Playlist was added to Spotify!", "success"))
    });
  }
};


export default Spotify;