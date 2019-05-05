(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{22:function(e,t,a){e.exports=a(40)},27:function(e,t,a){},28:function(e,t,a){},33:function(e,t,a){},34:function(e,t,a){},35:function(e,t,a){},36:function(e,t,a){},37:function(e,t,a){},40:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(11),s=a.n(c),i=(a(27),a(1)),o=a(2),l=a(4),u=a(3),p=a(7),h=a(5),d=(a(28),a(9));a(33),a(34),a(35);var m=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(o.a)(t,[{key:"onRemove",value:function(e){return this.props.removeTrack(e)}},{key:"render",value:function(){return r.a.createElement("div",{className:"Track"},r.a.createElement("div",{className:"Track-information"},r.a.createElement("h3",null,this.props.name),r.a.createElement("p",null,this.props.preview),r.a.createElement("p",null,this.props.artist," | ",this.props.album)),r.a.createElement("p",null,this.props.song),r.a.createElement("img",{className:"image",src:this.props.img}),r.a.createElement("div",{className:"playlist_add"},r.a.createElement("p",null,"Add to play list"),!0===this.props.btnAdd?r.a.createElement("button",{className:"Track-action",onClick:this.props.onAdd.bind(this,this.props.id)},"+"):r.a.createElement("button",{className:"Track-action",onClick:this.onRemove.bind(this,this.props.id)},"-")))}}]),t}(r.a.PureComponent);var f,b=Object(d.b)(function(e){return{playlistTracks:e.Tracks.playlistTracks}},function(e){return{removeTrack:function(t){e(function(e){return{type:"REMOVE_TRACK",id:e}}(t))}}})(m),k=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"resultSearch"},this.props.tracks.map(function(t){return r.a.createElement(b,{onAdd:e.props.onAdd,key:t.id,id:t.id,btnAdd:e.props.btnAdd,song:t.song,img:t.img,name:t.name,artist:t.artist,album:t.album})}))}}]),t}(r.a.Component),y=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"Playlist"},r.a.createElement("input",{defaultValue:"New Playlist"}),r.a.createElement(k,{tracks:this.props.playlistTracks}),r.a.createElement("button",{className:"Playlist-save"},"SAVE TO SPOTIFY"))}}]),t}(r.a.Component),v=(a(36),function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"wrapper_search"},r.a.createElement("div",{className:"SearchContainer"},!1===!this.props.searchResults?r.a.createElement(k,{onAdd:this.props.onAdd,btnAdd:!0,tracks:this.props.searchResults}):r.a.createElement("div",{className:"no_results-message"},"Nothing has been found with your Search request")))}}]),t}(r.a.Component)),O=(a(37),function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"SearchBar"},r.a.createElement("input",{placeholder:"Enter A Song, Album, or Artist",id:"searchValue"}),r.a.createElement("button",{className:"SearchButton",onClick:this.props.onSearch},"SEARCH"))}}]),t}(r.a.Component)),T={getAccessToken:function(){if(f)return f;var e=window.location.href.match(/access_token=([^&]*)/),t=window.location.href.match(/expires_in=([^&]*)/);if(e&&t){f=e[1];var a=Number(t[1]);return window.setTimeout(function(){return f=""},1e3*a),window.history.pushState("Access Token",null,"/"),f}var n="https://accounts.spotify.com/authorize?client_id=".concat("b2c5900815984920b0af23be399fbd54","&response_type=token&scope=playlist-modify-public&redirect_uri=").concat("http://localhost:3000/");window.location=n},search:function(e){var t=T.getAccessToken();return fetch("https://api.spotify.com/v1/search?type=track&q=".concat(e),{headers:{Authorization:"Bearer ".concat(t)}}).then(function(e){return e.json()}).then(function(e){return e.tracks?e.tracks.items.map(function(e){return{id:e.id,name:e.name,artist:e.artists[0].name,album:e.album.name,uri:e.uri,img:e.album.images[1].url,song:e.preview_url}}):[]})},savePlaylist:function(e,t){if(e&&t.length){var a,n=T.getAccessToken(),r={Authorization:"Bearer ".concat(n)};return fetch("https://api.spotify.com/v1/me",{headers:r}).then(function(e){return e.json()}).then(function(n){return a=n.id,fetch("https://api.spotify.com/v1/users/".concat(a,"/playlists"),{headers:r,method:"POST",body:JSON.stringify({name:e})}).then(function(e){return e.json()}).then(function(e){var n=e.id;return fetch("https://api.spotify.com/v1/users/".concat(a,"/playlists/").concat(n,"/tracks"),{headers:r,method:"POST",body:JSON.stringify({uris:t})})})})}}},E=T;a(19);var j=a(21),g=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={searchResults:[]},a.handleSearch=a.handleSearch.bind(Object(p.a)(a)),a.addTrack=a.addTrack.bind(Object(p.a)(a)),a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"handleSearch",value:function(){var e=this,t=document.getElementById("searchValue").value;null===t&&""===t||E.search(t).then(function(t){return null==t||""==t?e.setState({searchResults:!1}):e.setState({searchResults:t})})}},{key:"addTrack",value:function(e){var t=this.state.searchResults.find(function(t){return t.id===e});this.props.addTrack(t)}},{key:"componentDidMount",value:function(){E.getAccessToken()}},{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement(j.CircleArrow,null),r.a.createElement("h1",null,"Ja",r.a.createElement("span",{className:"highlight"},"mmm"),"ing"),r.a.createElement(O,{onSearch:this.handleSearch}),r.a.createElement("div",{className:"App-playlist"},r.a.createElement(v,{searchResults:this.state.searchResults,onAdd:this.addTrack}),r.a.createElement(y,{playlistName:this.state.playlistName,playlistTracks:this.props.playlistTracks})))}}]),t}(r.a.Component);var w=Object(d.b)(function(e){return{playlistTracks:e.Tracks.playlistTracks}},function(e){return{addTrack:function(t){e(function(e){return{type:"ADD_TRACK",id:e}}(t))}}})(g);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var A=a(8),N=a(12),S=a(16),C={playlistTracks:[{name:"kamukaze",artist:"Eminem",album:"loppo",id:1},{name:"Back to Life",artist:"Linda",album:"Past",id:2},{name:"Cigarette",artist:"Victor",album:"Tco alife",id:3}],btnAdd:!0};var R=Object(A.b)({Tracks:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:C,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REMOVE_TRACK":var a=e.playlistTracks.findIndex(function(e){return e.id===t.id});return console.log(e.playlistTracks),Object(S.a)({},e,{playlistTracks:[].concat(Object(N.a)(e.playlistTracks.slice(0,a)),Object(N.a)(e.playlistTracks.slice(a+1)))});case"ADD_TRACK":var n=[].concat(Object(N.a)(e.playlistTracks),[t.id]);return Object(S.a)({},e,{playlistTracks:n});default:return e}}}),_=Object(A.c)(R,window.devToolsExtension&&window.devToolsExtension());s.a.render(r.a.createElement(d.a,{store:_},r.a.createElement(w,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[22,1,2]]]);
//# sourceMappingURL=main.b39bf808.chunk.js.map