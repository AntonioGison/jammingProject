import React from "react";
import "./Playlist.css";
import TrackList from "../TrackList/TrackList";

class Playlist extends React.Component {
    constructor(props){
        super(props)
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event){
        this.props.onNameChange(event.target.value);
    }



  render() {
    return (
      <div className="Playlist">
        <input 
        playlistName={this.props.playlistName}
        onChange={this.handleNameChange}
        defaultValue={"your playlist"} />

        <TrackList
        onRemove={this.props.onRemove}
        isRemoval={true}
        tracks={this.props.playlistTracks} />

        <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
      </div>
    );
  }
}

export default Playlist;
