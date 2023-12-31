import React from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";

class App extends React.Component {
  constructor(props) {
    super(props);
    //As with all methods that we pass in React, we must first bind this to our new method
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlayList = this.savePlayList.bind(this);
    this.search = this.search.bind(this);

    this.state = {
      searchResults: [],
      playlistName: "best hit 2000s",
      playlistTracks: [],
    };
  }

  search(term) {
    Spotify.search(term).then((SearchResults) => {
      this.setState({ searchResults: SearchResults });
    });
  }

  savePlayList() {
    console.log("test button trigger");
    const trackUris = this.state.playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({ playlistName: "New Playlist", playlistTracks: [] });
    });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  removeTrack(track) {
    // Uses the track’s id property to filter it out of playlistTracks
    let tracks = this.state.playlistTracks;

    let updatedTracks = tracks.filter(
      (currentTrack) => currentTrack.id !== track.id
    );

    this.setState({ playlistTracks: updatedTracks });
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    // Use the track’s id property to check if the current song is in the playlistTracks state.
    if (tracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    } else {
      // If the id is new, add the song to the end of the playlist.
      tracks.push(track);
    }
    // Set the new state of the playlist
    this.setState({ playlistTracks: tracks });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              onAdd={this.addTrack}
              searchResults={this.state.searchResults}
            />
            <Playlist
              onSave={this.savePlayList}
              onNameChange={this.updatePlaylistName}
              onRemove={this.removeTrack}
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
