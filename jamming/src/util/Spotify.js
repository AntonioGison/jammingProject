
let accessToken;
let clientId = 'ca0dd58e11c24dc3992c3d18f36430aa';
let redirectUri = "http://localhost:3000/";

const Spotify = {

    getAccessToken(){
        if(accessToken){
            return accessToken;
        }
        
        //If the access token is not already set, check the URL to see if it has just been obtained.
        //check for access token to match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
         ///access_token=([^&]*)/ regular expression for capturing all the characters assigned to the access token
        const expireInMatch = window.location.href.match(/expires_in=([^&]*)/);
        ////expires_in=([^&]*)/ regular expression for capturing all the characters assigned to the expires

        if( accessTokenMatch && expireInMatch){

            //Set the access token value
            accessTokenMatch = accessTokenMatch[1];
            const expiresIn = Number(expireInMatch[1]); 

            //Clear the parameters from the URL, so the app doesn’t try grabbing the access token after it has expired 
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        }
        else{
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    }


}

export default Spotify;