let accessToken;
let clientId = "ca0dd58e11c24dc3992c3d18f36430aa";
let redirectUri = "http://localhost:3000/";

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    //If the access token is not already set, check the URL to see if it has just been obtained.
    //check for access token to match
    let accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    ///access_token=([^&]*)/ regular expression for capturing all the characters assigned to the access token
    let expireInMatch = window.location.href.match(/expires_in=([^&]*)/);
    ////expires_in=([^&]*)/ regular expression for capturing all the characters assigned to the expires

    if (accessTokenMatch && expireInMatch) {
      //Set the access token value
      accessToken =  accessTokenMatch[1];
      const expiresIn = Number(expireInMatch[1]);

      //Clear the parameters from the URL, so the app doesn’t try grabbing the access token after it has expired
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => {
        response.json();
      })
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) {
          return [];
        } else {
          return jsonResponse.tracks.items.map((track) => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
          }));
        }
      });
  },

  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }
    const accessToken = Spotify.getAccessToken();
    //a header, which allows the client to pass along information about the request
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    // a request that returns the user’s Spotify username
    return fetch("https://api.spotify.com/v1/me", { 
        headers: headers })
      .then((response) => {
        response.json();
      })
      .then((jsonResponse) => {
        userId = jsonResponse.id;

        //a post request inside a promise
        let url = `https://api.spotify.com/v1/users/${userId}/playlists`;
        return fetch(url, {
          method: "POST",
          body: JSON.stringify({ name: name }),
          headers: headers 
        });
      })
      .then(
        response => {
            response.json();
        }
      )
      .then(
        jsonResponse =>{
            let playlistID = jsonResponse.id;

            //a POST request that creates a new playlist in the user’s account and returns a playlist ID
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`,{
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ uris: trackUris })
            })
        }
      )
  },
};

export default Spotify;
