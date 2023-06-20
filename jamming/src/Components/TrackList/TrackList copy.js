import React from "react";
import "./TrackList.css";
import Track from "../Track/Track";

class TrackList extends React.Component {
  render() {

    if (!this.props.tracks) return <p>'loading'</p>;
    return (
      <div className="TrackList">
        {this.props.tracks.map((track) => {
          return <Track track={track} key={track.id} />;
        })}
        {/* {setTimeout(function(){console.log(this.props.tracks)},2000) } */}
      </div>
    );
  }
}

export default TrackList;
